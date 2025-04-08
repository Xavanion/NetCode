import { useEffect, useRef, useState } from 'react';
import { useWS } from './WebSocketContext';
import RopeSequence from 'rope-sequence';

// Define types that the rope can do
type RopeOperation ={ event: 'text_update'; type: 'insert'; pos: number; value: string } | { event: 'text_update'; type: 'delete'; from: number; to: number };

// Hook to connect rope functionality to multiple different components
export function useRopes(): [string, (newText:string) => void, string] {
  const rope = useRef(RopeSequence.empty as RopeSequence<string>); // Create rope
  const [text, setText] = useState(''); // Create text for use in setting textbox
  const [outputText, setOutput] = useState(''); // Set output box
  const socket = useWS(); // Connect to context web socket
  const debug: boolean = true; // Boolean used for debugging


  // Do the operation on the rope
  const applyOp = (op: RopeOperation) => {
    let curRope = rope.current;

    // Check op type and then append new value where it needs to go
    if (op.type === 'insert'){
      const before = curRope.slice(0,op.pos);
      const after = curRope.slice(op.pos);
      curRope = before.append(Array.from(op.value)).append(after);
    }else if (op.type === 'delete'){
      const before = curRope.slice(0,op.from);
      const after = curRope.slice(op.to);
      curRope = before.append(after);
    }

    rope.current = curRope;
    const curText = ropeToString(rope.current);
    setText(curText);
  }


  // Function that takes rope datastructure and converts to string
  function ropeToString(rope: RopeSequence<string>): string {
    const flattened: string[] = [];
    rope.forEach((value: string) => {
      flattened.push(value);
    });
    return flattened.join('');
  }


  function setInitialText(newText: string) {
    rope.current = RopeSequence.from(Array.from(newText));
    setText(newText);
  }
  

  // Update text ref for textbox display
  function updateText(newText: string){
    const oldText = ropeToString(rope.current);    

    // Progress i to where text is different
    let i = 0;
    while (i < newText.length && i < oldText.length && newText[i] === oldText[i]){
      i++;
    }


    if (oldText.length > newText.length){
      // Deletion
      let difference = oldText.length - newText.length; // Find the amount deleted
      const op: RopeOperation = {event: 'text_update', type: 'delete', from: i, to: i+difference}; // Remove that bit
      applyOp(op);
      socket.current?.send(JSON.stringify(op)); // Pass op to others
    } else {
      // Insertion
      const inserted = newText.slice(i, newText.length - (oldText.length - i)); // Find length of what to insert
      const op: RopeOperation = {event: 'text_update', type: 'insert', pos: i, value:inserted}; // Setup event & send it to update
      applyOp(op);
      socket.current?.send(JSON.stringify(op)); // Pass op to others
    }
  }
  
  // Recieve websocket changes
  useEffect(() => {
    // Create interval variable
    let interval: ReturnType<typeof setInterval>;
  
    // Function for when attached
    function attachOnMessage(ws: WebSocket) {
      if (debug) console.log('WebSocket connected, attaching onmessage handler');
	
      //socket.current?.send("one");
  
      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);

        // Debugging statements
        if (debug) {
          console.log("Raw socket data:", e);
          console.log("Parsed Socket data", data);
          console.log("Data", data.event);
          console.log("Op", data.update);
        }
        
        // Switch statement to tell event from front-end
        switch (data.event) {
          case 'input_update': // User text update
            const op: RopeOperation = data.update;
            applyOp(op);
            break;
          case 'output_update': // User click run
            setOutput(data.update);
            break;
          case 'connection_update': // User connects and needs to update data in input
            setInitialText(data.update);
            break;
          default:
            console.warn("Unknown WebSocket event:", data);
        }
      };
    }
  
    // Connect to websocket, if not connected wait interval and try again
    const tryAttach = () => {
      const ws = socket.current;
      if (ws && ws.readyState === WebSocket.OPEN) {
        attachOnMessage(ws);
        clearInterval(interval);
      }
    };
  
    // Keep retrying connection every 100ms
    tryAttach(); // Try immediately
    interval = setInterval(tryAttach, 100); // Retry every 100ms
  
    return () => clearInterval(interval); // Cleanup
  }, [socket.current]);
  

  // Return text to text box
  return [text, updateText, outputText];
}
