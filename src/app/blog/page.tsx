import Container from '@/app/_components/container';
import { PostList } from '@/app/_components/post/post-list';
import { getAllPosts } from '@/lib/api';
import Header from '../_components/header/header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Posting insights on web development.`,
};

export default function BlogMain() {
  const allPosts = getAllPosts();

  return (
    <main>
      <Container>
        {allPosts.length > 0 && <PostList posts={allPosts} />}
      </Container>
    </main>
  );
}
