---
title: 모바일 뷰포트에 게임 끼워 맞추기 — dvh와 safe-area 그다음
description: Phaser 캔버스 게임과 CSS flex 레이아웃 게임 두 종을 모바일에 맞추다 겪은 실패를 하나의 체크리스트로 묶는다.
track: notes
created: 2026-06-20T09:00
tags: [mobile, viewport, css, game-dev]
---

Phaser 캔버스 게임 **burger-stack**과 웹캠 모션인식 게임 **cham3**, 두 프로젝트를 모바일로 옮기면서 똑같은 착각을 반복했다. `100dvh` 한 줄이면 뷰포트 문제가 끝날 줄 알았는데, 두 프로젝트는 서로 다른 얼굴로 다시 터졌다.

`100vh`는 브라우저 주소창이 접히든 펼쳐지든 그 상태의 뷰포트 높이를 그대로 100%로 잡는다. 문제는 <u>주소창이 나타나 있는 상태에서 100vh를 계산하면, 주소창이 다시 사라져도 레이아웃이 그 값에 묶여 화면 일부가 잘려나간다는 것</u>이다. `dvh`(dynamic viewport height)는 이 값을 주소창 상태 변화에 맞춰 동적으로 재계산해준다는 단위다. 즉, `100vh`가 스냅샷이라면 `100dvh`는 실시간 갱신값이라는 차이다.

> [!warn]
> `env(safe-area-inset-*)`는 `<meta name="viewport" content="viewport-fit=cover">`가 먼저 있어야 값이 활성화된다. 이 메타 태그 없이 safe-area 변수부터 쓰면 아무 값도 안 잡힌다. 두 프로젝트 다 이 순서(메타 태그 → safe-area)를 지켰다.

## burger-stack: Phaser 캔버스가 주소창에 먹힌 사건

Phaser.js 기반 캐주얼 게임으로, 논리 해상도 390×844 고정 캔버스에 `Phaser.Scale.FIT`을 쓴다. PC 전용으로 짜여 있던 걸 모바일로 옮기는 첫 작업(TASK-023)에서 화면 깨짐·입력 불가·레이아웃 이탈을 훑었다.

### 1차 대응: 넓게 훑기

뷰포트 메타에 `viewport-fit=cover`를 추가하고, `height: 100vh; height: 100dvh;`로 폴백을 병기했다. iOS의 오래된 폴백값인 `html { height: -webkit-fill-available; }`도 걸었는데, 이건 `body`가 아니라 반드시 **`html`**에 적용해야 한다. 여기에 `body { overflow: hidden; position: fixed; width: 100%; } `와 `overscroll-behavior: none`을 같이 걸어 iOS 바운스 스크롤을 막고, `touch-action: none`·`user-select: none`·`-webkit-tap-highlight-color: transparent`로 터치 기본 동작을 지웠다. 세로 전용 게임이라 `@media (orientation: landscape)`에서 회전 안내 오버레이도 넣었고, `Phaser.Scale`에 `min: { width: 320, height: 568 }` / `max: { width: 1024, height: 2210 }` 범위를 줬다.

### 검증에서 나온 지적: 누가 캔버스 크기를 재는가

검증사 리뷰에서 지적이 하나 나왔다. safe-area를 `body` padding으로 주면, Phaser는 내부적으로 `document.body.clientHeight`(padding을 뺀 영역)를 기준으로 캔버스를 스케일한다는 것이다. 재봉사가 옷을 입은 상태로 몸 치수를 재면 실측과 다른 숫자가 나오는 것과 비슷하다 — <u>누가 무엇을 기준으로 재느냐에 따라 같은 화면도 다른 크기로 계산된다</u>. 검증사는 다음과 같이 못박았다.

> "SafeArea + Phaser Scale 조합 — 실기기 테스트 필수... Phaser 버전 및 브라우저 렌더링 환경에 따라 측정 방식이 다를 수 있음."

이 시점 검증은 로컬 + DevTools 반응형 모드까지였고, 배포 후 실기기 검증은 "필수 아님"으로 넘어갔다.

### 재발: 100dvh 안에 주소창이 숨어 있었다

1차 대응 후에도 실사용 가능 높이가 `100dvh`보다 작은 문제가 남았다(TASK-059). 원인은 iOS Safari URL 바(약 40~50px)와 Android Chrome 주소창(약 56px)이 `100dvh` 계산에 여전히 포함돼 있었다는 것. `Phaser.Scale.FIT`이 원본 비율을 지키려다 콘텐츠 일부를 화면 밖으로 밀어냈다. *"모바일 브라우저 UI 점유 — 실제 사용 가능 높이 < 100dvh"* — `dvh`라는 이름과 달리, "동적"이 브라우저 UI 점유분까지 포함해버리는 경우가 있었다.

### 해법: parent 컨테이너로 측정 기준을 옮기다

`window` 대신 별도 컨테이너를 Phaser의 측정 기준으로 바꿔버렸다.

```css
#game-container {
  width: 100%;
  height: 100dvh;
  max-height: calc(100dvh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
}
```

```ts
// main.ts Phaser config
parent: 'game-container'
```

컨테이너의 `max-height`가 주소창 점유분(약 60px)을 미리 빼두면, Phaser는 `window` 전체가 아니라 이 컨테이너 크기(예: 390×640)를 인식해 FIT 모드로 원본 비율 390×844를 유지한 채 자동 축소한다. 캔버스에 Phaser가 주입하는 인라인 스타일은 `margin: 0 !important`로 덮어써야 했고, `position: fixed` + `inset: 0`로 뷰포트 전체 점유도 확보했다. `calc` 결과가 최악의 경우 310px까지 내려갈 수 있어 `SCALE_MIN_HEIGHT`도 568에서 450으로 낮췄다.

## cham3: CSS flex 레이아웃이 실기기에서 어긋난 사건

cham3(참참참)는 웹캠으로 고개·손 방향을 인식해 컴퓨터와 겨루는 Svelte 게임이다. 캔버스 엔진 없이 순수 CSS flex로 레이아웃을 짠다는 점이 burger-stack과 갈리는 지점이다.

### 1차 대응: safe-area와 dvh를 한 곳에 몰아넣다

사용자가 제공한 모바일 세로 화면 스크린샷 한 장으로 전면 재점검이 시작됐다(TASK-019). HUD 가로 넘침, 타이틀·HUD 겹침, 카메라 토글 카드 잘림 등 총 9종의 깨짐을 식별했는데, 그중 하나가 **safe-area·dvh 전무**였다. 기존 `.viewport { position: fixed; inset: 0; }`가 주소창을 포함한 large viewport에 고정돼 하단이 주소창 뒤로 가려지고 상단 노치가 HUD를 밀어내는 문제였다.

```css
.viewport {
  height: 100dvh; /* 100vh 폴백 병기 */
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
}
```

이 적용점을 `App.svelte` 최상위 한 곳으로 몰아 breakpoint도 `@media (max-width: 767px)` 하나로 통일했다. Phase를 6개로 나눠 순차 커밋했고, 목업 파일을 시각 기준으로 삼았다.

### 실기기 라운드: 목업과 어긋난 지점들

DevTools 검증은 통과했지만, Cloudflare 터널로 실기기(iOS Safari)에 연결하자 목업과 다른 지점이 또 나왔다. HUD는 2행으로 짰다가 실기기에서 도로 1행으로 되돌리고 칩 패딩·폰트를 줄였다. 입력 버튼 영역은 "라벨만 숨기는 컴팩트"(Plan A)로 시작했지만 세로 공간 압박이 실기기에서도 남아 완전히 숨기는 Plan B로 넘어갔다. 참봇 원형이 세로를 독식해 카메라가 납작해지는 문제, "참!"→"참!!" 전환 시 문구 높이가 바뀌며 카메라 영역이 출렁이는 문제도 이 라운드에서 잡혔다 — `.chant`를 `clamp(48px, 9vmin, 66px)`로 고정해 해결했다.

> [!tip]
> Plan A가 안 되면 Plan B로 간다고 계획 단계에서 미리 적어두면, 실기기 라운드에서 그 경로를 그대로 타면 되니 그만큼 빨라진다.

### 별도 사건: 배경 블러가 모바일에서만 꺼진다

레이아웃과는 별개 버그(TASK-020)로, 배경 블러 토글이 모바일에서만 안 먹힌다는 제보가 들어왔다. 블러 활성 조건은 `blurActive = allowBlur && showBackgroundBlur && stream != null && camera.fpsLevel < MAX_FPS_LEVEL`. 마지막 항이 유일하게 모바일과 데스크톱을 가르는 변수였다. 적응형 FPS는 추론 소요시간만으로 단계를 올리는데, 모바일은 baseline 추론이 느려 사실상 항상 최저 단계에 고정돼 있었다. 저사양 폴백이 모바일에서 상시 발동해 블러를 막고 있었던 것.

```js
const isCoarsePointer =
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
// blurActive derived 게이트:
(isCoarsePointer || camera.fpsLevel < MAX_FPS_LEVEL)
```

1차 수정으로 `matchMedia('(pointer: coarse)')`로 터치 기기를 판별해 게이트를 우회시켰다. 그런데 실기기에서 진단 HUD로 확인하니 `blurActive`는 이미 true였는데도 화면엔 여전히 블러가 없었다. 가설을 고쳤는데 증상은 그대로였다는 뜻이고, 원인은 다른 곳에 있었다.

### 진짜 원인: ctx.filter는 받아들이지만 그리지 않는다

원인은 **Canvas 2D `ctx.filter = 'blur()'`가 iOS Safari에서 속성 자체는 받아들이지만 `drawImage` 렌더링에는 적용되지 않는다**는 것이었다. 온도조절기 다이얼을 원하는 온도로 돌렸는데 정작 히터는 안 켜지는 상황과 닮았다 — 설정값은 정상 수용됐는데 그 값이 실제 출력으로 이어지지 않는 조용한 실패다. 해결은 캔버스 필터를 버리고 `<video>` 엘리먼트에 CSS `filter`를 직접 거는 방식으로 교체하는 것이었다.

```css
.feed.blurred {
  filter: blur(12px);
  transform: scaleX(-1) scale(1.08);
}
```

`.blurfeed` 캔버스는 인물 컷아웃만 그리도록 단순화했고, 오프스크린 캔버스와 배경 전체 블러 draw는 제거했다. `ctx.filter`는 완전히 폐기했다. 원인 확정에 쓴 진단 HUD(coarse·active·seg ready·draws·mask)는 확정 후 전량 제거했다.

## 두 사건을 하나의 체크리스트로

burger-stack과 cham3는 서로 다른 실패 모드(엔진 스케일링 vs CSS 필터 렌더링)를 겪었지만, 겹치는 결론은 하나로 묶인다.

- `100dvh`는 시작점이지 종점이 아니다. 주소창 점유분이나 `position: fixed; inset: 0`의 large-viewport 고정 문제는 `dvh`만으로 안 풀린다. burger는 `max-height: calc(100dvh - Npx)` + 엔진 `parent` 컨테이너로, cham3는 `.viewport`에 safe-area padding을 얹는 식으로 각자 풀었다.
- `viewport-fit=cover`는 `env(safe-area-inset-*)`의 전제조건이다. 순서를 바꾸면 safe-area 변수 자체가 안 잡힌다.
- 엔진·레이아웃 방식에 따라 <u>스케일링 주체</u>가 다르다. Phaser 같은 캔버스 엔진은 "누가 크기를 재는가"(window vs parent 컨테이너 vs body.clientHeight)가 safe-area padding과 충돌할 수 있다. 순수 CSS flex(cham3)라면 `order`·`flex-basis`·`clamp()`로 직접 통제할 수 있지만 breakpoint마다 비중을 다시 맞춰야 한다.
- iOS Safari는 매번 다른 방식으로 뒤통수를 친다. burger에서는 `-webkit-fill-available`을 걸 대상 엘리먼트(`html`)가 미묘했고, cham3에서는 `ctx.filter`가 속성은 받고 렌더는 무시하는 조용한 실패였다. 둘 다 코드만 보면 맞아 보이는 상태였다.
- DevTools 반응형 모드는 필요조건이지 충분조건이 아니다. cham3는 목업·DevTools 기준을 다 통과하고도 실기기 라운드에서 HUD 행수, 입력 버튼 표시 여부, 블러 렌더링까지 다시 손봐야 했다. burger는 실기기 검증을 필수로 두지 않았다는 차이가 있는데, 이게 좋고 나쁘고의 문제라기보다 <u>캔버스 스케일링처럼 실측 리스크가 이미 지목된 영역이면 실기기를 건너뛰지 말라</u>는 신호로 남는다.
- 디버깅이 막히면 화면에 값을 직접 찍어라. cham3의 블러 버그는 임시 진단 HUD로 "게이트는 열렸는데 왜 안 보이나"를 실기기에서 관측했고, 그 값으로 가설을 갈아치웠다.

즉, 모바일 뷰포트 대응은 `100dvh` 한 줄로 끝나는 단발성 작업이 아니라, <u>단위 교체 → 전제조건 확인 → 실기기 검증</u> 세 단계를 다 거쳐야 완결되는 절차라는 게 두 프로젝트가 독립적으로 도달한 같은 결론이다.
