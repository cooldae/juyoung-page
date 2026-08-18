import { SKILL_MAP } from "../data/skillmap";

/* ============================================================
   지도 배치 계산

   가운데 뿌리 하나 → 분야 19개가 둘레에 → 각 분야 주위로 용어들이
   고리를 이루며 퍼집니다. 좌표를 손으로 적지 않아도 되도록
   항목을 추가하면 자동으로 자리가 잡힙니다.
   ============================================================ */

export type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  kind: "root" | "group" | "item";
  group: number; // 분야 번호 (root 는 -1)
  link?: string;
  desc?: string;
};

export type Edge = { a: Node; b: Node };

const R_GROUP = 1100; // 가운데에서 분야까지
const RING_R = [150, 250, 350]; // 분야에서 고리까지
const RING_CAP = [9, 15, 21]; // 고리별 최대 개수
const SPREAD = 0.42; // 분야 하나가 차지하는 각도 (라디안, 좌우 각각)

export function buildGraph() {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const root: Node = {
    id: "root",
    label: "개발",
    x: 0,
    y: 0,
    kind: "root",
    group: -1,
  };
  nodes.push(root);

  SKILL_MAP.forEach((g, gi) => {
    // 12시 방향부터 시계방향으로
    const theta = -Math.PI / 2 + (gi / SKILL_MAP.length) * Math.PI * 2;

    const groupNode: Node = {
      id: `g${gi}`,
      label: g.title,
      x: Math.cos(theta) * R_GROUP,
      y: Math.sin(theta) * R_GROUP,
      kind: "group",
      group: gi,
      link: g.link,
      desc: g.desc,
    };
    nodes.push(groupNode);
    edges.push({ a: root, b: groupNode });

    // 항목을 고리에 순서대로 채웁니다
    let index = 0;
    let prevRing: Node[] = [groupNode];

    for (let r = 0; r < RING_R.length && index < g.items.length; r++) {
      const remaining = g.items.length - index;
      const count = Math.min(RING_CAP[r], remaining);
      const ring: Node[] = [];

      for (let j = 0; j < count; j++) {
        // 분야에서 바깥을 향한 방향을 중심으로 부채꼴로 펼칩니다
        const t = count === 1 ? 0 : j / (count - 1) - 0.5;
        const angle = theta + t * SPREAD * 2;
        const node: Node = {
          id: `g${gi}i${index}`,
          label: g.items[index],
          x: groupNode.x + Math.cos(angle) * RING_R[r],
          y: groupNode.y + Math.sin(angle) * RING_R[r],
          kind: "item",
          group: gi,
        };
        nodes.push(node);
        ring.push(node);

        // 안쪽 고리에서 각도가 가장 가까운 노드에 잇습니다
        let parent = prevRing[0];
        let best = Infinity;
        for (const p of prevRing) {
          const d = (p.x - node.x) ** 2 + (p.y - node.y) ** 2;
          if (d < best) {
            best = d;
            parent = p;
          }
        }
        edges.push({ a: parent, b: node });
        index++;
      }

      prevRing = ring;
    }
  });

  // 전체를 담는 사각형
  const pad = 220;
  const xs = nodes.map((n) => n.x);
  const ys = nodes.map((n) => n.y);
  const bounds = {
    x: Math.min(...xs) - pad,
    y: Math.min(...ys) - pad,
    w: Math.max(...xs) - Math.min(...xs) + pad * 2,
    h: Math.max(...ys) - Math.min(...ys) + pad * 2,
  };

  return { nodes, edges, bounds, groupCount: SKILL_MAP.length };
}

/** 분야마다 다른 색. 어두운 배경에서 읽히도록 밝기를 맞췄습니다. */
export function groupColor(gi: number, total: number) {
  if (gi < 0) return "#e8d9c4";
  const hue = Math.round((gi / total) * 360);
  return `hsl(${hue} 58% 64%)`;
}
