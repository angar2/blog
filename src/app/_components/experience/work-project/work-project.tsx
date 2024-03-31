import ExperienceTitle from '../common/title';
import ProjectName from './project-name';
import ProjectIntro from './project-intro';
import DailyRecord from './description/daily-record';
import { EXPERIENCE_PROJECT_BLOG_LOGO_IMAGE_URL } from '@/lib/constants';
import AngariDev from './description/angari-dev';

const projects = [
  {
    projectName: {
      name: 'Daily Record',
      description: '팀 프로젝트',
      period: '2023.12. - 현재',
      image: '',
    },
    projectDescription: DailyRecord,
  },
  {
    projectName: {
      name: 'angari.dev',
      description: '개발 블로그',
      period: '2024.01 - 현재',
      image: EXPERIENCE_PROJECT_BLOG_LOGO_IMAGE_URL,
    },
    projectDescription: AngariDev,
  },
];

export default function WorkProject() {
  return (
    <div className="mt-12 sm:mt-16">
      <ExperienceTitle title="Projects" />

      {projects.map((project, index) => (
        <div
          key={index}
          className="flex-col lg:flex lg:flex-row lg:justify-start"
        >
          <ProjectName {...project.projectName} />
          <ProjectIntro component={project.projectDescription} />
        </div>
      ))}
    </div>
  );
}
