---
title: Windows 디스크 파티셔닝과 Ubuntu 설치
description: Windows OS 디스크를 파티셔닝해 여유 공간을 확보하고, USB 부팅 순서를 변경해 그 공간에 Ubuntu Desktop OS를 설치하는 과정을 정리한다.
track: log
created: 2024-10-09T09:47
tags: [home-server, ubuntu, windows]
sources:
  - title: 윈도우 10 | 디스크 관리에서 볼륨 축소하기, 볼륨 확장하기
    url: https://www.soft2000.com/13111
  - title: Ubuntu(우분투) Desktop 22.04.2.LTS 설치 (VMware)
    url: https://200-rush.tistory.com/entry/UbuntuDesktop22042LTS
---

지난 문서에서 만든 USB 부팅 디스크를 이용해 Linux Ubuntu OS를 설치할 예정이다.

설치하기 전에, 노트북의 Windows OS를 포맷하여 불필요한 데이터와 설정을 모두 정리하고, 디스크 파티셔닝을 통해 일정 용량을 분리하여 새로운 운영체제에 할당해줄 준비를 해두어야 한다.

## Windows OS 디스크 파티셔닝

Windows OS의 디스크 파티셔닝은 `디스크 관리` 도구를 이용해 진행한다.

> [!note]
> Windows OS 포맷 과정은 참조 자료로 대체하여 생략한다.

Windows OS에서 `시작` 메뉴를 열고 **[디스크 관리]** 를 선택한다.

![Windows 디스크 관리 창에서 드라이브 목록을 확인하는 화면](/assets/images/blog/47/1.png)

디스크 축소를 진행할 `C:` 드라이브를 우클릭하여 메뉴를 확인한다.

![C 드라이브 우클릭 메뉴에서 볼륨 축소를 선택하는 화면](/assets/images/blog/47/2.png)

메뉴에서 [볼륨 축소]를 선택하면 축소 창이 열린다. 여기서 `축소할 공간 입력(MB)`란에 필요한 용량을 입력한다.

Ubuntu Desktop OS를 설치하는 데는 30GB 정도면 충분하지만, Windows OS에 큰 용량을 남길 필요가 없으므로, 100GB로 넉넉하게 할당했다.

![볼륨 축소가 완료되어 할당되지 않은 용량이 표시된 디스크 관리 화면](/assets/images/blog/47/3.png)

디스크 볼륨 축소를 완료하면, 아래 상태에 "할당되지 않음"이라는 안내와 용량이 표시된다.

이제 이 할당되지 않은 용량에 Ubuntu OS를 설치하면 된다.

## USB 부팅 순서 설정

새로운 OS를 설치하기 위해서는 **BIOS 설정**에 접근해야 한다.

PC를 재부팅하고 부팅 시점에 `F2` 버튼을 클릭하여 BIOS 설정에 들어간다.

![노트북 제조사의 BIOS 설정 초기 화면](/assets/images/blog/47/4.jpeg)

BIOS 설정에 진입한 후, [Boot] 메뉴에서 부팅 순서를 변경할 수 있는데, 현재 노트북에 설치된 운영체제가 첫번째 순서로 설정되어 있을 것이다.

![BIOS Boot 메뉴에서 부팅 순서 목록을 보여주는 화면](/assets/images/blog/47/5.jpeg)

우측 안내에 따라 Ubuntu OS 부팅 디스크가 담겨 있는 USB를 첫번째 순서로 변경한다.

변경이 완료 되었다면 `F10` 버튼을 클릭하여 설정을 저장하고 BIOS 설정을 빠져나온다.

## Ubuntu OS 설치

BIOS 설정을 빠져나오면 컴퓨터가 자동으로 재부팅되고, 이때, USB 부팅 디스크에 따라 Ubuntu Desktop OS 설치 화면으로 전환된다.

![Ubuntu Desktop OS 설치 시작 화면](/assets/images/blog/47/6.jpeg)

설치 화면에서는 사용 언어, 와이파이 설정, 계정 생성 등 다양한 OS 설정을 진행한다. 안내에 따라 설정한다.

![Ubuntu Desktop OS 설치를 진행하는 화면](/assets/images/blog/47/7.jpeg)

설정과 설치를 완료하고 컴퓨터를 재부팅하면 위와 같은 Ubuntu OS의 바탕화면을 화면을 볼 수 있다.

설치 완료 후, 시스템 언어 및 디스플레이 등 GUI를 사용 시 유용한 기본적인 사용자 설정을 해주었다.

이제 서버를 준비되었으니, 다음 문서부터는 본격적으로 활용 단계를 진행할 예정이다.
