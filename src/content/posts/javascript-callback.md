---
title: 자바스크립트 콜백 함수
description: 자바스크립트 콜백 함수의 개념과 제어권 이전 방식을 정리하고, 콜백 지옥이 발생하는 이유와 이를 해결하는 방법을 살펴본다.
track: notes
created: 2024-07-05T09:25
tags: [javascript, callback, callback-hell]
---

다른 코드의 인자로 넘겨주는 함수로서 콜백 함수의 제어권을 넘겨받은 함수 내부에서 필요에 따라 적절한 시점에 실행된다.

> "어떤 함수 X를 호출하면서 '특정 조건일 때 함수 Y를 실행하라'라는 요청"

```js
var count = 0;
var cbFunc = function () {
  console.log(count);
  if(++count > 4) clearInterval(timer);
};
var timer = setInterval(cbFunc, 300);

// 0 1 2 3 4
```

![콜백 함수 제어권](/assets/images/blog/25/1.png)

⇒ 함수(`setInterval()`)의 조건이 충족(`300(0.3초)`)되었을 때 넘겨받은 콜백 함수(`cbFunc()`)를 실행한다.

> [!note]
> 위 예시의 경우 `cbFunc()` 함수 내부의 `this`는 런타임 환경에 따라 다르게 가리킨다.
> - 브라우저 → `window`
> - Node.js → `Timeout` 객체

## 특징

콜백 함수는 다음과 같은 특징을 갖는다.

- 콜백 함수의 제어권을 넘겨받은 함수는 콜백 함수를 호출할 때 인자에 어떤 값들을 어떤 순서로 넘길 것인지에 대한 제어권을 갖는다.(예시: `forEach`, `map` 등)

- 콜백 함수로 어떤 객체의 메서드를 전달하더라도 그 메서드는 메서드가 아닌 함수로서 호출된다.(= this가 바인딩되지 않는 이상 this는 기본적으로 전역 객체를 가리킨다.)

- 콜백 함수를 사용하는 주요 이유 중 하나는 비동기 작업을 동기적으로 처리하기 위함이다.

## 콜백 지옥과 비동기 제어

콜백 지옥이란, 콜백 함수를 익명 함수로 전달하는 과정이 반복되어 코드의 들여쓰기 수준이 감당하기 힘들 정도로 깊어지는 현상을 의미한다.

```js
setTimeout(() => {
  console.log('첫 번째 작업');
  setTimeout(() => {
    console.log('두 번째 작업');
    setTimeout(() => {
      console.log('세 번째 작업');
      // 추가적인 작업...
    }, 1000);
  }, 1000);
}, 1000);
```

### 콜백 지옥 해결

콜백 지옥은 다음 방법으로 해결할 수 있다.

- `Promise`, `Generator` (ES6)

- `async / await` (ES2017)

> 참고 문헌: 정재남 (2019). 코어 자바스크립트. 위키북스.
