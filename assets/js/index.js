/* ============================================================
   메인 페이지 렌더링
   내용을 바꾸려면 data/profile.js 와 data/projects.js 를 수정하세요.
   ============================================================ */

(function () {
  "use strict";

  var esc = App.esc;
  var P = window.PROFILE || {};
  var ALL = App.sorted();

  var state = { company: "전체", query: "" };

  /* ---------------- 프로필 영역 ---------------- */

  function renderHero() {
    var host = document.getElementById("hero");
    if (!host) return;

    var contacts = ['<a class="pill pill-link" href="mailto:' + esc(P.email) + '">' + esc(P.email) + "</a>"];
    if (P.showPhone && P.phone) {
      contacts.push('<a class="pill pill-link" href="tel:' + esc(String(P.phone).replace(/[^\d+]/g, "")) + '">' + esc(P.phone) + "</a>");
    }
    (P.links || []).forEach(function (l) {
      contacts.push('<a class="pill pill-link" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + esc(l.label) + "</a>");
    });
    (P.languages || []).forEach(function (lang) {
      contacts.push('<span class="pill">' + esc(lang) + "</span>");
    });

    var skillChips = (P.skills || [])
      .map(function (s) { return '<span class="chip">' + esc(s) + "</span>"; })
      .join("");

    host.innerHTML =
      '<div class="wrap">' +
        '<p class="eyebrow reveal">' + esc(P.nameEn || "") + "</p>" +
        '<h1 class="reveal">' + esc(P.tagline || "") + "</h1>" +
        (P.intro ? '<p class="intro reveal">' + esc(P.intro) + "</p>" : "") +
        (skillChips ? '<div class="hero-skills chips reveal">' + skillChips + "</div>" : "") +
        '<div class="hero-meta reveal">' + contacts.join("") + "</div>" +
      "</div>";
  }

  function renderAbout() {
    var host = document.getElementById("about-body");
    if (!host) return;

    var strengths = (P.strengths || [])
      .map(function (s) { return "<li>" + esc(s) + "</li>"; })
      .join("");

    var careers = (P.careers || [])
      .map(function (c) {
        return (
          '<div class="career-item">' +
            '<span class="co">' + esc(c.company) + "</span>" +
            '<span class="pd">' + esc(c.period) + "</span>" +
            (c.role ? '<span class="rl">' + esc(c.role) + "</span>" : "") +
          "</div>"
        );
      })
      .join("");

    var education = (P.education || [])
      .map(function (e) {
        return (
          '<div class="career-item">' +
            '<span class="co">' + esc(e.school) + "</span>" +
            '<span class="pd">' + esc(e.period) + "</span>" +
            (e.detail ? '<span class="rl">' + esc(e.detail) + "</span>" : "") +
          "</div>"
        );
      })
      .join("");

    // Skills 목록은 첫 화면(hero)에 표시되므로 여기서는 생략합니다.
    host.innerHTML =
      '<div class="about-grid">' +
        '<div class="card reveal"><h3>Career</h3><div class="career">' + careers + "</div></div>" +
        '<div class="card reveal"><h3>Strengths</h3><ul class="bullets">' + strengths + "</ul></div>" +
        (education
          ? '<div class="card reveal"><h3>Education</h3><div class="career">' + education + "</div></div>"
          : "") +
      "</div>";
  }

  /* ---------------- 프로젝트 목록 ---------------- */

  function companies() {
    var seen = [];
    ALL.forEach(function (p) {
      if (p.company && seen.indexOf(p.company) === -1) seen.push(p.company);
    });
    return ["전체"].concat(seen);
  }

  function matches(p) {
    if (state.company !== "전체" && p.company !== state.company) return false;
    if (!state.query) return true;

    var haystack = [
      p.title, p.company, p.period, p.overview,
      (p.stack || []).join(" "),
      (p.work || []).join(" "),
    ].join(" ").toLowerCase();

    return state.query.split(/\s+/).every(function (token) {
      return haystack.indexOf(token) !== -1;
    });
  }

  function cardHtml(p) {
    var stack = (p.stack || []).slice(0, 4)
      .map(function (s) { return '<span class="chip">' + esc(s) + "</span>"; })
      .join("");

    var rest = (p.stack || []).length - 4;
    if (rest > 0) stack += '<span class="pc-more">+' + rest + "</span>";

    return (
      '<a class="project-card reveal" href="project.html?id=' + encodeURIComponent(p.slug) + '">' +
        '<div class="pc-top">' +
          '<span class="pc-company">' + esc(p.company || "") + "</span>" +
          (p.status ? '<span class="badge">' + esc(p.status) + "</span>" : "") +
        "</div>" +
        '<div class="pc-title">' + esc(p.title) + "</div>" +
        '<div class="pc-period">' + esc(p.period || "") + "</div>" +
        '<p class="pc-overview">' + esc(p.overview || "") + "</p>" +
        '<div class="pc-stack">' + stack + "</div>" +
      "</a>"
    );
  }

  function renderList() {
    var grid = document.getElementById("project-grid");
    var count = document.getElementById("project-count");
    if (!grid) return;

    var shown = ALL.filter(matches);

    grid.innerHTML = shown.length
      ? shown.map(cardHtml).join("")
      : '<p class="empty">조건에 맞는 프로젝트가 없습니다.</p>';

    if (count) {
      count.textContent = shown.length === ALL.length
        ? ALL.length + "개"
        : shown.length + " / " + ALL.length + "개";
    }

    App.observeReveals(grid);
  }

  function renderFilters() {
    var host = document.getElementById("filter-group");
    if (!host) return;

    host.innerHTML = companies()
      .map(function (name) {
        var on = name === state.company;
        return (
          '<button type="button" class="filter-btn" data-company="' + esc(name) + '"' +
          ' aria-pressed="' + on + '">' + esc(name) + "</button>"
        );
      })
      .join("");

    host.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-company]");
      if (!btn) return;
      state.company = btn.getAttribute("data-company");
      host.querySelectorAll(".filter-btn").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      renderList();
    });

    var input = document.getElementById("project-search");
    if (input) {
      input.addEventListener("input", function () {
        state.query = input.value.trim().toLowerCase();
        renderList();
      });
    }
  }

  /* ---------------- 시작 ---------------- */

  renderHero();
  renderAbout();
  renderFilters();
  renderList();
  App.renderFooter();
  App.initHeader();
  App.observeReveals();
})();
