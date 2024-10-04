---
title: 'Cola Chat'
excerpt: '" 가볍게 대화하는 익명 웹 채팅 서비스 "'
date: '2024-04-01T00:00:00.0000Z'
coverImage: '/assets/images/project/cola-chat/2.png'
author:
  name: Angari
  picture: '/assets/images/authors/angari.png'
ogImage:
  url: '/assets/images/og-image.png'
stacks: ['Socket.IO', 'TypeScript', 'Nest.js', 'Next.js', 'MySQL', 'Prisma', 'Home Server', 'Linux Ubuntu', 'Nginx', 'Vercel']
---

---

<br/>

## **프로젝트 소개**
---

**Cola Chat**은,  
심플하고 간편한 UI/UX와 익명성으로 쉽고 가볍게 접근할 수 있는 웹 채팅 서비스입니다.

<br/>

- ##### **로고**
  <figure style="width: 20%;">
    <img src="/assets/images/project/cola-chat/logo.png" alt="Cola Chat logo" style="width: 100%; height: auto;">
    <figcaption style="font-size: 12px; text-align: center;">Cola Chat</figcaption>
  </figure>

<br/>

- ##### **색상 팔레트**

  <div style="display: flex; gap: 8px;">
    <div style="width: 5%; aspect-ratio: 1; border-radius: 50%; box-shadow: 1px 1px 6px lightgray; background-color: #FFFFFF;"></div>
    <div style="width: 5%; aspect-ratio: 1; border-radius: 50%; box-shadow: 1px 1px 6px lightgray; background-color: #F0EFDB;"></div>
    <div style="width: 5%; aspect-ratio: 1; border-radius: 50%; box-shadow: 1px 1px 6px lightgray; background-color: #6D6D6D;"></div>
    <div style="width: 5%; aspect-ratio: 1; border-radius: 50%; box-shadow: 1px 1px 6px lightgray; background-color: #98BDBD;"></div>
    <div style="width: 5%; aspect-ratio: 1; border-radius: 50%; box-shadow: 1px 1px 6px lightgray; background-color: #BF4124;"></div>
    <div style="width: 5%; aspect-ratio: 1; border-radius: 50%; box-shadow: 1px 1px 6px lightgray; background-color: #590902;"></div>
    <div style="width: 5%; aspect-ratio: 1; border-radius: 50%; box-shadow: 1px 1px 6px lightgray; background-color: #0D0D0D;"></div>
    </div>

<br/>

- ##### **주요 기능**

<div style="position: relative; width: 100%; margin: auto; overflow: hidden; border-radius: 6px; box-shadow: 1px 1px 6px lightgray;">
  <div class="slides" style="display: flex; transition: transform 0.5s ease-in-out; width: 400%;">
    <div style="display: flex; flex-direction: column; padding: 10px 28px;">
      <h5><strong>1. 간편한 채팅방 생성</strong></h5><br/>
      <figure style="width: 100%;">
        <img src="/assets/images/project/cola-chat/1.png" alt="Cola Chat" style="width: 100%; height: auto; border: 0.1px solid lightgray; border-radius: 6px;">
        <figcaption style="font-size: 12px; text-align: center;">메인 화면</figcaption>
      </figure>
      <ul>
        <li>회원가입 없이 간편하게 채팅방을 생성할 수 있습니다.</li>
        <li>채팅방 이름과 최대 정원은 필수로 입력해야 합니다.</li>
        <li>비밀번호는 선택 사항이며, 생성 이후엔 변경할 수 없습니다.</li>
        <li>채팅방이 생성되면 고유의 URL이 할당됩니다.</li>
      </ul>
    </div>
    <div style="display: flex; flex-direction: column; padding: 10px 28px;">
      <h5><strong>2. 실시간 채팅</strong></h5><br/>
      <figure style="width: 100%;">
        <img src="/assets/images/project/cola-chat/2.png" alt="Cola Chat" style="width: 100%; height: auto; border: 0.1px solid lightgray; border-radius: 6px;">
        <figcaption style="font-size: 12px; text-align: center;">채팅 화면</figcaption>
      </figure>
      <ul>
        <li>채팅방 URL로 접속하면 임시 사용자 계정이 자동 생성되어 채팅에 입장합니다.</li>
        <li>채팅방의 최대 정원에 따라 사용자 입장이 제한됩니다.</li>
        <li>채팅방에 입장한 사용자들과 실시간으로 채팅할 수 있습니다.</li>
      </ul>
    </div>
    <div style="display: flex; flex-direction: column; padding: 10px 28px;">
      <h5><strong>3. 사이드 기능</strong></h5><br/>
      <figure style="width: 100%;">
        <img src="/assets/images/project/cola-chat/3.png" alt="Cola Chat" style="width: 100%; height: auto; border: 0.1px solid lightgray; border-radius: 6px;">
        <figcaption style="font-size: 12px; text-align: center;">채팅 사이드 기능</figcaption>
      </figure>
      <ul>
        <li>채팅방 인원수를 클릭하면, 현재 온라인된 사용자를 확인할 수 있습니다.</li>
        <li><strong>사이드 메뉴</strong>를 이용해 작업을 할 수 있습니다.</li>
        <ul style="margin: 0">
          <li>채팅방 URL 복사</li>
          <li>닉네임 변경</li>
          <li>채팅방 나가기</li>
          <li>채팅방 만료기한 확인</li>
        </ul>
      </ul>
    </div>
    <div style="display: flex; flex-direction: column; padding: 10px 28px;">
      <h5><strong>4. 모바일 사이즈 최적화</strong></h5><br/>
      <figure style="width: 100%;">
        <img src="/assets/images/project/cola-chat/4.png" alt="Cola Chat" style="width: 100%; height: auto;">
        <figcaption style="font-size: 12px; text-align: center;">모바일 화면</figcaption>
      </figure>
      <ul>
        <li>모바일 사이즈에도 최적화된 반응형 디자인을 적용했습니다.</li>
        <li>웹 페이지로서 데스크톱 버전과 동일한 기능을 제공합니다.</li>
        <li>사이드 메뉴는 <strong>햄버거 메뉴 아이콘</strong>을 통해 확인할 수 있습니다.</li>
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

##### **1. 개발 기간**
  - 1차 개발: 2024.09

<br/>

##### **2. 소스 코드**
  - <a href="https://github.com/angar2/cola-chat-back" target="_blank" style="display: flex; align-items: center; gap: 4px; color: black;"><span style="font-weight: 600">cola-chat-back</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg></a>
  - <a href="https://github.com/angar2/cola-chat-front" target="_blank" style="display: flex; align-items: center; gap: 4px; color: black;"><span style="font-weight: 600">cola-chat-front</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg></a>

<br/>

##### **3. 기술 스택**
  - 백엔드  
  **`TypeScript`** **`Nest.js`** **`MySQL`** **`Prisma`** **`Socket.IO`** **`Home Server`** **`Linux Ubuntu`** **`Nginx`**

  - 프론트엔드  
  **`TypeScript`** **`Next.js`** **`React`** **`Zustand`** **`TailwindCSS`** **`Socket.IO`**

<br/>

##### **4. 기획 및 디자인**
  - 심플하고 직관적인 UI/UX 디자인
  - _와이어프레임_ ⇒ 
    <a href="https://www.figma.com/file/h99IPKLTXuBsx9zkXLA8pX/Daily-Record?type=design&node-id=0-1&mode=design" target="_blank" style="color: #A259FF; font-style: italic; text-decoration: none; cursor: pointer; font-weight: normal;" onmouseover="this.style.fontWeight='bold';" onmouseout="this.style.fontWeight='normal';">
      Figma | <span style="color: #000000;">Cola Chat</span>
    </a>