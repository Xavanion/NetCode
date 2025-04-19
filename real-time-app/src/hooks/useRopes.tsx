import { useEffect, useRef, useState } from 'react';
import { useWS } from './WebSocketContext';
import RopeSequence from 'rope-sequence';

/* 
  Define and export RopeOperation type.
  This represents the possible operations that can be sent/received via WebSocket:
    - Insert a value at a position
    - Delete a range from 'from' to 'to'
*/
export type RopeOperation = {
  event: 'text_update';
  type: 'insert';
  pos: number;
  value: string;
  version: number;
  author: number;
} | {
  event: 'text_update';
  type: 'delete';
  from: number;
  to: number;
  version: number;
  author: number;
};

/* 
  Custom hook useRopes
  Provides:
    - rope-backed state management for input text
    - real-time collaborative editing via WebSocket
    - synchronized output text from code execution

  Functions:
    - applyOp: Applies the rope operation and updates the textbox/internal rope
    - ropeToString: Flattens the rope and converts it to a string, used to set textbox
    - setInitialText: Sets textbox upon connection/reconnection for use with syncing to environment
    - updateText: Update rope based on user input changes, Calculates difference and creates a minimal operation (insert/delete), Then broadcasts the operation via WebSocket
    - useEffect: Used to do websocket communication: syncing of content and listening to changes from other users in the same room
    - setIncomingOp: used to set variable to whatever incoming operation is happening

  Dependencies:
    - useWS: Websocket Context
    - useEffect: For websocket listening
    - useRef: Rope reference
    - useState: used for setting textbox/output box
    - RopeSequence for handling the rope data structure

  Returns:
    [inputText, updateInputText, outputText]
*/
export function useRopes(): [string, (newText:string) => void, string, (RopeOperation[])] {
  const rope = useRef(RopeSequence.empty as RopeSequence<string>); // Create rope
  const [text, setText] = useState(''); // Create text for use in setting textbox
  const [outputText, setOutput] = useState(''); // Set output box
  const [incomingOp, setIncomingOp] = useState<RopeOperation[]>([]); // Set for use with passing & dealing with operation length adjustments
  const localVersion = useRef(0); // Used for operational transformations
  const localUID = useRef(0);
  const socket = useWS(); // Connect to context web socket
  const debug: boolean = true; // Boolean used for debugging


  /* 
    Apply a rope operation (insert/delete) to the current rope
    Updates both internal rope and textbox string state
  */
  const applyOp = (op: RopeOperation, version_mismatch_present: boolean) => {
    let curRope = rope.current;
    setIncomingOp(oldArray => [...oldArray, op]); // Set for use with other components
    if (version_mismatch_present){
      console.log(`Version mismatch detected. Local: ${localVersion.current}, Received: ${op.version}`);
    }
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


  /* 
    Convert a rope data structure into a flat string
    Used to render rope content to input textbox
  */
  function ropeToString(rope: RopeSequence<string>): string {
    const flattened: string[] = [];
    rope.forEach((value: string) => {
      flattened.push(value);
    });
    return flattened.join('');
  }


  /* 
    Set initial text in the rope and input state
    Used on new connection or reconnection to sync data
  */
  function setInitialText(newText: string) {
    rope.current = RopeSequence.from(Array.from(newText));
    setText(newText);
  }


  /* 
    Update rope based on user input changes
    Calculates difference and creates a minimal operation (insert/delete)
    Then broadcasts the operation via WebSocket
  */
  function updateText(newText: string){
    const oldText = ropeToString(rope.current);

    // Progress i to where text is different
    let i = 0;
    while (i < newText.length && i < oldText.length && newText[i] === oldText[i]){
      i++;
    }

    let op: RopeOperation;

    if (oldText.length > newText.length){
      // Deletion
      let difference = oldText.length - newText.length; // Find the amount deleted
      op = {
        event: 'text_update',
        type: 'delete',
        from: i,
        to: i+difference,
        version: localVersion.current,
        author: localUID.current,
      };
    } else {
      // Insertion
      const inserted = newText.slice(i, newText.length - (oldText.length - i)); // Find length of what to insert
      op = {
        event: 'text_update',
        type: 'insert',
        pos: i,
        value:inserted,
        version: localVersion.current,
        author: localUID.current,
      };
    }
 
    applyOp(op, false);
    socket.current?.send(JSON.stringify(op)); // Pass op to others
    localVersion.current++

    if (debug) {
      console.log(`Local version incremented to ${localVersion.current}`);
    }
  }

  /* 
    useEffect to handle WebSocket communication
    - Listens for and responds to messages from server
    - Handles: input updates, output updates, and syncing on connection
  */
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
          console.log("Parsed Socket data", data);
          console.log("Data", data.event);
        }

        const op: RopeOperation = data.update;

        // Switch statement to tell event from front-end
        switch (data.event) {
          case 'input_update': // User text update
            applyOp(op, false);
            break;
          case 'version_mismatch_update':
            applyOp(op, true);
            console.log(`VERSION MISMATCH HANDLED:\nLOCAL: ${localVersion.current}\nSERVER: ${data.update.version}`);
            localVersion.current = data.update.version;
            break;
          case 'output_update': // User click run
            setOutput(data.update);
            break;
          case 'connection_update': // User connects and needs to update data in input
            if (typeof data.update.text === 'string') {
              setInitialText(data.update.text);
            } else{
              console.log('Connection update text not recieved as a string:', data.update.text); // Debug line
            }
            if(typeof data.update.version === 'number' && localVersion.current === 0){
              localVersion.current = data.update.version;
            } else{
              console.log('Connection update version not recieved as a number:', data.update.version); // Debug line
            }
            if(typeof data.update.uid === 'number'){
              localUID.current = data.update.uid;
            } else{
              console.log('Connection update uid not recieved as a number:', data.update.uid);
            }
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


  /*
    Return hook values:
    - text: Current input text for editor
    - updateText: Function to update input text (and sync)
    - outputText: Output text to be shown in terminal/review panel
  */
  return [text, updateText, outputText, incomingOp];
}
