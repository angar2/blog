---
title: DHCP Reservation으로 내부 IP 고정
description: DHCP의 개념과 DHCP Reservation(예약)을 이용해 홈서버의 내부 IP 주소를 고정해야 하는 이유를 정리한다.
track: log
created: 2024-10-30T09:55
tags: [home-server, dhcp, network]
sources:
  - title: DHCP Reservation 설정 참고 자료
    url: https://jjeongil.tistory.com/2050
---

이번 문서부터는 홈서버의 네트워크와 관련한 설정 과정을 다룰 예정이다. 첫번째 과정으로 **DHCP Reservation(예약)** 을 이용해 내부 IP 주소를 고정하는 작업을 진행한다.

## DHCP와 Reservation(예약)

DHCP의 개념과 Reservation을 사용하는 이유를 먼저 정리한다.

### DHCP

**DHCP(Dynamic Host Configuration Protocol)** 은 네트워크 상에서 네트워크에 연결하는 장치(클라이언트)에게 IP 주소를 자동으로 할당하는 <u>프로토콜</u>이다.

라우터를 통해 들어온 네트워크를 기기와 연결할 때 내부 IP 주소를 할당하여 연결해야 하는데, 이때 DHCP 서버는 연결할 기기에 내부 IP 주소를 자동으로 할당하고, 할당된 IP 주소를 관리하는 역할을 한다.

### DHCP Reservation을 하는 이유

DHCP 서버는 내부 IP 주소를 자동으로 할당하므로, 홈서버가 구동되는 노트북의 내부 IP 주소가 변경될 가능성이 있다.

내부 IP 주소가 변경될 경우, 변경 전의 내부 IP 주소로 설정된 **포트 포워딩 정보와 변경 후의 내부 IP 주소가 일치하지 않게 되어** 의도한대로 외부에서 홈서버로 요청을 보낼 수 없다.

따라서 DHCP 서버가 홈서버가 구동되고 있는 노트북에 특정 IP 주소를 고정해 할당하도록 미리 설정하는 과정이 필요하다. 이 과정을 **DHCP Reservation(예약)** 이라고 부른다.

## DHCP Reservation(예약) 설정

실제 설정 방법은 공유기 제조사마다 UI가 달라 아래 참고 자료를 통해 확인한다.
