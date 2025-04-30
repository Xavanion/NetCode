import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#14181d] text-white font-sans flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h1 className="text-6xl font-extrabold">NetCode</h1>
        <p className="mt-4 text-lg text-gray-300 max-w-xl">
          A real-time collaborative code editor, designed for seamless
          collaboration and built with performance in mind.
        </p>
        <div className="mt-8 flex gap-4">
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
    </div>
  );
}
