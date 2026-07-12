---
title: 방화벽 설정
description: Ubuntu 서버에 ufw를 이용해 방화벽을 설정하고, SSH와 HTTPS 등 필요한 포트만 허용하는 과정을 정리한다.
track: log
created: 2024-10-11T09:49
tags: [home-server, firewall, ubuntu]
---

홈서버의 경우 AWS 처럼 보안 그룹이나 보안 규칙을 설정하는 데 제한이 있다.

따라서 서버 내부에 방화벽을 반드시 설정해두어야 한다.

## 방화벽 설정

Ubuntu OS의 방화벽 관리 도구로는 기본 내장된 **`ufw(Uncomplicated Firewall)`** 를 사용해 기본 정책을 설정한 후, 특정 포트로의 접근만 허용한다.

> [!note]
> 해당 문서의 프로그래밍 작업은 Ubuntu 24.04.01 서버에서 진행한다.

방화벽 설정은 기본적인 설정을 한 후에, 특정 포트로의 접근만 허용할 것이다.

- **incoming과 outgoing 설정**

  ```zsh
  # 들어오는 트래픽을 기본적으로 차단
  sudo ufw default deny incoming

  # 나가는 트래픽은 기본적으로 허용
  sudo ufw default allow outgoing
  ```

- **전용 포트 허용**

  서버에 원격으로 접속할 수 있도록 SSH 전용 포트와 서버에 API 요청을 보낼 수 있도록 HTTPS 전용 포트를 허용한다.

  ```zsh
  # 22번 포트 허용 (SSH)
  sudo ufw allow 22/tcp

  # 443번 포트 허용 (HTTPS)
  sudo ufw allow 443/tcp
  ```

> [!note]
> **TCP 및 UDP**
> 트래픽 허용을 할 때는 해당 트래픽이 어떤 프로토콜을 사용하는지 파악하는 것이 중요하다.
> - TCP: 신뢰성이 필요한 연결 기반 통신을 지원하며, 데이터 손실 시 재전송 및 순서 보장. (HTTPS: 443/tcp)
> - UDP: 빠른 속도가 필요한 비연결 기반 통신을 지원하며, 일부 데이터 손실을 허용 및 재전송 없음. (DNS: 53/udp)

설정이 완료되면 방화벽을 실행해 적용한다.

```zsh
sudo ufw enable
```
