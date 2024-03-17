interface CompanyIntroProps {
  companyName: string;
  position: string;
  period: string;
  stickerColor?: string;
}

export default function CompanyIntro({
  companyName,
  position,
  period,
  stickerColor,
}: CompanyIntroProps) {
  return (
    <div className="w-full mb-3 md:mb-0 md:w-2/4">
      <h3
        className={`p-1 text-xl font-semibold border-l-4 ${
          stickerColor ? `border-[${stickerColor}]` : `border-[#b2b2b2]`
        } `}
      >
        {companyName}
      </h3>
      <p className="pl-2">{position}</p>
      <p className="pl-2 text-sm text-gray-500">{period}</p>
    </div>
  );
}
