import { useEffect, useRef, useState } from 'react';
import RopeSequence from 'rope-sequence';

// Define types that the rope can do
type RopeOperation ={ type: 'insert'; pos: number; value: string } | { type: 'delete'; from: number; to: number };


export function useRopes(socket: WebSocket | null) {
  const rope = useRef(RopeSequence.empty);
  const [text, setText] = useState('');


  // Do the operation on the rope
  const applyOp = (op: RopeOperation) => {
    curRope = rope.current;
    if (op.type === 'insert'){
      
    }else if (op.type === 'delete'){

    }
  }

  // Update text ref for textbox display
  function updateText(){

  }

  // Send websocket of change
  

  // Return text to text box
  return [text, updateText];



  /*
  const applyOperation = (op: RopeOperation) => {
    if (op.type === 'insert') {
      ropeRef.current.insert(op.pos, op.value);
    } else if (op.type === 'delete') {
      ropeRef.current.remove(op.from, op.to);
    }
    setText(ropeRef.current.toString());
  };

  const handleChange = (newText: string) => {
    const oldText = ropeRef.current.toString();

    // Simple diff logic (insert or delete one region)
    let i = 0;
    while (i < newText.length && i < oldText.length && newText[i] === oldText[i]) {
      i++;
    }

    if (oldText.length > newText.length) {
      // deletion
      const diffLen = oldText.length - newText.length;
      const op: RopeOperation = { type: 'delete', from: i, to: i + diffLen };
      ropeRef.current.remove(op.from, op.to);
      socket.send(JSON.stringify(op));
    } else if (newText.length > oldText.length) {
      // insertion
      const inserted = newText.slice(i, newText.length - (oldText.length - i));
      const op: RopeOperation = { type: 'insert', pos: i, value: inserted };
      ropeRef.current.insert(op.pos, op.value);
      socket.send(JSON.stringify(op));
    }

    setText(newText);
  };

  useEffect(() => {
    socket.onmessage = (e) => {
      const op: RopeOperation = JSON.parse(e.data);
      applyOperation(op);
    };
  }, [socket]);

  return { text, handleChange };*/
}
