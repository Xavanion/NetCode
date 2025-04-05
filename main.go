package main

import (
	"fmt"
	"net/http"
)

func handleHome(w http.ResponseWriter, req *http.Request){
	http.ServeFile(w, req, "real-time-app/index.html");
}


func main() {
	fmt.Println("test")
	fs := http.FileServer(http.Dir("real-time-app/"))
	http.Handle("/static/", http.StripPrefix("/static", fs))
	http.HandleFunc("/", handleHome)
	err := http.ListenAndServe(":8080", nil)
	if(err != nil){
		fmt.Println("Error starting server:",err)
	}
}
