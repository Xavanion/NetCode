package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"

	roomhandler "github.com/Xavanion/Hack-KU-2025/backend/room-handling"
)

// Upgrade HTTP request to WS connection
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func main() {
	// Create a new manager to handler all rooms that get spun off later
	roomManager := roomhandler.NewRoomManager()

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"***"},
		AllowMethods:     []string{"POST", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowOriginFunc: func(origin string) bool {
		  return origin == "https://github.com"
		},
	  }))
	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("real-time-app/dist", true)))

	// Setup route group for the API
	api := router.Group("/api")
	{
		api.POST("/", func(c *gin.Context) {
			var requestData roomhandler.ApiRequest 
			if err := c.ShouldBindJSON(&requestData); err != nil {
				// If the binding fails, return an error
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			// Check if the room exists, if it does we tell that room to do the api request
			room, exists := roomManager.GetRoom(requestData.Room)
			if(exists){
				room.FileApiRequest(requestData, c)
			}
		})
		// Websocket endpoint
		api.GET("/ws", func(c *gin.Context) {
			// Upgrade GET request to a WebSocket
			conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
			if err != nil {
				return
			}
			// Wait for the socket to request a room
			_, message, err := conn.ReadMessage()
			if err != nil {
				log.Println("Error reading message:", err)
			}
			log.Print("room: ", string(message))
			room, exists := roomManager.GetRoom(string(message))
			if(exists){
				room.NewConnection(conn)
			} else {
				room := roomManager.CreateRoom(string(message))
				room.NewConnection(conn)
			}
		})
	}
	router.Run(":8080")
}
