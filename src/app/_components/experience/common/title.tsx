interface titleProps {
  title: string;
}
export default function ExperienceTitle({ title }: titleProps) {
  return (
    <div className="w-full mb-8 py-2 px-1 border-b-2 md:mb-12 md:py-4 md:px-2">
      <p className="text-xl font-medium md:text-2xl">
        {title} <span className="text-2xl text-[#008B6B] md:text-4xl">.</span>
      </p>
    </div>
  );
}
