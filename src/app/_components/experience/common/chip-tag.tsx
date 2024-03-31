interface ChipTagProps {
  name: string;
  color?: string;
}
export default function ChipTag({ name, color }: ChipTagProps) {
  const bgColor = color ? color : '2C2C2C';
  return (
    <div
      className={`w-fit h-fit mb-2 py-1 px-2 rounded-lg bg-[#${bgColor}] md:mb-4`}
    >
      <p className="text-xs text-[#FFF5EF] md:text-sm">{name}</p>
    </div>
  );
}
