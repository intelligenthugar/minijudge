// 題目敘述的顯示與子任務計分（純函式，沒有用到 DOM，方便測試）。
// 一般題：desc / inFmt / outFmt。長題：story（敘述）/ inFmt / outFmt / hint / subtasks / samples。
const esc = s => String(s).replace(/[&<>]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;"}[c]));
const inline = s => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");

// 簡易排版：空行分段；整段都是「- 」開頭是條列、都是「1. 」開頭是編號清單；`程式碼`、**粗體**
export function fmtText(s) {
  return s.split(/\n{2,}/).map(block => {
    const ls = block.split("\n"), bullet = /^(- |\d+\. )/;
    if (ls.every(l => bullet.test(l))) {
      const tag = /^\d+\. /.test(ls[0]) ? "ol" : "ul";
      return `<${tag}>${ls.map(l => `<li>${inline(l.replace(bullet, ""))}</li>`).join("")}</${tag}>`;
    }
    return `<p>${ls.map(inline).join("<br>")}</p>`;
  }).join("");
}

export function statement(p) {
  const S = p.samples || [p.sample], n = S.length;
  const ex = S.map((s, i) => `<b>範例輸入${n > 1 ? " " + (i + 1) : ""}</b><pre>${esc(s[0])}</pre><b>範例輸出${n > 1 ? " " + (i + 1) : ""}</b><pre>${esc(s[1])}</pre>`).join("");
  if (!p.story) {
    return `<p>${esc(p.desc)}</p><b>輸入說明</b><div class="box">${esc(p.inFmt)}</div><b>輸出說明</b><div class="box">${esc(p.outFmt)}</div>${ex}`;
  }
  const table = p.subtasks ? `<table class="stbl"><tr><th>子任務</th><th>分數</th><th>額外限制</th></tr>${p.subtasks.map((s, i) => `<tr><td>${i + 1}</td><td>${s.score}</td><td>${esc(s.text)}</td></tr>`).join("")}</table>` : "";
  return `<div class="stmt"><h3>敘述</h3>${fmtText(p.story)}<h3>輸入描述</h3>${fmtText(p.inFmt)}${table}<h3>輸出描述</h3>${fmtText(p.outFmt)}${p.hint ? `<h3>提示</h3>${fmtText(p.hint)}` : ""}<h3>範例</h3>${ex}</div>`;
}

// 有子任務的題目：同一個子任務裡的測資全部 AC 才拿到該子任務的分數。verd[i] 是第 i 筆測資的判定
export function scoring(p, verd) {
  if (!p.subtasks) return null;
  let score = 0, total = 0;
  const rows = p.subtasks.map((st, i) => {
    total += st.score;
    const ok = st.tests.every(t => verd[t] === "AC");
    if (ok) score += st.score;
    return `<div>子任務 ${i + 1}（${st.score} 分，${esc(st.text)}）：<span class="${ok ? "v-AC" : "v-WA"}">${ok ? "通過" : "未通過"}</span></div>`;
  });
  return {score, total, html: `<div class="subres">${rows.join("")}</div>`};
}
