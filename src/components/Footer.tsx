import { PROFILE } from "../data/profile";

export function Footer() {
  const p = PROFILE;

  return (
    <footer className="site-footer" id="footer">
      <div className="wrap">
        <div className="footer-inner">
          <div>
            <div className="name">
              {p.nameKo} · {p.nameEn}
            </div>
            <a className="mail" href={`mailto:${p.email}`}>
              {p.email}
            </a>
            {p.showPhone && p.phone && (
              <div className="mail">
                <a href={`tel:${p.phone.replace(/[^\d+]/g, "")}`}>{p.phone}</a>
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
            <div className="chips">
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
            </div>
            <div className="copy">
              &copy; {new Date().getFullYear()} {p.nameEn}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
