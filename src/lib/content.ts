import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type Series = CollectionEntry<'series'>;
export type Project = CollectionEntry<'projects'>;

/**
 * 전역 정렬 규칙 (build-prd §4-1)
 * 1차: created 역순 — `YYYY-MM-DDTHH:mm` 문자열은 사전순 비교가 시간순 비교와 일치
 * 2차: slug(id) 오름차순 — 완전 동률 시 결정론 폴백
 */
export function sortPosts(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) => b.data.created.localeCompare(a.data.created) || a.id.localeCompare(b.id),
  );
}

export async function getPostsByTrack(track: 'log' | 'notes'): Promise<Post[]> {
  return sortPosts(await getCollection('posts', (p) => p.data.track === track));
}

export async function getAllPosts(): Promise<Post[]> {
  return sortPosts(await getCollection('posts'));
}

/** 화면 표시는 날짜만 — 시각은 내부 정렬 키 (build-prd §3-1) */
export function displayDate(created: string): string {
  return created.slice(0, 10);
}

export interface SeriesMembership {
  series: Series;
  /** 이 글의 시리즈 내 위치 (0-base) */
  index: number;
  /** 시리즈 수록 글 전체 (배열 순서 = 연재 순서) */
  posts: Post[];
}

/**
 * 역참조: 글은 시리즈를 모른다 — 시리즈 파일의 posts 배열에서 소속을 역산한다.
 * 다중 소속 허용 → 배열 반환.
 */
export async function getSeriesMemberships(postId: string): Promise<SeriesMembership[]> {
  const allSeries = await getCollection('series');
  const memberships: SeriesMembership[] = [];
  for (const s of allSeries) {
    const index = s.data.posts.indexOf(postId);
    if (index === -1) continue;
    const posts = await resolveSeriesPosts(s);
    memberships.push({ series: s, index, posts });
  }
  return memberships;
}

/** 시리즈 posts 배열을 실제 글 엔트리로 해석. 존재하지 않는 slug 참조 = 빌드 실패. */
export async function resolveSeriesPosts(s: Series): Promise<Post[]> {
  return Promise.all(
    s.data.posts.map(async (slug) => {
      const post = await getEntry('posts', slug);
      if (!post) {
        throw new Error(
          `시리즈 "${s.id}"가 존재하지 않는 글 slug "${slug}"를 참조한다 — 빌드 중단.`,
        );
      }
      return post;
    }),
  );
}

export interface SeriesOverview {
  series: Series;
  /** 수록 글 수 */
  count: number;
  /** 수록 글 중 최신 created — /series 목록의 "최신 갱신일"이자 정렬 키 */
  latestCreated: string;
}

/** /series 목록·홈 시리즈 코너: 최신 갱신순 (수록 글 중 최신 created 역순, 동률 시 slug 오름차순) */
export async function getSeriesOverview(): Promise<SeriesOverview[]> {
  const allSeries = await getCollection('series');
  const overviews = await Promise.all(
    allSeries.map(async (s) => {
      const posts = await resolveSeriesPosts(s);
      const latestCreated = posts.reduce(
        (max, p) => (p.data.created > max ? p.data.created : max),
        '',
      );
      return { series: s, count: posts.length, latestCreated };
    }),
  );
  return overviews.sort(
    (a, b) =>
      b.latestCreated.localeCompare(a.latestCreated) || a.series.id.localeCompare(b.series.id),
  );
}

/** 태그 → 글 수 집계 (글 수 많은 순) */
export async function getTagCounts(posts?: Post[]): Promise<Array<{ tag: string; count: number }>> {
  const source = posts ?? (await getAllPosts());
  const counts = new Map<string, number>();
  for (const p of source) {
    for (const tag of p.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** 이 글을 완성품으로 가리키는 프로젝트 (프로젝트↔시리즈 상호 링크의 역방향) */
export async function getRelatedProjects(seriesIds: string[]): Promise<Project[]> {
  if (seriesIds.length === 0) return [];
  return getCollection('projects', (p) => !!p.data.series && seriesIds.includes(p.data.series));
}
