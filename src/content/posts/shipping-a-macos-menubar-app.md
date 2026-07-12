---
title: 'macOS 메뉴바 앱 첫 배포기: dmg 빌드와 GitHub Release, 그리고 뒤엎은 브랜치 전략'
description: macOS 메뉴바 클립보드 매니저 stash를 처음 외부에 공개하며 orphan 브랜치 기반 7단계 배포 전략을 세웠으나, 실행 직전 더 단순한 .gitignore 기반 dev→main merge를 발견해 전략을 전면 뒤엎은 과정을 기록한다.
track: log
created: 2026-06-15T09:00
tags: [macos, release, distribution, swift]
---

stash는 macOS 메뉴바에 상주하는 클립보드 매니저다. 혼자 쓰려고 만든 앱이었는데, v1.0을 기점으로 **처음 외부에 공개**하기로 했다. 문제는 두 가지였다. Apple Developer 계정이 없어 코드사인 없이 단순 추출 방식(`ExportOptions.plist`의 `method=mac-application`)으로 배포해야 했고, 리포지토리 안에는 `.project/` — 태스크와 결정 사유, 인터뷰 기록이 담긴 내부 운영 문서 전체 — 가 그대로 들어 있었다. <u>이 내부 자료를 공개 리포에 노출하지 않으면서 배포 파이프라인을 완성해야 하는 상황이라</u>, dmg 빌드 스크립트부터 브랜치 전략까지 실행 전에 문서로 촘촘히 박아뒀다.

그런데 그렇게 세운 전략을 실행 직전에 완전히 갈아엎었다. 이 글의 알맹이는 dmg를 어떻게 구웠는지가 아니라, 그 전략을 왜 뒤엎었는지다.

## dmg 빌드 파이프라인, 짧게

`Scripts/build-dmg.sh`는 xcodebuild archive부터 최종 dmg 파일까지 네 단계를 자동화한 스크립트다. 알맹이가 아니니 안전장치 위주로만 짚는다.

스크립트 첫 줄은 `set -euo pipefail`이다. 스크립트 자체 주석에 이유가 적혀 있다.

> 안 박으면 중간 명령 실패해도 다음 명령이 계속 실행돼 반쪽짜리 dmg가 나옴.

버전의 단일 진실 소스는 `Sources/Resources/Info.plist`의 `CFBundleShortVersionString`이고, `plutil -extract`로 뽑아 쓴다. build 번호(`CFBundleVersion`)는 사람이 손으로 올리지 않는다 — `git rev-list --count HEAD`로 커밋 수를 그대로 주입한다.

> [!tip]
> 마케팅 버전과 무관하게 커밋 수는 계속 쌓이기만 하는 값이다. 그래서 build 번호로 쓰기 딱 좋다 — 되돌아갈 일이 없다.

빌드는 `rm -rf build/`(멱등성 보장) → `xcodebuild archive` → `xcodebuild -exportArchive` → `hdiutil create`(임시 UDRW dmg) → 마운트 후 `/Applications` 심볼릭 링크 추가 → `hdiutil convert`(UDZO 압축)로 이어진다. 첫 실행에서는 마운트 해제가 "resource busy"로 실패했다 — Spotlight 인덱싱 등이 마운트 포인트를 잠근 탓이다. `sync` + `sleep 2` + `-force`를 추가하자 다음 실행부터 통과했다.

산출물은 `build/stash-1.0.0.dmg`, 4.7MB, 압축률 97.7%다.

## 브랜치 전략 초안: *orphan*으로 이사하기

목적은 하나, `.project/`를 공개 리포에서 완전히 차단하는 것이었다. 그래서 첫 초안은 main 브랜치 자체를 역사 없는 브랜치로 새로 만드는 방법을 택했다.

> `git checkout --orphan`은 기존 커밋 히스토리와 연결되지 않은 새 브랜치를 만드는 명령이다. 즉, 커밋 그래프에 부모 없는 루트가 하나 더 생기는 셈이다.

이 전략은 7개 Phase로 상세히 스크립트화됐다. 핵심만 추리면 이렇다.

```bash title="RELEASE-GUIDE.md (초안, 이후 폐기)"
git checkout --orphan main-fresh
git rm -rf .
git checkout dev -- Sources/ Tests/ Scripts/ project.yml README.md ...
git commit -m "Release v1.0.0"
git branch -D main   # 기존 main 파괴적 삭제
```

> [!warn]
> `git branch -D main`처럼 되돌릴 수 없는 명령은 사용자 승인 없이 실행하지 않는다. 실제로도 이 단계만 사용자 승인을 받고 진행했다.

물리적으로 보면 **이사**와 같은 절차다. 낡은 집(main)을 통째로 빈 집으로 비우고(`--orphan` + `rm -rf .`), 공개해도 되는 짐만 골라(`checkout dev -- Sources/ ...`) 새 집으로 옮긴 뒤, 이전 집 열쇠를 아예 부숴버리는(`branch -D`) 방식이다. 짐을 하나하나 고르는 손이 많이 가는 이사다.

## 실행까지는 갔다 — 태그와 해시

이 절차 그대로 로컬에서 실행했다. `git tag v1.0.0`을 main HEAD에 박고, `shasum -a 256 build/stash-1.0.0.dmg`로 해시를 뽑았다 — `9f200bddfaf6ba6aedadbb0dec03c0a0fc9e52750af73f5a62120fb3bbef5260`. 이 값은 미래에 brew Formula가 인용할 걸 대비해 `.project/release-notes/v1.0.0.sha256.txt`에 별도 기록해뒀다.

`gh` CLI OAuth 인증, SSH push, `gh release create`처럼 자동으로 진행할 수 없는 영역은 `RUN-AFTER-WAKE.md`에 6단계 명령 시퀀스로 남기고, 직접 실행하도록 분리했다.

## 뒤엎다 — 커튼을 치는 쪽이 더 쌌다

2026-05-30, 커밋 `732f3b5`에서 이 orphan 절차를 통째로 폐기했다. 대신 내부 운영 자료(`.project/` `.claude/` `CLAUDE.md` `.taskery-manifest.json`)를 `dev`/`main` 공통 `.gitignore`에 등록해 git 추적 자체를 끊었다.

이사할 필요가 없었다. 방을 통째로 비우고 짐을 골라 나르는 대신, 그냥 그 방에 **커튼을 치면** 됐다 — 방(파일)은 그 자리에 그대로 있지만 추적(공개)에서만 빠진다. `.gitignore`에 걸린 파일은 `dev`에 있든 `main`에 있든 애초에 git이 보지 않으므로, merge를 해도 따라오지 않는다.

> 내부 운영 자료를 `.gitignore`로 git 추적 중단. 추적 안 되는 파일은 어떤 방식으로도 안 올라가므로, orphan/카피 없이 `dev` → `main` merge만으로 노출 차단 달성. 절차 대폭 단순화.

즉, 애초 목표는 "내부 자료 노출 차단"이었지 *orphan* 자체가 목표는 아니었다. 더 단순한 수단이 같은 목표를 달성한다는 걸 깨닫자 미련 없이 갈아엎었다.

물론 공짜는 아니다.

> merge 방식은 `dev`의 커밋 히스토리(메시지)가 `main`에 공유된다. 단 파일 자체(`.project/` 등)는 `.gitignore`라 노출되지 않는다. 커밋 메시지 공개는 수용 — 내부 파일만 차단하면 충분하다는 판단이다.

파일은 완전히 막지만 커밋 메시지는 못 막는다는 트레이드오프를 얼버무리지 않고 그대로 받아들인 것이다. v1.0.1은 실제로 이 merge 방식으로 나갔다 — 전환이 문서에만 그친 게 아니라 바로 다음 출시에 적용됐다. 릴리스 노트는 한글과 영문을 병기했는데, 영문은 *"Bug Fixes — Fixed several minor bugs and improved overall stability."*라고 적었고 한글은 같은 내용을 버그 수정과 안정성 개선으로 정리해 담았다.

## 문서도 낡는다 — RELEASE-GUIDE.md 정정 두 번

전략 문서 `RELEASE-GUIDE.md`는 2026-05-28 최초 작성 이후 두 번(2026-06-01, 2026-06-02) 더 손을 봤다. 그중 2026-06-02에는 하루 만에 두 가지를 함께 고쳤다.

### 정정 1: main 전략 자체가 사흘 낡아 있었다

문서는 여전히 2026-05-28 기준 *orphan* + 선별 카피를 설명하고 있었는데, 실제 코드는 2026-05-30부터 `.gitignore` + merge 방식으로 바뀐 뒤였다. §1(영역 재정의)·§3(main 정책 갱신)·§5(merge 흐름)·§7(전환 사유)을 실제와 맞춰 갱신했다.

> [!note]
> 폐기된 Phase 0~7 절차는 문서에서 지우지 않았다. "[폐기] 5.4 Phase 0~7 orphan 흐름 (초기 계획 — 실행 안 됨)... 본 절차는 역사적 보존용"이라는 라벨만 붙여 그대로 남겨뒀다. 나중에 "왜 이렇게 안 했지?"라는 질문에 답할 수 있는 흔적이다.

### 정정 2: 이름 대문자화, 그러나 전부는 아니다

앱 이름이 `stash`에서 `Stash`로 바뀐 게 dmg 파일명(`Stash-X.Y.Z.dmg`)과 release 제목(`Stash vX.Y.Z`)에 반영이 안 돼 있던 걸 고쳤다. 다만 brew cask 토큰(`stash`, 소문자 관례)과 GitHub 리포명(`angar2/stash`)은 의도적으로 그대로 뒀다 — 관례를 따라야 하는 부분과 표시 이름을 따라야 하는 부분을 구분한 것이다.

## 이후 모든 출시가 따르는 흐름

이 시행착오 끝에 정착한 흐름은 여섯 단계로 줄었다.

```bash title="release flow (요약)"
plutil -extract CFBundleShortVersionString raw Sources/Resources/Info.plist
./Scripts/build-dmg.sh
git checkout main && git merge dev
shasum -a 256 build/Stash-X.Y.Z.dmg > .project/release-notes/vX.Y.Z.sha256.txt
# Release Notes 작성 (한·영 병기)
gh release create vX.Y.Z build/Stash-X.Y.Z.dmg --title "Stash vX.Y.Z" --notes-file ...
```

PATCH/MINOR/MAJOR 판단은 사람이 하고, push 전에는 `git log --oneline -5`와 `git status`로 의도한 것만 올라가는지 눈으로 확인한다.

배포 전략을 아무리 상세히 — 7개 Phase까지 — 문서화해도, 실행 과정에서 더 단순한 방법을 발견하면 미련 없이 갈아엎는 게 맞다. *orphan* + 선별 카피는 "내부 자료 노출 차단"이라는 목표를 위한 수단 중 하나였지, 목표 자체가 아니었다. 다만 갈아엎은 계획을 지우지는 않았다 — 폐기 라벨을 붙여 남겨둔 Phase 0~7처럼, 안 쓰기로 한 이유도 함께 기록해야 나중에 같은 삽질을 반복하지 않는다.
