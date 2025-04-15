import { useEffect, useRef } from 'react';
import '../styles/textbox.css';

type Props = {
  curText: string;
  setText: (value: string) => void;
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

    Functions:
      - handleInput: Handles when the user enters & changes the textbox through DOM manipulation
      - useEffect: Handles when someone else changes the DOM element

    Dependencies:
      - No outside dependencies outside of passed Props
*/
function Textbox({ curText, setText }: Props) {
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
      const currentCursor = textarea.selectionStart;
      textarea.value = curText;
      lastTextRef.current = curText;
      textarea.setSelectionRange(currentCursor, currentCursor); // Restore cursor
    }
  }, [curText]);
  

  return (
    <div className="textbox-container">
      <textarea
        ref={textareaRef}
        onChange={handleInput}
        placeholder="Enter your text here"
        className="textarea"
      />
    </div>
  );
}
export default Textbox;
