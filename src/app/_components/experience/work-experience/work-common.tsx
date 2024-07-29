import { TextFormat } from '@/lib/utils/textUtils';
import SectionHeader from '../common/section-header';

export interface CommonProps {
  tasks: string[];
  techStacks: string[];
}

export default function WorkCommon({ tasks, techStacks }: CommonProps) {
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
      <div className="my-4">
        <div className="flex flex-wrap">
          {techStacks.map((text, index) => (
            <pre
              key={index}
              className="my-1 mr-2 px-2 border-[0.0625rem] rounded-md hover:border-[#9D4AD1]"
            >
              <code className="text-xs text-[#9D4AD1] md:text-sm">{text}</code>
            </pre>
          ))}
        </div>
      </div>
    </div>
  );
}
