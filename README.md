# juyoung-page

김주영 포트폴리오 — Unity 기반 전시 인터랙션 · 게임 · AR/VR · IoT 프로젝트 30건.

🔗 **https://cooldae.github.io/juyoung-page/**

Vite + React + TypeScript 로 만든 정적 사이트입니다.

## 개발

```bash
npm install
npm run dev
```

http://localhost:5220/juyoung-page/ 에서 열립니다.

| 명령 | 내용 |
|---|---|
| `npm run dev` | 개발 서버 (5220) |
| `npm run build` | 타입 검사 + 빌드 |
| `npm run typecheck` | 타입 검사만 |
| `npm run preview` | 빌드 결과물 확인 (5221) |

## 프로젝트 추가하기

1. `src/data/projects.ts` 에서 블록 하나를 복사해 붙여넣고 내용을 바꿉니다.
2. 사진은 `public/projects/<slug>/` 에 넣고 파일명만 `images` 에 적습니다.
3. 유튜브 주소는 그대로 붙여넣습니다. 여러 개면 배열로 적으면 좌우 화살표가 생깁니다.
4. 저장하고 push 하면 끝입니다.

```ts
{
  slug: "my-project",
  title: "프로젝트 이름",
  company: "회사명",
  categories: ["게임"],              // 여러 개 가능. 첫 번째가 카드에 표시됨
  period: "2026.01.01 ~ 2026.03.01",
  start: "2026-01",                  // 정렬용. 최신이 위로
  overview: "프로젝트 개요",
  stack: ["Unity", "C#"],
  work: ["담당한 일 1", "담당한 일 2"],
  images: ["01.jpg"],
  youtube: "https://youtu.be/XXXXXXXXXXX",   // 여러 개면 [ "...", "..." ]
}
```

**오타나 빠진 항목이 있으면 에디터가 저장하는 순간 알려줍니다.**
필드 설명은 `src/data/projects.ts` 맨 위 주석과 `src/types.ts` 에 있습니다.

## 분류

필터 버튼은 각 프로젝트의 `categories` 에서 자동으로 만들어집니다.
버튼 순서는 `src/data/projects.ts` 의 `CATEGORY_ORDER` 줄 순서를 따릅니다.
목록에 없는 새 이름을 쓰면 버튼이 맨 뒤에 자동으로 생깁니다.

## 배포

`main` 브랜치에 push 하면 GitHub Actions 가 빌드해서 자동 배포합니다. (2~4분)

```bash
git add -A && git commit -m "메시지" && git push
```

빌드가 실패하면 배포가 멈추므로 깨진 사이트가 올라가지 않습니다.
