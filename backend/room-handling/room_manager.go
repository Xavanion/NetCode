package roomhandling 

import (
	"fmt"
	"sync"
	"github.com/gorilla/websocket"
)


var activeConnections = make(map[*websocket.Conn]bool)
var con_mu sync.Mutex

func Testing(){
	fmt.Println("imported")
}

func newConnection(conn *websocket.Conn){
	// update our activeConnections so we can broadcast messages to them
	con_mu.Lock()
	activeConnections[conn] = true
	con_mu.Unlock()



	// Once the connection is closed, remove it from the active connections map
	con_mu.Lock()
	delete(activeConnections, conn)
	con_mu.Unlock()
}
