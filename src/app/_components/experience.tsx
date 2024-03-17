import CompanyIntro from './company-intro';
import ProjectIntro, { ProjectIntroProps } from './project-intro';

const projects: ProjectIntroProps[] = [
  {
    projectName: '프로젝트 이름1',
    description: '프로젝트 설명1',
    period: '2023.04 - 현재',
    tasks: ['task1', '**강조하기**'], // 강조하고 싶은 부분에 **text** 처리하면 됨
    techStack: 'tech1, tech2',
  },
  {
    projectName: '프로젝트 이름2',
    description: '프로젝트 설명2을 길게 써보려고 합니다. 그러면 어떻게 될까요?',
    period: '2023.04 - 2023.05',
    tasks: ['**강조**하기', 'task2'], // 강조하고 싶은 부분에 **text** 처리하면 됨
    techStack: 'tech1, tech2',
  },
];

export default function Experience() {
  return (
    <section className="max-w-2xl mx-auto">
      <div className="flex-col md:flex md:flex-row md:justify-start">
        {/* 회사 */}
        <CompanyIntro
          companyName="주식회사 데브몬스터"
          position="소프트웨어 개발사 | Back-end Developer"
          period="2023.04 - 현재"
        />
        {/* 경험 내용 */}
        <div className="w-full md:w-2/4">
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
    </section>
  );
}
