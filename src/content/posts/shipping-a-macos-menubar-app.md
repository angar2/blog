---
title: Apple Developer 계정 없이 macOS 앱을 배포한 방법
description: 코드 서명과 공증 없이 macOS 메뉴바 앱 Stash를 DMG 파일로 배포하고, 사용자가 처음 실행할 때 거쳐야 하는 경고 해제 과정을 안내한 기록이다.
track: log
created: 2026-06-15T09:00
tags: [macos, release, distribution, code-signing, notarization]
cover: /assets/images/blog/shipping-a-macos-menubar-app/cover.png
---

`Stash`는 메뉴바에서 최근에 복사한 텍스트·이미지·파일을 다시 꺼내 쓸 수 있게 만든 macOS 클립보드 앱이다. 혼자 쓰던 앱을 처음 공개할 때, 가장 먼저 정해야 했던 것은 “어떤 파일로, 어디에 올리고, 사용자는 어떻게 실행하게 할 것인가”였다.

당시에는 Apple Developer Program 계정이 없었다. 그래서 앱 제작자의 신원을 증명하는 **코드 서명**과 Apple이 배포용 앱을 검사하는 **공증**을 적용할 수 없었다. 빌드한 앱을 DMG 파일로 묶어 [GitHub Release](https://github.com/angar2/stash/releases)에 올리는 방식으로 배포하되, <u>처음 실행할 때 macOS 경고가 표시된다는 점을 사용자에게 미리 설명하는 것</u>이 필요했다.

> **DMG**는 macOS에서 앱을 배포할 때 자주 쓰는 디스크 이미지 파일이다. 사용자는 DMG를 열고 그 안의 앱을 `Applications` 폴더로 옮긴 뒤 실행한다.

## Apple Developer 계정이 없으면 첫 실행이 달라진다

macOS는 인터넷에서 내려받은 앱을 처음 열 때, 누가 만든 앱인지 확인한다. 코드 서명과 공증이 된 앱은 이 확인을 통과하면 일반 앱처럼 열 수 있다. 반면 당시의 Stash처럼 서명되지 않은 앱은 macOS가 제작자를 확인할 수 없으므로 실행을 바로 막고 경고를 보여준다.

이 경고는 Stash가 실행되지 않는다는 뜻이 아니라, **사용자가 앱을 신뢰할지 직접 결정해야 한다는 뜻**이다. 따라서 배포 파일만 올려두는 것으로는 부족했다. 설치 방법과 경고 해제 방법을 함께 제공해야 했다.

| 구분 | 코드 서명·공증을 적용한 앱 | 당시의 Stash |
|---|---|---|
| 첫 실행 | macOS가 제작자 확인을 마치면 일반적으로 바로 실행된다. | macOS가 확인할 수 없는 개발자의 앱으로 보고 실행을 막는다. |
| 사용자에게 필요한 행동 | 보통 별도 설정이 필요 없다. | 시스템 설정에서 한 번 `그래도 열기`를 선택해야 한다. |
| 배포 준비 | Apple Developer Program 계정과 서명·공증 절차가 필요하다. | 앱을 빌드해 DMG로 묶고, 경고 해제 방법을 안내한다. |

## DMG 파일로 배포했다

배포할 때는 먼저 Stash 앱을 빌드한 뒤, `Stash.app`과 `Applications` 폴더 바로가기를 하나의 DMG 파일에 넣었다. 사용자가 앱을 설치할 때 파일을 복사하는 위치를 바로 알 수 있게 하기 위해서다.

GitHub Release에는 이 DMG 파일과 함께 다음 순서의 설치 안내를 남겼다.

1. `Stash-1.0.0.dmg` 파일을 내려받는다.
2. DMG를 열고 `Stash.app`을 `Applications` 폴더로 옮긴다.
3. Stash를 실행한다.
4. macOS 경고가 표시되면 시스템 설정의 **개인정보 보호 및 보안**에서 `그래도 열기`를 선택한다.
5. Stash를 다시 실행한다.

<img src="/assets/images/blog/shipping-a-macos-menubar-app/stash-installation-steps.png" alt="Stash DMG 설치와 macOS 경고 해제 방법" width="485" />

*Stash v1.0.0 릴리즈에 함께 제공한 설치 및 실행 안내다.*

## 배포 파일과 안내를 함께 준비했다

코드 서명과 공증이 없으면 설치 과정이 한 단계 늘어난다. 사용자는 앱을 내려받은 뒤 끝나는 것이 아니라, 운영체제가 보여주는 경고를 보고 직접 실행을 허용해야 한다.

그래서 이번 첫 배포에서는 DMG 파일을 만드는 일과 설치 안내를 같은 배포물로 봤다. 앱이 어디에 설치되는지, 경고가 왜 나타나는지, 어느 화면에서 다시 열 수 있는지를 미리 알려야 사용자가 중간에 멈추지 않는다.

Apple Developer Program 계정을 갖추면 이 첫 실행 경험은 더 단순해질 수 있다. 다만 당시에는 계정 없이도 앱을 공개할 수 있는 현실적인 경로가 필요했고, **DMG 배포와 명확한 설치 안내**를 그 방식으로 선택했다.

현재 Stash는 나와 지인들이 사용하는 앱으로 만들었기 때문에, 이 배포 방식으로 충분했다. 앞으로 더 많은 사람이 부담 없이 설치해 쓸 수 있는 형태로 공개 범위를 넓히게 되면 Apple Developer Program에 가입해 코드 서명과 공증을 적용할 계획이다. 그때는 경고를 해제하라고 안내하는 대신, 사용자가 DMG를 열고 앱을 옮긴 뒤 바로 실행할 수 있게 된다.

> [!tip]
> **[Stash GitHub Release](https://github.com/angar2/stash/releases)**
>
> 최신 DMG 파일과 릴리즈 노트는 여기에서 확인할 수 있다.
