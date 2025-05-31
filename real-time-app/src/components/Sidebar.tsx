import WorkspaceSwitcher from "@/components/WorkspaceSwitcher";
import FileExplorer from "@/components/FileExplorer";

export default function Sidebar() {
  return (
    <div className="flex flex-col w-full p-3 h-full min-h-0 border-t-2 border-t-Cborder">
      <WorkspaceSwitcher />
      <p className="font-fira font-semibold underline underline-offset-4">
        Files:
      </p>
      <div className="mb-1 flex-1 min-h-0 overflow-y-auto custom-scroll">
        <FileExplorer />
      </div>
    </div>
  );
}
