---
title: 메뉴바 클립보드 앱 stash 만들기
description: macOS 메뉴바 클립보드 매니저 stash를 만들어 세상에 내보내기까지의 기록. AI 디자인 핸드오프로 네이티브 UI를 세우고, 메모리를 99.4% 줄이는 성능 개선을 거쳐, dmg 빌드와 GitHub Release로 출시하기까지 build→ship 아크를 담았다.
posts:
  - ai-design-handoff-to-swiftui
  - nsimage-thumbnail-cache
  - shipping-a-macos-menubar-app
---

macOS 메뉴바 클립보드 매니저 stash를 처음 짓고 실제로 출시하기까지의 과정을 순서대로 정리한 기록이다. AI 디자인 툴이 뽑은 프로토타입을 코딩 에이전트가 SwiftUI 네이티브 앱으로 옮기는 핸드오프에서 시작해, 썸네일이 매번 풀해상도로 로드되던 문제를 실측으로 잡아 메모리를 99.4% 줄인 성능 개선을 거쳐, xcodebuild archive부터 dmg 빌드와 GitHub Release까지 배포 산출물로 만드는 마지막 관문에 이른다 — 만드는 일과 내보내는 일 사이의 거리를 한 편씩 좁혀간 기록이다.
