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
    <div className="font-fira flex flex-1 flex-col p-3 text-sm leading-[1.5] text-[#d4d4d4] bg-[#1e1e1e] border-none resize-none outline-none">
      {activeOutput === "terminal" ? (
        <textarea
          readOnly
          id={id}
          value={curText}
          placeholder="Output will be shown here"
          className="flex-1 p-3 border-none outline-none resize-none w-full h-full"
        />
      ) : (
        <div className="w-full h-full border-none overflow-y-auto textbox">
          {curText.trim() === "" ? (
            <span className="text-gray-300 opacity-50">
              Code review will be shown here
            </span>
          ) : (
            <ReactMarkdown>{curText}</ReactMarkdown>
          )}
        </div>
      )}
    </div>
  );
}

export default Outputbox;
