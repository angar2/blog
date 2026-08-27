# blog — 에이전트 운영 규칙

> angari.dev 블로그 리포. 상세 규칙은 `.project/rules/`가 원천이다(로컬 전용, gitignore).
> 이 파일은 세션이 시작할 때 읽는 최소 지도만 담는다.

## 규칙 문서 (작업 전 해당 문서 필독)

| 작업 | 문서 |
|---|---|
| 글 규격 (frontmatter·slug·린트) | `.project/rules/WRITING_RULE.md` |
| 문체 (지크의 글 목소리) | `.project/rules/WRITING_STYLE.md` |
| 문체 — 교정에서 배운 것 | `.project/rules/STYLE_FEEDBACK.md` — 발행 후 지적에서 뽑은 지침. WRITING_STYLE과 충돌하면 이쪽이 이긴다 |
| 발행글 수정·발행 확정 (지크 지적 반영) | `revise-post` 스킬 — Claude Code: `.claude/skills/revise-post/` · Codex: `.codex/skills/revise-post/` — 지적된 곳만 고쳐 검수 대장에 기록하고, "이 글 됐다"에 발행 정산해 대장을 `ready`로 닫는다 |
| 문체 학습 (대장 → 규칙) | `distill-style` 스킬 — Claude Code: `.claude/skills/distill-style/` · Codex: `.codex/skills/distill-style/` — `ready` 대장이 3장 이상 쌓였을 때만 돌아 반복된 지적만 STYLE_FEEDBACK으로 증류한다. 글·발행은 건드리지 않는다 |
| git·발행 (브랜치·병합) | `.project/rules/GIT_RULE.md` — 발행 = dev→main, 지크 승인 |
| 발제 수신 (우편함→글) | `.project/rules/INBOUND_RULE.md` |

## postbox(우편함) 수거 의무

- 기동 시 `~/projects/tools/postbox/mail/`을 스캔해 **맨 위 쪽지**의 `to`가 blog인 우편을 확인한다(postbox v2: 우편 안에 쪽지가 최신 위로 쌓인다 — README가 원천).
- 맨 위 쪽지 본문의 `결재:` 줄과 no.1의 `from`으로 용무를 판별한다(상세 분기표 = INBOUND_RULE §2):
  - 결재: 승인 + no.1이 second 발제 → 집필·발행 수행 후 회수
  - 결재: 승인 + no.1이 내 보고 → 확인된 보고 — 회수·장부 기록만
  - 결재: 반려 → 사유를 장부에 묘비 기록 후 회수. 대응 계획은 다음 보고에 명기(자동 수정 금지). 일반화 가능한 사유면 WRITING_RULE/STYLE 개정 제안 포함(개정은 지크 승인만)
  - `결재:` 줄 없음 → 구식/규격 외 — 손대지 않고 지크에게 보고
- 회수 = 우편 파일을 내 장부(`.project/postbox/`)로 이동(우편함에서 소멸). 리마인드 책임도 나에게 이사한다.
- 금지: 실행이 안 끝난 우편 회수 금지(재시도 장치 파괴) / 맨 위 `to`가 blog 아닌 우편 접촉 금지 /
  결재(라우팅) 금지 — 결재는 지크 발화 + route.mjs만.

## 수정 이력

| 날짜 | 변경 사항 |
|---|---|
| 2026-07-13 | 신설 (PB3 우편함 온보딩) — 규칙 문서 지도 + postbox 수거 의무(표준 문안, 장부 `.project/postbox/`) |
| 2026-07-17 | postbox v2 라우팅 정합(지크 승인) — 수거 의무를 v2 표준 문안으로 교체(맨 위 쪽지 기준, 용무 분기, 결재는 route.mjs만) |
| 2026-08-27 | 교정 배관 역할 재분배(지크 승인) — `revise-post`가 발행 정산까지 맡아 `ready` 대장을 만들고, `distill-style`은 그 대기열을 소비해 증류만 한다. `ready`의 뜻을 "발행 확인까지 끝나 닫힌 대장"으로 통일. 임시 스킬 `rewrite-post` 삭제 |
| 2026-08-10 | 발행 후 교정 학습 배관 배선(지크 승인) — 규칙 문서 지도에 `STYLE_FEEDBACK.md`(교정에서 배운 문체 지침)와 스킬 2종(`revise-post`·`distill-style`) 3행 추가. 지크가 발행글을 지적하면 고치고 검수 대장에 남기고, 반복된 것만 규칙으로 증류하는 경로 |
