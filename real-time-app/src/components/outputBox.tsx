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
    <div className="font-fira flex flex-1 flex-col h-full p-3 text-sm leading-[1.5] text-[#d4d4d4] bg-[#1e1e1e] border-none resize-none outline-none">
      {activeOutput === "terminal" ? (
        <textarea
          readOnly
          id={id}
          value={curText}
          placeholder="Output will be shown here"
          className="flex-1 p-3 border-none outline-none resize-none w-full h-full"
        />
      ) : (
        <div className="flex-1 p-3 text-sm leading-[1.5] text-[#d4d4d4] bg-[#1e1e1e] w-full h-full border-none outline-none resize-none">
          {curText.trim() === "" ? (
            <div className="flex-1 p-3 text-sm leading-[1.5] text-[#d4d4d4] bg-[#1e1e1e] w-full h-full overflow-y-auto border-none outline-none resize-none">
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
