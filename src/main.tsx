import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/style.css";

/** "/juyoung-page/" → "/juyoung-page" */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/* ------------------------------------------------------------------
   주소 정리 — 화면을 그리기 전에 실행되어야 합니다.

   1) GitHub Pages 는 /project/xxx 같은 주소를 모르기 때문에 404.html 을
      돌려줍니다. 그 페이지가 원래 경로를 ?redirect= 로 넘겨주는데,
      이때 쿼리의 ? 가 & 로 바뀌어 있습니다. 여기서 되돌립니다.

        /project/pado-art-museum
          → 404.html
          → /?redirect=project%2Fpado-art-museum
          → /project/pado-art-museum

   2) 예전 주소(project.html?id=xxx)로 들어온 사람도 /project/xxx 로
      넘겨줍니다. 1) 을 거쳐 들어온 경우에도 동작해야 하므로
      순서대로 처리하고 마지막에 한 번만 주소를 바꿉니다.
   ------------------------------------------------------------------ */
(function normalizeUrl() {
  const url = new URL(window.location.href);

  const redirect = url.searchParams.get("redirect");
  if (redirect) {
    // 404.html 이 "경로&쿼리" 형태로 넘겨줍니다. 첫 & 만 ? 로 되돌립니다.
    const restored = redirect.replace(/&/, "?").replace(/^\/+/, "");
    const next = new URL(`${BASE}/${restored}`, window.location.origin);
    url.pathname = next.pathname;
    url.search = next.search;
    url.hash = next.hash;
  }

  const legacyId = new URLSearchParams(url.search).get("id");
  if (legacyId) {
    url.pathname = `${BASE}/project/${encodeURIComponent(legacyId)}`;
    url.search = "";
  } else if (url.pathname.endsWith("/project.html")) {
    // id 없이 예전 상세 주소로 들어온 경우
    url.pathname = `${BASE}/`;
    url.search = "";
  }

  const next = url.pathname + url.search + url.hash;
  const current = window.location.pathname + window.location.search + window.location.hash;
  if (next !== current) {
    window.history.replaceState(null, "", next);
  }
})();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={BASE}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
