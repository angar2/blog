import { TextFormat } from '@/lib/utils/textUtils';
import SectionHeader from '../common/section-header';

export interface CommonProps {
  tasks: string[];
}

export default function WorkCommon({ tasks }: CommonProps) {
  return (
    <div className="mb-16 px-4 md:px-0">
      {/* <div className="mb-2">
        <p className="mt-2 py-1 text-xl font-bold md:mb-2 md:text-2xl">
          Main Job
        </p>
      </div> */}
      <SectionHeader name={'Main Job'} />
      <div className="mb-6 ml-2 md:ml-4">
        <ul>
          {tasks.map((text, index) => (
            <li key={index} className="ml-4 mb-2 text-sm list-disc md:text-lg">
              {TextFormat(text)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
