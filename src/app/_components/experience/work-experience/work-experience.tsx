import WorkCompany from './work-company';
import WorkCommon, { CommonProps } from './work-common';
import WorkProject, { ProjectProps } from './work-project';
import ExperienceTitle from '../common/title';
import { PortfolioProps, WorkPortfolio } from './work-portfolio';
import { WorkPortfolioDetail } from './work-portfolio-detail';

const common: CommonProps = {
  tasks: [
    '**DB**: 데이터 모델링 및 스키마 설계',
    '**Hosting**: AWS를 이용한 웹서버 호스팅 및 배포',
    '**Develop**: 서버 애플리케이션의 주요 기능 API 구현',
    '**Planning**: 애플리케이션 기능 및 아키텍처 기획 부분 담당',
  ],
  techStacks: [
    'TypeScript',
    'Node.js',
    'Nest.js',
    'Next.js',
    'MySQL',
    'AWS(EC2, RDS)',
    'Linux Ubuntu',
    'Nginx',
  ],
};

const portfolio: PortfolioProps = {
  projects: [
    '**Fleet**: 선박업무 통합 관리 애플리케이션',
    '**국가대표**: 한국도로공사 고속도로 유지 관리 시스템',
    '**타이키트립**: 여행 정보 및 설계 매칭 플랫폼',
    '**아이컬러**: 뷰티 제품 정보 공유 및 소통 플랫폼',
  ],
};

const projects: string[] = [
  '**Fleet**: 선박업무 통합 관리 애플리케이션',
  '**국가대표**: 한국도로공사 고속도로 유지 관리 시스템',
  '**타이키트립**: 여행 정보 및 설계 매칭 플랫폼',
  '**아이컬러**: 뷰티 제품 정보 공유 및 소통 플랫폼',
];

// const projects: ProjectProps[] = [
//   {
//     projectName: 'Fleet',
//     description: '선박 작업 관리 및 문서결재 종합 플랫폼',
//     period: '2024.01. - 2024.04.',
//     tasks: [
//       '**전자문서 시스템** 개발 (결재 / 반려 / 재상신 기능 포함)',
//       '**스케줄러** 개발, 일반 및 전자문서와 연동',
//       '선박별 **데이터 통계** 기능 구현',
//       '회원/관리자별 **권한 설정** 기능 구현',
//     ],
//     techStack: ['TypeScript', 'Node.js', 'MySQL', 'AWS(EC2, RDS)'],
//   },
//   {
//     projectName: '국가대표',
//     description: '한국도로공사 고속도로 사고 제보 관리 시스템',
//     period: '2023.10. - 2023.12.',
//     tasks: [
//       '블랙박스 제보 관련 현위치/이미지 **데이터 통신 API** 개발',
//       '**제보 처리 시스템** 개발 (직원 배정 → 처리 → 완료 보고)',
//       '완료 보고서 **문서화(엑셀 포맷)**',
//     ],
//     techStack: ['TypeScript', 'Node.js', 'MySQL', 'AWS(EC2, RDS)'],
//   },
//   {
//     projectName: 'Tyche Trip',
//     description: '여행 정보 및 설계 중개 플랫폼',
//     period: '2023.07. - 2023.10.',
//     tasks: [
//       '외부 API를 활용한 **전자결제** 시스템 구현',
//       '**여행 설계 매칭 시스템** 개발(요청/설계 → 매칭/결제 → 후기/리워드)',
//       '**여행자-App / 설계자-Web** 플랫폼 별 기능 구현',
//     ],
//     techStack: ['TypeScript', 'Node.js', 'MySQL', 'AWS(EC2, RDS)'],
//   },
//   {
//     projectName: '아이컬러',
//     description: '퍼스널컬러 기반 뷰티 제품 정보 및 소통 플랫폼',
//     period: '2023.04. - 2023.07.',
//     tasks: ['관리자 **콘텐츠 관리** 기능 구현(회원, 제품 등 8개 콘텐츠)'],
//     techStack: ['TypeScript', 'Node.js', 'MySQL', 'AWS(EC2, RDS)'],
//   },
// ];

export default function WorkExperience() {
  return (
    <div className="mb-16">
      <ExperienceTitle title="Work Experience" />
      <div className="flex-col lg:flex lg:flex-row lg:justify-start">
        {/* 회사 */}
        <WorkCompany
          companyName="주식회사 데브몬스터"
          companyIntro="소프트웨어 개발사"
          position="Back-end Developer"
          period="2023.04. - 2024.04."
        />
        {/* 경험 내용 */}
        <div className="w-full pl-4 sm:pl-24 lg:w-2/4 lg:pl-0 lg:border-0">
          <div className="pl-4 border-l-4 border-gray-400 rounded-md sm:pl-12 lg:border-0 lg:pl-4">
            <WorkCommon tasks={common.tasks} techStacks={common.techStacks} />
            <WorkPortfolio projects={portfolio.projects} />
            <WorkPortfolioDetail />

            {/* {projects.map((project, index) => (
                <div key={index}>
                  <WorkProject
                    projectName={project.projectName}
                    description={project.description}
                    period={project.period}
                    tasks={project.tasks}
                    techStack={project.techStack}
                  />
                </div>
              ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
