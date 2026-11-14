// 輕量語法上色（Python / JavaScript），不依賴外部套件。回傳已跳脫的 HTML。
const KW = {
  py: new Set("and as assert break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield True False None".split(" ")),
  js: new Set("const let var function return if else for while do break continue new class extends import export from of in typeof instanceof true false null undefined this switch case default try catch finally throw async await".split(" "))
};
const BI = {
  py: new Set("print input range len int str float list map sum min max sorted abs set dict tuple enumerate zip reversed bin chr ord".split(" ")),
  js: new Set("console Math Number String Array Object readline print BigInt parseInt Set Map JSON".split(" "))
};
const RE = {
  py: /(#.*)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(\b\d+(?:\.\d+)?(?:e\d+)?\b)|([A-Za-z_]\w*)/g,
  js: /(\/\/.*|\/\*[\s\S]*?\*\/)|(`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(\b\d+(?:\.\d+)?(?:e\d+)?\b)|([A-Za-z_$][\w$]*)/g
};
const esc = s => s.replace(/[&<>]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;"}[c]));

export function highlight(code, lang = "py") {
  const re = new RegExp(RE[lang].source, "g");
  let out = "", last = 0, m;
  while ((m = re.exec(code))) {
    out += esc(code.slice(last, m.index));
    last = re.lastIndex;
    const t = m[0]; let c = null;
    if (m[1]) c = "cm"; else if (m[2]) c = "str"; else if (m[3]) c = "num";
    else if (KW[lang].has(t)) c = "kw"; else if (BI[lang].has(t)) c = "bi";
    else if (code[last] === "(") c = "fn";
    out += c ? `<span class="tk-${c}">${esc(t)}</span>` : esc(t);
  }
  return out + esc(code.slice(last));
}
