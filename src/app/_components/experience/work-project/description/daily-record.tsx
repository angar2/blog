import BulletedList from '../../common/bulleted-list';
import ChipTag from '../../common/chip-tag';
import SectionHeader from '../../common/section-header';
import CodeTag from '../../common/code-tag';
import { PROJECT_FIGMA_URL } from '@/lib/constants';
import Hyperlink from '../../common/hyperlink';

export default function DailyRecord() {
  return (
    <div className="pl-4 border-l-4 border-gray-400 rounded-md sm:pl-12 lg:border-0 lg:pl-4">
      <SectionHeader name={'INFORMATION'} />
      <div className="mb-8 px-4 md:px-0 md:mb-12">
        <div className="mb-6 md:mb-8">
          <p className="mb-4 text-sm font-medium italic md:text-lg">
            " 목표를 정하고 하루하루 채워나가는 성취형 프로젝트 플랫폼 "
          </p>
          <Hyperlink size={18} text="프로젝트 살펴보기" url="/project/1" />
        </div>
      </div>
      <div className="mb-6 px-4 md:px-0 md:mb-8">
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
          <ChipTag name={'Designing'} />
          <BulletedList
            list={[
              `기능의 특성을 살릴 수 있는 심플한 **UI/UX 디자인** → @@Figma[${PROJECT_FIGMA_URL}]@@ 제작`,
              '메인/서브 콘텐츠의 **기능 및 아키텍처 설계**',
            ]}
          />
        </div>
        <div className="flex flex-col mb-6 sm:mb-8">
          <ChipTag name={'Recording'} />
          <BulletedList
            list={[
              '개발된 각 기능에 적용된 논리 로직 기록',
              '데이터베이스 및 API 명세서 작성 → **Notion**',
              '프로젝트 일정, 진행 상황, 팀 회의 및 기능 요청과 같은 협업 내용 기록',
            ]}
          />
        </div>
      </div>
      <div className="flex flex-wrap mb-6 md:mb-8">
        <CodeTag
          codes={[
            'TypeScript',
            'Nest.js',
            'TypeORM',
            'MySQL',
            'AWS(EC2, RDS)',
            'Nginx',
          ]}
        />
      </div>
    </div>
  );
}
