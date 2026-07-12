---
title: Daily Record
tagline: 목표 설정과 성취를 위한 프로젝트 플랫폼
stacks:
  - TypeScript
  - Nest.js
  - MySQL
  - AWS
  - Linux Ubuntu
  - Nginx
links:
  github: https://github.com/Yong-Taek-United/daily-record-back
cover: ./daily-record-cover.png
created: 2024-04-01T09:01
---

## 프로젝트 소개

**Daily Record**는,
목표를 설정하고 주기적으로 진행 상황을 체크하며 성취를 이뤄나가는 프로젝트 플랫폼입니다.

![Daily Record 로고](/assets/images/project/daily-record/logo.png)

### 메인 프로세스

1. Project: 프로젝트를 생성한다.
2. Task: 상세한 조건을 설정해 프로젝트 내에 과제를 생성한다.
3. Activity: 일상 활동을 기록하며 기록 시 관련된 프로젝트(과제)와 연동하여 프로젝트를 수행해 나간다.

### 활동 기록 캘린더

![메인 화면](/assets/images/project/daily-record/1.png)

- 일자별 및 시간별로 활동을 기록하여 **캘린더**에서 한눈에 확인할 수 있습니다.
- 활동 기록 시 프로젝트와 연동하면 해당 과제가 기록에 표시되며, **진행도가 자동으로 누적**됩니다.
- 과제에서 설정한 색상에 따라 기록의 색상이 표시됩니다.

### 프로젝트 관리

![프로젝트 관리 화면](/assets/images/project/daily-record/2.png)

- 진행 중인 프로젝트의 과제 설정 내용을 확인할 수 있습니다.
- 과제가 연동된 활동 기록만큼 과제의 진행도에 적용됩니다.
- 현재 과제별 **달성률**과 **추정 졸업률**을 수치로 확인할 수 있으며, **Progress Bar**를 통해 전체 진행 상황을 한눈에 확인할 수 있습니다.

### 프로젝트 생성

![프로젝트 생성 화면](/assets/images/project/daily-record/3.png)

- 과제를 등록하려면 먼저 과제들을 그룹화할 **프로젝트**를 생성해야 합니다.
- 프로젝트는 설정한 기간이 지나면 자동으로 종료됩니다.

### 과제 생성

![과제 생성 화면](/assets/images/project/daily-record/4.png)

- **과제**는 프로젝트 내에서 생성할 수 있으며 프로젝트 기간 범위를 벗어날 수 없습니다.
- 과제 기간과 체크 방식을 조합하여 과제의 **목표량을 산출**하고 저장합니다.
- 진행도 누적 방식에 따라 **횟수와 시간**으로 구분하여 지정할 수 있습니다.
- **주말 제외**를 선택하면 주말을 제외한 일자만을 목표량 산출에 적용합니다.

### 계정 관리

![계정 관리 화면](/assets/images/project/daily-record/5.png)

- 상단 우측의 프로필 버튼을 통해 계정 관리 화면에 접근할 수 있습니다.
- 이름, 계정, 비밀번호 등 계정 정보를 변경할 수 있습니다.
- 이메일 인증은 회원가입 시 진행한 이메일 인증을 통해 완료됩니다.

## 개발 정보

프로젝트를 시작하게 된 배경과 개발 과정에서의 역할·집중 영역을 정리한다.

### 개발 동기

1. 일상 챌린지처럼 하고자 하는 일들을 계획하고, 그 과정과 진행 상황을 기록하고 점검하는 플랫폼을 필요로 함.
2. 학습한 개발 기술을 적용하고, 프로젝트 기획부터 프론트엔드와의 협업까지 개발 활동 전반의 경험을 쌓기 위해.

### 개발 기간

1차 개발: 2023.12 ~ 2024.04

### 소스 코드

백엔드 리포지토리는 프로젝트 상단 정보에서 확인할 수 있으며, 프론트엔드 리포지토리는 아래와 같습니다.

- [daily-record-front](https://github.com/Yong-Taek-United/daily-record-front)

### 팀 구성 및 기술 스택

백엔드 1명, 프론트엔드 1명으로 구성된 2인 팀 프로젝트입니다.

- 프론트엔드 기술 스택: TypeScript, Next.js, React, TailwindCSS

### 기획 및 디자인

기능의 특성을 살릴 수 있는 심플한 UI/UX 디자인을 목표로 했습니다.

![Daily Record 와이어프레임](/assets/images/project/daily-record/6.png)

와이어프레임: [Figma | Daily Record](https://www.figma.com/file/h99IPKLTXuBsx9zkXLA8pX/Daily-Record?type=design&node-id=0-1&mode=design)

### 담당 역할

- 서버 애플리케이션 백엔드 개발
- 서버 호스팅 및 배포
- 메인/서브 콘텐츠의 기능 및 아키텍처 설계

### 핵심 집중 영역

- 최대한 Nest.js(TypeORM)의 기본 기능과 Restful API를 활용하여 **서버의 안정성을 최대화**하기 위해 노력
- 메인 콘텐츠 구조(Project-Task-Activity)의 주요 기능 간 관계를 세밀하게 연결하여 **버그 최소화**
- OAuth, 이메일 등 외부 라이브러리 및 API를 활용해 **시스템의 유연·확장성 강화**
- DB 테이블 관계를 철저하게 설계하여 **데이터 무결성 강화**

### 개발 및 협업 관리

개발 과정과 협업 내용을 다음과 같이 기록·관리했습니다.

- 개발 과정에서 학습한 지식과 기능에 적용된 논리 로직 기록: [Blog](/blog?tag=Nest.js)
- 데이터베이스 및 API 명세서 작성: [Notion](https://angari.notion.site/0a8c29d0e9694b388864ea5919ed4bac?v=ac5a00d3337e4028a974eff32022a1c1)
- 프로젝트 일정, 진행 상황, 팀 회의 및 기능 요청과 같은 협업 내용 기록
