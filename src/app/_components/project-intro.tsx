export interface ProjectIntroProps {
  projectName: string;
  description: string;
  period: string;
  tasks: string[];
  techStack: string[];
}

export default function ProjectIntro({
  projectName,
  description,
  period,
  tasks,
  techStack,
}: ProjectIntroProps) {
  // 강조 텍스트를 감싸는 함수
  const emphasizeText = (text: string) => {
    const parts = text.split('**');
    return parts.map((part, index) => {
      return index % 2 === 0 ? part : <strong key={index}>{part}</strong>;
    });
  };

  return (
    <div className="mb-16 px-4 md:px-0">
      <div className="mb-4 bg-gray-50 md:bg-transparent">
        <p className="mt-2 py-1 text-2xl font-bold md:mb-2 text-center md:text-3xl md:text-left">
          {projectName}
        </p>
        <div className="flex-col mb-4 pb-1 text-center md:justify-between md:flex-wrap md:flex md:flex-row md:text-left md:border-b-[1.5px]">
          <p className="mb-1 text-sm font-semibold md:text-lg md:mb-0">
            {description}
          </p>
          <p className="text-xs text-gray-500 mt-auto md:text-sm">{period}</p>
        </div>
      </div>
      <div>
        <div className="my-6">
          <p className="mb-3 ml-1 text-sm font-semibold text-gray-600 italic md:text-base">
            WHAT DID I DO .
          </p>
          <ul>
            {tasks.map((text, index) => (
              <li
                key={index}
                className="ml-4 mb-2 text-sm list-disc md:text-lg"
              >
                {emphasizeText(text)}
              </li>
            ))}
          </ul>
        </div>
        <div className="my-8">
          <p className="mb-1 ml-1 text-sm font-semibold text-green-700 italic md:text-base md:mb-2">
            TECH STACK .
          </p>
          <div className="flex flex-wrap">
            {techStack.map((text, index) => (
              <pre className="my-1 mr-2 px-2 bg-gray-100 rounded-md">
                <code className="text-xs text-gray-800 md:text-sm">{text}</code>
              </pre>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
