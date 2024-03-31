import { emphasizeText } from '@/lib/utils/textUtils';
import BulletedList from '../common/bulleted-list';

export interface ProjectProps {
  projectName: string;
  description: string;
  period: string;
  tasks: string[];
  techStack: string[];
}

export default function WorkProject({
  projectName,
  description,
  period,
  tasks,
  techStack,
}: ProjectProps) {
  return (
    <div className="mb-16 px-4 md:px-0">
      <div className="mb-6">
        <p className="mt-2 py-1 text-2xl font-bold md:mb-2 md:text-3xl">
          {projectName}
        </p>
        <div className="flex flex-col mb-4 pb-1 border-b-[0.1rem] md:justify-between md:flex-wrap md:flex-row">
          <p className="mb-1 text-sm font-semibold md:text-lg md:mb-0">
            {description}
          </p>
          <p className="text-xs text-gray-500 mt-auto md:text-sm">{period}</p>
        </div>
      </div>
      <div>
        <div className="mb-6">
          <p className="mb-3 ml-1 text-sm font-semibold text-gray-600 italic md:text-base">
            WHAT DID I DO .
          </p>
          <BulletedList list={tasks} />
        </div>
        <div className="my-4">
          <div className="flex flex-wrap">
            {techStack.map((text, index) => (
              <pre className="my-1 mr-2 px-2 border-[0.0625rem] rounded-md hover:border-[#9D4AD1]">
                <code className="text-xs text-[#9D4AD1] md:text-sm">
                  {text}
                </code>
              </pre>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
