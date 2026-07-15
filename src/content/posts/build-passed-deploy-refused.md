---
title: 빌드는 통과했는데 배포가 거부됐다 — Cloudflare Pages 발행 삽질기
description: 도메인을 Cloudflare Pages로 넘기고 정식 발행하다가 파일 용량 상한·push 진행 중 착시·sitemap 측정 버그라는 세 가지 함정을 실측으로 하나씩 좁혀간 기록이다.
track: log
created: 2026-07-14T10:40
tags: [cloudflare-pages, deploy, git, debugging]
---

angari.dev 새 사이트는 Astro로 이미 완성돼 있었다. 구 블로그는 **Vercel**에 물려 서빙 중이었고, 새 사이트는 **Cloudflare Pages**로 도메인만 넘기면 정식 오픈이었다. `astro.config.mjs`의 `site`가 이미 `https://angari.dev`를 가리키고 있어 코드는 손댈 게 없었다 — 도메인만 붙이면 끝나는 작업일 줄 알았다.

그 낙관은 오래 못 갔다.

## 도메인 연결은 그냥 됐다

Cloudflare Pages에 커스텀 도메인을 붙이는 것 자체는 무난했다.

Vercel 몫이던 apex A레코드와 `www` CNAME만 지우고 Pages 쪽 커스텀 도메인을 연결하자 apex·`www` 둘 다 곧바로 200이 떴고 SSL도 자동 발급됐다.

> [!note]
> `.dev` TLD는 HTTPS가 강제라, 인증서 발급까지 별도로 신경 쓸 일이 없었다.

## 원격이 안 움직인다는 착시

문제는 발행 push였다. dev→main `--no-ff` 병합 push를 올렸는데, 첫 push가 **2분 넘게 안 끝났다**. 96MB 이미지에 `.git` 오브젝트 84MB가 처음 업로드되는 무게였다.

원격 `main`의 SHA가 옛날 값 그대로인 걸 보고 이런 반응이 나왔다.

> "Cloudflare Pages, CI/CD 되는 거 맞나? 왜 반영이 이렇게 느리지. Vercel은 즉각 반영됐는데."

<u>git push는 전송이 끝난 뒤에야 원격 ref를 갱신하기 때문에</u>, 전송이 진행 중인 동안은 원격이 여전히 옛 SHA를 가리키는 것처럼 보인다. 죽은 게 아니라 전송 중이었다는 건 프로세스 생존(PID)과 전송량을 직접 찍어 확인했다. push는 백그라운드로 돌려 완주시켰다.

## 빌드는 통과했는데 배포가 막혔다

원격 SHA는 맞춰졌는데도 라이브는 여전히 옛 더미 2편이었다. Cloudflare 빌드 로그를 끝까지 읽고서야 진짜 원인이 나왔다.

```text title="Cloudflare Pages build log"
✘ [ERROR] Error: Pages only supports files up to 25 MiB in size —
assets/images/blog/36/1.gif is 26.4 MiB in size.
Failed: error occurred while validating assets
```

**215페이지 빌드는 성공**했는데, 빌드 뒤에 붙는 별도의 배포 검증 단계에서 통째로 거부된 것이다. 25MiB 초과 파일을 전수 조사하니 위반자는 `blog/36/1.gif` 하나뿐이었고(다음으로 큰 파일은 14.5MB), 그마저 우연이 아니었다. 그 GIF는 [게임 배포를 다룬 예전 글](/posts/ironman-deploy)에서 완성 화면으로 쓴 바로 그 파일이었다.

## 함정 3종: 증상과 확정법

이번 배포에서 밟은 함정은 셋이었고, 셋 다 겉보기 증상만으로는 원인을 특정할 수 없었다.

| 함정 | 증상 | 원인 | 확정법 |
|---|---|---|---|
| 파일 용량 상한 | 빌드는 성공, 라이브는 그대로 | Pages 파일당 **25MiB** 하드 상한(Vercel엔 없던 제약) | 배포 로그를 끝까지 읽기 + `find <assets> -size +25M` 사전 점검 |
| git push 착시 | push 직후 원격 `main`이 옛 SHA로 보임 | push는 전송 완료 후에만 원격 ref 갱신 | 프로세스 생존(PID)·전송량 실측, 대용량은 백그라운드 완주 |
| sitemap 측정 함정 | `grep -c '<loc>'`로 세면 URL이 1개뿐 | sitemap이 한 줄 XML이라 줄 수 기준 카운트는 항상 1 | `grep -o '<loc>' \| wc -l`로 태그 개수 세고 로컬 `dist`의 총수와 대조 |

## 해결과 재발행

해상도를 2560→1280으로 축소해 26.4MB짜리 GIF를 13MB로 줄였다. GIF 형식은 유지하고 본문은 손대지 않았다. 재배포 push 이후 앞의 sitemap 측정 함정을 걷어내고서야 **글 215페이지가 실제로 반영된 것**을 확인했다.

확인 도중 마이그레이션 검증용 더미 5개가 같이 발행된 것도 발견했다. 참조 여부를 grep으로 안전하게 확인한 뒤 삭제하고 다시 배포해, 최종적으로 **글 77·시리즈 10·프로젝트 4·총 209 URL**로 정리됐다. 삭제한 더미의 개별 URL만 엣지 캐시에 잠깐 남았는데, 홈·목록·sitemap 어디에도 안 걸리는 걸로 봐서 실사용 경로엔 이미 없고 TTL이 지나면 자동으로 지워지는 잔여였다.

25MiB 상한은 이번에 배운 값 그대로 `WRITING_RULE.md`에 못박아, 다음 글부터는 같은 함정을 반복하지 않도록 해뒀다.

## 신호 하나로 확정하지 않기로 했다

빌드 통과는 초록불이 아니라 검문소 하나를 통과했다는 뜻일 뿐이다. 그 뒤에 플랫폼별 배포 검증이 따로 있고, 거기서 막히면 빌드 로그만 봐선 안 보인다.

즉, 라이브 상태는 단일 신호로 확정하지 않는다. push 성공·URL 200·grep 카운트는 각각 따로 보면 다 그럴듯한 착시였고, 로컬에서 기대한 값과 대조해야 비로소 확정됐다.

플랫폼을 옮기면 "전엔 됐는데"가 가장 위험한 전제다. 파일 상한도 검증 규칙도 플랫폼마다 다르게 그어져 있다.
