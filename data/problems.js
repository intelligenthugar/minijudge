// 每題只需提供「輸入清單」與「參考解 ref」，標準答案會自動算出。
// 隨機測資用固定種子，所以每次載入都一樣。
function rng(seed) {
  return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
const R = rng(20260);
const ri = (a, b) => a + Math.floor(R() * (b - a + 1));
const arr = (n, lo, hi) => Array.from({length: n}, () => ri(lo, hi));
const str = (n, abc = "abcdefghijklmnopqrstuvwxyz") => Array.from({length: n}, () => abc[ri(0, abc.length - 1)]).join("");
const list = a => `${a.length}\n${a.join(" ")}`;

const RAW = [
{id: "a001", title: "A+B", limit: 2000,
 desc: "輸入兩個整數 a、b，輸出 a+b。",
 inFmt: "一行，兩個整數 a b（|a|,|b| ≤ 10^9），以空白分隔", outFmt: "一個整數，a+b 的值",
 ref: s => { const [a, b] = s.split(" ").map(Number); return String(a + b); },
 inputs: ["1 2", "-5 5", "0 0", "1000000000 1000000000", "-1000000000 -1000000000", "123456789 987654321",
   ...Array.from({length: 3}, () => `${ri(-1e9, 1e9)} ${ri(-1e9, 1e9)}`)]},

{id: "a002", title: "最大值", limit: 2000,
 desc: "第一行輸入 n，第二行輸入 n 個整數，輸出其中的最大值。",
 inFmt: "第一行 n（1 ≤ n ≤ 1000），第二行 n 個整數（|x| ≤ 10^9）", outFmt: "最大值",
 ref: s => String(Math.max(...s.split("\n")[1].split(" ").map(Number))),
 inputs: ["5\n3 9 2 7 1", "1\n-4", "3\n-1 -2 -3", "4\n5 5 5 5", list(arr(10, -100, 100)),
   list(arr(1000, -1e9, 1e9)), list(arr(1000, -5, 5)), list([...arr(999, 0, 100), 1e9])]},

{id: "a003", title: "回文判斷", limit: 2000,
 desc: "輸入一個只含小寫英文字母的字串，若它是回文輸出 Yes，否則輸出 No。",
 inFmt: "一行字串（長度 ≤ 1000）", outFmt: "Yes 或 No",
 ref: s => s === [...s].reverse().join("") ? "Yes" : "No",
 inputs: (() => { const h = str(500); return ["level", "abc", "a", "abccba", "abca", "ab", "aa",
   h + [...h].reverse().join(""), h + "x" + [...h].reverse().join("").slice(0, 499) + "y", str(1000)]; })()},

{id: "a004", title: "質數判斷", limit: 2000,
 desc: "輸入一個正整數 n，若 n 是質數輸出 Yes，否則輸出 No。",
 inFmt: "一個整數 n（1 ≤ n ≤ 10^9）", outFmt: "Yes 或 No",
 ref: s => { const n = +s; if (n < 2) return "No"; for (let i = 2; i * i <= n; i++) if (n % i === 0) return "No"; return "Yes"; },
 inputs: ["1", "2", "3", "4", "97", "561", "7919", "999983", "1000000", "999999937", "1000000000"]},

{id: "a005", title: "費氏數列", limit: 2000,
 desc: "費氏數列定義為 F(0)=0、F(1)=1、F(n)=F(n-1)+F(n-2)。輸入 n，輸出 F(n)。",
 inFmt: "一個整數 n（0 ≤ n ≤ 50）", outFmt: "F(n)",
 ref: s => { let a = 0, b = 1; for (let i = 0; i < +s; i++) [a, b] = [b, a + b]; return String(a); },
 inputs: ["0", "1", "2", "3", "10", "20", "30", "40", "49", "50"]},

{id: "a006", title: "排序", limit: 2000,
 desc: "輸入 n 個整數，由小到大排序後輸出，數字之間以一個空白分隔。",
 inFmt: "第一行 n（1 ≤ n ≤ 1000），第二行 n 個整數（|x| ≤ 10^9）", outFmt: "排序後的結果，一行",
 ref: s => s.split("\n")[1].split(" ").map(Number).sort((a, b) => a - b).join(" "),
 inputs: ["5\n3 9 2 7 1", "1\n0", "2\n2 1", "4\n5 5 5 5", "6\n-3 -1 -2 0 2 1", list(arr(20, -50, 50)),
   list(arr(1000, -1e9, 1e9)), list(arr(1000, 0, 10)), list(Array.from({length: 1000}, (_, i) => 1000 - i))]},

{id: "a007", title: "母音計數", limit: 2000,
 desc: "輸入一個只含小寫英文字母的字串，輸出其中母音（a、e、i、o、u）出現的總次數。",
 inFmt: "一行字串（長度 ≤ 1000）", outFmt: "一個整數",
 ref: s => String([...s].filter(c => "aeiou".includes(c)).length),
 inputs: ["hello", "xyz", "aeiou", "programming", "a", "bcdfg", "a".repeat(1000), str(1000), str(777)]},

{id: "a008", title: "最大公因數", limit: 2000,
 desc: "輸入兩個正整數 a、b，輸出它們的最大公因數。",
 inFmt: "一行，兩個正整數 a b（1 ≤ a,b ≤ 10^9）", outFmt: "一個整數",
 ref: s => { let [a, b] = s.split(" ").map(Number); while (b) [a, b] = [b, a % b]; return String(a); },
 inputs: ["12 18", "17 5", "1 1", "7 7", "1000000000 500000000", "999999937 1000000000", "123456 7890",
   ...Array.from({length: 3}, () => `${ri(1, 1e9)} ${ri(1, 1e9)}`)]},

{id: "a009", title: "階乘", limit: 2000,
 desc: "輸入 n，輸出 n!（n 的階乘）。0! = 1。",
 inFmt: "一個整數 n（0 ≤ n ≤ 18）", outFmt: "n! 的值",
 ref: s => { let r = 1; for (let i = 2; i <= +s; i++) r *= i; return String(r); },
 inputs: ["0", "1", "2", "5", "10", "12", "15", "17", "18"]},

{id: "a010", title: "偶數總和", limit: 2000,
 desc: "輸入 n 個整數，輸出其中所有偶數的總和（沒有偶數則輸出 0）。",
 inFmt: "第一行 n（1 ≤ n ≤ 1000），第二行 n 個整數（|x| ≤ 10^9）", outFmt: "一個整數",
 ref: s => String(s.split("\n")[1].split(" ").map(Number).filter(x => x % 2 === 0).reduce((a, b) => a + b, 0)),
 inputs: ["5\n1 2 3 4 5", "3\n1 3 5", "1\n-8", "1\n0", list(arr(50, -20, 20)), list(arr(1000, -1e9, 1e9)), list(arr(1000, 0, 10))]},

{id: "a011", title: "反轉字串", limit: 2000,
 desc: "輸入一個字串（只含小寫英文字母與數字），輸出把它前後反轉的結果。",
 inFmt: "一行字串（長度 ≤ 1000）", outFmt: "反轉後的字串",
 ref: s => [...s].reverse().join(""),
 inputs: ["hello", "a", "abc123", "racecar", "0123456789", str(50, "abcxyz0123456789"), str(1000, "abcdefghijklmnopqrstuvwxyz0123456789")]},

{id: "a012", title: "乘法表", limit: 2000,
 desc: "輸入 n，輸出 n 的乘法表（乘以 1 到 9），每行格式為「n x i = 結果」。",
 inFmt: "一個整數 n（1 ≤ n ≤ 9）", outFmt: "9 行，例如 3 x 2 = 6",
 ref: s => Array.from({length: 9}, (_, i) => `${s} x ${i + 1} = ${s * (i + 1)}`).join("\n"),
 inputs: ["1", "2", "3", "5", "7", "8", "9"]},

{id: "a013", title: "數字總和", limit: 2000,
 desc: "輸入一個非負整數（最多 100 位，請當成字串處理），輸出它各位數字的總和。",
 inFmt: "一行，一個非負整數（最多 100 位）", outFmt: "一個整數",
 ref: s => String([...s].reduce((a, c) => a + +c, 0)),
 inputs: ["0", "9", "123456789", "1000000000", "99999999999999999999", "9".repeat(100), "7" + str(99, "0123456789"), "1" + "0".repeat(99)]},

{id: "a014", title: "閏年判斷", limit: 2000,
 desc: "輸入西元年份，若是閏年輸出 Yes，否則輸出 No。（4 的倍數且非 100 的倍數，或 400 的倍數）",
 inFmt: "一個整數 y（1 ≤ y ≤ 9999）", outFmt: "Yes 或 No",
 ref: s => { const y = +s; return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? "Yes" : "No"; },
 inputs: ["2000", "1900", "2024", "2023", "1", "4", "100", "400", "2100", "9999"]},

{id: "a015", title: "十進位轉二進位", limit: 2000,
 desc: "輸入十進位整數 n，輸出它的二進位表示（不含多餘的前導 0）。",
 inFmt: "一個整數 n（0 ≤ n ≤ 10^9）", outFmt: "二進位字串",
 ref: s => (+s).toString(2),
 inputs: ["0", "1", "2", "10", "255", "1024", "65535", "123456789", "999999999", "1000000000"]},

{id: "a016", title: "凱薩密碼", limit: 2000,
 desc: "第一行輸入一個小寫英文字串，第二行輸入位移量 k。把每個字母往後移 k 位（z 之後接回 a），輸出結果。",
 inFmt: "第一行字串（長度 ≤ 1000），第二行整數 k（0 ≤ k ≤ 25）", outFmt: "加密後的字串",
 ref: s => { const [t, k] = s.split("\n"); return [...t].map(c => String.fromCharCode((c.charCodeAt(0) - 97 + +k) % 26 + 97)).join(""); },
 inputs: ["abc\n3", "xyz\n3", "hello\n0", "zzzz\n25", "a\n25", "attackatdawn\n13", `${str(100)}\n${ri(0, 25)}`, `${str(1000)}\n${ri(0, 25)}`]},

{id: "a017", title: "質因數分解", limit: 3000,
 desc: "輸入整數 n，由小到大輸出它的所有質因數（重複的要重複輸出），以空白分隔。",
 inFmt: "一個整數 n（2 ≤ n ≤ 10^9）", outFmt: "一行，例如 12 → 2 2 3",
 ref: s => { let n = +s; const o = []; for (let p = 2; p * p <= n; p++) while (n % p === 0) { o.push(p); n /= p; } if (n > 1) o.push(n); return o.join(" "); },
 inputs: ["2", "12", "97", "100", "360", "720720", "524288", "987654321", "999999999", "999999937"]},

{id: "a018", title: "最長連續遞增", limit: 2000,
 desc: "輸入 n 個整數，求「連續且嚴格遞增」的最長一段的長度。",
 inFmt: "第一行 n（1 ≤ n ≤ 1000），第二行 n 個整數", outFmt: "一個整數",
 ref: s => { const a = s.split("\n")[1].split(" ").map(Number); let b = 1, c = 1; for (let i = 1; i < a.length; i++) { c = a[i] > a[i - 1] ? c + 1 : 1; b = Math.max(b, c); } return String(b); },
 inputs: ["5\n1 2 3 2 3", "1\n5", "4\n4 3 2 1", "4\n1 1 1 1", "6\n1 2 3 4 5 6", list(arr(1000, -100, 100)), list(Array.from({length: 1000}, (_, i) => i)), list(arr(1000, 0, 3))]},

{id: "a019", title: "括號配對", limit: 2000,
 desc: "輸入一個只含 ( ) [ ] { } 的字串，判斷括號是否正確配對。正確輸出 Yes，否則輸出 No。",
 inFmt: "一行字串（長度 ≤ 1000，不會是空字串）", outFmt: "Yes 或 No",
 ref: s => { const st = [], m = {")": "(", "]": "[", "}": "{"}; for (const c of s) { if (m[c]) { if (st.pop() !== m[c]) return "No"; } else st.push(c); } return st.length ? "No" : "Yes"; },
 inputs: ["()", "([]{})", "(]", "((", "))", ")(", "{[()]}", "([)]", "(((())))", "[", bal(1000), bal(1000).slice(1), bal(998) + "(("]},

{id: "a020", title: "兩數之和", limit: 3000,
 desc: "輸入 n 個整數與目標值 t，計算有幾組 (i, j)（i < j）滿足 a[i] + a[j] = t。",
 inFmt: "第一行 n t（1 ≤ n ≤ 1000，|t| ≤ 2×10^9），第二行 n 個整數（|x| ≤ 10^9）", outFmt: "一個整數",
 ref: s => { const [l1, l2] = s.split("\n"), t = +l1.split(" ")[1], a = l2.split(" ").map(Number); let r = 0; for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) if (a[i] + a[j] === t) r++; return String(r); },
 inputs: ["4 5\n1 2 3 4", "3 10\n1 2 3", "5 4\n2 2 2 2 2", "2 0\n5 -5", pl(arr(100, -20, 20), 0), pl(arr(1000, -50, 50), 0), pl(arr(1000, 0, 1), 1), pl(arr(1000, -1e9, 1e9), 1)]},

{id: "a021", title: "質數個數", limit: 4000,
 desc: "輸入 n，輸出 1 到 n 之間（含 n）有幾個質數。",
 inFmt: "一個整數 n（1 ≤ n ≤ 100000）", outFmt: "一個整數",
 ref: s => { const n = +s, c = Array(n + 1).fill(true); let r = 0; for (let i = 2; i <= n; i++) if (c[i]) { r++; for (let j = i * i; j <= n; j += i) c[j] = false; } return String(r); },
 inputs: ["1", "2", "3", "10", "100", "1000", "9973", "99991", "100000"]},

{id: "a022", title: "第二大的數", limit: 2000,
 desc: "輸入 n 個整數，輸出第二大的數。相同的數只算一個（保證至少有兩種不同的數）。",
 inFmt: "第一行 n（2 ≤ n ≤ 1000），第二行 n 個整數（|x| ≤ 10^9）", outFmt: "一個整數",
 ref: s => { const a = [...new Set(s.split("\n")[1].split(" ").map(Number))].sort((x, y) => y - x); return String(a[1]); },
 inputs: ["5\n3 9 2 7 1", "2\n1 2", "4\n5 5 3 3", "3\n-1 -2 -3", "3\n9 9 8", "6\n1 2 3 4 5 5", list(arr(1000, -1e9, 1e9)), list(arr(1000, 0, 5))]},

{id: "a023", title: "連續字元壓縮", limit: 2000,
 desc: "輸入一個小寫英文字串，把連續相同的字元壓縮成「字元＋次數」。例如 aaabcc → a3b1c2。",
 inFmt: "一行字串（長度 ≤ 1000）", outFmt: "壓縮後的字串",
 ref: s => { let o = "", i = 0; while (i < s.length) { let j = i; while (j < s.length && s[j] === s[i]) j++; o += s[i] + (j - i); i = j; } return o; },
 inputs: ["aaabcc", "a", "abc", "zzzzzz", "aabbaa", "a".repeat(1000), str(1000, "ab"), str(500, "abc")]},

{id: "a024", title: "最小公倍數", limit: 2000,
 desc: "輸入兩個正整數 a、b，輸出它們的最小公倍數。",
 inFmt: "一行，兩個正整數 a b（1 ≤ a,b ≤ 10^6）", outFmt: "一個整數",
 ref: s => { const [a, b] = s.split(" ").map(Number); let x = a, y = b; while (y) [x, y] = [y, x % y]; return String(a / x * b); },
 inputs: ["4 6", "7 3", "1 1", "12 12", "1000000 999999", "999983 999979", "123456 7890", "500000 250000", "1 1000000"]},

{id: "a025", title: "陣列右旋", limit: 2000,
 desc: "輸入 n 個整數與 k，把陣列整體向右旋轉 k 次（每次把最後一個移到最前面），輸出結果，以空白分隔。",
 inFmt: "第一行 n k（1 ≤ n ≤ 1000，0 ≤ k ≤ 10^9），第二行 n 個整數", outFmt: "旋轉後的陣列",
 ref: s => { const [l1, l2] = s.split("\n"), [n, k] = l1.split(" ").map(Number), a = l2.split(" "), r = k % n; return r ? [...a.slice(n - r), ...a.slice(0, n - r)].join(" ") : a.join(" "); },
 inputs: ["5 2\n1 2 3 4 5", "3 0\n1 2 3", "1 5\n7", "4 4\n1 2 3 4", "4 6\n1 2 3 4", rot(1000, 1), rot(1000, 999999999), rot(500, 12345)]},

{id: "a026", title: "找位置", limit: 2000,
 desc: "輸入 n 個整數與目標 t，輸出 t 第一次出現的位置（從 1 開始算）；沒有出現則輸出 -1。",
 inFmt: "第一行 n t（1 ≤ n ≤ 1000），第二行 n 個整數（|x|,|t| ≤ 10^9）", outFmt: "一個整數",
 ref: s => { const [l1, l2] = s.split("\n"), t = +l1.split(" ")[1], a = l2.split(" ").map(Number); return String(a.indexOf(t) + 1 || -1); },
 inputs: ["5 3\n1 2 3 4 3", "3 9\n1 2 3", "1 5\n5", "4 -1\n-1 -1 -1 -1", pl(arr(1000, -50, 50), 7), pl(arr(1000, -50, 50), 100), pl([...arr(999, 0, 9), 77], 77), pl(arr(1000, -1e9, 1e9), 0)]},

{id: "a027", title: "最大連續子陣列和", limit: 2000,
 desc: "輸入 n 個整數，求「連續」的一段（至少一個數）總和最大是多少。",
 inFmt: "第一行 n（1 ≤ n ≤ 1000），第二行 n 個整數（|x| ≤ 10^9）", outFmt: "一個整數",
 ref: s => { const a = s.split("\n")[1].split(" ").map(Number); let b = a[0], c = a[0]; for (let i = 1; i < a.length; i++) { c = Math.max(a[i], c + a[i]); b = Math.max(b, c); } return String(b); },
 inputs: ["5\n-2 1 -3 4 -1", "1\n-5", "3\n-3 -2 -1", "4\n1 2 3 4", "9\n-2 1 -3 4 -1 2 1 -5 4", list(arr(1000, -100, 100)), list(arr(1000, -1e9, 1e9)), list(arr(1000, -10, 3))]},

{id: "a028", title: "不同單字數", limit: 2000,
 desc: "輸入一行由小寫單字組成的句子（單字以一個空白分隔），輸出共有幾種不同的單字。",
 inFmt: "一行，單字之間以一個空白分隔（總長度 ≤ 5000）", outFmt: "一個整數",
 ref: s => String(new Set(s.split(" ")).size),
 inputs: ["a b a c b", "hello", "a a a a", "the quick brown fox jumps over the lazy dog", "to be or not to be", words(200), words(800)]},

{id: "a029", title: "巴斯卡三角形", limit: 2000,
 desc: "輸入 n，輸出巴斯卡三角形的前 n 列，每列的數字以空白分隔。",
 inFmt: "一個整數 n（1 ≤ n ≤ 15）", outFmt: "n 行。例如 n = 4 時：1 / 1 1 / 1 2 1 / 1 3 3 1（每列一行）",
 ref: s => { let r = [1]; const o = []; for (let i = 0; i < +s; i++) { o.push(r.join(" ")); r = [1, ...r.slice(1).map((x, j) => x + r[j]), 1]; } return o.join("\n"); },
 inputs: ["1", "2", "3", "4", "5", "8", "10", "12", "15"]},

{id: "a030", title: "FizzBuzz", limit: 2000,
 desc: "輸入 n，依序輸出 1 到 n：3 的倍數輸出 Fizz，5 的倍數輸出 Buzz，同時是 15 的倍數輸出 FizzBuzz，其餘輸出數字本身。每個一行。",
 inFmt: "一個整數 n（1 ≤ n ≤ 100）", outFmt: "n 行",
 ref: s => Array.from({length: +s}, (_, i) => { const k = i + 1; return k % 15 === 0 ? "FizzBuzz" : k % 3 === 0 ? "Fizz" : k % 5 === 0 ? "Buzz" : String(k); }).join("\n"),
 inputs: ["1", "3", "5", "10", "15", "16", "30", "50", "100"]}
];

// 產生長度 n（偶數）的合法括號字串
function bal(n) {
  const o = "([{", c = ")]}"; let s = ""; const st = [];
  for (let i = 0; i < n; i++) {
    if (st.length && (R() < .5 || st.length >= n - i)) s += c[st.pop()];
    else { const k = ri(0, 2); st.push(k); s += o[k]; }
  }
  return s;
}
function pl(a, t) { return `${a.length} ${t}\n${a.join(" ")}`; }

function rot(n, k) { return `${n} ${k}\n${arr(n, -1000, 1000).join(" ")}`; }
function words(n) { return Array.from({length: n}, () => str(ri(1, 3), "abc")).join(" "); }

// 難度：1 簡單（預設）、2 中等、3 困難
const LV = {a004: 2, a006: 2, a008: 2, a013: 2, a015: 2, a016: 2, a018: 2, a020: 2, a017: 3, a019: 3,
  a021: 2, a022: 2, a023: 2, a025: 2, a027: 3, a028: 2, a029: 2};

export const PROBLEMS = RAW.map(p => {
  const tests = p.inputs.map(i => [i, p.ref(i)]);
  return {...p, tests, sample: tests[0], level: LV[p.id] || 1};
});
