# blog — 운영 규칙 (CLAUDE.md)

> angari.dev 블로그 리포. 상세 규칙은 `.project/rules/`가 원천이다(로컬 전용, gitignore).
> 이 파일은 세션이 시작할 때 읽는 최소 지도만 담는다.

## 규칙 문서 (작업 전 해당 문서 필독)

| 작업 | 문서 |
|---|---|
| 글 규격 (frontmatter·slug·린트) | `.project/rules/WRITING_RULE.md` |
| 문체 (지크의 글 목소리) | `.project/rules/WRITING_STYLE.md` |
| git·발행 (브랜치·병합) | `.project/rules/GIT_RULE.md` — 발행 = dev→main, 지크 승인 |
| 발제 수신 (우편함→글) | `.project/rules/INBOUND_RULE.md` |

## postbox(우편함) 수거 의무

- 기동 시 `~/projects/tools/postbox/mail/`을 스캔해 frontmatter `to`가 blog인 쪽지를 확인한다.
- 첫 보고 — 침묵 수거 금지, pending도 반드시 언급:
  - approved → 재차 묻지 않고 즉시 수행 (이중 승인 금지 — 승인은 이미 이뤄진 결재)
  - rejected → 내 장부에 묘비 기록(제목·사유·날짜) 후 수거 (같은 제안 재발 방지)
  - pending → 목록 제시 + "지금 정할래?" — 지크 즉석 결정 시 그 자리에서 status 반영 후 처리
- 수거 = 쪽지 파일을 내 장부(`.project/postbox/`)로 이동(우편함에서 소멸). 리마인드 책임도 나에게 이사한다.
- 금지: pending 수거 절대 금지(수거하면 우편함이 비어 헤르메스가 침묵 — 리마인드 사망) /
  `to`가 blog 아닌 쪽지 수거 금지 / 자기 판단으로 status 변경 금지(지크 발화만 근거).

## 수정 이력

| 날짜 | 변경 사항 |
|---|---|
| 2026-07-13 | 신설 (PB3 우편함 온보딩) — 규칙 문서 지도 + postbox 수거 의무(표준 문안, 장부 `.project/postbox/`) |
