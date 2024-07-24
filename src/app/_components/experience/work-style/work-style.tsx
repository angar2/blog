import ExperienceTitle from '../common/title';
import StylePart from './style-part';

interface StyleProps {
  title: string;
  descriptions: string[];
}

const styles: StyleProps[] = [
  {
    title: 'Do',
    descriptions: [
      '기획부터 디자인까지 프로젝트의 목표와 의도를 먼저 파악합니다.',
      '작업 전, 개발 범위와 과제를 나열해 정의하고 일정을 세웁니다.',
      '개발 과정에서의 로직, 주요 사항 및 결과물을 기록합니다.',
    ],
  },
  {
    title: 'Can',
    descriptions: [
      '더 나은 방향, 개발 로직과 기획을 제안할 수 있습니다.',
      '새로운 기술과 스타일에 빠르게 적응할 수 있습니다.',
      '목표량과 일정을 위해서라면 야근을 포함한 추가 노력을 기꺼이 감수합니다.',
    ],
  },
  {
    title: 'Like',
    descriptions: [
      '능동적이고 주도적인 업무 방식을 좋아합니다.',
      '더 효율적인 방식과 해결책을 의논하는 것을 좋아합니다.',
      '친분을 나누고 공유하는 것을 좋아합니다.',
    ],
  },
];

export default function WorkStyle() {
  return (
    <div className="">
      <ExperienceTitle title="Work Style" />
      <div className="flex flex-col w-full mx-auto overflow-hidden rounded-md border-[0.0125rem] border-[#2C2C2C] sm:w-11/12">
        <div className="flex gap-2 w-full py-1.5 pr-20 pl-2.5 border-b-[0.0125rem] border-[#2C2C2C] border-opacity-60 sm:2 sm:pl-3">
          <div className="shrink-0 w-2 h-2 bg-red-400 rounded-2xl border-[0.00625rem] border-gray-500 sm:w-3 sm:h-3" />
          <div className="shrink-0 w-2 h-2 bg-amber-300 rounded-2xl border-[0.00625rem] border-gray-500 sm:w-3 sm:h-3" />
          <div className="shrink-0 w-2 h-2 bg-green-400 rounded-2xl border-[0.00625rem] border-gray-500 sm:w-3 sm:h-3" />
        </div>
        <div className="flex flex-col w-full py-4 px-8 bg-[#2C2C2C] bg-opacity-5">
          {styles.map((style, index) => (
            <div key={index}>
              <StylePart {...style} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
