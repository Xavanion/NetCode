package roomhandler

import (
	"encoding/json"
	"fmt"
	"log"
	"reflect"
	"sync"

	codehandler "github.com/Xavanion/Hack-KU-2025/backend/code-handling"
	"github.com/gorilla/websocket"
)

type Room struct{
	ID string
	activeConnections map[*websocket.Conn]bool
	con_mu sync.Mutex
	mainText []byte 
}
type RoomManager struct {
	Rooms map[string]*Room
	mu sync.RWMutex
}
type ApiRequest struct {
	Event  string `json:"event"`
	Language string `json:"language"`
}

func NewRoomManager() *RoomManager {
	return &RoomManager{
		Rooms: make(map[string]*Room),
	}
}

func (manager *RoomManager) CreateRoom(roomid string){
	manager.mu.Lock()
	defer manager.mu.Unlock()
	manager.Rooms[roomid] = &Room{
		ID: roomid,
		activeConnections: make(map[*websocket.Conn]bool),
		mainText: make([]byte, 0), 
	}
}

func (manager *RoomManager) GetRoom(id string) *Room {
	manager.mu.RLock()
	defer manager.mu.RUnlock()
	room := manager.Rooms[id]
	return room 
}

func (room *Room) FileApiRequest(requestData ApiRequest){
	switch requestData.Event{	
	case "run_code":
			fmt.Println("Hit: ", requestData.Language)	
			fmt.Println(string(room.mainText))
			fmt.Println(requestData)
			out := codehandler.Run_file("one", string(requestData.Language), "main-py-", string(room.mainText))
			fmt.Println(out)
	case "code_save":
	}
}

func (room *Room) broadcastUpdate(startconn *websocket.Conn, message string){
	room.con_mu.Lock()
	for conn := range room.activeConnections {
		if conn == startconn{
			break
		}
		if err := conn.WriteMessage(websocket.TextMessage, []byte(message)); err != nil {
			conn.Close() // Close connection if it fails to send a message
			delete(room.activeConnections, conn) // Remove broken connection
		}
	}
	room.con_mu.Unlock()
}

func (room *Room) handleMessages(message string, conn *websocket.Conn){
	// Turn the raw text back into a usable type
	var json_mess map[string]any
	json.Unmarshal([]byte(message), &json_mess)
	//fmt.Println(json_mess)
	fmt.Println(message)
	switch json_mess["event"]{
	case "text_update":
		if json_mess["type"] == "insert" {
			fmt.Println(json_mess["value"].(string))
			position := int(json_mess["pos"].(float64))
			if(position > len(room.mainText)){
				position -= 1
			}
			fmt.Println("Type of value:", reflect.TypeOf([]byte(json_mess["value"].(string))[0]))
			room.mainText = insertByte(room.mainText, position, []byte(json_mess["value"].(string))[0]) 
			//room.broadcastUpdate(conn, message)
		} else if json_mess["type"] == "delete" {
			position := int(json_mess["from"].(float64)) - 1
			room.mainText = deleteByte(room.mainText, position)
		}
	}
	fmt.Printf("Body:%s\n", string(room.mainText))
}

func (room *Room) NewConnection(conn *websocket.Conn) {
	// update our activeConnections so we can message persistently
	room.con_mu.Lock()
	room.activeConnections[conn] = true
	room.con_mu.Unlock()
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


func insertByte(slice []byte, index int, value byte) []byte {
    // Ensure index is valid
    if index < 0 || index > len(slice) {
        log.Println("Index out of range")
		return slice
    }

    // Check if slice needs reallocation
    if len(slice) == cap(slice) {
        // Double the capacity to minimize future reallocations
        newSlice := make([]byte, len(slice), cap(slice)*2+1)
        copy(newSlice, slice)
        slice = newSlice
    }

    // Insert the byte at the given index
    slice = append(slice[:index], append([]byte{value}, slice[index:]...)...)
    return slice
}

func deleteByte(slice []byte, index int) []byte {
    // Ensure index is valid
    if index < 0 || index > len(slice) {
        fmt.Println("Index out of range")
		return slice
    }

    // Remove the byte at the given index
    return append(slice[:index], slice[index+1:]...)
}



