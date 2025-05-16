import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { AppConfig } from "../config";

type Props = {
  reviewText: (text: string) => void;
};

/* 
Tool Bar Component:
  Reusable Toolbar UI component that lets someone:
    - Select a programming language from a dropdown menu
    - Send code execution to the backend
    - Trigger AI code reviews via Gemini

Props:
  - reviewText: (text: string) => void
    A callback function used to update the review text area with the response from the backend AI code review
    Called to when clicking the "review code" button

Dependencies:
  - useState
  - FontAwesome (For dropdown icon)
  - Appconfig for room ID/Config
*/
function Toolbar({ reviewText }: Props) {
  const [selectedLang, setLanguage] = useState("C");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const languages = ["C", "Python", "Java", "C++", "Go", "Rust", "TypeScript"];
  const hostname = window.location.hostname;

  const selectLanguage = (lang: string) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  async function run_code() {
    try {
      const response = await fetch(
        `${location.protocol}//${hostname}:${AppConfig.port}/api`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event: "run_code",
            language: selectedLang,
            room: AppConfig.roomId,
          }),
        }
      );
      if (response.ok) {
        console.log("Run successful");
      }
    } catch (error) {
      console.error("Error Occured:", error);
    }
  }

  async function handleReviewClick() {
    try {
      const response = await fetch(
        `${location.protocol}//${hostname}:${AppConfig.port}/api`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "code_review",
            room: AppConfig.roomId,
          }),
        }
      );
      if (response.ok) {
        console.log("Code Review sent successfully");
        const data = await response.json();
        reviewText(data.review);
      }
    } catch (error) {
      console.error("Error Occured with code review:", error);
    }
  }

  return (
    <div className="flex items-center bg-[#252526] text-[#ccc] px-3 py-2 border-b border-[#333] text-xs font-fira">
      <ul className="flex">
        <li className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-1.5 bg-none text-sm transition px-2 py-2 rounded-md w-[115px] border active:bg-[#cccccc35]"
            >
              {selectedLang} <FontAwesomeIcon icon={faCaretDown} />
            </button>
            {dropdownOpen && (
              <ul className="absolute top-9 left-0 flex flex-col bg-[#252526] border rounded-md w-full z-10">
                {languages.map((lang) => (
                  <li
                    className="py-2 px-2 cursor-pointer hover:bg-[#3c3c3c] transition"
                    key={lang}
                    onClick={() => selectLanguage(lang)}
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button onClick={run_code} className="btn-flat">
            Run
          </button>
          <button onClick={handleReviewClick} className="btn-flat">
            Review Code
          </button>
        </li>
      </ul>
    </div>
  );
}
export default Toolbar;
