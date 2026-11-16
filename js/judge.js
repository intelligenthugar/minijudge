let W = null;
export const norm = s => s.replace(/\r/g, "").split("\n").map(l => l.trimEnd()).join("\n").trim();

export function runCase(lang, code, input, limit) {
  return new Promise(res => {
    W = W || new Worker(new URL("./worker.js", import.meta.url));
    const w = W; let t;
    w.onmessage = e => {
      if (e.data.started) { t = setTimeout(() => { w.terminate(); W = null; res({v: "TLE"}); }, limit); return; }
      clearTimeout(t);
      res(e.data.ok ? {v: "OK", out: e.data.out} : {v: "RE", err: e.data.err});
    };
    w.onerror = e => { clearTimeout(t); w.terminate(); W = null; res({v: "RE", err: e.message}); };
    w.postMessage({lang, code, input});
  });
}

// onCase(i, verdict, errText) 每跑完一筆測資呼叫一次
export async function judge(lang, code, tests, limit, onCase) {
  let passed = 0, first = null;
  for (let i = 0; i < tests.length; i++) {
    const [inp, exp] = tests[i];
    const r = await runCase(lang, code, inp, limit);
    let v = r.v;
    if (v === "OK") v = norm(r.out) === norm(exp) ? "AC" : "WA";
    if (v === "AC") passed++; else if (!first) first = v;
    onCase(i, v, r.err, {input: inp, expected: exp, got: r.out});
  }
  return {passed, total: tests.length, first, solved: passed === tests.length};
}
