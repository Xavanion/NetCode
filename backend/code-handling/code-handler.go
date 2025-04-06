package codehandler

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"os/exec"
)
func Run_file(room_id string, language string, filename string, content string){
	// Get the current working directory the code is running in
	dir, err := os.Getwd()
    if err != nil {
        log.Fatal(err)
    }
	// Set it to folder we want to store code in
	path := filepath.Join(dir, "backend/code-handling/code", filename + room_id)
	path = filepath.Clean(path)

	// Construct the correct filetype
	switch language{
		case "c": path += ".c"
		case "python": path += ".py"
	}

	new_file, e := os.Create(path) 
    if e != nil { 
        log.Println("Error Creating file", e) 
		return
    } 
	// Close the file whenever we are done
	defer new_file.Close()

	// Write our content to the actual file
	_, err = new_file.WriteString(content);
	if err != nil {
		log.Println("Error writing to file:", err)
		return
	}
	//Commits the file to the stable directory? idk 
	new_file.Sync()

	// Figure out how we should run the executable 
	var cmd *exec.Cmd
	switch language{
		case "python":
			// Just point python3 to the file
			cmd = exec.Command("bash", "-c", "python3" + path +"; " + "rm "+path)
		case "c":
			// Remove the ".c" extension
			outputPath := path[:len(path)-2] 
			// Compile to the output path
			cmd = exec.Command("bash", "-c", "gcc  "+path+" -o "+outputPath+"; "+outputPath+"; rm "+outputPath+" "+path)
			fmt.Println(outputPath)
	}
	// Run the command and store the standard output
	output, err := cmd.Output()
	if err != nil {
		log.Println("Error executing command:", err)
		return
	}
	fmt.Println(string(output))
}

