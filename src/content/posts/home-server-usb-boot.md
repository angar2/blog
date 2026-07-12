---
title: Rufus로 Ubuntu USB 부팅 디스크 만들기
description: Ubuntu Desktop 설치용 부팅 USB를 Rufus로 만드는 과정을 정리한다.
track: log
created: 2024-10-09T09:46
tags: [home-server, ubuntu, rufus]
sources:
  - title: Ubuntu 다운로드
    url: https://ubuntu.com/download/desktop
  - title: Rufus 다운로드
    url: https://rufus.ie/downloads
  - title: 윈도우에서 부팅 USB 만들기 (rufus 사용)
    url: https://blog.naver.com/dt3141592/222565348163
---

다른 운영체제들과 마찬가지로 Ubuntu OS를 설치하기 위해 설치 전용 USB를 만들어야 한다.

설치하고자 하는 `Ubuntu Desktop 24.04.01 LTS` 버전의 용량은 공식 홈페이지 기준 5.8GB이다. 현재 가지고 있는 USB 중에서 가능한 것은 16GB 용량의 USB로, 이를 부팅 디스크로 사용했다.

## Ubuntu OS 설치

아래 링크를 통해 USB에 담을 디스크 이미지 파일(`.iso`)을 다운로드 한다.

[Ubuntu 다운로드 하기](https://ubuntu.com/download/desktop)

![Ubuntu 공식 다운로드 페이지](/assets/images/blog/46/1.png)

## Rufus 소프트웨어 설치 및 실행

**Rufus**는 USB 플래시 드라이브를 사용하여 부팅 가능한 설치 디스크를 만드는 데 사용되는 무료 소프트웨어이다.

[Rufus 다운로드 하기](https://rufus.ie/downloads)

![Rufus 다운로드 페이지](/assets/images/blog/46/2.png)

Windows OS의 경우, 목록의 두 버전 중 하나를 다운로드하면 된다. `Portale` 버전은 소프트웨어를 설치하지 않고 바로 실행 가능한 버전이다.

## USB 부팅 디스크 제작

USB를 부팅 디스크로 만들기 전에 아래 사항을 먼저 확인해야 한다.

> [!warn]
> 부팅 디스크 제작 과정에서 USB의 데이터가 소실되므로, 사전에 백업하고 포맷해야 한다.

준비가 완료되었다면, USB를 기기에 삽입하고 Rufus를 실행한다.

![Rufus 부팅 디스크 제작 설정 화면](/assets/images/blog/46/3.png)

![Rufus 부팅 디스크 제작 완료 화면](/assets/images/blog/46/4.png)

`[장치]`에서 사용하고자 하는 USB를 선택한 후, `[부팅 선택]`에서 Ubuntu OS의 `.iso` 파일을 지정한다.

설정 후, `[시작]`을 눌러주면 일정 시간이 지나고 디스크 제작이 완료된다.
