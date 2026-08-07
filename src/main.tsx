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
/* 새로고침하면 첫 화면으로 보냅니다.
 *
 *  같은 탭에서 이미 이 사이트를 연 적이 있으면 sessionStorage 에 표시가 남습니다.
 *  표시가 있는 상태로 다시 들어왔다 = 새로고침(또는 되돌아옴) 으로 봅니다.
 *
 *  performance 의 navigation type 을 쓰지 않는 이유:
 *  GitHub Pages 에서 /project/xxx 를 새로고침하면 404.html 을 한 번 거치는데,
 *  그 과정에서 새로고침이 일반 이동으로 바뀌어 구분이 안 됩니다.
 *
 *  공유받은 주소로 처음 들어온 사람은 표시가 없으므로 그대로 그 페이지를 봅니다.
 *  이 동작을 끄려면 아래 상수를 false 로 바꾸세요. */
const HOME_ON_RELOAD = true;
const VISIT_KEY = "juyoung-page:visited";

function isRevisit(): boolean {
  try {
    const seen = window.sessionStorage.getItem(VISIT_KEY) === "1";
    window.sessionStorage.setItem(VISIT_KEY, "1");
    return seen;
  } catch {
    return false; // 시크릿 모드 등에서 접근이 막히면 그냥 넘어갑니다
  }
}

// 새로고침해도 브라우저가 이전 스크롤 위치를 복원하지 않게 합니다
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

(function normalizeUrl() {
  const url = new URL(window.location.href);
  const revisit = isRevisit();

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

  // 새로고침으로 들어온 경우 첫 화면으로
  if (HOME_ON_RELOAD && revisit && url.pathname !== `${BASE}/`) {
    url.pathname = `${BASE}/`;
    url.search = "";
    url.hash = "";
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
