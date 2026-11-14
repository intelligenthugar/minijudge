import {LESSONS} from "../data/lessons.js";
import {PROBLEMS} from "../data/problems.js";
import {highlight} from "./highlight.js";
import {runCase} from "./judge.js";
import {boot} from "./shell.js";
import {closedMsg, lessonClosed, problemClosed} from "./site.js";

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;"}[c]));
const fmt = s => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
const LV = ["", "簡單", "中等", "困難"];
const byId = Object.fromEntries(PROBLEMS.map(p => [p.id, p]));
let state = {closed: false, admin: false, subs: {}, user: null, site: {}}, CODES = [];

const solved = id => !!(state.subs[id] && state.subs[id].solved);
const unitDone = l => { const m = l.practice.must.filter(id => !problemClosed(state.site, id)); return m.length > 0 && m.every(solved); };

boot(s => { state = s; render(); }, {subs: true});
window.onhashchange = render;

function chip(id) {
  const p = byId[id];
  return `<a class="pchip" href="judge.html#${id}"><span class="pid">${id}</span>${esc(p.title)}<span class="lv lv${p.level}">${LV[p.level]}</span>${problemClosed(state.site, id) ? "🔒" : solved(id) ? '<span class="ac">✔</span>' : ""}</a>`;
}
function codeBlock(c) {
  const k = CODES.push(c) - 1;
  return `<div class="cb"><pre class="code">${highlight(c.c, "py")}</pre>` +
    (c.inp != null ? `<small>輸入：</small><pre class="inp">${esc(c.inp)}</pre>` : "") +
    `<button class="run" data-k="${k}">▶ 執行</button><pre class="out" hidden></pre></div>`;
}
function sec(s) {
  return `<h3>${fmt(s.h)}</h3>` + (s.p || []).map(t => `<p>${fmt(t)}</p>`).join("") +
    (s.ul ? `<ul>${s.ul.map(t => `<li>${fmt(t)}</li>`).join("")}</ul>` : "") +
    (s.code || []).map(codeBlock).join("") +
    (s.tip ? `<div class="note tip">💡 ${fmt(s.tip)}</div>` : "") +
    (s.warn ? `<div class="note warn">⚠️ ${fmt(s.warn)}</div>` : "");
}
function practice(l) {
  const {must, more, tip} = l.practice;
  return `<div class="practice"><h3>📝 教完囉！建議接著做這些題目</h3>
    ${tip ? `<p>${fmt(tip)}</p>` : ""}
    <h4>必做</h4>${must.map(chip).join("")}
    ${more.length ? `<h4>挑戰（寫完必做再來）</h4>${more.map(chip).join("")}` : ""}
    <p><small>點題目會開啟測驗頁。卡住時，題目頁右上角有「參考答案」。</small></p></div>`;
}
function renderNav(cur) {
  const done = LESSONS.filter(unitDone).length;
  $("#stat").innerHTML = state.user
    ? `已完成 <b>${done}</b> / ${LESSONS.length} 單元<div class="bar"><i style="width:${done / LESSONS.length * 100}%"></i></div><small>必做題全部通過才算完成</small>`
    : "<small>登入後可記錄學習進度</small>";
  $("#list").innerHTML = LESSONS.map((l, i) =>
    `<a class="${i === cur ? "on" : ""}${lessonClosed(state.site, l.id) ? " off" : ""}" href="#${l.id}"><span><span class="un">${i + 1}</span>　${esc(l.title)}</span>${lessonClosed(state.site, l.id) ? "🔒" : unitDone(l) ? '<span class="ac">✔</span>' : ""}</a>`).join("");
}
function render() {
  if (state.closed) {
    $("#stat").innerHTML = ""; $("#list").innerHTML = "";
    $("#view").innerHTML = `<div class="closed"><div style="font-size:56px">🔧</div><h2>網站暫時關閉</h2><p>${esc(closedMsg(state.site))}</p></div>`;
    return;
  }
  CODES = [];
  const i = Math.max(0, LESSONS.findIndex(l => l.id === location.hash.slice(1))), l = LESSONS[i];
  renderNav(i);
  const shut = lessonClosed(state.site, l.id);
  if (shut && !state.admin) {
    $("#view").innerHTML = `<div class="closed"><div style="font-size:56px">🛠️</div><h2>單元 ${i + 1}：${esc(l.title)}</h2><p>這個單元目前暫時關閉（維修中），請先看其他單元。</p></div>`;
    return;
  }
  $("#view").innerHTML = `<div class="lesson">${shut ? '<div class="banner">這個單元對一般使用者關閉中（你是管理員，仍可閱讀）</div>' : ""}<small>單元 ${i + 1} / ${LESSONS.length}</small>
    <h2>${esc(l.title)}</h2><p>${fmt(l.sub)}</p>
    <div class="note tip"><b>本單元學會</b><ul>${l.goal.map(g => `<li>${fmt(g)}</li>`).join("")}</ul></div>
    ${l.sections.map(sec).join("")}
    ${practice(l)}
    <div class="pager">${i > 0 ? `<a class="btn go" href="#${LESSONS[i - 1].id}">← 上一單元</a>` : "<span></span>"}${i < LESSONS.length - 1 ? `<a class="btn go" href="#${LESSONS[i + 1].id}">下一單元 →</a>` : "<span></span>"}</div></div>`;
  document.querySelectorAll(".run").forEach(b => b.onclick = () => run(b));
  window.scrollTo(0, 0);
}
async function run(b) {
  const c = CODES[b.dataset.k], out = b.nextElementSibling;
  b.disabled = true; out.hidden = false;
  out.textContent = "執行中…（第一次需載入 Python，約需幾秒）";
  const r = await runCase("py", c.c, c.inp || "", 8000);
  out.textContent = r.v === "OK" ? (r.out || "（沒有輸出）") : r.v === "TLE" ? "⏱ 執行超時" : "❌ " + String(r.err).split("\n").slice(-2).join("\n");
  b.disabled = false;
}
