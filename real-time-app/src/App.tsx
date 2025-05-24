import { BrowserRouter, Routes, Route } from "react-router-dom";
import Code from "@/pages/Code";
import Landing from "@/pages/Landing";
import Account from "@/pages/Account";
import Navbar from "@/components/Navbar";
import CreateAccount from "@/pages/CreateAccount";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-bg text-white">
        {/* Used to wrap entire webpage */}
        <Navbar />
        <div className="flex flex-col flex-1 pt-[70px] overflow-hidden mx-5 sm:mx-10">
          {/* Used to wrap non-navbar content to allow easily swapping main content of page*/}
          <Routes>
            <Route path="/" element={<Code />} />
            <Route path="/home" element={<Landing />} />
            <Route path="/account" element={<Account />} />
            <Route path="/create-account" element={<CreateAccount />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
