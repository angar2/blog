// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkCallouts from './plugins/remark-callouts.mjs';

/**
 * 코드 하이라이팅 토큰 — 클로드디자인 확정값 (design_handoff/README.md)
 * 다크/라이트 듀얼 테마로 빌드, data-theme가 어느 쪽을 쓸지 결정 (global.css)
 */
const CODE_TOKENS = {
  dark: { bg: '#140C0A', fg: '#F3EAE6', kw: '#FF7A70', str: '#E0B487', fn: '#F0C36B', num: '#E39A6B', com: '#6E5D57', punc: '#9A8880' },
  light: { bg: '#FBF3F0', fg: '#2A211E', kw: '#C0322A', str: '#A65E2E', fn: '#9A6B00', num: '#A65E2E', com: '#A2938C', punc: '#6B5B56' },
};

function angariShikiTheme(name, type, t) {
  return {
    name,
    type,
    colors: { 'editor.background': t.bg, 'editor.foreground': t.fg },
    tokenColors: [
      { scope: ['keyword', 'storage.type', 'storage.modifier', 'keyword.control', 'keyword.operator.new'], settings: { foreground: t.kw } },
      { scope: ['string', 'string.quoted', 'string.template'], settings: { foreground: t.str } },
      { scope: ['entity.name.function', 'support.function', 'meta.function-call.generic'], settings: { foreground: t.fn } },
      { scope: ['constant.numeric', 'constant.language', 'constant.character'], settings: { foreground: t.num } },
      { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: t.com } },
      { scope: ['punctuation', 'meta.brace', 'keyword.operator'], settings: { foreground: t.punc } },
    ],
  };
}

/**
 * 코드 블록 상단 바를 빌드 타임에 생성: 파일명 라벨 + 복사 버튼 (design-prd §8)
 *   ```ts title="src/app.ts" showLineNumbers
 * JS는 클립보드 동작만 담당한다 (posts/[slug].astro의 스크립트).
 */
const codeBlockChrome = {
  name: 'code-block-chrome',
  root(root) {
    const pre = root.children.find((n) => n.type === 'element' && n.tagName === 'pre');
    if (!pre) return;
    const raw = this.options.meta?.__raw ?? '';
    const title = raw.match(/title="([^"]+)"/)?.[1];
    if (/\bshowLineNumbers\b/.test(raw)) pre.properties['data-line-numbers'] = '';

    const bar = {
      type: 'element',
      tagName: 'div',
      properties: { class: 'code-block-bar' },
      children: [
        ...(title
          ? [{ type: 'element', tagName: 'span', properties: { class: 'code-block-title' }, children: [{ type: 'text', value: title }] }]
          : []),
        { type: 'element', tagName: 'button', properties: { type: 'button', class: 'code-copy' }, children: [{ type: 'text', value: '복사' }] },
      ],
    };
    root.children = [
      { type: 'element', tagName: 'div', properties: { class: 'code-block' }, children: [bar, pre] },
    ];
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
      themes: {
        dark: angariShikiTheme('angari-dark', 'dark', CODE_TOKENS.dark),
        light: angariShikiTheme('angari-light', 'light', CODE_TOKENS.light),
      },
      defaultColor: false,
      transformers: [codeBlockChrome],
    },
  },
});
