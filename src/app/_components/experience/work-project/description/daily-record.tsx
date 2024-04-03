import BulletedList from '../../common/bulleted-list';
import ChipTag from '../../common/chip-tag';
import SectionHeader from '../../common/section-header';
import CodeTag from '../../common/code-tag';
import { PROJECT_FIGMA_URL } from '@/lib/constants';

export default function DailyRecord() {
  return (
    <div className="pl-4 border-l-4 border-gray-400 rounded-md sm:pl-12 lg:border-0 lg:pl-4">
      <div className="mb-12 px-4 md:px-0 md:mb-16">
        <SectionHeader name={'INFORMATION'} />
        <div>
          <div className="mb-6 md:mb-8">
            <p className="font-medium italic md:text-xl">
              " 목표를 정하고 하루하루 채워나가는 성취형 프로젝트 플랫폼 "
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
                `기능의 특성을 살릴 수 있는 심플한 **UI/UX 디자인** → @@Figma[${PROJECT_FIGMA_URL}]@@ 제작`,
                '메인/서브 콘텐츠의 **기능 및 아키텍처 설계**',
              ]}
            />
          </div>
          <div className="flex flex-col mb-6 sm:mb-8">
            <ChipTag name={'Developing'} />
            <BulletedList
              list={[
                '최대한 **Nest.js(TypeORM)**의 기본 기능과 **Restful API**를 활용하여 서버의 안정성을 최대화하기 위해 노력',
                '메인 콘텐츠 구조(Project-Task-Activity)의 **주요 기능 간 관계를 세밀하게 연결**하여 버그 최소화',
                'OAuth, 이메일 등 외부 라이브러리 및 API를 활용해 시스템의 확장성 강화',
                '**DB 테이블 관계**를 철저하게 설계하여 데이터 무결성 강화',
              ]}
            />
          </div>
          <div className="flex flex-col mb-6 sm:mb-8">
            <ChipTag name={'Recording'} />
            <BulletedList
              list={[
                '개발된 각 기능에 적용된 논리 로직 기록',
                '데이터베이스 및 API 명세서 작성 → 노션',
                '프로젝트 일정, 진행 상황, 팀 회의 및 기능 요청과 같은 협업 내용 기록',
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
