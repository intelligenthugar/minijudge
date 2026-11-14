import {PROBLEMS} from "../data/problems.js";
import {onUser, login, logout, loadSubs, saveSub, getSite, isAdmin} from "./firebase.js";
import {judge} from "./judge.js";

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;"}[c]));
const LV = ["", "簡單", "中等", "困難"];
const TEMPLATE = {
  py: "# 用 input() 讀取輸入，print() 輸出答案\n",
  js: "// 用 readline() 讀一行，print() 輸出答案\n"
};
let user = null, subs = {}, cur = PROBLEMS[0], note = "";

$("#auth").onclick = async () => {
  try { user ? await logout() : await login(); }
  catch (e) { alert("登入失敗：" + e.message); }
};
onUser(async u => {
  user = u; subs = u ? await loadSubs(u.uid) : {};
  const adm = u ? await isAdmin(u.uid) : false, site = await getSite();
  $("#adminLink").hidden = !adm;
  $("#who").textContent = u ? (u.displayName || u.email) : "未登入（紀錄不會儲存）";
  $("#auth").textContent = u ? "登出" : "Google 登入";
  if (site.open === false && !adm) {
    $("#stat").innerHTML = ""; $("#list").innerHTML = "";
    $("#view").innerHTML = `<div class="closed"><div style="font-size:56px">🔧</div><h2>網站暫時關閉</h2>
      <p>${esc(site.message || "請稍後再回來。")}</p><small>管理員請先登入。</small></div>`;
    return;
  }
  note = site.open === false ? '<div class="banner">網站目前對一般使用者關閉（你是管理員，仍可使用）</div>' : "";
  renderList(); show(cur.id);
});

function renderList() {
  const done = PROBLEMS.filter(p => subs[p.id] && subs[p.id].solved).length;
  $("#stat").innerHTML = `已通過 <b>${done}</b> / ${PROBLEMS.length}<div class="bar"><i style="width:${done / PROBLEMS.length * 100}%"></i></div>`;
  $("#list").innerHTML = PROBLEMS.map(p => {
    const s = subs[p.id];
    const m = s ? (s.solved ? '<span class="ac">✔</span>' : '<span class="wa">✘</span>') : "";
    return `<a data-id="${p.id}" class="${p.id === cur.id ? "on" : ""}"><span>${p.id} ${esc(p.title)}</span><span><span class="lv lv${p.level}">${LV[p.level]}</span> ${m}</span></a>`;
  }).join("");
  document.querySelectorAll("#list a").forEach(a => a.onclick = () => show(a.dataset.id));
}

function show(id) {
  cur = PROBLEMS.find(p => p.id === id); renderList();
  const s = subs[id];
  $("#view").innerHTML = `${note}
    <h2>${cur.id}：${esc(cur.title)} <span class="lv lv${cur.level}">${LV[cur.level]}</span></h2>
    <small>時間限制 ${cur.limit / 1000} 秒　｜　共 ${cur.tests.length} 筆測資${s ? `　｜　你的紀錄：${s.solved ? "已通過" : "尚未通過"}，嘗試 ${s.tries || 1} 次` : ""}</small>
    <p>${esc(cur.desc)}</p>
    <b>輸入說明</b><div class="box">${esc(cur.inFmt)}</div>
    <b>輸出說明</b><div class="box">${esc(cur.outFmt)}</div>
    <b>範例輸入</b><pre>${esc(cur.sample[0])}</pre>
    <b>範例輸出</b><pre>${esc(cur.sample[1])}</pre>
    <div class="row"><select id="lang"><option value="py">Python 3</option><option value="js">JavaScript</option></select>
      <button class="p" id="go">提交</button><small id="hint"></small></div>
    <textarea id="code" spellcheck="false"></textarea>
    <div class="res" id="res"></div>`;
  const ta = $("#code"), lg = $("#lang");
  if (s && s.lang) lg.value = s.lang;
  ta.value = (s && s.lang === lg.value && s.code) || TEMPLATE[lg.value];
  lg.onchange = () => { ta.value = TEMPLATE[lg.value]; };
  ta.onkeydown = e => { if (e.key === "Tab") { e.preventDefault(); document.execCommand("insertText", false, "    "); } };
  $("#go").onclick = submit;
}

async function submit() {
  const lang = $("#lang").value, code = $("#code").value, res = $("#res"), btn = $("#go");
  btn.disabled = true; res.innerHTML = "";
  $("#hint").textContent = lang === "py" ? "首次執行 Python 需載入環境，請稍候…" : "";
  const r = await judge(lang, code, cur.tests, cur.limit, (i, v, err) => {
    const d = document.createElement("div");
    d.innerHTML = `測資 ${i + 1}：<span class="v-${v}">${v}</span>` +
      (err ? ` <small>${esc(err.split("\n").slice(-2).join(" "))}</small>` : "");
    res.appendChild(d);
  });
  $("#hint").textContent = ""; btn.disabled = false;
  res.insertAdjacentHTML("afterbegin",
    `<h3 class="${r.solved ? "ac" : "wa"}">${r.solved ? "🎉 Accepted" : r.first}（${r.passed}/${r.total}）</h3>`);
  if (!user) { res.insertAdjacentHTML("beforeend", "<small>登入後才能儲存紀錄。</small>"); return; }
  const prev = subs[cur.id] || {};
  const rec = {lang, code, passed: r.passed, total: r.total, solved: r.solved || !!prev.solved,
               lastStatus: r.solved ? "AC" : r.first, tries: (prev.tries || 0) + 1};
  try {
    await saveSub(user.uid, cur.id, rec);
    subs[cur.id] = rec; renderList();
    res.insertAdjacentHTML("beforeend", "<small>已儲存紀錄。</small>");
  } catch (e) { res.insertAdjacentHTML("beforeend", `<small class="wa">儲存失敗：${esc(e.message)}</small>`); }
}

renderList(); show(cur.id);
