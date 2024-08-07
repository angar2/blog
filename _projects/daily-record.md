---
title: 'Daily Record'
excerpt: '" 목표 설정과 성취를 위한 프로젝트 플랫폼 "
일상의 작은 행동부터 인생의 큰 목표까지, 꾸준히 기록하고 관리합니다.
달성률을 통해 현재 상태를 되돌아보며 성취를 체감할 수 있습니다.'
date: '2024-04-01T00:00:00.0000Z'
coverImage: '/assets/images/project/daily-record/1.png'
author:
  name: Angari
  picture: '/assets/images/authors/angari.png'
ogImage:
  url: '/assets/images/og-image.png'
stacks: ['TypeScript', 'Nest.js', 'MySQL', 'AWS', 'Linux Ubuntu', 'Nginx']
---

---

<br/>

## **프로젝트 소개**
---

**Daily Record**는,  
목표를 설정하고 주기적으로 진행 상황을 체크하며 성취를 이뤄나가는 프로젝트 플랫폼입니다.

<br/>

- ##### **로고**
  <figure style="width: 20%;">
    <img src="/assets/images/project/daily-record/logo.png" alt="angari.dev logo" style="width: 100%; height: auto;">
    <figcaption style="font-size: 12px; text-align: center;">Daily Record</figcaption>
  </figure>

<br/>

- ##### **메인 프로세스**

```
1. Project: 프로젝트를 생성한다.

2. Task: 상세한 조건을 설정해 프로젝트 내에 과제를 생성한다.

3. Activity: 일상 활동을 기록하며 기록 시 관련된 프로젝트(과제)와 연동하여 프로젝트를 수행해 나간다.
```

<br/>
<br/>

- ##### **주요 기능**

<div style="position: relative; width: 100%; margin: auto; overflow: hidden; border-radius: 6px; box-shadow: 1px 1px 6px lightgray;">
  <div class="slides" style="display: flex; transition: transform 0.5s ease-in-out; width: 500%;">
    <div style="display: flex; flex-direction: column; padding: 10px 28px;">
      <h5><strong>1. 활동 기록 캘린더</strong></h5><br/>
      <figure style="width: 100%;">
        <img src="/assets/images/project/daily-record/1.png" alt="Daily Record" style="width: 100%; height: auto; border: 0.1px solid lightgray; border-radius: 6px;">
        <figcaption style="font-size: 12px; text-align: center;">메인 화면</figcaption>
      </figure>
      <ul>
        <li>일자별 및 시간별로 활동을 기록하여 <strong>캘린더</strong>에서 한눈에 확인할 수 있습니다.</li>
        <li>활동 기록 시 프로젝트와 연동하면 해당 과제가 기록에 표시되며, <strong>진행도가 자동으로 누적</strong>됩니다.</li>
        <li>과제에서 설정한 색상에 따라 기록의 색상이 표시됩니다.</li>
      </ul>
    </div>
    <div style="display: flex; flex-direction: column; padding: 10px 28px;">
      <h5><strong>2. 프로젝트 관리</strong></h5><br/>
      <figure style="width: 100%;">
        <img src="/assets/images/project/daily-record/2.png" alt="Daily Record" style="width: 100%; height: auto; border: 0.1px solid lightgray; border-radius: 6px;">
        <figcaption style="font-size: 12px; text-align: center;">프로젝트 관리 화면</figcaption>
      </figure>
      <ul>
        <li>진행 중인 프로젝트의 과제 설정 내용을 확인할 수 있습니다.</li>
        <li>과제가 연동된 활동 기록만큼 과제의 진행도에 적용됩니다.</li>
        <li>현재 과제별 <strong>달성률</strong>과 <strong>추정 졸업률</strong>을 수치로 확인할 수 있으며, <strong>Progress Bar</strong>를 통해 전체 진행 상황을 한눈에 확인할 수 있습니다.</li>
      </ul>
    </div>
    <div style="display: flex; flex-direction: column; padding: 10px 28px;">
      <h5><strong>3. 프로젝트 생성</strong></h5><br/>
      <figure style="width: 100%;">
        <img src="/assets/images/project/daily-record/3.png" alt="Daily Record" style="width: 100%; height: auto; border: 0.1px solid lightgray; border-radius: 6px;">
        <figcaption style="font-size: 12px; text-align: center;">프로젝트 생성 화면</figcaption>
      </figure>
      <ul>
        <li>과제를 등록하려면 먼저 과제들을 그룹화할 <strong>프로젝트</strong>를 생성해야 합니다.</li>
        <li>프로젝트는 설정한 기간이 지나면 자동으로 종료됩니다.</li>
      </ul>
    </div>
    <div style="display: flex; flex-direction: column; padding: 10px 28px;">
      <h5><strong>4. 과제 생성</strong></h5><br/>
      <figure style="width: 100%;">
        <img src="/assets/images/project/daily-record/4.png" alt="Daily Record" style="width: 100%; height: auto; border: 0.1px solid lightgray; border-radius: 6px;">
        <figcaption style="font-size: 12px; text-align: center;">과제 생성 화면</figcaption>
      </figure>
      <ul>
        <li><strong>과제</strong>는 프로젝트 내에서 생성할 수 있으며 프로젝트 기간 범위를 벗어날 수 없습니다.</li>
        <li>과제 기간과 체크 방식을 조합하여 과제의 <strong>목표량을 산출</strong>하고 저장합니다.</li>
        <li>진행도 누적 방식에 따라 <strong>횟수와 시간</strong>으로 구분하여 지정할 수 있습니다.</li>
        <li><strong>주말 제외</strong>를 선택하면 주말을 제외한 일자만을 목표량 산출에 적용합니다.</li>
      </ul>
    </div>
    <div style="display: flex; flex-direction: column; padding: 10px 28px;">
      <h5><strong>5. 계정 관리</strong></h5><br/>
      <figure style="width: 100%;">
        <img src="/assets/images/project/daily-record/5.png" alt="Daily Record" style="width: 100%; height: auto; border: 0.1px solid lightgray; border-radius: 6px;">
        <figcaption style="font-size: 12px; text-align: center;">계정 관리 화면</figcaption>
      </figure>
      <ul>
        <li>상단 우측의 프로필 버튼을 통해 계정 관리 화면에 접근할 수 있습니다.</li>
        <li>이름, 계정, 비밀번호 등 계정 정보를 변경할 수 있습니다.</li>
        <li>이메일 인증은 회원가입 시 진행한 이메일 인증을 통해 완료됩니다.</li>
      </ul>
    </div>
  </div>
  <a class="prev" onclick="const slides = document.querySelectorAll('.slides > div'); const slideWidth = 100 / slides.length; let currentTransform = parseFloat(document.querySelector('.slides').style.transform.replace('translateX(', '').replace('%', '')) || 0; currentTransform += slideWidth; if (currentTransform > 0) currentTransform = -(slides.length - 1) * slideWidth; document.querySelector('.slides').style.transform = `translateX(${currentTransform}%)`;" style="cursor: pointer; position: absolute; top: 50%; width: auto; margin-top: -22px; padding: 16px; color: white; font-weight: bold; font-size: 18px; border-radius: 0 6px 6px 0; user-select: none; left: 0; background-color: rgba(0,0,0,0.1); border: none; text-decoration: none;" onmouseover="this.style.backgroundColor='rgba(0,0,0,0.6)';" onmouseout="this.style.backgroundColor='rgba(0,0,0,0.1)';">&#10094;</a>
  <a class="next" onclick="const slides = document.querySelectorAll('.slides > div'); const slideWidth = 100 / slides.length; let currentTransform = parseFloat(document.querySelector('.slides').style.transform.replace('translateX(', '').replace('%', '')) || 0; currentTransform -= slideWidth; if (currentTransform < -(slides.length - 1) * slideWidth) currentTransform = 0; document.querySelector('.slides').style.transform = `translateX(${currentTransform}%)`;" style="cursor: pointer; position: absolute; top: 50%; width: auto; margin-top: -22px; padding: 16px; color: white; font-weight: bold; font-size: 18px; border-radius: 6px 0 0 6px; user-select: none; right: 0; background-color: rgba(0,0,0,0.1); border: none; text-decoration: none;" onmouseover="this.style.backgroundColor='rgba(0,0,0,0.6)';" onmouseout="this.style.backgroundColor='rgba(0,0,0,0.1)';">&#10095;</a>
</div>

<br/>
<br/>
<br/>

## **개발 정보**
---

<br/>

```
* 개발 동기
1. 일상 챌린지처럼 하고자 하는 일들을 계획하고, 그 과정과 진행 상황을 기록하고 점검하는 플랫폼을 필요로 함.
2. 학습한 개발 기술을 적용하고, 프로젝트 기획부터 프론트엔드와의 협업까지 개발 활동 전반의 경험을 쌓기 위해.
```

<br/>

##### **1. 개발 기간**
  - 1차 개발: 2023.12 ~ 2024.04

<br/>

##### **2. 소스 코드**
  - <a href="https://github.com/Yong-Taek-United/daily-record-back" target="_blank" style="display: flex; align-items: center; gap: 4px; color: black;"><span style="font-weight: 600">daily-record-back</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg></a>
  - <a href="https://github.com/Yong-Taek-United/daily-record-front" target="_blank" style="display: flex; align-items: center; gap: 4px; color: black;"><span style="font-weight: 600">daily-record-front</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg></a>

<br/>

##### **3. 팀 구성 및 기술 스택**
  - 백엔드(1명) - **`TypeScript`** **`Nest.js`** **`MySQL`** **`AWS`** **`Linux Ubuntu`** **`Nginx`**
  - 프론트엔드(1명) - **`TypeScript`** **`Next.js`** **`React`** **`TailwindCSS`**

<br/>

##### **4. 기획 및 디자인**
  - 기능의 특성을 살릴 수 있는 심플한 UI/UX 디자인
  - _와이어프레임_
    <a href="https://www.figma.com/file/h99IPKLTXuBsx9zkXLA8pX/Daily-Record?type=design&node-id=0-1&mode=design" target="_blank" style="color: #A259FF; font-style: italic; text-decoration: none; cursor: pointer; font-weight: normal;" onmouseover="this.style.fontWeight='bold';" onmouseout="this.style.fontWeight='normal';">
      <figure style="width: 100%;">
      <div style="border: 0.5px solid lightgray; border-radius: 6px; overflow: hidden;" onmouseover="this.style.boxShadow='0 4px 8px rgba(0, 0, 0, 0.4)';" onmouseout="this.style.boxShadow='none';">
      <img src="/assets/images/project/daily-record/6.png" alt="Daily Record" style="width: 100%; height: auto; transition: transform 0.1s ease;" onmouseover="this.style.transform='scale(1.1)';" onmouseout="this.style.transform='scale(1)';">
      </div>
      <figcaption style="font-size: 16px; text-align: center;">Figma | <span style="color: #000000;">Daily Record</span>
      </figcaption>
      </figure>
    </a>


<br/>

##### **5. 담당 역할**
  - 서버 애플리케이션 백엔드 개발
  - 서버 호스팅 및 배포
  - 메인/서브 콘텐츠의 기능 및 아키텍처 설계

<br/>

##### **6. 핵심 집중 영역**
  - 최대한 Nest.js(TypeORM)의 기본 기능과 Restful API를 활용하여 **서버의 안정성을 최대화**하기 위해 노력
  - 메인 콘텐츠 구조(Project-Task-Activity)의 주요 기능 간 관계를 세밀하게 연결하여 **버그 최소화**
  - OAuth, 이메일 등 외부 라이브러리 및 API를 활용해 **시스템의 유연·확장성 강화**
  - DB 테이블 관계를 철저하게 설계하여 **데이터 무결성 강화**

<br/>

##### **7. 개발 및 협업 관리**
  - 개발 과정에서 학습한 지식과 기능에 적용된 논리 로직 기록 → <a href="/blog?tag=Nest.js" target="_blank" style="font-weight: 700; font-style: italic; text-decoration: none; color: gray;" onmouseover="this.style.color='black';" onmouseout="this.style.color='gray';" >Blog</a>
  - 데이터베이스 및 API 명세서 작성 → <a href="https://angari.notion.site/0a8c29d0e9694b388864ea5919ed4bac?v=ac5a00d3337e4028a974eff32022a1c1" target="_blank" style="font-weight: 700; font-style: italic; text-decoration: none; color: gray;" onmouseover="this.style.color='black';" onmouseout="this.style.color='gray';" >Notion</a>
  - 프로젝트 일정, 진행 상황, 팀 회의 및 기능 요청과 같은 협업 내용 기록