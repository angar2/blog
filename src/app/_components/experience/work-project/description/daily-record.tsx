import BulletedList from '../../common/bulleted-list';
import SectionHeader from '../../common/section-header';
import CodeTag from '../../common/code-tag';
import Image from 'next/image';
import Link from 'next/link';

export default function DailyRecord() {
  return (
    <div className="pl-4 border-l-4 border-gray-400 rounded-md sm:pl-12 lg:border-0 lg:pl-4">
      <SectionHeader name={'Overview'} />
      <div className="mb-4 px-4 md:px-0 md:mb-8">
        <div className="mb-6 md:mb-8">
          <p className="text-sm font-medium italic md:text-lg">
            " 목표를 정하고 하루하루 채워나가는 성취형 프로젝트 플랫폼 "
          </p>
        </div>
      </div>
      <div className="mb-6 px-4 md:px-0 md:mb-8">
        <div className="flex flex-col mb-6 sm:mb-8">
          <BulletedList
            list={[
              '최대한 **Nest.js(TypeORM)**의 기본 기능과 **Restful API**를 활용하여 서버의 안정성을 최대화하기 위해 노력',
              '메인 콘텐츠 구조(Project-Task-Activity)의 **주요 기능 간 관계를 세밀하게 연결**하여 버그 최소화',
              'OAuth, 이메일 등 외부 라이브러리 및 API를 활용해 시스템의 확장성 강화',
              '**DB 테이블 관계**를 철저하게 설계하여 데이터 무결성 강화',
            ]}
          />
        </div>
        <div className="w-fit px-4 md:px-0 mb-6 sm:mb-8">
          <Link className="cursor-pointer hover:underline" href="/project/1">
            <div className="w-32 md:w-40 overflow-hidden rounded-md border hover:shadow-d">
              <Image
                src="/assets/images/project/1/1.png"
                alt="Portfolio"
                className="object-cover w-full transition-transform duration-300 ease-in-out transform hover:scale-105"
                width={160}
                height={90}
              />
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-0.5 text-xs md:text-base cursor-pointer">
                프로젝트 정보 살펴보기
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12H18.8L16.3 9.5L17.7 8.1L22.6 13L17.7 17.9L16.3 16.5L18.8 14H9V12ZM21 17.4V20H3V6H21V8.6L23 10.6V4C23 2.9 22.1 2 21 2H3C1.9 2 1 2.9 1 4V20C1 21.1 1.9 22 3 22H21C22.1 22 23 21.1 23 20V15.4L21 17.4Z"
                  fill="black"
                />
              </svg>
            </div>
          </Link>
        </div>
        <div className="flex flex-wrap mb-6 md:mb-8">
          <CodeTag
            codes={[
              'TypeScript',
              'Nest.js',
              'TypeORM',
              'MySQL',
              'AWS(EC2, RDS)',
              'Linux Ubuntu',
              'Nginx',
            ]}
          />
        </div>
      </div>
    </div>
  );
}
