import WorkspaceSwitcher from "@/components/WorkspaceSwitcher";
import FileExplorer from "@/components/FileExplorer";
import BranchSwapper from "@/components/BranchSwapper";

export default function Sidebar() {
  return (
    <div className="flex flex-col w-full p-3 h-full min-h-0 border-t-2 border-t-Cborder">
      <WorkspaceSwitcher />
      <BranchSwapper />
      <div className="mt-1 flex-1 min-h-0 overflow-y-auto custom-scroll">
        <FileExplorer />
      </div>
    </div>
  );
}
