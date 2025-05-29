import type { Ref } from "react";

type Props = {
  lineCount: number;
  scrollRef: Ref<HTMLDivElement>;
};

export default function LineNum({ lineCount, scrollRef }: Props) {
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);
  return (
    <div
      ref={scrollRef}
      className="min-w-7 max-w-15 border-r-2 border-r-[#213030] text-right px-1 font-mono text-sm text-[#888] select-none leading-[1.5] pt-3"
    >
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}
