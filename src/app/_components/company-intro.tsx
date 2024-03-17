import Image from 'next/image';

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
    <div className="w-full mb-8 md:mb-0 pb-4 md:w-2/4">
      <div
        className={`flex items-center pl-2 border-l-[6px] md:mb-2 md:pl-4 ${
          stickerColor ? `border-[${stickerColor}]` : `border-[#b2b2b2]`
        } `}
      >
        <img
          src="/assets/images/experience/logo-image-devmonster.png"
          className="w-auto h-5 mr-1 md:h-7 md:mr-2"
        />
        <h3 className="p-1 text-2xl font-bold md:text-4xl">{companyName}</h3>
      </div>
      <div>
        <p className="mb-1 pl-3 text-sm font-medium md:text-base md:pl-5">
          {position}
        </p>
        <p className="pl-3 text-xs text-gray-500 md:text-sm md:pl-5">
          {period}
        </p>
      </div>
    </div>
  );
}
