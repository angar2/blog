---
title: 멀티플레이 재접속 버그 5종 대응 기록
description: 재접속(reconnect) 기능 하나를 얹었더니 타이머·상대 패널·카운트다운·스테이지·재고까지 다섯 갈래에서 상태가 어긋났다. burger-stack에서 이틀에 걸쳐 순차로 잡아낸 과정을 정리한다.
track: log
created: 2026-04-12T09:00
tags: [game-dev, socketio, multiplayer, debugging]
---

**burger-stack**은 레시피 순서대로 키를 눌러 버거를 쌓는 브라우저 게임이다. *Phaser3*와 TypeScript로 만든 클라이언트가 화면을 그리고, *Socket.io*로 붙은 NestJS 서버(`burger-stack-server`, 별도 리포)가 실시간 대전을 중계한다. 스테이지가 오르면 재료가 해금되고, 레시피대로 재료를 스택에 쌓으면 콤보 점수가 붙는 구조다.

이 글은 이 게임에 **재접속**(*reconnect*) 기능을 처음 얹으면서 겪은 일을 정리한다. 게임 도중 브라우저를 새로고침하면 클라이언트는 서버에 다시 `room:join`해야 하고, 서버는 그 플레이어의 스테이지·점수·스택·타이머 기준시각을 통째로 다시 내려줘야 하며, 상대방 화면의 **상대 패널**(`OpponentPanel`)도 끊긴 적 없는 것처럼 계속 갱신돼야 한다. 계획은 버그 2개로 시작했지만, <u>하나를 고칠 때마다 다음 층위에서 다른 증상이 튀어나와</u> 2026-04-12부터 04-13까지 이틀에 걸쳐 다섯 갈래로 번졌다.

## 타이머가 처음부터 다시 도는 문제

가장 먼저 잡은 건 타이머였다. 재접속하면 진행 중이던 스테이지 타이머가 경과 시간을 무시하고 0부터 다시 돌았다.

원인은 서버 `gameState`에 스테이지 시작 시각이 없었다는 것이다. 그래서 클라이언트 `timerBar.start()`는 항상 0부터 시작할 수밖에 없었다. 타이머는 스톱워치와 같다. 재접속은 스톱워치를 새로 사는 일이 아니라, 이미 흐른 시간을 다시 입력해 이어 붙이는 일이어야 한다.

수정은 서버에 `stageStartAt: number`(unix ms) 필드를 추가하고 game:start·stage-clear·stage-timeout 세 시점 모두에서 갱신하는 것이었다. 클라이언트는 `Date.now() - gameState.stageStartAt`으로 `initialElapsedMs`를 계산해 `TimerBar.start()`에 다섯 번째 인자로 넘긴다. `MultiPlayScene`엔 `reconnectElapsedMs` 필드를 두어 재접속 첫 스테이지에만 이 값을 적용하고 곧바로 `null`로 되돌렸다. 이 필드는 뒤에서 카운트다운 버그를 잡는 판별 기준으로 다시 쓰인다.

## 상대 패널이 사라졌다 두 개가 됐다 멈추는 문제

두 번째로 계획했던 버그는 상대 패널 미표시였는데, 고치는 과정에서 3단계로 진화했다.

### 1단계 — 패널 자체가 안 생긴다

재접속 응답(ack)에 `players` 배열 자체가 없어 상대 패널이 아예 생성되지 않았다. `room.gateway.ts`의 재접속 ack에 `players: [{ socketId, nickname }]`를 추가해 해결했다.

### 2단계 — 패널이 두 개가 된다

이후 상대의 스테이지·점수·스택까지 즉시 복구해야 한다는 요구가 붙으면서 `players[]`에 `currentStageIndex`·`totalScore`·`stackIngredients`를 확장했다. 그런데 이 확장 이후, A·B 두 플레이어가 게임을 시작한 상태에서 A가 새로고침하면 B 화면에 A 패널이 2개 뜨는 버그가 생겼다. 원인은 `MultiLobbyScene`이 `game:start` 이벤트에서 확장 전 필드를 가진 오래된 `currentPlayers`를 그대로 `MultiPlayScene`에 넘기고 있었다는 것이다. `GameStartPlayer` 인터페이스를 신설하고 `handleGameStart()`에서 모든 플레이어를 초기 상태로 재구성해 넘기도록 고쳤다.

### 3단계 — 패널이 갱신되지 않는다

A가 새로고침 후 재료를 쌓아도 B 화면의 A 패널이 움직이지 않는 문제였다. 원인은 세 겹이었다. <u>재접속 시 socketId가 변하는 Socket.io 특성</u> 때문에 `opponentPanels` Map에 새 키가 없었고, `handlePlayerState()`는 패널을 못 찾으면 곧장 `return`해 버렸다. 이 소스에서 socketId 변경이 명시적 원인으로 지목된 버그는 이 한 곳뿐이다.

해법은 새 소켓마다 새 패널을 만드는 게 아니라, 같은 `nickname`을 가진 기존 패널을 찾아 Map의 **키만** 새 socketId로 바꿔 다는 것이었다(패널 객체와 화면 위치는 그대로 유지). 즉, 재접속으로 바뀐 건 신원 확인표(socketId)일 뿐이니 표만 갈아 끼우면 된다는 판단이다. 이를 위해 `OpponentPanel`에 `getNickname()`을 추가했다.

## 카운트다운이 다시 뜨는 문제

재접속인데도 시작 카운트다운(3,2,1)이 또 뜨는 버그는 두 차례 수정했다.

1차 수정(04-12)에서는 재접속을 감지하면 `isFirstStage` 플래그를 꺼서 막았다.

```typescript
const isReconnect = initData?.initialStageIndex !== undefined;
if (isReconnect) {
  this.isFirstStage = false;
}
```

그런데 다음 날 같은 증상이 재발했다. <u>`create()`에서 플래그를 설정하기 전에 `PlayScene`이 `startStage()`를 먼저 불러버려</u> 플래그 상태가 혼동됐기 때문이다. 2차 수정은 플래그를 아예 믿지 않고, `startStage()` 호출 시점에 이미 확실한 값으로 직접 판단하도록 바꿨다.

```typescript
const isReconnect = this.reconnectElapsedMs !== null;
if (this.isFirstStage && !isReconnect) {
  // 카운트다운 실행
} else {
  // 즉시 게임 시작
}
```

> *"reconnectElapsedMs는 재접속 시에만 초기값(non-null)을 가짐"* · *"startStage() 호출 시점에 직접 판단하므로 플래그 중복 설정 문제 회피"*

같은 증상이 두 번 나왔다는 건 1차 수정이 표면만 건드렸다는 뜻이다. 플래그를 언제, 어떤 순서로 읽는지까지 보지 않았던 게 재발의 원인이었다.

## 스테이지가 통째로 리셋되는 심각한 버그

> [!warn]
> 소스는 이 버그를 직접 **"기존 진행 중인 스테이지를 잃음 (심각한 버그)"**라고 표기했다.

새로고침 후 재접속하면 스테이지가 무조건 1부터 다시 시작했다. 원인은 `PlayScene.create()`가 신규 `stageManager`를 기본값(`currentStage=1`)으로 생성하는데, 재접속 시 `initialStageIndex`를 `currentStageIndex` 필드에만 반영하고 정작 `stageManager.currentStage`는 갱신하지 않았다는 것이다. `MultiPlayScene.create()`에서 재접속 시 `stageManager.currentStage = initData.initialStageIndex + 1`(0-based recipes 인덱스 → 1-based 게임 스테이지 번호)로 맞춰 해결했다.

`stageManager.currentStage`는 난이도 스펙(`getDifficultySpec()`)과 해금 재료(`getUnlockedIngredients(stage)`) 결정, HUD 갱신에까지 쓰인다. 즉, 이 값 하나가 안 맞으면 그 값을 참조하는 곳마다 다른 얼굴의 버그가 튀어나온다 — 실제로 파생 버그가 두 건 더 나왔다.

**초기값 깜빡임**: 재접속 직후 잠깐 스테이지1·스코어0이 보였다가 뒤늦게 진짜 값으로 바뀌었다. `PlayScene.create()`의 `startStage()` 호출이 HUD를 초기값으로 먼저 갱신해버리고, 그 뒤 `stageManager`/`scoreManager`를 재설정해도 HUD는 따라오지 않았기 때문이다. 상태 복구 직후 `hud.updateHUD(stage, score, comboCount)`를 명시적으로 재호출해 고쳤다.

**재료 해금 상태 미복구**: 스테이지 7에서 새로고침하면 토마토 같은 해금 재료가 다시 안 보였다. `getUnlockedIngredients(stage)`가 호출되는 시점엔 아직 `stageManager.currentStage`가 1이었고, 이후 값을 바꿔도 이미 그려진 `tileGrid`의 해금 상태는 따라 바뀌지 않았다. 재접속 상태 복구 시 현재 스테이지 기준으로 `getUnlockedIngredients(stage)`를 재실행하고 `tileGrid.setAvailable(unlocked)`를 다시 호출했다.

## 재고에서 BUN_BOTTOM이 사라지는 문제

마지막 버그는 원인이 클라이언트와 서버 양쪽에 하나씩 있었다.

클라이언트 쪽: 재접속하면 스택이 `['BUN_BOTTOM']`으로 리셋되는데, `startStage()`가 이 리셋을 `emitStackUpdate()`로 알리지 않았다. 그 상태에서 재료를 계속 쌓으면 상대 화면엔 BUN_BOTTOM 없이 얹은 재료만 보였다. 스택 초기화 직후 `emitStackUpdate()` 호출을 추가해 고쳤다.

서버 쪽: 그런데도 BUN_BOTTOM이 계속 사라졌다. 서버가 `game:player-state`를 브로드캐스트할 때 `stackIngredients`에서 BUN_BOTTOM을 **의도적으로 제외**하고 있었던 것이다. 서버 팀에 보낸 요청은 이랬다.

> *"game:player-state에서 stackIngredients를 브로드캐스트할 때 BUN_BOTTOM을 제외하지 말고 전체 배열을 그대로 보내주세요."*

`game.service.ts`·`room.gateway.ts` 수정 후 확인을 마쳤다.

## 최종 테스트와 남은 일

2026-04-13, 마지막으로 확인한 결과는 다음과 같다.

- 첫 진입: opponent panels 정확히 2개 표시
- 카운트다운: 3-2-1 정상 표시
- 타이머: 게임 중 계속 차감(카운트다운 중에도 정상)
- 재접속: 패널이 중복되지 않고 기존 위치 유지
- 실시간 동기화: A가 재접속 후 재료 쌓을 때 B의 패널이 실시간 업데이트
- 스택 상태: BUN_BOTTOM 포함 전체 스택 정상 표시

다만 여기서 끝나지 않는다. 다음 태스크로 이월된 것만 셋이다.

- 플레이어 연결 끊김 처리(3초 대기 후 자동 제거)
- 연결 끊김 상태 UI 표시(`OpponentPanel`에 텍스트)
- 재연결 후 게임 재개 기능

## 재접속이 가르쳐준 것

이틀 동안 열 차례 넘게 수정을 거치며 남은 결론은 하나다. **재접속은 다시 연결되는 이벤트가 아니라, 서버와 클라이언트에 흩어진 여러 상태를 동시에 다시 맞추는 문제다.** 이번에 맞춰야 했던 상태만 해도 타이머 기준시각(`stageStartAt`), 상대 플레이어 목록(`players[]`), 씬 플래그(`isFirstStage`), 스테이지 번호(`stageManager.currentStage`), 재료 해금 상태(`tileGrid`), 재고 배열(`stackIngredients`) 여섯 가지였다. 즉, socketId 변경은 이 여러 어긋남 중 <u>상대 패널이 Map 키를 잃어버리는 딱 한 사례</u>였을 뿐, 다섯 버그 전체를 관통하는 단일 원인은 아니었다.

같은 이유로, 소켓 재연결로 식별자가 바뀌는 문제는 앞으로도 반복될 수 있다. `socketId`를 키로 쓰는 자료구조는 재접속 한 번에 그 키가 통째로 무효화된다는 걸 이번에 확인했다. 해법은 새 키로 새 객체를 만드는 게 아니라, 같은 사람인지 다른 단서(닉네임)로 확인해 기존 객체의 키만 옮기는 쪽이었다. 그리고 카운트다운 버그가 보여줬듯, 같은 증상이 두 번 나온다면 이전 수정이 원인이 아니라 표면만 건드렸다는 신호로 봐야 한다.
