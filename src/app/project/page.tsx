import Container from '@/app/_components/container';
import { Metadata } from 'next';
import { ProjectList } from '../_components/project/project-list';
import { getProjects } from '@/lib/api';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Projects',
  description: `My Crafted Projects.`,
};

export default function ProjectsMain() {
  const allProjects = getProjects();

  return (
    <main>
      <Container>
        {allProjects.length > 0 && (
          <Suspense>
            <ProjectList allProjects={allProjects} />
          </Suspense>
        )}
      </Container>
    </main>
  );
}
