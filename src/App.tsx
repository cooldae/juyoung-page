import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import SkillMap from "./pages/SkillMap";

export default function App() {
  return (
    <>
      <a className="skip" href="#main">
        본문으로 건너뛰기
      </a>

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        {/* 개인 확인용. 메뉴에 링크되지 않고 검색에도 안 잡힙니다 */}
        <Route path="/skills" element={<SkillMap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}
