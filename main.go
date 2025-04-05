package main

import (
	"net/http"

	roomhandler "github.com/Xavanion/Hack-KU-2025/backend/room-handling"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
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
	router := gin.Default()
	roomhandler.Testing()
	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("real-time-app/dist", true)))

	// Setup route group for the API
	api := router.Group("/api")
	{
		// API pong response
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"message": "pong",})
		})

		// Websocket endpoint
		api.GET("/ws", func(c *gin.Context) {
			// Upgrade GET request to a WebSocket
			conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
			if err != nil {
				return
			}
			defer conn.Close()

			// Wait and read incoming messages
			for {
				// close connection when we're done
				defer conn.Close()
				roomhandler.NewConnection(conn)
			}
		})
	}
	router.Run(":8080")
}
