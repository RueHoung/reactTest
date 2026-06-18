# reactTest

這是一個使用 React、TypeScript、Vite 建立的前端專案，目前主要功能是 Firebase Authentication 的 Google 登入流程。專案已整合 Tailwind CSS 4、shadcn UI / radix-nova 風格元件，以及 `@` 路徑別名。

## 技術棧

- React 19
- TypeScript 6
- Vite 8
- Tailwind CSS 4
- shadcn UI / radix-nova
- Radix UI
- Firebase Authentication
- ESLint

## 專案架構

```text
reactTest/
├─ public/
│  ├─ favicon.svg
│  └─ icons.svg
├─ src/
│  ├─ assets/
│  │  ├─ hero.png
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ components/
│  │  └─ ui/
│  │     ├─ button.tsx
│  │     ├─ card.tsx
│  │     ├─ input.tsx
│  │     └─ label.tsx
│  ├─ lib/
│  │  └─ utils.ts
│  ├─ services/
│  │  └─ firebase.ts
│  ├─ styles/
│  │  └─ globals.css
│  ├─ view/
│  │  ├─ Home/
│  │  │  └─ Home.tsx
│  │  └─ Login/
│  │     └─ Login.tsx
│  ├─ App.tsx
│  └─ main.tsx
├─ components.json
├─ eslint.config.js
├─ index.html
├─ package.json
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```

## 目錄說明

| 路徑 | 說明 |
| --- | --- |
| `src/main.tsx` | React 入口檔，掛載 `App` 並載入全域樣式。 |
| `src/App.tsx` | 應用程式根元件，目前渲染 `Login` 頁面。 |
| `src/view/Login/Login.tsx` | Firebase Google 登入、登出與登入狀態監聽。 |
| `src/view/Home/Home.tsx` | 預留的首頁視圖。 |
| `src/services/firebase.ts` | Firebase 初始化與 Auth Provider 設定。 |
| `src/components/ui/` | shadcn UI 風格的可重用基礎元件。 |
| `src/lib/utils.ts` | 共用工具函式，目前提供 `cn()` 合併 className。 |
| `src/styles/globals.css` | Tailwind CSS、動畫、字型與主題變數設定。 |
| `public/` | 不經打包處理的靜態資源。 |
| `components.json` | shadcn 元件產生設定與 alias 設定。 |
| `vite.config.ts` | Vite、React plugin、Tailwind plugin、alias 與 dev server port 設定。 |

## 路徑別名

專案使用 `@` 指向 `src`：

```ts
import { cn } from "@/lib/utils"
import { auth } from "@/services/firebase"
```

相關設定位於：

- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.app.json`
- `components.json`

## 環境變數

Firebase 設定透過 Vite 環境變數讀取。依照執行模式可使用：

- `.env.dev`
- `.env.test`
- `.env.prod`

需要的變數如下：

```env
VITE_PORT=8081
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_MEASUREMENT_ID=
```

`vite.config.ts` 會透過 `VITE_PORT` 設定本機開發伺服器 port。`src/services/firebase.ts` 會讀取 Firebase 相關變數初始化應用程式。

## 可用指令

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

| 指令 | 說明 |
| --- | --- |
| `npm run dev` | 使用 `vite --mode dev` 啟動開發伺服器。 |
| `npm run build` | 先執行 TypeScript project build，再使用 production mode 打包。 |
| `npm run lint` | 執行 ESLint。 |
| `npm run preview` | 預覽打包後的 Vite 產物。 |

## 目前登入流程

`Login.tsx` 使用 Firebase Auth：

1. `onAuthStateChanged` 監聽目前登入狀態。
2. 未登入時顯示 Google 登入按鈕。
3. 點擊登入後透過 `signInWithPopup(auth, googleProvider)` 開啟 Google 登入視窗。
4. 登入後顯示使用者名稱、email 與頭像。
5. 點擊登出後透過 `signOut(auth)` 清除登入狀態。

## UI 與樣式

- 全域樣式集中在 `src/styles/globals.css`。
- UI 元件位於 `src/components/ui/`。
- className 合併統一使用 `cn()`，內部整合 `clsx` 與 `tailwind-merge`。
- 字型使用 `@fontsource-variable/geist`。
- Tailwind 透過 `@tailwindcss/vite` plugin 整合到 Vite。
