# juyoung-page

김주영 소개 페이지 — 경력과 프로젝트 기록.

🔗 **https://cooldae.github.io/juyoung-page/**

Unity 기반 AR·VR, 전시 인터랙션, IoT 디바이스 연동 프로젝트 30건을 정리한 정적 사이트입니다.
빌드 도구 없이 순수 HTML / CSS / JavaScript 로 동작합니다.

## 프로젝트 추가하기

1. `data/projects.js` 를 열어 블록 하나를 복사해 붙여넣고 내용을 바꿉니다.
2. 사진이 있으면 `assets/projects/<slug>/` 폴더에 넣고 파일명을 `images` 에 적습니다.
3. 유튜브 영상이 있으면 주소를 그대로 `youtube` 에 붙여넣습니다.
4. 저장하고 push 하면 끝입니다.

```js
{
  slug: "my-project",
  title: "프로젝트 이름",
  company: "회사명",
  period: "2026.01.01 ~ 2026.03.01",
  start: "2026-01",                 // 정렬용. 최신이 위로
  overview: "프로젝트 개요",
  stack: ["Unity", "C#"],
  work: ["담당한 일 1", "담당한 일 2"],
  images: ["01.jpg"],
  youtube: "https://youtu.be/XXXXXXXXXXX",
}
```

자세한 필드 설명은 `data/projects.js` 파일 맨 위 주석에 있습니다.

## 로컬에서 보기

```bash
npx serve . -l 5220
```

http://localhost:5220 에서 열립니다.

## 배포

`main` 브랜치에 push 하면 GitHub Pages 가 자동으로 반영합니다. (30초~2분)

```bash
git add -A && git commit -m "메시지" && git push
```
