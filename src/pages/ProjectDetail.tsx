import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { findProject } from "../lib/projects";
import { normalizeVideos } from "../lib/media";
import { VideoCarousel } from "../components/VideoCarousel";
import { Gallery } from "../components/Gallery";
import { useDocumentTitle, useReveal } from "../hooks/useReveal";
import type { Project } from "../types";
import NotFound from "./NotFound";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="block reveal">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function NavCell({
  project,
  dir,
  label,
}: {
  project: Project | null;
  dir: "prev" | "next";
  label: string;
}) {
  if (!project) return <div className="placeholder" />;
  return (
    <Link className={dir} to={`/project/${project.slug}`}>
      <div className="dir">{label}</div>
      <div className="tt">{project.title}</div>
    </Link>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const found = findProject(slug);

  useDocumentTitle(
    found ? `${found.project.title} — KIM JUYOUNG` : "프로젝트를 찾을 수 없습니다 — KIM JUYOUNG",
    found?.project.overview ?? ""
  );
  useReveal([slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!found) return <NotFound />;

  const { project, newer, older } = found;
  const videos = normalizeVideos(project.youtube);

  return (
    <main id="main">
      <article>
        <div className="wrap">
          <header className="detail-hero">
            <Link className="back-link" to="/#projects">
              ← 프로젝트 목록
            </Link>
            <h1>{project.title}</h1>
            <div className="detail-meta">
              <span>{project.company}</span>
              <span className="sep">|</span>
              <span>{project.period}</span>
              {project.status && <span className="badge">{project.status}</span>}
            </div>
          </header>

          <div className="detail-body">
            {videos.length > 0 && (
              <Block title="Video">
                <VideoCarousel videos={videos} title={project.title} />
              </Block>
            )}

            {project.images.length > 0 && (
              <Block title="Gallery">
                <Gallery slug={project.slug} images={project.images} title={project.title} />
              </Block>
            )}

            {project.overview && (
              <Block title="프로젝트 개요">
                <p>{project.overview}</p>
              </Block>
            )}

            {project.stack.length > 0 && (
              <Block title="기술 스택">
                <div className="chips">
                  {project.stack.map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </Block>
            )}

            {project.work.length > 0 && (
              <Block title="담당 업무 및 구현 내용">
                <ul className="bullets">
                  {project.work.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </Block>
            )}

            {project.details && project.details.length > 0 && (
              <Block title="상세 구현 내용">
                <div className="detail-sub">
                  {project.details.map((d) => (
                    <div className="detail-sub-item" key={d.heading}>
                      <h3>{d.heading}</h3>
                      <p>{d.body}</p>
                    </div>
                  ))}
                </div>
              </Block>
            )}

            {project.achievement && (
              <Block title="성과">
                <p className="achievement">{project.achievement}</p>
              </Block>
            )}

            {project.note && (
              <Block title="비고">
                <div className="note-box">{project.note}</div>
              </Block>
            )}

            {project.links && project.links.length > 0 && (
              <Block title="관련 링크">
                <div className="link-list">
                  {project.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
                      {l.label}
                    </a>
                  ))}
                </div>
              </Block>
            )}
          </div>

          <nav className="detail-nav">
            <NavCell project={newer} dir="prev" label="← 이후 프로젝트" />
            <NavCell project={older} dir="next" label="이전 프로젝트 →" />
          </nav>
        </div>
      </article>
    </main>
  );
}
