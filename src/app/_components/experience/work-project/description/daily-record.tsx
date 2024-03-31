import { emphasizeText } from '@/lib/utils/textUtils';
import BulletedList from '../../common/bulleted-list';
import ChipTag from '../../common/chip-tag';
import SectionHeader from '../../common/section-header';
import CodeTag from '../../common/code-tag';

export default function DailyRecord() {
  return (
    <div className="pl-4 border-l-4 border-gray-400 rounded-md sm:pl-12 lg:border-0 lg:pl-4">
      <div className="mb-12 px-4 md:px-0 md:mb-16">
        <SectionHeader name={'INFORMATION'} />
        <div>
          <div className="mb-6 md:mb-8">
            <p className="font-medium italic md:text-xl">
              " 목표를 정하고 하루하루 채워나가는 성취 프로젝트형 플랫폼 "
            </p>
          </div>
          <div className="flex flex-col mb-6 sm:mb-8">
            <ChipTag name={'Team'} />
            <BulletedList
              list={['Back-end / Front-end(Web) / Front-end(App) - 3인']}
            />
          </div>
          <div className="flex flex-col mb-6 sm:mb-8">
            <ChipTag name={'Concept'} />
            <BulletedList
              list={[
                '**Project**: 챌린지 주제와 진행 기간 설정',
                '**Task**: 달성을 위해 실천할 여러 과제를 구체적으로 계획',
                '**Activity**: 과제를 실천할 때마다 체크하고 진행 현황 모니터',
              ]}
            />
          </div>
          <div className="flex flex-wrap mb-6 md:mb-8">
            <CodeTag
              codes={[
                'TypeScript',
                'Nest.js',
                'TypeORM',
                'MySQL',
                'AWS(EC2, RDS)',
                'NGINX',
              ]}
            />
          </div>
        </div>
      </div>
      <div className="mb-12 px-4 md:px-0 md:mb-16">
        <SectionHeader name={'WHAT DID I DO'} />
        <div>
          <div className="flex flex-col mb-6 sm:mb-8">
            <ChipTag name={'Designing'} />
            <BulletedList
              list={[
                '기능의 특성을 살릴 수 있는 심플한 **UI/UX 디자인** → Figma 제작',
                '메인/서브 콘텐츠의 **기능 및 아키텍처 설계**',
              ]}
            />
          </div>
          <div className="flex flex-col mb-6 sm:mb-8">
            <ChipTag name={'Developing'} />
            <BulletedList
              list={[
                '최대한 **Nest.js(TypeORM)**의 기본 기능과 **Restful API**에 충실하게 활용해 서버 안정성 높히려 노력',
                '메인 콘텐츠 요소(Project-Task-Activity)의 **기능 간 관계를 디테일하게 연결**하여 버그를 최대한 줄임',
                'Oauth, Email 등 **외부 라이브러리 및 API 활용**해 접근성과 확장성을 키움',
                '**DB 테이블 관계**를 철저하게 설계해 무결성을 높힘',
              ]}
            />
          </div>
          <div className="flex flex-col mb-6 sm:mb-8">
            <ChipTag name={'Recording'} />
            <BulletedList
              list={[
                '각 기능 개발에 적용한 논리 로직 기록',
                'DB 및 API 명세서 작성 → 노션',
                '프로젝트 일정/진행도, 팀 회의/기능요청 등 협업 내용 기록',
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
