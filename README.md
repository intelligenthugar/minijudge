# MiniJudge

純前端的線上程式評測網站，類似 ZeroJudge。可直接放在 GitHub Pages，**沒有自己的伺服器**，登入與紀錄交給 Firebase。

## 功能
- **函式對照表**（`functions.html`）：118 個常用函式與語法，分 10 類，可搜尋；每個範例都附上真正執行出來的結果，並連到對應的教學單元
- 提交後，沒通過的測資可以展開看「輸入、期望輸出、你的輸出」（WA 會標出從第幾行開始不同）
- **首頁**（`index.html`）：選擇「📚 教學」或「🧪 測驗」
- **教學**（`learn.html`）：10 個單元，由輸入輸出一路到遞迴與複雜度；範例程式可直接在頁面上執行；每個單元最後有「建議練習」的題目（必做 / 挑戰），登入後會顯示完成進度
- 30 題題庫（簡單 / 中等 / 困難），每題 7～13 筆測資，含邊界值與大型隨機資料
- 每題右上角有「💡 參考答案」按鈕：先跳出確認視窗，同意後顯示解析與有顏色的 Python 參考程式碼（可複製）
- 程式碼編輯器與參考答案都有語法上色（Python / JavaScript）
- 支援 **Python 3**（Pyodide）與 **JavaScript**，程式在瀏覽器的 Web Worker 內評測
- 判定：AC、WA、TLE、RE
- Google 登入，個人解題紀錄（通過與否、嘗試次數、最後提交的程式碼）存在 Firestore
- 後台 `admin.html`（僅管理員）：
  - **網站狀態**：手動開放 / 關閉、**計時關閉**（關 N 分鐘後自動恢復）、**定時關閉**（排定開始與結束時間）、自訂關閉訊息
  - **公告**：顯示在所有前台頁面最上方（一般 / 注意 / 緊急三種顏色），使用者可自己關掉
  - **課程**、**題目**：可個別關閉有 bug 的單元或題目（使用者看到「維修中」，管理員仍可使用）
- 深色模式（預設）與淺色模式，可切換，選擇會被記住

## 檔案結構
```
minijudge/
├── index.html          首頁（選教學或測驗）
├── learn.html          教學頁
├── functions.html      函式對照表
├── judge.html          測驗頁（題目與評測，可用 judge.html#a001 直接開題）
├── admin.html          後台（僅管理員）
├── README.md
├── fix.md              修改紀錄與不可破壞的規則
├── css/style.css       樣式（CSS 變數，深 / 淺色）
├── data/problems.js    題目與測資
├── data/solutions.js   每題的解析與 Python 參考程式碼
├── data/functions.js   函式對照表資料（由 tools/build_functions.py 產生）
├── data/lessons.js     教學單元與每單元的建議練習題
└── js/
    ├── config.js       Firebase 設定（自己建立，不在 zip 內）
    ├── firebase.js     登入、讀寫紀錄、網站開關、管理員判定
    ├── judge.js        評測流程與判定
    ├── worker.js       在獨立執行緒執行使用者程式
    ├── app.js          測驗頁介面
    ├── functions.js    函式對照表頁面
    ├── learn.js        教學頁介面
    ├── home.js         首頁
    ├── site.js         網站狀態 / 公告 / 課程題目開關的共用判斷
    ├── shell.js        首頁 / 教學頁共用的登入與網站開關邏輯
    ├── admin.js        後台介面
    ├── highlight.js    語法上色
    ├── theme.js        深淺色切換
    └── ui.js           頂欄使用者名稱方框
```

## 部署步驟
### 1. Firebase
1. 到 [Firebase Console](https://console.firebase.google.com) 建立專案。
2. **Authentication** → 開始使用 → Sign-in method → 啟用 **Google**。
3. Authentication → 設定 → **已授權網域**，加入 `你的帳號.github.io`（本機測試再加 `localhost`）。
4. **Firestore Database** → 建立資料庫（位置建議 `asia-east1`，模式選「正式版模式」）。
5. Firestore → **規則**，貼上下方規則並發布。
6. 專案設定（左上角齒輪）→ 一般 → 你的應用程式 → 新增 Web 應用程式（`</>`），取得 `firebaseConfig`。

### 2. config.js
建立 `js/config.js`，**只放設定物件**，不要貼 Firebase 官方範例裡的 `import ... from "firebase/app"`：
```js
export const firebaseConfig = {
  apiKey: "...",
  authDomain: "...firebaseapp.com",
  projectId: "...",
  appId: "..."
};
```

### 3. GitHub Pages
把整個專案推到 GitHub repo，Settings → Pages 選分支與根目錄。更新後用 **Ctrl+F5** 強制重新整理。

### 4. 設定管理員
1. 取得要當管理員的帳號 UID：Firebase Console → Authentication → Users，那個帳號「使用者 UID」欄位。
2. Firestore → 開始集合（Start collection），集合 ID `admins`，**文件 ID 貼上 UID**，欄位任意（例如 `role` = `admin`）。
3. 重新整理 `admin.html`。每位管理員各建一份文件。

## Firestore 規則
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null &&
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    // 手動關閉，或現在落在計時 / 定時關閉的區間內
    function closedNow(s) {
      let now = request.time.toMillis();
      return s.get('open', true) == false ||
        (s.get('closeFrom', null) != null && now >= s.closeFrom &&
         (s.get('closeUntil', null) == null || now < s.closeUntil));
    }
    function siteOpen() {
      let p = /databases/$(database)/documents/config/site;
      return !exists(p) || !closedNow(get(p).data);
    }
    function problemOpen(pid) {
      let p = /databases/$(database)/documents/config/site;
      return !exists(p) || !(pid in get(p).data.get('closedProblems', []));
    }

    match /config/{doc} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /admins/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid;
    }
    match /users/{uid}/subs/{pid} {
      allow read: if request.auth != null && request.auth.uid == uid;
      allow write: if request.auth != null && request.auth.uid == uid
                   && ((siteOpen() && problemOpen(pid)) || isAdmin());
    }
  }
}
```

## 新增或修改函式對照表
編輯 `tools/build_functions.py` 裡的 `add(...)` 清單，再執行 `python tools/build_functions.py`，會用 python3 實際跑每個範例、把結果寫進 `data/functions.js`（不要手改那個檔案）。

## 新增教學單元
編輯 `data/lessons.js`，格式見檔案開頭的說明。每個單元的 `practice.must / more` 要填 `problems.js` 裡存在的題號；範例程式請先在本機用 python3 跑過確認輸出正確。

## 新增題目
編輯 `data/problems.js`，在 `RAW` 陣列加一題：
```js
{id: "a021", title: "題目名稱", limit: 2000,
 desc: "題目敘述", inFmt: "輸入說明", outFmt: "輸出說明",
 ref: s => /* 參考解：輸入字串 → 答案字串 */,
 inputs: ["測資輸入1", "測資輸入2", ...]}
```
標準答案由 `ref` 自動算出。**同時要到 `data/solutions.js` 補上同一題的 `exp`（解析）與 `py`（Python 參考程式碼）。**難度在檔案底部的 `LV` 設定（1 簡單、2 中等、3 困難，沒寫預設 1）。

## 本機測試
ES Module 與 Web Worker 不能用雙擊開檔，要用本機伺服器：
```
py -m http.server 8000
```
再開 `http://localhost:8000`（或用 VS Code 的 Live Server）。

## 限制
- 沒有後台伺服器，**測資公開在前端原始碼**，且紀錄由使用者端回報，可被偽造，不適合做正式比賽或可信的排行榜。
- 網站、單元、題目的「關閉」是前端畫面攔截 + Firestore 規則禁止一般使用者寫入紀錄；靜態檔案本身仍是公開的。計時 / 定時關閉在使用者載入頁面時判斷，已經開著頁面的人要重新整理才會看到變化，也依賴使用者電腦的時鐘（Firestore 規則則用伺服器時間）。
- 不支援 C / C++（瀏覽器端編譯器檔案太大）。
- 後台不提供編輯題目：題目請直接改 `data/problems.js` 後 push，有版本紀錄也較安全。
