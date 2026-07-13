---
title: Nginx 웹서버 설치와 리버스 프록시
description: Ubuntu 서버에 Nginx를 설치하고, 리버스 프록시로 백엔드와 프론트엔드의 CORS 이슈를 완화하는 서버 블록 설정 과정을 정리한다.
track: notes
created: 2024-01-11T09:14
tags: [nginx, reverse-proxy]
sources:
  - title: ufw enable 후 ssh 접속 불가 문제
    url: https://yvvyoon.github.io/ubuntu/ufw-enable-ssh-timeout
---

서버에서 프로젝트를 가동하는데에는 Node.js 프로젝트만으로도 가능하지만, <u>리버스 프록시, SSL/TLS 설정, 캐싱</u> 등 서버 운용에 도움이 되는 웹서버 **Nginx**를 이용하기로 했다. 그 중 **리버스 프록시**를 이용해 백엔드와 프론트엔드 간 CORS 이슈를 완화하는 것이 현 개발 단계에서는 주된 목적이다.

## Nginx 설정

Ubuntu 22.04 원격 서버 환경에서 Nginx를 설치하고 정상 동작 여부를 확인한다.

- **Nginx 설치**

  ```zsh
  sudo apt install nginx
  ```

- **Nginx 실행 체크**

  ```zsh
  systemctl status nginx
  ```

  ```
  ● nginx.service - A high performance web server and a reverse proxy server
      Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
      Active: active (running) since Wed 2022-04-20 09:03:47 UTC; 24h ago
        Docs: man:nginx(8)
    Main PID: 20596 (nginx)
        Tasks: 2 (limit: 1147)
      Memory: 5.4M
      CGroup: /system.slice/nginx.service
              ├─20596 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
              └─20597 nginx: worker process
  ```

  명령어를 입력하면 Nginx의 상태를 확인할 수 있고 → `active`

  도메인이나 IP를 브라우저 주소창에 입력했을 때, Nginx 랜딩 페이지가 표시되면 Nginx가 정상적으로 동작하고 있음을 확인할 수 있다.

  ![Nginx 설치 확인용 기본 랜딩 페이지](/assets/images/blog/14/1.png)

> [!warn]
> Nginx 설치 이후 서버 방화벽을 활성화(`ufw enable`)할 때 Nginx HTTP 접근 허용만 추가하라는 글을 많이 찾아볼 수 있는데, Nginx HTTP만 추가한 상태로 서버 터미널을 닫으면 ssh로 리눅스 서버 내부에 접속할 수 없으니 주의해야 한다.

## 서버 블록 설정: Reverse Proxy

리버스 프록시 동작을 위해 Nginx 서버 블록을 생성하고 활성화한다.

- **관리자 권한 전환**

  서버 블록을 생성하기 전, 관리자 권한(root)로 전환한다.

  ```zsh
  sudo su
  ```

  관리자 권한으로 전환하면 명령어 입력 라인 프롬프트의 모양이 달라지고, 서버의 최상위인 root에 위치하게 된다. (빠져나오기 ⇒ `^` + `D`)

- **서버 블록 생성**

  `/etc/nginx/sites-available` 위치에 서버 블록 설정 파일을 생성한다.

  ```zsh
  sudo vim /etc/nginx/sites-available/domain.com
  ```

  ```zsh
  server {
      listen 80;
      server_name domain.com www.domain.com;

      location / {
          proxy_pass http://127.0.0.1:3000;
      }
  }

  server {
      listen 80;
      server_name api.domain.com;

      location / {
          proxy_pass http://127.0.0.1:5000;
      }
  }
  ```

  미리 설정한 도메인을 `server_name`으로 추가해 프로젝트를 연결해준다.

  백엔드(`api.`)와 프론트엔드(`www.`)를 서브 도메인으로 구분해주었다.

- **서버 블록 활성화**

  생성한 서버 블록 설정 파일을 `/etc/nginx/sites-enabled` 위치에 심볼릭 링크로 추가해 서버 블록을 활성화한다.

  ```zsh
  sudo ln -s /etc/nginx/sites-available/domain.com /etc/nginx/sites-enabled
  ```

- **Nginx 재시작**

  마지막으로 Nginx를 재시작해 설정을 적용하면 마무리된다.

  ```zsh
  sudo systemctl restart nginx
  ```
