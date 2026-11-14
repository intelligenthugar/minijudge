// 頂欄的使用者名稱方框（頭像 + 名稱 + 管理員標籤）
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));

export function setWho(u, admin) {
  const el = document.getElementById("who");
  if (!u) {
    el.title = "未登入（紀錄不會儲存）";
    el.innerHTML = '<span class="av">👤</span><span class="nm">訪客</span>';
    return;
  }
  const name = u.displayName || u.email || "使用者";
  el.title = u.email || name;
  const av = u.photoURL
    ? `<img class="av" src="${esc(u.photoURL)}" alt="" referrerpolicy="no-referrer">`
    : `<span class="av">${esc([...name][0].toUpperCase())}</span>`;
  el.innerHTML = `${av}<span class="nm">${esc(name)}</span>${admin ? '<em class="tag">管理員</em>' : ""}`;
}

// 置中的提示視窗（取代 alert）
export function notice(msg, title = "提示") {
  let d = document.getElementById("notice");
  if (!d) {
    d = document.createElement("dialog"); d.id = "notice"; document.body.appendChild(d);
    d.onclick = e => { if (e.target === d) d.close(); };
  }
  d.innerHTML = `<div class="dc nt"><h3>${esc(title)}</h3><p>${esc(msg)}</p><div class="row"><button class="p" id="nt-ok">確定</button></div></div>`;
  d.querySelector("#nt-ok").onclick = () => d.close();
  if (!d.open) d.showModal();
}

// 登入失敗提示；使用者自己關掉登入視窗不算錯誤
export function authError(e) {
  if (e && (e.code === "auth/popup-closed-by-user" || e.code === "auth/cancelled-popup-request")) return;
  notice((e && e.message) || String(e), "無法登入");
}
