package main

import (
	"net/http"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func handleHome(w http.ResponseWriter, req *http.Request){
	http.ServeFile(w, req, "real-time-app/dist/index.html");
}


func main() {
	router := gin.Default()

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("real-time-app/dist", true)))

	// Setup route group for the API
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}
	router.Run(":8080")
}
