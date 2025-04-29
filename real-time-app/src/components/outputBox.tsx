import "../styles/outputBox.css";
import ReactMarkdown from "react-markdown";

type Props = {
  curText: string;
  activeOutput: "terminal" | "review";
  id: string;
};

/*
  Output box Component:
    Resuable Output Box used to view the code output & code review
  
  Props:
    - curText: string
      Text to output
    - activeOutput: string
      Callback function that selects which output to output to the textbox, sets curText = output
  
  Dependencies:
    - ReactMarkdown
      Used to display code review with markdown support
*/
function Outputbox({ curText, activeOutput, id }: Props) {
  return (
    <div className="outputbox-container">
      {activeOutput === "terminal" ? (
        <textarea
          readOnly
          id={id}
          value={curText}
          placeholder="Output will be shown here"
          className="output_textarea"
        />
      ) : (
        <div className="output_markdown_scroll">
          {curText.trim() === "" ? (
            <div className="markdown-placeholder">
              Code review will be shown here
            </div>
          ) : (
            <ReactMarkdown>{curText}</ReactMarkdown>
          )}
        </div>
      )}
    </div>
  );
}

export default Outputbox;
