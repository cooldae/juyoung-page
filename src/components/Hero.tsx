import { useRef } from "react";
import { PROFILE } from "../data/profile";
import { CursorGlow } from "./CursorGlow";

/** 큰 글자를 한 글자씩 나눠 순서대로 등장시킵니다.
 *  화면 낭독기에는 쪼개진 글자가 아니라 전체 문장으로 읽히도록 aria 를 씁니다. */
const CHAR_STEP = 0.04; // 글자 사이 간격 (초)

function Headline({ text }: { text: string }) {
  const chars = Array.from(text);

  return (
    <h1 className="headline" aria-label={text}>
      <span aria-hidden="true">
        {chars.map((ch, i) => {
          const delay = { animationDelay: `${i * CHAR_STEP}s` };
          if (ch === " ") {
            return <span className="ch ch-space" style={delay} key={i} />;
          }
          return (
            <span className="ch" style={delay} key={i}>
              <span className="ch-in">{ch}</span>
            </span>
          );
        })}
      </span>
    </h1>
  );
}

export function Hero() {
  const p = PROFILE;
  const hostRef = useRef<HTMLElement | null>(null);

  // 이름이 절반쯤 나타났을 때 나머지가 따라 들어오게 시간을 맞춥니다.
  // 전체가 1.2초 안에 끝나도록 잡았습니다. 더 늘어지면 읽기 전에 기다리게 됩니다.
  const CHIP_STEP = 0.022;
  const headlineTime = Array.from(p.headline).length * CHAR_STEP;
  const roleDelay = headlineTime * 0.5 + 0.18;
  const skillsDelay = roleDelay + 0.18;
  const metaDelay = skillsDelay + p.skills.length * CHIP_STEP + 0.1;

  return (
    <section className="hero" id="hero" ref={hostRef}>
      <CursorGlow hostRef={hostRef} />

      <div className="wrap">
        <p className="eyebrow fade-up" style={{ animationDelay: "0.05s" }}>
          {p.eyebrow}
        </p>

        <Headline text={p.headline} />

        {p.role && (
          <p className="hero-role fade-up" style={{ animationDelay: `${roleDelay}s` }}>
            {p.role}
          </p>
        )}

        {p.intro && (
          <p className="intro fade-up" style={{ animationDelay: `${roleDelay + 0.1}s` }}>
            {p.intro}
          </p>
        )}

        {p.skills.length > 0 && (
          <div className="hero-skills chips">
            {p.skills.map((s, i) => (
              <span
                className="chip fade-up"
                style={{ animationDelay: `${skillsDelay + i * CHIP_STEP}s` }}
                key={s}
              >
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="hero-meta fade-up" style={{ animationDelay: `${metaDelay}s` }}>
          <a className="pill pill-link" href={`mailto:${p.email}`}>
            {p.email}
          </a>

          {p.showPhone && p.phone && (
            <a className="pill pill-link" href={`tel:${p.phone.replace(/[^\d+]/g, "")}`}>
              {p.phone}
            </a>
          )}

          {p.links.map((l) => (
            <a
              key={l.url}
              className="pill pill-link"
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label}
            </a>
          ))}

          {p.languages.map((lang) => (
            <span className="pill" key={lang}>
              {lang}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
