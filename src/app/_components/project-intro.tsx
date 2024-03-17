export interface ProjectIntroProps {
  projectName: string;
  description: string;
  period: string;
  tasks: string[];
  techStack: string;
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
    <div className="mb-5">
      <div>
        <p className="py-1 text-xl font-semibold">{projectName}</p>
        <div className="flex-col mb-2 border-b-[1px] md:justify-between md:flex-wrap md:flex md:flex-row">
          <p>{description}</p>

          <p className="text-sm text-gray-500">{period}</p>
        </div>
        <div className="mb-2">
          <p className="mb-1 font-semibold">WHAT DID I DO</p>
          <ul>
            {tasks.map((text, index) => (
              <li key={index} className="ml-4 list-disc">
                {emphasizeText(text)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <p className="mb-1 font-semibold">TECH STACK</p>
        <p>{techStack}</p>
      </div>
    </div>
  );
}
