// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkCallouts from './plugins/remark-callouts.mjs';

/**
 * 코드 펜스 meta 파싱: ```ts title="src/app.ts" showLineNumbers
 * - data-title        → 파일명 라벨 (시각 처리는 디자인 토큰 납품 후)
 * - data-line-numbers → 줄번호 (긴 코드만, 작성자가 명시)
 */
const codeMetaTransformer = {
  name: 'code-meta',
  pre(node) {
    const raw = this.options.meta?.__raw ?? '';
    const title = raw.match(/title="([^"]+)"/)?.[1];
    if (title) node.properties['data-title'] = title;
    if (/\bshowLineNumbers\b/.test(raw)) node.properties['data-line-numbers'] = '';
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://angari.dev',
  trailingSlash: 'never',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkCallouts],
    shikiConfig: {
      // 임시 테마 — 디자인 토큰 납품(.project/design/) 후 팔레트 통합 테마로 교체
      theme: 'github-dark',
      transformers: [codeMetaTransformer],
    },
  },
});
