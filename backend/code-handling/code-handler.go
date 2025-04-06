package codehandler

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
)

func Run_file(room_id string, language string, filename string, content string) string {
	// Get the current working directory the code is running in
	dir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	// Set it to folder we want to store code in
	path := filepath.Join(dir, "backend/code-handling/code", filename+room_id)
	path = filepath.Clean(path)

	// Construct the correct filetype
	switch language {
	case "C":
		path += ".c"
	case "Python":
		path += ".py"
	case "Java":
		path += ".java"
	case "C++":
		path += ".cpp"
	case "JavaScript":
		path += ".js"
	}

	//fmt.Println(path)
	new_file, e := os.Create(path)
	if e != nil {
		log.Println("Error Creating file", e)
		return "System error creating file"
	}
	// Close the file whenever we are done
	defer new_file.Close()

	// Write our content to the actual file
	_, err = new_file.WriteString(content)
	if err != nil {
		log.Println("Error writing to file:", err)
		return "System error writing to file"
	}
	//Commits the file to the stable directory? idk
	new_file.Sync()

	// Figure out how we should run the executable
	var cmd *exec.Cmd
	switch language {
	case "Python":
		// Just point python3 to the file
		cmd = exec.Command("bash", "-c", "python3 "+path+"; "+"rm "+path)
	case "C":
		// Remove the ".c" extension
		outputPath := path[:len(path)-2]
		// Compile to the output path
		cmd = exec.Command("bash", "-c", "gcc "+path+" -o "+outputPath+"; "+outputPath+"; rm "+outputPath+" "+path)
		fmt.Println(outputPath)
		// cmd = exec.Command("bash", "-c", "gcc "+path+" -o "+outputPath+"; "+outputPath)
	case "Java":
		// Remove the ".java" extension
		outputPath := path[:len(path)-5]
		// Compile the Java file
		cmd = exec.Command("bash", "-c", "javac "+path+"; java -cp "+filepath.Dir(path)+" "+outputPath+"; rm "+path)
	case "C++":
		// Remove the ".cpp" extension
		outputPath := path[:len(path)-4] // C++ files have the .cpp extension
		// Compile the C++ file and run the executable
		cmd = exec.Command("bash", "-c", "g++ "+path+" -o "+outputPath+"; "+outputPath+"; rm "+outputPath+" "+path)
	case "JavaScript":
		// Run the JavaScript file using node
		cmd = exec.Command("bash", "-c", "node "+path+"; rm "+path)
	}
	// Run the command and store the standard output
	output, err := cmd.Output()
	if err != nil {
		log.Println("Error executing command:", err)
		return "System error executing command"
	}
	return string(output)
}
