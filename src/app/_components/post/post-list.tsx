'use client';
import { Post } from '@/interfaces/post';
import { PostPreview } from './post-preview';
import { useSearchParams } from 'next/navigation';
import Pagination from '../experience/common/pagination';

type Props = {
  allPosts: Post[];
};

export function PostList({ allPosts }: Props) {
  const searchParams = useSearchParams();
  const TagParams = searchParams.getAll('tag');
  const pageParam = searchParams.get('page');

  const filteredPosts =
    TagParams.length > 0
      ? allPosts.filter((post) =>
          post.tags?.some((tag) => TagParams.includes(tag))
        )
      : allPosts;

  const currentPage = Math.max(
    1,
    Number.isInteger(Number(pageParam)) && Number(pageParam) >= 1
      ? Number(pageParam)
      : 1
  );

  const take = 10;
  const startIndex = (currentPage - 1) * take;
  const endIndex = startIndex + take;

  const limitedPosts = filteredPosts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(limitedPosts.length / take);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('page', page.toString());
      window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
        {limitedPosts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
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
