import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {getFirestore,doc,getDoc,setDoc,collection,getDocs,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {firebaseConfig} from "./config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app), db = getFirestore(app);

export const login = () => signInWithPopup(auth, new GoogleAuthProvider());
export const logout = () => signOut(auth);
export const onUser = cb => onAuthStateChanged(auth, cb);

export async function loadSubs(uid) {
  const o = {};
  try { (await getDocs(collection(db, "users", uid, "subs"))).forEach(d => o[d.id] = d.data()); }
  catch (e) { console.warn(e); }
  return o;
}
export const saveSub = (uid, pid, rec) =>
  setDoc(doc(db, "users", uid, "subs", pid), {...rec, at: serverTimestamp()}, {merge: true});

// 網站開關：config/site = {open: true|false, message: "..."}；讀不到就當作開放
export async function getSite() {
  try { const d = await getDoc(doc(db, "config", "site")); return d.exists() ? d.data() : {open: true}; }
  catch (e) { return {open: true}; }
}
export const setSite = d => setDoc(doc(db, "config", "site"), {...d, updatedAt: serverTimestamp()}, {merge: true});

// 管理員：admins/{uid} 文件存在即為管理員（只能在 Firebase Console 手動建立）
export async function isAdmin(uid) {
  try { return (await getDoc(doc(db, "admins", uid))).exists(); }
  catch (e) { return false; }
}
