import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse) // 마크다운 파싱
    .use(remarkGfm) // GitHub Flavored Markdown 활성화
    .use(remarkRehype, { allowDangerousHtml: true }) // 마크다운을 HTML로 변환(HTML 구문 허용)
    .use(rehypeRaw) // 마크다운 HTML 구문 적용
    .use(rehypePrettyCode, { theme: 'github-dark' })
    .use(rehypeSlug) // 제목에 ID 슬러그 생성
    .use(rehypeAutolinkHeadings, { behavior: 'prepend' }) // 제목에 자동 링크 추가
    .use(rehypeStringify) // HTML 문자열로 변환
    .process(markdown);
  return result.toString();
}
