import { PROFILE } from "../data/profile";

export function Hero() {
  const p = PROFILE;

  return (
    <section className="hero" id="hero">
      <div className="wrap">
        <p className="eyebrow reveal">{p.nameEn}</p>

        <h1 className="reveal">{p.tagline}</h1>

        {p.intro && <p className="intro reveal">{p.intro}</p>}

        {p.skills.length > 0 && (
          <div className="hero-skills chips reveal">
            {p.skills.map((s) => (
              <span className="chip" key={s}>
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="hero-meta reveal">
          <a className="pill pill-link" href={`mailto:${p.email}`}>
            {p.email}
          </a>

          {p.showPhone && p.phone && (
            <a className="pill pill-link" href={`tel:${p.phone.replace(/[^\d+]/g, "")}`}>
              {p.phone}
            </a>
          )}

          {p.links.map((l) => (
            <a
              key={l.url}
              className="pill pill-link"
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label}
            </a>
          ))}

          {p.languages.map((lang) => (
            <span className="pill" key={lang}>
              {lang}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
