# fix.md — 修改紀錄與不可破壞的規則

> 每次要修改專案前，先看這份檔案，確認不會破壞之前做好的東西。
> 每完成一次修改，在「修改紀錄」最下方新增一筆。

## 不可破壞的規則（改任何東西都要遵守）
1. `js/config.js` 只能是 `export const firebaseConfig = {...}`，不可有 `import ... from "firebase/app"`（瀏覽器不認得）。交付的 zip **不包含** `js/config.js`，以免覆蓋使用者自己的設定。
2. Firebase 一律用 `js/firebase.js` 內固定版本的 gstatic CDN 網址 import（目前 10.12.2），不用 npm 寫法。
3. 專案只放靜態檔，不依賴伺服器；部署目標是 GitHub Pages（需用 http 伺服器，不能 file:// 開）。
4. 評測：Python 用 Pyodide（v0.26.4）、JS 用 `new Function`，都在 `worker.js`。**Python 的輸入必須用 `sys.stdin = io.StringIO(...)` 餵入**，不可改回 `py.setStdin`（長行會在 8192 字元被截斷）。每筆測資用全新的 globals。
5. 題目測資由 `ref` 參考解自動產生，隨機資料用固定種子（結果每次相同）。題目難度用 `problems.js` 底部的 `LV` 表。
6. 紀錄結構：`users/{uid}/subs/{題號}`。網站開關：`config/site` = `{open, message, updatedAt}`。管理員：`admins/{uid}` 文件存在即是（只能在 Console 手動建）。Firestore 規則見 README.md，修改結構時規則要同步更新。
7. 預設深色模式，右上角可切換，偏好存在 localStorage（鍵名 `mj-theme`）。顏色一律用 `style.css` 的 CSS 變數，不要寫死色碼。
8. 後台**不做**題目編輯功能（使用者也認為不要比較好）。
9. 交付方式：**只給 zip**，zip 內不含 `js/config.js`；含 README.md 與 fix.md。
10. 回覆語言用繁體中文。
11. 頂欄與背景**不用粉紅色**（頂欄用 `--hd`：靛藍→天藍）。背景漸層不能直接做過渡，所以用 `body::before`（深）與 `body::after`（淺）兩層淡入淡出；其他元素靠 `*{transition}`。新增顏色仍要走 CSS 變數。
12. 頂欄上的連結（管理後台、回到首頁）一律用 `class="btn"` 的按鈕樣式；`[hidden]` 要保持 `display:none!important`。
13. 頂欄的使用者名稱一律用 `js/ui.js` 的 `setWho(user, isAdmin)` 渲染成 `.chip` 方框（頭像 + 名稱 + 管理員標籤），不要直接寫 textContent。
14. 每一題都必須在 `data/solutions.js` 有對應的 `exp`（解析）與 `py`（Python 參考程式碼）；新增題目時要同步新增。
15. 參考答案按鈕固定在題目標題列右上角（`.ttl` + `button.ans`），點擊後**一定要先跳出確認視窗**（`<dialog id="dlg">`），同意後才顯示答案。
16. 程式碼上色用自製的 `js/highlight.js`（不依賴外部套件）。編輯器是「透明 textarea 疊在 pre 上」，兩者的字型、padding、行高、tab-size 要完全一致，且要同步捲動；編輯器固定使用深色配色，參考答案的配色隨深 / 淺色模式變化。
17. **不要用瀏覽器內建的 `alert()` / `confirm()`**（會顯示在畫面上方中間，很醜）。一律用 `js/ui.js` 的 `notice(訊息, 標題)` 或 `authError(e)`，它們會用置中的 `<dialog>` 顯示。
18. 非管理員進入 `admin.html` 只顯示「你不是管理員」＋回到首頁按鈕，**不顯示 UID 或設定說明**（管理員已設定完成）。UID 到 Firebase Console → Authentication → Users 查。
19. `index.html` 是首頁（選教學 / 測驗）；題目與評測頁是 `judge.html`（`app.js`）；教學頁是 `learn.html`（`learn.js` + `data/lessons.js`）。首頁與教學頁的登入 / 管理員 / 網站關閉判斷用 `js/shell.js` 的 `boot()`；網站關閉時三個前台頁都要顯示維護畫面。
20. 教學單元 `practice` 的題號必須存在於 `problems.js`，且**每一題至少被一個單元推薦**（新增題目時要補進某個單元）。教學範例程式必須用 python3 實際跑過、輸出正確。
21. 題目頁支援網址 `judge.html#題號` 直接開啟該題（教學頁的推薦題連結依賴這個）。`worker.js` 在 Python 執行完要 `sys.stdout.flush()`，否則結尾沒換行的輸出會遺失。

## 修改紀錄

### 1. 初版：類似 ZeroJudge 的網站
- 需求：可放 GitHub Pages、不要後台、用 Firebase 登入並做紀錄。
- 做法：單一 `index.html`，Google 登入 + Firestore 存解題紀錄，瀏覽器端用 Web Worker 評測（Python / JS）。

### 2. 拆檔、補測資
- 需求：不要只有 html，拆成 css 與 js，並製作測資。
- 做法：拆成 `css/`、`js/`、`data/`；`problems.js` 8 題，每題 8～11 筆測資，答案由 `ref` 自動算出。

### 3. Firebase 設定教學
- 需求：Firestore / 登入 / config 要怎麼設定（找不到「專案設定 → 你的應用程式」、介面英文名稱、Value 欄位找不到等）。
- 做法：只提供步驟說明與 Firestore 規則，沒有改程式。

### 4. 本機測試與網站全黑的錯誤
- 問題：`python` 找不到 → 改用 `py -m http.server`、Live Server 等；網站全黑並出現 `Failed to resolve module specifier "firebase/app"`。
- 原因：使用者把 Firebase 官方 npm 範例貼進 `config.js`。
- 修正：`config.js` 只留設定物件（見規則 1）。

### 5. 後台、彩色介面、更多題目
- 需求：新增 `admin.html` 可開關網站、僅管理員可用；畫面不要全黑要有色彩；題目太少；後台設定題目（使用者自己覺得不要比較好）。
- 做法：
  - 新增 `admin.html`、`js/admin.js`；`firebase.js` 加 `getSite / setSite / isAdmin`；`app.js` 在網站關閉時顯示維護畫面（管理員可繞過）。
  - 規則新增 `config`、`admins`，關閉時一般使用者無法寫入紀錄。
  - 介面改成彩色漸層、難度標籤、通過進度條。
  - 題目增加到 20 題（a009～a020）。
  - 不做後台編輯題目（見規則 8）。

### 6. 設定管理員 UID
- 需求：提供兩個管理員 UID。
- 做法：說明要在 Firestore 建立 `admins` 集合，文件 ID = UID（兩位各一份）。程式不需修改。

### 7. 預設深色模式
- 需求：網站要有深色模式，且預設深色。
- 做法：`style.css` 改 CSS 變數（預設深色，`data-theme="light"` 為淺色）；新增 `js/theme.js` 與頂欄切換按鈕；`index.html`、`admin.html` 在 head 先載入 theme.js 避免閃白。

### 8. 交付方式
- 需求：之後只給 zip，且 zip 不含 `js/config.js`。
- 做法：見規則 1、9。

### 9. 修正 Python 長輸入 RE
- 問題：a002 測資 6 在 Python 出現 `ValueError: invalid literal for int() with base 10: '-'`。
- 原因：Pyodide 的 stdin 處理器把超過 8192 字元的行截斷，剛好切在負號後面；測資本身正確。
- 修正：`worker.js` 改用 `sys.stdin = io.StringIO(輸入)`，且每筆測資用全新的 globals（見規則 4）。待使用者部署後確認。

### 10. 新增 README.md 與 fix.md
- 需求：寫 README，並建立 fix.md 記錄每次修改，避免之後改壞。
- 做法：新增這兩份文件，放在 zip 內。

### 11. 切換動畫、移除粉紅色、管理後台改按鈕
- 需求：深淺色切換要有動畫；頂欄不要粉紅色（醜）；「管理後台」要變成按鈕。
- 做法：
  - `style.css`：全域 `transition`（背景、文字、邊框、陰影 0.35 秒）；背景漸層改成深 / 淺兩層疊加並淡入淡出；偏好「減少動態效果」的使用者會自動關閉動畫。
  - 頂欄漸層改為靛藍→天藍（`--hd`），淺色背景與「關閉網站」按鈕也移除粉紅色調（改為紅色）。
  - 「管理後台」與後台的「回到首頁」改用 `.btn` 按鈕樣式。

### 12. 使用者名稱改成方框
- 需求：名字顯示好看一點，並做成類似按鈕的方框。
- 做法：新增 `js/ui.js` 的 `setWho()`；頂欄 `#who` 改成 `.chip`：圓形頭像（Google 大頭貼，沒有就用名字首字母）+ 名稱（過長會省略，滑過可看 email）+ 管理員會多一個「管理員」標籤；未登入顯示「訪客」。前台與後台都套用。

### 13. 新增題目、參考答案、解析、程式碼上色
- 需求：繼續新增題目；每題右上角放「參考答案」按鈕，點開前先跳出提示；要有解析；程式碼要有顏色。
- 做法：
  - `problems.js` 新增 a021～a030（質數個數、第二大的數、連續字元壓縮、最小公倍數、陣列右旋、找位置、最大連續子陣列和、不同單字數、巴斯卡三角形、FizzBuzz），共 30 題。
  - 新增 `data/solutions.js`：30 題都有解析與 Python 參考程式碼（已用 Python 對所有測資跑過驗證）。
  - `app.js`：標題列右上角「💡 參考答案」→ 確認視窗（再想想 / 我要看答案）→ 顯示解析與上色後的程式碼，可複製。
  - 新增 `js/highlight.js`；編輯器改成有顏色的版本（透明 textarea 疊在 pre 上）。

### 14. 非管理員畫面簡化、提示改置中
- 需求：管理員帳號已設定完成，管理員介面（對非管理員）只要顯示「你不是管理員」；提示不要出現在畫面上方中間，要在正中央。
- 做法：
  - `admin.js`：非管理員畫面改成置中的「🚫 你不是管理員」＋「回到首頁」按鈕，移除 UID 與設定說明；未登入改為置中的「請先登入」。
  - `ui.js` 新增 `notice()`、`authError()`（置中 dialog）；`app.js`、`admin.js` 的所有 `alert()` 都換掉；使用者自己關掉登入視窗不再跳錯誤。
  - `README.md` 的管理員設定步驟改成「到 Authentication → Users 查 UID」。

### 15. 首頁、教學單元、每單元建議練習題
- 需求：網站不只測驗，還要有教學（參考 APCS 先修班網站）；每個單元教完後建議做哪些題目；index.html 變成首頁（選教學或測驗），原本的程式碼變成新的 html。
- 做法：
  - 原本的 `index.html` → `judge.html`（加上「首頁」「📚 教學」按鈕，支援 `#題號`）；新的 `index.html` 是首頁，兩張大卡片：📚 教學、🧪 測驗。
  - 新增 `learn.html`、`js/learn.js`、`data/lessons.js`：10 個單元（輸入輸出與變數、運算子與條件判斷、迴圈、串列與輸入技巧、字串、函式與數學小演算法、陣列掃描與雙層迴圈、二維串列、堆疊與遞迴、複雜度與除錯），共 45 個範例，可在頁面上按「▶ 執行」。
  - 每單元結尾有「建議接著做這些題目」：必做 + 挑戰，30 題全部都有被推薦；登入後顯示已通過的 ✔ 與單元完成進度。
  - 新增 `js/shell.js`、`js/home.js`；`judge.js` 匯出 `runCase` 供教學範例使用；`worker.js` 結尾補 `stdout.flush()`。
