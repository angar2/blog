interface SectionHeaderProps {
  name: string;
}
export default function SectionHeader({ name }: SectionHeaderProps) {
  return (
    <div className="mb-4 border-b-2 sm:mb-6">
      <p className="mt-2 py-1 text-base font-semibold italic md:mb-2 md:text-2xl">
        {name} .
      </p>
    </div>
  );
}
