/** 상단 고정 헤더 높이. style.css 의 .site-header 와 맞춰야 합니다. */
const HEADER_HEIGHT = 62;
const GAP = 10;

function prefersCalm() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * 섹션으로 부드럽게 이동합니다.
 *
 * scrollIntoView 를 쓰지 않는 이유
 *  - 요소 위쪽을 화면 맨 위에 붙여서 고정 헤더 아래로 제목이 가립니다
 *  - 주소의 해시가 그대로면 다시 눌러도 아무 일이 일어나지 않습니다
 */
export function scrollToSection(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - GAP;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersCalm() ? "auto" : "smooth",
  });
  return true;
}

/** 문서 맨 위로 */
export function scrollToTop(smooth = false) {
  window.scrollTo({ top: 0, behavior: smooth && !prefersCalm() ? "smooth" : "auto" });
}
