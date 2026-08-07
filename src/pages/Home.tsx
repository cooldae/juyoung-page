import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { ProjectList } from "../components/ProjectList";
import { useDocumentTitle, useReveal } from "../hooks/useReveal";
import { scrollToSection, scrollToTop } from "../lib/scroll";

export default function Home() {
  const { hash } = useLocation();

  useDocumentTitle(
    "KIM JUYOUNG — 김주영",
    "Unity 기반 AR·VR, 전시 인터랙션, IoT 디바이스 연동 개발자 김주영의 포트폴리오입니다."
  );
  useReveal([]);

  // 다른 페이지에서 #projects 같은 주소로 들어왔을 때 해당 위치로 이동.
  // (첫 화면 안에서 메뉴를 누른 경우는 Header 가 직접 처리합니다)
  useEffect(() => {
    if (!hash) {
      scrollToTop();
      return;
    }
    // 첫 그리기가 끝난 뒤라야 위치가 정확합니다
    const id = window.requestAnimationFrame(() => scrollToSection(hash.slice(1)));
    return () => window.cancelAnimationFrame(id);
  }, [hash]);

  return (
    <main id="main">
      <Hero />
      {/* 프로젝트가 이 사이트의 본론이라 About 보다 위에 둡니다 */}
      <ProjectList />
      <About />
    </main>
  );
}
