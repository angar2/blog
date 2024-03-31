import ExperienceTitle from '../common/title';
import ProjectName from './project-name';
import ProjectIntro from './project-intro';
import DailyRecord from './description/daily-record';

// const projectName: projectNameProps = {
//   name: 'Daily Record',
//   description: '팀 프로젝트',
//   period: '2023.12. - 현재',
// };

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
