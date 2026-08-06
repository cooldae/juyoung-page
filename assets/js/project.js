/* ============================================================
   프로젝트 상세 페이지 렌더링
   project.html?id=<slug> 형태로 열립니다.
   ============================================================ */

(function () {
  "use strict";

  var esc = App.esc;
  var LIST = App.sorted();

  var slug = new URLSearchParams(window.location.search).get("id") || "";
  var index = App.findIndexBySlug(LIST, slug);
  var project = index === -1 ? null : LIST[index];

  var host = document.getElementById("detail");

  /* ---------------- 없는 프로젝트 ---------------- */

  if (!project) {
    document.title = "프로젝트를 찾을 수 없습니다 — KIM JUYOUNG";
    host.innerHTML =
      '<div class="wrap" style="padding:clamp(70px,14vw,150px) 0;text-align:center">' +
        '<p class="eyebrow" style="justify-content:center">Not found</p>' +
        "<h1>요청하신 프로젝트가 없습니다.</h1>" +
        '<p class="intro" style="margin-left:auto;margin-right:auto">' +
          "주소가 잘못되었거나 삭제된 프로젝트일 수 있습니다." +
        "</p>" +
        '<p style="margin-top:2rem"><a class="pill pill-link" href="index.html">목록으로 돌아가기</a></p>' +
      "</div>";
    App.renderFooter();
    App.initHeader();
    return;
  }

  document.title = project.title + " — KIM JUYOUNG";

  var descTag = document.querySelector('meta[name="description"]');
  if (descTag) descTag.setAttribute("content", project.overview || "");

  /* ---------------- 블록 조립 ---------------- */

  function block(title, inner) {
    return '<section class="block reveal"><h2>' + esc(title) + "</h2>" + inner + "</section>";
  }

  var parts = [];

  /* 영상 */
  var videoId = App.youtubeId(project.youtube);
  if (videoId) {
    parts.push(
      block("Video",
        '<div class="video-frame">' +
          '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(videoId) + '"' +
          ' title="' + esc(project.title) + ' 영상" loading="lazy" allowfullscreen' +
          ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>' +
        "</div>")
    );
  }

  /* 사진 */
  if ((project.images || []).length) {
    var thumbs = project.images
      .map(function (file, i) {
        var src = /^https?:\/\//.test(file)
          ? file
          : "assets/projects/" + project.slug + "/" + file;
        return (
          '<button type="button" data-lb="' + i + '" data-src="' + esc(src) + '">' +
            '<img src="' + esc(src) + '" alt="' + esc(project.title) + " 이미지 " + (i + 1) + '" loading="lazy">' +
          "</button>"
        );
      })
      .join("");
    parts.push(block("Gallery", '<div class="gallery" id="gallery">' + thumbs + "</div>"));
  }

  /* 개요 (B) */
  if (project.overview) {
    parts.push(block("프로젝트 개요", "<p>" + esc(project.overview) + "</p>"));
  }

  /* 기술 스택 (C) */
  if ((project.stack || []).length) {
    var chips = project.stack
      .map(function (s) { return '<span class="chip">' + esc(s) + "</span>"; })
      .join("");
    parts.push(block("기술 스택", '<div class="chips">' + chips + "</div>"));
  }

  /* 담당 업무 및 구현 (D) */
  if ((project.work || []).length) {
    var items = project.work
      .map(function (w) { return "<li>" + esc(w) + "</li>"; })
      .join("");
    parts.push(block("담당 업무 및 구현 내용", '<ul class="bullets">' + items + "</ul>"));
  }

  /* 상세 구현 내용 */
  if ((project.details || []).length) {
    var subs = project.details
      .map(function (d) {
        return (
          '<div class="detail-sub-item">' +
            "<h3>" + esc(d.heading) + "</h3>" +
            "<p>" + esc(d.body) + "</p>" +
          "</div>"
        );
      })
      .join("");
    parts.push(block("상세 구현 내용", '<div class="detail-sub">' + subs + "</div>"));
  }

  /* 성과 */
  if (project.achievement) {
    parts.push(block("성과", '<p class="achievement">' + esc(project.achievement) + "</p>"));
  }

  /* 부가 정보 */
  if (project.note) {
    parts.push(block("비고", '<div class="note-box">' + esc(project.note) + "</div>"));
  }

  /* 링크 */
  if ((project.links || []).length) {
    var links = project.links
      .map(function (l) {
        return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + esc(l.label) + "</a>";
      })
      .join("");
    parts.push(block("관련 링크", '<div class="link-list">' + links + "</div>"));
  }

  /* 이전 / 다음 (목록 정렬 기준) */
  var newer = LIST[index - 1];
  var older = LIST[index + 1];

  function navCell(p, dir, label) {
    if (!p) return '<div class="placeholder"></div>';
    return (
      '<a class="' + dir + '" href="project.html?id=' + encodeURIComponent(p.slug) + '">' +
        '<div class="dir">' + label + "</div>" +
        '<div class="tt">' + esc(p.title) + "</div>" +
      "</a>"
    );
  }

  /* ---------------- 출력 ---------------- */

  host.innerHTML =
    '<div class="wrap">' +
      '<header class="detail-hero">' +
        '<a class="back-link" href="index.html">← 프로젝트 목록</a>' +
        "<h1>" + esc(project.title) + "</h1>" +
        '<div class="detail-meta">' +
          "<span>" + esc(project.company || "") + "</span>" +
          '<span class="sep">|</span>' +
          "<span>" + esc(project.period || "") + "</span>" +
          (project.status ? '<span class="badge">' + esc(project.status) + "</span>" : "") +
        "</div>" +
      "</header>" +
      '<div class="detail-body">' + parts.join("") + "</div>" +
      '<nav class="detail-nav">' +
        navCell(newer, "prev", "← 이후 프로젝트") +
        navCell(older, "next", "이전 프로젝트 →") +
      "</nav>" +
    "</div>";

  /* ---------------- 라이트박스 ---------------- */

  (function initLightbox() {
    var gallery = document.getElementById("gallery");
    if (!gallery) return;

    var sources = Array.prototype.map.call(
      gallery.querySelectorAll("[data-src]"),
      function (b) { return b.getAttribute("data-src"); }
    );

    var box = document.getElementById("lightbox");
    var img = box.querySelector("img");
    var current = 0;
    var lastFocused = null;

    function show(i) {
      current = (i + sources.length) % sources.length;
      img.src = sources[current];
      img.alt = project.title + " 이미지 " + (current + 1);
    }

    function open(i) {
      lastFocused = document.activeElement;
      show(i);
      box.classList.add("is-open");
      document.body.style.overflow = "hidden";
      box.querySelector(".lb-close").focus();
    }

    function close() {
      box.classList.remove("is-open");
      document.body.style.overflow = "";
      img.src = "";
      if (lastFocused) lastFocused.focus();
    }

    gallery.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-lb]");
      if (btn) open(Number(btn.getAttribute("data-lb")));
    });

    box.addEventListener("click", function (e) {
      if (e.target === box) return close();
      if (e.target.closest(".lb-close")) return close();
      if (e.target.closest(".lb-prev")) return show(current - 1);
      if (e.target.closest(".lb-next")) return show(current + 1);
    });

    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(current - 1);
      else if (e.key === "ArrowRight") show(current + 1);
    });

    // 사진이 1장이면 좌우 버튼 숨김
    if (sources.length < 2) {
      box.querySelectorAll(".lb-nav").forEach(function (b) { b.style.display = "none"; });
    }
  })();

  App.renderFooter();
  App.initHeader();
  App.observeReveals();
})();
