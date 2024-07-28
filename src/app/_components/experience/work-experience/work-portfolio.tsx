import { TextFormat } from '@/lib/utils/textUtils';
import SectionHeader from '../common/section-header';

export interface PortfolioProps {
  projects: string[];
}
export function WorkPortfolio({ projects }: PortfolioProps) {
  return (
    <div className="mb-8 px-4 md:px-0">
      {/* <div className="mb-2">
        <p className="mt-2 py-1 text-xl font-bold md:mb-2 md:text-2xl">
          Portfolio
        </p>
      </div> */}
      <SectionHeader name={'Portfolio'} />
      <div className="mb-6 ml-2 md:ml-4">
        <ol>
          {projects.map((text, index) => (
            <li
              key={index}
              className="ml-4 mb-2 text-sm list-decimal md:text-lg"
            >
              {TextFormat(text)}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
