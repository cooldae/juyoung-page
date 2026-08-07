# 사진 · 유튜브 영상 추가하기

프로젝트에 사진과 영상을 넣는 방법입니다.

---

## 0. 먼저 slug 를 확인합니다

`slug` 는 프로젝트의 영문 이름이고, 사진 폴더 이름이 됩니다.

**가장 쉬운 방법** — 사이트에서 그 프로젝트를 열고 주소창을 봅니다.

```
https://cooldae.github.io/juyoung-page/project/pado-art-museum
                                                └──── 이게 slug
```

`src/data/projects.ts` 안에서 `slug:` 로 찾아도 됩니다. 전체 목록은 이 문서 맨 아래에 있습니다.

---

## 1. 사진 넣기

### 방법 A — 도구를 쓰는 경우 (권장)

폰으로 찍은 사진은 대개 **3MB 가 넘고 양옆에 검은 여백**이 있습니다. 그대로 올리면 페이지가 느려지고 화면에 검은 띠가 보입니다.

`juyoung-page` 폴더에서 아래 한 줄이면 정리부터 저장까지 끝납니다.

```powershell
powershell -ExecutionPolicy Bypass -File tools/optimize-images.ps1 -Source "C:\Users\HP\Downloads\사진폴더" -Slug "pado-art-museum"
```

이렇게 동작합니다.

1. 검은 여백을 찾아 잘라냄
2. 가로 1600px 로 축소
3. JPEG 품질 84 로 저장
4. `public/projects/<slug>/` 에 `01.jpg`, `02.jpg` … 순서로 저장

실행하면 마지막에 `images: [...]` 줄을 그대로 만들어 줍니다. 복사해서 붙여넣으면 됩니다.

**이미 사진이 있는 프로젝트에 이어서 넣을 때**는 시작 번호를 지정합니다.

```powershell
... -Slug "pado-art-museum" -StartIndex 3
```

### 방법 B — 직접 넣는 경우

1. `public/projects/<slug>/` 폴더를 만듭니다 (없으면)
2. 사진을 넣습니다
3. 파일명은 **영문 소문자와 숫자로**. `01.jpg`, `main-view.jpg` 처럼

> 한글·공백이 들어간 파일명은 피하세요. **대소문자도 정확해야 합니다.**
> Windows 는 `01.JPG` 와 `01.jpg` 를 같게 보지만 GitHub 서버는 다른 파일로 봅니다.

권장 크기는 **가로 1600px 내외, 장당 500KB 이하**입니다.

### 그리고 데이터에 적습니다

`src/data/projects.ts` 에서 해당 프로젝트를 찾아 파일명만 적습니다.

```ts
{
  slug: "pado-art-museum",
  ...
  images: ["01.jpg", "02.jpg", "03.jpg"],
}
```

적은 순서대로 화면에 나옵니다. 사진이 없으면 `images: []` 로 두면 Gallery 영역 자체가 안 나옵니다.

---

## 2. 유튜브 영상 넣기

**주소를 그대로 붙여넣으면 됩니다.** 형식은 알아서 인식합니다.

```ts
youtube: "https://www.youtube.com/watch?v=1SzYk_Ki5vk",
```

`youtu.be/...`, `watch?v=...`, `/shorts/...`, `/embed/...` 전부 됩니다.

### 영상이 여러 개면

배열로 적으면 좌우 화살표가 생깁니다.

```ts
youtube: [
  "https://www.youtube.com/watch?v=1SzYk_Ki5vk",
  "https://youtu.be/G__iZo3F4ts",
],
```

### 영상마다 이름을 붙이려면

```ts
youtube: [
  { url: "https://youtu.be/1SzYk_Ki5vk", label: "메인관 Timespace" },
  { url: "https://youtu.be/G__iZo3F4ts", label: "꽃 관" },
],
```

영상 아래에 이름이 표시됩니다. 하나라도 이름을 붙이면 이름 줄이 생깁니다.

영상이 없으면 `youtube: ""` 로 두면 Video 영역이 안 나옵니다.

> ⚠️ **비공개 영상은 안 보입니다.** 유튜브에서 `공개` 또는 `일부 공개(링크 공유)` 로 되어 있어야 합니다.

---

## 3. 확인하기

올리기 전에 로컬에서 봅니다.

```bash
npm run dev
```

http://localhost:5220/juyoung-page/ 에서 열립니다. 파일을 저장하면 화면이 바로 바뀝니다.

---

## 4. 올리기

```bash
git add -A
git commit -m "파타야 사진 추가"
git push
```

push 하면 자동으로 빌드되어 **40초~2분 뒤** 사이트에 반영됩니다.

> 반영됐는데 화면이 그대로면 브라우저가 이전 파일을 들고 있는 겁니다.
> `Ctrl + Shift + R` 로 강력 새로고침하세요.

---

## 자주 겪는 문제

| 증상 | 원인 |
|---|---|
| 사진이 안 보임 (빈 칸) | 파일명 대소문자가 다르거나, 폴더 이름이 slug 와 다름 |
| Gallery 영역이 아예 없음 | `images: []` 로 비어 있음 |
| 영상 자리가 검게만 나옴 | 유튜브 영상이 비공개 |
| 바뀐 게 안 보임 | 브라우저 캐시 — `Ctrl+Shift+R` |
| 페이지가 느려짐 | 사진 용량이 큼 — 위 도구로 줄이세요 |

---

## 프로젝트 slug 목록

| slug | 프로젝트 |
|---|---|
| `socket-racing` | 소켓통신 모바일 게임 개발 – 레이싱 |
| `socket-zombie-shooting` | 소켓통신 모바일 게임 개발 – 좀비 슈팅 |
| `gangneung-dart-game` | 강릉 메타버스체험관 소켓 통신 다트 게임 개발 |
| `color2life-alphabet` | 컬러투라이프 알파벳 어드벤처 버전 개발 |
| `royal-cuisine-minigame` | 국가유산진흥원 궁중음식 미니게임 태블릿 앱 개발 |
| `jeju-dokdo-center` | 제주도 독도 체험관 인터랙션 콘텐츠 개발 |
| `busan-maritime-museum` | 부산 국립해양박물관 인터랙션 콘텐츠 개발 |
| `color2life-gangneung` | 컬러투라이프 강릉 콘텐츠 개발 |
| `color2life-haman` | 컬러투라이프 함안 콘텐츠 개발 |
| `ai-live-drawing` | AI 라이브 드로잉 콘텐츠 개발 |
| `jeju-vr-app` | 국가유산진흥원 「한눈에 보는 제주도」 VR 앱 개발 |
| `jeju-tablet-app` | 국가유산진흥원 「한눈에 보는 제주도」 태블릿 앱 개발 |
| `windows-video-player` | Windows Video Player 개발 |
| `pado-art-museum` | 파타야 Pado Art Museum 인터랙션 콘텐츠 개발 및 출장 납품 |
| `ces-ai-media-art` | CES 참가용 앱 개발 – AI Media Art Kiosk-PC |
| `ces-3d-livesketch` | CES 참가용 앱 개발 – 3D 라이브 스케치 |
| `livesketch-tablet-3d` | 라이브스케치 태블릿 3D 버전 연구 개발 |
| `livesketch-tablet-2d` | 라이브스케치 태블릿 2D 버전 연구 개발 |
| `livesketch-car` | 라이브스케치 자동차 버전 개발 |
| `sorae-interactive` | 소래역사관 인터랙티브 콘텐츠 개발 |
| `dmz-ar-photozone` | DMZ AR 포토존 기능 개선 |
| `dmz-ar-telescope` | DMZ 강화평화전망대 AR 전망경 기능 개선 |
| `world-script-museum-ar` | 국립세계문자박물관 AR 도슨트 |
| `chungnam-ar-navigation` | 충남도청 AR 내비게이션 |
| `parking-sensor-protocol` | 자체 야외 주차 센서 통신 프로토콜 R&D 및 현장 설치 |
| `smart-device-system` | 스마트 디바이스 연동 시스템 R&D 개발 |
| `museum-ar-content` | 박물관 AR 콘텐츠 개발 및 납품 |
| `braille-kiosk` | 지역 센터용 점자 교육 키오스크 개발 |
| `braille-web-platform` | 점자 교육 웹 플랫폼 개발 |
| `braille-pad-emulator` | 점자 패드 학습용 Unity 에뮬레이터 개발 |
