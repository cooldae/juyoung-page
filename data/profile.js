/* ============================================================
   프로필 데이터
   이름, 소개, 연락처, 경력, 스킬을 여기서 수정합니다.
   ============================================================ */

window.PROFILE = {
  nameEn: "KIM JUYOUNG",
  nameKo: "김주영",

  // 첫 화면 큰 문장 (\n 을 넣으면 줄바꿈됩니다)
  tagline: "김주영의 포트폴리오",

  // 큰 문장 아래 소개 문단. 비워두면 아무것도 안 나옵니다.
  // 지금은 문단 대신 아래 skills 목록이 그 자리에 표시됩니다.
  intro: "",

  email: "juyoung.kim.dev@gmail.com",

  // 전화번호는 기본으로 숨겨져 있습니다.
  // 공개하려면 showPhone 을 true 로 바꾸세요. (스팸 수집 위험 있음)
  phone: "+82 10-8222-8762",
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
