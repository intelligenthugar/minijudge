import {PROBLEMS} from "../data/problems.js";
import {onUser, login, logout, loadSubs, saveSub, getSite, isAdmin} from "./firebase.js";
import {judge} from "./judge.js";
import {judgeCpp} from "./runner.js";
import {statement, scoring} from "./statement.js";
import {SOLUTIONS} from "../data/solutions.js";
import {SOLUTIONS_CPP} from "../data/solutions_cpp.js";
import {highlight} from "./highlight.js";
import {setWho, authError} from "./ui.js";
import {isClosed, closedMsg, problemClosed, showAnnounce, solvedBy, passedLangs, buildRecord} from "./site.js";

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;"}[c]));
const LV = ["", "簡單", "中等", "困難"];
const TEMPLATE = {
  py: "# 用 input() 讀取輸入，print() 輸出答案\n",
  cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    \n}\n"
};
// 清單上的 ✔ 旁邊標出是用哪種語言通過的
const LANG_NAME = {py: "Python", cpp: "C++"};
const badges = s => {
  const l = passedLangs(s);
  if (l.length === 2) return '<i class="lg lg-both" title="Python 與 C++ 都通過">都通過</i>';   // 兩種語言都通過就寫「都通過」
  return l.map(k => `<i class="lg lg-${k}" title="用 ${LANG_NAME[k]} 通過">${k === "py" ? "Py" : "C++"}</i>`).join("");
};
const langText = s => passedLangs(s).length ? `（${passedLangs(s).map(k => LANG_NAME[k]).join("、")}）` : "";

// 題目分類：基礎 / 公式 / APCS 風格（記住上次選的）
const GROUPS = [["all", "全部"], ["basic", "基礎"], ["formula", "公式"], ["apcs", "APCS"], ["long", "長題"]];
const GROUP_NAME = {basic: "基礎", formula: "公式題", apcs: "APCS 風格", long: "競賽風格"};
let group = "all";
try { group = localStorage.getItem("mj-group") || "all"; } catch (e) {}
const filterBar = () => '<div class="seg">' + GROUPS.map(([g, n]) => `<a data-g="${g}" class="${g === group ? "on" : ""}">${n}</a>`).join("") + "</div>";

let refreshBar = () => {};
const drafts = {};   // 這次開著網頁期間，每題每種語言正在編輯的內容（切換語言、換題目再回來都還在）
let user = null, subs = {}, cur = PROBLEMS.find(p => p.id === location.hash.slice(1)) || PROBLEMS[0], note = "", site = {}, isAdm = false;

$("#auth").onclick = async () => {
  try { user ? await logout() : await login(); }
  catch (e) { authError(e); }
};
onUser(async u => {
  user = u; subs = u ? await loadSubs(u.uid) : {};
  const adm = u ? await isAdmin(u.uid) : false;
  site = await getSite(); isAdm = adm;
  showAnnounce(site);
  $("#adminLink").hidden = !adm;
  setWho(u, adm);
  $("#auth").textContent = u ? "登出" : "Google 登入";
  if (isClosed(site) && !adm) {
    $("#stat").innerHTML = ""; $("#list").innerHTML = "";
    $("#view").innerHTML = `<div class="closed"><div style="font-size:56px">🔧</div><h2>網站暫時關閉</h2>
      <p>${esc(closedMsg(site))}</p><small>管理員請先登入。</small></div>`;
    return;
  }
  note = isClosed(site) ? '<div class="banner">網站目前對一般使用者關閉（你是管理員，仍可使用）</div>' : "";
  renderList(); show(cur.id);
});

function renderList() {
  const done = PROBLEMS.filter(p => subs[p.id] && subs[p.id].solved).length;
  $("#stat").innerHTML = `已通過 <b>${done}</b> / ${PROBLEMS.length}<div class="bar"><i style="width:${done / PROBLEMS.length * 100}%"></i></div>`;
  $("#list").innerHTML = filterBar() + PROBLEMS.filter(p => group === "all" || p.group === group).map(p => {
    const s = subs[p.id];
    const m = s ? (s.solved ? '<span class="ac">✔</span>' + badges(s) : (p.subtasks && s.bestScore > 0 ? `<span class="wa">${s.bestScore}分</span>` : '<span class="wa">✘</span>')) : "";
    return `<a data-id="${p.id}" class="${p.id === cur.id ? "on" : ""}${problemClosed(site, p.id) ? " off" : ""}"><span>${p.id} ${esc(p.title)}</span><span><span class="lv lv${p.level}">${LV[p.level]}</span> ${problemClosed(site, p.id) ? "🔒" : m}</span></a>`;
  }).join("");
  document.querySelectorAll("#list a[data-id]").forEach(a => a.onclick = () => show(a.dataset.id));
  document.querySelectorAll("#list .seg a").forEach(a => a.onclick = () => {
    group = a.dataset.g;
    try { localStorage.setItem("mj-group", group); } catch (e) {}
    renderList();
  });
}

function show(id) {
  cur = PROBLEMS.find(p => p.id === id); history.replaceState(null, "", "#" + id); renderList();
  const s = subs[id];
  const shut = problemClosed(site, id);
  if (shut && !isAdm) {
    $("#view").innerHTML = `${note}<div class="closed"><div style="font-size:56px">🛠️</div><h2>${cur.id}：${esc(cur.title)}</h2><p>這一題目前暫時關閉（維修中），請先做其他題目。</p></div>`;
    return;
  }
  const warn = shut ? '<div class="banner">這一題對一般使用者關閉中（你是管理員，仍可使用）</div>' : "";
  $("#view").innerHTML = `${note}${warn}
    <div class="ttl"><h2>${cur.id}：${esc(cur.title)} <span class="lv lv${cur.level}">${LV[cur.level]}</span>${cur.group !== "basic" ? ` <span class="grp">${GROUP_NAME[cur.group]}</span>` : ""}</h2><button class="ans" id="ans">💡 參考答案</button></div>
    <small>時間限制 ${cur.limit / 1000} 秒　｜　共 ${cur.inputs.length} 筆測資${cur.subtasks ? "　｜　滿分 " + cur.subtasks.reduce((n, t) => n + t.score, 0) + " 分" : ""}${s ? `　｜　你的紀錄：${s.solved ? "已通過" + langText(s) : "尚未通過"}，嘗試 ${s.tries || 1} 次` : ""}</small>
    ${statement(cur)}
    <div class="row"><select id="lang"><option value="py">Python 3</option>${site.runnerUrl ? '<option value="cpp">C++ (g++)</option>' : ""}</select>
      <button class="p" id="go">提交</button><small id="hint"></small></div>
    <div class="acbar" id="acbar" hidden></div>
    <div class="editor"><pre id="hl" aria-hidden="true"></pre><textarea id="code" spellcheck="false" wrap="off"></textarea></div>
    <div class="res" id="res"></div>`;
  const ta = $("#code"), lg = $("#lang"), hl = $("#hl");
  const paint = () => { hl.innerHTML = highlight(ta.value, lg.value) + "\n"; };
  if (s && s.lang && [...lg.options].some(o => o.value === s.lang)) lg.value = s.lang;   // 舊紀錄的語言如果已經不提供，就用預設的
  // 每種語言各自記住最後一次提交的程式碼；舊紀錄只有最後一次的 code / lang
  const codeFor = l => { const p = subs[id] || {}, b = (p.byLang || {})[l]; return (b && b.code) || (p.lang === l && p.code) || TEMPLATE[l]; };
  let curLang = lg.value;
  const key = () => id + ":" + curLang;
  const setCode = v => { ta.value = v; drafts[key()] = v; paint(); bar(); };
  const bar = () => {
    const p = subs[id] || {}, b = (p.byLang || {})[lg.value], el = $("#acbar");
    if (!solvedBy(p)[lg.value]) { el.hidden = true; return; }
    const ac = (b && b.acCode) || (p.lang === lg.value && p.lastStatus === "AC" ? p.code : null);
    el.hidden = false;
    el.innerHTML = `✔ 你已經用 ${LANG_NAME[lg.value]} 通過這題。` + (ac && ac !== ta.value ? ` <button id="loadac">載入我通過的程式碼</button>` : "");
    if (ac && ac !== ta.value) $("#loadac").onclick = () => setCode(ac);
  };
  refreshBar = bar;
  const start = () => drafts[key()] != null ? drafts[key()] : codeFor(curLang);
  ta.value = start();
  lg.onchange = () => { drafts[key()] = ta.value; curLang = lg.value; ta.value = start(); paint(); bar(); };
  ta.oninput = () => { drafts[key()] = ta.value; paint(); bar(); };
  ta.onscroll = () => { hl.scrollTop = ta.scrollTop; hl.scrollLeft = ta.scrollLeft; };
  ta.onkeydown = e => { if (e.key === "Tab") { e.preventDefault(); document.execCommand("insertText", false, "    "); } };
  paint(); bar();
  $("#go").onclick = submit;
  $("#ans").onclick = askAnswer;
}

// 失敗的測資：顯示輸入、期望輸出、你的輸出（太長會截斷）
const cut = (s, n = 400) => { s = String(s == null ? "" : s); return s.length > n ? s.slice(0, n) + `…（共 ${s.length} 字元，只顯示前 ${n} 個）` : s; };
const lines = s => String(s == null ? "" : s).replace(/\r/g, "").split("\n").map(l => l.trimEnd());
function firstDiff(exp, got) {
  const a = lines(exp), b = lines(got), n = Math.max(a.length, b.length);
  for (let k = 0; k < n; k++) if ((a[k] || "") !== (b[k] || "")) return k + 1;
  return 0;
}
function detail(v, info) {
  if (v === "AC" || v === "ERR" || !info) return "";
  if (v === "CE") return `<details open><summary>編譯錯誤訊息</summary><pre>${esc(cut(info.err || "", 1500))}</pre></details>`;
  const k = v === "WA" ? firstDiff(info.expected, info.got) : 0;
  const head = v === "WA" ? (k ? `從第 ${k} 行開始不同` : "輸出內容不同") : "這筆測資";
  return `<details><summary>${head}：看輸入與輸出</summary><b>輸入</b><pre>${esc(cut(info.input))}</pre>` +
    `<b>期望輸出</b><pre>${esc(cut(info.expected))}</pre>` +
    (v === "WA" ? `<b>你的輸出</b><pre>${esc(cut(info.got))}</pre>` : "") + `</details>`;
}

async function submit() {
  const lang = $("#lang").value, code = $("#code").value, res = $("#res"), btn = $("#go");
  btn.disabled = true; res.innerHTML = "";
  $("#hint").textContent = lang === "py" ? "首次執行 Python 需載入環境，請稍候…" : lang === "cpp" ? "C++ 會送到評測服務編譯並執行，大約需要幾秒…" : "";
  const run = lang === "cpp" ? (c, t, l, f) => judgeCpp(site.runnerUrl, c, t, l, f) : (c, t, l, f) => judge(lang, c, t, l, f);
  const verd = [];
  const r = await run(code, cur.tests, cur.limit, (i, v, err, info) => {
    verd[i] = v;
    const d = document.createElement("div");
    d.innerHTML = `測資 ${i + 1}：<span class="v-${v}">${v}</span>` +
      (err && v !== "CE" ? ` <small>${esc(err.split("\n").slice(-2).join(" "))}</small>` : "") + detail(v, info);
    res.appendChild(d);
  });
  $("#hint").textContent = ""; btn.disabled = false;
  const sc = scoring(cur, verd);                 // 有子任務的題目才會有分數
  if (sc) r.score = sc.score;
  res.insertAdjacentHTML("afterbegin",
    `<h3 class="${r.solved ? "ac" : "wa"}">${r.solved ? "🎉 Accepted" : r.first}（${r.passed}/${r.total}）${sc ? ` ｜ 得分 ${sc.score} / ${sc.total}` : ""}</h3>${sc ? sc.html : ""}`);
  if (!user) { res.insertAdjacentHTML("beforeend", "<small>登入後才能儲存紀錄。</small>"); return; }
  const prev = subs[cur.id] || {};
  const rec = buildRecord(prev, lang, code, r);
  try {
    await saveSub(user.uid, cur.id, rec);
    subs[cur.id] = rec; renderList(); refreshBar();
    res.insertAdjacentHTML("beforeend", "<small>已儲存紀錄。</small>");
  } catch (e) { res.insertAdjacentHTML("beforeend", `<small class="wa">儲存失敗：${esc(e.message)}</small>`); }
}

renderList(); show(cur.id);

// ---- 參考答案：先跳出確認視窗，同意後才顯示解析與程式碼 ----
const dlg = $("#dlg");
dlg.onclick = e => { if (e.target === dlg) dlg.close(); };

function askAnswer() {
  dlg.innerHTML = `<div class="dc"><h3>🤔 要直接看參考答案嗎？</h3>
    <p>先自己多試幾次，學得會更紮實。看完答案後，建議關掉再自己重新寫一次。</p>
    <div class="row" style="justify-content:flex-end"><button id="no">再想想</button><button class="p" id="yes">我要看答案</button></div></div>`;
  dlg.showModal();
  $("#no").onclick = () => dlg.close();
  $("#yes").onclick = showAnswer;
}

function showAnswer() {
  const a = SOLUTIONS[cur.id], c = SOLUTIONS_CPP[cur.id];
  if (!a) {
    dlg.innerHTML = `<div class="dc"><h3>這題還沒有參考答案</h3><div class="row"><button class="p" id="x2">關閉</button></div></div>`;
    $("#x2").onclick = () => dlg.close();
    return;
  }
  let lang = "py";
  dlg.innerHTML = `<div class="dc"><div class="ttl"><h3>${cur.id} ${esc(cur.title)}・參考答案</h3><button id="x">✕</button></div>
    <h4>解析</h4><p>${esc(a.exp)}</p>
    <div class="ttl"><h4>參考程式碼</h4><div class="seg2"><button id="t-py" class="on">Python</button>${c ? '<button id="t-cpp">C++</button>' : ""}</div></div>
    <pre class="code" id="cv"></pre><p id="cn"></p>
    <div class="row" style="justify-content:flex-end"><button id="cp">複製程式碼</button><button class="p" id="x2">關閉</button></div></div>`;
  const paint = () => {
    $("#cv").innerHTML = highlight(lang === "py" ? a.py : c.code, lang);
    $("#cn").innerHTML = lang === "cpp" && c.note ? `<small>💡 ${esc(c.note)}</small>` : "";
    dlg.querySelectorAll(".seg2 button").forEach(b => b.classList.toggle("on", b.id === "t-" + lang));
    $("#cp").textContent = "複製程式碼";
  };
  dlg.querySelectorAll("#x,#x2").forEach(b => b.onclick = () => dlg.close());
  $("#t-py").onclick = () => { lang = "py"; paint(); };
  if (c) $("#t-cpp").onclick = () => { lang = "cpp"; paint(); };
  $("#cp").onclick = () => navigator.clipboard.writeText(lang === "py" ? a.py : c.code).then(() => { $("#cp").textContent = "已複製 ✔"; });
  paint();
}
