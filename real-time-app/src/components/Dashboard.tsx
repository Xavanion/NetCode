import RepoCard from "@/components/RepoCard";
import FileCard from "@/components/FileCard";
import ProjectActivityChart from "./ProjectActivityChart";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  user: string;
};

export default function Dashboard({ user }: Props) {
  return (
    <div className="p-4 font-fira flex flex-col min-h-[calc(100vh-70px)] md:flex-row w-full">
      {/* Repos & Files */}
      <div className="w-full flex flex-col justify-between mb-8">
        {/* Repo List */}
        <div>
          <h1>Welcome Back, {user}!</h1>
          <p className="text-3xl my-8">Your Repositories</p>
          <div className="relative px-2 mx-4">
            <Carousel
              className="w-full px-8 md:px-12"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-4">
                <CarouselItem className="md:basis-1/2 lg:basis-1/3 xl:basis-1/6 pl-8 md:pl-4">
                  <RepoCard
                    name="netcode"
                    descrip="Collaborative Code Editor"
                    language="Go"
                    date="2025-05-28"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-light-panel border border-Cborder" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-light-panel border border-Cborder" />
            </Carousel>
          </div>
        </div>

        {/* FIles & Dash */}
        <div className="flex flex-col md:mx-4 md:flex-row gap-8">
          {/* Favorite Files */}
          <div className="mr-4">
            <p className="text-2xl mt-8">Favorites</p>
            <div className="flex flex-col gap-4 mt-6">
              <FileCard
                repo="netcode"
                fileName="main.go"
                date="2025-05-25 14:45"
              />
              <FileCard
                repo="netcode"
                fileName="main.go"
                date="2025-05-25 14:45"
              />
            </div>
          </div>

          {/* Recent Files */}
          <div className="grid md:grid-cols-2 gap-12 w-3/4">
            <div>
              <p className="text-2xl mt-8">Recent Files</p>
              <div className="flex flex-col gap-4 mt-6">
                <FileCard
                  repo="netcode"
                  fileName="main.go"
                  date="2025-05-25 14:45"
                />
                <FileCard
                  repo="netcode"
                  fileName="main.go"
                  date="2025-05-25 14:45"
                />
                <FileCard
                  repo="netcode"
                  fileName="main.go"
                  date="2025-05-25 14:45"
                />
              </div>
            </div>

            {/* Mini-Dashboard */}
            <ProjectActivityChart />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="w-[300px] border border-Cborder bg-panel rounded p-4 flex flex-col gap-3 min-h-100">
        <div className="flex justify-between items-center">
          <span className="text-white font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-tab-active rounded-full" />
            Notes
          </span>
          <button className="text-white/50 hover:text-white">⋮</button>
        </div>

        <input
          type="text"
          placeholder="Add a note..."
          className="bg-light-panel text-sm text-white/70 px-3 py-2 rounded outline-none"
        />

        <p className="text-white/70 text-sm leading-relaxed">
          Remember to update the{" "}
          <span className="text-white font-mono">README!</span>
          <span className="text-white/40 font-mono ml-2">12:04</span>
        </p>
      </div>
    </div>
  );
}
