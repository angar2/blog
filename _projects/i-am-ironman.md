---
title: 'I am Ironman'
excerpt: '" 아이언맨 슈팅 게임 "'
date: '2022-05-01T00:00:00.0000Z'
coverImage: '/assets/images/project/i-am-ironman/1.png'
author:
  name: Angari
  picture: '/assets/images/authors/angari.png'
ogImage:
  url: '/assets/images/og-image.png'
stacks: ['TypeScript', 'Phaser.js', 'Webpack', 'Vercel']
---

---

<br/>

## **프로젝트 소개**
---

**I am Ironman**은,

<s>`Pygame`기반으로</s> &nbsp; **`Phaser.js`** 기반으로 제작한 2D 미니 슈팅 게임입니다. 

<br/>

<figure style="width: 100%;">
  <img src="/assets/images/project/i-am-ironman/2.gif" alt="I am Ironman" style="width: 100%; height: auto; border: 0.1px solid lightgray; border-radius: 6px;">
  <figcaption style="font-size: 12px; text-align: center;"></figcaption>
</figure>

<br/>

<!-- 버튼 -->
><button onclick="document.getElementById('modal').style.display='flex'; document.getElementById('modal-iframe').src='https://iamironman.vercel.app/';" style="display:flex; align-items: center; width: fit-content; height: fit-content; gap: 4px; text-decoration: none; cursor: pointer; color: #008B6B; border-radius: 5px;" onmouseover="this.style.color='#9D4AD1'; this.querySelector('svg path').setAttribute('fill', '#9D4AD1');" onmouseout="this.style.color='#008B6B'; this.querySelector('svg path').setAttribute('fill', '#008B6B');"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.97 16L5 19C4.67 19.3 4.23 19.5 3.75 19.5C3.28587 19.5 2.84075 19.3156 2.51256 18.9874C2.18437 18.6592 2 18.2141 2 17.75V17.5L3 10.12C3.21 7.81 5.14 6 7.5 6H16.5C18.86 6 20.79 7.81 21 10.12L22 17.5V17.75C22 18.2141 21.8156 18.6592 21.4874 18.9874C21.1592 19.3156 20.7141 19.5 20.25 19.5C19.77 19.5 19.33 19.3 19 19L16.03 16H7.97ZM7 8V10H5V11H7V13H8V11H10V10H8V8H7ZM16.5 8C16.3011 8 16.1103 8.07902 15.9697 8.21967C15.829 8.36032 15.75 8.55109 15.75 8.75C15.75 8.94891 15.829 9.13968 15.9697 9.28033C16.1103 9.42098 16.3011 9.5 16.5 9.5C16.6989 9.5 16.8897 9.42098 17.0303 9.28033C17.171 9.13968 17.25 8.94891 17.25 8.75C17.25 8.55109 17.171 8.36032 17.0303 8.21967C16.8897 8.07902 16.6989 8 16.5 8ZM14.75 9.75C14.5511 9.75 14.3603 9.82902 14.2197 9.96967C14.079 10.1103 14 10.3011 14 10.5C14 10.6989 14.079 10.8897 14.2197 11.0303C14.3603 11.171 14.5511 11.25 14.75 11.25C14.9489 11.25 15.1397 11.171 15.2803 11.0303C15.421 10.8897 15.5 10.6989 15.5 10.5C15.5 10.3011 15.421 10.1103 15.2803 9.96967C15.1397 9.82902 14.9489 9.75 14.75 9.75ZM18.25 9.75C18.0511 9.75 17.8603 9.82902 17.7197 9.96967C17.579 10.1103 17.5 10.3011 17.5 10.5C17.5 10.6989 17.579 10.8897 17.7197 11.0303C17.8603 11.171 18.0511 11.25 18.25 11.25C18.4489 11.25 18.6397 11.171 18.7803 11.0303C18.921 10.8897 19 10.6989 19 10.5C19 10.3011 18.921 10.1103 18.7803 9.96967C18.6397 9.82902 18.4489 9.75 18.25 9.75ZM16.5 11.5C16.3011 11.5 16.1103 11.579 15.9697 11.7197C15.829 11.8603 15.75 12.0511 15.75 12.25C15.75 12.4489 15.829 12.6397 15.9697 12.7803C16.1103 12.921 16.3011 13 16.5 13C16.6989 13 16.8897 12.921 17.0303 12.7803C17.171 12.6397 17.25 12.4489 17.25 12.25C17.25 12.0511 17.171 11.8603 17.0303 11.7197C16.8897 11.579 16.6989 11.5 16.5 11.5Z" fill="#008B6B"/></svg><span style="font-size: 24px; font-weight: 700;">플레이 해보기</span>
</button>

<!-- 모달 -->
<div id="modal" style="display: none; position: fixed; left: 0; top: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.7);">
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #fefefe; width: fit-content; height: fit-content; margin: auto; border: 1px solid #888; border-radius: 8px; position: relative;  overflow: hidden;">
    <span onclick="document.getElementById('modal').style.display='none'; document.getElementById('modal-iframe').src='';" style="position: absolute; top: 10px; right: 10px; color: #aaa; font-size: 32px; font-weight: 400; cursor: pointer;">&#x2715;</span>    
    <iframe id="modal-iframe" src="" style="width: 1024px; height: 600px; border: none;" frameborder="0"></iframe>
  </div>
</div>



<br/>

- ##### **게임 특징**
  - 생존 시간과 적의 종류에 따른 차등으로 점수가 증가하는 **스코어링** 방식
  - 에너지 게이지를 충전해 사용하는 **스킬** 발동 시스템
  - 피격 시 플레이어의 **생명력** 감소 시스템


<br/>

- ##### **키 조작법**
  - 위치 조정: &nbsp; **`←`** **`→`** **`↑`** **`↓`**
  - 리펄서 발사: &nbsp; **`Space bar`**
  - 유니빔 발사: &nbsp; **`B`**
  - 게임 재시작 여부: &nbsp; **`Y`** | **`N`**



<br/>
<br/>

## **개발 정보**
---

<br/>

##### **1. 개발 기간**
  - 1차(2022.05.): 코딩 교육 프로그램 참여 당시 개발한 체험용 프로토타입
  - 2차(2024.08.): 개발 언어 컨버팅/포팅 및 기능 업그레이드
  

<br/>

##### **2. 소스 코드**
  - <a href="https://github.com/angar2/iamironman" target="_blank" style="display: flex; align-items: center; width: fit-content; gap: 4px; color: black;"><span style="font-weight: 600">iamironman</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg></a>

<br/>

##### **3. 기술 스택**
  - 1차: **`Python`** **`Pygame`** 
  - 2차: **`TypeScript`** **`Phaser.js`** **`Webpack`** **`Vercel`**

<br/>

##### **4. 개발 특징**
  - 상황에 따른 콘텐츠의 **이미지 변환**으로 애니메이션 효과 적용
  - 상황별 사운드 효과 적용
  - 인트로-플레이-게임오버 등 **씬(Scene)을 구분**하여 게임 흐름을 원활하게 조정
  - 콘텐츠 충돌 감지 기능을 이용해 상호작용 구현
  - `+` 보조 그래픽 도형으로 이미지의 실제 콘텐츠 부위별로 맞춤화하여 **충돌 감지 영역을 세분화**하고 기존의 이미지 전체를 충돌 영역으로 감지하는 단점을 보완
  - `+` **클래스(Class) 기반 모듈화를 적용**해 코드의 재사용성과 유지보수성을 향상시킴
  - `+` HTML5 기반의 라이브러리(Phaser.js)를 활용해 **웹 플랫폼에서 실행 가능**하도록 개발
  - `+` Vercel을 활용하여 **외부에서 접속 및 실행** 가능한 형태로 배포