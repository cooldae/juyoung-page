import { useEffect, useRef, useState } from "react";
import { categories, sortedProjects } from "../lib/projects";

/** 0 부터 목표값까지 올라가는 숫자.
 *  "동작 줄이기" 설정이면 처음부터 목표값을 그냥 보여줍니다. */
function useCountUp(target: number, duration = 1100, delay = 0) {
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let frame = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      // 끝에서 부드럽게 감속
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
      else done.current = true;
    };

    const timer = window.setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, duration, delay]);

  return value;
}

function Stat({ value, label, delay }: { value: number; label: string; delay: number }) {
  const n = useCountUp(value, 1100, delay);
  return (
    <div className="stat">
      <div className="stat-num">{n}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export function HeroStats({ delay = 0 }: { delay?: number }) {
  const projectCount = sortedProjects.length;
  const categoryCount = categories.length - 1; // "전체" 제외

  // 가장 이른 프로젝트의 연도
  const since = sortedProjects
    .map((p) => parseInt(p.start.slice(0, 4), 10))
    .filter((y) => !Number.isNaN(y))
    .reduce((min, y) => Math.min(min, y), 9999);

  return (
    <div className="hero-stats">
      <Stat value={projectCount} label="Projects" delay={delay} />
      <Stat value={categoryCount} label="Categories" delay={delay + 120} />
      <div className="stat">
        <div className="stat-num">{since === 9999 ? "—" : `${since} —`}</div>
        <div className="stat-label">Since</div>
      </div>
    </div>
  );
}
