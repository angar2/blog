---
title: 'I am Ironman: 게임 화면 구현'
description: 게임에 등장하는 캐릭터·배경·무기 등 콘텐츠의 이미지와 기본 속성을 정의하고, object-manager-group-scene 구조로 콘텐츠를 생성·관리하는 아키텍처를 구현한 과정을 정리한다.
track: log
created: 2024-08-16T09:32
tags: [phaser, game, html5, ironman]
sources:
  - title: Getting Started with Phaser 3
    url: https://phaser.io/tutorials/getting-started-phaser3
---

본격적인 게임 개발을 위해 화면에 표시될 캐릭터와 무기 등 콘텐츠를 생성하고 관리하는 로직을 구현했다.
각 로직은 확장/수정의 용이성을 감안해 최대한 독립적으로 운영될 수 있도록 아키텍처를 설계했다.

## 콘텐츠 설정

게임에 사용되는 콘텐츠의 이미지와 기본 속성을 설정했다.

### 이미지

> [!note]
> 콘텐츠 이미지는 무료 이미지 제공 사이트의 이미지를 다운로드 받아 사용했으며, 상업적이지 않은 사적 이용의 범위 내에서만 사용한다.

- **배경**

  ![우주 배경](/assets/images/blog/32/8.png)

- **캐릭터**

  ![아이언맨](/assets/images/blog/32/1.png)
  ![울트론](/assets/images/blog/32/2.png)
  ![울트론2](/assets/images/blog/32/3.png)
  ![바위](/assets/images/blog/32/5.png)
  ![울트론3](/assets/images/blog/32/4.png)

- **무기**

  ![리펄서](/assets/images/blog/32/6.png)
  ![유니빔](/assets/images/blog/32/7.png)
  ![적 공격](/assets/images/blog/32/9.png)

### 기본 속성

- **타입**: 콘텐츠 종류
- **이동 속도**: 게임 프레임 당 이동 거리
- **체력**: 콘텐츠 생명력
- **모드**: 이미지 애니메이션 상태
- **충돌 감지 영역**: 콘텐츠 충돌 감지 범위 정의

## 콘텐츠 화면 구현

정의된 콘텐츠가 실제 게임 화면에 생성되고 관리되는 과정을 구현했다.

### 아키텍처

게임 화면에 표시되는 모든 콘텐츠 객체의 생성은 아래와 같은 구조로 이루어져 있다.

- **콘텐츠 정의 → 생성/관리 → (복수 콘텐츠 관리) → 화면 구현**

1. **콘텐츠 정의**(`object`): 콘텐츠의 특성에 맞는 Phaser의 내장 클래스를 상속받아 클래스에 추가적인 속성을 정의해 커스터마이징한다.
2. **생성/관리**(`manager`): 콘텐츠를 관리하는 클래스에서 해당 콘텐츠 `object` 인스턴스를 생성하고 그 내부에서 인스턴스를 관리한다.
3. **복수 콘텐츠 관리**(`group`): `manager`에서 복수의 콘텐츠 객체를 관리해야할 경우 생성된 인스턴스의 관리 역할을 `group`으로 이관한다.
4. **화면 표시**(`scene`): 콘텐츠의 화면 표시가 필요한 씬에서 `manager` 인스턴스를 생성해 콘텐츠 생성과 관리 작업을 동시에 처리한다.

### 코드 작성

- **콘텐츠 정의**

  ```ts
  // objects/characters/ironman.ts
  import Phaser from 'phaser';
  ...

  export default class Ironman extends Phaser.GameObjects.Image {
    private _type: HeroType;
    private speed: number;
    private health: number;
    public mode: IronmanMode;
    public collisionZones!: CollisionZoneGroup;
    private sound: { [key: string]: Phaser.Sound.BaseSound } = {};

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
      super(scene, x, y, texture);

      // 요소 설정
      this._type = HeroType.IRONMAN;
      this.speed = speedConfig.ironman;
      this.health = healthConfig.ironman;
      this.mode = IronmanMode.NORMAL;
      this.sound.repulsor = this.scene.sound.add('repulsor');

      scene.add.existing(this); // 화면 구현

      const scale = (scene.game.canvas.width * scaleConfig.ironman) / this.width;
      this.setScale(scale); // 이미지 사이즈 비율 설정

      this.createCollisionZones();
    }

    // 충돌 감지 영역 생성
    private createCollisionZones() {
      ...
    }

    // 사운드 재생
    public playSound(mode: IronmanMode) {
      return this.sound[mode].play();
    }
  }
  ```

  `Phaser.GameObjects.Image`를 상속받아 준비된 캐릭터 이미지 객체를 생성하고
  게임 내에서 필요한 이동속도, 체력, 기본 모션, 효과음 등 다양한 속성의 초기화를 설정했다.
  ('충격 감지 영역'은 다른 문서에서 다룰 예정)

  > [!note]
  > **물리 기능 여부에 따른 적절한 상속**
  > 게임 내에 생성되는 객체에 물리 기능을 부여하기 위해선 Phaser.Physics 계열을 상속받아야 하지만, 충돌 효과를 별도의 객체를 만들어 부여했기 때문에 기본 이미지 클래스인 Phaser.GameObjects.Image 사용했다.

- **생성/관리**

  ```ts
  // managers/characters/ironmanManager.ts
  import Phaser from 'phaser';
  ...

  export default class IronmanManager {
    private scene: Phaser.Scene;
    private timerHandler: TimerHandler;
    private ironman!: Ironman;

    constructor(scene: Phaser.Scene) {
      this.scene = scene;

      this.create();
    }

    // 아이언맨 생성
    public create() {
      const gameWidth = this.scene.game.canvas.width; // 현재 화면 너비
      const gameHeight = this.scene.game.canvas.height; // 현재 화면 높이

      this.ironman = new Ironman(
        this.scene,
        gameWidth / 4,
        gameHeight / 2,
        ImageTexture.IRONMAN_NORMAL // 이미지 텍스쳐 키값
      );
    }

    // 아이언맨 가져오기
    public get() {
      return this.ironman;
    }
  }
  ```

  생성된 콘텐츠 객체는 해당 매니저 클래스에서 관리하고 필요에 따라 메서드를 통해 객체를 외부에 제공한다.

- **복수 콘텐츠 관리**

  ```ts
  import GroupManager from '../groupManager';
  ...

  export default class EnemyManager {
    private groupManager: GroupManager;
    private enemies: Phaser.GameObjects.Group;
    private enemy: { [key in EnemyType]?: Enemy } = {};
    ...

    constructor(
      scene: Phaser.Scene,
      groupManager: GroupManager,
      ...
    ) {
      this.scene = scene;
      this.groupManager = groupManager;
      this.enemies = groupManager.get(GroupType.ENEMIES); // 미리 준비된 그룹 인스턴스 불러오기

      for (const enemy of Object.values(EnemyType)) {
        this.create(enemy);
      }
    }

    // 빌런 생성
    public create(enemytype: EnemyType) {
      const gameWidth = this.scene.game.canvas.width;
      const gameHeight = this.scene.game.canvas.height;

      const textureMap = {
        [EnemyType.ULTRON1]: ImageTexture.ULTRON1_NORMAL,
        [EnemyType.ULTRON2]: ImageTexture.ULTRON2_NORMAL,
        [EnemyType.ULTRON3]: ImageTexture.ULTRON3_NORMAL,
        [EnemyType.ROCK]: ImageTexture.ROCK_NORMAL,
      };

      // 빌런 생성
      const enemy = new Enemy(this.scene, 0, 0, textureMap[enemytype], enemytype);

      // 빌런 랜덤 위치 설정
      const targetWidth = enemy.displayWidth;
      const targetHeight = enemy.displayHeight;
      const randomY = Phaser.Math.Between(
        targetHeight / 2,
        gameHeight - targetHeight / 2
      );
      enemy.setPosition(gameWidth - targetWidth / 2, randomY);

      // 빌런 그룹에 추가
      this.enemies.add(enemy);
    }
  }
  ```

  콘텐츠 별로 미리 준비해둔 준비된 그룹 인스턴스(`enemies`)를 가져오고, 콘텐츠가 생성될 때마다 해당 그룹의 `add()`메서드로 인스턴스 실체 관리를 맡긴다.

  > [!note]
  > **Phaser.GameObjects.Group**
  > 그룹 내에 속한 객체들을 일괄적으로 처리할 수 있는 내장 클래스로서, 해당 그룹에 적용된 설정이나 기능은 그룹에 추가된 모든 객체에 자동으로 적용된다. 물리 기능의 그룹으로 사용할 경우 충돌 감지를 한번만 등록하더라도 그룹에 속한 모든 객체가 충돌 감지 대상이 된다.
  >
  > 특정 객체를 제거(destroy)할 경우 자동으로 그룹 명단에서도 제거되며, 앞으로 그룹에 추가(add)될 객체도 동일한 설정이나 기능이 자동으로 적용된다.

- **화면 표시**

  ```ts
  // scenes/playScene.ts
  import Phaser from 'phaser';
  import IronmanManager from '../managers/charaters/ironmanManager';
  ...

  export default class PlayScene extends Phaser.Scene {
    private ironmanManager!: IronmanManager;
    ...

    constructor() {
      super({ key: 'PlayScene' });
    }

    preload() {}

    create() {
      // 아이언맨 관리자
      this.ironmanManager = new IronmanManager(this, ...);
      ...
    }

  ...

  ```

  `Phaser.Scene` 내장 메서드인 `create()`는 해당 씬에 시작될 때 1회 호출된다. 이 메서드 내에서 매니저 인스턴스를 생성하면 화면에 콘텐츠를 구현할 수 있다.
