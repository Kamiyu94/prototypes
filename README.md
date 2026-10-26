# Kris Lu — 企業 AI 導入作品集

以簡短個人定位與作品直接入口開場，再用精選駐點經歷說明企業 AI 導入、PMO 治理與跨部門交付能力。

## 閱讀流程

個人定位與五項直接入口（PMO Intake、專案管理儀表板、HR、GenBI、VoxLog） → PMO Intake／專案管理儀表板 → HR／GenBI／VoxLog 作品卡 → 其他互動作品 → 三項駐點經歷 → 個人背景 → LinkedIn 聯絡。

所有既有作品仍有首頁入口：HR Service Desk、HR 平台總覽、組織圖、人才畫像，以及 GenBI Demo。VoxLog 新增獨立介紹頁與專案／安裝說明連結。線上 Demo、互動原型與桌面工具分別標示。

## 本機與輸出

使用 Node.js 20 以上，無需安裝套件。

- `npm run dev`：啟動本機預覽。
- `npm run build`：產生案例頁與 `dist/` 靜態部署檔案。
- `npm run check`：檢查輸出頁面的連結、錨點、腳本語法與導覽目標。

`dist/` 可直接放在 GitHub Pages 的網站根目錄或 `/prototypes/` 子路徑。所有站內連結均為相對路徑。GitHub Pages 使用 `main` 分支根目錄發布；更新案例內容後，請先執行 build 與 check，再提交產生的 HTML、樣式及相關資源。

## 內容與程式分工

- `index.html`：首頁主敘事、經歷摘要與聯絡入口。
- `voxlog.html`：VoxLog 桌面工具介紹、實際介面與安裝入口。
- `assets/portfolio.css`：首頁與 VoxLog 頁的響應式排版。
- `assets/images/voxlog-workspace.png`：VoxLog 公開專案介面圖，內容為範例逐字稿。
- `scripts/cases.mjs`：三個案例的背景、角色、證據、取捨及導覽內容。
- `scripts/render-cases.mjs`：產生三個靜態案例頁。修改內容後執行 build；不要直接修改生成頁。
- `assets/site.css`、`assets/case.css`：共用視覺系統與案例版型。
- `assets/case.js`：案例步驟切換與範例問句複製。
- `assets/demo-guide.js`、`assets/demo-shell.css`：既有原型的返回導覽、直接定位與小螢幕調整。
- 原型保留 `platform.html`、`hr-service-desk.html`、`org-chart.html`、`talent-radar.html` 原檔名與合作署名。
- `assets/vendor/chart.umd.min.js`：原作品使用的 Chart.js 4.4.1，改為本地載入；授權與版權見檔案首段及同目錄 LICENSE。

## 證據與署名

- HR 與人才畫像：原公開網站標示「規劃 Emily Ko · 建置 Kamiyu Lab」，新版保留合作邊界。
- GenBI Mini：依現有專案 README 與程式結構說明規則路由、白名單查詢、模型模式及虛構資料。
- 約兩週 GenBI MVP、200 多個進行中專案 API 整合、約 11 位同仁導入等數字，依 2026-08-26 個人履歷，非公開 Demo 的效能測試結果。
- 不公開雇主名稱、履歷附件、內部資料或私人聯絡資訊。聯絡使用履歷所列 LinkedIn。
- 2026-10-25 網站版經歷依使用者提供的工作整理與既有履歷，選用 2026.08 起的全職駐點、PMO 儀表板、需求治理與跨部門協作；公開客戶名稱維持匿名。AI 輔助 Intake 仍在測試，人工保留最終判定。未加入主管姓名、授權稽核細節、事故敘述、機房／門市架構或人力配置。
- VoxLog 內容依公開 README；目前無 GitHub Release 安裝包，入口指向原始碼與安裝腳本說明。雲端 AI 後製與本機語音辨識的資料去向分開說明。
- GenBI 外部服務的實際可用性取決於 Streamlit；案例頁另提供 2026-07-22 實際操作截圖，使用虛構示範資料；不將私人儲存庫作為公開備援入口。

## 驗證範圍

自動檢查涵蓋靜態連結、錨點、JavaScript 語法與案例導覽目標，不等同於瀏覽器操作、視覺驗收或正式系統驗證。

## PMO 公開案例（2026-10-26）

新增 `pmo-intake.html`（Agent Skill 與審核工作台）及 `project-dashboard.html`（專案管理儀表板），首頁提供兩個互動展示的直接入口。展示以個人帳號的獨立儲存庫發布，全新虛構資料與藍金視覺，沒有正式環境連線。Intake 建議為預設展示資料，不宣稱模型整合已上線。原管理儀表板的協作優化歷程在案例中保留說明。

## 字級與排版（2026-10-26）

主要文字、導覽、按鈕與表單以 16px（1rem）為基準；輔助說明 14px，小標籤至少 12px，標題依層級放大。案例頁與既有公開原型共用此閱讀基準，手機仍保留正文尺寸，調整欄數、卡片高度、間距與表格捲動。

## 首頁作品預覽

首頁快速入口直接列出五項作品。五張作品卡使用實際畫面，圖片可直接開啟展示或桌面工具介紹；PMO、儀表板與 HR 截圖取自公開虛構資料版本（2026-10-26），GenBI 保留 2026-07-22 歷史操作標示，VoxLog 保留既有範例逐字稿畫面。新圖片位於 `assets/images/*-preview.jpg`。

建置時以 `portfolio.css` 的內容雜湊更新頁面的樣式網址，避免新圖片與瀏覽器快取的舊排版混用。
