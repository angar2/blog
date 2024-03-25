import CompanyIntro from './company-intro';
import ProjectCommon, { ProjectCommonProps } from './project-common';
import ProjectIntro, { ProjectIntroProps } from './project-intro';

const common: ProjectCommonProps = {
  tasks: [
    '**DB**: 데이터 모델링 및 스키마 설계',
    '**Hosting**: AWS를 이용한 서비스 웹서버 호스팅',
    '**Plan**: 서비스 기능 및 아키텍처 기획 부분 담당',
    '**Develope**: 회원, 관리자 CRUD 등 주요 기능 API 구현',
  ],
};

const projects: ProjectIntroProps[] = [
  {
    projectName: 'Fleet',
    description: '선박 작업 관리 및 문서결재 플랫폼',
    period: '2024.01. - 현재.',
    tasks: [
      '**전자문서 시스템**(결재 / 반려 / 재상신) 구현',
      '**스케줄러** 일반 및 전자문서 연동 기능 구현',
      '선박별 **데이터 통계** 구현',
      '회원/관리자 타입별 **기능 권한** 설정',
    ],
    techStack: ['C#', '.NET', 'MySQL', 'AWS(EC2, RDS)'],
  },
  {
    projectName: '국가대표',
    description: '한국도로공사 고속도로 사고제보 관리 시스템',
    period: '2023.10. - 2023.12.',
    tasks: [
      '블랙박스 제보의 현위치/이미지 **데이터 통신 API** 구현',
      '**제보 처리 시스템**(직원 배정 → 처리 → 완료 보고) 구현',
      '완료 보고서 **문서화(엑셀)**',
    ],
    techStack: ['C#', '.NET', 'MySQL', 'AWS(EC2, RDS)'],
  },
  {
    projectName: 'Tyche Trip',
    description: '여행 정보 및 설계 중개 플랫폼',
    period: '2023.07. - 2023.10.',
    tasks: [
      '외부 API를 활용한 **전자결제** 기능 구현',
      '**여행 설계 매칭 시스템**(요청/설계 → 매칭/결제 → 후기/리워드) 구현',
      '회원별 기능/플랫폼(**여행자-App / 설계자-Web**) 구분하여 구현',
    ],
    techStack: ['C#', '.NET', 'MySQL', 'AWS(EC2, RDS)'],
  },
  {
    projectName: '아이컬러',
    description: '퍼스널컬러 기반 뷰티 제품 정보 및 소통 플랫폼',
    period: '2023.04. - 2023.07.',
    tasks: ['관리자 **콘텐츠 관리**(회원, 제품 등 8개 콘텐츠) 기능 구현'],
    techStack: ['Typescript', 'Node.js', 'MySQL', 'AWS(EC2, RDS)'],
  },
];

export default function ExperienceWork() {
  return (
    <div className="mt-12">
      <div className="w-full mb-8 py-2 px-1 border-b-2 md:mb-12 md:py-4 md:px-2">
        <p className="text-xl font-medium md:text-2xl">
          Work Experience{' '}
          <span className="text-2xl text-[#008B6B] md:text-4xl">.</span>
        </p>
      </div>
      <div className="flex-col lg:flex lg:flex-row lg:justify-start">
        {/* 회사 */}
        <CompanyIntro
          companyName="주식회사 데브몬스터"
          companyIntro="소프트웨어 개발사"
          position="Back-end Developer"
          period="2023.04. - 현재."
        />
        {/* 경험 내용 */}
        <div className="w-full pl-4 sm:pl-24 lg:w-2/4 lg:pl-0 lg:border-0">
          <div className="pl-4 border-l-4 border-gray-400 rounded-md sm:pl-12 lg:border-0 lg:pl-4">
            <ProjectCommon tasks={common.tasks} />
            {projects.map((project, index) => (
              <ProjectIntro
                projectName={project.projectName}
                description={project.description}
                period={project.period}
                tasks={project.tasks}
                techStack={project.techStack}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
