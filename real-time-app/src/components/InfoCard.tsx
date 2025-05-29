type Props = {
  icon: string;
  header: string;
  description: string;
};

export default function InfoCard({ icon, header, description }: Props) {
  return (
    <div className="flex flex-col items-center text-center border border-Cborder rounded-xl px-6 py-8 bg-panel w-50 h-65 max-w-sm font-fira">
      {/* Icon */}
      <img src={icon} alt={header} className="w-10 h-12 text-accent mb-3" />

      {/* Text content */}
      <div className="items-center text-center">
        <h2 className="text-lg font-semibold text-white">{header}</h2>
        <p className="text-sm text-gray-400 mt-2">{description}</p>
      </div>
    </div>
  );
}
