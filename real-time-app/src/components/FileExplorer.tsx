import { useState } from "react";
import { ChevronDown, ChevronRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils"; // if using class merging util
import folderClosed from "@/assets/folder.svg";
import folderOpen from "@/assets/folder-open.svg";

const mockData = {
  src: ["index.tsx", "App.tsx", "package.json"],
  backend: ["main.go", "README.md"],
  src1: ["index.tsx", "App.tsx", "package.json"],
  backend1: ["main.go", "README.md"],
  src2: ["index.tsx", "App.tsx", "package.json"],
  backend2: ["main.go", "README.md"],
  src3: ["index.tsx", "App.tsx", "package.json"],
  backend3: ["main.go", "README.md"],
  src4: ["index.tsx", "App.tsx", "package.json"],
  backend4: ["main.go", "README.md"],
  src5: ["index.tsx", "App.tsx", "package.json"],
  backend5: ["main.go", "README.md"],
  src6: ["index.tsx", "App.tsx", "package.json"],
  backend6: ["main.go", "README.md"],
  src7: ["index.tsx", "App.tsx", "package.json"],
  backend7: ["main.go", "README.md"],
  src8: ["index.tsx", "App.tsx", "package.json"],
  backend8: ["main.go", "README.md"],
};

export default function FileExplorer() {
  const [openRepos, setOpenRepos] = useState<Record<string, boolean>>({});

  const toggleRepo = (repo: string) =>
    setOpenRepos((prev) => ({ ...prev, [repo]: !prev[repo] }));

  return (
    <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
      {Object.entries(mockData).map(([repo, files]) => {
        const isOpen = openRepos[repo];
        return (
          <div key={repo}>
            <button
              onClick={() => toggleRepo(repo)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 w-full rounded-md hover:bg-[#0f1a1e] text-white font-medium outline-none",
                isOpen && "bg-[#0f1a1e]"
              )}
            >
              {isOpen ? (
                <div className="flex flex-row">
                  <ChevronDown className="w-4 h-4 text-accent" />
                  <img src={folderOpen} className="ml-1 h-4" />
                </div>
              ) : (
                <div className="flex flex-row">
                  <ChevronRight className="w-4 h-4 text-accent" />
                  <img src={folderClosed} className="ml-1 h-4" />
                </div>
              )}
              {repo}
            </button>
            {isOpen && (
              <div className="pl-8 mt-1 flex flex-col gap-1">
                {files.map((file) => (
                  <div
                    key={file}
                    className="flex items-center gap-2 text-muted-foreground hover:text-white cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="truncate">{file}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
