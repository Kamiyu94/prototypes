# Kris Lu — 企業 AI 導入作品集

以企業不知道如何導入 AI、串接工作流程與持續採用的痛點為入口，逐步帶出落地方法、實作證據與 Kris Lu 的背景。

## 閱讀流程

企業導入痛點 → AI 如何進入工作流 → 實作經歷與案例導覽 → 個人背景 → LinkedIn 聯絡。

## 本機與輸出

使用 Node.js 20 以上，無需安裝套件。

- `npm run dev`：啟動本機預覽。
- `npm run build`：產生案例頁與 `dist/` 靜態部署檔案。
- `npm run check`：檢查輸出頁面的連結、錨點、腳本語法與導覽目標。

`dist/` 可直接放在 GitHub Pages 的網站根目錄或 `/prototypes/` 子路徑。所有站內連結均為相對路徑。GitHub Pages 使用 `main` 分支根目錄發布；更新案例內容後，請先執行 build 與 check，再提交產生的 HTML、樣式及相關資源。

## 內容與程式分工

- `index.html`：首頁主敘事、經歷摘要與聯絡入口。
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
- GenBI 外部服務的實際可用性取決於 Streamlit；案例頁另提供原始碼入口。

## 驗證範圍

自動檢查涵蓋靜態連結、錨點、JavaScript 語法與案例導覽目標，不等同於瀏覽器操作、視覺驗收或正式系統驗證。
