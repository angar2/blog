---
title: 'I am Ironman: 게임 씬 구성'
description: 게임의 시작과 종료 흐름에 맞춰 백그라운드·인트로·플레이·오버 4개의 씬으로 나누고, Phaser의 씬 전환 메서드로 화면 흐름을 제어한 구성을 정리한다.
track: log
created: 2024-08-19T09:35
tags: [phaser, game, scene]
sources:
  - title: Getting Started with Phaser 3
    url: https://phaser.io/tutorials/getting-started-phaser3
---

게임 플레이 로직을 모두 구현했으니, 마지막으로 게임의 시작과 종료를 구분하여 전체적으로 완성된 게임 형태를 구성해볼 차례다.

구분은 상황별로 게임 **씬(Scene)** 을 분리하여 구현했다.

## 씬(Scene)

게임은 진행 상황에 따라 총 4개의 씬으로 구분되며, 각 씬은 상황에 맞게 전환되거나 오버레이된다.

### 씬 구성

![I am Ironman](/assets/images/blog/35/1.png)

- **백그라운드 씬(backScene)**  
게임에 필요한 모든 자산이 로드되고, 배경화면을 생성해 이동시킨다. 게임 내 모든 씬은 해당 씬 위에서 동작한다.

- **인트로 씬(introScene)**  
게임 실행 시 처음 나타나는 화면으로, `Enter` 키를 눌러 게임을 시작할 수 있다.

- **플레이 씬(playScene)**  
본격적인 게임 플레이가 이루어지는 화면으로, 대부분의 게임 로직이 해당 씬에서 실행된다.

- **오버 씬(overScene)**  
플레이어의 생명력이 소진되면 나타나는 화면으로, **`playScene`** 위에 오버레이되며, `Y`와 `N`키를 사용해 재시작 여부를 결정할 수 있다.

> [!note]
> 배경화면은 모든 씬에서 공통으로 필요하므로 backScene에서 생성한다.

### 구현 코드

> [!note]
> 모든 씬 클래스의 소스 코드를 전부 보여주기엔 너무 방대하므로, 주요 설정만을 작성했다.

- **게임 설정**

  ```ts
  // main.ts
  import Phaser from 'phaser';
  import BackScene from './scenes/backScene';
  import IntroScene from './scenes/introScene';
  import PlayScene from './scenes/playScene';
  import OverScene from './scenes/overScene';

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 600,
    scene: [BackScene, IntroScene, PlayScene, OverScene],
    ...
  };

  const game = new Phaser.Game(config);

  ```
  게임 설정에 준비된 씬들을 배열로 등록하며, 배열의 첫 번째 씬이 가장 먼저 화면에 표시된다.

- **화면 전환 메서드**

  ```ts
  // scenes/...

  // backScene.ts
  // 자산 로드와 배경화면 생성 후
  this.scene.launch('IntroScene'); // 인트로 씬 오버레이

  // introScene.ts
  // Enter 키 입력 시
  this.scene.switch('PlayScene'); // 플레이 씬으로 전환

  // playScene.ts
  // 플레이어 생명력 소진 시
  this.scene.pause(); // 플레이 화면 일시정지
  this.scene.pause('BackScene'); // 배경화면 일시정지
  this.scene.launch('OverScene'); // 게임오버 씬 오버레이


  // overScene.ts
  // Y 키 입력 시
  this.scene.resume('BackScene'); // 배경화면 재생
  this.scene.switch('PlayScene');

  // N 키 입력 시
  this.scene.stop('PlayScene'); // 플레이 씬 정지
  this.scene.resume('BackScene'); // 배경화면 재생
  this.scene.switch('IntroScene'); // 인트로 씬으로 전환
  ```
  각 씬의 상황에 따라 씬을 전환한다.
