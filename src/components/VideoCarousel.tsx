import { useState } from "react";
import { embedUrl, type NormalizedVideo } from "../lib/media";

type Props = {
  videos: NormalizedVideo[];
  title: string;
};

export function VideoCarousel({ videos, title }: Props) {
  const [index, setIndex] = useState(0);

  if (videos.length === 0) return null;

  const move = (delta: number) => setIndex((i) => (i + delta + videos.length) % videos.length);
  const hasLabels = videos.some((v) => v.label);
  const current = videos[index];

  return (
    <div className="video-block">
      <div className="video-frame">
        {/* key 를 바꿔 iframe 을 새로 만들면 이전 영상 재생이 멈춥니다 */}
        <iframe
          key={current.id}
          src={embedUrl(current.id)}
          title={`${title} 영상`}
          loading="lazy"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>

      {hasLabels && <p className="vid-label">{current.label}</p>}

      {videos.length > 1 && (
        <div className="video-nav">
          <button type="button" className="vid-btn vid-prev" aria-label="이전 영상" onClick={() => move(-1)}>
            &#8249;
          </button>
          <span className="vid-count" aria-live="polite">
            {index + 1} / {videos.length}
          </span>
          <button type="button" className="vid-btn vid-next" aria-label="다음 영상" onClick={() => move(1)}>
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
}
