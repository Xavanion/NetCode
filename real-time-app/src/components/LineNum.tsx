type Props = {
  lineCount: number;
};

export default function LineNum({ lineCount }: Props) {
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);
  return (
    <div className="min-w-7 max-w-15 border-r-2 border-r-[#213030] text-right px-1 font-mono text-sm text-[#888] select-none leading-[1.5] pt-3 overflow-hidden overflow-y-hidden">
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}
