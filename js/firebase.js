import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {getFirestore,doc,setDoc,collection,getDocs,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
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
