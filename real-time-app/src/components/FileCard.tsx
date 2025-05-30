import folder from "@/assets/folder.svg";

type Props = {
  repo: string;
  fileName: string;
  date: string;
};

export default function FileCard({ repo, fileName, date }: Props) {
  return (
    <div className="flex flex-row text-left max-w-md border-b-2 border-b-seperator cursor-pointer hover:bg-light-panel">
      <img src={folder} className="ml-4" />
      <div className="flex flex-col ml-4">
        <p className="text-xl">
          {repo}/{fileName}
        </p>
        <p className="text-white/35 text-sm">Last opened on {date}</p>
      </div>
    </div>
  );
}
