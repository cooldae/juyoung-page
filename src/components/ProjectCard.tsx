import { Link } from "react-router-dom";
import type { Project } from "../types";

const MAX_CHIPS = 4;

export function ProjectCard({ project }: { project: Project }) {
  const shown = project.stack.slice(0, MAX_CHIPS);
  const rest = project.stack.length - MAX_CHIPS;

  return (
    <Link className="project-card reveal" to={`/project/${project.slug}`}>
      <div className="pc-top">
        <span className="pc-company">{project.company}</span>
        {project.status && <span className="badge">{project.status}</span>}
      </div>

      <div className="pc-title">{project.title}</div>
      <div className="pc-period">{project.period}</div>
      <p className="pc-overview">{project.overview}</p>

      <div className="pc-stack">
        {shown.map((s) => (
          <span className="chip" key={s}>
            {s}
          </span>
        ))}
        {rest > 0 && <span className="pc-more">+{rest}</span>}
      </div>
    </Link>
  );
}
