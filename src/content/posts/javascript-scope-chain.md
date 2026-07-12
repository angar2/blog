---
title: 자바스크립트 스코프 체인
description: 실행 컨텍스트의 LexicalEnvironment가 갖는 outerEnvironmentReference 개념을 통해 스코프 체인이 동작하는 원리를 정리한다.
track: notes
created: 2024-07-03T09:23
tags: [javascript, scope, scope-chain]
---

## outerEnvironmentReference

현재 실행 컨텍스트의 외부 환경을 참조하여 상위 스코프에 있는 식별자와 변수에 접근할 수 있게 해주는 **참조**로서, 현재 호출된 함수가 선언될 당시의 `LexicalEnvironment`를 참조하고 스코프 체인을 가능케하는 요소이다.

```
참조: 객체나 데이터의 메모리 위치를 가리키는 정보
스코프: 식별자에 대한 접근 가능한 유효범위
```

### 스코프 체인(Scope Chain)

스코프를 안에서부터 바깥으로 차례로 검색해나간다는 개념으로 아래와 같은 특성이 있다.

- `outerEnvironmentReference`를 이용해 현재 실행 중인 함수나 코드 블록의 상위 스코프로 이동하며 검색해나간다.
- 순서대로 직전 상위 스코프의 `LexicalEnvironment(outerEnvironmentReference)`를 참조해 상위로 나아간다.
- 찾고자 하는 식별자가 발견될 때까지 계속 검색한다.
- 동일한 식별자가 스코프 체인 상에 있을 경우 가장 먼저 발견된 식별자에 접근하고 다른 식별자에는 접근할 수 없다.(`변수 은익화`)

**예시)**

```js
01  var a = 1;
02  var outer = function () { 
03    var inner = function () { 
04      console.log(a);
05      var a = 3;
06    };
07    inner();
08    console.log(a);
09  };
10  outer();
11  console.log(a);
```

![스코프 체인 과정](/assets/images/blog/23/1.png)

> [!note]
> 정재남 (2019). **_코어 자바스크립트_**. 위키북스.
