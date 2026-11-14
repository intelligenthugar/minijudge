import {onUser, login, logout, getSite, setSite, isAdmin} from "./firebase.js";
import {setWho, authError, notice} from "./ui.js";
import {LESSONS} from "../data/lessons.js";
import {PROBLEMS} from "../data/problems.js";
import {fmtTime} from "./site.js";

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
const LV = ["", "簡單", "中等", "困難"];
const box = $("#box");
let site = {}, tab = "status", flashMsg = "";

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
  site = await getSite();
  render();
});

async function save(patch, ok) {
  try {
    await setSite(patch); site = await getSite();
    flashMsg = "✔ " + ok; render();
    setTimeout(() => { flashMsg = ""; const e = $("#ok"); if (e) e.textContent = ""; }, 2500);
  } catch (e) { notice(e.message, "儲存失敗"); }
}

function render() {
  const tabs = [["status", "網站狀態"], ["announce", "公告"], ["lessons", "課程"], ["problems", "題目"]];
  box.innerHTML = `<div class="tabs">${tabs.map(([k, n]) => `<button class="${tab === k ? "on" : ""}" data-t="${k}">${n}</button>`).join("")}<small id="ok">${flashMsg}</small></div><div id="pane"></div>`;
  box.querySelectorAll(".tabs button").forEach(b => b.onclick = () => { tab = b.dataset.t; flashMsg = ""; render(); });
  ({status: pStatus, announce: pAnnounce, lessons: pLessons, problems: pProblems})[tab]();
}

// ---- 網站狀態：手動 / 計時 / 定時關閉 ----
function statusLine() {
  const s = site, now = Date.now();
  if (s.open === false) return ["off", "🔴 已手動關閉（直到你按「開放網站」）"];
  if (s.closeFrom != null && now >= s.closeFrom && (s.closeUntil == null || now < s.closeUntil))
    return ["off", `🟠 排程關閉中${s.closeUntil != null ? `，預計 ${fmtTime(s.closeUntil)} 自動恢復` : "（沒有設定結束時間，需要手動開放）"}`];
  if (s.closeFrom != null && now < s.closeFrom)
    return ["on", `🟢 開放中，已排程 ${fmtTime(s.closeFrom)} 關閉${s.closeUntil != null ? `、${fmtTime(s.closeUntil)} 恢復` : ""}`];
  return ["on", "🟢 開放中"];
}
function pStatus() {
  const [cls, text] = statusLine();
  $("#pane").innerHTML = `<div class="state ${cls}">${text}</div>
    <label>關閉時顯示給使用者的訊息</label>
    <input id="msg" value="${esc(site.message || "")}" placeholder="例如：系統維護中，請稍後再回來">
    <div class="row"><button class="p" id="on">開放網站</button><button class="danger" id="off">立即關閉（直到手動開放）</button></div>
    <div class="sec"><h4>⏱ 計時關閉</h4><small>從現在開始關閉一段時間，時間到自動恢復。</small>
      <div class="row"><input type="number" id="mins" value="30" min="1" max="10080"> 分鐘
        ${[15, 30, 60, 180].map(m => `<button class="q" data-m="${m}">${m < 60 ? m + " 分" : m / 60 + " 小時"}</button>`).join("")}
        <button class="danger" id="timed">開始關閉</button></div></div>
    <div class="sec"><h4>🕒 定時關閉</h4><small>預先排定關閉的時段。結束時間可以留空（關到你手動開放為止）。</small>
      <div class="row">開始 <input type="datetime-local" id="start"> 結束 <input type="datetime-local" id="end"></div>
      <div class="row"><button class="p" id="sched">設定排程</button><button id="unsched">取消排程</button></div></div>`;
  const msg = () => $("#msg").value.trim();
  $("#on").onclick = () => save({open: true, closeFrom: null, closeUntil: null, message: msg()}, "已開放網站");
  $("#off").onclick = () => save({open: false, closeFrom: null, closeUntil: null, message: msg()}, "已關閉網站");
  document.querySelectorAll(".q").forEach(b => b.onclick = () => { $("#mins").value = b.dataset.m; });
  $("#timed").onclick = () => {
    const m = Math.round(+$("#mins").value);
    if (!(m >= 1 && m <= 10080)) return notice("請輸入 1～10080 分鐘（最多 7 天）。", "時間不正確");
    const now = Date.now();
    save({open: true, closeFrom: now, closeUntil: now + m * 60000, message: msg()}, `已關閉 ${m} 分鐘`);
  };
  $("#sched").onclick = () => {
    const a = $("#start").value, b = $("#end").value;
    if (!a) return notice("請選擇開始時間。", "時間不正確");
    const from = new Date(a).getTime(), until = b ? new Date(b).getTime() : null;
    if (until != null && until <= from) return notice("結束時間必須晚於開始時間。", "時間不正確");
    save({open: true, closeFrom: from, closeUntil: until, message: msg()}, "排程已設定");
  };
  $("#unsched").onclick = () => save({closeFrom: null, closeUntil: null}, "已取消排程");
}

// ---- 公告 ----
function pAnnounce() {
  const a = site.announce || {};
  $("#pane").innerHTML = `<p><small>公告會顯示在所有前台頁面的最上方，使用者可以自己關掉；你重新儲存後，已關掉的人會再看到一次。</small></p>
    <div class="item"><span>顯示公告</span><label class="sw"><input type="checkbox" id="an-on" ${a.on ? "checked" : ""}><i></i></label></div>
    <label>公告內容</label>
    <textarea class="plain" id="an-text" rows="4" placeholder="例如：a005 暫時關閉維修中，造成不便敬請見諒">${esc(a.text || "")}</textarea>
    <label>類型</label>
    <select id="an-lv"><option value="info">一般（藍）</option><option value="warn">注意（黃）</option><option value="danger">緊急（紅）</option></select>
    <label>預覽</label><div class="announce info" id="prev"></div>
    <div class="row"><button class="p" id="an-save">儲存公告</button></div>`;
  $("#an-lv").value = ["info", "warn", "danger"].includes(a.level) ? a.level : "info";
  const prev = () => { $("#prev").className = "announce " + $("#an-lv").value; $("#prev").innerHTML = `<span>📢 ${esc($("#an-text").value || "（公告內容）")}</span>`; };
  $("#an-text").oninput = prev; $("#an-lv").onchange = prev; prev();
  $("#an-save").onclick = () => save({announce: {on: $("#an-on").checked, text: $("#an-text").value.trim(), level: $("#an-lv").value, id: Date.now()}}, "公告已儲存");
}

// ---- 課程 / 題目開放設定（打開 = 開放；關閉 = 使用者看到「維修中」，管理員仍可使用）----
function pList({hint, items, field}) {
  const closed = new Set(site[field] || []);
  $("#pane").innerHTML = `<p><small>${hint}</small></p>
    <input id="q" placeholder="搜尋…" style="margin-bottom:6px">
    <div id="items">${items.map(it => `<div class="item" data-s="${esc((it.id + " " + it.label).toLowerCase())}"><span>${esc(it.label)}${it.lv ? ` <span class="lv lv${it.lv}">${LV[it.lv]}</span>` : ""}</span><label class="sw"><input type="checkbox" data-id="${it.id}" ${closed.has(it.id) ? "" : "checked"}><i></i></label></div>`).join("")}</div>
    <div class="row"><button class="p" id="sv">儲存</button><button id="all">全部開放</button><small id="cnt"></small></div>`;
  const cbs = () => [...document.querySelectorAll("#items input")];
  const cnt = () => { $("#cnt").textContent = `目前關閉 ${cbs().filter(c => !c.checked).length} / ${items.length}`; };
  cbs().forEach(c => c.onchange = cnt); cnt();
  $("#all").onclick = () => { cbs().forEach(c => c.checked = true); cnt(); };
  $("#q").oninput = e => { const k = e.target.value.trim().toLowerCase(); document.querySelectorAll("#items .item").forEach(r => r.hidden = !!(k && !r.dataset.s.includes(k))); };
  $("#sv").onclick = () => save({[field]: cbs().filter(c => !c.checked).map(c => c.dataset.id)}, "已儲存");
}
const pLessons = () => pList({hint: "關閉的單元，使用者會看到「暫時關閉（維修中）」。", field: "closedLessons",
  items: LESSONS.map((l, i) => ({id: l.id, label: `單元 ${i + 1}　${l.title}`}))});
const pProblems = () => pList({hint: "關閉的題目，使用者無法開啟與提交，會看到「暫時關閉（維修中）」；有人回報 bug 時可以先關起來。", field: "closedProblems",
  items: PROBLEMS.map(p => ({id: p.id, label: `${p.id}　${p.title}`, lv: p.level}))});
