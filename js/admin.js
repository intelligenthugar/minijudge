import {onUser, login, logout, getSite, setSite, isAdmin} from "./firebase.js";

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
const box = $("#box");

$("#auth").onclick = async () => {
  try { $("#auth").textContent === "登出" ? await logout() : await login(); }
  catch (e) { alert("登入失敗：" + e.message); }
};

onUser(async u => {
  $("#auth").textContent = u ? "登出" : "Google 登入";
  $("#who").textContent = u ? (u.displayName || u.email) : "未登入";
  if (!u) { box.innerHTML = "<p>請先登入管理員帳號。</p>"; return; }
  if (!await isAdmin(u.uid)) {
    box.innerHTML = `<h2 class="wa">你不是管理員</h2>
      <p>你的 UID：</p><pre>${esc(u.uid)}</pre>
      <p>如果你是站長：到 Firebase Console → Firestore → 開始集合，集合 ID 填 <b>admins</b>，文件 ID 貼上面的 UID，欄位隨意（例如 role = admin），儲存後重新整理本頁。</p>`;
    return;
  }
  panel(await getSite());
});

function panel(s) {
  const open = s.open !== false;
  const t = s.updatedAt && s.updatedAt.toDate ? s.updatedAt.toDate().toLocaleString("zh-TW") : "尚未設定";
  box.innerHTML = `<h2>網站狀態</h2>
    <div class="state ${open ? "on" : "off"}">${open ? "🟢 開放中" : "🔴 已關閉"}</div>
    <small>最後更新：${esc(t)}</small>
    <label>關閉時顯示給使用者的訊息</label>
    <input id="msg" value="${esc(s.message || "")}" placeholder="例如：系統維護中，預計 18:00 恢復">
    <div class="row"><button class="p" id="on">開放網站</button><button class="danger" id="off">關閉網站</button></div>
    <small>關閉後，一般使用者只會看到維護畫面且無法儲存紀錄；管理員仍可正常使用前台。</small>`;
  $("#on").onclick = () => save(true);
  $("#off").onclick = () => save(false);
}
async function save(open) {
  try { await setSite({open, message: $("#msg").value}); panel(await getSite()); }
  catch (e) { alert("儲存失敗：" + e.message); }
}
