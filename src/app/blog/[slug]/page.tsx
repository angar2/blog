import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPosts, getPostBySlug } from '../../../lib/api';
import markdownToHtml from '../../../lib/markdownToHtml';
import Container from '../../_components/container';
import { PostBody } from '../../_components/post/post-body';
import { PostHeader } from '../../_components/post/post-header';
import { HOME_OG_IMAGE_URL } from '@/lib/constants';

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || '');

  return (
    <main>
      <Container>
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            tags={post.tags}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title}`;
  const description = `${post.description}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [post.ogImage?.url, HOME_OG_IMAGE_URL],
    },
  };
}

export async function generateStaticParams() {
  const posts = getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
