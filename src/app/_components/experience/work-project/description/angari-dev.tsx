import BulletedList from '../../common/bulleted-list';
import SectionHeader from '../../common/section-header';
import CodeTag from '../../common/code-tag';

export default function AngariDev() {
  return (
    <div className="pl-4 border-l-4 border-gray-400 rounded-md sm:pl-12 lg:border-0 lg:pl-4">
      <div className="mb-12 px-4 md:px-0 md:mb-16">
        <SectionHeader name={'INFORMATION'} />
        <div>
          <div className="flex flex-col mb-6 sm:mb-8">
            <BulletedList
              list={[
                '나만의 스타일을 살릴 수 있도록 디자인하고 반응형 웹페이지 제작',
                '최소한의 기능과 프로젝트 경량화를 위해 Serverless로 구현',
                'Versel과 Github 연동을 활용한 빠르고 간편한 배포',
                'Markdown 방식의 스크립트 작성',
              ]}
            />
          </div>
          <div className="flex flex-wrap mb-6 md:mb-8">
            <CodeTag
              codes={['TypeScript', 'Next.js', 'Vercel', 'TailwindCSS']}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
