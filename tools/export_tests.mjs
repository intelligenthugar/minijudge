// 把題庫的測資輸出成一般評測系統通用的檔案格式：testdata/<題號>/<編號>.in、.out，以及 meta.json。
// 用法：node tools/export_tests.mjs
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
import {PROBLEMS} from "../data/problems.js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "testdata");
let files = 0;
for (const p of PROBLEMS) {
  const dir = path.join(root, p.id);
  fs.rmSync(dir, {recursive: true, force: true});
  fs.mkdirSync(dir, {recursive: true});
  p.tests.forEach(([i, o], k) => {
    fs.writeFileSync(path.join(dir, `${k + 1}.in`), i + "\n");
    fs.writeFileSync(path.join(dir, `${k + 1}.out`), o + "\n");
    files += 2;
  });
  fs.writeFileSync(path.join(dir, "meta.json"), JSON.stringify({id: p.id, title: p.title, limit: p.limit, tests: p.tests.length}, null, 1));
}
console.log(`已輸出 ${PROBLEMS.length} 題、${files} 個測資檔 → testdata/`);
