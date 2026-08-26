---
title: AI가 쓴 블로그에 필요한 이미지를 더한 방법
description: AI가 작성한 글에 정확한 정보와 시각적 이해를 함께 보태기 위해, 이미지 제작 방식을 나누고 집필 흐름에 넣은 경험을 다룬다.
track: log
created: 2026-07-24T12:54
tags: [ai-writing, blog, image-generation, diagram-as-code, automation]
cover: /assets/images/blog/adding-images-to-ai-written-blog-posts/cover.png
---

AI로 블로그 초안을 만드는 흐름은 잡혔지만, 글이 전부 문장으로만 끝나는 것은 아쉬웠다. 특히 여러 단계가 이어지는 내용은 구조도로 보여 주는 편이 읽기 쉽고, 글의 분위기를 먼저 보여 줄 때는 썸네일도 있으면 좋았다.

그래서 글마다 그림을 무조건 붙이려는 것이 아니라, **그림이 필요한 순간에 맞는 방식으로 준비하는 절차**를 집필 흐름에 넣어 보기로 했다. 이 글은 그때 이미지의 역할을 어떻게 나누고, AI가 쓰는 글에 어떤 방식으로 붙였는지 정리한 기록이다.

## 이미지 역할에 따라 제작 방식을 나눴다

처음에는 “글마다 그림 한 장을 만들자” 정도로 생각했다. 그러나 그림이 맡는 역할을 나누지 않으면, 화살표와 라벨이 있는 구조도까지 생성형 이미지로 만들게 된다.

그래서 이미지를 네 가지로 구분했다.

| 분류 | 제공 목적 | 제작 방식 |
|---|---|---|
| **썸네일** | 글의 주제와 분위기를 한눈에 보여 준다. | 생성형 이미지 |
| **삽화** | 본문의 핵심 내용을 한눈에 이해하도록 돕는다. | 생성형 이미지 |
| **구조도** | 구성 요소와 연결 흐름을 보여 준다. | D2 코드 렌더 |
| **인포그래픽** | 비교·분류·단계를 정리해 보여 준다. | SVG 직접 작성 |

<div style="display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:12px; margin:1.5rem 0;">
  <figure style="margin:0; text-align:center;">
    <img src="/assets/images/blog/adding-images-to-ai-written-blog-posts/thumbnail-example.png" alt="블로그 집필을 맡은 로봇과 이미지·구조도·인포그래픽을 함께 보여 주는 실제 썸네일 예시" style="width:100%; aspect-ratio:1; object-fit:cover; border-radius:10px;" />
    <figcaption style="margin-top:6px; color:var(--c-tx3); font-size:0.875rem;">썸네일</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="/assets/images/blog/adding-images-to-ai-written-blog-posts/metaphor-example.png" alt="엉킨 종이 띠가 깔때기를 지나 하나의 정돈된 띠로 이어지는 삽화 예시" style="width:100%; aspect-ratio:1; object-fit:cover; border-radius:10px;" />
    <figcaption style="margin-top:6px; color:var(--c-tx3); font-size:0.875rem;">삽화</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="/assets/images/blog/adding-images-to-ai-written-blog-posts/structure-example.png" alt="글 초안에서 구조도를 거쳐 독자에게 이해되는 흐름을 박스와 화살표로 보인 구조도 예시" style="width:100%; aspect-ratio:1; object-fit:contain; border-radius:10px; background:#17100e;" />
    <figcaption style="margin-top:6px; color:var(--c-tx3); font-size:0.875rem;">구조도</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="/assets/images/blog/adding-images-to-ai-written-blog-posts/infographic-example.png" alt="이미지 선택 기준을 두 단계 카드로 나눈 인포그래픽 예시" style="width:100%; aspect-ratio:1; object-fit:cover; border-radius:10px;" />
    <figcaption style="margin-top:6px; color:var(--c-tx3); font-size:0.875rem;">인포그래픽</figcaption>
  </figure>
</div>

판단 기준은 간단했다.

> 본문의 구조와 내용을 정확히 전달해야 하는 그림은 코드로 만들고, 글의 주제나 핵심 내용을 한눈에 이해시키는 그림은 생성형 이미지로 만든다.

먼저, 그림만 보고도 흐름·단계·비교를 이해해야 하는 경우에는 박스와 화살표, 문구가 본문과 정확히 맞아야 한다. 이 요소가 하나라도 달라지면 독자는 다른 내용을 읽게 된다. 그래서 구조도와 인포그래픽은 생성형 이미지로 만들지 않았다.

D2와 SVG를 쓰면 필요한 박스·화살표·문구를 코드로 직접 적어 이미지로 만들 수 있다. 본문을 고치면 같은 소스를 바로 수정해 이미지를 다시 만들 수 있으므로, 정보 그림을 더 빠르고 정확하게 관리할 수 있었다. 반대로 썸네일과 삽화는 세부 구조를 설명하는 대신 글의 주제나 핵심 장면을 한눈에 보여 주는 역할이어서 생성형 이미지를 썼다.

> **D2**는 박스와 선을 텍스트 코드로 적으면 구조도 이미지로 바꿔 주는 도구다. **SVG**는 도형·선·문구를 코드로 직접 작성하는 이미지 형식이다.

## 집필 지침에 이미지 제작을 넣었다

> **베르톨트**는 헤르메스에서 블로그 글 작성과 이미지 제작을 맡은 앱이다.

글을 쓴 뒤 내가 이미지를 따로 요청하는 방식으로 두지 않았다. 베르톨트가 읽는 집필 지침에 썸네일·본문 이미지 제작과 결과 확인을 함께 적어 뒀다.

```text
[이미지]
- 썸네일(필수 1장): 글의 핵심 은유 1개를 `image_generate`로 만든다.
- 구조도(0~2장): 아키텍처·흐름 설명 지점이 있으면 D2로 만든다.
- 인포그래픽(0~2장): 분류·비교·단계 정리 지점이 있으면 SVG로 만든다.
- 판단 기준: "이 이미지를 빼면 독자가 잃는 게 있는가?" 없으면 안 넣는다.
- 렌더·생성 결과는 반드시 눈으로 확인한다.
  글자 겹침·오배선·스타일 이탈이 있으면 수정 후 재시도한다.
```

<img src="/assets/images/blog/adding-images-to-ai-written-blog-posts/bertholdt-image-step.png" alt="글 본문 작성 뒤 썸네일을 만들고, 내용에 따라 구조도와 인포그래픽을 추가한 뒤 결과를 확인하는 흐름" />

썸네일은 모든 글에 한 장씩 만들게 했다. 반면 구조도와 인포그래픽은 글에 각각 흐름·관계, 분류·비교·단계를 설명할 지점이 있을 때만 추가하게 했다. 만든 뒤에는 글자 겹침, 화살표 오류, 스타일 이탈을 직접 확인하도록 했다.

## 이미지 스타일도 정해 뒀다

이미지 제작 방식만 정해 두면 글마다 결과의 분위기가 달라질 수 있었다. 그래서 여러 후보를 직접 비교한 뒤, 베르톨트가 생성형 이미지를 만들 때 따를 스타일 지침을 따로 남겼다.

```text
Soft 3D clay illustration for a tech blog thumbnail. Matte clay material,
gently rounded edges, soft studio lighting — but composed like clean flat
editorial design: one central metaphor, moderate element count, generous
empty space. Scene: [SUBJECT]. 5-6 elements total, subjects large and
readable, thin dotted lines may connect related elements. Very dark warm
brown background (#17100e), cream (#f3eae6), coral red (#ff5247) as the
main accent, one tiny warm amber (#ffb84d) detail allowed. No floor, no
props, no clutter. Absolutely no text, letters, or numbers anywhere.
```

- **질감과 형태**: 말랑한 클레이 재질과 둥근 형태를 쓴다.
- **구성**: 글의 핵심을 한 장면으로 잡고, 요소 수를 줄이며 여백을 충분히 둔다.
- **색과 텍스트**: 어두운 갈색 바탕에 크림색과 코랄 레드 포인트를 쓰고, 글자·숫자는 넣지 않는다.

생성형 이미지라 결과는 매번 조금씩 달라진다. 그래도 이 지침을 쓰면 질감·색·구성이 비슷하게 유지돼, 글마다 전혀 다른 화풍의 그림이 나오지는 않는다.

## 글에 필요한 그림을 적절한 자리에 더했다

글만 이어진 블로그는 조금 밋밋하게 느껴졌다. 글을 꾸미려고 그림을 아무 데나 붙이는 대신, 주제를 먼저 보여 줄 때는 썸네일을 넣고 문장만으로는 흐름이나 비교를 따라가기 어려운 곳에는 구조도와 인포그래픽을 더하고 싶었다.

그래서 AI가 글을 작성할 때 그 글에 필요한 그림도 함께 준비하도록 했다. 이미지가 글의 고명처럼 보이되, 읽는 데 도움이 되는 위치에만 올라가도록 한 것이다.
