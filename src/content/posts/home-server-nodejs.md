---
title: Node.js 설치와 백엔드 애플리케이션 실행
description: NVM으로 Node.js를 설치하고 pm2를 이용해 Nest.js 백엔드 애플리케이션을 홈서버에서 실행하는 과정을 정리한다.
track: log
created: 2024-10-30T09:54
tags: [home-server, nodejs]
---

서버에서 실행하고자 하는 백엔드 애플리케이션는 이전에 개발한 **Nest.js** 웹프레임워크 기반의 백엔드 애플리케이션이므로 Node.js를 설치한 후 실행할 예정이다.

## 실행 환경 설치 및 애플리케이션 실행

Node.js 설치부터 pm2를 이용한 백엔드 애플리케이션 실행까지의 과정을 정리한다.

> [!note]
> 해당 문서의 프로그래밍 작업은 Ubuntu 24.04.01 서버에서 진행한다.

### Node.js 설치

NVM을 이용해 버전을 관리하며 Node.js를 설치한다.

- **버전 관리자 설치**

  Node.js 버전 관리자인 **NVM**를 이용해 설치한다. NVM의 버전은 설치 시점의 최신 버전에 맞춰 조정한다.

  ```zsh
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
  ```

- **Node.js 설치**

  Node.js 버전은 백엔드 개발 환경과 동일한 버전으로 설치했다.

  ```zsh
  nvm install 20.11.1
  ```

- **Node.js 버전 확인**

  NVM의 관리 목록 조회를 통해 현재 관리 중인 Node.js 버전 목록과 현재 사용 중인 버전을 확인할 수 있다.

  ```zsh
  nvm list
  ```

  ```
  ->     v20.11.1
  default -> 20.11.1 (-> v20.11.1)
  iojs -> N/A (default)
  unstable -> N/A (default)
  node -> stable (-> v20.11.1) (default)
  stable -> 20.11 (-> v20.11.1) (default)
  ```

### 백엔드 애플리케이션 실행

Node.js 설치를 마쳤다면 이전에 개발해둔 백엔드 애플리케이션을 실행한다.

> [!note]
> 애플리케이션 소스 코드는 Github를 이용했으며, Github 연결과 레포지토리 pull 과정은 생략한다.

- **애플리케이션 실행 준비**

  ```zsh
  # 패키지 의존성 설치
  npm i

  # DB 마이그레이션 적용
  npx prisma migrate deploy

  # 프로세스 관리자 설치
  npm install -g pm2
  ```

- **애플리케이션 실행**

  pm2를 이용해 백엔드 애플리케이션를 실행해두었다.

  ```zsh
  pm2 start npm -- run start --name back:prod
  ```

위 백엔드 애플리케이션은 3000번 포트로 실행되며, Nginx의 리버스 프록시를 통해 요청이 전달된다.
