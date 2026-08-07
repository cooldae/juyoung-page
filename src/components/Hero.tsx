import { useEffect, useRef, useState } from "react";
import { PROFILE } from "../data/profile";
import { CursorGlow } from "./CursorGlow";
import { HeroStats } from "./HeroStats";

const CHAR_STEP = 0.04; // 글자 사이 등장 간격 (초)
const CHIP_STEP = 0.022;

const WAVE_RADIUS = 130; // 커서 주변 몇 px 까지 글자가 반응할지
const WAVE_LIFT = 15; // 가장 가까운 글자가 뜨는 높이 (px)

/** 큰 글자 — 한 글자씩 등장하고, 커서가 지나가면 물결처럼 반응합니다.
 *  화면 낭독기에는 쪼개진 글자가 아니라 전체 문장으로 읽힙니다. */
function Headline({ text }: { text: string }) {
  const chars = Array.from(text);
  const rootRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    const inners = Array.from(root.querySelectorAll<HTMLElement>(".ch-in"));
    let frame = 0;
    let mouseX = 0;

    const apply = () => {
      frame = 0;
      for (const el of inners) {
        const box = el.getBoundingClientRect();
        const center = box.left + box.width / 2;
        const distance = Math.abs(center - mouseX);

        if (distance > WAVE_RADIUS) {
          el.style.transform = "";
          continue;
        }
        // 가까울수록 크게, 멀수록 부드럽게 0 으로 (코사인 곡선)
        const falloff = (Math.cos((distance / WAVE_RADIUS) * Math.PI) + 1) / 2;
        el.style.transform = `translateY(${-WAVE_LIFT * falloff}px)`;
      }
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      for (const el of inners) el.style.transform = "";
    };

    // 글자 위가 아니라 히어로 전체에서 받아야 자연스럽게 이어집니다
    const host = root.closest(".hero") ?? root;
    host.addEventListener("mousemove", onMove as EventListener);
    host.addEventListener("mouseleave", onLeave);

    return () => {
      host.removeEventListener("mousemove", onMove as EventListener);
      host.removeEventListener("mouseleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [text]);

  return (
    <h1 className="headline" aria-label={text} ref={rootRef}>
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
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // 스크롤하면 첫 화면이 살짝 느리게 따라오며 흐려집니다
  useEffect(() => {
    const main = mainRef.current;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      if (!main || calm) return;

      const limit = window.innerHeight * 0.9;
      const t = Math.min(1, y / limit);
      main.style.transform = `translateY(${y * 0.22}px)`;
      main.style.opacity = String(1 - t * 0.85);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // 이름이 절반쯤 나타났을 때 나머지가 따라 들어오게 시간을 맞춥니다.
  // 전체가 1.2초 안에 끝나도록 잡았습니다.
  const headlineTime = Array.from(p.headline).length * CHAR_STEP;
  const roleDelay = headlineTime * 0.5 + 0.18;
  const skillsDelay = roleDelay + 0.18;
  const metaDelay = skillsDelay + p.skills.length * CHIP_STEP + 0.1;

  return (
    <section className="hero" id="hero" ref={hostRef}>
      <CursorGlow hostRef={hostRef} />

      <div className="wrap">
        <div className="hero-inner" ref={mainRef}>
          <div className="hero-main">
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

          <div className="fade-up" style={{ animationDelay: `${roleDelay}s` }}>
            <HeroStats delay={roleDelay * 1000} />
          </div>
        </div>
      </div>

      <div
        className={"scroll-hint" + (scrolled ? " is-gone" : "")}
        style={{ animationDelay: `${metaDelay + 0.2}s` }}
        aria-hidden="true"
      >
        <span className="scroll-hint-line" />
        <span className="scroll-hint-text">SCROLL</span>
      </div>
    </section>
  );
}
