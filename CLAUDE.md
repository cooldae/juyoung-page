# juyoung-page

> **다른 세션에서 이어받는 경우 [HANDOFF.md](HANDOFF.md) 를 먼저 읽으세요.**
> 결정 사항과 그 이유, 남은 일, 함정이 정리되어 있습니다.

김주영 개인 **포트폴리오**. 채용 담당자가 보는 것을 전제로 합니다.
Unity 기반 전시 인터랙션 / 게임 / AR·VR / IoT 프로젝트 **30건**의 기록이 핵심입니다.

## 배포

| 항목 | 값 |
|---|---|
| 저장소 | https://github.com/cooldae/juyoung-page |
| 공개 주소 | https://cooldae.github.io/juyoung-page/ |
| 방식 | **GitHub Actions 로 빌드 후 Pages 배포** (`.github/workflows/deploy.yml`) |
| dev 서버 | `npm run dev` → http://localhost:5220/juyoung-page/ |

`main` 에 push 하면 자동으로 빌드·배포됩니다. 보통 2~4분.
**타입 오류나 빌드 실패가 나면 배포가 멈춥니다.** 깨진 사이트가 올라가지 않는다는 뜻입니다.

## 기술 구성

Vite + React 19 + TypeScript + React Router 7. 스타일은 순수 CSS 한 파일.

```bash
npm run dev        # 개발 서버
npm run build      # 타입 검사 + 빌드
npm run typecheck  # 타입 검사만
npm run preview    # 빌드 결과물 확인 (5221)
```

## 핵심 설계

프로젝트가 30건이고 계속 늘어납니다. **프로젝트마다 페이지를 만들지 마세요.**

```
데이터 파일 1개  +  상세 템플릿 1개  =  프로젝트 무한개
```

- `src/data/projects.ts` 의 `PROJECTS` 배열이 **유일한 원본**
- `src/pages/ProjectDetail.tsx` 하나가 모든 상세 페이지를 그림
- 필터 분류(`CATEGORY_ORDER`)와 회사 목록도 데이터에서 자동 생성

**이 구조를 깨지 마세요.** 사용자의 최우선 요구가 "직접 추가할 수 있는 구조, 업데이트가 쉽게" 입니다.
프로젝트 추가는 `src/data/projects.ts` 에 블록 하나 붙여넣는 것으로 끝나야 합니다.

## 구조

```
juyoung-page/
├─ index.html                 Vite 진입점 (메타 태그·폰트)
├─ vite.config.ts             base: "/juyoung-page/" ← 바꾸면 주소가 깨집니다
├─ tsconfig.json
├─ .github/workflows/deploy.yml
├─ public/
│   ├─ .nojekyll
│   ├─ 404.html               하위 경로 직접 접속 우회 (아래 참고)
│   └─ projects/<slug>/       프로젝트 사진
└─ src/
    ├─ main.tsx               주소 정리 후 렌더링
    ├─ App.tsx                라우팅
    ├─ types.ts               데이터 형태 정의
    ├─ data/
    │   ├─ profile.ts         이름·연락처·경력·강점·스킬·학력
    │   └─ projects.ts        ★ 프로젝트 30건 + CATEGORY_ORDER
    ├─ lib/
    │   ├─ media.ts           유튜브 파싱 · 이미지 경로
    │   └─ projects.ts        정렬 · 분류 목록
    ├─ hooks/useReveal.ts     스크롤 등장 · 문서 제목
    ├─ components/            Header Footer Hero About ProjectList
    │                         ProjectCard VideoCarousel Gallery
    ├─ pages/                 Home ProjectDetail NotFound
    └─ styles/style.css       색은 :root 변수만 고치면 전체 반영
```

## ⚠️ 반드시 지킬 것

**1. `vite.config.ts` 의 `base` 를 건드리지 마세요.**
`/juyoung-page/` 하위 경로 배포라서, 이 값이 틀리면 CSS·JS·이미지가 전부 404 납니다.
이미지 경로는 `import.meta.env.BASE_URL` 을 쓰는 `imageSrc()` 로만 만드세요.

**2. `public/404.html` 을 지우지 마세요.**
GitHub Pages 는 `/project/xxx` 같은 주소를 모릅니다. 이 파일이 원래 경로를 `?redirect=` 로
넘겨주고 `src/main.tsx` 가 되돌립니다. 없으면 새로고침·직접 접속이 전부 깨집니다.

**3. `.nojekyll` 도 지우지 마세요.** `_` 로 시작하는 파일이 무시되는 걸 막습니다.

**4. 파일명 대소문자를 정확히.** Windows 로컬은 무시하지만 GitHub 서버는 구분합니다.

**5. Skills 목록은 첫 화면(Hero)에만 둡니다.** About 에 Skills 카드를 다시 만들지 마세요.
같은 태그 20개가 한 페이지에 두 번 나옵니다. About 은 Career + Strengths + Education.

**6. `src/data/` 에 개인정보를 넣지 마세요.** 이 저장소는 public 입니다.
`showPhone: false` 는 화면에 안 그린다는 뜻일 뿐, 공개되지 않는다는 뜻이 아닙니다.

## 톤

따뜻한 아이보리 / 브라운 저채도. 순백·순검정을 쓰지 않습니다.
다크 모드도 차가운 회색이 아니라 따뜻한 다크 브라운.
인터랙션은 절제 — 스크롤 페이드업, 카드 호버, 라이트박스, 영상 넘기기 정도.
스크롤 가로채기나 상시 애니메이션은 넣지 않습니다. `prefers-reduced-motion` 존중.
