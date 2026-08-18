import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { buildGraph, groupColor, type Node } from "../lib/skillLayout";
import { useDocumentTitle } from "../hooks/useReveal";

type View = { x: number; y: number; w: number; h: number };

const MIN_W = 400; // 가장 많이 확대했을 때 보이는 폭
const MAX_W = 6000; // 가장 많이 축소했을 때

export default function SkillMap() {
  const { nodes, edges, bounds, groupCount } = useMemo(() => buildGraph(), []);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [view, setView] = useState<View>(bounds);
  const [query, setQuery] = useState("");
  const [hover, setHover] = useState<Node | null>(null);

  useDocumentTitle("기술 지도 — KIM JUYOUNG");

  // 개인 참고용이라 검색 엔진에 잡히지 않게 합니다
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

  /* ---------- 화면 좌표 → 지도 좌표 ---------- */
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
      const nh = v.h * k;
      return { x: p.x - (p.x - v.x) * k, y: p.y - (p.y - v.y) * k, w: nw, h: nh };
    });
  }

  /* ---------- 끌기 · 손가락 ---------- */
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

    // 손가락 두 개 → 확대·축소
    if (pts.length === 2) {
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (pinch.current != null && dist > 0) {
        const factor = pinch.current / dist;
        zoomAt(factor, (pts[0].x + pts[1].x) / 2, (pts[0].y + pts[1].y) / 2);
      }
      pinch.current = dist;
      dragged.current = true;
      return;
    }

    // 하나 → 이동
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

  // 휠 확대·축소. passive 가 아니어야 페이지 스크롤을 막을 수 있어 직접 붙입니다.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomAt(e.deltaY > 0 ? 1.15 : 1 / 1.15, e.clientX, e.clientY);
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

  const scale = bounds.w / view.w; // 1 이면 전체가 보이는 상태
  const showItemLabels = scale > 1.7;

  function nodeOpacity(n: Node) {
    if (!matched) return 1;
    return matched.has(n.id) ? 1 : 0.12;
  }

  return (
    <main id="main" className="skillmap-page">
      <div className="wrap">
        <header className="detail-hero">
          <Link className="back-link" to="/">
            ← 포트폴리오로
          </Link>
          <h1>기술 지도</h1>
          <div className="detail-meta">
            <span>개발 영역에서 쓰이는 용어 {nodes.length - 1 - groupCount}개를 {groupCount}개 분야로 묶었습니다</span>
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
            {/* 연결선 */}
            <g className="sm-edges">
              {edges.map((e, i) => (
                <line
                  key={i}
                  x1={e.a.x}
                  y1={e.a.y}
                  x2={e.b.x}
                  y2={e.b.y}
                  stroke={groupColor(e.b.group, groupCount)}
                  strokeWidth={e.b.kind === "group" ? 3.5 : 1.6}
                  opacity={matched ? 0.08 : e.b.kind === "group" ? 0.42 : 0.24}
                />
              ))}
            </g>

            {/* 노드 */}
            <g>
              {nodes.map((n) => {
                const color = groupColor(n.group, groupCount);
                const r = n.kind === "root" ? 46 : n.kind === "group" ? 26 : 11;
                const isHover = hover?.id === n.id;
                return (
                  <g
                    key={n.id}
                    opacity={nodeOpacity(n)}
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
                      r={r + (isHover ? 5 : 0)}
                      fill="#14100d"
                      stroke={color}
                      strokeWidth={n.kind === "item" ? 2.4 : 4}
                    />
                    <circle cx={n.x} cy={n.y} r={r * 0.52} fill={color} opacity={isHover ? 0.95 : 0.7} />

                    {(n.kind !== "item" || showItemLabels || isHover) && (
                      <text
                        x={n.x}
                        y={n.y + r + (n.kind === "item" ? 20 : 34)}
                        textAnchor="middle"
                        fill={n.kind === "item" ? "#d9cbb6" : color}
                        fontSize={n.kind === "root" ? 44 : n.kind === "group" ? 30 : 16}
                        fontWeight={n.kind === "item" ? 400 : 600}
                        style={{ paintOrder: "stroke", stroke: "#0d0a08", strokeWidth: 5 }}
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
              {hover.link && <span className="tip-link">로드맵 있음 · 누르면 검색</span>}
              {!hover.link && <span className="tip-link">누르면 검색</span>}
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
