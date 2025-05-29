// src/pages/Account.tsx
import gitlogo from "@/assets/git_logo.png";

export default function Account() {
  return (
    <div className="flex flex-col items-center justify-center mt-30 text-white">
      <div className="bg-[#081921] border border-Cborder rounded-xl px-8 py-10 w-full max-w-sm shadow-[0_0_20px_rgba(0,255,255,0.15)]">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="bg-[#113849] border border-Cborder rounded-md px-4 py-2 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-[#113849] border border-Cborder rounded-md px-4 py-2 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="bg-run hover:bg-run-hover active:bg-tab-active rounded-md py-2 font-semibold"
          >
            Sign In
          </button>
        </form>
        <div className="my-4 border-t border-gray-600"></div>
        <button className="flex items-center justify-center gap-2 w-full border border-Cborder rounded-md py-2 hover:bg-[#1f2937] transition-colors">
          <img src={gitlogo} alt="github logo" className="h-[1.5rem] w-auto" />
          <span className="font-medium">Sign in with GitHub</span>
        </button>
      </div>
    </div>
  );
}
