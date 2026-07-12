# angari.dev

백엔드 개발자 지크(angari)의 개인 사이트. 글은 AI가 쓰고 지크가 검수해 발행한다.

## 스택

- [Astro v7](https://astro.build) — SSG, Content Collections
- 표준 CSS + 디자인 토큰 (프레임워크 무도입)
- Cloudflare Pages — 브랜치별 프리뷰가 검수 수단

## 구조

```
src/content/posts/     글 (2트랙: log=서사 / notes=지식) — 파일명 = slug = URL
src/content/series/    시리즈 (역참조: 시리즈 파일만 글 slug를 가리킨다)
src/content/projects/  프로젝트 쇼케이스
plugins/               remark 콜아웃 플러그인
scripts/               커스텀 콘텐츠 린트 (빌드 파이프라인 1단)
```

## 명령

```bash
npm run dev      # 개발 서버
npm run lint     # 콘텐츠 린트 단독 실행
npm run build    # 린트 → astro build (린트 실패 = 빌드 실패)
```

## 발행

발행 여부는 git 브랜치가 관리한다 — main에 있으면 발행, 없으면 초안.
글 1편 = `post/{slug}` 브랜치 = 릴리스 1회. main 병합은 지크 승인 후에만.
