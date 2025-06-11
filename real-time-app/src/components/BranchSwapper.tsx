import branch from "@/assets/git-branch.svg";
import SelectScrollable from "@/components/select-10";

export default function BranchSwapper() {
  return (
    <div className="flex flex-row items-center h-10 gap-2 mt-1">
      <img src={branch} />
      <SelectScrollable />
    </div>
  );
}
