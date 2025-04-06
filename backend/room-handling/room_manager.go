package roomhandler

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"sync"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	codehandler "github.com/Xavanion/Hack-KU-2025/backend/code-handling"
	genai "github.com/google/generative-ai-go/genai"
	"github.com/gorilla/websocket"
	"google.golang.org/api/option"
)

type Room struct {
	ID                string
	activeConnections map[*websocket.Conn]bool
	con_mu            sync.Mutex
	mainText          []byte
	text_mu			  sync.Mutex
}
type RoomManager struct {
	Rooms map[string]*Room
	mu    sync.RWMutex
}
type ApiRequest struct {
	Event    string `json:"event"`
	Language string `json:"language"`
	Room string `json:"room"`
}

type sendUpdateJson struct {
	Event  string      `json:"event"`
	Update interface{} `json:"update"`
}
type Content struct{
    Parts []string `json:Parts`
    Role string `json:Role`
} 
type Candidates struct {
    Content *Content `json:Content`
}
type ContentResponse struct{
    Candidates *[]Candidates `json:Candidates`
}

func NewRoomManager() *RoomManager {
	return &RoomManager{
		Rooms: make(map[string]*Room),
	}
}

func (manager *RoomManager) CreateRoom(roomid string) *Room{
	manager.mu.Lock()
	defer manager.mu.Unlock()
	manager.Rooms[roomid] = &Room{
		ID:                roomid,
		activeConnections: make(map[*websocket.Conn]bool),
		mainText:          make([]byte, 0),
	}
	return manager.Rooms[roomid]
}

func (manager *RoomManager) GetRoom(id string) (*Room, bool) {
	manager.mu.RLock()
	defer manager.mu.RUnlock()
	if(manager.Rooms[id] == nil){
		return nil, false
	}else {
		room := manager.Rooms[id]
		return room, true
	}
}

func (room *Room) FileApiRequest(requestData ApiRequest, c *gin.Context) {
	switch requestData.Event {
	case "run_code":
		//codehandler.Run_file("1", "Python", "main", "print(\"Hello World\")\n")
		/*codehandler.Run_file("1", "C", "main", `
		#include <stdio.h>

		int main(){
		    printf("Hello World");
		    return 0;
		}`)*/
		out := codehandler.Run_file("one", string(requestData.Language), "main-", string(room.mainText))
		room.broadcastUpdate(nil, "output_update", out, false)
		fmt.Printf("Output: %s\n", out)
		c.JSON(http.StatusOK, gin.H{"message": "Data processed successfully"})
	case "code_save":
	case "code_review":
		// Access your API key as an environment variable 
		fmt.Println("HIT GEMINI")
		err := godotenv.Load(".env")
		if err != nil {
			log.Printf("Error loading .env file: %v", err)
			return
		}

		apiKey := os.Getenv("GEMINI_API_KEY")
		if apiKey == "" {
			log.Fatal("GEMINI_API_KEY environment variable is not set!")
		}
		ctx := context.Background()
		client, err := genai.NewClient(ctx, option.WithAPIKey(os.Getenv("GEMINI_API_KEY")))
		if err != nil {
			log.Println(err)
		}
		defer client.Close()

		model := client.GenerativeModel("gemini-2.0-flash-thinking-exp-01-21")
		resp, err := model.GenerateContent(ctx, genai.Text(`You are an expert software engineer and teacher. Review the following code for correctness, clarity, performance, security, and best practices.
			Return your feedback in well-organized Markdown using multiple sections:
			Summary
				Briefly describe what the code appears to do.
			What's Good
				Highlight strengths and positive aspects.
			Issues / Bugs
				Point out any errors or potential bugs with explanations.
			Suggestions for Improvement
				Explain ways to improve the code structure, performance, readability, or style.
				Be specific and constructive.
			Security Concerns (if any)
				Mention any possible vulnerabilities or safety issues.
			Cleaned-up Version (if applicable)
				If possible, include a revised version of the code incorporating your suggestions.
				Make sure all sections use Markdown formatting properly (e.g., headers, bullet points, code blocks).
				Aim to be clear, friendly, and professional, as if giving feedback to a peer:\n`+string(room.mainText)))
		if err != nil {
			log.Fatal(err)
		}
		marshalResponse, _ := json.MarshalIndent(resp, "", "  ")
		fmt.Println(string(marshalResponse))
		var generateResponse ContentResponse
		if err := json.Unmarshal(marshalResponse, &generateResponse); err !=nil{
			log.Fatal(err)
		}
		var whole string
		for _, cad := range *generateResponse.Candidates{
			if cad.Content !=nil{
				for _, part := range cad.Content.Parts{
					whole += part
				}
			}
		}
		fmt.Println("out:", whole)
		c.JSON(http.StatusOK, gin.H{"review": whole})
	}
}

func (room *Room) broadcastUpdate(startconn *websocket.Conn, event string, message string, isParsed bool) {
	room.con_mu.Lock()
	defer room.con_mu.Unlock()
	fmt.Println(room.activeConnections)
	for conn := range room.activeConnections {
		fmt.Println("Sending message to:", conn.RemoteAddr())
		if conn == startconn {
			continue
		}
		var jsonData []byte
		var err error
		if isParsed {
			var parsed map[string]interface{}
			json.Unmarshal([]byte(message), &parsed)

			msg := sendUpdateJson{
				Event:  event,
				Update: parsed,
			}
			jsonData, err = json.Marshal(msg)
		} else {
			msg := sendUpdateJson{
				Event:  event,
				Update: message,
			}
			jsonData, err = json.Marshal(msg)
		}

		if err != nil {
			log.Println("Failed to marshall update message json: ", err)
		}

		if err := conn.WriteMessage(websocket.TextMessage, jsonData); err != nil {
			log.Println("Failed to send message ", err)
			conn.Close()                         // Close connection if it fails to send a message
			delete(room.activeConnections, conn) // Remove broken connection
		}
	}
}

func (room *Room) handleMessages(message string, conn *websocket.Conn) {
	// Turn the raw text back into a usable type
	var json_mess map[string]any
	json.Unmarshal([]byte(message), &json_mess)
	//fmt.Println(json_mess)
	fmt.Println(message)
	switch json_mess["event"] {
	case "text_update":
		if json_mess["type"] == "insert" {
			fmt.Println(json_mess["value"].(string))
			position := int(json_mess["pos"].(float64))
			if position > len(room.mainText) {
				position -= 1
			}
			room.insertBytes(position, []byte(json_mess["value"].(string)))
		} else if json_mess["type"] == "delete" {
			from := int(json_mess["from"].(float64))
			to := int(json_mess["to"].(float64))
			room.deleteByte(from, to-from)
		}
		room.broadcastUpdate(conn, "input_update", message, true)
	default:
		log.Print("Invalid json event")
	}
	fmt.Printf("Body:%s\n", string(room.mainText))
}


func (room *Room) NewConnection(conn *websocket.Conn) {
	// update our activeConnections so we can message persistently
	room.con_mu.Lock()
	room.activeConnections[conn] = true
	room.con_mu.Unlock()
	defer conn.Close()
	
	time.Sleep(time.Duration(500)*time.Millisecond)
	msg := sendUpdateJson{
		Event:  "input_update",
		Update: string(room.mainText),
	}
	jsonData, err := json.Marshal(msg)

	if err != nil {
		log.Println("Failed to marshall update message json: ", err)
	}

	// Catch the new connection up with what's going on

	if err := conn.WriteMessage(websocket.TextMessage, jsonData); err != nil {
		conn.Close()                         // Close connection if it fails to send a message
		delete(room.activeConnections, conn) // Remove broken connection
	}

	// Listen for incoming messages from this specific connection
	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error reading message:", err)
			break
		}
		room.handleMessages(string(message), conn)
	}

	// Once the connection is closed, remove it from the active connections map
	room.con_mu.Lock()
	delete(room.activeConnections, conn)
	room.con_mu.Unlock()
}

func (room *Room) insertBytes( index int, value []byte) {
	slice := room.mainText
	room.text_mu.Lock()
	defer room.text_mu.Unlock()
	// Ensure index is valid
	if index < 0 || index > len(slice) {
		log.Println("Index out of range")
		return 
	}

	// Insert the byte at the given index
	room.mainText = append(slice[:index], append(value, slice[index:]...)...)
}

func (room *Room) deleteByte(index int, num_chars int) {
	slice := room.mainText
	room.text_mu.Lock()
	defer room.text_mu.Unlock()

	// Ensure index is valid
	if index < 0 || index > len(slice) {
		fmt.Println("Index out of range")
		return 
	}

	// Remove the byte at the given index
	room.mainText = append(slice[:index], slice[index+num_chars:]...)
}
