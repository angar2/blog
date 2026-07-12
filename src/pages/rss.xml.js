import rss from '@astrojs/rss';
import { getAllPosts } from '../lib/content';

export async function GET(context) {
  const posts = await getAllPosts();
  return rss({
    title: 'angari.dev',
    description: 'AI로 만들어 나가는 개발자 지크의 기록 블로그.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/posts/${post.id}`,
      // created는 KST 로컬 naive 문자열 — RSS 규격을 위해 +09:00으로 해석
      pubDate: new Date(`${post.data.created}:00+09:00`),
    })),
  });
}
