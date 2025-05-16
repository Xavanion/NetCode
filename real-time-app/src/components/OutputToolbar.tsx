type Props = {
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
*/
function OutputToolbar({ setActiveOutput }: Props) {
  return (
    <div className="flex items-center bg-[#252526] text-[#ccc] p-2 border-b border-[#333] text-[13px] font-fira">
      <ul className="list-none flex m-0 p-0">
        <li className="flex items-center gap-2">
          <button
            className="btn-flat"
            onClick={() => setActiveOutput("terminal")}
          >
            Terminal
          </button>
          <button
            className="btn-flat"
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
