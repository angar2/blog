---
title: 여러 git 워크트리의 변경내역을 VSCode 한 창에서 보기 — 되는 것과 아직 안 되는 벽
description: 워크트리 여러 개를 VSCode 창 하나에서 관망하는 법을 네이티브 설정·CLI·확장 순으로 파고든 리서치. git.detectWorktrees로 되는 것과 트레이드오프, 오늘 기준 내장 기능만으로는 안 되는 미해결 벽까지 짚는다.
track: notes
created: 2026-07-17T13:36
tags: [git, git-worktree, vscode, developer-tools]
sources:
  - title: "microsoft/vscode #320749"
    url: https://github.com/microsoft/vscode/issues/320749
---

git worktree를 여러 개 굴리다 보면 자연스레 이런 바람이 생긴다. "메인 창 하나만 열어두고, 나머지 워크트리들의 수정내역을 한눈에 보고 싶다." 이 글은 그 방법을 VSCode 네이티브 설정·CLI·확장 순으로 파고들어 무엇이 되고 무엇이 안 되는지 경계를 확정한 리서치 노트다. 결론부터 말하면 <u>되는 방법이 하나 있고, 완벽하게는 오늘 기준 내장 기능만으로 안 된다.</u> 계기는 워크트리를 자동 생성하는 도구를 쓰면서였다 — 워크트리마다 창을 새로 열지 않고, 메인 창 하나에서 다른 워크트리들의 변경내역을 SCM 뷰로 관망하고 싶었다.

## 채택안 — git.detectWorktrees

되는 방법은 VSCode 1.103+의 네이티브 설정 `git.detectWorktrees`다. 열린 repo의 워크트리 메타를 읽어, 그 repo에 연결된 워크트리만 스코프해 Repositories 뷰에 그룹으로 표시한다.

- `scm.alwaysShowRepositories`를 함께 켜면 Repositories 뷰가 항상 보인다.
- 감지는 워크트리의 물리적 위치와 무관하다. <u>워크트리 메타는 항상 메인 `.git` 안에 기록되기 때문</u>이다.
- 설정은 워크스페이스 스코프(`.vscode/settings.json`)에 두고, `.vscode/`는 gitignore에 넣는다 — 절대경로가 커밋에 누수되는 것을 막기 위해서다.

## 왜 git.scanRepositories는 안 됐나

처음엔 `git.scanRepositories`에 워크트리 경로를 박아 띄우려 했지만 실패했다. 그 이유가 이 문제의 핵심을 관통한다.

워크트리는 메인 repo와 `.git`을 공유한다. 그래서 VSCode가 워크트리를 "이미 열린 repo의 일부"로 흡수해버리고, 별도 SCM 섹션을 만들지 않는다. 경로를 명시해도 이 흡수를 못 이긴다.

즉, 같은 `.git`을 공유한다는 성질이 한 방법은 막고 다른 방법은 살린다. `scanRepositories`는 흡수에 지지만, `detectWorktrees`는 그 공유 구조를 **역이용**해 메타를 읽는다.

## 핵심 트레이드오프 — 스코프냐 즉시성이냐

그런데 `detectWorktrees`에도 한계가 있다. 대안이던 `code --add`와 나란히 놓으면 트레이드오프가 선명하다.

| 방법 | 창 스코프 | 즉시 반영 | 약점 |
|---|---|---|---|
| `git.detectWorktrees` | 정확 | 안 됨 | 새 워크트리는 window reload를 해야 잡힘 |
| `code --add` | 안 됨 | 즉시(reload 불필요) | last-active 창에 붙어, 다중 창일 때 엉뚱한 창에 추가되는 race |

정리하면, **"창 스코프 + 즉시 반영 + 자동 등록"을 동시에 만족하는 방법은 오늘 기준 내장 기능만으로는 없다.** 둘 중 하나를 포기해야 한다.

> [!note]
> 단, reload가 필요한 건 새 워크트리를 처음 등록할 때 1회뿐이다. 이미 잡힌 워크트리 내부의 코드 변경은 reload 없이 라이브로 반영된다.

## 미해결 벽의 근원

reload가 필요한 이유는 내 설정 문제가 아니라 VSCode의 미구현이다. <u>VSCode가 `.git/worktrees` 변경을 실시간으로 감시(watch)하지 않기 때문</u>이다. 이건 공개 이슈로 올라와 있다(microsoft/vscode#320749, 2026년 6월 기준 미해결).

그래서 클릭하면 그 워크트리로 창을 전환하는 스위처 류 확장도 답이 아니다. "한 창에서 관망"이라는 목표와 정반대로 창을 옮겨버리기 때문이다.

## 진짜로 필요하면 — 소형 확장

두 트레이드오프를 동시에 없애는 길은 하나뿐이다. `.git/worktrees`를 `fs.watch`로 감시하다가 변경이 감지되면 `workspace.updateWorkspaceFolders()`로 인프로세스에서 폴더를 add/remove하는 소형 확장을 직접 만드는 것이다.

이는 사실상 **"`code --add`의 창-내(in-window) 버전"**이다. 즉시성을 유지하면서도 last-active 창 race가 없다. 오늘 기준 내장 기능이 못 채우는 자리를 정확히 메운다.

## 정리

- 여러 워크트리를 한 VSCode 창에서 관망하려면 `git.detectWorktrees`(+`scm.alwaysShowRepositories`)가 오늘 기준 최선의 네이티브 답이다. 새 워크트리는 window reload 1회가 필요하다.
- 설정은 워크스페이스 스코프에 두고 `.vscode/`는 gitignore — 절대경로 커밋 누수 방지.
- `scanRepositories`로 안 되는 건 설정 탓이 아니다. 워크트리가 메인 `.git`을 공유해 흡수되기 때문이고, 경로를 박아도 못 이긴다.
- 스코프·즉시 반영·자동 등록을 다 원하면 내장 기능으로는 안 된다. 정공법은 `fs.watch` + `updateWorkspaceFolders()` 소형 확장이다.
