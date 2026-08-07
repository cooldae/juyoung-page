import { useCallback, useEffect, useRef, useState } from "react";
import { imageSrc } from "../lib/media";

type Props = {
  slug: string;
  images: string[];
  title: string;
};

export function Gallery({ slug, images, title }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const lastFocused = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const move = useCallback(
    (delta: number) => setIndex((i) => (i + delta + images.length) % images.length),
    [images.length]
  );

  const openAt = (i: number) => {
    lastFocused.current = document.activeElement as HTMLElement;
    setIndex(i);
    setOpen(true);
  };

  const close = useCallback(() => {
    setOpen(false);
    lastFocused.current?.focus();
  }, []);

  // 열려 있는 동안 배경 스크롤을 잠그고 키보드를 받습니다
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") move(-1);
      else if (e.key === "ArrowRight") move(1);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, move]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="gallery">
        {images.map((file, i) => (
          <button type="button" key={file} onClick={() => openAt(i)}>
            <img src={imageSrc(slug, file)} alt={`${title} 이미지 ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      <div
        className={"lightbox" + (open ? " is-open" : "")}
        role="dialog"
        aria-modal="true"
        aria-label="이미지 크게 보기"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <button type="button" className="lb-close" aria-label="닫기" ref={closeRef} onClick={close}>
          &times;
        </button>

        {images.length > 1 && (
          <button type="button" className="lb-nav lb-prev" aria-label="이전 이미지" onClick={() => move(-1)}>
            &#8249;
          </button>
        )}

        {open && <img src={imageSrc(slug, images[index])} alt={`${title} 이미지 ${index + 1}`} />}

        {images.length > 1 && (
          <button type="button" className="lb-nav lb-next" aria-label="다음 이미지" onClick={() => move(1)}>
            &#8250;
          </button>
        )}
      </div>
    </>
  );
}
