/**
 * GitHub 알림 문법 콜아웃 → 콜아웃 박스 렌더링
 *
 *   > [!note] / > [!warn] / > [!tip]  (대소문자 무시, 3종 고정)
 *
 * blockquote를 <aside class="callout callout-{kind}" data-callout="{kind}">로 변환한다.
 * 매칭되지 않는 blockquote는 일반 인용(정의 박스)으로 그대로 둔다 — 콜아웃과 위계 구분.
 */
const CALLOUT_RE = /^\[!(note|warn|tip)\]\s*/i;

export default function remarkCallouts() {
  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      const first = node.children?.[0];
      if (!first || first.type !== 'paragraph') return;
      const text = first.children?.[0];
      if (!text || text.type !== 'text') return;

      const match = text.value.match(CALLOUT_RE);
      if (!match) return;

      const kind = match[1].toLowerCase();
      text.value = text.value.slice(match[0].length);
      // 마커만 있던 줄이면 빈 텍스트 노드 정리
      if (text.value === '' ) {
        first.children.shift();
        // 마커 뒤 줄바꿈으로 시작하는 경우 남는 break 노드 정리
        if (first.children[0]?.type === 'break') first.children.shift();
        if (first.children.length === 0) node.children.shift();
      }

      node.data = node.data ?? {};
      node.data.hName = 'aside';
      node.data.hProperties = {
        class: `callout callout-${kind}`,
        'data-callout': kind,
      };
    });
  };
}

// unist-util-visit 최소 구현 (blockquote만 필요 — 외부 의존 없이)
function visit(node, type, fn) {
  if (node.type === type) fn(node);
  if (node.children) for (const child of node.children) visit(child, type, fn);
}
