import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FONT, allLabels, buildGraph, groupColor, type Box } from "../lib/skillLayout";
import { useDocumentTitle } from "../hooks/useReveal";

type View = { x: number; y: number; w: number; h: number };
type Layout = ReturnType<typeof buildGraph>;

const MIN_W = 420;
const MAX_W = 9000;

export default function SkillMap() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const measureRef = useRef<SVGSVGElement | null>(null);

  const labels = useMemo(() => allLabels(), []);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [view, setView] = useState<View | null>(null);
  const [query, setQuery] = useState("");
  const [hover, setHover] = useState<Box | null>(null);

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

  /* 글자 폭을 어림하지 않고 실제로 한 번 그려서 잽니다.
     짧은 영문 이름은 어림값이 두 배 가까이 틀려 상자 밖으로 삐져나옵니다. */
  useLayoutEffect(() => {
    let alive = true;
    const measure = () => {
      const svg = measureRef.current;
      if (!svg || !alive) return;
      const widths = new Map<string, number>();
      svg.querySelectorAll<SVGTextElement>("text").forEach((t) => {
        const key = t.getAttribute("data-key");
        if (key) widths.set(key, t.getBBox().width);
      });
      const built = buildGraph(widths);
      if (!alive) return;
      setLayout(built);
      setView(built.bounds);
    };
    // 웹폰트가 올라온 뒤에 재야 실제 폭이 나옵니다
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    else measure();
    return () => {
      alive = false;
    };
  }, []);

  const boxes = layout?.boxes ?? [];
  const edges = layout?.edges ?? [];
  const bounds = layout?.bounds ?? { x: 0, y: 0, w: 1000, h: 1000 };
  const v = view ?? bounds;

  const q = query.trim().toLowerCase();
  const matched = useMemo(() => {
    if (!q) return null;
    return new Set(boxes.filter((b) => b.label.toLowerCase().includes(q)).map((b) => b.id));
  }, [q, boxes]);

  function toMap(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const r = svg.getBoundingClientRect();
    return {
      x: v.x + ((clientX - r.left) / r.width) * v.w,
      y: v.y + ((clientY - r.top) / r.height) * v.h,
    };
  }

  function zoomAt(factor: number, clientX: number, clientY: number) {
    const p = toMap(clientX, clientY);
    setView((prev) => {
      const cur = prev ?? bounds;
      const nw = Math.min(MAX_W, Math.max(MIN_W, cur.w * factor));
      const k = nw / cur.w;
      return { x: p.x - (p.x - cur.x) * k, y: p.y - (p.y - cur.y) * k, w: nw, h: cur.h * k };
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
    const dx = ((e.clientX - prev.x) / r.width) * v.w;
    const dy = ((e.clientY - prev.y) / r.height) * v.h;
    if (Math.abs(dx) + Math.abs(dy) > 0.5) dragged.current = true;
    setView((cur) => {
      const c = cur ?? bounds;
      return { ...c, x: c.x - dx, y: c.y - dy };
    });
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

  function open(b: Box) {
    if (dragged.current) return;
    const url = b.link ?? `https://www.google.com/search?q=${encodeURIComponent(b.label)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const dim = (b: Box) => (matched && !matched.has(b.id) ? 0.09 : 1);

  return (
    <main id="main">
      {/* 폭을 재기 위한 보이지 않는 글자들 */}
      <svg ref={measureRef} className="skillmap-measure" aria-hidden="true">
        {labels.map((l) => (
          <text key={l.key} data-key={l.key} fontSize={FONT[l.kind]} fontWeight={l.kind === "item" ? 400 : 600}>
            {l.label}
          </text>
        ))}
      </svg>

      <div className="skillmap-top">
        <div className="wrap">
          <Link className="back-link" to="/">
            ← 포트폴리오로
          </Link>
          <div className="skillmap-head">
            <h1>기술 지도</h1>
            <span>
              개발 영역의 용어 {layout?.itemCount ?? 0}개 · {layout?.groupCount ?? 0}개 분야
            </span>
          </div>
        </div>
      </div>

      <div className="skillmap-full">
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
          {!layout && <div className="skillmap-loading">자리를 잡는 중…</div>}

          <svg
            ref={svgRef}
            viewBox={`${v.x} ${v.y} ${v.w} ${v.h}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
            role="img"
            aria-label="개발 기술 지도"
          >
            <g>
              {edges.map((e, i) => (
                <line
                  key={i}
                  x1={e.ax}
                  y1={e.ay}
                  x2={e.bx}
                  y2={e.by}
                  stroke={groupColor(e.group, layout?.groupCount ?? 1)}
                  strokeWidth={e.strong ? 3.5 : 1.3}
                  opacity={matched ? 0.05 : e.strong ? 0.4 : 0.2}
                />
              ))}
            </g>

            <g>
              {boxes.map((b) => {
                const color = groupColor(b.group, layout?.groupCount ?? 1);
                const on = hover?.id === b.id;
                const isItem = b.kind === "item";
                const fs = FONT[b.kind];
                const dotR = isItem ? 4 : 6;
                const dotX = b.x - b.w / 2 + (isItem ? 15 : 19);
                return (
                  <g
                    key={b.id}
                    opacity={dim(b)}
                    onMouseEnter={() => setHover(b)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => open(b)}
                    style={{ cursor: "pointer" }}
                  >
                    <rect
                      x={b.x - b.w / 2}
                      y={b.y - b.h / 2}
                      width={b.w}
                      height={b.h}
                      rx={b.h / 2}
                      fill={on ? color : isItem ? "#171310" : "#1e1913"}
                      stroke={color}
                      strokeWidth={isItem ? 1.6 : 2.6}
                    />
                    <circle cx={dotX} cy={b.y} r={dotR} fill={on ? "#171310" : color} />
                    <text
                      x={dotX + dotR + (isItem ? 8 : 11)}
                      y={b.y}
                      dominantBaseline="central"
                      fill={on ? "#171310" : isItem ? "#e2d5c1" : color}
                      fontSize={fs}
                      fontWeight={isItem ? 400 : 600}
                    >
                      {b.label}
                    </text>
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

        <p className="skillmap-help">끌어서 이동 · 휠이나 손가락으로 확대·축소 · 상자를 누르면 검색</p>
      </div>
    </main>
  );
}
