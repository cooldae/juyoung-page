import { useEffect, useRef } from "react";

/** 커서를 부드럽게 따라오는 옅은 빛.
 *
 *  - 커서가 멈추면 빛도 멈춥니다. 혼자 계속 움직이는 연출은 오래 보면 피로합니다.
 *  - 마우스가 없는 기기(터치)와 "동작 줄이기" 설정에서는 아예 동작하지 않습니다.
 *  - transform 만 건드리고 requestAnimationFrame 으로 그립니다.
 */
export function CursorGlow({ hostRef }: { hostRef: React.RefObject<HTMLElement | null> }) {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const glow = glowRef.current;
    if (!host || !glow) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    // 목표 위치와 현재 위치. 둘이 만나면 그리기를 멈춥니다.
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let started = false;
    let frame = 0;

    const draw = () => {
      const dx = targetX - x;
      const dy = targetY - y;

      // 남은 거리가 0.5px 미만이면 멈춥니다 (계속 도는 것 방지)
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        frame = 0;
        return;
      }

      x += dx * 0.12;
      y += dy * 0.12;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      if (!started) {
        // 처음에는 커서 자리에서 바로 켜지게 합니다
        started = true;
        x = targetX;
        y = targetY;
        glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        glow.classList.add("is-on");
      }

      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onLeave = () => glow.classList.remove("is-on");
    const onEnter = () => {
      if (started) glow.classList.add("is-on");
    };

    host.addEventListener("mousemove", onMove);
    host.addEventListener("mouseleave", onLeave);
    host.addEventListener("mouseenter", onEnter);

    return () => {
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", onLeave);
      host.removeEventListener("mouseenter", onEnter);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [hostRef]);

  return <div className="hero-glow" ref={glowRef} aria-hidden="true" />;
}
