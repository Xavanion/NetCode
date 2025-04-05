package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("test")
	fs := http.FileServer(http.Dir("real-time-app/"))
	http.Handle("/static/", http.StripPrefix("/static", fs))
	err := http.ListenAndServe(":8080", nil)
	if(err != nil){
		fmt.Println("Error starting server:",err)
	}
}
