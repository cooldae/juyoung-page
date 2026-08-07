import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={"site-header" + (stuck ? " is-stuck" : "")}>
      <div className="wrap">
        <Link className="brand" to="/">
          KIM JUYOUNG
        </Link>
        <nav className="site-nav" aria-label="주요 메뉴">
          <Link to="/#projects">Projects</Link>
          <Link to="/#about" data-optional="">
            About
          </Link>
          <Link to="/#footer">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
