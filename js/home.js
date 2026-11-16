import {boot} from "./shell.js";
import {closedMsg} from "./site.js";
import {startBg} from "./bg.js";
import {LESSONS_CPP} from "../data/lessons_cpp.js";
import {LESSONS} from "../data/lessons.js";
import {PROBLEMS} from "../data/problems.js";
import {FUNCS} from "../data/functions.js";

document.getElementById("n-lessons").textContent = `${LESSONS.length} 個 Python 單元、${LESSONS_CPP.length} 個 C++ 單元`;
document.getElementById("n-funcs").textContent = `${FUNCS.length} 個函式與語法`;
document.getElementById("n-problems").textContent = `${PROBLEMS.length} 題`;
// 先用上次記住的背景立刻開始，讀到後台設定後再換成最新的
let savedBg = "tree";
try { savedBg = localStorage.getItem("mj-bg") || "tree"; } catch (e) {}
startBg(savedBg);

boot(({closed, site}) => {
  const bg = site.bg || "tree";
  startBg(bg);
  try { localStorage.setItem("mj-bg", bg); } catch (e) {}
  document.getElementById("cards").hidden = closed;
  const c = document.getElementById("closed");
  c.hidden = !closed;
  c.querySelector("p").textContent = closedMsg(site);
});
