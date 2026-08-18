import { Link } from "react-router-dom";
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
            {/* 개인 참고용 지도. 눈에 띄지 않게 두되 접근은 됩니다 */}
            <Link className="quiet-link" to="/skills">
              기술 지도
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
