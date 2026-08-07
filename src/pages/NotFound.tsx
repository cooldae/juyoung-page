import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useReveal";

export default function NotFound() {
  useDocumentTitle("프로젝트를 찾을 수 없습니다 — KIM JUYOUNG");

  return (
    <main id="main">
      <div className="wrap" style={{ padding: "clamp(70px,14vw,150px) 0", textAlign: "center" }}>
        <p className="eyebrow" style={{ justifyContent: "center" }}>
          Not found
        </p>
        <h1>요청하신 페이지가 없습니다.</h1>
        <p className="intro" style={{ marginLeft: "auto", marginRight: "auto" }}>
          주소가 잘못되었거나 삭제된 프로젝트일 수 있습니다.
        </p>
        <p style={{ marginTop: "2rem" }}>
          <Link className="pill pill-link" to="/">
            목록으로 돌아가기
          </Link>
        </p>
      </div>
    </main>
  );
}
