---
title: 내 앱 dmg만 남들과 달랐다 — 설치 창을 그리는 건 앱이 아니라 볼륨이다
description: macOS dmg 설치 창은 앱 UI가 아니라 Finder가 볼륨 메타데이터를 읽어 만든다. 실제 dmg 다섯 개를 대조해 파일 세 종과 빌드 과정의 함정을 확인한 기록이다.
track: notes
created: 2026-07-29T18:54
tags:
  - macos
  - dmg
  - distribution
  - finder
  - release
cover: /assets/images/blog/the-dmg-window-nobody-designed/cover.png
sources:
  - title: stash v1.2.0~v1.2.1 출시와 dmg 설치 창 작업 세션
  - title: macOS dmg distribution 원리 정리
---

## 내 dmg만 밋밋했던 이유

내가 만든 메뉴바 클립보드 앱 stash의 dmg를 열면, 다른 앱과 설치 창 모양이 달랐다. Claude·ChatGPT·Slack·Google Chrome·Telegram은 앱 아이콘과 Applications 폴더, 화살표가 한 화면에 정리되어 있었는데 내 dmg는 앱과 심볼릭 링크만 놓인 Finder 기본 창이었다.

처음부터 앱 UI 문제라고 보지는 않았다. 내가 짚은 대로 <u>바꿔야 할 곳은 Swift 코드가 아니라 dmg를 만드는 방식</u>이었다. Finder는 앱이 아니라 **볼륨 안의 파일과 메타데이터**를 읽어 설치 창을 그린다.

> dmg 설치 창은 앱의 화면이 아니다. Finder가 마운트된 볼륨의 설정을 해석해 보여 주는 화면이다.

즉, 앱 안에서 설치 화면을 구현하는 일이 아니라, 배포 산출물인 dmg 볼륨을 구성하는 일이다.

## 말 대신 dmg 다섯 개를 열었다

설명을 듣고도 확신할 수 없었다. 유명한 macOS 앱의 dmg가 거의 같은 형태를 보인다면, 관행이 실제 파일로 남아 있을 것이라 생각했다. 그래서 내 맥에 있던 dmg 다섯 개를 직접 마운트해 비교했다.

| 볼륨 | `.DS_Store` | `.VolumeIcon.icns` | `.background/` |
|---|---|---|---|
| Claude | ✓ 15KB | ✓ | ✓ `background.png` 654×422 |
| ChatGPT | ✓ 10KB | ✓ | ✓ |
| Slack | ✓ 15KB | ✓ | ✓ |
| Google Chrome | ✓ 8KB | ✓ | ✓ |
| Telegram | ✓ 10KB | ✓ | ✓ |
| stash | ✗ | ✗ | ✗ |

다섯 제품은 모두 세 가지를 갖고 있었고, 내 dmg에만 없었다. 공개 도구인 `create-dmg`·`appdmg`·`dmgbuild`도 같은 구성을 만든다. 특정 앱의 독특한 연출이 아니라 **dmg 배포의 표준 관행**이었다.

| 파일 | Finder가 읽는 내용 |
|---|---|
| `.DS_Store` | 창 크기·위치, 아이콘 좌표·크기, 툴바·상태바·경로바 표시 여부, 배경 참조 |
| `.background/` | 설치 창 배경 이미지 |
| `.VolumeIcon.icns` | 볼륨 아이콘. `SetFile -a C`로 커스텀 아이콘 표시를 설정한다 |

## Finder가 쓰는 좌표까지 비교한 이유

세 파일을 넣은 첫 결과물에서는 `.background` 폴더 자체가 Finder 창에 보였다. 처음에는 숨김 파일 표시 설정 때문이라고 판단했지만, 같은 설정에서 Claude dmg를 열어 보니 그 폴더는 보이지 않았다. 내 판단이 틀렸다.

`.DS_Store` 레코드를 전부 비교하자 차이가 드러났다.

```text title=".DS_Store 레코드 비교"
Claude                      우리
  .  bwsp                     .  bwsp
  .  icvp                     .  icvp
  .  vSrn                     .  vSrn
  Applications  Iloc          .background   Iloc
  Claude.app    Iloc          Applications  Iloc
                              Stash.app     Iloc
```

`Iloc`는 아이콘 위치를 기록한다. Finder에게 창 모양을 설정하게 했을 때, 그 시점에 볼륨에 있던 `.background` 폴더까지 위치가 기록된 것이다. 반면 Claude의 `.DS_Store`에는 그 숨김 폴더의 좌표가 없었다.

- **원인**: 읽기 전용 볼륨에서 Finder는 좌표 기록이 있는 숨김 항목도 그린다.
- **해결**: 설정할 때 배경 폴더를 `.bgsrc`처럼 다른 이름으로 두고, 설정이 끝난 뒤 `.background`로 되돌린다.
- **재발 방지**: 빌드 검증에 “배경 폴더의 좌표 기록이 없어야 한다”는 항목을 추가했다.

<u>중요한 건 숨김 폴더의 존재가 아니라 `Iloc` 기록의 존재</u>였다. 같은 설정을 탓하기보다 대조군의 실물을 열어 본 덕분에 원인을 좁힐 수 있었다.

## 창을 만드는 코드는 앱 코드가 아니다

dmg를 마운트한 뒤 Finder에 창 모양을 지시하면, 그 결과가 볼륨 루트의 `.DS_Store`에 남는다. 내가 실제로 다룬 핵심은 다음 정도였다.

```applescript title="Finder로 dmg 창 설정하기"
tell application "Finder"
  tell disk "Stash"
    open
    set current view of container window to icon view
    set toolbar visible of container window to false
    set statusbar visible of container window to false
    set the bounds of container window to {200, 120, 840, 560}
    set opts to the icon view options of container window
    set icon size of opts to 128
    set background picture of opts to file ".background:background.png"
    set position of item "Stash.app" of container window to {160, 190}
    set position of item "Applications" of container window to {480, 190}
  end tell
end tell
```

이 조각만 보면 간단해 보이지만, 결과물을 만든 과정에는 네 가지 함정이 있었다.

| 함정 | 실제로 일어난 일 | 처리 |
|---|---|---|
| 숨김 폴더 좌표 | Finder가 `.background`에도 `Iloc`를 기록했다 | 설정 때 다른 이름을 쓰고 마지막에 되돌렸다 |
| Retina tiff | 1x·2x 이미지를 묶자 2x 배경이 축소 없이 그려져 화살표가 창 밖으로 밀렸다 | 654×422 PNG 한 장으로 되돌렸다 |
| APFS 기본값 | `hdiutil create`가 최신 macOS에서 APFS를 기본으로 잡았다 | 배포용 dmg는 HFS+로 명시했다 |
| 무성 실패 | 자동화 권한이 없는 Finder AppleScript가 에러 없이 아무 일도 하지 않았다 | detach 전에 창 크기·아이콘 크기·좌표를 다시 읽어 검증했다 |

여기서 APFS는 점선으로 보인 Applications 아이콘의 원인이라는 결론이 아니다. Claude dmg에서도 같은 증상이 재현됐고, 그 문제는 Finder 렌더링 문제로 남겨 두었다. 발견한 파일시스템 차이와 보이는 증상을 하나의 인과로 묶지 않은 것이다.

> [!warn]
> 배경 폴더 이름을 바꿔도 배경 참조가 유지되는지 alias 해석으로 확인하려 했지만, 정상 동작하는 dmg 둘도 같은 방식으로 해석에 실패했다. 그 검증은 무효로 취소하고, 시험용 dmg를 만들어 직접 열어 보는 방식으로 확인했다.

## dmg를 덮어써도 업데이트가 되는 이유

같은 출시 회차에서 기존 앱 위에 새 dmg의 앱을 덮어써도 되는지도 확인했다. 결론은 일반적인 업데이트 경로로 충분하다는 것이었다.

- **앱과 데이터의 위치가 다르다**: 앱은 `/Applications/Stash.app`에 있고, 데이터는 `~/Library/Application Support/stash/`, 설정은 번들 ID 기준 `UserDefaults`에 남는다. 앱 번들을 교체해도 사용자 데이터는 건드리지 않는다.
- **마이그레이션은 누적 기록을 본다**: GRDB `DatabaseMigrator`는 이미 적용된 마이그레이션을 기록해 두고, 아직 적용되지 않은 것만 실행한다. 중간 버전을 순서대로 설치할 필요가 없다.
- **되돌리기는 별개다**: 한 번 올라간 DB를 옛 앱으로 열 수는 없다. 데이터를 함께 지우는 `uninstall.sh`를 업데이트에 쓰면 안 되는 이유다.

## 보이는 화면의 소유자를 먼저 찾는다

v1.2.1을 출시하면서 dmg 설치 창도 함께 정리했다. 이 작업에서 남은 결론은 파일 세 개보다 더 단순하다.

- **화면의 주체를 먼저 구분한다**: 눈앞의 창이 앱이 그린 것인지, 운영체제가 파일을 읽어 그린 것인지부터 확인해야 한다.
- **표준 관행은 실물로 검증한다**: “다른 앱은 다 그렇다”는 말은 막연한 취향이 아니라 대조군을 찾으라는 단서가 될 수 있다.
- **조용한 실패는 되읽는다**: 권한 없는 AppleScript와 잘린 Retina 배경은 모두 오류 대신 잘못된 결과만 남겼다.
- **재발 방지는 빌드 게이트에 남긴다**: 원인을 한 번 알아낸 것과 다음 배포에서 다시 막는 것은 다른 일이다.

즉, 내 dmg가 달랐던 이유는 앱의 설치 UI를 빼먹어서가 아니었다. Finder가 읽을 볼륨 메타데이터를 아직 만들지 않았기 때문이었다.
