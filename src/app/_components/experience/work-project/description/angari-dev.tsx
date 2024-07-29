import BulletedList from '../../common/bulleted-list';
import SectionHeader from '../../common/section-header';
import CodeTag from '../../common/code-tag';
import Link from 'next/link';
import Image from 'next/image';

export default function AngariDev() {
  return (
    <div className="mb-12 lg:mb-16 pl-4 sm:pl-12 lg:pl-4 border-l-4 lg:border-0 border-gray-400 rounded-md">
      <SectionHeader name={'Overview'} />
      <div className="mb-4 px-4 md:px-0 md:mb-8">
        <div className="mb-6 md:mb-8">
          <p className="text-sm font-medium italic md:text-lg">
            " 내가 하나하나 만들어 나가는 개발 공간 "
          </p>
        </div>
      </div>
      <div className="mb-6 px-4 md:px-0 md:mb-8">
        <div className="flex flex-col mb-6 sm:mb-8">
          <BulletedList
            list={[
              '나만의 스타일을 살릴 수 있도록 디자인하고 **반응형** 웹페이지 제작',
              'SEO 최적화와 프로젝트 경량화를 위해 **Static Site Generation**을 활용한 Next.js 웹사이트로 구현',
              'Vercel과 GitHub를 연동한 **CI/CD**과 **BaaS**를 활용하여 웹사이트를 자동으로 배포',
              '관리의 효율성을 위해 **Markdown** 방식의 스크립트로 블로그 포스트 작성',
            ]}
          />
        </div>
        <div className="w-fit px-4 md:px-0 mb-6 sm:mb-8">
          <Link
            className="cursor-pointer hover:underline"
            href="/project/angari-dev"
          >
            <div className="w-32 md:w-40 overflow-hidden rounded-md border hover:shadow-d">
              <Image
                src="/assets/images/experience/preview-blog.png"
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
          <CodeTag codes={['TypeScript', 'Next.js', 'Vercel', 'TailwindCSS']} />
        </div>
      </div>
    </div>
  );
}
