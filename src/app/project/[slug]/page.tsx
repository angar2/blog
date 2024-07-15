import { notFound } from 'next/navigation';
import { getProjectBySlug } from '../../../lib/api';
import markdownToHtml from '../../../lib/markdownToHtml';
import Container from '../../_components/container';
import { ProjectHeader } from '@/app/_components/project/project-header';
import { ProjectBody } from '@/app/_components/project/project-body';

type Params = {
  params: {
    slug: string;
  };
};

export default async function Project({ params }: Params) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return notFound();
  }

  const content = await markdownToHtml(project.content || '');

  return (
    <main>
      <Container>
        <article className="mb-32">
          <ProjectHeader
            title={project.title}
            coverImage={project.coverImage}
            date={project.date}
            author={project.author}
            stacks={project.stacks}
          />
          <ProjectBody content={content} />
        </article>
      </Container>
    </main>
  );
}
