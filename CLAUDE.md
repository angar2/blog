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

- 기동 시 `~/projects/tools/postbox/mail/`을 스캔해 **맨 위 쪽지**의 `to`가 blog인 우편을 확인한다(postbox v2: 우편 안에 쪽지가 최신 위로 쌓인다 — README가 원천).
- 맨 위 쪽지 본문의 `결재:` 줄과 no.1의 `from`으로 용무를 판별한다(상세 분기표 = INBOUND_RULE §2):
  - 결재: 승인 + no.1이 second 발제 → 집필·발행 수행 후 회수
  - 결재: 승인 + no.1이 내 보고 → 확인된 보고 — 회수·장부 기록만
  - 결재: 반려 → 사유를 장부에 묘비 기록 후 회수. 대응 계획은 다음 보고에 명기(자동 수정 금지)
  - `결재:` 줄 없음 → 구식/규격 외 — 손대지 않고 지크에게 보고
- 회수 = 우편 파일을 내 장부(`.project/postbox/`)로 이동(우편함에서 소멸). 리마인드 책임도 나에게 이사한다.
- 금지: 실행이 안 끝난 우편 회수 금지(재시도 장치 파괴) / 맨 위 `to`가 blog 아닌 우편 접촉 금지 /
  결재(라우팅) 금지 — 결재는 지크 발화 + route.mjs만.

## 수정 이력

| 날짜 | 변경 사항 |
|---|---|
| 2026-07-13 | 신설 (PB3 우편함 온보딩) — 규칙 문서 지도 + postbox 수거 의무(표준 문안, 장부 `.project/postbox/`) |
| 2026-07-17 | postbox v2 라우팅 정합(지크 승인) — 수거 의무를 v2 표준 문안으로 교체(맨 위 쪽지 기준, 용무 분기, 결재는 route.mjs만) |
