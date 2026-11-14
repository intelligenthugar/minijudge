import {onUser, login, logout, getSite, setSite, isAdmin} from "./firebase.js";
import {setWho, authError, notice} from "./ui.js";

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
const box = $("#box");

$("#auth").onclick = async () => {
  try { $("#auth").textContent === "登出" ? await logout() : await login(); }
  catch (e) { authError(e); }
};

onUser(async u => {
  $("#auth").textContent = u ? "登出" : "Google 登入";
  setWho(u, false);
  if (!u) { box.innerHTML = `<div class="closed"><div style="font-size:56px">🔐</div><h2>請先登入</h2><p>請使用管理員帳號登入。</p></div>`; return; }
  const adm = await isAdmin(u.uid);
  setWho(u, adm);
  if (!adm) {
    box.innerHTML = `<div class="closed"><div style="font-size:56px">🚫</div><h2>你不是管理員</h2>
      <p>這個帳號沒有後台權限。</p><a class="btn go" href="index.html">回到首頁</a></div>`;
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
  catch (e) { notice(e.message, "儲存失敗"); }
}
