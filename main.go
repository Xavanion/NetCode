package main

import (
	"net/http"
	"log"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/Xavanion/Hack-KU-2025/backend/room-handling"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}


func main() {
	router := gin.Default()
	roomhandler.Testing()
	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("real-time-app/dist", true)))

	// Setup route group for the API
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"message": "pong",})
		})

		api.GET("/ws", func(c *gin.Context) {
			// Upgrade GET request to a WebSocket
			conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
			if err != nil {
				return
			}
			defer conn.Close()

			for {
				// Read message
				messageType, message, err := conn.ReadMessage()
				if err != nil {
					log.Println("Error upgrading:", err)
					break
				}

				defer conn.Close() // close connection when we're done
				
				// send the connection to the ws handler
				roomhandler.NewConnection(conn)
				// Echo the message back
				if err = conn.WriteMessage(messageType, message); err != nil {
					break
				}
			}
		})
	}
	router.Run(":8080")
}
