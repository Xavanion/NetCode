import Textbox from "@/components/textbox";
import Outputbox from "@/components/outputBox";
import Toolbar from "@/components/Toolbar";
import OutputToolbar from "@/components/OutputToolbar";
import { useRopes } from "@/hooks/useRopes";
import { useState } from "react";

/*
  Home Component
    Acts as the main page of the application and ties together core UI components:
      - Toolbar: for running code and requesting AI code reviews
      - Textbox: for user code input (uses rope-based state via `useRopes`)
      - OutputToolbar: toggles between terminal and code review output views
      - Outputbox: displays output from code execution or AI-generated review
  
   Hooks:
    - useRopes: custom hook that returns [inputText, setInputText, outputText]
        - inputText: current input code
        - updateText: function to update the input code
        - outputText: output from the backend (code execution results)
        - incomingOp: Whatever op was used most recently to change the rope
    - useState for:
        - responseText: holds the AI code review text
        - activeOutput: tracks whether terminal or review output is active
 
   UI Structure:
    - Header: Displays "Codin time"
    - Left Pane: Toolbar + editable Textbox for code input
    - Right Pane: OutputToolbar for switching views, Outputbox for display
*/
function Code() {
  const [text, updateText, outputText, incomingOp] = useRopes();
  const [responseText, setReviewText] = useState("");
  const [activeOutput, setActiveOutput] = useState<"terminal" | "review">(
    "terminal"
  );

  return (
    <div className="flex flex-col flex-1 p-[20px]">
      <div className="flex flex-row w-full flex-1">
        {/* Input Box */}
        <div className="flex flex-col flex-[3] mr-[10px] overflow-hidden">
          <Toolbar reviewText={setReviewText} />
          <Textbox
            curText={text}
            setText={updateText}
            incomingOp={incomingOp}
            id="mainInput"
          />
        </div>

        {/* Output Box */}
        <div className="flex flex-col flex-[2] overflow-hidden border-2 border-[#213030] rounded">
          <OutputToolbar setActiveOutput={setActiveOutput} />
          <Outputbox
            curText={activeOutput === "terminal" ? outputText : responseText}
            activeOutput={activeOutput}
            id="mainOutput"
          />
        </div>
      </div>
    </div>
  );
}
export default Code;
