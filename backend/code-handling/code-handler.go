package codehandler

import (
	"log"
	"os"
	"os/exec"
)
func Run_file(room_id string, language string, filename string){
	new_file, e := os.Create("GeeksforGeeks.txt") 
    if e != nil { 
        log.Fatal(e) 
    } 
    log.Println(new_file) 
    new_file.Close() 
	cmd := exec.Command(filename, "arg")
	cmd.Run()
}

func Test() int{
	return -1
}
