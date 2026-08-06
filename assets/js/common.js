/* ============================================================
   공통 유틸 — 두 페이지가 함께 씁니다.
   보통은 이 파일을 고칠 일이 없습니다. 내용은 data/ 폴더에서 수정하세요.
   ============================================================ */

(function () {
  "use strict";

  var App = (window.App = {});

  /* ---- HTML 이스케이프 (R&D, HTML & CSS 같은 글자가 깨지지 않도록) ---- */
  App.esc = function (value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  /* ---- 유튜브 주소에서 영상 ID 추출 ----
     youtu.be/ID, watch?v=ID, /shorts/ID, /embed/ID, 그리고 ID만 적은 경우 모두 인식 */
  App.youtubeId = function (input) {
    if (!input) return "";
    var raw = String(input).trim();
    if (/^[\w-]{11}$/.test(raw)) return raw;

    var patterns = [
      /youtu\.be\/([\w-]{11})/,
      /[?&]v=([\w-]{11})/,
      /\/shorts\/([\w-]{11})/,
      /\/embed\/([\w-]{11})/,
      /\/live\/([\w-]{11})/,
    ];
    for (var i = 0; i < patterns.length; i++) {
      var m = raw.match(patterns[i]);
      if (m) return m[1];
    }
    return "";
  };

  /* ---- 프로젝트 정렬: start 내림차순. 값이 같으면 파일에 적힌 순서 유지 ---- */
  App.sorted = function () {
    var list = (window.PROJECTS || []).slice();
    return list.sort(function (a, b) {
      return String(b.start || "").localeCompare(String(a.start || ""));
    });
  };

  App.findIndexBySlug = function (list, slug) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].slug === slug) return i;
    }
    return -1;
  };

  /* ---- 스크롤에 맞춰 부드럽게 등장 ---- */
  App.observeReveals = function (root) {
    var targets = (root || document).querySelectorAll(".reveal:not(.is-in)");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    targets.forEach(function (el) { io.observe(el); });
  };

  /* ---- 헤더: 스크롤하면 아래쪽 경계선 표시 ---- */
  App.initHeader = function () {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  };

  /* ---- 푸터 (두 페이지 공통) ---- */
  App.renderFooter = function () {
    var host = document.getElementById("footer");
    if (!host) return;
    var p = window.PROFILE || {};
    var esc = App.esc;

    var linkHtml = (p.links || [])
      .map(function (l) {
        return '<a class="pill pill-link" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + esc(l.label) + "</a>";
      })
      .join("");

    var contact = '<a class="mail" href="mailto:' + esc(p.email) + '">' + esc(p.email) + "</a>";
    if (p.showPhone && p.phone) {
      contact += '<div class="mail"><a href="tel:' + esc(String(p.phone).replace(/[^\d+]/g, "")) + '">' + esc(p.phone) + "</a></div>";
    }

    host.innerHTML =
      '<div class="wrap"><div class="footer-inner">' +
        "<div>" +
          '<div class="name">' + esc(p.nameKo || "") + " · " + esc(p.nameEn || "") + "</div>" +
          contact +
        "</div>" +
        '<div style="display:flex;flex-direction:column;gap:10px;align-items:flex-end">' +
          '<div class="chips">' + linkHtml + "</div>" +
          '<div class="copy">&copy; ' + new Date().getFullYear() + " " + esc(p.nameEn || "") + "</div>" +
        "</div>" +
      "</div></div>";
  };
})();
