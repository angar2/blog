import { EXPERIENCE_COMPANY_LOGO_IMAGE_URL } from '@/lib/constants';
import Image from 'next/image';

interface CompanyProps {
  companyName: string;
  companyIntro: string;
  position: string;
  period: string;
}

export default function WorkCompany({
  companyName,
  companyIntro,
  position,
  period,
}: CompanyProps) {
  return (
    <div className="w-full mb-4 lg:mb-0 pb-4 lg:w-2/4 sm:mb-8">
      <div className="flex items-start pl-2 md:mb-2">
        {/* 이미지 */}
        <div className="flex justify-center items-center w-12 h-12 md:w-16 md:h-16 p-2 overflow-hidden shadow-d border-black rounded-md">
          <Image
            src={EXPERIENCE_COMPANY_LOGO_IMAGE_URL}
            alt="Company Logo"
            className="object-cover"
            width={48}
            height={48}
          />
        </div>
        <div className="ml-2 md:ml-4">
          <h3 className="ml-1 text-xl font-bold md:text-3xl md:mb-0">
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
