export interface ProjectCommonProps {
  tasks: string[];
}

export default function ProjectCommon({ tasks }: ProjectCommonProps) {
  // 강조 텍스트를 감싸는 함수
  const emphasizeText = (text: string) => {
    const parts = text.split('**');
    return parts.map((part, index) => {
      return index % 2 === 0 ? part : <strong key={index}>{part}</strong>;
    });
  };

  return (
    <div className="mb-16 px-4 md:px-0">
      <div className="mb-2 bg-orange-50 md:bg-transparent">
        <p className="mt-2 py-1 text-lg font-bold md:mb-2 text-center md:text-2xl md:text-left">
          공통 작업
        </p>
      </div>
      <div className="mb-6">
        <ul>
          {tasks.map((text, index) => (
            <li key={index} className="ml-4 mb-2 text-sm list-disc md:text-lg">
              {emphasizeText(text)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
