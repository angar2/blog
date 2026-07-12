---
title: Cola Chat — 익명 채팅 프로젝트 소개
description: 익명 채팅 서비스 'Cola Chat'의 기획 배경, 핵심 기능, 개발 스택을 정리한 프로젝트 소개 글.
track: log
created: 2024-09-24T09:37
tags: [websocket, socketio, nestjs, nextjs, chat]
sources:
  - title: Figma | Cola Chat
    url: https://www.figma.com/design/WL5rei8ERwFEWU7hidx1y3/Cola-Chat?node-id=0-1&m=dev&t=fzyXMEM3gmi5ybZA-1
---

웹서핑을 하다보면 간단한 CRUD 기능 외에도 다양한 사용자 기능들이 웹서비스에 탑재되어 있다. 이전부터 이런 기능들을 집중적으로 개발하는 **기능 단위 개발**을 통해 웹개발 역량을 확장하고 싶었다.

그중 가장 구현해보고 싶었던 단위 기능은 **채팅 기능**이다. 물론 목적은 '기능'을 중점으로 둔 개발이지만, 컨셉을 입혀 하나의 독립적인 서비스로 배포까지 진행할 예정이다.

이 프로젝트를 진행하는 주된 **<동기>** 를 나열해보면 다음과 같다.

- 웹개발 주요 기능 중 하나인 **채팅 기능을 직접 구현**해보고 싶었다.
- **WebSocket**의 통신 구조와 활용법을 익혀, **통신 프로토콜에 대한 이해를 확장**하고자 한다.
- 서버/클라이언트 기능 개발부터 배포 및 유지 관리까지 전 과정을 진행함으로써, **웹 서비스 개발 프로세스에 대한 이해의 깊이를 더**하고 싶다.

## 프로젝트 소개

"**Cola Chat**" 은 회원가입 없이 익명으로 이용할 수 있는 웹서비스로, 심플한 UI/UX를 통해 채팅 기능에만 집중한 일회성 채팅 서비스이다.

### 주요 기능

익명 채팅 서비스로서 아래와 같이 최소한의 기능을 기획했다. 이 시리즈는 WebSocket에 중점을 두고 있으므로, HTTP API로 구현된 기능에 대한 구체적인 개발 기록은 다루지 않는다.

- **필수 기능**
  - 채팅방 생성 및 조회 ⇒ HTTP API
  - **채팅방 입장 및 퇴장 ⇒ WebSocket**
  - **실시간 메세지 전송 ⇒ WebSocket**
- **부가 기능**
  - 채팅방 입장 검증 ⇒ HTTP API
  - 채팅방 재입장 확인 ⇒ HTTP API
  - 이전 메세지 조회 ⇒ HTTP API
  - **온라인 상태 조회 ⇒ WebSocket**
  - 닉네임 변경 ⇒ HTTP API

### 디자인

프로젝트의 UI/UX는 Figma로 디자인했다.

- [Figma | Cola Chat](https://www.figma.com/design/WL5rei8ERwFEWU7hidx1y3/Cola-Chat?node-id=0-1&m=dev&t=fzyXMEM3gmi5ybZA-1)

### 개발 스택

서버와 클라이언트에 사용한 프레임워크와 배포 플랫폼은 다음과 같다.

- 웹 프레임워크: `Nest.js(서버)` / `Next.js(클라이언트)`
- 배포 플랫폼: `Home Server(서버)` / `Vercel(클라이언트)`
