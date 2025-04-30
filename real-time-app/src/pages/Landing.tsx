import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-70px)] bg-[#14181d] text-white font-sans flex items-center justify-center px-4 overflow-hidden">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center text-center w-full max-w-screen-xl">
        <section className="flex flex-col items-center justify-center max-w-xl flex-1">
          <h1 className="text-6xl font-extrabold">NetCode</h1>
          <p className="mt-4 text-lg text-gray-300">
            A real-time collaborative code editor, designed for seamless
            collaboration and built with performance in mind.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-6 py-3 rounded-xl transition-all duration-200">
                Try it out
              </button>
            </Link>
            <a href="https://github.com/Xavanion/NetCode" target="_blank">
              <button className="border border-gray-400 text-white font-semibold text-lg px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-200">
                View on GitHub
              </button>
            </a>
          </div>
        </section>
        <section className="mt-12 md:mt-0 md:ml-16">
          <h1>FUTURE DEMO VID</h1>
        </section>
      </div>
    </div>
  );
}
