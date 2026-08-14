import type { Project } from "../types";
/* ============================================================
   프로젝트 데이터  ―  이 파일만 고치면 사이트가 갱신됩니다.

   ▼ 새 프로젝트 추가법
     아래 목록에 { ... } 블록 하나를 복사해서 붙여넣고 내용만 바꾸세요.
     맨 위에 넣으면 목록에서도 위쪽에 나옵니다.

   ▼ 필드 설명
     slug      : 주소에 쓰이는 영문 이름. 다른 프로젝트와 겹치면 안 됩니다.
                 → project.html?id=<slug>
     title     : 프로젝트명
     company   : 소속 (profile.ts 의 careers 회사명과 같게 쓰세요)
     categories: 분류. 필터 버튼이 이 값에서 만들어집니다.
                 첫 번째가 대표 분류로 카드에 표시됩니다.
                 여러 개 적으면 어느 것으로 걸러도 나옵니다.
                   categories: ["게임", "드로잉 · 미디어아트"],
                 현재 쓰는 분류 (새 이름을 쓰면 버튼이 자동으로 생깁니다)
                   게임 / 전시 인터랙션 / AR · VR · IoT / 드로잉 · 미디어아트 / 앱 · 웹
     period    : 화면에 그대로 표시되는 기간 문구
     start     : 정렬용 키 "YYYY-MM". 최신이 위로 옵니다.
                 같은 값이면 이 파일에 적힌 순서를 따릅니다.
     status    : "진행 중" 같은 배지. 없으면 생략하세요.
     overview  : 프로젝트 개요 (B)
     stack     : 기술 스택 (C) — 배열
     work      : 담당 업무 및 구현 내용 (D) — 배열, 한 줄에 하나씩
     details   : 더 자세한 내용이 필요할 때. [{ heading, body }] — 없으면 생략
     achievement: 성과 문구 — 없으면 생략
     note      : 활용처·출장 등 부가 정보 — 없으면 생략
     links     : 관련 링크 [{ label, url }] — 없으면 생략
     images    : 사진 파일명 배열.
                 assets/projects/<slug>/ 폴더에 넣고 파일명만 적으세요.
                 예) images: ["01.jpg", "02.jpg"]
     youtube   : 유튜브 주소를 그대로 붙여넣으면 됩니다.
                 youtu.be / watch?v= / shorts 전부 인식합니다. 없으면 "" 로.

                 영상이 여러 개면 배열로 적으세요. 좌우 화살표로 넘길 수 있습니다.
                   youtube: [
                     "https://youtu.be/AAAAAAAAAAA",
                     "https://youtu.be/BBBBBBBBBBB",
                   ],

                 영상마다 이름을 붙이고 싶으면 이렇게도 됩니다.
                   youtube: [
                     { url: "https://youtu.be/AAAAAAAAAAA", label: "메인관 Timespace" },
                     { url: "https://youtu.be/BBBBBBBBBBB", label: "꽃 관" },
                   ],
   ============================================================ */

/** 필터 버튼이 나오는 순서입니다. 줄 순서만 바꾸면 화면에도 그대로 반영됩니다.
 *  여기 없는 분류를 프로젝트에 쓰면 버튼이 맨 뒤에 자동으로 생깁니다. */
export const CATEGORY_ORDER = [
  "게임",
  "전시 인터랙션",
  "드로잉 · 미디어아트",
  "AR · VR · IoT",
  "앱 · 웹",
];

export const PROJECTS: Project[] = [
  {
    slug: "hungry-cat-fishing",
    featured: true,
    title: "배고파서 낚시하는 고양이 — 웹 방치형 낚시 게임",
    company: "개인 프로젝트",
    categories: ["게임", "앱 · 웹"],
    period: "2026",
    start: "2026-02",
    status: "운영 중",
    overview:
      "물고기 도감 150종을 모으는 웹 방치형 낚시 게임. 지역별 획득 확률과 낚싯대·미끼·바구니 업그레이드로 수집 루프를 설계하고, 자동 낚시·세이브 무결성 검증·다국어까지 직접 만들어 배포하고 운영 중인 개인 프로젝트",
    stack: ["React", "Vite", "JavaScript", "Cloudflare Pages", "i18n", "Kakao AdFit", "SEO / OG"],
    work: [
      "물고기 도감 150종과 지역별 획득 확률 테이블 설계",
      "재화·상점·낚싯대/미끼/바구니 업그레이드 등 게임 경제 설계",
      "행운·가치 스탯이 획득 결과에 반영되는 구조 구현",
      "자동 낚시 세션 로직 구현 (자동 릴 낚싯대 해금형)",
      "체크섬 기반 세이브 데이터 무결성 검증 구현 — 저장값 변조 방지",
      "개발용 치트 패널 및 토큰 인증 구현",
      "다국어 지원 구현 (문자열 586개 × 2개 언어)",
      "Cloudflare Pages 기반 자동 배포 파이프라인 구성 및 도메인 연결",
      "OG 카드·검색 색인 등 SEO 작업 및 광고 연동",
    ],
    links: [{ label: "hungrycatfishing.com — 직접 플레이해 보실 수 있습니다", url: "https://hungrycatfishing.com/" }],
    images: [],
    youtube: "",
  },

  {
    slug: "unbbal-lab",
    title: "운빨실험실 — 운세 · 미니게임 웹 서비스",
    company: "개인 프로젝트",
    categories: ["앱 · 웹", "게임"],
    period: "2026",
    start: "2026-02",
    status: "운영 중",
    overview:
      "운빨 측정, 오늘의 운세, 운빨 아케이드, 두뇌 벤치마크 네 개 섹션으로 구성된 엔터테인먼트 웹 서비스. 기획부터 개발·배포·검색 노출·광고 연동·운영까지 혼자 맡고 있는 개인 프로젝트",
    stack: ["JavaScript", "Cloudflare Pages", "i18n", "Kakao AdFit", "Google Search Console", "SEO"],
    work: [
      "운빨 측정 · 오늘의 운세 · 운빨 아케이드 · 두뇌 벤치마크 4개 섹션 개발",
      "다국어 지원 구현",
      "Cloudflare Pages 자동 배포 구성 및 도메인 연결",
      "구글 서치콘솔·네이버 검색 등록 및 색인 관리",
      "광고 플랫폼 연동",
      "개인정보처리방침 등 서비스 운영 문서 정비",
    ],
    links: [{ label: "unbbal.com — 직접 사용해 보실 수 있습니다", url: "https://unbbal.com/" }],
    images: [],
    youtube: "",
  },

  {
    slug: "hand-tracking-fortress",
    title: "비전 기반 핸드트래킹 게임 개발 – 포트리스",
    company: "집쇼코리아(주)",
    categories: ["게임"],
    period: "2026",
    start: "2026-03",
    status: "R&D",
    overview:
      "웹캠으로 인식한 손동작을 실시간으로 Unity에 전달하여, 별도 컨트롤러 없이 손 제스처만으로 조준·발사·이동·화면 확대를 수행하는 턴제 포격 게임 콘텐츠",
    stack: [
      "Unity Windows", "MediaPipe", "Python", "OpenCV", "UDP Socket 통신",
      "Computer Vision", "Hand Landmark Detection", "Gesture Recognition",
      "1€ Filter", "Procedural Terrain Generation", "Destructible Terrain",
      "Ballistics Simulation", "Multi-User Interaction", "MCP(Model Context Protocol)",
    ],
    work: [
      "Python·MediaPipe 기반 손 랜드마크 추출 서버 직접 개발",
      "21개 랜드마크의 실시간 UDP 전송 프로토콜 설계 및 Unity 수신 구조 구현 (백그라운드 스레드 수신 + 메인 스레드 파싱)",
      "1€ Filter 기반 좌표 떨림 보정 및 입력 지연 최소화 구현",
      "이중 임계값·프레임 디바운스 기반 손 제스처 판정 로직 구현 (주먹·브이·손 기울기)",
      "실측 데이터 기반 제스처 임계값 보정 도구 직접 개발",
      "새총 방식 조준 인터랙션 구현 (잡기 → 당기기 → 놓기)",
      "높이맵 기반 파괴 가능 지형 및 절차적 지형 생성 5종 구현",
      "중력·바람·충돌 속도를 반영한 탄도 시뮬레이션 및 데미지 연출 구현",
      "손 기울기 기반 차량 이동과 연료·등판각 제한 구현",
      "턴제 게임 루프 및 다중 참여자 구조 구현",
    ],
    research: [
      "실측 데이터 기반 제스처 신호 재설계 — 분포가 겹쳐 쓸 수 없던 지표를 분리 여유 0.77의 지표로 전환",
      "필터 파라미터의 좌표계 의존성 규명 및 입력 지연 165ms 제거",
      "2D 투영 측정의 구조적 결함 규명 및 3D 측정으로 환원",
      "제스처 간 충돌 자동 검증 도구 개발",
      "절차적 생성 맵의 플레이 가능성 자동 검증 로직 구현",
    ],
    images: [],
    youtube: "",
  },

  {
    slug: "museum-ai-qna",
    title: "국립세계문자박물관 어린이체험관 AI 문답 콘텐츠 개발",
    company: "집쇼코리아(주)",
    categories: ["전시 인터랙션", "앱 · 웹"],
    period: "2026",
    start: "2026-03",
    overview:
      "어린이 관람객이 질문 유형을 선택하면 Gemini API를 통해 맞춤형 답변을 생성하고, 음성 답변과 카드 인쇄까지 연동되는 AI 문답 체험 콘텐츠",
    stack: ["Unity", "Gemini API", "Whisper STT", "AI Response System", "Printer 연동", "콘텐츠 ID Mapping"],
    work: [
      "질문 유형 및 선택 ID 기반 Gemini API 요청 구조 구현",
      "특정 ID 값에 대응되는 답변을 정해진 콘텐츠 범위 내에서 출력하는 AI 응답 로직 구현",
      "Whisper 모델 기반 STT 음성 입력 기능 구현",
      "생성된 답변을 카드 형태로 출력하기 위한 인쇄기 연동 구현",
      "어린이 체험 환경에 맞춘 질문 선택·답변 생성·음성 입력·카드 출력 흐름 구현",
    ],
    note: "공공기관 프로젝트",
    images: [],
    youtube: "",
  },

  {
    slug: "socket-racing",
    title: "소켓통신 모바일 게임 개발 – 레이싱",
    company: "집쇼코리아(주)",
    categories: ["게임"],
    period: "2026",
    start: "2026-01",
    status: "진행 중",
    overview:
      "모바일 Web과 Unity Display를 연동하여 사용자가 모바일을 핸들처럼 조작하고, 대형 화면에서 차량을 운전하는 다중 참여형 레이싱 게임 콘텐츠",
    stack: ["Unity Windows", "Mobile Web Frontend", "API Server", "Swagger", "Socket 통신", "Gyro Sensor", "QR Code", "Multi-User Interaction", "Racing Game"],
    work: [
      "모바일 Web Frontend 및 API Server 직접 개발",
      "Swagger 기반 API 테스트 페이지 구성",
      "Web에서 생성된 1회용 참여 서버 URL을 API로 Unity에 전달하고 QR 코드로 변환하는 참여 흐름 구현",
      "모바일 자이로 센서 데이터 및 참가자 ID의 API 기반 Unity 전송 연동 구현",
      "Unity에서 모바일을 핸들처럼 사용하는 조향 인터랙션 구현",
      "대형 화면 기반 레이싱 게임 로직 및 다중 사용자 참여 구조 구현",
    ],
    images: [],
    youtube: "",
  },

  {
    slug: "socket-zombie-shooting",
    title: "소켓통신 모바일 게임 개발 – 좀비 슈팅",
    company: "집쇼코리아(주)",
    categories: ["게임"],
    period: "2026",
    start: "2026-01",
    status: "진행 중",
    overview:
      "모바일 Web과 Unity Display를 연동하여 사용자가 모바일을 총처럼 조작하고, 대형 화면에서 좀비를 조준·처치하는 다중 참여형 슈팅 게임 콘텐츠",
    stack: ["Unity Windows", "Mobile Web Frontend", "API Server", "Swagger", "Socket 통신", "Gyro Sensor", "QR Code", "Multi-User Interaction"],
    work: [
      "모바일 Web Frontend 및 API Server 직접 개발",
      "Swagger 기반 API 테스트 페이지 구성",
      "Web에서 생성된 1회용 참여 서버 URL을 API로 Unity에 전달하고 QR 코드로 변환하는 참여 흐름 구현",
      "모바일 자이로 센서 데이터 및 참가자 ID의 API 기반 Unity 전송 연동 구현",
      "Unity에서 모바일을 총처럼 사용하는 조준·발사 인터랙션 구현",
      "대형 화면 기반 좀비 슈팅 게임 로직 및 다중 사용자 참여 구조 구현",
    ],
    images: ["project_socket-zombie-shooting_1.png", "project_socket-zombie-shooting_2.png"],
    youtube: "",
  },

  {
    slug: "gangneung-dart-game",
    title: "강릉 메타버스체험관 소켓 통신 다트 게임 개발",
    company: "집쇼코리아(주)",
    categories: ["게임"],
    period: "2026",
    start: "2026-01",
    overview:
      "모바일 Web과 Unity Display를 연동하여, 사용자가 모바일의 자이로 센서로 다트를 조준·던지고 대형 화면에서 게임 결과와 랭킹을 확인할 수 있는 다중 참여형 체험 콘텐츠",
    stack: ["Unity Windows", "Mobile Web", "Socket 통신", "API 연동", "Gyro Sensor", "QR Code", "Ranking System"],
    work: [
      "모바일 Web–Unity Display 간 Socket 통신 구조 구현",
      "Web에서 생성한 1회용 서버 URL을 API로 Unity에 전달하고 QR 코드로 변환하는 참여 흐름 구현",
      "참가자가 QR 코드로 모바일 Web에 접속해 게임에 참여하는 구조 구현",
      "모바일 자이로 센서 데이터 및 참가자 ID의 API 기반 Unity 전송 연동 구현",
      "Unity 대형 화면에서 자이로 센서 기반 다트 조준·투척 로직 구현",
      "다수 참가자 동시 참여 처리 및 랭킹 시스템 구현",
    ],
    images: ["project_gangneung-dart-game_1.jpg", "project_gangneung-dart-game_2.jpg"],
    youtube: "",
  },

  {
    slug: "color2life-alphabet",
    featured: true,
    title: "컬러투라이프 알파벳 어드벤처 버전 개발",
    company: "집쇼코리아(주)",
    categories: ["게임", "드로잉 · 미디어아트"],
    period: "2026",
    start: "2026-01",
    overview:
      "대형 화면에 제시된 영어 단어를 완성하기 위해 여러 사용자가 맵에 흩어진 알파벳 3D 조각을 수집하고, 단어 완성 시 해당 영어 단어의 음성과 3D 환경을 대형 화면 및 태블릿에서 체험할 수 있는 다중 사용자 영어 학습형 어드벤처 콘텐츠",
    stack: ["Unity Android", "Unity Windows", "Socket 통신", "3D Model Painting", "Multi-User Interaction", "3D Word Environment", "NPC System", "Mini Map", "Camera Control"],
    work: [
      "태블릿용 Unity Android 프로젝트와 대형 화면용 Unity Windows 프로젝트 분리 개발",
      "대형 화면 목표 영어 단어 표시 및 알파벳 3D 조각 수집형 게임 구조 구현",
      "다중 사용자 알파벳 수집 데이터 연동 및 단어 완성 판정 로직 구현",
      "단어 완성 시 영어 음성 재생 및 단어별 3D 환경 출력 구현",
      "Castle 등 단어별 3D 모델 표시와 카메라 시점 전환 로직 구현",
      "NPC 및 미니맵 기능 구현",
      "대형 화면과 태블릿 간 콘텐츠 진행 상태 동기화 구현",
    ],
    note: "활용처 — 나라장터엑스포 2026 / Content Tokyo 2026 전시",
    images: [],
    youtube: [
      // project_color2life-alphabet_1.mp4
      { url: "https://youtu.be/MR_Jr6IzwdQ", label: "캐릭터 색칠" },
      // project_color2life-alphabet_2.mp4
      { url: "https://youtu.be/K8qjgvfAmxA", label: "게임 플레이" },
    ],
  },

  {
    slug: "royal-cuisine-minigame",
    title: "국가유산진흥원 궁중음식 미니게임 태블릿 앱 개발",
    company: "집쇼코리아(주)",
    categories: ["게임", "앱 · 웹"],
    period: "2026",
    start: "2026-01",
    overview:
      "태블릿 환경에서 궁중음식 주제의 퀴즈와 인터랙션 퍼즐을 체험할 수 있는 교육형 미니게임 앱으로, 퀴즈와 퍼즐 요소가 포함된 콘텐츠 2개로 구성",
    stack: ["Unity Android", "Tablet App", "Quiz System", "Puzzle Interaction", "Dialogue System"],
    work: [
      "태블릿용 Unity Android 앱 개발",
      "궁중음식 주제의 퀴즈 및 인터랙션 퍼즐 기능 구현",
      "콘텐츠 2개 각각의 다이얼로그 및 진행 흐름 구현",
      "정답/오답 처리와 퍼즐 완료 조건 처리 구현",
      "태블릿 환경에 맞춘 UI/UX 및 터치 입력 처리 구현",
    ],
    images: ["project_royal-cuisine-minigame_1.jpg", "project_royal-cuisine-minigame_2.jpg", "project_royal-cuisine-minigame_3.jpg", "project_royal-cuisine-minigame_4.jpg", "project_royal-cuisine-minigame_5.jpg", "project_royal-cuisine-minigame_6.jpg"],
    youtube: "",
  },

  {
    slug: "jeju-dokdo-center",
    title: "제주도 독도 체험관 인터랙션 콘텐츠 개발",
    company: "집쇼코리아(주)",
    categories: ["전시 인터랙션"],
    period: "2026",
    start: "2026-01",
    overview:
      "Hokuyo LiDAR 센서를 활용해 대형 화면 앞 사용자 위치를 감지하고, 화면 내 8개 영역 터치/접근에 따라 서로 다른 인터랙션 반응을 제공하는 체험형 전시 콘텐츠",
    stack: ["Unity", "Hokuyo LiDAR Sensor", "Position Tracking", "대형 디스플레이 연동"],
    work: [
      "Hokuyo LiDAR 센서 데이터 수신 및 사용자 위치 좌표 가공 구현",
      "대형 화면 내 8개 인터랙션 영역 매핑 구현",
      "사용자 터치/접근 위치 기반 영역별 인터랙션 반응 출력 구현",
      "전시 환경에 맞춘 센서 인식 범위 보정 및 콘텐츠 동작 안정화 구현",
    ],
    images: ["project_jeju-dokdo-center_1.jpg", "project_jeju-dokdo-center_2.jpg", "project_jeju-dokdo-center_3.jpg"],
    youtube: [
      // project_jeju-dokdo-center_1.mp4
      "https://youtu.be/D0oqTtdqV80",
    ],
  },

  {
    slug: "busan-maritime-museum",
    title: "부산 국립해양박물관 인터랙션 콘텐츠 개발",
    company: "집쇼코리아(주)",
    categories: ["전시 인터랙션"],
    period: "2026",
    start: "2026-01",
    overview:
      "벽면에 설치된 6개의 RFID Reader를 활용해 사용자가 카드를 태그하면, 카드별 등록 ID에 따라 대형 화면에서 서로 다른 인터랙션 반응이 출력되는 체험형 전시 콘텐츠",
    stack: ["Unity", "RFID Reader", "ACR120U", "ID Mapping", "대형 디스플레이 연동"],
    work: [
      "ACR120U RFID Reader 6대 연동 구현",
      "카드별 고유 ID 등록 및 콘텐츠 매핑 구조 구현",
      "RFID 태그 입력 기반 대형 화면 인터랙션 콘텐츠 출력 구현",
      "다중 리더기 입력 처리 및 콘텐츠 반응 제어 구현",
    ],
    images: [],
    youtube: [
      // project_busan-maritime-museum_1.mp4
      "https://youtu.be/nSMeOHIJk5o",
    ],
  },

  {
    slug: "color2life-gangneung",
    title: "컬러투라이프 강릉 콘텐츠 개발",
    company: "집쇼코리아(주)",
    categories: ["게임", "드로잉 · 미디어아트"],
    period: "2026",
    start: "2026-01",
    overview:
      "태블릿에서 사용자가 직접 색칠한 캐릭터를 활용해 여러 사용자가 실시간으로 접속하고, 서로의 왕관을 빼앗으며 경쟁하는 다중 사용자 대전형 인터랙션 콘텐츠",
    stack: ["Unity Android", "Unity Windows", "Mirror Networking", "Socket 통신", "3D Model Painting", "Multi-User Interaction", "Camera Tracking"],
    work: [
      "태블릿용 Unity Android 프로젝트와 대형 화면용 Unity Windows 프로젝트 분리 개발",
      "사용자가 색칠한 캐릭터 데이터의 대형 화면 연동 구현",
      "Mirror Networking 기반 다중 사용자 실시간 접속 및 동기화 구현",
      "캐릭터 이동·충돌·왕관 획득/탈취/보유 상태 로직 구현",
      "왕관 보유자를 대형 화면 카메라가 추적해 비추는 카메라 타깃 전환 로직 구현",
      "대형 화면에서 전체 플레이어 상태 및 게임 진행 상황 출력 구현",
      "다중 사용자 대전 플레이 환경에 맞춘 네트워크 안정화 구현",
    ],
    images: ["project_color2life-gangneung_1.jpg"],
    youtube: "",
  },

  {
    slug: "color2life-haman",
    title: "컬러투라이프 함안 콘텐츠 개발",
    company: "집쇼코리아(주)",
    categories: ["게임", "드로잉 · 미디어아트"],
    period: "2026",
    start: "2026-01",
    overview:
      "태블릿에서 사용자가 직접 색칠한 사슴 캐릭터를 대형 화면으로 전송하고, 여러 사용자가 각자의 사슴 캐릭터로 함께 조작·플레이할 수 있는 다중 사용자 참여형 레이싱/인터랙션 콘텐츠",
    stack: ["Unity Android", "Unity Windows", "Socket 통신", "API 연동", "3D Model Painting", "Multi-User Interaction", "Racing Game"],
    work: [
      "태블릿용 Unity Android 프로젝트와 대형 화면용 Unity Windows 프로젝트 분리 개발",
      "사용자가 색칠한 사슴 캐릭터 데이터의 Socket 통신 기반 전송 구현",
      "대형 화면에서 여러 사용자의 사슴 캐릭터 동시 출력 및 조작 기능 구현",
      "사슴 캐릭터 직접 컨트롤 기반 레이싱/인터랙션 콘텐츠 구현",
      "사용자 색상·성별·나이 데이터 API 수집 연동 구현",
      "다중 사용자 접속 및 플레이 데이터 처리 구현",
    ],
    images: ["project_color2life-haman_1.jpg"],
    youtube: [
      // project_color2life-haman_1.mp4
      "https://youtu.be/bKL4vcDM7CA",
    ],
  },

  {
    slug: "ai-live-drawing",
    title: "AI 라이브 드로잉 콘텐츠 개발",
    company: "집쇼코리아(주)",
    categories: ["드로잉 · 미디어아트"],
    period: "2026.01.10 ~ 2026.03.01",
    start: "2026-01",
    overview:
      "Unity에서 사용자가 2D 그림을 그리면, 해당 드로잉 화면과 선택 주제를 TouchDesigner로 실시간 전송하여 StreamDiffusion 기반 AI 드로잉 결과를 생성하고, 사용자 결과물을 영상으로 저장 및 QR 코드로 제공하는 인터랙티브 콘텐츠",
    stack: ["Unity", "TouchDesigner", "StreamDiffusion", "Firebase", "NDI Sender", "TCP Protocol", "FFmpeg"],
    work: [
      "Unity에서 선택한 그림 주제를 TCP Socket을 통해 TouchDesigner로 전송하고 프롬프트 생성 로직과 연동",
      "NDI Sender를 활용해 Unity의 실시간 드로잉 화면을 TouchDesigner로 스트리밍",
      "TouchDesigner 내부 StreamDiffusion 모델을 통해 사용자 드로잉 기반 AI 이미지 생성 파이프라인 구현",
      "사용자 드로잉 화면과 AI 생성 결과를 30초간 동시 녹화하는 기능 구현",
      "FFmpeg를 활용한 녹화 영상 저장 및 Firebase Storage 업로드 처리 구현",
      "Firebase Storage URL을 TCP Socket으로 Unity에 반환하고 QR 코드로 변환하여 사용자 다운로드 기능 구현",
    ],
    images: ["project_ai-live-drawing_1.jpg", "project_ai-live-drawing_2.jpg", "project_ai-live-drawing_3.jpg", "project_ai-live-drawing_4.jpg", "project_ai-live-drawing_5.jpg", "project_ai-live-drawing_6.jpg", "project_ai-live-drawing_7.jpg", "project_ai-live-drawing_8.jpg"],
    youtube: "",
  },

  {
    slug: "jeju-vr-app",
    title: "국가유산진흥원 「한눈에 보는 제주도」 VR 앱 개발",
    company: "집쇼코리아(주)",
    categories: ["AR · VR · IoT"],
    period: "2025.11.24 ~ 2025.12.18",
    start: "2025-11",
    overview:
      "태블릿 앱의 스토리모드 콘텐츠를 VR 환경에 맞게 요약·전환하여, Meta Quest 3S에서 제주도 주요 지역을 몰입형으로 체험할 수 있도록 개발한 VR 콘텐츠 앱",
    stack: ["Unity", "Meta Quest 3S", "XR Interaction Toolkit", "VR", "360 Image Viewer", "Audio/Video Playback"],
    work: [
      "태블릿 앱 스토리모드 콘텐츠를 VR 환경에 맞게 재구성 구현",
      "Meta Quest 3S 기반 VR 앱 개발",
      "제주도 주요 지역별 360 이미지 탐색 및 몰입형 콘텐츠 체험 기능 구현",
      "VR 환경에 맞춘 UI/UX 및 입력 방식 적용 구현",
      "음성/영상 해설 콘텐츠 재생 기능 구현",
    ],
    images: [],
    youtube: "",
  },

  {
    slug: "jeju-tablet-app",
    featured: true,
    title: "국가유산진흥원 「한눈에 보는 제주도」 태블릿 앱 개발",
    company: "집쇼코리아(주)",
    categories: ["앱 · 웹", "AR · VR · IoT"],
    period: "2025.08.31 ~ 2025.11.26",
    start: "2025-08",
    overview:
      "스토리모드와 AR모드로 구성된 제주도 주요 지역 9곳 소개 태블릿 앱으로, 스토리모드에서는 디지털 북·아이템 수집·지역별 미니게임·음성/영상 해설 및 360 이미지 기반 장소 탐색 기능을 제공하고, AR모드에서는 이미지 마커 기반 지역별 3D 모델 뷰어와 음성 해설을 제공하는 체험형 교육 콘텐츠",
    stack: ["Unity Android", "AR Foundation", "Image Tracking", "3D Model Viewer", "360 Image Viewer", "Audio/Video Playback", "콘텐츠 데이터 관리"],
    work: [
      "제주도 주요 지역 9곳의 대용량 텍스트·이미지·영상·음성·3D 모델·360 이미지 데이터를 앱 구조에 맞게 분류 및 관리 구현",
      "지역별 세부 장소를 360 이미지로 이동하며 확인할 수 있는 장소 탐색 기능 구현",
      "스토리모드와 AR모드 간 콘텐츠 데이터 연동 구조 구현",
      "스토리모드 기반 디지털 북·아이템 수집·지역별 미니게임 콘텐츠 구현",
      "음성/영상 해설 재생 기능 구현",
      "AR Foundation Image Tracking 기반 이미지 마커 인식 기능 구현",
      "AR모드 내 지역별 3D 모델 표시 및 음성 해설 연동 구현",
    ],
    images: ["project_jeju-tablet-app_1.jpg", "project_jeju-tablet-app_2.jpg", "project_jeju-tablet-app_3.jpg", "project_jeju-tablet-app_4.jpg"],
    youtube: [
      // project_jeju-tablet-app_1.mp4
      { url: "https://youtu.be/wREVoiT9vx8", label: "스토리모드 디지털북" },
      // project_jeju-tablet-app_2.mp4
      { url: "https://youtu.be/All94h3Te9I", label: "AR 모드" },
    ],
  },

  {
    slug: "windows-video-player",
    title: "Windows Video Player 개발",
    company: "집쇼코리아(주)",
    categories: ["앱 · 웹"],
    period: "2025.07.25 ~ 2025.08.15",
    start: "2025-07",
    overview:
      "Windows 환경에서 로컬 영상 파일을 선택하고 재생할 수 있는 비디오 플레이어 애플리케이션",
    stack: ["Unity", "AVPro Video", "File Browser"],
    work: [
      "AVPro Video 패키지 기반 영상 재생 기능 구현",
      "File Browser를 활용한 로컬 비디오 파일 선택 기능 구현",
      "Windows 환경에 맞춘 재생 제어 및 플레이어 UI 구현",
    ],
    images: [],
    youtube: "",
  },

  {
    slug: "pado-art-museum",
    featured: true,
    title: "파타야 Pado Art Museum 인터랙션 콘텐츠 개발 및 출장 납품",
    company: "집쇼코리아(주)",
    categories: ["전시 인터랙션"],
    period: "2025.04.03 ~ 2025.08.20",
    start: "2025-04",
    overview:
      "태국 파타야 Pado Art Museum 내 대형 몰입형 전시 공간에서 Hokuyo LiDAR 센서와 Helios2 Depth Camera를 활용해 사용자 위치 기반 인터랙션 콘텐츠를 개발하고, 현장 설치·테스트·납품까지 수행한 프로젝트",
    stack: ["Unity", "Python", "TCP Socket 통신", "Hokuyo LiDAR Sensor", "Helios2 Depth Camera", "Depth Data Processing", "Multi-Camera Management"],
    work: [
      "전체 인터랙션 콘텐츠 100% 단독 개발",
      "Hokuyo LiDAR 센서 데이터 수신 및 Unity 내 사용자 위치 데이터 가공 구현",
      "Display 업체와 TCP 통신 기반 상태값 송수신 및 수신 확인 응답 구조 구현",
      "사용자 위치 기반 인터랙션 콘텐츠 총 8종 구현",
      "Helios2 Depth Camera 기반 사용자 위치 인식 R&D 및 Python 데이터 처리 구현",
      "4대의 Helios2 카메라 통합 관리 및 오류 복구 처리 구현",
      "장시간 구동 안정화·메모리 누수 개선·다중 사용자 인식 대응 구현",
      "태국 파타야 현장 설치·테스트·납품 수행",
    ],
    details: [
      {
        heading: "Content A — 꽃 관 / 28m × 18m",
        body: "영상 파트 분리에 따른 2종 인터랙션 콘텐츠 구현, 사용자 위치 기준 꽃잎 확산 연출 구현, 사용자 위치 기반 꽃잎 확대 연출 구현",
      },
      {
        heading: "Content B — 숲 관 / 8m × 6m",
        body: "사용자 위치 추적 기반 나비 이동 인터랙션 구현, 사용자 위치 기반 리플 효과 구현",
      },
      {
        heading: "Content C — 파도 관 / 24m × 4m",
        body: "사용자 위치 기반 리플 효과 구현, 사용자 위치 기반 파도 발생 연출 구현",
      },
      {
        heading: "Content D — 메인관 Timespace / 25m × 18m",
        body: "4개 언덕 구조로 인한 Hokuyo LiDAR 적용 한계 분석 및 Helios2 Depth Camera 기반 사용자 인식 방식 R&D 수행, Python 기반 Helios2 영상·Depth 데이터 수신 및 사용자 좌표 가공 구현, 4대 Helios2 카메라 통합 관리 및 Unity 인터랙션 콘텐츠 연동 구현, 현장 실제 센서 데이터를 기준으로 인식 범위·좌표 변환·예외 상황 테스트 및 보정 수행, 언덕 영역 4분할을 통한 다중 사용자 인터랙션 구조 확장 구현, 용암·얼음·물 파트별 사용자 위치 기반 인터랙션 콘텐츠 3종 구현, TCP 통신 기반 전시 영상 트랜지션 상태 동기화 구현, 장시간 구동을 위한 메모리 관리·카메라 오류 복구·다중 사용자 처리 안정화 구현",
      },
    ],
    achievement:
      "전체 인터랙션 콘텐츠 단독 개발 및 태국 현장 납품 수행. 장시간 전시 운영을 고려한 안정화 구현으로 납품 후 약 1년간 안정 운영 중.",
    note: "출장 — 태국 파타야 현장 설치·테스트·납품 총 20일 (2025.05.21 ~ 05.29 / 2025.07.01 ~ 07.11)",
    images: ["project_pado-art-museum_1.jpg", "project_pado-art-museum_2.jpg", "project_pado-art-museum_3.jpg", "project_pado-art-museum_4.jpg", "project_pado-art-museum_5.jpg", "project_pado-art-museum_6.jpg"],
    // 이 둘은 파일 이름 규칙을 정하기 전에 올린 영상이라
    // 어느 로컬 파일에서 온 것인지 확인되지 않았습니다.
    // 유튜브 제목("project pattaya main" / "project pattaya flower") 기준입니다.
    youtube: [
      { url: "https://www.youtube.com/watch?v=1SzYk_Ki5vk", label: "메인관 Timespace" },
      { url: "https://youtu.be/G__iZo3F4ts", label: "꽃 관" },
    ],
  },

  {
    slug: "ces-ai-media-art",
    title: "CES 참가용 앱 개발 – AI Media Art Kiosk-PC AI 영상 플레이",
    company: "집쇼코리아(주)",
    categories: ["드로잉 · 미디어아트"],
    period: "~ 2025.01.07",
    start: "2025-01",
    overview:
      "키오스크에서 사용자 입력을 받아 PC에서 AI 미디어아트 영상을 출력하는 CES 참가용 체험 콘텐츠",
    stack: ["Unity", "Kiosk PC", "Media PC", "Socket 통신", "AI Media Art Video"],
    work: [
      "소래역사관 인터랙티브 콘텐츠 구조를 기반으로 CES 전시 환경에 맞춘 키오스크–PC 연동 콘텐츠 구현",
      "키오스크 사용자 입력 기반 AI 미디어아트 영상 선택 및 출력 기능 구현",
      "Socket 통신 기반 키오스크와 영상 출력 PC 간 데이터 연동 구현",
    ],
    images: [],
    youtube: [
      // project_ces-ai-media-art_1.mp4
      { url: "https://youtu.be/n2tZFngKzzE", label: "키오스크" },
      // project_ces-ai-media-art_2.mp4
      { url: "https://youtu.be/63pJiLN8beg", label: "미디어월 PC" },
    ],
  },

  {
    slug: "ces-3d-livesketch",
    title: "CES 참가용 앱 개발 – 3D 라이브 스케치 (컬러투라이프 명칭 전환)",
    company: "집쇼코리아(주)",
    categories: ["게임", "드로잉 · 미디어아트"],
    period: "~ 2025.01.07",
    start: "2025-01",
    overview:
      "기존 3D 라이브스케치 콘텐츠를 확장하여 태블릿에서 사용자가 3D 모델을 조작하고, 대형 화면에서는 여러 사용자의 캐릭터가 레이싱 게임 콘텐츠로 출력되는 CES 참가용 체험 콘텐츠",
    stack: ["Unity Android", "Unity Windows", "Socket 통신", "3D Model Painting", "Racing Game"],
    work: [
      "태블릿용 Unity Android 프로젝트와 대형 화면용 Unity Windows 프로젝트 분리 개발",
      "Socket 통신 기반 태블릿–대형 화면 간 데이터 연동 구현",
      "여러 사용자 동시 접속 및 조작 데이터 처리 구현",
      "대형 화면 환경에서 다중 사용자 레이싱 게임 콘텐츠 출력 구현",
    ],
    links: [
      { label: "CES 참가 관련 기사 (AVING)", url: "https://kr.aving.net/news/articleView.html?idxno=1796769" },
    ],
    images: [],
    youtube: "",
  },

  {
    slug: "livesketch-tablet-3d",
    title: "라이브스케치 태블릿 3D 버전 연구 개발",
    company: "집쇼코리아(주)",
    categories: ["드로잉 · 미디어아트"],
    period: "2024.10.15 ~ 2024.12.23",
    start: "2024-10",
    overview:
      "기존 태블릿 2D 드로잉 방식에서 3D 모델 표면에 직접 그림을 그리는 방식으로 확장하여, 사파리/아쿠아/레이싱 테마의 3D 라이브스케치 콘텐츠를 제작하는 연구 개발 프로젝트",
    stack: ["Unity Android", "Unity Windows", "3D Model Painting", "Socket 통신"],
    work: [
      "태블릿 환경에서 3D 모델 표면 드로잉 기능 연구 및 구현",
      "사파리/아쿠아/레이싱 버전 3D 라이브스케치 콘텐츠 개발",
      "드로잉 데이터 기반 3D 콘텐츠 출력 연동 구현",
      "관련 기술 특허 등록 기여",
    ],
    images: ["project_livesketch-tablet-3d_1.jpg", "project_livesketch-tablet-3d_2.jpg", "project_livesketch-tablet-3d_3.jpg", "project_livesketch-tablet-3d_4.jpg", "project_livesketch-tablet-3d_5.jpg"],
    youtube: "",
  },

  {
    slug: "livesketch-tablet-2d",
    title: "라이브스케치 태블릿 2D 버전 연구 개발",
    company: "집쇼코리아(주)",
    categories: ["드로잉 · 미디어아트"],
    period: "2024.10.03 ~ 2024.11.15",
    start: "2024-10",
    overview:
      "기존 북 스캐너 기반 전송 방식을 태블릿 드로잉 방식으로 개선하여, 사용자가 태블릿에서 2D 이미지에 직접 그림을 그리고 Socket 통신으로 미디어월 PC에 데이터를 전송해 콘텐츠를 출력하는 체험형 콘텐츠",
    stack: ["Unity Android", "Unity Windows", "Socket 통신", "Safari 버전"],
    work: [
      "태블릿 그림판용 Unity Android 프로젝트 개발",
      "미디어월 출력용 Unity Windows 프로젝트 개발",
      "사용자 드로잉 데이터의 Socket 통신 기반 전송 구현",
      "미디어월 PC에서 수신 데이터 기반 라이브스케치 콘텐츠 출력 구현",
    ],
    images: ["project_livesketch-tablet-2d_1.jpg", "project_livesketch-tablet-2d_2.jpg"],
    youtube: "",
  },

  {
    slug: "livesketch-car",
    title: "라이브스케치 자동차 버전 개발",
    company: "집쇼코리아(주)",
    categories: ["드로잉 · 미디어아트"],
    period: "2024.09.22 ~ 2024.10.12",
    start: "2024-09",
    overview:
      "북 스캐너로 사용자의 그림 용지를 스캔한 뒤, 미디어월에서 자동차 버전 라이브스케치 콘텐츠로 출력하는 체험형 콘텐츠",
    stack: ["Unity", "ScanSnap SV600", "Socket 통신"],
    work: [
      "스캔 처리용 Unity 프로젝트에서 ScanSnap SV600 스캔 이미지 감지 및 로드 구현",
      "파일 처리 후 디렉토리 정리 구현",
      "Socket 통신 기반으로 미디어월 출력용 Unity 프로젝트에 스캔 이미지 전송 구현",
    ],
    images: [],
    youtube: "",
  },

  {
    slug: "sorae-interactive",
    title: "소래역사관 인터랙티브 콘텐츠 개발",
    company: "집쇼코리아(주)",
    categories: ["전시 인터랙션", "드로잉 · 미디어아트"],
    period: "2024.07.24 ~ 2024.09.25",
    start: "2024-07",
    overview:
      "키오스크에서 사용자 입력을 받아 대형 미디어월 PC에 AI 미디어아트 영상을 출력하고, LiDAR 센서를 활용해 사용자 인터랙션을 제공하는 체험형 콘텐츠",
    stack: ["Unity", "Kiosk PC", "Mediawall PC", "Socket 통신", "LiDAR Sensor"],
    work: [
      "키오스크 PC와 미디어월 PC 간 Socket 통신 구현",
      "사용자 입력 기반 AI 미디어아트 영상 출력 연동 구현",
      "LiDAR 센서 기반 사용자 움직임 인식 및 인터랙션 기능 구현",
    ],
    images: [],
    youtube: "",
  },

  {
    slug: "dmz-ar-photozone",
    title: "DMZ AR 포토존 기능 개선",
    company: "집쇼코리아(주)",
    categories: ["전시 인터랙션", "AR · VR · IoT"],
    period: "2024.07.17 ~ 2024.07.31",
    start: "2024-07",
    overview:
      "내부 공간의 대형 화면에서 RealSense 카메라를 활용해 사용자가 강화도 지역 동물 AR 콘텐츠와 함께 사진을 촬영하고 저장할 수 있는 체험형 포토존",
    stack: ["Unity", "Intel RealSense Camera", "Firebase"],
    work: [
      "RealSense 카메라 기반 사용자 실시간 인식 및 AR 콘텐츠 합성 구현",
      "촬영 이미지 Firebase 저장 구현",
      "사용자가 촬영 이미지를 저장할 수 있는 QR 코드 제공 기능 구현",
    ],
    images: [],
    youtube: "",
  },

  {
    slug: "dmz-ar-telescope",
    title: "DMZ 강화평화전망대 AR 전망경 기능 개선",
    company: "집쇼코리아(주)",
    categories: ["전시 인터랙션", "AR · VR · IoT"],
    period: "2024.07.15 ~ 2024.08.14",
    start: "2024-07",
    overview:
      "강화평화전망대 내부 공간에서 야외에 설치된 PTZ 카메라 데이터를 활용해 PC 및 모니터에서 카메라 제어와 AR 콘텐츠를 제공하는 전망형 콘텐츠",
    stack: ["Unity", "PTZ Camera"],
    work: [
      "PTZ 카메라 데이터 연동 및 카메라 제어 기능 구현",
      "PC/모니터 환경에서 실시간 영상 기반 AR 콘텐츠 제공 기능 개선",
      "전망대 체험 환경에 맞춘 콘텐츠 동작 안정화 구현",
    ],
    links: [
      { label: "사용 장비 — Long Range Laser PTZ Camera", url: "https://www.unviot.com/long-range-laser-ptz-camera-monocular-type-product/" },
    ],
    images: ["project_dmz-ar-telescope_1.jpg"],
    youtube: "",
  },

  {
    slug: "world-script-museum-ar",
    title: "국립세계문자박물관 AR 도슨트",
    company: "집쇼코리아(주)",
    categories: ["AR · VR · IoT"],
    period: "2024.06.13 ~ 2024.07.23",
    start: "2024-06",
    overview:
      "국립세계문자박물관 전시 공간에서 관람객에게 AR 기반 안내 및 도슨트 경험을 제공하는 서비스",
    stack: ["Unity", "Vuforia Area Target", "Android", "iOS"],
    work: [
      "전시 공간 인식을 위한 Vuforia Area Target 환경 구성",
      "박물관 관람 동선 및 전시 지점에 맞춘 AR 도슨트 기능 구현",
    ],
    images: ["project_world-script-museum-ar_1.jpg", "project_world-script-museum-ar_2.jpg", "project_world-script-museum-ar_3.jpg"],
    youtube: "",
  },

  {
    slug: "chungnam-ar-navigation",
    featured: true,
    title: "충남도청 AR 내비게이션",
    company: "집쇼코리아(주)",
    categories: ["AR · VR · IoT"],
    period: "2024.04.29 ~ 2024.07.15",
    start: "2024-04",
    overview:
      "충남도청 내부 공간에서 사용자의 현재 위치부터 목적지까지 AR 경로를 안내하는 실내 내비게이션 서비스",
    stack: ["Unity", "Vuforia Area Target", "Matterport Model"],
    work: [
      "Vuforia Area Target 기반으로 충남도청 내부 공간을 인식하고, 사용자가 이동 가능한 구역을 AR 경로로 시각화",
      "현재 위치와 목적지를 기준으로 AR 내비게이션 안내 기능 구현",
    ],
    images: ["project_chungnam-ar-navigation_1.jpg", "project_chungnam-ar-navigation_2.jpg", "project_chungnam-ar-navigation_3.jpg", "project_chungnam-ar-navigation_4.jpg"],
    youtube: [
      // project_chungnam-ar-navigation_2.mp4
      "https://youtu.be/2mGeEPEjccQ",
    ],
  },

  {
    slug: "parking-sensor-protocol",
    featured: true,
    title: "자체 야외 주차 센서 통신 프로토콜 R&D 및 현장 설치 참여",
    company: "인터보이드(주)",
    categories: ["AR · VR · IoT"],
    period: "2022 ~ 2023",
    start: "2022-01",
    overview:
      "자체 개발한 야외 주차장 센서와 게이트웨이, 인접 센서 간 통신을 위한 커스텀 프로토콜을 R&D하고, 실제 야외 주차장 환경에 약 3,000대 규모 센서를 설치·검증한 IoT 디바이스 프로젝트",
    stack: ["IoT Device", "Gateway-Device Communication", "Sensor-to-Sensor Communication", "Custom Protocol", "BLE/MQTT", "Flask", "MySQL", "Outdoor Parking Sensor"],
    work: [
      "Gateway-Device 및 센서 간 커스텀 패킷 구조와 요청/응답 프로토콜 R&D 참여",
      "Central/Peripheral 모드 기반 센서 간 연결 상태 확인 및 인접 센서 관리 구조 설계 참여",
      "옆 센서 연결 끊김 발생 시 다른 인접 센서로 재연결되는 통신 시나리오 정의 및 검증 구현",
      "EventType·Command·NeedReply 기반 디바이스 등록/재등록·상태 조회·설정 변경 커맨드 설계 및 검증 구현",
      "입출차 감지·배터리·주파수 정보 송수신 구조 정의",
      "약 3,000대 규모 야외 주차 센서 설치 및 현장 통신 테스트 참여",
    ],
    images: ["project_parking-sensor-protocol_1.jpg", "project_parking-sensor-protocol_2.jpg"],
    youtube: [
      // project_parking-sensor-protocol_1.mp4
      "https://youtu.be/KLylGLy9KsM",
      // project_parking-sensor-protocol_2.mp4
      "https://youtu.be/Cu6PXfOLL0U",
    ],
  },

  {
    slug: "smart-device-system",
    title: "스마트 디바이스 연동 시스템 R&D 개발 참여",
    company: "인터보이드(주)",
    categories: ["AR · VR · IoT"],
    period: "2022 ~ 2024",
    start: "2022-01",
    overview:
      "자체 스마트 디바이스와 모바일 앱, 백엔드 서버를 연동하기 위한 통신 구조를 설계·검증하고, API Server 및 Android 앱 개발에 참여한 R&D 프로젝트",
    stack: ["Flask", "MQTT", "MySQL", "Kotlin", "Android", "BLE", "REST API", "IoT Device Communication"],
    work: [
      "자체 스마트 디바이스와 서버 간 통신을 위한 Flask 기반 API Server 개발 참여",
      "MQTT 기반 디바이스 통신 구조 개발 및 테스트 참여",
      "MySQL 기반 디바이스·사용자 데이터 관리 구조 개발 참여",
      "Android 앱과 스마트 디바이스 간 BLE 통신 기능 개발 참여",
      "Kotlin 기반 Android 앱 화면 및 디바이스 연동 기능 구현 참여",
      "앱–서버–디바이스 간 데이터 흐름 검증 및 R&D 프로토타입 개발 참여",
    ],
    images: [],
    youtube: "",
  },

  {
    slug: "museum-ar-content",
    title: "박물관 AR 콘텐츠 개발 및 납품 참여",
    company: "인터보이드(주)",
    categories: ["AR · VR · IoT"],
    period: "2022 ~ 2024",
    start: "2022-01",
    overview:
      "Maxst AR Unity 라이브러리를 활용해 박물관 전시 환경에서 사용할 수 있는 AR 콘텐츠를 개발하고 납품·배포한 프로젝트",
    stack: ["Unity", "Maxst AR SDK", "AR", "Mobile App", "Deployment"],
    work: [
      "Maxst AR Unity 라이브러리 기반 이미지/공간 인식 AR 기능 개발 참여",
      "박물관 전시 콘텐츠와 연동되는 AR 화면 및 인터랙션 구현 참여",
      "현장 사용 환경에 맞춘 AR 콘텐츠 테스트 및 안정화 참여",
      "앱 납품 및 배포 과정 참여",
    ],
    images: ["project_museum-ar-content_1.jpg", "project_museum-ar-content_2.jpg", "project_museum-ar-content_3.jpg"],
    youtube: "",
  },

  {
    slug: "braille-kiosk",
    title: "지역 센터용 점자 교육 키오스크 개발 참여",
    company: "인터보이드(주)",
    categories: ["앱 · 웹"],
    period: "2022 ~ 2024",
    start: "2022-01",
    overview:
      "지역 센터에서 점자 교육 콘텐츠를 제공하기 위한 Vue.js와 Electron 기반 데스크톱 키오스크 애플리케이션 개발 프로젝트",
    stack: ["Vue.js", "Electron", "REST API", "Kiosk App"],
    work: [
      "Vue.js와 Electron 기반 키오스크 애플리케이션 화면 개발 참여",
      "지역 센터 사용 환경에 맞춘 콘텐츠 탐색 및 실행 UI 구현 참여",
      "API를 활용한 교육 콘텐츠 데이터 연동 구현 참여",
      "키오스크 환경에 맞춘 데스크톱 앱 빌드 및 동작 테스트 참여",
    ],
    images: [],
    youtube: "",
  },

  {
    slug: "braille-web-platform",
    title: "점자 교육 웹 플랫폼 개발 참여",
    company: "인터보이드(주)",
    categories: ["앱 · 웹"],
    period: "2022 ~ 2024",
    start: "2022-01",
    overview:
      "Vue.js 기반으로 클래스룸, 웹 텍스트, 점자 그리기 도구, Text To Braille 기능을 제공하는 점자 교육 웹 플랫폼 개발 프로젝트",
    stack: ["Vue.js", "REST API", "Text To Braille", "Web Drawing Tool", "Classroom System"],
    work: [
      "Vue.js 기반 클래스룸 페이지 및 학습 관리 화면 개발 참여",
      "웹 텍스트 입력 및 점자 변환 기능 페이지 개발 참여",
      "점자 그리기 도구 UI 및 사용자 입력 처리 구현 참여",
      "Text To Braille 기능 연동 구현 참여",
      "REST API 기반 학습 데이터 조회·등록·관리 기능 개발 참여",
    ],
    images: [],
    youtube: "",
  },

  {
    slug: "braille-pad-emulator",
    title: "점자 패드 학습용 Unity 에뮬레이터 개발 참여",
    company: "인터보이드(주)",
    categories: ["앱 · 웹"],
    period: "2022 ~ 2024",
    start: "2022-01",
    overview:
      "시각 장애인을 위한 기존 점자 패드 디바이스를 일반 학습자도 사용할 수 있도록 Unity 기반 에뮬레이터 형태로 제작한 R&D 프로젝트",
    stack: ["Unity", "Device Emulator", "Braille Learning", "UI Interaction"],
    work: [
      "실제 점자 패드 디바이스의 동작 방식을 Unity 환경에서 시뮬레이션하는 에뮬레이터 개발 참여",
      "일반 사용자가 점자 입력 및 출력 흐름을 학습할 수 있는 UI/인터랙션 구현 참여",
      "디바이스 기반 학습 기능을 소프트웨어 환경으로 전환하기 위한 프로토타입 제작 참여",
    ],
    images: [],
    youtube: "",
  },
];
