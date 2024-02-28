import Container from '@/app/_components/container';
import { HeroPost } from '@/app/_components/hero-post';
import { Intro } from '@/app/_components/intro';
import { PostList } from '@/app/_components/post-list';
import { getAllPosts } from '@/lib/api';
import Header from '../_components/header';

export default function BlogMain() {
  const allPosts = getAllPosts();

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Container>
        <Header />
        {/* <Intro /> */}
        {/* <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        /> */}
        {/* {allPosts.length > 0 && <MoreStories posts={allPosts} />} */}
        {allPosts.length > 0 && <PostList posts={allPosts} />}
      </Container>
    </main>
  );
}
