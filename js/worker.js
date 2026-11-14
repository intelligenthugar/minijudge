// 在獨立執行緒中跑使用者程式；超時由主執行緒 terminate()
let py;
onmessage = async e => {
  const {lang, code, input} = e.data, lines = input.split("\n"), out = [];
  try {
    if (lang === "js") {
      postMessage({started: 1});
      new Function("readline", "print", "console", code)(
        () => lines.length ? lines.shift() : "", s => out.push(String(s)),
        {log: (...a) => out.push(a.join(" "))});
    } else {
      if (!py) { importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js"); py = await loadPyodide(); }
      postMessage({started: 1});
      py.setStdin({stdin: () => lines.length ? lines.shift() : undefined});
      py.setStdout({batched: s => out.push(s)});
      await py.runPythonAsync(code);
    }
    postMessage({ok: true, out: out.join("\n")});
  } catch (err) { postMessage({ok: false, err: String(err)}); }
};
