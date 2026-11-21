import {FUNC_CATS, FUNCS} from "../data/functions.js";
import {FUNC_CATS_CPP, FUNCS_CPP} from "../data/functions_cpp.js";
import {LESSONS} from "../data/lessons.js";
import {LESSONS_CPP} from "../data/lessons_cpp.js";
import {highlight} from "./highlight.js";
import {boot} from "./shell.js";
import {closedMsg} from "./site.js";

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));

// Python 還是 C++：網址 ?lang=cpp 優先，其次是上次的選擇
let lang = new URLSearchParams(location.search).get("lang");
try {
  if (lang === "py" || lang === "cpp") localStorage.setItem("mj-flang", lang);
  else lang = localStorage.getItem("mj-flang") === "cpp" ? "cpp" : "py";
} catch (e) { if (lang !== "cpp") lang = "py"; }

const cpp = lang === "cpp";
const CATS = cpp ? FUNC_CATS_CPP : FUNC_CATS, ALL = cpp ? FUNCS_CPP : FUNCS, UNITS = cpp ? LESSONS_CPP : LESSONS;
const unitNo = Object.fromEntries(UNITS.map((l, i) => [l.id, i + 1]));

$("#fseg").innerHTML = `<a href="?lang=py" class="${cpp ? "" : "on"}">Python</a><a href="?lang=cpp" class="${cpp ? "on" : ""}">C++</a>`;
$("#cnote").hidden = !cpp;

function row(f) {
  const s = `${f.fn} ${f.use} ${f.code}`.toLowerCase();
  return `<tr data-s="${esc(s)}"><td class="fn"><code>${esc(f.fn)}</code></td><td>${esc(f.use)}</td>
    <td><pre class="code">${highlight(f.code, cpp ? "cpp" : "py")}</pre>${f.inp ? `<small>輸入：</small><pre class="inp">${esc(f.inp)}</pre>` : ""}</td>
    <td><pre class="out">${esc(f.out)}</pre></td><td><a href="learn.html#${f.unit}">單元 ${unitNo[f.unit]}</a></td></tr>`;
}
$("#chips").innerHTML = CATS.map(c => `<a class="pchip" href="#fn-${c.id}">${esc(c.title)}</a>`).join("");
$("#tables").innerHTML = CATS.map(c => `<div class="fcard" id="fn-${c.id}"><h2>${esc(c.title)}</h2><p class="b">${esc(c.blurb)}</p>
  <div class="tw"><table class="ft"><thead><tr><th>函式／寫法</th><th>用途</th><th>範例</th><th>執行結果</th><th>教學</th></tr></thead>
  <tbody>${ALL.filter(f => f.cat === c.id).map(row).join("")}</tbody></table></div></div>`).join("");

function filter() {
  const k = $("#q").value.trim().toLowerCase();
  let shown = 0;
  document.querySelectorAll(".fcard").forEach(sec => {
    let n = 0;
    sec.querySelectorAll("tbody tr").forEach(r => { const ok = !k || r.dataset.s.includes(k); r.hidden = !ok; if (ok) n++; });
    sec.hidden = n === 0; shown += n;
  });
  $("#none").hidden = shown > 0;
  $("#count").textContent = k ? `符合 ${shown} / ${ALL.length} 個。` : `共 ${ALL.length} 個。`;
}
$("#q").oninput = filter;
filter();

boot(({closed, site}) => {
  $("#fwrap").hidden = closed;
  const c = $("#closed"); c.hidden = !closed;
  c.querySelector("p").textContent = closedMsg(site);
});
