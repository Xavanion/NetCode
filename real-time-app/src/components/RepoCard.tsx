type Props = {
  name: string;
  descrip: string;
  language: string;
  date: string;
};

export default function RepoCard({ name, descrip, language, date }: Props) {
  return (
    <div className="flex flex-col text-left border border-Cborder rounded-xl px-6 py-4 bg-light-panel w-50 h-65 max-w-sm">
      <p className="text-xl font-semibold">{name}</p>
      <p className="text-gray-400 mt-2 text-sm line-clamp-6 h-40 overflow-hidden">
        {descrip}
      </p>
      <div className="mt-3 mb-2 p-1 px-4 bg-white/5 rounded-xl w-fit">
        {language}
      </div>
      <p className="text-gray-400">{date}</p>
    </div>
  );
}
