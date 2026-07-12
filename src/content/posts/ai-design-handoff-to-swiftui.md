---
title: 'Claude Design 핸드오프기: 정책은 plan이, 시각은 디자인이 이긴다'
description: AI 디자인 툴 Claude Design이 만든 인터랙티브 프로토타입을 SwiftUI로 옮기며 시각 충실도가 전면 미달했던 사건과, 그 원인이 NSPopover라는 시스템 컴포넌트였음을 추적한 과정을 정리한다.
track: log
created: 2026-05-10T09:00
tags: [swiftui, macos, ai-workflow, design]
---

macOS 메뉴바 클립보드 매니저 `stash`를 만들면서, 화면 디자인을 처음부터 손으로 그리지 않고 **Claude Design**(claude.ai/design)이라는 AI 디자인 툴에 맡겨보기로 했다. 이유는 단순하다.

- 나 혼자 진행하는 프로젝트라 **디자이너 없이 UI 완성도**를 끌어올려야 했다.
- 코딩 에이전트(Claude Code)에게 "이렇게 만들어줘"라고 말로 설명하는 것보다, **실제로 클릭·키보드가 동작하는 프로토타입을 넘기는 편이 명세로서 더 정확**하다고 판단했다.
- `stash`는 앞으로 build부터 ship까지 여러 편에 걸쳐 다룰 계획이라, 이 글이 그 첫 편이다.

> Claude Design은 HTML/CSS/JS로 인터랙티브 목업을 만드는 AI 디자인 툴이다. 사용자가 여기서 디자인을 확정하면, README·채팅 전문·프로토타입 파일·아이콘 갤러리·스크린샷을 묶은 "핸드오프 번들"을 export해 코딩 에이전트에게 넘길 수 있다.

결과부터 말하면, 1차 구현은 **시각 충실도가 전면 미달**이었다. 원인을 추적해보니 진짜 문제는 디자인 코드가 아니라, 프로젝트 plan 문서에 박아둔 규칙 하나였다.

## Claude Design 세션: 3안에서 B안까지

`stash`는 3가지 호출 진입점을 가진 앱이다 — 메뉴바 좌클릭으로 여는 `NSPopover`(방식 1), ⌘ 길게 눌러 여는 미니멀 `NSPanel`(방식 2), ⌘ 더블탭으로 여는 `NSPanel`(방식 3). 이 구조를 두고 Claude Design 세션(`chat1.md`)은 PRD.md를 정독한 뒤 세 방향을 제시했다.

- A. 정통파(Native Faithful) — Maccy·Pastebot 결의 익숙한 UI.
- B. Liquid Glass 미니멀 — macOS Tahoe의 새 디자인 언어를 반영.
- C. 키보드 히어로 — 숫자 키캡을 시각적으로 강조.

"일단 'B.Liquid Glass 미니멀' 방식으로 가고 싶은데"로 B를 고른 뒤, 후속 수정 요청이 약 10회 누적됐다. 행 높이 컴팩트화, 타입별 아이콘 갤러리(앱·트레이·pin·설정·삭제 각 6종), 검색바 위치 조정(두 차례), pin 아이콘 3차 재설계, 없던 환경설정 창 신규 요청, `focusZone` 키보드 내비게이션 모델 전면 재설계(검색·클립·핀·설정 4구역 순환, ↑↓·1/2 키, 한글 키보드 `KeyP` 매칭), 클립 8개 이상 시 스크롤 처리, ESC 검색어 리셋, 단축키 힌트바 키캡 그룹핑까지 이어졌다.

최종적으로 클릭·키보드·데이터(localStorage 영속)까지 실제로 동작하는 `Stash - Interactive Prototype.html`과, 디자인 토큰·아이콘 선택·단축키 매핑표·화면별 SwiftUI/AppKit 매핑·데이터 모델·검증 체크리스트 13항목을 담은 `IMPLEMENTATION_HANDOFF.md`가 완성됐다.

> [!note]
> 핸드오프 번들 README에는 이런 지시가 적혀 있었다. *"Read the chat transcripts first... they tell you what the user actually wants and where they landed... recreate them pixel-perfectly... don't copy the prototype's internal structure unless it happens to fit."* 즉, 프로토타입은 참고자료가 아니라 <읽고 그대로 재현해야 할 명세>로 취급하라는 것이었다.

## 핸드오프 셋업에서 갈린 두 항목

TASK-014(디자인 셋업) 단계에서는 Claude Design 패키지(186KB tar.gz, 압축 해제 시 28파일)를 fetch하고 README·HANDOFF·`chat1.md`를 정독한 뒤, **"기준 진실 = `Stash - Interactive Prototype.html`"**로 합의했다.

이미 프로젝트엔 plan 문서 체계(`UX-UI.md`·`FEATURES.md`·`ARCHITECTURE.md`·`ROADMAP.md`)가 있었고, 그 안에 <디자인 산출물이 plan과 충돌하면 plan 우선>이라는 규칙(`UX-UI.md §12-4`)이 이미 박혀 있었다. 이 규칙으로 프로토타입과 plan을 17개 항목에 걸쳐 대조 검증했다. 결과는 ✅ 12건, ⚠️ 3건(⌘⇧⌫ alias, 메뉴바 메타포, 토스트 케이스), 그리고 ❌ 2건.

❌ 2건은 다음과 같았다.

- **#6 전체 삭제 동작**: 프로토타입은 즉시 실행 후 토스트로 되돌리기를 제공하는데, plan은 `NSAlert` 확인 모달을 요구했다.
- **#15 도메인 모델**: HANDOFF 문서는 `Clip` 7필드·`ClipType` 4종을 명시했는데, plan은 11필드·3종을 요구했다.

이 두 건은 그 시점의 §12-4 규칙에 따라 그대로 **"plan 우선"**으로 결정됐다. 이어서 `DesignTokens.swift`를 새로 만들어 Colors·Typography·Spacing·Radius·WindowSize·Shadow·Animation 7개 카테고리로 디자인 토큰을 옮겼다.

## 1차 구현: 테스트는 통과했는데 시각은 무너졌다

TASK-015(UI 구현) 단계는 방금 정한 ❌ 2건의 "plan 우선" 결정을 그대로 반영하며 진행했다. `HistoryPopover.swift`, `ClipsViewModel.swift` 등 UI Layer 22개 파일과, ⌘ hold/double-tap을 200ms/250ms 임계값으로 감지하는 `HotkeyMonitor.swift`가 새로 생겼다. 1차 완료 시점 self-check는 빌드 PASS, **82 tests / 13 suites**로 깔끔했다.

문제는 그다음 시각 검수였다. Liquid Glass가 적용되지 않았고, 메뉴바 아이콘은 SVG가 아니라 다른 것이 박혀 있었고, 시간 표시엔 "전" 접미사가 빠졌고, 환경설정 행에는 있으면 안 되는 휴지통 아이콘이 붙어 있었고, popover 패딩도 프로토타입과 달랐다. 테스트는 82개 다 통과했는데, 눈으로 보면 완전히 다른 앱이었다.

## Root cause: 정책 규칙을 시각까지 끌고 갔다

원인을 추적한 결론은 이랬다. *"UX-UI §12-4 박을 때 시각 영역까지 plan 우선 룰로 묶은 게 본질. TASK-014 정합 검증 ❌ 2건 결정(NSAlert / 도메인) 자체가 역방향이었음."*

즉, <디자인이 plan과 충돌하면 plan 우선>이라는 규칙 하나가 두 종류의 결정에 동시에 적용되고 있었다. 도메인 모델이나 확인 모달 방식 같은 **정책** 판단에는 이 규칙이 맞았다. 하지만 색상·블러·레이아웃 같은 **시각** 판단에도 같은 규칙을 그대로 물려쓰면서, 시각 영역에서는 정반대 방향으로 작동하고 있었다. status는 testing에서 developing으로 되돌아갔다.

## Fix 사이클 1: 규칙을 쪼개고 다시 그렸다

우선 sub-agent에 위임해 Claude Design 산출물(프로토타입 HTML, JSX 9종, 19KB짜리 `icons.jsx`, CSS 2종)에서 시각·동작 명세를 100% 다시 뽑았다. 그리고 `UX-UI.md §12-4` 규칙 자체를 정정했다 — **"시각 = 디자인 우선 / 정책 = plan 우선"**으로 분리하고, 디자인 우선으로 뒤집을 항목 5건(NSAlert 제거, 메뉴바 적층 카드, 빈 상태 큰 제목+보조 문구, 단축키 충돌 토스트 병행, ⌘⇧⌫ alias)을 새로 정했다.

`icons.jsx`의 SVG를 SwiftUI `Path`로 옮긴 `TrayIconView.swift`, `NSVisualEffectView` 래퍼인 `VisualEffectView.swift`가 새로 생겼고, `ClipRowView`·`HistoryPopover`·`KeyboardHintsView` 등 시각 관련 코드를 전면 재작성했다. self-check는 빌드 PASS(warning 1), **86 tests / 14 suites**.

> [!warn]
> 이 사이클을 겪고 나서 메모리 파일을 하나 박아뒀다 — 파일명 자체가 사건 요약이다: `feedback_claude_design_is_truth.md`. 내용은 *"Claude Design = 최종 UXUI 완성물 / plan은 디자인 따라간다"*. 정책 규칙과 시각 규칙을 하나로 뭉개면 다음 프로젝트에서도 똑같이 재발할 수 있다는 뜻이다.

## Fix 사이클 2: 진범은 NSPopover였다

규칙을 고쳤는데도 재검수에서 또 문제가 나왔다. Liquid Glass 여전히 미적용, 메뉴바 아이콘 불일치, Pin 행 미표시, 단축키 힌트바 키캡이 세로로 쪼개짐, popover 상단이 두껍게 남는 문제까지 4개 더.

진짜 원인은 코드가 아니라 컴포넌트 선택이었다. `NSPopover`의 system chrome이 SwiftUI가 그리는 Liquid Glass 효과를 그 위에서 덮어버리고 있었다. 방식 1을 `Method1Window`(NSPanel 기반)로 분리했지만, `NSPanel`의 `.hudWindow` styleMask 역시 system HUD chrome을 그리면서 Material을 다시 한번 막았다.

<u>겉면에 시스템이 이미 자기 방식대로 코팅을 입혀놓은 유리창이면, 그 위에 다른 코팅(SwiftUI Material)을 아무리 덧발라도 빛이 이미 걸러진 뒤라 소용이 없다.</u> 색상 토큰 값을 백날 조정해도 안 풀리던 이유가 이거였다 — 문제는 값이 아니라 그 값을 그려낼 그릇 자체였다.

본질적인 fix는 `NSPanel.contentView`에 `NSVisualEffectView`를 직접 붙이고, SwiftUI body는 100% 투명 처리하는 것이었다.

> [!tip]
> macOS에서 popover·panel에 vibrancy를 입힐 때, 시스템 컨테이너(`NSPopover`, `.hudWindow` 스타일마스크)에 기대는 대신 `NSVisualEffectView`를 직접 마운트하고 SwiftUI 뷰는 투명하게 비워두는 편이 표준적으로 안전하다.

그 밖에 `ImageRenderer`로 `TrayIconView`를 NSImage Template으로 변환해 메뉴바 아이콘 문제를 해결했고, Pin 행 표시 조건은 `hasPinned` 하나로 단순화했고, 키캡 줄바꿈은 `Layout` 프로토콜 기반 `FlowLayout`을 새로 만들어 처리했고, `canBecomeKey: true`를 override한 `KeyablePanel` 서브클래스를 새로 만들어 SwiftUI `.onKeyPress`와 텍스트필드 first responder가 제대로 동작하게 했다.

## 범위를 자른 판단: "UI까지만"

두 번의 fix 사이클을 거친 뒤 명시적으로 선을 그었다. *"현재 task = UI까지만 / UX 버그는 후속 task로 분리."* 이후 `PopoverPanel.swift` 헬퍼로 `NSPanel`+`NSVisualEffectView` 셋업 중복 코드 약 80줄을 걷어내는 리팩토링은 진행했지만, 단축키 실제 동작·호버 `focusZone`·온보딩 자동 권한 감지 같은 항목은 <검증 X, 후속 task>로 명시적으로 남겨뒀다.

최종 self-check는 `xcodebuild build` PASS(error 0 / warning 0), `xcodebuild test` PASS — **86 tests / 14 suites**로 회귀 없이 유지됐다. 다만 메뉴바 아이콘 활성/비활성 페어, popover 화살표 꼬리, ⌘ hold/double-tap 등장·소멸, 클립 호버·paste 플래시, 한글 `KeyP` 매칭, 라이트/다크 자동 추종 등 총 18항목은 자동화로는 확인할 수 없어 UNCERTAIN으로 명시 이관했다. 격리된 세션에서는 GUI를 직접 눈으로 볼 수 없으니, 이 부분은 사람이 직접 검수해야 하는 영역으로 문서에 못박아뒀다.

## 착지: 정책은 plan, 시각은 디자인

이 사이클 전체를 관통하는 결론은 하나다. **정책은 plan이 이기고, 시각은 디자인이 이긴다.** 이 둘을 <디자인이 plan과 충돌하면 plan 우선>이라는 단일 규칙으로 뭉뚱그리면, 도메인 모델이나 모달 방식 같은 정책 판단에는 맞는 규칙이 색상·블러·레이아웃 같은 시각 판단에는 거꾸로 작동한다.

AI 디자인 툴이 만든 인터랙티브 프로토타입은 "참고 이미지"가 아니라 **실행 가능한 명세**다. 실제로 클릭·키보드·데이터가 동작하는 HTML을 기준 진실로 규정했으면, 그 우선순위를 문서 전체 규칙에서 끝까지 일관되게 지켜야 한다는 걸 이번에 몸으로 배웠다. `UX-UI.md §12-4`를 처음 쓸 때는 "plan 우선"이라는 한 줄이 안전한 기본값처럼 보였지만, 막상 시각 영역에 적용해보니 두 번의 fix 사이클과 총 6개 이상의 재작업을 만들어냈다 — 규칙 자체는 틀리지 않았고, 적용 범위를 잘못 그은 게 문제였다.

그리고 완벽을 기다리지 않고 "UI까지만, UX 버그는 후속으로" 자르는 판단도 이 사이클의 일부였다. 전부 붙잡고 있다가 아무것도 못 내는 것보다, 시각 충실도라는 하나의 축을 확실히 끝내고 넘기는 편이 나았다.
