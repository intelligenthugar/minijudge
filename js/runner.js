// 用 Cloudflare Worker（再轉給 OnlineCompiler.io）編譯並執行 C++，以及逐筆測資評測。
import {norm} from "./judge.js";

const CE_RE = /\.cpp:\d+:\d+: (fatal )?error:|undefined reference to|ld returned/;

// 跑一筆測資，回傳 {v: "OK"|"TLE"|"RE"|"CE"|"ERR", out, err}
export async function runRemote(url, code, input, limit) {
  let res, data = null;
  try {
    res = await fetch(url, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({code, stdin: input + "\n", timeout: limit})});
  } catch (e) { return {v: "ERR", err: "連不上評測服務（請檢查網路，或管理員設定的網址）"}; }
  try { data = await res.json(); } catch (e) {}
  if (!res.ok || !data || !data.run) return {v: "ERR", err: (data && data.message) || `評測服務回傳錯誤（HTTP ${res.status}）`};
  const run = data.run, out = run.stdout || "", err = run.stderr || "";
  if (run.status === "TO") return {v: "TLE"};
  if (run.status === "XX") return {v: "ERR", err: run.message || "評測服務內部錯誤"};
  if (run.code !== 0 || run.signal) {
    if (CE_RE.test(err)) return {v: "CE", err};
    return {v: "RE", out, err: err || (run.signal ? `程式被訊號 ${run.signal} 中止` : `結束碼 ${run.code}`)};
  }
  if (run.status === "OL") return {v: "RE", out, err: "輸出太多"};
  return {v: "OK", out};
}

// 和 judge() 一樣的回傳格式。第一筆就編譯失敗 / 服務出錯時，後面不用再跑；其餘 4 筆 4 筆一起送出以加快速度。
export async function judgeCpp(url, code, tests, limit, onCase) {
  const total = tests.length, results = new Array(total);
  let passed = 0, first = null;
  const report = i => {
    const [inp, exp] = tests[i], r = results[i];
    const v = r.v === "OK" ? (norm(r.out) === norm(exp) ? "AC" : "WA") : r.v;
    if (v === "AC") passed++; else if (!first) first = v;
    onCase(i, v, r.err, {input: inp, expected: exp, got: r.out, err: r.err});
    return v;
  };
  results[0] = await runRemote(url, code, tests[0][0], limit);
  const v0 = report(0);
  if (v0 === "CE" || v0 === "ERR") return {passed, total, first, solved: false};
  for (let s = 1; s < total; s += 4) {
    const idx = [];
    for (let i = s; i < Math.min(s + 4, total); i++) idx.push(i);
    await Promise.all(idx.map(async i => { results[i] = await runRemote(url, code, tests[i][0], limit); }));
    for (const i of idx) if (report(i) === "ERR") return {passed, total, first, solved: false};
  }
  return {passed, total, first, solved: passed === total};
}
