---
title: Cola Chat
tagline: 가볍게 대화하는 익명 웹 채팅 서비스
stacks:
  - Socket.IO
  - TypeScript
  - Nest.js
  - Next.js
  - MySQL
  - Prisma
  - Home Server
  - Linux Ubuntu
  - Nginx
  - Vercel
links:
  demo: https://cola-chat.vercel.app
  github: https://github.com/angar2/cola-chat-back
series: cola-chat
cover: ./cola-chat-cover.png
created: 2024-04-01T09:00
---

## 프로젝트 소개

**Cola Chat**은,  
심플하고 간편한 UI/UX와 익명성으로 쉽고 가볍게 접근할 수 있는 웹 채팅 서비스입니다.

![Cola Chat 로고](/assets/images/project/cola-chat/logo.png)

### 간편한 채팅방 생성

![메인 화면](/assets/images/project/cola-chat/1.png)

- 회원가입 없이 간편하게 채팅방을 생성할 수 있습니다.
- 채팅방 이름과 최대 정원은 필수로 입력해야 합니다.
- 비밀번호는 선택 사항이며, 생성 이후엔 변경할 수 없습니다.
- 채팅방이 생성되면 고유의 URL이 할당됩니다.

### 실시간 채팅

![채팅 화면](/assets/images/project/cola-chat/2.png)

- 채팅방 URL로 접속하면 임시 사용자 계정이 자동 생성되어 채팅에 입장합니다.
- 채팅방의 최대 정원에 따라 사용자 입장이 제한됩니다.
- 채팅방에 입장한 사용자들과 실시간으로 채팅할 수 있습니다.

### 사이드 기능

![채팅 사이드 기능](/assets/images/project/cola-chat/3.png)

- 채팅방 인원수를 클릭하면, 현재 온라인된 사용자를 확인할 수 있습니다.
- **사이드 메뉴**를 이용해 작업을 할 수 있습니다.
  - 채팅방 URL 복사
  - 닉네임 변경
  - 채팅방 나가기
  - 채팅방 만료기한 확인

### 모바일 사이즈 최적화

![모바일 화면](/assets/images/project/cola-chat/4.png)

- 모바일 사이즈에도 최적화된 반응형 디자인을 적용했습니다.
- 웹 페이지로서 데스크톱 버전과 동일한 기능을 제공합니다.
- 사이드 메뉴는 **햄버거 메뉴 아이콘**을 통해 확인할 수 있습니다.

## 개발 정보

프로젝트의 개발 기간, 소스 코드, 기획 자료를 정리한다.

### 개발 기간

- 1차 개발: 2024.09

### 소스 코드

프론트엔드는 별도 저장소에서 관리한다.

- [cola-chat-front](https://github.com/angar2/cola-chat-front)

### 기획 및 디자인

- 심플하고 직관적인 UI/UX 디자인
- 와이어프레임 → [Figma | Cola Chat](https://www.figma.com/file/h99IPKLTXuBsx9zkXLA8pX/Daily-Record?type=design&node-id=0-1&mode=design)
