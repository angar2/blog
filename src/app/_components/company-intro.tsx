import Image from 'next/image';

interface CompanyIntroProps {
  companyName: string;
  companyIntro: string;
  position: string;
  period: string;
  stickerColor?: string;
}

export default function CompanyIntro({
  companyName,
  companyIntro,
  position,
  period,
  stickerColor,
}: CompanyIntroProps) {
  return (
    <div className="w-full mb-4 lg:mb-0 pb-4 lg:w-2/4 sm:mb-8">
      <div
        className={`flex items-start pl-2 md:mb-2 ${
          stickerColor ? `border-[${stickerColor}]` : `border-[#b2b2b2]`
        } `}
      >
        <div className="flex justify-center items-center max-w-16 w-12 p-2 aspect-square overflow-hidden shadow-d  border-black rounded-md md:w-full">
          <img
            alt="logo"
            src="/assets/images/experience/logo-image-devmonster.png"
            className="w-auto"
          />
        </div>
        <div className="ml-2 md:ml-4">
          <h3 className="ml-1 text-2xl font-bold md:text-4xl md:mb-0">
            {companyName}
          </h3>
          <h5 className="ml-1 text-sm font-medium md:text-base">
            {companyIntro}
          </h5>
          <div className="flex items-center">
            <pre className="w-fit my-2 px-2 bg-gray-100 rounded-md">
              <code className="text-xs text-gray-800 md:text-sm">
                {position}
              </code>
            </pre>
            <p className="ml-2 text-xs text-gray-500 md:text-sm md:pl-5">
              {period}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
