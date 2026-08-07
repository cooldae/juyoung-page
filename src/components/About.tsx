import { PROFILE } from "../data/profile";

/* Skills 목록은 첫 화면(Hero)에 있습니다.
   여기에 다시 만들면 같은 태그 20개가 한 페이지에 두 번 나옵니다. */

export function About() {
  const p = PROFILE;

  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>About</h2>
        </div>

        <div className="about-grid">
          <div className="card reveal">
            <h3>Career</h3>
            <div className="career">
              {p.careers.map((c) => (
                <div className="career-item" key={c.company}>
                  <span className="co">{c.company}</span>
                  <span className="pd">{c.period}</span>
                  {c.role && <span className="rl">{c.role}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="card reveal">
            <h3>Strengths</h3>
            <ul className="bullets">
              {p.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          {p.education.length > 0 && (
            <div className="card reveal">
              <h3>Education</h3>
              <div className="career">
                {p.education.map((e) => (
                  <div className="career-item" key={e.school}>
                    <span className="co">{e.school}</span>
                    <span className="pd">{e.period}</span>
                    {e.detail && <span className="rl">{e.detail}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
