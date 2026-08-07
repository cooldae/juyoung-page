import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages 하위 경로 배포. 이 값을 바꾸면 주소가 깨집니다.
// https://cooldae.github.io/juyoung-page/
export default defineConfig({
  base: "/juyoung-page/",
  plugins: [react()],
  server: {
    port: 5220,
    strictPort: true,
  },
  preview: {
    port: 5221,
    strictPort: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
