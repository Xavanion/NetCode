import { useState } from "react";

export default function Settings() {
  const [fontSize, setFontSize] = useState("14");
  const [fontFamily, setFontFamily] = useState("Fira Code");
  const [tabSize, setTabSize] = useState("4");
  const [autosaveEnabled, setAutosaveEnabled] = useState(true);
  const [autosaveInterval, setAutosaveInterval] = useState("5");
  const [defaultPerm, setDefaultPerm] = useState("View");
  const [theme, setTheme] = useState("Dark");
  const [keybind, setKeybind] = useState("VSCode");

  return (
    <div className="p-4 text-white font-fira space-y-10">
      <h1 className="text-3xl font-bold">Settings</h1>

      {/* Profile */}
      <section>
        <h2 className="text-xl mb-4">Profile</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1">Font Size</label>
            <div className="relative">
              <input
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="bg-light-panel text-white px-3 py-2 pr-10 rounded outline-none w-full"
              />
              <span className="absolute right-3 top-2.5 text-gray-400 text-sm">
                px
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Font Family</label>
            <input
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="bg-light-panel text-white px-3 py-2 rounded outline-none w-full"
            />
          </div>
        </div>
      </section>

      {/* Appearance */}
      <section>
        <h2 className="text-xl mb-4">Appearance</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1">Theme</label>
            <div className="relative">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-light-panel text-white px-3 py-2 pr-10 rounded w-full appearance-none focus:outline-none"
              >
                <option>Dark</option>
                <option>Light</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-xs">
                {"\u25BC"}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Key Bindings</label>
            <div className="relative">
              <select
                value={keybind}
                onChange={(e) => setKeybind(e.target.value)}
                className="bg-light-panel text-white px-3 py-2 pr-10 rounded w-full appearance-none focus:outline-none"
              >
                <option>VSCode</option>
                <option>Emacs</option>
                <option>Vim</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-xs">
                {"\u25BC"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Editor */}
      <section>
        <h2 className="text-xl mb-4">Editor</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1">Tab Size</label>
            <input
              value={tabSize}
              onChange={(e) => setTabSize(e.target.value)}
              className="bg-light-panel text-white px-3 py-2 rounded w-full outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Default Permissions</label>
            <div className="relative">
              <select
                value={defaultPerm}
                onChange={(e) => setDefaultPerm(e.target.value)}
                className="bg-light-panel text-white px-3 py-2 pr-10 rounded w-full focus:outline-none
 appearance-none"
              >
                <option>View</option>
                <option>Edit</option>
                <option>No Access</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-xs">
                {"\u25BC"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Autosave */}
      <section>
        <h2 className="text-xl mb-4">Autosave</h2>
        <div className="flex items-center gap-6 flex-wrap">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={autosaveEnabled}
              onChange={() => setAutosaveEnabled(!autosaveEnabled)}
              className="accent-tab-active w-4 h-4"
            />
            Autosave Files
          </label>
          {autosaveEnabled && (
            <div>
              <label className="block text-sm mb-1">Interval (minutes)</label>
              <input
                type="number"
                value={autosaveInterval}
                onChange={(e) => setAutosaveInterval(e.target.value)}
                className="bg-light-panel text-white px-3 py-2 rounded w-24"
              />
            </div>
          )}
        </div>
      </section>

      <button className="bg-tab-active hover:bg-run-hover active:bg-run px-6 py-2 rounded text-black font-semibold hover:opacity-90 transition">
        Save Changes
      </button>
    </div>
  );
}
