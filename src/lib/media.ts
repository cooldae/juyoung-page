import type { Video } from "../types";

/** 유튜브 주소에서 영상 ID를 뽑습니다.
 *  youtu.be / watch?v= / shorts / embed / live, 그리고 ID만 적은 경우도 인식합니다. */
export function youtubeId(input?: string): string {
  if (!input) return "";
  const raw = input.trim();
  if (/^[\w-]{11}$/.test(raw)) return raw;

  const patterns = [
    /youtu\.be\/([\w-]{11})/,
    /[?&]v=([\w-]{11})/,
    /\/shorts\/([\w-]{11})/,
    /\/embed\/([\w-]{11})/,
    /\/live\/([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = raw.match(p);
    if (m) return m[1];
  }
  return "";
}

export type NormalizedVideo = { id: string; label: string };

/** youtube 필드는 주소 하나도, 배열도, {url,label} 객체도 받습니다. */
export function normalizeVideos(input: Video | Video[] | undefined): NormalizedVideo[] {
  const raw: Video[] = Array.isArray(input) ? input : input ? [input] : [];
  const out: NormalizedVideo[] = [];

  for (const item of raw) {
    const url = typeof item === "string" ? item : item?.url;
    const id = youtubeId(url);
    if (id) {
      out.push({ id, label: typeof item === "string" ? "" : item.label ?? "" });
    }
  }
  return out;
}

/** 프로젝트 사진 경로. 파일명만 적으면 public/projects/<slug>/ 에서 찾습니다.
 *  http 로 시작하면 외부 주소로 그대로 씁니다. */
export function imageSrc(slug: string, file: string): string {
  if (/^https?:\/\//.test(file)) return file;
  return `${import.meta.env.BASE_URL}projects/${slug}/${file}`;
}

export function embedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}`;
}
