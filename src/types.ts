/* ============================================================
   데이터 형태 정의 — 이 파일은 거의 고칠 일이 없습니다.

   여기 적힌 대로 data/projects.ts, data/profile.ts 를 쓰면
   오타나 빠진 항목을 에디터가 저장하는 순간 알려줍니다.

   `?` 가 붙은 항목은 없어도 되는 선택 항목입니다.
   ============================================================ */

export type Link = {
  label: string;
  url: string;
};

export type Career = {
  company: string;
  period: string;
  role?: string;
};

export type Education = {
  school: string;
  period: string;
  detail?: string;
};

export type Profile = {
  nameEn: string;
  nameKo: string;
  /** 첫 화면 맨 위 작은 글씨 */
  eyebrow: string;
  /** 첫 화면 큰 글자. 글자 하나씩 나타납니다 */
  headline: string;
  /** 큰 글자 아래 한 줄 */
  role: string;
  /** 그 아래 소개 문단. 비워두면 안 나옵니다 */
  intro: string;
  email: string;
  phone: string;
  showPhone: boolean;
  languages: string[];
  strengths: string[];
  skills: string[];
  careers: Career[];
  education: Education[];
  links: Link[];
};

/** 유튜브 주소만 적어도 되고, 이름을 붙이고 싶으면 객체로 적습니다. */
export type Video = string | { url: string; label?: string };

/** 상세 구현 내용처럼 소제목이 있는 긴 설명 */
export type DetailBlock = {
  heading: string;
  body: string;
};

export type Project = {
  /** 주소에 쓰입니다. 다른 프로젝트와 겹치면 안 됩니다. */
  slug: string;
  title: string;
  company: string;
  /** 분류. 첫 번째가 대표 분류로 카드에 표시됩니다.
   *  여러 개 적으면 어느 것으로 걸러도 나옵니다. */
  categories: string[];
  /** 화면에 그대로 표시되는 기간 문구 */
  period: string;
  /** 정렬용 "YYYY-MM". 최신이 위로. 같으면 파일에 적힌 순서 */
  start: string;
  status?: string;
  overview: string;
  stack: string[];
  work: string[];
  details?: DetailBlock[];
  achievement?: string;
  note?: string;
  links?: Link[];
  /** public/projects/<slug>/ 안의 파일명 */
  images: string[];
  youtube: Video | Video[];
};
