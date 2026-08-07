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
      돌려줍니다. 그 페이지가 원래 경로를 ?redirect= 로 넘겨주면
      여기서 진짜 주소로 되돌립니다.

   2) 예전 주소(project.html?id=xxx)로 들어온 사람도
      /project/xxx 로 자연스럽게 넘겨줍니다.
   ------------------------------------------------------------------ */
(function normalizeUrl() {
  const params = new URLSearchParams(window.location.search);

  const redirect = params.get("redirect");
  if (redirect) {
    window.history.replaceState(null, "", BASE + "/" + redirect.replace(/^\/+/, ""));
    return;
  }

  const legacyId = params.get("id");
  if (legacyId) {
    window.history.replaceState(null, "", `${BASE}/project/${encodeURIComponent(legacyId)}`);
    return;
  }

  // project.html 로 직접 들어온 경우 (id 없이)
  if (window.location.pathname.endsWith("/project.html")) {
    window.history.replaceState(null, "", BASE + "/");
  }
})();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={BASE}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
