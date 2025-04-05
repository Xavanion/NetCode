import { useEffect, useRef, useState } from 'react';
import RopeSequence from 'rope-sequence';

type RopeOperation =
  | { type: 'insert'; pos: number; value: string }
  | { type: 'delete'; from: number; to: number };

export function useRopeEditor(socket: WebSocket) {

  const rope = RopeSequence.toString();


  /*
  const ropeRef = useRef(rope(''));
  const [text, setText] = useState('');

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
