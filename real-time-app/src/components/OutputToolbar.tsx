import "../styles/Toolbar.css";

type Props = {
  activeOutput: "terminal" | "review";
  setActiveOutput: (val: "terminal" | "review") => void;
};

/*
  Output Toolbar Component:
    Reusable output Toolbar UI component that lets the user:
      - Select to display output text
      - Select to display code review text

    Props:
      - activeOutput: string
        Used to tell which component to display
      - setActiveOutput: (val: string) => void
        Callback function to set the current tab displayed

tailwind button: "bg-none border-none text-[#ccc] px-1.5 py-3 rounded-sm cursor-pointer text-sm transition"
*/
function OutputToolbar({ activeOutput, setActiveOutput }: Props) {
  return (
    <div className="flex items-center bg-[#252526] text-[#ccc] p-2 border-b border-[#333] text-[13px] font-fira toolbar">
      <ul className="list-none flex m-0 p-0">
        <li className="flex items-center gap-2">
          <button
            className={activeOutput === "terminal" ? "active" : ""}
            onClick={() => setActiveOutput("terminal")}
          >
            Terminal
          </button>
          <button
            className={activeOutput === "review" ? "active" : ""}
            onClick={() => setActiveOutput("review")}
          >
            Review
          </button>
        </li>
      </ul>
    </div>
  );
}

export default OutputToolbar;
