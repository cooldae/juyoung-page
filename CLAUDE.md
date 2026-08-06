# juyoung-page

김주영 개인 **소개 페이지**. 작업물 나열형 포트폴리오가 아니라 "사람"을 소개하는 것이 목적.
(작업물 중심 사이트는 별도 폴더인 `unity-portfolio`가 담당)

## 배포

| 항목 | 값 |
|---|---|
| 저장소 | https://github.com/cooldae/juyoung-page |
| 공개 주소 | https://cooldae.github.io/juyoung-page/ |
| 방식 | GitHub Pages — `main` 브랜치 `/ (root)` 직접 서빙 (빌드 없음) |
| dev 포트 | 5220 |

`main`에 push하면 30초~2분 뒤 자동 반영. 별도 배포 명령 없음.

## ⚠️ 하위 경로 배포라서 지켜야 할 것

이 사이트는 루트가 아니라 `/juyoung-page/` 아래에서 열립니다.
**절대 경로(`/`로 시작)를 쓰면 배포본에서 전부 깨집니다.**

```html
<!-- ❌ 로컬에선 되지만 GitHub Pages에서 404 -->
<img src="/images/photo.jpg">
<link href="/style.css">

<!-- ✅ 상대 경로만 사용 -->
<img src="./images/photo.jpg">
<link href="./style.css">
```

## 그 외 규칙

- **파일명 대소문자를 정확히** — Windows 로컬은 무시하지만 GitHub 서버는 구분합니다
- **빌드 도구 없음** — 순수 HTML/CSS/JS. 번들러를 도입하려면 배포 방식부터 GitHub Actions로 바꿔야 함
- `.nojekyll` 파일을 지우지 말 것 — `_`로 시작하는 폴더가 무시되는 걸 막습니다

## 구조

```
juyoung-page/
├─ .claude/launch.json   ← dev 서버 (포트 5220)
├─ .nojekyll             ← Jekyll 처리 비활성화
├─ CLAUDE.md
└─ index.html            ← 현재 전부 단일 파일 (임시 페이지)
```

## 현재 상태

배포 확인용 임시 페이지만 있음. 내용/컨셉은 미정.
