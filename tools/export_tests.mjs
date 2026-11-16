// 把全部題目的測資輸出成「一個」JSON 檔：tools/testdata.json（本機 C++ 評測用，自動產生，不需要上傳）。
// 用法：node tools/export_tests.mjs
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
import {PROBLEMS} from "../data/problems.js";

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), "testdata.json");
const data = Object.fromEntries(PROBLEMS.map(p => [p.id, {title: p.title, limit: p.limit, tests: p.tests}]));
fs.writeFileSync(out, JSON.stringify(data));
console.log(`已輸出 ${PROBLEMS.length} 題、${PROBLEMS.reduce((n, p) => n + p.tests.length, 0)} 筆測資 → tools/testdata.json`);
