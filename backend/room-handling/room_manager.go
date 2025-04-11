package roomhandler

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"
	"time"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"

	aireview "github.com/Xavanion/Hack-KU-2025/backend/ai-review"
	codehandler "github.com/Xavanion/Hack-KU-2025/backend/code-handling"
)

// This is the struct used for an individual room that people can connect to
type Room struct {
	ID                string
	activeConnections map[*websocket.Conn]bool
	con_mu            sync.Mutex
	mainText          []byte
	text_mu           sync.RWMutex
}

// This struct is for managing all active rooms
type RoomManager struct {
	Rooms map[string]*Room
	mu    sync.RWMutex
}

// 
type ApiRequest struct {
	Event    string `json:"event"`
	Language string `json:"language"`
	Room     string `json:"room"`
}

// This struct is used mainly for rebroadcasting updates recieved from the front end
type sendUpdateJson struct {
	Event  string      `json:"event"`
	Update interface{} `json:"update"`
}

/* A func that's used to spin up a new room manager
* PARAMS: none
* RETURNS: the pointer to the created room manager 
*/
func NewRoomManager() *RoomManager {
	return &RoomManager{
		Rooms: make(map[string]*Room),
	}
}

/* Used when a roommanager wants to initialize a new room
* PARAMS: The room id the user wants to create
* RETURNS: A pointer to the newly created room
*/
func (manager *RoomManager) CreateRoom(roomid string) *Room {
	manager.mu.Lock()
	defer manager.mu.Unlock()
	manager.Rooms[roomid] = &Room{
		ID:                roomid,
		activeConnections: make(map[*websocket.Conn]bool),
		mainText:          make([]byte, 0),
	}
	return manager.Rooms[roomid]
}

/* This function is called on a manager and checks if the rool exists
* PARAMS: id: the relevant id that is being checked for
* RETURNS: The pointer to the relevant room if it exists, a boolean that is True iff the room exists
*/
func (manager *RoomManager) GetRoom(id string) (*Room, bool) {
	manager.mu.RLock()
	defer manager.mu.RUnlock()
	if manager.Rooms[id] == nil {
		return nil, false
	} else {
		room := manager.Rooms[id]
		return room, true
	}
}

/* returns the mainText parameter for a room in a safe way 
*  PARAMS: none
*  RETURNS: The room's mainText paramenter
*/
func (room *Room) getText() string{
	room.text_mu.RLock()
	defer room.text_mu.RUnlock()
	return string(room.mainText)
}

/* This function is the entry point for any HTTP API requests we recieve such as running the code 
* PARAMS: requestData: the relevant information from the request in struct form, the gin context so we can return status codes
* RETURNS: none
*/
func (room *Room) FileApiRequest(requestData ApiRequest, c *gin.Context) {
	switch requestData.Event {
	case "run_code":
		out, err := codehandler.Run_file(room.ID, string(requestData.Language), "main-", room.getText())

		room.broadcastUpdate(nil, "output_update", out, false)
		if (err != nil){
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Server Error Processing code"})
		} else{
			c.JSON(http.StatusOK, gin.H{"message": "Data processed successfully"})
		}
	case "code_save":
	case "code_review":
		// Create a gemini review using the server's copy of the stored text
		response, err := aireview.Gemini_Review(room.getText())
		if err != nil {
			log.Println(err)
			err_out := "internal server error"
			c.JSON(http.StatusInternalServerError, gin.H{"review": err_out})
		}
		c.JSON(http.StatusOK, gin.H{"review": response})
	}
}

/* This function is priamrly used to broadcast an update recieved from an active connection to every other user in the room
*  PARAMS: startconn (optional) the user sending the update, event: what type of update is being sent,
*  message: the content being sent (such as remove the character at x position), and isParsed which is if we need to unmarshall the message first
*  RETURNS: none
*/
func (room *Room) broadcastUpdate(startconn *websocket.Conn, event string, message string, isParsed bool) {
	// Lock any new connections out to avoid weird inconsistencies
	room.con_mu.Lock()
	defer room.con_mu.Unlock()
	for conn := range room.activeConnections {
		// Don't send an update to whoever spawned the update
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

/* This function recieves a message from a websocket connection and dictates what we update/if we respond
*  PARAMS: message: the raw message we recieved from the webocket, conn: the socket connection that was the sender
*  RETURNS: none
*/
func (room *Room) handleMessages(message string, conn *websocket.Conn) {
	// Turn the raw text back into a usable type
	var json_mess map[string]any
	json.Unmarshal([]byte(message), &json_mess)
	switch json_mess["event"] {
	case "text_update":
		if json_mess["type"] == "insert" {
			position := int(json_mess["pos"].(float64))
			if position > len(room.getText()) {
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
	log.Printf("Body:%s\n", room.getText())
}

/* This is where we handle a new websocket connection after it has been upgraded and passes new messages to handleMessages()
* PARAMS: this function is called on the room we are adding to, conn: the new websocket connection
* RETURNS: none
*/
func (room *Room) NewConnection(conn *websocket.Conn) {
	// update our activeConnections so we can message persistently
	room.con_mu.Lock()
	room.activeConnections[conn] = true
	room.con_mu.Unlock()
	defer conn.Close()

	time.Sleep(time.Duration(500) * time.Millisecond)
	msg := sendUpdateJson{
		Event:  "connection_update",
		Update: room.getText(),
	}
	jsonData, err := json.Marshal(msg)
	// Catch the new connection up with the current state
	if err != nil {
		log.Println("Failed to marshall update message json: ", err)
	} else if err := conn.WriteMessage(websocket.TextMessage, jsonData); err != nil {
		conn.Close()                         // Close connection if it fails to send a message
		room.con_mu.Lock()
		delete(room.activeConnections, conn) // Remove broken connection
		room.con_mu.Unlock()
		return
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

/* Used to add text to the server's copy of a room's content
*  PARAMS: the index to add the text at, the text to add
*  RETURNS: none
*/

func (room *Room) insertBytes(index int, value []byte) {
	room.text_mu.RLock()
	slice := room.mainText
	room.text_mu.RUnlock()

	// Ensure index is valid
	if index < 0 || index > len(slice) {
		log.Println("Index out of range")
		return
	}

	// Insert the byte at the given index
	room.text_mu.Lock()
	room.mainText = append(slice[:index], append(value, slice[index:]...)...)
	room.text_mu.Unlock()
}

/* Deletes text from the server's copy of a room's content
*  PARAMS: the index to start deletion from, the number of characters to remove 
*  RETURNS: none
*/
func (room *Room) deleteByte(index int, num_chars int) {
	room.text_mu.RLock()
	slice := room.mainText
	room.text_mu.RUnlock()

	// Ensure index is valid
	if index < 0 || index > len(slice) {
		log.Println("Index out of range: ", index, " ", num_chars)
		return
	}

	// Remove the byte at the given index
	room.text_mu.Lock()
	room.mainText = append(slice[:index], slice[index+num_chars:]...)
	room.text_mu.Unlock()
}
