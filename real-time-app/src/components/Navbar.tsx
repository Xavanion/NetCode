import { Link } from "react-router-dom";
import logo from "@/assets/site_logo-color.png";

/*
  Navbar Component:
    Reusable Navbar Component that lives at the App level above the main content which switches

  Props:
    - Nothing
  
  Dependencies:
    - Logo from assets
    - Link used to navigate with buttons
*/
function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex items-center justify-between h-[70px] px-[20px] bg-bg border-b-2 border-Cborder text-[#edf0f1] z-[1000]">
      {/* Left section */}
      <div className="flex items-center space-x-2 ml-5 sm:ml-10">
        <Link
          to="/"
          className="flex items-center text-[1.5rem] font-bold text-[#edf0f1] no-underline space-x-[0.5rem]"
        >
          <img src={logo} alt="Logo" className="h-[2.3rem] w-auto" />
          <span>NetCode</span>
        </Link>
      </div>

      {/* Middle section */}
      <div className="flex-1 flex justify-center items-center">
        {/* Example: Insert navigation links here if needed */}
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Example: Add login/signup buttons here */}
      </div>
    </nav>
  );
}

export default Navbar;
