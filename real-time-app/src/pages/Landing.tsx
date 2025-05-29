import { Link } from "react-router-dom";
import photo from "@/assets/example.png";
import InfoCard from "@/components/InfoCard";
import lightning from "@/assets/lightning.svg";
import review from "@/assets/code-review.svg";
import users from "@/assets/users.svg";

export default function Landing() {
  return (
    <div className="flex flex-col flex-1 items-center px-4 font-fira">
      {/* Hero Section */}
      <div className="mt-[clamp(3rem,5vh,8rem)] flex flex-col items-center justify-center text-center">
        <section className="flex relative max-w-xl">
          <img
            src={photo}
            className="w-full h-auto rounded-lg shadow-[0_0_200px_rgba(0,255,255,0.25)] border-2 border-Cborder"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform flex flex-row gap-4 items-center">
            <Link to="/">
              <button className="bg-run hover:bg-run-hover active:bg-tab-active btn-base shadow-md">
                Try it out
              </button>
            </Link>
          </div>
        </section>

        {/* Feature Cards */}
        <div className="mt-30 flex flex-col md:flex-row gap-12 items-center w-full">
          <InfoCard
            icon={users}
            header="Live Collaboration"
            description="Edit together in real-time"
          />
          <InfoCard
            icon={review}
            header="AI Code Review"
            description="Get code feedback with AI-powered code reviews"
          />
          <InfoCard
            icon={lightning}
            header="Instant Execution"
            description="Run with a single click and see results immediately"
          />
        </div>
      </div>
    </div>
  );
}
