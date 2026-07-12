---
title: AWS RDS 인스턴스 생성과 파라미터 그룹 설정
description: AWS RDS에서 MySQL 파라미터 그룹을 생성·설정하고 이를 적용해 RDS 인스턴스를 생성하는 과정을 정리한다.
track: notes
created: 2024-01-10T09:13
tags: [aws, rds, database]
---

클라우드 서버에서 사용하기 위한 데이터베이스로 AWS RDS를 이용할 예정이다.

현재 백엔드에서 MySQL을 데이터베이스로 이용하고 있으므로 MySQL 엔진으로 설정할 것이다.

## 파라미터 그룹 설정

> [!note]
> **파라미터 그룹**이란, 데이터베이스 엔진의 다양한 설정과 기능을 제어하는 데 사용되는 매개변수(파라미터)의 모음이다. 데이터베이스 엔진의 옵션을 미리 설정해두고 인스턴스 생성 시 적용할 수 있다.

데이터베이스 인스턴스를 생성하기 전, 파라미터 그룹을 생성하고 설정해두는 게 좋다.

### 파라미터 그룹 생성

먼저 파라미터 그룹을 생성한다.

DB 패밀리는 RDS 인스턴스 시 생성할 **mysql 8.0**으로 지정해두었다.

![파라미터 그룹](/assets/images/blog/13/1.png)

### 파라미터 그룹 편집

생성한 파라미터 그룹은 현재 디폴트로 구성되어 있으므로 [편집] 버튼을 클릭해 설정을 변경해야 한다.

다양한 설정을 변경할 수 있지만 기본적인 언어셋만 설정했다. 특별히 설정해두어야 하는 언어셋은 아래와 같다.

```
- 데이터베이스 시스템의 시간대
    - time_zone ⇒ Asia/Seoul

- 문자 인코딩
    - character_set_client ⇒ utf8mb4
    - character_set_connection ⇒ utf8mb4
    - character_set_database ⇒ utf8mb4
    - character_set_results ⇒ utf8mb4
    - character_set_server ⇒ utf8mb4

- 문자열 정렬 방식
    - collation_connection ⇒ utf8mb4_unicode_ci
    - collation_server ⇒ utf8mb4_unicode_ci

- 이진로그(binlog)에 함수 생성 문을 적용할 때 함수 작성자를 신뢰할지 여부를 지정
    - log_bin_trust_function_creators ⇒ 1
```

> [!warn]
> **character_set_filesystem**은 수정하지 않도록 주의해야 한다.

> [!note]
> **UTF-8과 UTF8MB4**
>
> **UTF-8**(Universal Coded Character Set Transformation Format - 8-bit)은 유니코드 문자를 인코딩하는 데 사용되는 가변 길이(글자마다 byte 길이가 다른) 문자 인코딩 방식 중 하나이다. 유니코드 문자를 나타내기 위해 1바이트부터 4바이트까지 가변 길이로 사용한다.
>
> **UTF8MB4**(UTF-8 + Maximum Byte Length of 4)는 UTF-8에서 최대 4바이트의 문자를 지원하는 UTF-8의 한 변형으로서 보통 데이터베이스에서 유니코드 문자를 저장하고 처리하는 데 사용된다. 초기 일부 데이터베이스 시스템에서 UTF-8이 3바이트까지만 지원했던 것과 구분하기 위해 UTF8MB4라는 용어로 확장된 UTF-8을 사용한다. UTF8MB4에서는 UTF-8에서 지원하지 않는 이모지 저장/처리를 할 수 있다.
>
> **Unicode(유니코드)**: 국제적으로 전 세계 언어를 모두 표시할 수 있는 표준 코드로서 특정 글자와 코드가 1:1 매핑되어 있는 '코드표'라고 할 수 있다. ex) '가' → `U+AC00`

## RDS 인스턴스 생성

파라미터 그룹을 마친 후, 데이터베이스 인스턴스를 생성한다.

### 인스턴스 생성

인스턴스 생성 시 직접 선택 혹은 추가한 사항은 아래와 같고 그 이외의 사항은 디폴트로 진행했다.

```
- 리전: 아시아/서울
- 엔진 옵션: MySQL
- 엔진 버전: MySQL 8.0.32
- 템플릿: 프리 티어
- 인스턴스 클래스: db.t3.micro
- 스토리지 유형: 범용 SSD(gp2)
- 할당 스토리지: 20GiB
- 퍼블릭 액세스: 액세스 허용
- DB 파라미터 그룹: 생성한 파라미터 그룹
```

![RDS 인스턴스](/assets/images/blog/13/2.png)

위와 같이 RDS 인스턴스가 생성되었다.

> [!note]
> **RDS 인스턴스 프리티어**
>
> ![RDS 인스턴스 프리티어](/assets/images/blog/13/3.png)
