package main

import (
	"fmt"
	"net/http"
	"os"
	"path"
)

type User struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

var users []User

func handleHTTP(w http.ResponseWriter, r *http.Request) {
	// extract only the relevant part for us
	file_name := r.URL.Path[len("/"):]
	filepath := "Frontend/" + file_name 
	serveFile(w, r, filepath)
}

func serveFile(w http.ResponseWriter, r *http.Request, filepath string) {

	// clean the file path from things like ..
	filepath = path.Clean(filepath) 
	extension := path.Ext(filepath) // see if there is a file extension
	switch extension {
		case ".js":
			w.Header().Set("Content-Type", "application/javascript")
		case ".css":
			w.Header().Set("Content-Type", "text/css")
		default:
			filepath += ".html"
			w.Header().Set("Content-Type", "text/html")
		}
	// Check if the file exists in our system
    if _, err := os.Stat(filepath); os.IsNotExist(err) {
        http.NotFound(w, r)
        return
    }
	// actually serve the file
	http.ServeFile(w, r, filepath)
}


func main() {
	fmt.Println("test")
	//router.HandleFunc("/users", getUsers).Methods("GET")
	//router.HandleFunc("/users", createUser).Methods("POST")
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    switch r.URL.Path {
		case "/":
			handleHTTP(w, r)
		case "/index", "/home.js":
			handleHTTP(w, r);
		case "/about", "/info":
			break
		default:
			http.NotFound(w, r)
    }
})

	err := http.ListenAndServe(":8080", nil)
	if(err != nil){
		fmt.Println("Error starting server:",err)
	}
}
