---
title: 속 빈 강정 — 자가학습·검증 루프, 함수는 있는데 왜 안 불렸나
description: 승격·메타루프·검증 루프를 구현한 함수 3개를 코드와 grep으로 뜯어, 설계는 멀쩡한데 런타임 호출처가 0인 이유를 실측한다.
track: notes
created: 2026-06-23T21:00
tags: [ai-agent, self-learning, verification]
---

에이전트 시스템을 굴리다 보면 "간판 기능이 잘 동작한다"는 보고와 "그 기능이 실제로 불린다"는 사실이 늘 같은 말은 아니라는 걸 알게 된다. 이번에 뜯어본 프로젝트가 정확히 그 간극을 보여줬다.

## 복리 지능이라는 엔진

이 프로젝트는 두 원리로 가치를 설명한다. **원리1**은 모든 산출물이 Library로 환류돼 시간이 갈수록 똑똑해진다는 <u>복리 지능</u>, **원리2**는 세션은 여럿이어도 뇌·정체성은 하나라는 <u>유기적 연결</u>이다.

> 이 두 원리의 엔진이 "검증된 지식의 복리 축적"인데, 그 축적을 담보하는 자가학습·검증 루프가 실제로는 배선되지 않았다(교훈 저장 0건). 즉 간판 원리가 실동작하지 않는다.

이 한 문장이 결론을 미리 말한다. 설계상 **자가학습**은 3층이다. A층(명시 교훈)은 "교훈:" 접두어를 감지해 저장하고, C층(자동 감지)은 교정 말투를 감지해 후보를 제안하며, 승격(SL-02)은 같은 교정이 K회 반복되면 규칙으로 굳힌다. **검증**은 3종이다. A 검토(작업자 자신), B 게이트(별도 세션, `source_facts` 대조), C 백그라운드에 더해, 루프(VF-06)가 worker↔verifier 라운드를 돌리다 합격선 미달이면 재작업시킨다. 여기까지는 기획서고, 문제는 코드로 내려갔을 때다.

## `promote.mjs` — 승격 로직은 멀쩡하다

```js
export const PROMOTE_THRESHOLD = 3;

export function promotionCandidates(occurrences, { threshold = PROMOTE_THRESHOLD } = {}) {
  const counts = new Map();
  for (const o of occurrences) counts.set(o.key, (counts.get(o.key) ?? 0) + 1);
  const candidates = [];
  for (const [key, count] of counts) if (count >= threshold) candidates.push({ key, count });
  return candidates;
}

export function shouldPromote(occurrences, key, { threshold = PROMOTE_THRESHOLD } = {}) {
  return occurrences.filter((o) => o.key === key).length >= threshold;
}
```

순수 결정론 함수다. LLM 호출이 없다. <u>같은 실수(key)가 3회 이상 쌓여야만</u> 승격 후보로 뽑혀, 한 번의 우연을 규칙으로 굳히는 과잉일반화를 막는다. 설계 의도가 코드에 정확히 반영돼 있다.

그런데 이 함수를 부르는 곳은 `app/sl02-measure.mjs` 단 하나뿐이다.

## `learning-meta.mjs` — 주석이 스스로 실토한 한계

```js
export function trendSlope(series) {
  const n = series.length;
  if (n < 2) return 0;
  const xs = series.map((_, i) => i);
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = series.reduce((a, b) => a + b, 0) / n;
  let num = 0, den = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - mx) * (series[i] - my);
    den += (xs[i] - mx) ** 2;
  }
  return den === 0 ? 0 : num / den;
}

export function adjustThreshold(current, recentRate, { target = 0.9, step = 0.05, min = 0.5, max = 0.99 } = {}) {
  const next = recentRate < target ? current + step : current;
  return Math.max(min, Math.min(max, Number(next.toFixed(4))));
}
```

`trendSlope`는 검출율 시계열의 선형회귀 기울기를 구하고, `adjustThreshold`는 최근 검출율이 목표(0.9) 아래면 합격선을 0.05씩 올려 더 엄격하게 만든다. `[0.5, 0.99]` 클램프까지 갖춘 완결된 로직이다.

그런데 파일 맨 위 주석이 스스로 예견해 놓았다.

> 실 추세 판정엔 운영 누적 시계열이 필요 — 여기선 메커니즘(기울기·조정 규칙)을 결정론으로 제공하고, 실 시계열 정량은 운영 누적 후로 미룬다(test-spec SL-04: 불확실 — 정량 없으면 정성 강등).

즉, 이 함수가 먹을 데이터를 쌓을 운영 루프 자체가 아직 없다는 걸 작성 시점부터 코드가 알고 있었다. 호출처는 역시 `app/sl04-measure.mjs` 하나뿐이다.

## `verify-loop.mjs` — 무한루프 방지까지 갖춘 설계

```js
export async function runVerifyLoop({ maxRounds = 3, attempt, verify }) {
  let prevDefects = [];
  for (let round = 1; round <= maxRounds; round++) {
    const product = await attempt(round, prevDefects);
    const v = await verify(product, round);
    if (!v.has_defects) {
      return { resolved: true, escalated: false, rounds: round, product, note: `${round}라운드에 검증 통과` };
    }
    prevDefects = v.defects || [];
  }
  return {
    resolved: false,
    escalated: true,
    rounds: maxRounds,
    note: `[미해결] 검증 ${maxRounds}라운드 반복에도 결함 잔존 — 자동 수정 중단, 지크 확인 필요`,
    lastDefects: prevDefects,
  };
}
```

작업자(`attempt`)와 검증자(`verify`)를 최대 3라운드 반복하고, <u>상한에 도달하면</u> 무한루프 대신 에스컬레이션으로 빠진다. 루프 제어는 결정론이고 LLM은 주입된 함수 안에서만 쓰인다는 설계 분리까지 명확하다. 파일 주석은 `attempt`·`verify` 둘 다 "실제=작업자 query·verify 에이전트, 측정=스텁"이 주입된다고 명시한다. 측정에서는 진짜 작업자·검증자가 아니라 스텁이 대신 들어간다는 뜻이다.

호출처는 `app/vf06-measure.mjs` 하나뿐이다.

## grep 전수조사 — 못을 박다

세 함수가 각각 `*-measure.mjs`에서만 불린다는 걸 확인으로 못박기 위해 런타임 경로 전체를 뒤졌다. `server.ts`, `drop-core.mjs`, `telegram-listener`, `terminal-adapter`, `backstage` 잡 어디에서도 이 세 함수를 import하지 않는다. 직접 재확인한 import 구문은 이렇다.

```js
// app/sl02-measure.mjs
import { promotionCandidates, shouldPromote, PROMOTE_THRESHOLD } from "./promote.mjs";
// app/sl04-measure.mjs
import { trendSlope, adjustThreshold } from "./learning-meta.mjs";
// app/vf06-measure.mjs
import { runVerifyLoop } from "./verify-loop.mjs";
```

이 세 줄이 이 세 함수가 시스템에서 불리는 **유일한** 자리다. `promote.mjs`·`learning-meta.mjs`·`verify-loop.mjs` 모두 런타임 호출처 0. 같은 계열의 `verify-roi.mjs`(과검증 ROI 게이팅)도, `lint-links.mjs`(서재 링크 Lint)도 자율 잡에 미배선이긴 마찬가지다.

비유하자면 이 함수들은 벤치 위에서 시동까지 걸어본 엔진이다. 회전수도 소음도 정상이지만, 그 엔진이 구동축에 연결돼 있지 않으면 아무리 잘 돌아도 차는 1밀리미터도 움직이지 않는다. 측정은 "엔진이 도는지"만 봤지 "바퀴로 연결됐는지"는 애초에 보지 않았다.

## 배선은 됐는데 데이터가 없는 층

대비할 게 하나 더 있다. 승격·메타루프·검증루프처럼 아예 안 불리는 게 아니라, **배선은 됐는데 실사용이 0인** 층도 있다. 자가학습 기본(A 명시 교훈·C 자동 감지)은 실제로 배선돼 있다. `server.ts:104`의 `detectCorrection`, `server.ts:207/210`의 `detectExplicitLesson`·`writeLesson`, `drop-core.mjs:196`의 `loadLessons()`(비서 프롬프트 주입)까지 코드 경로가 이어진다. 그런데 `memory/lessons/`에 저장된 교훈은 0건이다(README만 있다). 배선됐지만 한 번도 실사용되지 않았다.

더 심각한 정합 구멍도 있다. <u>교훈 캡처는 옛 `server.ts`(앱 채널 전용)에만 있고</u>, 앱·텔레그램·터미널 3채널을 통합한 채널중립 엔진 `drop-core.mjs`는 `loadLessons()`(주입)만 부른다.

> 게다가 캡처는 옛 server.ts(앱 채널)에만 있고 채널 중립 엔진 drop-core.mjs는 주입만 한다 → 텔레그램·터미널로 던진 교정은 교훈으로 저장조차 안 된다. 3채널 통합 때 자가학습 캡처가 따라오지 못한 정합 구멍.

## 왜 이렇게 됐나

소스가 스스로 밝힌 구조적 원인은 셋이다. 첫째, *design-now* 원칙의 그림자다. "설계·자리·트리거는 지금, 구현만 단계적으로"라는 원칙 자체는 옳았지만, 실제로는 함수 껍데기를 짓고 측정을 통과시킨 지점까지만 하고 그걸 "완료"로 보고했다. 둘째, 측정이 배선을 안 봤다. test-spec은 함수의 출력만 검증했고 "파이프라인에 꽂혀 실사용되는가"는 애초에 검증 항목에 없었다. 셋째, 단기 집중 작업의 밀도다. 검증·자가학습·비용·보안·개발팀 관련 태스크 5개가 2026-07-03 **하루**에 몰렸다. 각 함수를 짓고 측정을 통과시켰지만 런타임 배선 확인은 통째로 빠졌다.

> [!warn]
> 설계는 지금, 구현은 나중이라는 원칙과 "구현을 미룬 것"·"구현이 끝났다고 착각하는 것"은 한 끗 차이로 붙어 있다. 이 프로젝트가 넘어진 지점이 정확히 그 틈이다.

## 건질 것과 버릴 것

정직한 재분류가 먼저였다. 실제로 도는 것과 껍데기를 표로 갈라 "건질 것 지도"를 만들었는데, 자가학습 심화·검증 루프·개발팀 모드·보안 스캐너 껍데기 계열은 **버림**이었다. 대신 이식 가치가 있는 건 코드가 아니라 **패턴**과 **지식**이다 — 결정론 하드체크와 소프트 판정을 분리하는 패턴, "입구만 다르고 처리는 하나"라는 채널중립 엔진 발상, 실 API 지식, 운영 교훈 같은 것들이다.

> [!note]
> 헤르메스는 이 자리에 실물을 굴린다 — 칸반 디스패처, 워커 스폰, `task_runs`(재시도 이력), `consecutive_failures`(서킷브레이커), 교훈 축적 루프. 우리가 껍데기로 둔 "승격·메타루프·검증 루프"의 실동작 버전이 헤르메스엔 이미 있다. 이 프로젝트를 접고 헤르메스로 합치는 방향이 검토 중인 이유가 여기 있다.

## 착지

잘 설계된 결정론 함수라도 — 승격 임계값 3, 선형회귀 기울기, 상한 3라운드 재시도 루프 — 파이프라인에 단 한 줄의 import가 빠지면 그 함수는 시스템 안에서 존재하지 않는 것과 실질적으로 같다. **코드 품질과 시스템 동작은 서로 다른 축**이다.

> [!tip]
> 함수를 다 짜고 나면 "측정을 통과했나"뿐 아니라 "런타임 경로 어디선가 이 함수를 실제로 부르는가"까지 grep 한 줄로 확인하는 습관이 이 간극을 가장 싸게 막는다.

간판 기능일수록 검증이 허술해지기 쉽다는 것도 이번에 확인한 사실이다. 화려한 이름을 붙인 기능일수록, 그 이름값이 "이미 다 됐다"는 착시를 강화한다.
