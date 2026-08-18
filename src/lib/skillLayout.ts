import { SKILL_MAP } from "../data/skillmap";

/* ============================================================
   지도 배치 — 가로로 놓인 상자들

   글자를 눕히면 읽기 힘들어서 이름을 가로로 둔 상자로 만들고,
   상자끼리 겹치면 서로 밀어내도록 했습니다.

   글자 폭은 어림하지 않고 화면에 한 번 그려서 잰 값을 씁니다.
   (짧은 영문 이름은 어림값이 두 배 가까이 어긋납니다)

   자리를 손으로 정하지 않습니다. 분야 쪽으로 당기는 힘과 겹치면
   밀어내는 힘을 반복하면 알아서 자리가 잡힙니다. 그래서 반듯하게
   정렬되지는 않지만 겹치지 않습니다.
   ============================================================ */

export type Kind = "root" | "group" | "item";

export type Box = {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: Kind;
  group: number;
  anchorX: number;
  anchorY: number;
  link?: string;
  desc?: string;
};

export type Edge = { ax: number; ay: number; bx: number; by: number; group: number; strong: boolean };

export const FONT = { root: 30, group: 21, item: 15 } as const;

const R_GROUP = 660;
const SPIRAL = 52;
const GAP = 10;

/** 화면에서 잰 글자 폭을 찾을 때 쓰는 열쇠 */
export const widthKey = (kind: Kind, label: string) => `${kind}|${label}`;

/** 지도에 올라갈 모든 이름 — 폭을 재기 위해 미리 한 번 그립니다 */
export function allLabels(): { key: string; label: string; kind: Kind }[] {
  const out = [{ key: widthKey("root", "개발"), label: "개발", kind: "root" as Kind }];
  SKILL_MAP.forEach((g) => {
    out.push({ key: widthKey("group", g.title), label: g.title, kind: "group" });
    g.items.forEach((label) => out.push({ key: widthKey("item", label), label, kind: "item" }));
  });
  return out;
}

function makeBox(
  id: string,
  label: string,
  kind: Kind,
  group: number,
  x: number,
  y: number,
  textW: number
): Box {
  const fs = FONT[kind];
  const padX = kind === "item" ? 12 : 16;
  const padY = kind === "item" ? 7 : 10;
  const dotArea = kind === "item" ? 22 : 29; // 왼쪽 점 + 간격
  return {
    id,
    label,
    x,
    y,
    w: textW + dotArea + padX * 2,
    h: fs * 1.45 + padY * 2,
    kind,
    group,
    anchorX: x,
    anchorY: y,
  };
}

export function buildGraph(widths: Map<string, number>) {
  const W = (kind: Kind, label: string) => widths.get(widthKey(kind, label)) ?? label.length * 9;

  const boxes: Box[] = [];
  const root = makeBox("root", "개발", "root", -1, 0, 0, W("root", "개발"));
  boxes.push(root);

  const groupBoxes: Box[] = [];

  SKILL_MAP.forEach((g, gi) => {
    const theta = -Math.PI / 2 + (gi / SKILL_MAP.length) * Math.PI * 2;
    const gx = Math.cos(theta) * R_GROUP;
    const gy = Math.sin(theta) * R_GROUP;

    const gb = makeBox(`g${gi}`, g.title, "group", gi, gx, gy, W("group", g.title));
    gb.link = g.link;
    gb.desc = g.desc;
    boxes.push(gb);
    groupBoxes.push(gb);

    // 분야 바깥쪽을 향해 나선으로 뿌립니다
    g.items.forEach((label, ii) => {
      const t = ii + 1;
      const a = theta + t * 2.399; // 황금각
      const r = SPIRAL * Math.sqrt(t) * 1.75;
      boxes.push(
        makeBox(`g${gi}i${ii}`, label, "item", gi, gx + Math.cos(a) * r, gy + Math.sin(a) * r, W("item", label))
      );
    });
  });

  relax(boxes);

  const edges: Edge[] = [];
  for (const b of boxes) {
    if (b.kind === "group") {
      edges.push({ ax: root.x, ay: root.y, bx: b.x, by: b.y, group: b.group, strong: true });
    } else if (b.kind === "item") {
      const g = groupBoxes[b.group];
      edges.push({ ax: g.x, ay: g.y, bx: b.x, by: b.y, group: b.group, strong: false });
    }
  }

  const pad = 80;
  const minX = Math.min(...boxes.map((b) => b.x - b.w / 2)) - pad;
  const maxX = Math.max(...boxes.map((b) => b.x + b.w / 2)) + pad;
  const minY = Math.min(...boxes.map((b) => b.y - b.h / 2)) - pad;
  const maxY = Math.max(...boxes.map((b) => b.y + b.h / 2)) + pad;

  return {
    boxes,
    edges,
    bounds: { x: minX, y: minY, w: maxX - minX, h: maxY - minY },
    groupCount: SKILL_MAP.length,
    itemCount: boxes.filter((b) => b.kind === "item").length,
    overlaps: countOverlaps(boxes),
  };
}

function overlapOf(A: Box, B: Box) {
  const ox = (A.w + B.w) / 2 + GAP - Math.abs(A.x - B.x);
  const oy = (A.h + B.h) / 2 + GAP - Math.abs(A.y - B.y);
  return ox > 0 && oy > 0 ? { ox, oy } : null;
}

/** 1단계: 분야로 당기면서 밀어내기 (당기는 힘은 점점 약하게)
 *  2단계: 당기지 않고 겹침이 사라질 때까지 밀어내기 */
function relax(boxes: Box[]) {
  const idx = boxes.map((_, i) => i);
  const maxHalfW = Math.max(...boxes.map((b) => b.w)) / 2;

  const weight = (b: Box) => (b.kind === "root" ? 0 : b.kind === "group" ? 0.3 : 1);

  const separate = (strength = 1) => {
    idx.sort((a, c) => boxes[a].x - boxes[c].x);
    let moved = 0;
    for (let i = 0; i < idx.length; i++) {
      const A = boxes[idx[i]];
      const limit = A.w / 2 + maxHalfW + GAP;
      for (let j = i + 1; j < idx.length; j++) {
        const B = boxes[idx[j]];
        if (B.x - A.x > limit) break;
        const o = overlapOf(A, B);
        if (!o) continue;
        moved++;

        const wA = weight(A);
        const wB = weight(B);
        const sum = wA + wB || 1;

        if (o.ox < o.oy) {
          const s = (A.x <= B.x ? 1 : -1) * o.ox * strength;
          A.x -= (s * wA) / sum;
          B.x += (s * wB) / sum;
        } else {
          const s = (A.y <= B.y ? 1 : -1) * o.oy * strength;
          A.y -= (s * wA) / sum;
          B.y += (s * wB) / sum;
        }
      }
    }
    return moved;
  };

  for (let step = 0; step < 260; step++) {
    const pull = 0.05 * (1 - step / 260);
    for (const b of boxes) {
      if (b.kind !== "item") continue;
      b.x += (b.anchorX - b.x) * pull;
      b.y += (b.anchorY - b.y) * pull;
    }
    separate();
  }

  // 겹침이 사라질 때까지. 서로 밀치며 진동하는 짝이 남으므로
  // 겹친 만큼보다 조금 더 밀어 결판을 냅니다.
  for (let step = 0; step < 1400; step++) {
    const strength = step < 400 ? 1 : step < 900 ? 1.25 : 1.6;
    if (separate(strength) === 0) break;
  }
}

export function countOverlaps(boxes: Box[]) {
  let n = 0;
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const A = boxes[i];
      const B = boxes[j];
      if (
        Math.abs(A.x - B.x) < (A.w + B.w) / 2 - 0.5 &&
        Math.abs(A.y - B.y) < (A.h + B.h) / 2 - 0.5
      ) {
        n++;
      }
    }
  }
  return n;
}

/** 분야마다 다른 색. 어두운 배경에서 읽히도록 밝기를 맞췄습니다. */
export function groupColor(gi: number, total: number) {
  if (gi < 0) return "#e8d9c4";
  const hue = Math.round((gi / total) * 360);
  return `hsl(${hue} 62% 68%)`;
}
