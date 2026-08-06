/* ============================================================
   프로필 데이터
   이름, 소개, 연락처, 경력, 스킬을 여기서 수정합니다.
   ============================================================ */

window.PROFILE = {
  nameEn: "KIM JUYOUNG",
  nameKo: "김주영",

  // 첫 화면 큰 문장 (자유롭게 바꾸세요)
  tagline: "센서와 화면 사이를 잇는\n인터랙션을 만듭니다.",

  // 그 아래 소개 문단
  intro:
    "Unity를 중심으로 AR·VR, 전시 인터랙션, IoT 디바이스 연동까지 다뤄 왔습니다. " +
    "LiDAR·Depth Camera·RFID 같은 센서에서 들어온 데이터를 대형 화면 위의 경험으로 바꾸는 일을 주로 합니다. " +
    "기획부터 개발, 현장 설치와 납품까지 직접 맡습니다.",

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

  // 하단에 노출할 링크 (필요 없으면 빈 배열 [] 로)
  links: [
    { label: "GitHub", url: "https://github.com/cooldae" },
  ],
};
