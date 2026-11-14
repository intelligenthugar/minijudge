import {boot} from "./shell.js";
import {LESSONS} from "../data/lessons.js";
import {PROBLEMS} from "../data/problems.js";

document.getElementById("n-lessons").textContent = `${LESSONS.length} 個單元`;
document.getElementById("n-problems").textContent = `${PROBLEMS.length} 題`;
boot(({closed, site}) => {
  document.getElementById("cards").hidden = closed;
  const c = document.getElementById("closed");
  c.hidden = !closed;
  c.querySelector("p").textContent = site.message || "請稍後再回來。";
});
