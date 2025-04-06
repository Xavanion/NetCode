import { useEffect, useRef, useState } from 'react';
import { useWS } from './WebSocketContext';
import RopeSequence from 'rope-sequence';

// Define types that the rope can do
type RopeOperation ={ event: 'text_update'; type: 'insert'; pos: number; value: string } | { event: 'text_update'; type: 'delete'; from: number; to: number };

export function useRopes(): [string, (newText:string) => void, string] {
  const rope = useRef(RopeSequence.empty as RopeSequence<string>);
  const [text, setText] = useState('');
  const [outputText, setOutput] = useState('');
  const socket = useWS();
  const debug: boolean = false;


  // Do the operation on the rope
  const applyOp = (op: RopeOperation) => {
    let curRope = rope.current;
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
    setText(curText); // maybe rope.current.toString() if errors
  }


  function ropeToString(rope: RopeSequence<string>): string {
    const flattened: string[] = [];
    rope.forEach((value: string) => {
      flattened.push(value);
    });
    return flattened.join('');
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
      let difference = oldText.length - newText.length;
      const op: RopeOperation = {event: 'text_update', type: 'delete', from: i, to: i+difference};
      applyOp(op);
      socket.current?.send(JSON.stringify(op));
    } else {
      // Insertion
      const op: RopeOperation = {event: 'text_update', type: 'insert', pos: i, value:newText[i]}
      applyOp(op);
      socket.current?.send(JSON.stringify(op));
    }
    setText(newText);
  }
  
  // Recieve websocket changes
  useEffect(() => {
    if (!socket.current) return;
    socket.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (debug){
        console.log("Raw socket data:", e);
        console.log("Parsed Socket data", data);
        console.log("Data", data.event);
        console.log("Op", data.update);
      }
      switch (data.event) {
        case 'input_update':
          const op: RopeOperation = data.update;
          applyOp(op);    
          break;
        case 'output_update':
          const output = data.update;
          setOutput(output);
          break;
        default:
          console.warn("Unknown WebSocket event:", data);
          return;
      }
    }
  }, [socket.current])

  // Return text to text box
  return [text, updateText, outputText];
}
