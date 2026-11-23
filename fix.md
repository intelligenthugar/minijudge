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
9. 交付方式：**zip 只放要上傳到 GitHub Pages 的網站檔案**（5 個 html、`css/`、`js/`（不含 `config.js`）、`data/`），**並且每次都把更新後的 `fix.md` 另外附上**（使用者需要拿它來對照做過什麼，也要在新對話時上傳給我）。`tools/`、`worker/`、`README.md`、`tools/testdata.json` 不放進 zip，留在工作資料夾，需要時再單獨提供。
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
22. 測驗頁與教學頁（`<body class="app">`）的左側清單是**固定在頂欄下方、自己獨立捲動**的（`position:sticky` + 高度 `100vh - --hh`；`--hh` 由 `theme.js` 量測頂欄高度）。捲軸一律細且低調：全站 `scrollbar-width:thin`，側欄的捲軸平常透明、滑鼠移上去才顯示。手機版（≤700px）側欄不固定。新增頁面如果有側欄，記得加 `class="app"`。
23. 網站狀態、公告、課程與題目開關**全部存在同一份文件** `config/site`（一次頁面載入只讀一次）：`open`、`message`、`closeFrom`、`closeUntil`（毫秒時間戳記，null 代表沒有）、`announce {on,text,level,id}`、`closedLessons[]`、`closedProblems[]`。判斷邏輯集中在 `js/site.js`，不要在各頁面自己寫。
24. 關閉的單元 / 題目：一般使用者看到「維修中」畫面、清單灰掉並顯示 🔒；管理員仍可進入並看到提示。Firestore 規則（README）要同步檢查 `closedNow`、`siteOpen`、`problemOpen`，修改欄位時規則一起改。新增任何前台頁面，都要呼叫 `showAnnounce(site)` 與關閉判斷（用 `shell.js` 的 `boot()` 即可）。
25. 函式對照表的資料 `data/functions.js`（Python）與 `data/functions_cpp.js`（C++）都是**產生出來的**：分別修改 `tools/build_functions.py`、`tools/build_cpp_functions.py` 後重新執行，「執行結果」由 python3 / g++ 實際跑出來，不要手寫。每筆要填對應的教學單元（`unit`）。函式表頁面（`js/functions.js`）用 `?lang=py|cpp` 切換。
26. 教學單元 6 有 lambda 的三個小節（基本用法、`key=lambda` 排序 / 搜尋、搭配 `map` / `filter`）；函式對照表也有 lambda 相關條目，修改教學時不要刪掉。
27. 提交後沒通過的測資，要能展開看輸入、期望輸出、你的輸出（`app.js` 的 `detail()`）。測資本來就公開在前端，所以不特別隱藏。
28. 難度標籤（`.lv`）一律 `white-space:nowrap`，清單項目太長時只能讓標題換行，不能讓標籤斷成兩行。
29. 首頁背景動畫在 `js/bg.js`（`<canvas id="bg">`，`body.home`），共 6 種場景 + 隨機 + 關閉，場景由後台 `config/site.bg` 決定（`home.js` 會先用 localStorage 記住的值立刻開始，再換成最新設定；新增場景要同時加進 `SCENES` 與 `BG_LIST`）。畫布 `z-index:-1`，原本的深 / 淺色漸層層被推到更後面（`body.home::before/::after`）。顏色要隨深 / 淺色模式切換、**不使用粉紅色**；必須尊重 `prefers-reduced-motion`（只畫靜態一張）；動畫限制約 30fps 以省電。首頁卡片用半透明（`color-mix`）讓背景透出來。
30. 題目頁的「範例輸入 / 輸出」要有代表性，不能是 0、1、單一字元這種邊界值；第一筆測資若是邊界值，就在 `problems.js` 底部的 `SAMPLE` 指定。新增題目時要檢查範例看起來有沒有意義。
31. **C++ 內容**：教學單元（`data/lessons_cpp.js`）由 `tools/build_cpp_lessons.py` 產生，範例要用 g++ 實際編譯執行；每題都要有 C++ 參考程式碼（`data/solutions_cpp.js`），且要用 `tools/judge_cpp.py` 對全部測資跑過。
32. 本機評測用的測資是 `tools/testdata.json`（由 `node tools/export_tests.mjs` 產生，**單一檔案、不要放進 zip / 版本控制**；不要再產生一大堆 `.in/.out` 檔）。每個 C++ 單元的推薦題要全部存在於 `problems.js`；`closedLessons` 同時涵蓋 Python 單元（u01…）與 C++ 單元（c01…）。
33. 首頁三張卡片要保持半透明（`body.home a.big`），讓背景動畫看得到；文字用 `text-shadow` 維持可讀。
34. **C++ 線上評測**：網頁 → Cloudflare Worker（`worker/cloudflare-worker.js`，持有 OnlineCompiler.io 金鑰）→ OnlineCompiler.io 的 Piston 相容 API（`POST /api/v2/piston/execute`，`Authorization: 金鑰` 不加 Bearer）。**API 金鑰絕不能出現在網站任何檔案或程式碼裡**；該 API 不送 CORS 標頭，所以一定要經過 Worker。Worker 要檢查 Origin、只允許 C++、限制程式與輸入大小、限制 timeout。
35. Worker 網址存在 `config/site.runnerUrl`（後台「C++ 評測」分頁設定）；有值測驗頁才會出現 C++ 選項，不要改成要求使用者修改 `config.js`（缺少匯出會讓整個網站壞掉）。新判定 `CE`（編譯錯誤）、`ERR`（評測服務問題）：第一筆測資編譯失敗或服務出錯就停止，其餘測資 4 筆一組並行送出。評測流程在 `js/runner.js`。
36. **課程完成**依「用哪種語言通過」分開算：紀錄裡有 `solvedBy {py, cpp}`（舊紀錄可能還有 `js`，一律忽略）（`app.js` 儲存），`learn.js` 的 `solved(id, 單元語言)` 只看對應語言；沒有 `solvedBy` 的舊紀錄用當時的 `lang` 判斷。Python 單元只算 Python、C++ 單元只算 C++，JavaScript 不列入。
37. **只支援 Python 與 C++ 兩種語言**（JavaScript 已移除：不要再加回語言選單、`worker.js` 的 JS 分支、`highlight.js` 的 JS 上色）。題目清單的 ✔ 要標出通過的語言（`.lg` 標籤，用 `site.js` 的 `solvedBy()` 判斷）；語言選單載入舊紀錄的語言時，若該選項不存在要退回預設，不能把選單設成空值。a009（n ≤ 18）與 a024（≤ 10^6）的限制當初是為了 JavaScript 的數字精度，現在保留不動，避免更動測資。
38. 提交紀錄的結構（`site.js` 的 `buildRecord()`，**不要在別處手寫紀錄**）：`lang`、`code`（最後一次提交，相容舊資料）、`solved`、`solvedBy {py, cpp}`、`byLang {py: {code, solved, acCode…}, cpp: {…}}`、`lastStatus`、`tries`。每種語言各自記住最後提交的程式碼與通過的程式碼（`acCode`），換語言時載入該語言自己的程式碼（不是範本）；Firestore 不接受 `undefined`。舊紀錄（沒有 `byLang`）的 `lang / code` 要先搬進 `byLang`，否則下一次提交會把它蓋掉。題目清單兩種語言都通過時顯示「都通過」。編輯中的內容另外存在記憶體的 `drafts`（每題每語言），切換語言不會弄丟。
39. 題目分三組（`problems.js` 依題號決定 `group`）：`basic`（a001–a030）、`apcs`（a031–a046，原創、APCS 風格）、`formula`（a047–a055，公式題）。測驗頁清單有「全部 / 基礎 / 公式 / APCS」篩選（`localStorage` 的 `mj-group`），題目標題旁有分類標籤。新增題目要：放在 `RAW` 最後、更新 `LV` 與必要的 `SAMPLE`、補 Python 與 C++ 解答（`solutions*.js`）、加進某個教學單元的推薦（Python 與 C++ 各自的 `more`），並用兩種語言的解答對全部測資驗證過。
40. **版權**：不複製歷屆 APCS、ZeroJudge 等外部題目的題目敘述與測資。只收原創題，或題型相同但自己重新設計的題。
41. **輸出小數的題目**：題目要寫明「四捨五入到小數點後第 N 位」，用精確比對（不是容許誤差）。測資必須避開「剛好在進位邊界」與 `-0.00`（`nearTie()` 篩選；解必須非 0 時要在題目寫明），並用不同寫法驗證結果一致（`math.hypot`、`** 0.5`、不同運算順序、迴圈連乘 vs 次方…）。JavaScript 的 `toFixed` 在邊界時和 C / Python 不同，所以不能依賴邊界值。大整數（例如 a053 的前 n 項和）參考解要用 `BigInt`。
42. **長題格式**（`a056`～`a060`，group `long`）：題目欄位為 `story`（敘述）、`inFmt`、`outFmt`、`hint`、`samples`（多組範例）、`subtasks`（`[{score, text, tests:[測資編號…]}]`，分數加起來 100，測資編號要完整涵蓋且不重複）。顯示在 `js/statement.js`（`statement()`、`fmtText()`：空行分段、`- ` 條列、`1. ` 編號、`` `程式碼` ``、`**粗體**`），計分在 `scoring()`，紀錄存 `score` / `bestScore`；清單上未通過但有部分分數的題目顯示「N分」。
43. **測資產生**：`inputs` 可以放字串或「函式」（`() => 字串`），第一次用到才產生；`PROBLEMS[i].tests` 是 getter。長題的每筆測資要用**自己的種子**（`rng(seed)`），不能用全域的 `R`（不然產生順序會影響其他題的測資）。**每筆輸入不可超過 60000 字元**（C++ 線上評測的 Worker 單次上限是 64000 字元）。子任務的限制要真的成立（用腳本檢查過）。

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

### 16. 題目清單獨立捲動、捲軸變細
- 需求：測驗旁邊那一欄題目要可以單獨滑動，且不要出現很醜的捲軸。
- 做法：`judge.html`、`learn.html` 加上 `body.app`；頂欄固定在最上面，左側清單用 sticky 貼在頂欄下方、高度為視窗剩餘空間、內容多時自己捲動；全站捲軸改成細版，側欄捲軸平常隱藏、滑鼠移上去才出現；手機版維持原本的上下排列。`theme.js` 新增頂欄高度量測（`--hh`）。

### 17. 後台擴充：課程 / 題目開關、計時 / 定時關閉、公告
- 需求：後台可以控制哪些課程可讀、哪些題目可做（有人回報 bug 先關起來）；關閉網站可以計時關閉或定時關閉；可以設定公告。
- 做法：
  - `admin.html` 改成四個分頁：網站狀態（手動、計時、定時）、公告、課程、題目；開關用切換鈕、題目可搜尋。
  - 新增 `js/site.js`（`isClosed`、`lessonClosed`、`problemClosed`、`closedMsg`、`showAnnounce`）；`app.js`、`learn.js`、`shell.js`、`home.js` 都改用它。
  - 關閉的題目 / 單元：清單灰掉 + 🔒，點進去顯示維修中；管理員可繞過並看到提示。
  - **Firestore 規則已更新**（README）：新增 `closedNow`、`problemOpen`，一般使用者無法對被關閉的題目、或關閉期間寫入紀錄。使用者需要重新發布規則。

### 18. 函式對照表、lambda、失敗測資顯示輸入輸出
- 需求：測資錯誤時要給輸入輸出；也要一個函式對照表（參考 APCS 先修班的函式統整表）；把很酷的 lambda 寫進去。
- 做法：
  - `judge.js` 把每筆測資的輸入、期望輸出、你的輸出傳給 `app.js`；沒通過的測資可展開查看，WA 會標出從第幾行開始不同，太長會截斷。
  - 新增 `functions.html`、`js/functions.js`、`data/functions.js`、`tools/build_functions.py`：118 個函式與語法，10 個分類，可搜尋、有分類跳轉、每個範例附真實執行結果與對應教學單元。內容與範例是自己寫的，不是複製參考網站。首頁加了第三張卡片，教學頁與測驗頁的頂欄加了「📖 函式表」。
  - 教學單元 6 新增三個 lambda 小節（共 3 個範例區塊），並更新學習目標。

### 19. 修正題目清單的難度標籤被擠成兩行
- 問題：題目名稱較長（例如 a027 最大連續子陣列和）時，右邊的「困難」標籤被擠成一個字一行。
- 修正：`.lv` 加上 `nowrap`、不被壓縮；清單項目的右側群組不換行，只讓左邊標題換行。

### 20. 首頁背景：會動的聖誕樹
- 需求：首頁有點單調，想用很酷的動畫當背景，像是用文字變色做出聖誕樹。
- 做法：新增 `js/xmas.js`，用 canvas 把程式符號（`{ } ( ) ; 0 1`…）排成一棵五層的聖誕樹，樹頂有發光的星星、樹幹；綠色的字會被一道金光掃過而變色、彩燈（紅 / 金 / 藍 / 白）輪流換色閃爍；另有飄落的雪。深 / 淺色模式各有配色，減少動態效果時只畫靜態一張，約 30fps。首頁卡片改半透明，讓背景透出來。

### 21. 修正沒意義的範例輸入輸出
- 問題：a005 費氏數列的範例是 `0 → 0`、a029 巴斯卡三角形的範例是 `1 → 1`，因為範例直接拿第一筆測資（邊界值）。
- 修正：新增 `SAMPLE` 對照表，改為有代表性的範例；同時檢查了其他題目，一併修了 a004、a009、a012、a013、a015、a017、a019、a021、a030（原本也是 0 / 1 / 2 這類邊界值）。測資本身沒有動。

### 22. 首頁卡片透明、多種背景動畫（後台切換）、C++ 教學與測資
- 需求：首頁三個方塊更透明才看得到聖誕樹；多做幾個類似的動畫並可在後台切換；要有 C++ 教學跟測資。
- 做法：
  - 首頁卡片改成約 38% 不透明、模糊只剩 1.5px，並加文字陰影維持可讀。
  - `xmas.js` 改成 `bg.js`：6 種場景（聖誕樹、程式碼雨、大雪、星空流星、煙火、二進位波浪）+ 每次隨機 + 關閉；後台新增「外觀」分頁，選擇存在 `config/site.bg`；課程分頁也列出 C++ 單元。
  - 新增 C++：`lessons_cpp.js`（8 單元、39 個範例，g++ 實際執行）、`solutions_cpp.js`（30 題，528 筆測資全部通過）、`testdata/`、`tools/judge_cpp.py` / `export_tests.mjs`；教學頁可切換 Python / C++；答案視窗有 Python / C++ 分頁；`highlight.js` 支援 C++。
  - 網站無法直接提交 C++（原因見規則 31），所以 C++ 練習用本機評測。

### 23. 網站上的 C++ 評測（OnlineCompiler.io）、測資改成單一檔案
- 需求：使用 OnlineCompiler.io 讓網站可以評測 C++，要一步一步教；testdata 檔案太多（558 個）。
- 做法：
  - 新增 `worker/cloudflare-worker.js`（放金鑰、檢查 Origin、只允許 C++）、`js/runner.js`（逐筆評測，含 CE / ERR 判定）；測驗頁語言選單在有設定 Worker 網址時多出「C++ (g++)」；後台新增「C++ 評測」分頁（貼網址、測試連線）；教學頁的 C++ 單元在開啟後也會記錄進度。
  - 驗證：Worker 的 12 項行為測試全過；用本機 g++ 模擬評測服務，30 題 C++ 參考答案走完整評測流程全部 AC，另測 CE / WA / RE / TLE / 服務錯誤 / 斷線皆判定正確。
  - 測資：刪除 `testdata/` 資料夾（558 個檔），改為 `tools/testdata.json` 單一檔案、需要時自動產生、不放進 zip；`judge_cpp.py` 同步修改。
  - 更正：先前口頭說的免費額度「每月 1 萬次」有誤，官方頁面（2026/11/12 更新）寫的是每月 10 萬次執行。

### 24. C++ 函式對照表、依語言計算課程完成、zip 只放要上傳 GitHub 的檔案
- 需求：函式表沒有 C++；課程是看題目有沒有做完來判斷，這樣用 Python 做完也會算進 C++；之後 zip 只要給我要上傳 GitHub 的就好。
- 做法：
  - 新增 `tools/build_cpp_functions.py` 與 `data/functions_cpp.js`：107 個 C++ 函式與語法（8 類），全部用 g++ 編譯執行；`functions.html` 加上 Python / C++ 切換；首頁卡片顯示兩邊的數量。
  - 提交紀錄新增 `solvedBy`（記錄用哪種語言通過）；教學頁的 ✔ 與單元完成進度改成依單元語言計算，並寫了 7 項邏輯測試（含舊紀錄相容）。
  - zip 改成只含網站檔案（見規則 9）。

### 25. 題目清單的打勾分語言、移除 JavaScript
- 需求：題目列表的打勾也要區分 C++ 或 Python；JavaScript 目前用不到，先拿掉。
- 做法：
  - 題目清單的 ✔ 旁邊加上 `Py`、`C++` 小標籤（兩種都通過就兩個都顯示）；題目頁的「你的紀錄」也寫出通過的語言。判斷邏輯共用 `site.js` 的 `solvedBy()`（教學頁也改用它）。清單欄寬由 260px 調為 300px。
  - 移除 JavaScript：語言選單、程式碼範本、`worker.js` 的 JS 執行分支、`highlight.js` 的 JS 上色；解析文字中提到 JavaScript 的兩處（a009、a024）已改寫。
  - 順手修一個潛在問題：舊紀錄的語言若在選單裡不存在（例如以前用 JavaScript 提交、或 C++ 尚未開啟），原本會把選單設成空值、編輯器出現 `undefined`，現在退回預設語言。

### 26. 修正只顯示 C++ 通過、補回「載入通過的程式碼」
- 問題：a001 用 Python 與 C++ 都通過，清單卻只有 `C++`；而且重新開題目看不到自己通過的程式碼。
- 原因：
  - 舊版紀錄只存「最後一次提交」的語言與程式碼。更新前如果在 Python 通過之後又提交過一次 C++（即使失敗），紀錄裡的語言就被改成 C++，Python 通過的資訊就遺失了。
  - 語言選單切換時一律載入空白範本，而且整題只存一份程式碼，換語言就蓋掉另一種。
- 修正：新增 `buildRecord()`，每種語言各自存最後提交的程式碼與通過的程式碼（`byLang`）；切換語言載入該語言自己的程式碼；已通過時編輯器上方顯示「✔ 你已經用 XX 通過這題」與「載入我通過的程式碼」按鈕；`solvedBy()` 也看 `byLang`。
- 已經遺失的舊資料無法還原，那一題用該語言重新提交通過一次即可補回。

### 27. 兩種語言都通過顯示「都通過」、修正切換語言後看不到通過的程式碼
- 需求：Python 與 C++ 都通過時，題目清單要寫「都通過」；從 C++ 切到 Python 看不到通過的程式碼。
- 原因：`buildRecord()` 沒有把舊紀錄（只存最後一次提交的 `lang / code`）搬進 `byLang`。先用 Python 通過（舊紀錄）、再用 C++ 提交時，Python 的程式碼就被 C++ 的覆蓋了；切到 Python 只剩範本。上一版的測試只檢查了「通過標記」有沒有保留，漏掉「程式碼」有沒有保留。
- 修正：舊紀錄先搬進 `byLang` 再合併；新增 `passedLangs()`；清單兩種都通過時顯示「都通過」；另外在記憶體保存每題每語言正在編輯的內容（`drafts`），切換語言或換題目再回來都還在。已經被覆蓋掉的程式碼無法還原，需要重新提交一次。

### 28. 更多題目：APCS 風格 16 題、公式題 9 題
- 需求：更多題目，可以放競賽題、APCS 考題或 ZeroJudge 題目；也要公式類的題目（一元二次方程式、畢氏定理…）。
- 做法：
  - **沒有直接收錄 APCS / ZeroJudge 的題目**（版權屬原作者，見規則 40），改成寫原創題，題型與難度參考 APCS：a031–a046 共 16 題（成績統計、最大括號深度、逆序數對、矩陣旋轉、螺旋矩陣、島嶼數量 DFS、迷宮最短路 BFS、河內塔、全排列、N 皇后、零錢兌換、0/1 背包、LCS、LIS、活動選擇、木材切割二分搜尋）。
  - 公式題 a047–a055 共 9 題：畢氏定理、直角三角形判斷、一元二次方程式、兩點距離、圓的面積與周長、溫度轉換、等差數列、複利、二元一次聯立方程式。測資用 `nearTie()` 避開進位邊界與 -0.00。
  - 每題都有 Python 與 C++ 解答與解析；Python 與 C++ 解答對全部測資跑過、結果與參考解完全一致（共新增 25 題）；公式題另外用不同寫法（hypot、`** 0.5`、運算順序、迴圈連乘等）驗證輸出一致。
  - 測驗頁清單新增分類篩選與題目標題旁的分類標籤；教學單元（Python 與 C++）都補上對應的推薦題。
  - 總題數 55 題。

### 29. fix.md 改為每次單獨附上
- 問題：之前把 `fix.md` 移出 zip 之後，我雖然有持續更新，但沒有交給使用者，所以看起來「都沒有更新」。
- 修正：規則 9 改為 zip 只放網站檔案，**`fix.md` 每次另外附上**。

### 30. 競賽風格長題（長敘述、多筆 EOF 測資、子任務計分）
- 需求：APCS 的題目都是很長一串，並提供了 MingdaoCP 模擬賽的題目當範例。
- 做法：
  - 看過範例之後，題目格式比照：長敘述（有劇情）、輸入描述（含限制）、輸出描述、提示、多組範例、**子任務與分數**、多筆測資讀到 EOF。**沒有複製範例題目的內容**，題目與劇情都是原創。
  - 新增 5 題：a056 喵星的日曆（日期推算，k 到 10^9）、a057 魔法學院的壓縮咒語（堆疊、巢狀展開）、a058 魔法水塔（差分，n 到 10^6、要用 long long）、a059 掃地機器人（網格模擬 + 循環偵測，K 到 10^9）、a060 校園程式競賽排名（自訂排序與並列名次）。
  - 新增 `js/statement.js`；測驗頁依子任務計分（0～100 分），並新增「長題」分類。
  - 驗證：Python 與 C++ 解答對全部測資 AC；子任務的限制用腳本逐筆檢查；用不同方法交叉驗證（逐日暴力、日期換算、regex 展開、itertools 前綴和、C++ 逐輪暴力、名次計數）。
  - 測資改成第一次用到才產生，並為長題各自使用獨立種子。過程中修了兩個問題：a057 的產生器太慢（5 秒 → 0.1 秒）、a058 的輸入太接近 Worker 上限（m 改為最多 2500）。
  - 總題數 60 題。

### 31. 評估是否改用 Cloudflare Pages（尚未改動程式）
- 查到的資訊：Cloudflare 目前建議**新專案用 Workers 的 Static Assets**，Pages 仍然支援，但新功能都在 Workers；一個 Worker 可以同時提供靜態網站與 `/api/*`（`run_worker_first`），同網域就不用處理 CORS。
- 若要搬：Firebase 要把新網域加到「已授權網域」；Worker 的 `SITE_ORIGIN` 要改；`localStorage` 是依網域分開的，深色模式與背景設定會重置；Firestore 資料不受影響。
- 結論與選項已回覆使用者，等使用者決定後再動工。
