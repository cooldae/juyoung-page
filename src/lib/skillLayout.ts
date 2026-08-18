import { SKILL_MAP } from "../data/skillmap";

/* ============================================================
   지도 배치 — 방사형 계통도

   항목 하나가 각도 한 칸을 독점합니다. 이름은 그 각도 방향으로
   바깥을 향해 눕히므로 구조적으로 겹칠 수 없습니다.
   (부채꼴에 몰아넣고 이름을 아래에 붙이면 전부 포개집니다)

   분야 사이에는 빈 칸을 넣어 덩어리가 눈으로 갈라져 보이게 했습니다.
   ============================================================ */

export type Node = {
  id: string;
  label: string;
  angle: number; // 라디안
  radius: number;
  x: number;
  y: number;
  kind: "root" | "group" | "item";
  group: number;
  link?: string;
  desc?: string;
};

export type Edge = {
  path: string;
  group: number;
  toKind: Node["kind"];
};

const R_GROUP = 640;
const R_ITEM = 1520;
const GAP_SLOTS = 2.4; // 분야 사이 빈 칸
const LABEL_PAD = 430; // 이름이 삐져나갈 여유

const polar = (r: number, a: number) => ({ x: Math.cos(a) * r, y: Math.sin(a) * r });

/** 부모 반지름을 따라 호를 그린 뒤 바깥으로 뻗는 선.
 *  계통도에서 쓰는 형태라 어느 가지에 붙었는지가 눈에 바로 들어옵니다. */
function elbow(rFrom: number, aFrom: number, rTo: number, aTo: number) {
  const p1 = polar(rFrom, aFrom);
  const p2 = polar(rFrom, aTo);
  const p3 = polar(rTo, aTo);
  const sweep = aTo > aFrom ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${rFrom} ${rFrom} 0 0 ${sweep} ${p2.x} ${p2.y} L ${p3.x} ${p3.y}`;
}

export function buildGraph() {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const totalSlots =
    SKILL_MAP.reduce((n, g) => n + g.items.length, 0) + SKILL_MAP.length * GAP_SLOTS;
  const step = (Math.PI * 2) / totalSlots;

  const root: Node = {
    id: "root",
    label: "개발",
    angle: 0,
    radius: 0,
    x: 0,
    y: 0,
    kind: "root",
    group: -1,
  };
  nodes.push(root);

  let slot = GAP_SLOTS / 2;

  SKILL_MAP.forEach((g, gi) => {
    const first = slot;
    const itemNodes: Node[] = [];

    g.items.forEach((label, ii) => {
      const angle = (slot + 0.5) * step - Math.PI / 2;
      const p = polar(R_ITEM, angle);
      const node: Node = {
        id: `g${gi}i${ii}`,
        label,
        angle,
        radius: R_ITEM,
        x: p.x,
        y: p.y,
        kind: "item",
        group: gi,
      };
      nodes.push(node);
      itemNodes.push(node);
      slot += 1;
    });

    // 분야는 자기 항목들의 한가운데 각도에 놓습니다
    const gAngle = ((first + g.items.length / 2) * step) - Math.PI / 2;
    const gp = polar(R_GROUP, gAngle);
    const groupNode: Node = {
      id: `g${gi}`,
      label: g.title,
      angle: gAngle,
      radius: R_GROUP,
      x: gp.x,
      y: gp.y,
      kind: "group",
      group: gi,
      link: g.link,
      desc: g.desc,
    };
    nodes.push(groupNode);

    edges.push({ path: elbow(0, gAngle, R_GROUP, gAngle), group: gi, toKind: "group" });
    for (const it of itemNodes) {
      edges.push({ path: elbow(R_GROUP, gAngle, R_ITEM, it.angle), group: gi, toKind: "item" });
    }

    slot += GAP_SLOTS;
  });

  const span = R_ITEM + LABEL_PAD;
  const bounds = { x: -span, y: -span, w: span * 2, h: span * 2 };

  return { nodes, edges, bounds, groupCount: SKILL_MAP.length, itemCount: totalSlots };
}

/** 이름을 각도 방향으로 눕힙니다. 왼쪽 절반은 뒤집어야 거꾸로 읽히지 않습니다. */
export function labelTransform(n: Node, offset: number) {
  const deg = (n.angle * 180) / Math.PI;
  const flip = Math.cos(n.angle) < 0;
  const r = n.radius + offset;
  return {
    transform: `rotate(${deg}) translate(${r} 0)${flip ? " rotate(180)" : ""}`,
    anchor: flip ? ("end" as const) : ("start" as const),
  };
}

/** 분야마다 다른 색. 어두운 배경에서 읽히도록 밝기를 맞췄습니다. */
export function groupColor(gi: number, total: number) {
  if (gi < 0) return "#e8d9c4";
  const hue = Math.round((gi / total) * 360);
  return `hsl(${hue} 60% 66%)`;
}
