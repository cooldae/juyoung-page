import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { ProjectList } from "../components/ProjectList";
import { useDocumentTitle, useReveal } from "../hooks/useReveal";

export default function Home() {
  const { hash } = useLocation();

  useDocumentTitle(
    "KIM JUYOUNG — 김주영",
    "Unity 기반 AR·VR, 전시 인터랙션, IoT 디바이스 연동 개발자 김주영의 포트폴리오입니다."
  );
  useReveal([]);

  // 헤더 메뉴(#about 등)로 들어왔을 때 해당 위치로 이동
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
