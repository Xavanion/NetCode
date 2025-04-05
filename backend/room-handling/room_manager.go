package roomhandler 

import (
	"fmt"
	"sync"
	"log"
	"github.com/gorilla/websocket"
	texthandler "github.com/Xavanion/Hack-KU-2025/backend/text-handling"
	codehandler "github.com/Xavanion/Hack-KU-2025/backend/code-handling"
)


var activeConnections = make(map[*websocket.Conn]bool)
var con_mu sync.Mutex

func Testing(){
	fmt.Println("imported room handler")
	fmt.Println("Text hand",  texthandler.Test())
	fmt.Println("Code hand:", codehandler.Test())

	codehandler.Run_file("1", "python", "main", "print(\"Hello World\")");
	str_c := `#include <stdio.h>

int main() {
  printf("C Hello World!");
  return 0;
}`

	codehandler.Run_file("1", "c", "main", str_c);
}

func NewConnection(conn *websocket.Conn){
	// update our activeConnections so we can message persistently 
	con_mu.Lock()
	activeConnections[conn] = true
	con_mu.Unlock()
	texthandler.Test()
	// Listen for incoming messages from this specific connection
	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error reading message:", err)
			break
		}

		log.Printf("Received: %s\n", message)
	}


	// Once the connection is closed, remove it from the active connections map
	con_mu.Lock()
	delete(activeConnections, conn)
	con_mu.Unlock()
}
