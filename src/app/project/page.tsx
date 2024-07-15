import Container from '@/app/_components/container';
import { Metadata } from 'next';
import { ProjectList } from '../_components/project/project-list';
import { getProjects } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Projects',
  description: `My Crafted Projects.`,
};

export default function ProjectsMain() {
  const allProjects = getProjects();
  
  return (
    <main>
      <Container>
        <ProjectList allProjects={allProjects} />
      </Container>
    </main>
  );
}
