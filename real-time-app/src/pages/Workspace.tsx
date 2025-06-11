import Dashboard from "@/components/Dashboard";
import dashIcon from "@/assets/dashboard.svg";
import codeIcon from "@/assets/code-file.svg";
import settingsIcon from "@/assets/settings.svg";
import Code from "@/pages/Code";
import Settings from "@/pages/Settings";
import Sidebar from "@/components/Sidebar";

type Props = {
  currentSite: string;
  setSite: (site: string) => void;
};

export default function Workspace({ currentSite, setSite }: Props) {
  const buttonClass = (active: boolean) =>
    `h-10 w-45 p-5 rounded-xl items-center text-center flex flex-row cursor-pointer ${
      active ? "bg-light-panel" : ""
    }`;

  const textClass = (active: boolean) =>
    `font-semibold ${active ? "text-tab-active" : "text-white/75"}`;

  return (
    <div className="flex flex-row">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col pt-10 items-center gap-5 w-[230px] flex-shrink-0 border-r-2 border-r-Cborder h-[calc(100vh-70px)]">
        <div
          className={buttonClass(currentSite === "dash")}
          onClick={() => setSite("dash")}
        >
          <img src={dashIcon} className="mr-2" />
          <p className={textClass(currentSite === "dash")}>Dashboard</p>
        </div>
        <div
          className={buttonClass(currentSite === "code")}
          onClick={() => setSite("code")}
        >
          <img src={codeIcon} className="mr-2" />
          <p className={textClass(currentSite === "code")}>Code</p>
        </div>
        <div
          className={buttonClass(currentSite === "settings")}
          onClick={() => setSite("settings")}
        >
          <img src={settingsIcon} className="mr-2" />
          <p className={textClass(currentSite === "settings")}>Settings</p>
        </div>
        <Sidebar />
      </div>

      {/* Expandable Area */}
      <div className="w-2 relative cursor-col-resize">
        <div className="absolute inset-y-0 left-1/2 w-2 -translate-x-1/2" />
        <div className="relative w-1 h-full bg-Cborder" />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {currentSite === "dash" && <Dashboard user="Barrett" />}
        {currentSite === "code" && <Code />}
        {currentSite === "settings" && <Settings />}
      </div>
    </div>
  );
}
