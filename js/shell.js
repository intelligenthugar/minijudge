// 首頁與教學頁共用：登入 / 登出、名稱方框、管理後台按鈕、網站關閉判斷
import {onUser, login, logout, getSite, isAdmin, loadSubs} from "./firebase.js";
import {setWho, authError} from "./ui.js";
import {isClosed, showAnnounce} from "./site.js";

export function boot(cb, {subs = false} = {}) {
  const auth = document.getElementById("auth");
  let user = null;
  auth.onclick = async () => { try { user ? await logout() : await login(); } catch (e) { authError(e); } };
  onUser(async u => {
    user = u;
    const adm = u ? await isAdmin(u.uid) : false, site = await getSite();
    const al = document.getElementById("adminLink");
    if (al) al.hidden = !adm;
    setWho(u, adm);
    auth.textContent = u ? "登出" : "Google 登入";
    showAnnounce(site);
    cb({user: u, admin: adm, site, closed: isClosed(site) && !adm, subs: u && subs ? await loadSubs(u.uid) : {}});
  });
}
