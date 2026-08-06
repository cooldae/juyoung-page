# 프로젝트 사진 넣는 곳

프로젝트마다 **`slug` 이름의 폴더**를 만들고 그 안에 사진을 넣으세요.

```
assets/projects/
├─ pado-art-museum/     ← projects.js 의 slug 와 똑같이
│   ├─ 01.jpg
│   ├─ 02.jpg
│   └─ 03.jpg
└─ jeju-tablet-app/
    └─ 01.jpg
```

그리고 `data/projects.js` 의 해당 프로젝트에 파일명만 적습니다.

```js
images: ["01.jpg", "02.jpg", "03.jpg"],
```

## 주의

- **파일명 대소문자를 정확히** 적으세요. `01.JPG` 와 `01.jpg` 는 GitHub에서 다른 파일입니다.
- 한글·공백이 들어간 파일명은 피하세요. (`01.jpg`, `main-view.jpg` 처럼)
- 사진은 **가로 1600px 내외, 장당 500KB 이하**로 줄여서 올리는 걸 권합니다.
  원본 그대로 올리면 페이지가 느려지고 저장소 용량도 빨리 찹니다.
- 지원 형식: `.jpg` `.png` `.webp` `.gif`
