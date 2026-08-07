import type { Profile } from "../types";
/* ============================================================
   프로필 데이터
   이름, 소개, 연락처, 경력, 스킬을 여기서 수정합니다.
   ============================================================ */

export const PROFILE: Profile = {
  nameEn: "KIM JUYOUNG",
  nameKo: "김주영",

  // 첫 화면 맨 위 작은 글씨 — 무슨 일을 하는지 한 줄로
  eyebrow: "전시 인터랙션 · 게임 · AR/VR 콘텐츠 개발",

  // 첫 화면 큰 글자. 글자 하나씩 차례로 나타납니다.
  // 너무 길면 등장이 늘어지니 20자 안쪽을 권합니다.
  headline: "KIM JUYOUNG",

  // 큰 글자 바로 아래 한 줄
  role: "Unity Developer",

  // 그 아래 소개 문단. 비워두면 아무것도 안 나옵니다.
  intro: "",

  // About 섹션에 표시할 사진. public/ 폴더에 넣고 파일명만 적으세요.
  // 배경이 없는 PNG 를 넣으면 아래 연한 원 위에 인물만 올라갑니다.
  // 비워두면("") 사진 자리가 통째로 사라집니다.
  avatar: "avatar.png",

  email: "juyoung.kim.dev@gmail.com",

  // ⚠️ 이 파일은 공개 저장소에 그대로 올라갑니다.
  //    showPhone 이 false 라도 여기 적은 값은 누구나 열어볼 수 있습니다.
  //    화면에 안 보이는 것과 공개되지 않는 것은 다릅니다.
  //    번호를 노출할 각오가 섰을 때만 채우세요.
  phone: "",
  showPhone: false,

  // 첫 화면 알약 배지로 표시됩니다. 비워두면 아무것도 안 나옵니다.
  languages: [],

  strengths: [
    "다양한 경험과 다양한 지식",
    "업무 커뮤니케이션 스킬 (Slack · Notion · Figma 사용에 능숙)",
  ],

  // 첫 화면에 태그 형태로 표시됩니다. 순서대로 나옵니다.
  skills: [
    "Unity", "C#", "Unreal Engine", "C++", "Python", "Kotlin", "Java",
    "Vue", "Flask", "django", "MySQL", "Bootstrap 5", "HTML & CSS & JS",
    "TouchDesigner", "Networking", "Android Studio", "Linux",
    "Photoshop", "Figma", "Notion",
  ],

  // 경력 (최신순). 프로젝트의 company 값과 이름이 같아야 필터가 묶입니다.
  careers: [
    {
      company: "집쇼코리아(주)",
      period: "2024 ~ 현재",
      role: "전시 인터랙션 · AR/VR 콘텐츠 개발",
    },
    {
      company: "인터보이드(주)",
      period: "2022 ~ 2024",
      role: "R&D 및 콘텐츠 개발",
    },
  ],

  // 학력 (최신순). 비워두면 About 에서 카드 자체가 사라집니다.
  education: [
    {
      school: "상지대학교 컴퓨터공학과",
      period: "2016.02 ~ 2022.03",
      detail: "학사",
    },
    {
      school: "지능형 빅데이터 분석 실무자 양성 과정",
      period: "2021.09 ~ 2021.11",
      detail: "수료",
    },
  ],

  // 하단에 노출할 링크 (필요 없으면 빈 배열 [] 로)
  links: [
    { label: "GitHub", url: "https://github.com/cooldae" },
  ],
};
