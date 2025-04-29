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

tailwind button: "bg-none border-none text-[#ccc] px-1.5 py-3 rounded-sm cursor-pointer text-sm transition hover:bg-[#3c3c3c] active:bg-[#ccc] active:text-white"
*/
function OutputToolbar({ setActiveOutput }: Props) {
  return (
    <div className="flex items-center bg-[#252526] text-[#ccc] p-2 border-b border-[#333] text-[13px] font-fira">
      <ul className="list-none flex m-0 p-0">
        <li className="flex items-center gap-2">
          <button
            className="bg-none border-none text-[#ccc] px-1.5 py-3 rounded-sm cursor-pointer text-sm transition hover:bg-[#3c3c3c] active:bg-[#ccc] active:text-white"
            onClick={() => setActiveOutput("terminal")}
          >
            Terminal
          </button>
          <button
            className="bg-none border-none text-[#ccc] px-1.5 py-3 rounded-sm cursor-pointer text-sm transition hover:bg-[#3c3c3c] active:bg-[#ccc] active:text-white"
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
