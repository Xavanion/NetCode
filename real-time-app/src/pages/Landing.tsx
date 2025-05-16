import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <div className="mt-[clamp(10rem,5vh,20rem)] flex flex-col md:flex-row items-center justify-center text-center">
        <section className="flex flex-col max-w-xl">
          <h1 className="text-6xl font-extrabold">NetCode</h1>
          <p className="mt-4 text-lg text-gray-300">
            A real-time collaborative code editor, designed for seamless
            collaboration and built with performance in mind.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/">
              <button className="bg-blue-800 hover:bg-blue-900 btn-base">
                Try it out
              </button>
            </Link>
            <a href="https://github.com/Xavanion/NetCode" target="_blank">
              <button className="border border-gray-400 hover:bg-gray-800 btn-base">
                View on GitHub
              </button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
