// 輕量語法上色（Python / C++），不依賴外部套件。回傳已跳脫的 HTML。
const KW = {
  py: new Set("and as assert break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield True False None".split(" ")),
  cpp: new Set("int long double float char bool void auto const static if else for while do break continue return struct class using namespace true false new delete switch case default typedef unsigned signed short size_t nullptr".split(" "))
};
const BI = {
  py: new Set("print input range len int str float list map sum min max sorted abs set dict tuple enumerate zip reversed bin chr ord".split(" ")),
  cpp: new Set("cin cout endl cerr string vector pair map set stack queue deque swap sqrt pow gcd __gcd to_string stoi printf scanf make_pair max min abs sort reverse max_element min_element rotate fixed setprecision toupper tolower".split(" "))
};
const RE = {
  py: /(#.*)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(\b\d+(?:\.\d+)?(?:e\d+)?\b)|([A-Za-z_]\w*)/g,
  cpp: /(\/\/.*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|(?<=#include\s*)<[^>\n]+>)|(\b\d+(?:\.\d+)?(?:e\d+)?(?:LL|ll|[fFuU])?\b)|(#\s*\w+|[A-Za-z_]\w*)/g
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
    else if (KW[lang].has(t) || t[0] === "#") c = "kw"; else if (BI[lang].has(t)) c = "bi";
    else if (code[last] === "(") c = "fn";
    out += c ? `<span class="tk-${c}">${esc(t)}</span>` : esc(t);
  }
  return out + esc(code.slice(last));
}
