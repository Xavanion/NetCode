import { useEffect, useRef, useState } from "react";
import type { RopeOperation } from "../hooks/useRopes";
import LineNum from "@/components/LineNum";

type Props = {
  curText: string;
  setText: (value: string) => void;
  incomingOp: RopeOperation[];
  id: string;
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
function Textbox({ curText, setText, incomingOp, id }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lastTextRef = useRef<string>(""); // Keep last known value
  const cursorRef = useRef<number>(0); // Keep cursor position

  // TODO: Add Line Count feature
  const [numLines, setNumLines] = useState(1);

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
      while (incomingOp.length > 0) {
        var headOp = incomingOp.shift();
        if (!headOp) return;
        if (headOp.type === "insert" && headOp.pos <= currentCursor) {
          currentCursor += headOp.value.length;
        } else if (headOp.type === "delete") {
          if (headOp.to <= currentCursor) {
            currentCursor -= headOp.to - headOp.from;
          } else if (headOp.from < currentCursor && currentCursor < headOp.to) {
            currentCursor = headOp.from;
          }
        }
      }

      textarea.value = curText;
      lastTextRef.current = curText;
      textarea.setSelectionRange(currentCursor, currentCursor);
    }
  }, [curText, incomingOp]);

  return (
    <div className="flex flex-1 flex-row border-2 border-[#213030] rounded">
      <LineNum lineCount={numLines} />
      <textarea
        id={id}
        ref={textareaRef}
        onInput={handleInput}
        placeholder="Enter your text here"
        className="textbox font-fira"
      />
    </div>
  );
}
export default Textbox;
