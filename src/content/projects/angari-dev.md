---
title: angari.dev
tagline: 하나부터 열까지 직접 만드는 개발 블로그
stacks:
  - TypeScript
  - Next.js
  - Vercel
  - TailwindCSS
links:
  github: https://github.com/angar2/blog
cover: ./angari-dev-cover.png
created: 2024-01-01T09:00
---

## 프로젝트 소개

**angari.dev**는,
하나부터 열까지 직접 만드는 개발 블로그입니다.

![angari.dev 로고](/assets/images/project/angari-dev/logo.png)

### 메인 페이지

![메인 화면](/assets/images/project/angari-dev/1.png)

- 블로그의 메인 화면입니다.
- 상단 Header에는 Blog와 Projects 메뉴 버튼이 나열되어 있습니다.
- 하단 Footer에는 Resume와 Github 링크가 표시되어 있습니다.

### 개발 기록 페이지

![개발 기록 목록 화면](/assets/images/project/angari-dev/2.png)

- **Blog 메뉴**로 이동하면 개발 기록 목록이 나타납니다.
- 카테고리 / 글제목 / 내용요약 / 작성일자가 표시됩니다.
- **태그(#) 검색**을 이용하면 해당 태그를 가지고 있는 개발 기록만 보여집니다.

### 개발 기록 상세 페이지

![개발 기록 상세 화면](/assets/images/project/angari-dev/3.png)

- 개발 기록를 확인할 수 있습니다.
- 내용은 **Markdown** 형식의 `.md` 파일로 작성합니다.

### 개인 프로젝트 페이지

![개인 프로젝트 목록 화면](/assets/images/project/angari-dev/4.png)

- **Projects 메뉴**로 이동하면 개인 프로젝트 목록이 나타납니다.
- 예시 이미지 / 프로젝트명 / 설명 / 개발 기술이 표시됩니다.

### 개인 프로젝트 상세 페이지

![개인 프로젝트 상세 화면](/assets/images/project/angari-dev/5.png)

- 프로젝트의 설명과 개발 정보를 확인할 수 있습니다.
- 내용은 **Markdown** 형식의 `.md` 파일로 작성합니다.

### 포트폴리오 페이지

![포트폴리오 화면](/assets/images/project/angari-dev/6.png)

- 하단 Footer의 **Resume 버튼**으로 진입할 수 있는 포트폴리오 화면입니다.
- 개발 경력과 개인 프로젝트 등 이력서 형식으로 작성되어 있습니다.

## 개발 정보

블로그를 직접 개발하고 배포하기로 한 이유는 다음과 같습니다.

1. 맞춤형 디자인: UX/UI를 자유롭게 설정하고 원하는 기능을 추가할 수 있다.
2. 무제한 확장성: 플랫폼의 제약 없이 기능을 자유롭게 추가할 수 있다.
3. 정밀한 SEO 최적화: SEO 설정을 직접 조정하여 세밀하게 최적화할 수 있다.
4. 개발 실력 향상: 필요한 기능을 구현하거나 블로그를 관리하는 과정에서 개발 실력을 향상시킬 수 있다.
5. 개발 영역 확장: 백엔드 개발자로서 프론트엔드 영역까지 학습할 수 있다.
6. 무조건 특별함: 어디에도 존재하지 않는 나만의 블로그를 가질 수 있다.

### 개발 기간

2024.01 ~ 현재.

### 개발 특징

나만의 스타일을 살려 직접 디자인하고 구현한 특징은 다음과 같습니다.

- 나만의 스타일을 살릴 수 있도록 디자인하고 **반응형 웹페이지**로 제작
- SEO 최적화와 프로젝트 경량화를 위해 **Static Site Generation**을 활용한 **Next.js** 웹사이트로 구현
- Vercel과 GitHub를 연동한 **CI/CD**과 **BaaS**를 활용하여 웹사이트를 자동으로 배포
- 관리의 효율성을 위해 **Markdown** 방식의 스크립트로 블로그 포스트 작성

### 배포 과정

Vercel과 GitHub를 연동해 아래 순서로 자동 배포되도록 구성했습니다.

1. Next.js 정적 웹사이트 개발
2. 소스 코드를 Github 리포지토리 커밋/푸시
3. Vercel과 Github 연동 설정(자동 빌드 및 실행)
4. Vercel의 호스팅 서버에 소스 코드를 배포

![Vercel 배포 상태](/assets/images/project/angari-dev/7.png)
