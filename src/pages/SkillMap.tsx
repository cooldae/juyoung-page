import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SKILL_MAP } from "../data/skillmap";
import { useDocumentTitle, useReveal } from "../hooks/useReveal";

type Filter = "all" | "have" | "none";

/** 모르는 용어를 바로 찾아볼 수 있게 검색 결과로 보냅니다.
 *  개별 문서로 직접 링크하면 주소가 바뀌었을 때 깨지므로 검색을 씁니다. */
function searchUrl(term: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(term)}`;
}

export default function SkillMap() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  useDocumentTitle("기술 지도 — KIM JUYOUNG");

  // 개인 확인용 페이지라 검색 엔진에 잡히지 않게 합니다
  useEffect(() => {
    const tag = document.createElement("meta");
    tag.name = "robots";
    tag.content = "noindex, nofollow";
    document.head.appendChild(tag);
    return () => {
      document.head.removeChild(tag);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const total = useMemo(
    () => SKILL_MAP.reduce((n, g) => n + g.items.length, 0),
    []
  );
  const owned = useMemo(
    () => SKILL_MAP.reduce((n, g) => n + g.items.filter((i) => i.have).length, 0),
    []
  );

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SKILL_MAP.map((g) => ({
      ...g,
      shown: g.items.filter((i) => {
        if (filter === "have" && !i.have) return false;
        if (filter === "none" && i.have) return false;
        if (!q) return true;
        return (
          i.name.toLowerCase().includes(q) ||
          (i.note ?? "").toLowerCase().includes(q) ||
          g.title.toLowerCase().includes(q)
        );
      }),
    })).filter((g) => g.shown.length > 0);
  }, [filter, query]);

  useReveal([filter, query]);

  const shownCount = groups.reduce((n, g) => n + g.shown.length, 0);

  return (
    <main id="main">
      <div className="wrap">
        <header className="detail-hero">
          <Link className="back-link" to="/">
            ← 포트폴리오로
          </Link>
          <h1>기술 지도</h1>
          <div className="detail-meta">
            <span>개발 영역 전반의 용어를 늘어놓고, 가진 것과 아직 없는 것을 표시했습니다</span>
          </div>
        </header>

        {/* 전체 진행도 */}
        <section className="skill-summary reveal">
          <div className="skill-summary-num">
            <strong>{owned}</strong>
            <span> / {total}</span>
          </div>
          <div className="skill-bar" aria-hidden="true">
            <div className="skill-bar-fill" style={{ width: `${(owned / total) * 100}%` }} />
          </div>
          <div className="skill-summary-label">
            근거가 있는 항목 {Math.round((owned / total) * 100)}%
          </div>
        </section>

        <div className="filters reveal">
          <div className="filter-group">
            {(
              [
                ["all", `전체 ${total}`],
                ["have", `보유 ${owned}`],
                ["none", `미보유 ${total - owned}`],
              ] as [Filter, string][]
            ).map(([key, label]) => (
              <button
                type="button"
                key={key}
                className="filter-btn"
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>

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
        </div>

        {shownCount === 0 && <p className="empty">조건에 맞는 항목이 없습니다.</p>}

        <div className="skill-groups">
          {groups.map((g) => {
            const gOwned = g.items.filter((i) => i.have).length;
            return (
              <section className="skill-group reveal" key={g.title}>
                <div className="skill-group-head">
                  <h2>{g.title}</h2>
                  <span className="skill-group-count">
                    {gOwned} / {g.items.length}
                  </span>
                  {g.link && (
                    <a
                      className="skill-group-link"
                      href={g.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      로드맵 ↗
                    </a>
                  )}
                </div>

                {g.desc && <p className="skill-group-desc">{g.desc}</p>}

                <div className="skill-items">
                  {g.shown.map((i) => (
                    <a
                      key={i.name}
                      className={"skill-item" + (i.have ? " is-have" : "")}
                      href={searchUrl(i.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={i.note ? `${i.name} — ${i.note}` : `${i.name} 검색`}
                    >
                      <span className="skill-mark" aria-hidden="true">
                        {i.have ? "●" : "○"}
                      </span>
                      <span className="skill-name">{i.name}</span>
                      {i.note && <span className="skill-note">{i.note}</span>}
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <p className="skill-foot">
          ● 는 실제 프로젝트나 이 사이트에서 쓴 근거가 있는 것입니다. 항목을 누르면 검색 결과가 열립니다.
          <br />
          내용은 <code>src/data/skillmap.ts</code> 에서 고칩니다. 이 페이지는 메뉴에 링크되지 않고
          검색 엔진에도 잡히지 않습니다.
        </p>
      </div>
    </main>
  );
}
