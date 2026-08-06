# juyoung-page

> **다른 세션에서 이어받는 경우 [HANDOFF.md](HANDOFF.md) 를 먼저 읽으세요.**
> 결정 사항과 그 이유, 남은 일, 함정이 정리되어 있습니다.

김주영 개인 **소개 페이지**. 작업물 나열형 포트폴리오가 아니라 "사람 + 프로젝트 기록"이 목적.
(별도 폴더 `unity-portfolio`와는 다른 사이트)

## 배포

| 항목 | 값 |
|---|---|
| 저장소 | https://github.com/cooldae/juyoung-page |
| 공개 주소 | https://cooldae.github.io/juyoung-page/ |
| 방식 | GitHub Pages — `main` 브랜치 `/ (root)` 직접 서빙 (빌드 없음) |
| dev 포트 | 5220 |

`main`에 push하면 30초~2분 뒤 자동 반영.

## 설계 원칙

**프로젝트가 30개 넘습니다. 프로젝트마다 HTML 파일을 만들지 마세요.**
데이터 파일 1개 + 상세 템플릿 1개로 전부 처리합니다.

- `data/projects.js` 의 `window.PROJECTS` 배열이 유일한 원본
- `index.html` 이 목록을, `project.html?id=<slug>` 이 상세를 렌더링
- 화면을 고칠 일이 생기면 템플릿 한 곳만 고치면 전체에 반영됨

## 구조

```
juyoung-page/
├─ index.html              ← 소개 + 이력 + 프로젝트 목록
├─ project.html            ← 상세 템플릿 (?id=<slug>)
├─ data/
│   ├─ profile.js          ← 이름·소개·연락처·경력·스킬
│   └─ projects.js         ← ★ 프로젝트 전부. 보통 여기만 수정
├─ assets/
│   ├─ css/style.css       ← 색은 :root 변수만 고치면 전체 반영
│   ├─ js/common.js        ← 공통 유틸 (이스케이프·유튜브 파싱·정렬·reveal)
│   ├─ js/index.js         ← 목록 페이지 렌더링
│   ├─ js/project.js       ← 상세 페이지 렌더링 + 라이트박스
│   └─ projects/<slug>/    ← 프로젝트별 사진 (README.md 참고)
├─ .claude/launch.json     ← dev 서버 (포트 5220)
├─ serve.json              ← 로컬 서버 설정. cleanUrls 끄는 용도 (아래 참고)
└─ .nojekyll
```

## ⚠️ 하위 경로 배포라서 지켜야 할 것

루트가 아니라 `/juyoung-page/` 아래에서 열립니다.
**절대 경로(`/`로 시작)를 쓰면 배포본에서 전부 깨집니다.**

```html
<!-- ❌ 로컬에선 되지만 GitHub Pages에서 404 -->
<img src="/assets/x.jpg">
<!-- ✅ 상대 경로만 -->
<img src="assets/x.jpg">
```

## ⚠️ serve.json 을 지우지 마세요

로컬 dev 서버(`npx serve`)는 기본값으로 `project.html` → `project` 로 리다이렉트하면서
**쿼리스트링(`?id=...`)을 날려버립니다.** 그러면 상세 페이지가 "찾을 수 없음"으로 뜹니다.
GitHub Pages는 이런 변환을 하지 않으므로, 로컬 환경을 배포 환경과 맞추기 위해
`serve.json` 에서 `cleanUrls: false` 로 꺼둔 상태입니다.

## 그 외 규칙

- **파일명 대소문자를 정확히** — Windows 로컬은 무시하지만 GitHub 서버는 구분합니다
- **빌드 도구 없음** — 순수 HTML/CSS/JS. `<script src>` 로 데이터를 읽으므로 `fetch` 가 아니라
  로컬 파일(file://)로 열어도 동작합니다
- `.nojekyll` 지우지 말 것 — `_` 로 시작하는 폴더가 무시되는 걸 막습니다
- 텍스트는 전부 `App.esc()` 로 이스케이프해서 출력합니다. `R&D`, `HTML & CSS` 같은
  글자가 깨지지 않게 하려는 것이니, 새 렌더링 코드를 추가할 때도 반드시 통과시키세요
- 전화번호는 `profile.js` 의 `showPhone: false` 로 **숨김 상태**입니다.
  공개 페이지라 스팸 수집 위험이 있어 기본값을 꺼둔 것 — 켜려면 본인 판단으로 `true`
- **Skills 목록은 첫 화면(hero)에만 둡니다.** About 섹션에 Skills 카드를 다시 만들지 마세요.
  같은 20개 태그가 한 페이지에 두 번 나오게 됩니다. About 은 Career + Strengths 만.

## 톤

따뜻한 아이보리 / 브라운 저채도. 순백·순검정을 쓰지 않습니다.
다크 모드도 차가운 회색이 아니라 따뜻한 다크 브라운.
인터랙션은 절제 — 스크롤 페이드업, 카드 호버, 이미지 라이트박스 정도.
스크롤 가로채기나 상시 애니메이션은 넣지 않습니다. `prefers-reduced-motion` 존중.
