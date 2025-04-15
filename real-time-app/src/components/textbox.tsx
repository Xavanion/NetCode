import { useEffect, useRef } from 'react';
import '../styles/textbox.css';
import type { RopeOperation } from '../hooks/useRopes'; // Adjust path as needed


type Props = {
  curText: string;
  setText: (value: string) => void;
  incomingOp: (RopeOperation | null);
};


/*
  Textbox Component:
    Reusable Textbox component that lets someone:
      - Enter text to a textbox
      - Sync requests the text with the backend
      - Retrieve text updates from the backend

    Props:
      - curText: string
        A string that when called to retrieves the current text inputted in the textbox
      - setText: (value: string) => void
        A callback function used to update the textbox when typing
      - incomingOp: RopeOperation | null
        A RopeOperation that declares if the most recent change was an update or a delete and the position of it, used for cursor management

    Functions:
      - handleInput: Handles when the user enters & changes the textbox through DOM manipulation
      - useEffect: Handles when someone else changes the DOM element

    Dependencies:
      - No outside dependencies outside of passed Props
*/
function Textbox({ curText, setText, incomingOp }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lastTextRef = useRef<string>(''); // Keep last known value
  const cursorRef = useRef<number>(0); // Keep cursor position
  
  // Used to handle user-inputted changes
  const handleInput = () => {
    // Grab the textarea DOM element
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Grad current value from DOM and save where cursor is
    const newText = textarea.value;
    cursorRef.current = textarea.selectionStart ?? 0;


    // Only update text changed
    if (newText !== lastTextRef.current) {
      setText(newText);
      lastTextRef.current = newText;
    }
  };

  // Used to handle incoming changes
  useEffect(() => {
    // Get current DOM element
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Only update it if the text is different
    if (curText !== lastTextRef.current) {
      // Grab cursor, update text and restore cursor
      let currentCursor = textarea.selectionStart ?? 0;
      if (incomingOp){
        if(incomingOp.type === 'insert' && incomingOp.pos <= currentCursor){
          currentCursor += incomingOp.value.length;
        } else if (incomingOp.type === 'delete'){
          if (incomingOp.to <= currentCursor){
            currentCursor -= (incomingOp.to - incomingOp.from); 
          } else if (incomingOp.from < currentCursor && currentCursor < incomingOp.to){
            currentCursor = incomingOp.from;
          }
        }
      }

      textarea.value = curText;
      lastTextRef.current = curText;
      textarea.setSelectionRange(currentCursor, currentCursor);
    }
  }, [curText, incomingOp]);
  

  return (
    <div className="textbox-container">
      <textarea
        ref={textareaRef}
        onInput={handleInput}
        placeholder="Enter your text here"
        className="textarea"
      />
    </div>
  );
}
export default Textbox;
