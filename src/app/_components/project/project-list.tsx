'use client';
import { Project } from '@/interfaces/project';
import { ProjectPreview } from './project-preview';
import { useSearchParams } from 'next/navigation';
import Pagination from '../common/pagination';

type Props = {
  allProjects: Project[];
};

export function ProjectList({ allProjects }: Props) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');

  const currentPage = Math.max(
    1,
    Number.isInteger(Number(pageParam)) && Number(pageParam) >= 1
      ? Number(pageParam)
      : 1
  );

  const take = 10;
  const startIndex = (currentPage - 1) * take;
  const endIndex = startIndex + take;

  const limitedProjects = allProjects.slice(startIndex, endIndex);

  const totalPages = Math.ceil(allProjects.length / take);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('page', page.toString());
      window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="max-w-3xl mx-auto">
      {/* Project */}
      <div className="grid grid-cols-1">
        {limitedProjects.map((project) => (
          <ProjectPreview
            key={project.slug}
            title={project.title}
            coverImage={project.coverImage}
            date={project.date}
            author={project.author}
            slug={project.slug}
            excerpt={project.excerpt}
            stacks={project.stacks}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
