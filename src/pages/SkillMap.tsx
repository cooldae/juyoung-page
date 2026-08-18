import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { buildGraph, groupColor, labelTransform, type Node } from "../lib/skillLayout";
import { useDocumentTitle } from "../hooks/useReveal";

type View = { x: number; y: number; w: number; h: number };

const MIN_W = 500;
const MAX_W = 8000;

export default function SkillMap() {
  const { nodes, edges, bounds, groupCount } = useMemo(() => buildGraph(), []);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [view, setView] = useState<View>(bounds);
  const [query, setQuery] = useState("");
  const [hover, setHover] = useState<Node | null>(null);

  const itemNodes = useMemo(() => nodes.filter((n) => n.kind === "item"), [nodes]);

  useDocumentTitle("기술 지도 — KIM JUYOUNG");

  useEffect(() => {
    const tag = document.createElement("meta");
    tag.name = "robots";
    tag.content = "noindex, nofollow";
    document.head.appendChild(tag);
    window.scrollTo(0, 0);
    return () => {
      document.head.removeChild(tag);
    };
  }, []);

  const q = query.trim().toLowerCase();
  const matched = useMemo(() => {
    if (!q) return null;
    return new Set(nodes.filter((n) => n.label.toLowerCase().includes(q)).map((n) => n.id));
  }, [q, nodes]);

  function toMap(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const r = svg.getBoundingClientRect();
    return {
      x: view.x + ((clientX - r.left) / r.width) * view.w,
      y: view.y + ((clientY - r.top) / r.height) * view.h,
    };
  }

  function zoomAt(factor: number, clientX: number, clientY: number) {
    const p = toMap(clientX, clientY);
    setView((v) => {
      const nw = Math.min(MAX_W, Math.max(MIN_W, v.w * factor));
      const k = nw / v.w;
      return { x: p.x - (p.x - v.x) * k, y: p.y - (p.y - v.y) * k, w: nw, h: v.h * k };
    });
  }

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<number | null>(null);
  const dragged = useRef(false);

  function onPointerDown(e: React.PointerEvent<SVGSVGElement>) {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragged.current = false;
  }

  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];

    if (pts.length === 2) {
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (pinch.current != null && dist > 0) {
        zoomAt(pinch.current / dist, (pts[0].x + pts[1].x) / 2, (pts[0].y + pts[1].y) / 2);
      }
      pinch.current = dist;
      dragged.current = true;
      return;
    }

    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const dx = ((e.clientX - prev.x) / r.width) * view.w;
    const dy = ((e.clientY - prev.y) / r.height) * view.h;
    if (Math.abs(dx) + Math.abs(dy) > 0.5) dragged.current = true;
    setView((v) => ({ ...v, x: v.x - dx, y: v.y - dy }));
  }

  function onPointerUp(e: React.PointerEvent<SVGSVGElement>) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
  }

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomAt(e.deltaY > 0 ? 1.18 : 1 / 1.18, e.clientX, e.clientY);
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  });

  function zoomCenter(factor: number) {
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    zoomAt(factor, r.left + r.width / 2, r.top + r.height / 2);
  }

  const scale = bounds.w / view.w;
  const showItemLabels = scale > 1.35 || !!matched;

  const dim = (n: Node) => (matched && !matched.has(n.id) ? 0.1 : 1);

  return (
    <main id="main">
      <div className="wrap">
        <header className="detail-hero">
          <Link className="back-link" to="/">
            ← 포트폴리오로
          </Link>
          <h1>기술 지도</h1>
          <div className="detail-meta">
            <span>
              개발 영역에서 쓰이는 용어 {itemNodes.length}개를 {groupCount}개 분야로 묶었습니다
            </span>
          </div>
        </header>
      </div>

      <div className="skillmap-shell">
        <div className="skillmap-bar">
          <div className="search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="search"
              placeholder="용어 검색"
              aria-label="용어 검색"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="skillmap-zoom">
            <button type="button" onClick={() => zoomCenter(1 / 1.4)} aria-label="확대">
              +
            </button>
            <button type="button" onClick={() => zoomCenter(1.4)} aria-label="축소">
              −
            </button>
            <button type="button" onClick={() => setView(bounds)}>
              전체
            </button>
          </div>
        </div>

        <div className="skillmap-canvas">
          <svg
            ref={svgRef}
            viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
            role="img"
            aria-label="개발 기술 지도"
          >
            {/* 가지 */}
            <g fill="none">
              {edges.map((e, i) => (
                <path
                  key={i}
                  d={e.path}
                  stroke={groupColor(e.group, groupCount)}
                  strokeWidth={e.toKind === "group" ? 4 : 1.5}
                  opacity={matched ? 0.07 : e.toKind === "group" ? 0.5 : 0.3}
                />
              ))}
            </g>

            {/* 항목 */}
            <g>
              {itemNodes.map((n) => {
                const color = groupColor(n.group, groupCount);
                const on = hover?.id === n.id;
                const { transform, anchor } = labelTransform(n, 16);
                return (
                  <g
                    key={n.id}
                    opacity={dim(n)}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => {
                      if (dragged.current) return;
                      window.open(
                        `https://www.google.com/search?q=${encodeURIComponent(n.label)}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={on ? 12 : 7}
                      fill={on ? color : "#15110d"}
                      stroke={color}
                      strokeWidth={2.4}
                    />
                    {(showItemLabels || on) && (
                      <text
                        transform={transform}
                        textAnchor={anchor}
                        dominantBaseline="middle"
                        fill={on ? color : "#d8cab5"}
                        fontSize={16}
                        style={{ paintOrder: "stroke", stroke: "#0d0a08", strokeWidth: 4 }}
                      >
                        {n.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>

            {/* 분야 · 뿌리 */}
            <g>
              {nodes
                .filter((n) => n.kind !== "item")
                .map((n) => {
                  const color = groupColor(n.group, groupCount);
                  const isRoot = n.kind === "root";
                  const on = hover?.id === n.id;
                  const { transform, anchor } = labelTransform(n, 26);
                  return (
                    <g
                      key={n.id}
                      opacity={dim(n)}
                      onMouseEnter={() => setHover(n)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => {
                        if (dragged.current) return;
                        const url = n.link ?? `https://www.google.com/search?q=${encodeURIComponent(n.label)}`;
                        window.open(url, "_blank", "noopener,noreferrer");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={isRoot ? 44 : on ? 24 : 18}
                        fill="#15110d"
                        stroke={color}
                        strokeWidth={isRoot ? 5 : 4}
                      />
                      <circle cx={n.x} cy={n.y} r={isRoot ? 20 : 8} fill={color} />

                      {isRoot ? (
                        <text
                          x={0}
                          y={78}
                          textAnchor="middle"
                          fill={color}
                          fontSize={42}
                          fontWeight={600}
                          style={{ paintOrder: "stroke", stroke: "#0d0a08", strokeWidth: 6 }}
                        >
                          {n.label}
                        </text>
                      ) : (
                        <text
                          transform={transform}
                          textAnchor={anchor}
                          dominantBaseline="middle"
                          fill={color}
                          fontSize={30}
                          fontWeight={600}
                          style={{ paintOrder: "stroke", stroke: "#0d0a08", strokeWidth: 7 }}
                        >
                          {n.label}
                        </text>
                      )}
                    </g>
                  );
                })}
            </g>
          </svg>

          {hover && (
            <div className="skillmap-tip">
              <strong>{hover.label}</strong>
              {hover.desc && <span>{hover.desc}</span>}
              <span className="tip-link">{hover.link ? "누르면 로드맵" : "누르면 검색"}</span>
            </div>
          )}
        </div>

        <p className="skillmap-help">
          끌어서 이동 · 휠로 확대·축소 · 노드를 누르면 검색 · 확대하면 용어 이름이 나타납니다
        </p>
      </div>
    </main>
  );
}
