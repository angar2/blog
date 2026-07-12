import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * created/updated 규격: `YYYY-MM-DDTHH:mm` (KST 로컬, 타임존 표기 없음)
 * - 날짜만(`2026-07-12`) 쓰면 YAML이 Date 객체로 파싱해 문자열 검사에 걸린다 → 빌드 실패 (의도된 검문)
 * - 시각이 정렬 순번을 유일하게 결정한다. 화면 표시는 날짜만.
 */
const DATETIME_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
const datetime = z.custom<string>(
  (v) => typeof v === 'string' && DATETIME_RE.test(v),
  {
    message:
      'created/updated는 datetime 문자열(YYYY-MM-DDTHH:mm)이어야 한다. 날짜만 쓰면 빌드 실패.',
  },
);

const KEBAB_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const source = z
  .object({
    title: z.string().min(1),
    url: z.url(),
  })
  .strict();

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z
    .object({
      title: z.string().min(1),
      description: z.string().min(1),
      track: z.enum(['log', 'notes']),
      created: datetime,
      updated: datetime.optional(),
      tags: z.array(z.string().regex(KEBAB_RE, '태그는 소문자 kebab-case')),
      sources: z.array(source).optional(),
    })
    .strict()
    .superRefine((data, ctx) => {
      if (data.track === 'notes' && (!data.sources || data.sources.length === 0)) {
        ctx.addIssue({
          code: 'custom',
          message: 'notes 트랙은 sources(1차 출처)가 필수다 — 없으면 발행 불가.',
        });
      }
    }),
});

const series = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/series' }),
  schema: z
    .object({
      title: z.string().min(1),
      description: z.string().min(1),
      // slug 실재 검증은 빌드 파이프라인의 커스텀 린트(scripts/lint-content.mjs)가 수행
      posts: z.array(z.string().min(1)).min(1),
    })
    .strict(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        tagline: z.string().min(1),
        stacks: z.array(z.string().min(1)),
        links: z
          .object({
            demo: z.url().optional(),
            github: z.url().optional(),
          })
          .strict()
          .optional(),
        series: z.string().optional(),
        cover: image(),
        created: datetime,
      })
      .strict(),
});

export const collections = { posts, series, projects };
