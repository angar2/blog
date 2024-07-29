import BulletedList from '../../common/bulleted-list';
import SectionHeader from '../../common/section-header';
import CodeTag from '../../common/code-tag';

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
        <div className="flex flex-wrap mb-6 md:mb-8">
          <CodeTag codes={['TypeScript', 'Next.js', 'Vercel', 'TailwindCSS']} />
        </div>
      </div>
    </div>
  );
}
