// 網站狀態 / 公告的共用判斷。資料來自 Firestore 的 config/site（見 README）。
const esc = s => String(s).replace(/[&<>]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;"}[c]));

export const fmtTime = ms => new Date(ms).toLocaleString("zh-TW", {month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false});

// 手動關閉，或現在落在「定時 / 計時關閉」的時間區間內
export function isClosed(site, now = Date.now()) {
  if (site.open === false) return true;
  return site.closeFrom != null && now >= site.closeFrom && (site.closeUntil == null || now < site.closeUntil);
}
export const lessonClosed = (site, id) => (site.closedLessons || []).includes(id);
export const problemClosed = (site, id) => (site.closedProblems || []).includes(id);

// 維護畫面要顯示的文字（有設定結束時間會附上預計恢復時間）
export function closedMsg(site, now = Date.now()) {
  let t = site.message || "請稍後再回來。";
  if (site.open !== false && site.closeUntil != null && now < site.closeUntil) t += `（預計 ${fmtTime(site.closeUntil)} 恢復）`;
  return t;
}

// 在頂欄下方顯示公告；使用者按 ✕ 後，同一則公告不再顯示（管理員重新儲存公告就會再出現）
export function showAnnounce(site) {
  let el = document.getElementById("announce");
  const a = site.announce, text = a && a.on && a.text && a.text.trim();
  const key = a ? String(a.id || a.text) : "";
  let dismissed = false;
  try { dismissed = localStorage.getItem("mj-ann") === key; } catch (e) {}
  if (!text || dismissed) { if (el) el.remove(); return; }
  if (!el) { el = document.createElement("div"); el.id = "announce"; document.querySelector("header").after(el); }
  el.className = "announce " + (["info", "warn", "danger"].includes(a.level) ? a.level : "info");
  el.innerHTML = `<span>📢 ${esc(text)}</span><button title="關閉公告">✕</button>`;
  el.querySelector("button").onclick = () => { try { localStorage.setItem("mj-ann", key); } catch (e) {} el.remove(); };
}

// 這題用哪些語言通過：新紀錄有 solvedBy / byLang；舊紀錄只有 solved 與最後一次的 lang，就用 lang 判斷
export function solvedBy(s) {
  if (!s) return {};
  const o = {...(s.solvedBy || (s.solved && s.lang ? {[s.lang]: true} : {}))};
  for (const k of Object.keys(s.byLang || {})) if (s.byLang[k] && s.byLang[k].solved) o[k] = true;
  return o;
}

// 提交後要存進 Firestore 的紀錄。每種語言各自記住「最後一次提交的程式碼」與「最後一次通過的程式碼（acCode）」，
// 所以換語言不會蓋掉另一種語言的程式碼，之後失敗也不會弄丟通過的版本。注意：Firestore 不接受 undefined。
export function buildRecord(prev, lang, code, r) {
  prev = prev || {};
  const pb = (prev.byLang || {})[lang] || {};
  const by = {...solvedBy(prev), ...(r.solved ? {[lang]: true} : {})};
  return {
    lang, code, passed: r.passed, total: r.total,
    solved: !!(r.solved || prev.solved),
    solvedBy: by,
    byLang: {...(prev.byLang || {}), [lang]: {code, passed: r.passed, total: r.total, solved: !!(r.solved || pb.solved || by[lang]), acCode: r.solved ? code : (pb.acCode || null)}},
    lastStatus: r.solved ? "AC" : (r.first || "WA"),
    tries: (prev.tries || 0) + 1
  };
}
