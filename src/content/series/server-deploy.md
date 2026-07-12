---
title: 백엔드 서버 배포 환경 구성
description: 백엔드 서버를 실제로 배포하기 위한 환경 구성 정리. AWS EC2 인스턴스와 탄력적 IP, RDS 데이터베이스, Nginx 리버스 프록시와 SSL, 리눅스 디렉토리 권한까지 배포 과정을 순서대로 담았다.
posts:
  - aws-ec2-instance-setup
  - aws-ec2-elastic-ip
  - aws-rds-instance-setup
  - nginx-reverse-proxy
  - nginx-ssl-letsencrypt
  - linux-directory-permissions
---

백엔드 서버를 실제 운영 환경에 배포하기 위해 거친 환경 구성 과정을 순서대로 정리한 기록이다. AWS EC2 인스턴스를 띄우고 탄력적 IP로 고정 주소를 붙인 뒤 RDS 데이터베이스를 연결하고, Nginx 리버스 프록시와 Let's Encrypt SSL로 웹 서버를 세운 다음, 리눅스 디렉토리 권한까지 — 서버 한 대를 배포 가능한 상태로 만드는 데 필요한 설정을 하나씩 담았다.
