import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { scrollToSection, scrollToTop } from "../lib/scroll";

const MENU = [
  { id: "projects", label: "Projects" },
  { id: "about", label: "About", optional: true },
  { id: "footer", label: "Contact" },
];

export function Header() {
  const [stuck, setStuck] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={"site-header" + (stuck ? " is-stuck" : "")}>
      <div className="wrap">
        <Link
          className="brand"
          to="/"
          onClick={(e) => {
            // 이미 첫 화면이면 주소만 바꾸지 말고 위로 올려줍니다
            if (onHome) {
              e.preventDefault();
              scrollToTop(true);
            }
          }}
        >
          KIM JUYOUNG
        </Link>

        <nav className="site-nav" aria-label="주요 메뉴">
          {MENU.map((m) => (
            <Link
              key={m.id}
              to={`/#${m.id}`}
              data-optional={m.optional ? "" : undefined}
              onClick={(e) => {
                // 첫 화면에 있을 때는 직접 스크롤합니다.
                // 해시가 그대로면 주소 변경이 일어나지 않아 같은 메뉴를
                // 다시 눌렀을 때 아무 반응이 없기 때문입니다.
                if (onHome && scrollToSection(m.id)) e.preventDefault();
              }}
            >
              {m.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
