#!/usr/bin/env node
/**
 * 커스텀 콘텐츠 린트 — 검문 2겹 (build-prd §4-3)
 * `npm run build`가 astro build 앞에 실행한다. 위반 1건이라도 있으면 exit 1 = 빌드 실패.
 *
 * 검사 항목:
 *  1. 파일명 kebab-case (파일명 = slug = URL 삼위일체)
 *  2. 플레이스홀더 잔재 (TODO, TBD, lorem, 여기에, 빈 섹션)
 *  3. description = 본문 첫 문장 복붙
 *  4. 헤딩 계단 위반 (h2 다음 h4 등 건너뜀)
 *  5. 본문 h1 사용
 *  6. 수동 번호 헤딩 (## 1. / ## 2) 등)
 *  7. 깨진 내부 링크 (/posts·/series·/tags·/projects의 없는 slug)
 *  8. 미완성 표 (빈 셀 뭉치)
 *  9. 시리즈 posts 배열 slug 실재 (+ 중복)
 * 10. 프로젝트 series 참조 실재
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import * as yaml from 'js-yaml';

const ROOT = new URL('..', import.meta.url).pathname;
const DIRS = {
  posts: join(ROOT, 'src/content/posts'),
  series: join(ROOT, 'src/content/series'),
  projects: join(ROOT, 'src/content/projects'),
};

const KEBAB_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const errors = [];

function err(file, message) {
  errors.push(`  ${file}: ${message}`);
}

function listMd(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true })
    .filter((f) => String(f).endsWith('.md'))
    .map((f) => join(dir, String(f)));
}

function parse(file) {
  const raw = readFileSync(file, 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  let data = {};
  try {
    data = yaml.load(match[1]) ?? {};
  } catch {
    // YAML 문법 오류는 astro build(스키마 검문)가 잡는다 — 여기선 통과
  }
  return { data, body: match[2] };
}

/** 코드 펜스 내부를 제거한 본문 (헤딩·링크·표 검사용) */
function stripCodeFences(body) {
  return body.replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1`*\s*$/gm, '');
}

const postFiles = listMd(DIRS.posts);
const seriesFiles = listMd(DIRS.series);
const projectFiles = listMd(DIRS.projects);

const postSlugs = new Set(postFiles.map((f) => basename(f, '.md')));
const seriesSlugs = new Set(seriesFiles.map((f) => basename(f, '.md')));
const projectSlugs = new Set(projectFiles.map((f) => basename(f, '.md')));
const allTags = new Set();
for (const f of postFiles) {
  const { data } = parse(f);
  for (const t of data.tags ?? []) allTags.add(String(t));
}

// ── 공통: 파일명 kebab-case ──
for (const f of [...postFiles, ...seriesFiles, ...projectFiles]) {
  const slug = basename(f, '.md');
  if (!KEBAB_RE.test(slug)) err(basename(f), `파일명이 영어 kebab-case가 아니다 ("${slug}")`);
}

// ── 글 본문 검사 ──
for (const f of postFiles) {
  const name = `posts/${basename(f)}`;
  const { data, body } = parse(f);
  const clean = stripCodeFences(body);

  // 2. 플레이스홀더 잔재
  for (const [re, label] of [
    [/\bTODO\b/, 'TODO'],
    [/\bTBD\b/, 'TBD'],
    [/lorem/i, 'lorem'],
    [/여기에\s*(작성|추가|입력|채우)/, '"여기에 …" 플레이스홀더'],
  ]) {
    if (re.test(clean)) err(name, `플레이스홀더 잔재 검출 (${label})`);
  }

  // 헤딩 수집 (코드 펜스 밖)
  const headings = [];
  for (const line of clean.split('\n')) {
    const m = line.match(/^(#{1,6})\s+(.*)$/);
    if (m) headings.push({ level: m[1].length, text: m[2] });
  }

  // 2b. 빈 섹션 (헤딩과 다음 헤딩/EOF 사이에 내용 없음)
  {
    const blocks = clean.split(/^#{1,6}\s+.*$/m).slice(1);
    blocks.forEach((block, i) => {
      if (block.trim() === '') err(name, `빈 섹션 — "${headings[i]?.text}" 아래 내용이 없다`);
    });
  }

  // 3. description = 본문 첫 문장 복붙
  if (typeof data.description === 'string') {
    const normalize = (s) => s.replace(/[\s*_`~]/g, '');
    const firstPara = clean.split('\n').find((l) => l.trim() && !l.startsWith('#'));
    if (firstPara) {
      const firstSentence = firstPara.split(/(?<=[.!?다])\s/)[0];
      if (
        normalize(firstSentence) === normalize(data.description) ||
        normalize(firstPara).startsWith(normalize(data.description))
      ) {
        err(name, 'description이 본문 첫 문장 복붙이다 — 목록용 요약을 따로 써라');
      }
    }
  }

  // 4. 헤딩 계단 위반 / 5. h1 / 6. 수동 번호
  let prevLevel = 1; // 제목(h1)은 frontmatter가 원천 — 본문은 h2부터
  for (const h of headings) {
    if (h.level === 1) err(name, `본문 h1 사용 금지 ("# ${h.text}") — 제목은 frontmatter가 원천`);
    if (h.level > prevLevel + 1)
      err(name, `헤딩 계단 위반 — h${prevLevel} 다음에 h${h.level} ("${h.text}")`);
    if (/^\d+[.)]/.test(h.text))
      err(name, `수동 번호 헤딩 ("${'#'.repeat(h.level)} ${h.text}") — 채번은 렌더링이 부여한다`);
    prevLevel = h.level;
  }

  // 7. 깨진 내부 링크
  for (const m of clean.matchAll(/\]\(\/(posts|series|tags|projects)\/([^)#?\s]+)[^)]*\)/g)) {
    const [, kind, slug] = m;
    const sets = { posts: postSlugs, series: seriesSlugs, tags: allTags, projects: projectSlugs };
    if (!sets[kind].has(decodeURIComponent(slug)))
      err(name, `깨진 내부 링크 — /${kind}/${slug} 가 존재하지 않는다`);
  }

  // 8. 미완성 표 (빈 셀 뭉치)
  for (const line of clean.split('\n')) {
    if (!/^\s*\|.*\|\s*$/.test(line)) continue;
    if (/^\s*\|[\s:|-]+\|\s*$/.test(line)) continue; // 구분행
    const cells = line.trim().slice(1, -1).split('|').map((c) => c.trim());
    const empty = cells.filter((c) => c === '').length;
    if (cells.length >= 2 && empty >= 2)
      err(name, `미완성 표 — 빈 셀 ${empty}개인 행 검출 ("${line.trim().slice(0, 40)}…")`);
  }
}

// ── 9. 시리즈 posts 배열 검증 ──
for (const f of seriesFiles) {
  const name = `series/${basename(f)}`;
  const { data } = parse(f);
  const seen = new Set();
  for (const slug of data.posts ?? []) {
    if (!postSlugs.has(slug)) err(name, `존재하지 않는 글 slug 참조 — "${slug}"`);
    if (seen.has(slug)) err(name, `posts 배열에 중복 slug — "${slug}"`);
    seen.add(slug);
  }
}

// ── 10. 프로젝트 series 참조 검증 ──
for (const f of projectFiles) {
  const name = `projects/${basename(f)}`;
  const { data } = parse(f);
  if (data.series && !seriesSlugs.has(data.series))
    err(name, `존재하지 않는 시리즈 참조 — "${data.series}"`);
}

if (errors.length > 0) {
  console.error(`✗ 콘텐츠 린트 실패 — ${errors.length}건:\n`);
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`✓ 콘텐츠 린트 통과 (글 ${postFiles.length} · 시리즈 ${seriesFiles.length} · 프로젝트 ${projectFiles.length})`);
