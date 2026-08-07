import { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { companies, sortedProjects } from "../lib/projects";
import { useReveal } from "../hooks/useReveal";
import type { Project } from "../types";

function matches(p: Project, company: string, query: string) {
  if (company !== "전체" && p.company !== company) return false;
  if (!query) return true;

  const haystack = [p.title, p.company, p.period, p.overview, p.stack.join(" "), p.work.join(" ")]
    .join(" ")
    .toLowerCase();

  return query.split(/\s+/).every((token) => haystack.includes(token));
}

export function ProjectList() {
  const [company, setCompany] = useState("전체");
  const [query, setQuery] = useState("");

  const shown = useMemo(
    () => sortedProjects.filter((p) => matches(p, company, query)),
    [company, query]
  );

  useReveal([company, query]);

  const count =
    shown.length === sortedProjects.length
      ? `${sortedProjects.length}개`
      : `${shown.length} / ${sortedProjects.length}개`;

  return (
    <section className="section" id="projects">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>Projects</h2>
          <span className="count">{count}</span>
        </div>

        <div className="filters reveal">
          <div className="filter-group">
            {companies.map((name) => (
              <button
                type="button"
                key={name}
                className="filter-btn"
                aria-pressed={name === company}
                onClick={() => setCompany(name)}
              >
                {name}
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
              placeholder="프로젝트 · 기술 검색"
              aria-label="프로젝트 검색"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value.trim().toLowerCase())}
            />
          </div>
        </div>

        <div className="project-grid">
          {shown.length > 0 ? (
            shown.map((p) => <ProjectCard project={p} key={p.slug} />)
          ) : (
            <p className="empty">조건에 맞는 프로젝트가 없습니다.</p>
          )}
        </div>
      </div>
    </section>
  );
}
