import Container from '@/app/_components/container';
import { PostList } from '@/app/_components/post/post-list';
import { getPosts } from '@/lib/api';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Posting insights on web development.`,
};

export default function BlogMain() {
  const allPosts = getPosts();

  return (
    <main>
      <Container>
        {allPosts.length > 0 && <PostList allPosts={allPosts} />}
      </Container>
    </main>
  );
}
