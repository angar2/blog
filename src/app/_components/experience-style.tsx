import CompanyIntro from './company-intro';
import ProjectCommon, { ProjectCommonProps } from './project-common';
import ProjectIntro, { ProjectIntroProps } from './project-intro';

interface StyleProps {
  title: string;
  descriptions: string[];
}

const styles: StyleProps[] = [
  {
    title: 'Do',
    descriptions: [
      '기획부터 디자인까지 개발 의도를 먼저 파악합니다.',
      '개발 범위와 과제를 먼저 나열하고 일정을 계획합니다.',
      '사용된 로직과 특이사항, 결과물을 기록합니다.',
    ],
  },
  {
    title: 'Can',
    descriptions: [
      '더 나은 방향, 개발 로직과 기획을 주장할 수 있습니다.',
      '새로운 기술과 스타일에 금방 적응할 수 있습니다.',
      '목표량과 일정을 위해서라면 Over working를 마다하지 않습니다.',
    ],
  },
  {
    title: 'Like',
    descriptions: [
      '주도적인 업무 방식을 좋아합니다.',
      '더 효율적인 방식과 해결책을 의논하는 것을 좋아합니다.',
      '친분을 나누고 공유하는 것을 좋아합니다.',
    ],
  },
];

export default function ExperienceStyle() {
  return (
    <div className="mt-12 sm:mt-16">
      <div className="w-full mb-8 py-2 px-1 border-b-2 md:mb-8 md:py-4 md:px-2">
        <p className="text-xl font-medium md:text-2xl">
          Work Style{' '}
          <span className="text-2xl text-[#008B6B] md:text-4xl">.</span>
        </p>
      </div>
      <div className="flex flex-col w-full mx-auto overflow-hidden rounded-md border-[0.0125rem] border-[#2C2C2C] sm:w-11/12">
        <div className="flex gap-2 w-full py-1.5 pr-20 pl-2.5 border-b-[0.0125rem] border-[#2C2C2C] border-opacity-60 sm:2 sm:pl-3">
          <div className="shrink-0 w-2 h-2 bg-red-400 rounded-2xl border-[0.00625rem] border-gray-500 sm:w-3 sm:h-3" />
          <div className="shrink-0 w-2 h-2 bg-amber-300 rounded-2xl border-[0.00625rem] border-gray-500 sm:w-3 sm:h-3" />
          <div className="shrink-0 w-2 h-2 bg-green-400 rounded-2xl border-[0.00625rem] border-gray-500 sm:w-3 sm:h-3" />
        </div>
        <div className="flex flex-col w-full py-4 px-8 bg-[#2C2C2C] bg-opacity-5">
          {styles.map((style, i) => (
            <div
              key={i}
              className="mt-2 text-2xs tracking-wider sm:text-sm sm:mt-4"
            >
              <code className="text-purple-800">export class </code>
              <code className="font-semibold text-red-600">{style.title} </code>
              <code>{'{'}</code>
              <div className="flex flex-col my-1 ml-6 sm:my-2 sm:ml-8">
                {style.descriptions.map((text, j) => (
                  <code key={j} className="mt-1 sm:mt-2">
                    {text}
                  </code>
                ))}
              </div>
              <code>{'}'}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
