---
title: MySQL 설치와 설정
description: 우분투 홈서버에 MySQL을 설치하고 자동 실행 설정, 계정 생성과 권한 부여, 데이터베이스 생성까지 초기 설정 과정을 정리한다.
track: log
created: 2024-10-30T09:53
tags: [home-server, mysql, database]
sources:
  - title: '[Ubuntu] 우분투에 MySQL 설치하기'
    url: https://velog.io/@seungsang00/Ubuntu-%EC%9A%B0%EB%B6%84%ED%88%AC%EC%97%90-MySQL-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0
---

지난 문서까지 서버 구축 및 연결 설정을 완료했고, 이제 백엔드 서버 애플리케이션 실행을 준비하면 된다.

백엔드 서버에서 사용하는 데이터베이스는 MySQL로, 클라우드 DB가 아닌 서버 내부에 설치하는 온프로미스 방식을 사용할 예정이다.

## 데이터베이스 설치 및 설정

MySQL 설치부터 계정 생성, 데이터베이스 생성까지 순서대로 진행한다.

> [!note]
> 해당 문서의 프로그래밍 작업은 Ubuntu 24.04.01 서버에서 진행한다.

### MySQL 설치 및 접속

- **패키지 설치**

  ```zsh
  sudo apt install mysql-server
  ```

- **자동 실행 설정**

  설치 직후엔 자동으로 실행되므로 따로 실행해줄 필요는 없다.

  ```zsh
  sudo systemctl enable mysql
  ```

- **데이터베이스 접속**

  ```zsh
  sudo mysql
  ```

### 계정 생성 및 권한 부여

- **계정 생성**

  ```zsh
  CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
  ```

- **권한 부여**

  ```zsh
  GRANT ALL PRIVILEGES ON mydatabase.* TO 'username'@'localhost';
  ```

### 데이터베이스 생성

- **데이터베이스 생성**

  ```zsh
  CREATE DATABASE mydatabase;
  ```

테이블은 백엔드 마이그레이션을 통해 생성하므로 추가적인 설정은 필요하지 않았다.
</content>
