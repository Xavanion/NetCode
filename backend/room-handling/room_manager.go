package roomhandler

import (
	"fmt"
	"log"
	"sync"
	"encoding/json"
	"github.com/gorilla/websocket"
	"reflect"

	//codehandler "github.com/Xavanion/Hack-KU-2025/backend/code-handling"
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
func (room *Room) broadcastUpdate(message string){
	room.con_mu.Lock()
	for conn := range room.activeConnections {
		if err := conn.WriteMessage(websocket.TextMessage, []byte(message)); err != nil {
			fmt.Println("A")
			fmt.Println("Error sending conway board update:", err)
			conn.Close() // Close connection if it fails to send a message
			delete(room.activeConnections, conn) // Remove broken connection
		}
	}
	room.con_mu.Unlock()
}

func (room *Room) handleMessages(message string){
	// Turn the raw text back into a usable type
	var json_mess map[string]any
	json.Unmarshal([]byte(message), &json_mess)
	fmt.Println(json_mess)
	fmt.Println(message)
	switch json_mess["event"]{
	case "text_update":
		if json_mess["type"] == "insert" {
			fmt.Println(json_mess["value"].(string))
			position := int(json_mess["pos"].(float64))
			if(position != 0){
				position -= 1
			}
			fmt.Println("Type of value:", reflect.TypeOf([]byte(json_mess["value"].(string))[0]))
			room.mainText = insertByte(room.mainText, position, []byte(json_mess["value"].(string))[0]) 
			room.broadcastUpdate(message)
		} else if json_mess["type"] == "delete" {

		}
	}
	fmt.Printf("Body:%s", string(room.mainText))
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
		room.handleMessages(string(message))
	}

	// Once the connection is closed, remove it from the active connections map
	room.con_mu.Lock()
	delete(room.activeConnections, conn)
	room.con_mu.Unlock()
}


func insertByte(slice []byte, index int, value byte) []byte {
    // Ensure index is valid
    if index < 0 || index > len(slice) {
        fmt.Println("Index out of range")
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
    if index < 0 || index >= len(slice) {
        panic("Index out of range")
    }

    // Remove the byte at the given index
    return append(slice[:index], slice[index+1:]...)
}

