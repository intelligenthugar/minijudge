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
 inputs: ["1", "3", "5", "10", "15", "16", "30", "50", "100"]},

// ======== APCS 風格（原創題目，題型與難度參考 APCS 實作題，不是歷屆考題） ========
{id: "a031", title: "成績統計", limit: 2000,
 desc: "老師想快速了解一次考試的成績。輸入 n 個分數，輸出最高分、最低分、平均分數（無條件捨去到整數），以及不及格（低於 60 分）的人數，四個數字以空白分隔。",
 inFmt: "第一行 n（1 ≤ n ≤ 1000），第二行 n 個整數（0 ≤ 分數 ≤ 100）", outFmt: "一行四個整數：最高分 最低分 平均 不及格人數",
 ref: s => { const a = s.split("\n")[1].split(" ").map(Number); return [Math.max(...a), Math.min(...a), Math.floor(a.reduce((x, y) => x + y, 0) / a.length), a.filter(x => x < 60).length].join(" "); },
 inputs: ["5\n80 55 92 60 71", "1\n100", "3\n0 0 0", "4\n59 60 61 100", list(arr(30, 0, 100)), list(arr(1000, 0, 100)), list(arr(1000, 60, 100)), list(arr(500, 0, 59))]},

{id: "a032", title: "最大括號深度", limit: 2000,
 desc: "輸入一個合法的括號字串（只含 ( 與 )，保證每個左括號都有對應的右括號），輸出括號巢狀的最大深度。例如 (()(())) 的最大深度是 3。",
 inFmt: "一行字串（長度 ≤ 1000，保證合法且不是空字串）", outFmt: "一個整數",
 ref: s => { let d = 0, m = 0; for (const c of s) { if (c === "(") { d++; m = Math.max(m, d); } else d--; } return String(m); },
 inputs: ["(()(()))", "()", "((()))", "()()()", "(".repeat(500) + ")".repeat(500), "()".repeat(500), pbal(40), pbal(200), pbal(1000)]},

{id: "a033", title: "逆序數對", limit: 2000,
 desc: "給定 n 個整數，求有幾組 (i, j) 滿足 i < j 且 a[i] > a[j]，這樣的一組叫做「逆序數對」。這個數字，也剛好等於用氣泡排序把陣列由小到大排好所需要的相鄰交換次數。",
 inFmt: "第一行 n（1 ≤ n ≤ 1000），第二行 n 個整數（|x| ≤ 10^9）", outFmt: "一個整數",
 ref: s => { const a = s.split("\n")[1].split(" ").map(Number); let c = 0; for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) if (a[i] > a[j]) c++; return String(c); },
 inputs: ["5\n3 1 2 5 4", "1\n7", "4\n4 3 2 1", "4\n1 2 3 4", "5\n2 2 2 2 2", list(arr(1000, -1e9, 1e9)), list(arr(1000, 0, 5)), list(Array.from({length: 1000}, (_, i) => 1000 - i))]},

{id: "a034", title: "矩陣旋轉", limit: 2000,
 desc: "輸入一個 n × m 的整數矩陣，輸出把它「順時針旋轉 90 度」之後的矩陣（會變成 m × n）。",
 inFmt: "第一行 n m（1 ≤ n, m ≤ 30），接下來 n 行，每行 m 個整數", outFmt: "m 行，每行 n 個整數，以空白分隔",
 ref: s => { const L = s.split("\n"), [n, m] = L[0].split(" ").map(Number), a = L.slice(1, 1 + n).map(r => r.split(" ")), o = []; for (let j = 0; j < m; j++) { const row = []; for (let i = n - 1; i >= 0; i--) row.push(a[i][j]); o.push(row.join(" ")); } return o.join("\n"); },
 inputs: ["2 3\n1 2 3\n4 5 6", "1 1\n5", "3 3\n1 2 3\n4 5 6\n7 8 9", "1 4\n1 2 3 4", "4 1\n1\n2\n3\n4", mat(7, 13, -9, 99), mat(13, 7, -9, 99), mat(30, 30, 0, 999)]},

{id: "a035", title: "螺旋矩陣", limit: 2000,
 desc: "輸入 n，產生一個 n × n 的矩陣：從左上角開始，依「向右 → 向下 → 向左 → 向上」的順時針方向繞圈，依序填入 1, 2, 3, …, n²。輸出這個矩陣。",
 inFmt: "一個整數 n（1 ≤ n ≤ 20）", outFmt: "n 行，每行 n 個整數，以空白分隔",
 ref: s => { const n = +s, g = Array.from({length: n}, () => Array(n).fill(0)), dr = [0, 1, 0, -1], dc = [1, 0, -1, 0]; let r = 0, c = 0, d = 0; for (let k = 1; k <= n * n; k++) { g[r][c] = k; let nr = r + dr[d], nc = c + dc[d]; if (nr < 0 || nr >= n || nc < 0 || nc >= n || g[nr][nc]) { d = (d + 1) % 4; nr = r + dr[d]; nc = c + dc[d]; } r = nr; c = nc; } return g.map(row => row.join(" ")).join("\n"); },
 inputs: ["4", "1", "2", "3", "5", "7", "10", "15", "20"]},

{id: "a036", title: "島嶼數量", limit: 3000,
 desc: "地圖是一個 n × m 的格子，1 代表陸地、0 代表海。上下左右相連的陸地算同一座島（斜角不算相連）。輸入地圖，輸出島嶼的數量。",
 inFmt: "第一行 n m（1 ≤ n, m ≤ 20），接下來 n 行，每行 m 個字元（只有 0 與 1，中間沒有空白）", outFmt: "一個整數",
 ref: s => { const L = s.split("\n"), [n, m] = L[0].split(" ").map(Number), g = L.slice(1, 1 + n).map(r => r.split("")); let cnt = 0; const st = []; for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) if (g[i][j] === "1") { cnt++; g[i][j] = "0"; st.push([i, j]); while (st.length) { const [r, c] = st.pop(); for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const x = r + dr, y = c + dc; if (x >= 0 && x < n && y >= 0 && y < m && g[x][y] === "1") { g[x][y] = "0"; st.push([x, y]); } } } } return String(cnt); },
 inputs: ["4 6\n110010\n110010\n001100\n000001", "1 1\n1", "1 1\n0", "2 2\n11\n11", "3 3\n101\n010\n101", grid01(10, 10, 0.4), grid01(20, 20, 0.5), grid01(20, 20, 0.7), grid01(20, 20, 0.3), "20 20\n" + Array(20).fill("1".repeat(20)).join("\n"), "20 20\n" + Array(20).fill("0".repeat(20)).join("\n")]},

{id: "a037", title: "迷宮最短路", limit: 3000,
 desc: "迷宮是 n × m 的格子：S 是起點、E 是終點、. 是空地、# 是牆。每一步可以往上、下、左、右走到相鄰的空地（或終點），不能穿牆。輸出從 S 走到 E 的最少步數；如果走不到，輸出 -1。",
 inFmt: "第一行 n m（1 ≤ n, m ≤ 21），接下來 n 行，每行 m 個字元（沒有空白，保證恰好一個 S 與一個 E）", outFmt: "一個整數",
 ref: s => { const L = s.split("\n"), [n, m] = L[0].split(" ").map(Number), g = L.slice(1, 1 + n); let sr = 0, sc = 0; for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) if (g[i][j] === "S") { sr = i; sc = j; } const d = Array.from({length: n}, () => Array(m).fill(-1)); d[sr][sc] = 0; const q = [[sr, sc]]; for (let h = 0; h < q.length; h++) { const [r, c] = q[h]; if (g[r][c] === "E") return String(d[r][c]); for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const x = r + dr, y = c + dc; if (x >= 0 && x < n && y >= 0 && y < m && g[x][y] !== "#" && d[x][y] === -1) { d[x][y] = d[r][c] + 1; q.push([x, y]); } } } return "-1"; },
 inputs: ["3 4\nS..#\n.#..\n...E", "1 2\nSE", "3 3\nS#E\n.#.\n.#.", "2 2\nS#\n#E", maze(10, 10, 0.25), maze(15, 15, 0.3), maze(20, 20, 0.2), maze(20, 20, 0), snake(15, 15), snake(21, 21)]},

{id: "a038", title: "河內塔", limit: 2000,
 desc: "河內塔有三根柱子 A、B、C，A 柱上由上到下有 n 個由小到大的圓盤。每次只能搬一個圓盤，而且大圓盤不能放在小圓盤的上面。請輸出把所有圓盤從 A 搬到 C（可以借用 B）的最少步驟，每一步一行，格式為「來源 目的」。",
 inFmt: "一個整數 n（1 ≤ n ≤ 6）", outFmt: "2^n - 1 行，每行兩個大寫字母，例如 A C",
 ref: s => { const o = []; const f = (n, a, c, b) => { if (!n) return; f(n - 1, a, b, c); o.push(a + " " + c); f(n - 1, b, c, a); }; f(+s, "A", "C", "B"); return o.join("\n"); },
 inputs: ["3", "1", "2", "4", "5", "6"]},

{id: "a039", title: "全排列", limit: 2000,
 desc: "輸入 n，依「字典順序」輸出 1 到 n 的所有排列，每個排列一行，數字之間以空白分隔。",
 inFmt: "一個整數 n（1 ≤ n ≤ 6）", outFmt: "n! 行，每行 n 個整數",
 ref: s => { const n = +s, o = [], cur = [], used = Array(n + 1).fill(false); const dfs = () => { if (cur.length === n) { o.push(cur.join(" ")); return; } for (let x = 1; x <= n; x++) if (!used[x]) { used[x] = true; cur.push(x); dfs(); cur.pop(); used[x] = false; } }; dfs(); return o.join("\n"); },
 inputs: ["3", "1", "2", "4", "5", "6"]},

{id: "a040", title: "N 皇后", limit: 4000,
 desc: "在 n × n 的棋盤上放 n 個皇后，使得任兩個皇后都不在同一列、同一行，也不在同一條斜線上。輸入 n，輸出總共有幾種放法。",
 inFmt: "一個整數 n（1 ≤ n ≤ 9）", outFmt: "一個整數",
 ref: s => { const n = +s, cols = Array(n).fill(false), d1 = Array(2 * n + 1).fill(false), d2 = Array(2 * n + 1).fill(false); const go = r => { if (r === n) return 1; let t = 0; for (let c = 0; c < n; c++) { if (cols[c] || d1[r - c + n] || d2[r + c]) continue; cols[c] = d1[r - c + n] = d2[r + c] = true; t += go(r + 1); cols[c] = d1[r - c + n] = d2[r + c] = false; } return t; }; return String(go(0)); },
 inputs: ["6", "1", "2", "3", "4", "5", "7", "8", "9"]},

{id: "a041", title: "零錢兌換", limit: 2000,
 desc: "有 k 種面額的硬幣，每種的數量都沒有限制。輸入目標金額，輸出湊出該金額最少需要幾枚硬幣；如果無論如何都湊不出來，輸出 -1。",
 inFmt: "第一行 k 與金額 T（1 ≤ k ≤ 10，0 ≤ T ≤ 1000），第二行 k 個面額（1 ≤ 面額 ≤ 500，彼此不同）", outFmt: "一個整數",
 ref: s => { const L = s.split("\n"), [k, T] = L[0].split(" ").map(Number), coins = L[1].split(" ").map(Number), INF = 1e9, dp = Array(T + 1).fill(INF); dp[0] = 0; for (let t = 1; t <= T; t++) for (const c of coins) if (c <= t && dp[t - c] + 1 < dp[t]) dp[t] = dp[t - c] + 1; return String(dp[T] >= INF ? -1 : dp[T]); },
 inputs: ["3 11\n1 2 5", "1 3\n2", "2 0\n1 5", "3 6\n1 3 4", "4 100\n1 5 10 25", "3 999\n7 13 29", "5 1000\n3 7 11 19 23", "2 1000\n500 499", "1 1000\n1", "4 997\n2 4 6 8"]},

{id: "a042", title: "0/1 背包", limit: 3000,
 desc: "有 n 件物品，第 i 件的重量是 w、價值是 v，每件最多只能拿一次。背包最多可以承重 W。輸出能裝進背包的最大總價值。",
 inFmt: "第一行 n W（1 ≤ n ≤ 50，1 ≤ W ≤ 1000），接下來 n 行，每行 w v（1 ≤ w ≤ 200，1 ≤ v ≤ 1000）", outFmt: "一個整數",
 ref: s => { const L = s.split("\n"), [n, W] = L[0].split(" ").map(Number), dp = Array(W + 1).fill(0); for (let i = 1; i <= n; i++) { const [w, v] = L[i].split(" ").map(Number); for (let c = W; c >= w; c--) dp[c] = Math.max(dp[c], dp[c - w] + v); } return String(dp[W]); },
 inputs: ["3 50\n10 60\n20 100\n30 120", "1 5\n6 10", "2 10\n5 3\n5 4", knap(10, 50), knap(30, 100), knap(50, 200), knap(50, 1000), knap(50, 1)]},

{id: "a043", title: "最長共同子序列", limit: 3000,
 desc: "輸入兩個只含小寫英文字母的字串 A 與 B，輸出它們的「最長共同子序列」的長度。子序列不必連續，但字元的先後順序要和原字串一致。例如 abcde 與 ace 的最長共同子序列是 ace，長度 3。",
 inFmt: "兩行，分別是字串 A 與字串 B（長度 ≤ 200）", outFmt: "一個整數",
 ref: s => { const [a, b] = s.split("\n"), n = a.length, m = b.length, dp = Array.from({length: n + 1}, () => Array(m + 1).fill(0)); for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]); return String(dp[n][m]); },
 inputs: ["abcde\nace", "abc\nabc", "abc\ndef", "a\na", "aaaa\naa", `${str(200, "abc")}\n${str(200, "abc")}`, `${str(100, "ab")}\n${str(150, "ab")}`, `${str(200)}\n${str(200)}`, "x".repeat(200) + "\n" + "x".repeat(200)]},

{id: "a044", title: "最長遞增子序列", limit: 3000,
 desc: "輸入 n 個整數，求最長的「嚴格遞增子序列」的長度。子序列不必連續，但元素的先後順序要和原本一致。",
 inFmt: "第一行 n（1 ≤ n ≤ 1000），第二行 n 個整數（|x| ≤ 10^9）", outFmt: "一個整數",
 ref: s => { const a = s.split("\n")[1].split(" ").map(Number), dp = Array(a.length).fill(1); let best = 1; for (let i = 0; i < a.length; i++) { for (let j = 0; j < i; j++) if (a[j] < a[i] && dp[j] + 1 > dp[i]) dp[i] = dp[j] + 1; best = Math.max(best, dp[i]); } return String(best); },
 inputs: ["6\n10 9 2 5 3 7", "1\n5", "5\n5 4 3 2 1", "5\n3 3 3 3 3", list(Array.from({length: 1000}, (_, i) => i)), list(arr(1000, -1e9, 1e9)), list(arr(1000, 0, 50)), list(arr(300, -100, 100))]},

{id: "a045", title: "活動選擇", limit: 2000,
 desc: "有 n 場活動，第 i 場從時間 s 開始、到時間 e 結束。同一個人不能同時參加時間重疊的活動，但是一場活動結束的時間剛好等於下一場開始的時間，是可以接著參加的。輸出最多可以參加幾場活動。",
 inFmt: "第一行 n（1 ≤ n ≤ 1000），接下來 n 行，每行 s e（0 ≤ s < e ≤ 10^6）", outFmt: "一個整數",
 ref: s => { const L = s.split("\n"), n = +L[0], a = []; for (let i = 1; i <= n; i++) a.push(L[i].split(" ").map(Number)); a.sort((x, y) => x[1] - y[1] || x[0] - y[0]); let cnt = 0, last = -1; for (const [st, en] of a) if (st >= last) { cnt++; last = en; } return String(cnt); },
 inputs: ["3\n1 3\n2 4\n3 5", "1\n0 1", "4\n0 10\n0 10\n0 10\n10 20", acts(1000, 1e6, 1000), acts(1000, 1e6, 100000), acts(500, 50, 10), acts(100, 1000, 30), acts(1000, 3000, 3)]},

{id: "a046", title: "木材切割", limit: 2000,
 desc: "有 n 根木材，長度分別是 L1, L2, …, Ln（都是正整數）。要把它們切成「長度相同、而且是整數」的小段，總共至少需要 K 段。輸出每一小段最長可以是多少；如果無論如何都切不出 K 段，輸出 0。（每根木材切剩下的零頭不能拼起來使用。）",
 inFmt: "第一行 n K（1 ≤ n ≤ 1000，1 ≤ K ≤ 10^6），第二行 n 個整數（1 ≤ Li ≤ 10^6）", outFmt: "一個整數",
 ref: s => { const L = s.split("\n"), K = +L[0].split(" ")[1], w = L[1].split(" ").map(Number); let lo = 1, hi = Math.max(...w), ans = 0; while (lo <= hi) { const mid = Math.floor((lo + hi) / 2); let p = 0; for (const x of w) p += Math.floor(x / mid); if (p >= K) { ans = mid; lo = mid + 1; } else hi = mid - 1; } return String(ans); },
 inputs: ["3 7\n20 11 13", "1 1\n7", "2 1000000\n5 5", "4 10\n8 9 10 11", wood(1000, 500000, 1, 1000000), wood(1000, 1000000, 1, 1000), wood(500, 2000, 1, 1000000), wood(1000, 1, 1, 1000000)]},

// ======== 公式題（輸出要固定小數位數，練習數學公式與格式化輸出） ========
{id: "a047", title: "畢氏定理", limit: 2000,
 desc: "直角三角形的兩股長分別是 a 與 b，斜邊長 c 滿足 a² + b² = c²。輸入 a 與 b，輸出斜邊長 c，四捨五入到小數點後第 2 位。",
 inFmt: "一行兩個正整數 a b（1 ≤ a, b ≤ 1000）", outFmt: "一個小數，固定顯示 2 位小數，例如 5.00",
 ref: s => { const [a, b] = s.split(" ").map(Number); return Math.sqrt(a * a + b * b).toFixed(2); },
 inputs: ["3 4", "1 1", "5 12", "8 15", "1000 1000", "1 1000", "7 24", "123 456", "10 10"]},

{id: "a048", title: "直角三角形判斷", limit: 2000,
 desc: "輸入三個正整數，代表三角形的三個邊長（順序不一定）。判斷這三邊能不能組成「直角三角形」，也就是最長邊的平方，等於另外兩邊的平方和。能就輸出 Yes，不能輸出 No。",
 inFmt: "一行三個正整數（1 ≤ 邊長 ≤ 10000）", outFmt: "Yes 或 No",
 ref: s => { const [a, b, c] = s.split(" ").map(Number).sort((x, y) => x - y); return a * a + b * b === c * c ? "Yes" : "No"; },
 inputs: ["3 4 5", "5 4 3", "1 1 1", "6 8 10", "5 12 13", "2 3 4", "10 6 8", "1 2 3", "7 24 25", "100 60 80", "9999 9999 9999", "10000 10000 1"]},

{id: "a049", title: "一元二次方程式", limit: 2000,
 desc: "輸入一元二次方程式 ax² + bx + c = 0 的係數（a、c 都不是 0）。令判別式 D = b² - 4ac：D > 0 時，輸出兩個相異的實數解，由小到大，以空白分隔；D = 0 時，輸出唯一的解；D < 0 時，輸出 No real roots。所有解都四捨五入到小數點後第 2 位。",
 inFmt: "一行三個整數 a b c（|a|、|b|、|c| ≤ 100，a ≠ 0，c ≠ 0）", outFmt: "依判別式輸出：兩個解（小的在前）、一個解，或 No real roots",
 ref: s => { const [a, b, c] = s.split(" ").map(Number), D = b * b - 4 * a * c; if (D < 0) return "No real roots"; if (D === 0) return (-b / (2 * a)).toFixed(2); const r = Math.sqrt(D), x1 = (-b - r) / (2 * a), x2 = (-b + r) / (2 * a); return [Math.min(x1, x2), Math.max(x1, x2)].map(x => x.toFixed(2)).join(" "); },
 inputs: ["1 -3 2", "1 2 1", "1 0 1", "1 -5 6", "2 3 -2", "-1 2 3", "3 2 1", "1 1 -1", "4 -4 1", "1 100 1", "-100 100 -1", quadIn(), quadIn(), quadIn(), quadIn()]},

{id: "a050", title: "兩點距離", limit: 2000,
 desc: "座標平面上有兩個點 (x1, y1) 與 (x2, y2)，輸出它們之間的距離，四捨五入到小數點後第 2 位。距離 = √((x1 - x2)² + (y1 - y2)²)。",
 inFmt: "一行四個整數 x1 y1 x2 y2（|座標| ≤ 1000）", outFmt: "一個小數，固定顯示 2 位小數",
 ref: s => { const [a, b, c, d] = s.split(" ").map(Number); return Math.sqrt((a - c) ** 2 + (b - d) ** 2).toFixed(2); },
 inputs: ["0 0 3 4", "1 1 1 1", "-1 -1 2 3", "0 0 1 1", "-1000 -1000 1000 1000", "5 5 5 -5", "123 -456 -789 12", "0 0 -6 8", "3 7 3 8"]},

{id: "a051", title: "圓的面積與周長", limit: 2000,
 desc: "輸入圓的半徑 r，輸出圓的面積與圓周長，兩個數字以空白分隔，各自四捨五入到小數點後第 2 位。圓周率請使用 3.14159。",
 inFmt: "一個正整數 r（1 ≤ r ≤ 1000）", outFmt: "一行兩個小數：面積 周長",
 ref: s => { const r = +s, PI = 3.14159; return `${(PI * r * r).toFixed(2)} ${(2 * PI * r).toFixed(2)}`; },
 inputs: ["5", "1", "10", "100", "3", "7", "25", "999", "1000", "37"]},

{id: "a052", title: "溫度轉換", limit: 2000,
 desc: "輸入攝氏溫度 C（整數），輸出對應的華氏溫度 F，公式是 F = C × 9 / 5 + 32，四捨五入到小數點後第 1 位。",
 inFmt: "一個整數 C（-100 ≤ C ≤ 100）", outFmt: "一個小數，固定顯示 1 位小數",
 ref: s => (+s * 9 / 5 + 32).toFixed(1),
 inputs: ["0", "100", "-40", "37", "-100", "25", "-17", "-18", "1"]},

{id: "a053", title: "等差數列", limit: 2000,
 desc: "等差數列的首項是 a、公差是 d。輸入 a、d 與 n，輸出這個數列的第 n 項，以及前 n 項的總和，兩個整數以空白分隔。",
 inFmt: "一行三個整數 a d n（|a|, |d| ≤ 10^6，1 ≤ n ≤ 10^6）", outFmt: "一行兩個整數：第 n 項 前 n 項和",
 ref: s => { const [a, d, n] = s.split(" ").map(BigInt); return `${a + (n - 1n) * d} ${n * (2n * a + (n - 1n) * d) / 2n}`; },
 inputs: ["1 1 10", "5 3 1", "-4 -3 7", "0 0 1000000", "1000000 1000000 1000000", "-1000000 1000000 1000000", "7 -2 20", "100 5 1", "-1000000 -1000000 1000000"]},

{id: "a054", title: "複利本利和", limit: 2000,
 desc: "存入本金 P 元，年利率 r%，每年複利一次（每年的利息會加進本金，下一年再一起計算利息）。輸入 P、r、n，輸出 n 年後的本利和，四捨五入到小數點後第 2 位。",
 inFmt: "一行三個整數 P r n（1 ≤ P ≤ 10^6，1 ≤ r ≤ 20，1 ≤ n ≤ 30）", outFmt: "一個小數，固定顯示 2 位小數",
 ref: s => { const [P, r, n] = s.split(" ").map(Number); return (P * Math.pow(1 + r / 100, n)).toFixed(2); },
 inputs: ["1000 5 10", "100 1 1", "1000000 20 30", "1 10 5", "50000 3 20", "2500 7 12", "123456 12 8", "999999 15 25", "10 2 30"]},

{id: "a055", title: "二元一次聯立方程式", limit: 2000,
 desc: "解聯立方程式：a1·x + b1·y = c1 與 a2·x + b2·y = c2。輸入六個係數，保證有唯一解（也就是 a1·b2 - a2·b1 不為 0），而且 x、y 都不是 0。輸出 x 與 y，四捨五入到小數點後第 2 位，以空白分隔。",
 inFmt: "兩行：第一行 a1 b1 c1，第二行 a2 b2 c2（|係數| ≤ 100）", outFmt: "一行兩個小數：x y",
 ref: s => { const [r1, r2] = s.split("\n"), [a1, b1, c1] = r1.split(" ").map(Number), [a2, b2, c2] = r2.split(" ").map(Number), D = a1 * b2 - a2 * b1; return `${((c1 * b2 - c2 * b1) / D).toFixed(2)} ${((a1 * c2 - a2 * c1) / D).toFixed(2)}`; },
 inputs: ["1 1 3\n1 -1 1", "2 3 8\n1 -1 -1", "3 -2 7\n1 4 -1", "1 2 5\n3 4 6", linIn(), linIn(), linIn(), linIn()]},

// ======== 競賽風格長題（長敘述、多筆測資、子任務計分；原創題目） ========
{id: "a056", title: "喵星的日曆", limit: 3000,
 story: `在銀河系的邊緣有一顆叫做「喵星」的行星，星球上住著一位超級愛睡覺的**喵皇**。喵皇每天只做三件事：睡覺、吃罐罐、看日曆。

但是，喵星的曆法跟地球完全不同：

- 一年有 10 個月，編號 1～10。
- 第 1～5 月，每個月有 40 天；第 6～10 月，每個月有 35 天。
- 如果年份是 3 的倍數，這一年叫做「**貓年**」，貓年的第 10 個月會多出 5 天（變成 40 天）。其他年份的第 10 個月是 35 天。

日期用「年 月 日」表示，月和日都從 1 開始。

今天喵皇又睡過頭了，醒來之後完全搞不清楚已經過了幾天。管家貓遞上一份清單，上面有一連串的「起始日期」和「經過的天數」。喵皇想知道：**從這個日期開始，再過 k 天，是喵星曆的哪一天？**（k = 0 表示就是當天。）

身為喵星最厲害的程式設計師，請你寫一支程式幫助喵皇，否則……喵皇會**用貓爪把你的鍵盤抓壞**！`,
 inFmt: `輸入有多筆測資，讀到 EOF（檔案結束）為止。每筆測資一行，有四個以空白隔開的整數 y、m、d、k，代表起始日期是 y 年 m 月 d 日，要往後推 k 天。

- 1 ≤ y ≤ 10^6
- 輸入的日期保證是合法的日期
- 0 ≤ k ≤ 10^9
- 每個測資檔最多 2000 行`,
 outFmt: `對每一筆測資輸出一行，包含三個以空白隔開的整數，代表 k 天後的「年 月 日」。`,
 hint: `k 最大有 10^9，一天一天往後加一定會超時。想想看：任意連續 3 年當中，剛好有一個貓年，所以每 3 年的總天數是固定的。`,
 subtasks: [{score: 20, text: "k ≤ 100", tests: [0, 1, 2]}, {score: 30, text: "k ≤ 10^5，輸入最多 100 行", tests: [3, 4, 5]}, {score: 50, text: "無額外限制", tests: [6, 7, 8]}],
 samples: ["1 1 1 0\n1 1 1 40\n1 5 40 1\n1 10 35 1\n3 10 40 1\n2 10 35 100"],
 ref: s => s.split("\n").filter(l => l.trim()).map(line => {
   let [y, m, d, k] = line.split(" ").map(Number), t = d - 1 + k;
   for (let i = 1; i < m; i++) t += mlen(y, i);
   const q = Math.floor(t / 1130); y += 3 * q; t -= 1130 * q;
   while (t >= (y % 3 === 0 ? 380 : 375)) { t -= (y % 3 === 0 ? 380 : 375); y++; }
   m = 1; while (t >= mlen(y, m)) { t -= mlen(y, m); m++; }
   return `${y} ${m} ${t + 1}`;
 }).join("\n"),
 inputs: ["1 1 1 0\n1 1 1 40\n1 5 40 1\n1 10 35 1\n3 10 40 1\n2 10 35 100", () => dateLines(5601, 60, 100, 20, "edge"), () => dateLines(5602, 100, 100, 20),
   () => dateLines(5603, 80, 1e5, 50), () => dateLines(5604, 100, 1e5, 50, "edge"), () => dateLines(5605, 100, 1e5, 1e6),
   () => dateLines(5606, 1500, 1e9, 1e6), () => dateLines(5607, 1000, 1e9, 1e6, "cyc"), () => dateLines(5608, 1500, 1e9, 1e6, "edge")]},

{id: "a057", title: "魔法學院的壓縮咒語", limit: 2000,
 story: `魔法學院的圖書館裡，有一本年代久遠的《重複咒語大全》。為了節省羊皮紙，古代的魔法師發明了一種壓縮寫法：

- \`k[咒語]\` 代表把中括號裡的咒語**連續唱 k 遍**。例如 \`3[ab]\` 就是 \`ababab\`。
- 括號裡面還可以有括號。例如 \`2[a3[bc]]d\` 要先展開裡面的 \`3[bc]\` 變成 \`abcbcbc\`，再唱 2 遍，最後接上 \`d\`，得到 \`abcbcbcabcbcbcd\`。
- 沒有被括號包住的字母，就只唱一遍。

見習魔法師小咪拿到了一大堆壓縮過的咒語，卻**完全不知道怎麼唱**（唱錯的話，會召喚出一隻會噴火的茄子）。請你寫一支程式，幫小咪把壓縮咒語完整地展開。`,
 inFmt: `一行字串，代表壓縮後的咒語，只包含小寫英文字母、數字與 \`[\`、\`]\`。保證格式合法：每個 \`[\` 前面一定有一個正整數 k，括號都有正確配對，而且括號裡面至少有一個字元。

- 壓縮咒語的長度 ≤ 2000
- 展開後的長度 ≤ 20000
- 1 ≤ k ≤ 99`,
 outFmt: `輸出展開後的咒語（一行）。`,
 hint: `遇到 \`[\` 時，先把「目前已經組好的字串」和「重複次數 k」一起收進堆疊；遇到 \`]\` 時再拿出來，把括號裡的內容重複 k 次，接在拿出來的字串後面。`,
 subtasks: [{score: 20, text: "沒有巢狀括號（括號裡面不會再有括號），且 k 都是 1 位數", tests: [0, 1, 2]}, {score: 30, text: "k 都是 1 位數", tests: [3, 4, 5]}, {score: 50, text: "無額外限制", tests: [6, 7, 8]}],
 samples: ["3[ab]c", "2[a3[bc]]d"],
 ref: s => { const st = []; let cur = "", k = 0; for (const ch of s) { if (ch >= "0" && ch <= "9") k = k * 10 + +ch; else if (ch === "[") { st.push([cur, k]); cur = ""; k = 0; } else if (ch === "]") { const [p, kk] = st.pop(); cur = p + cur.repeat(kk); } else cur += ch; } return cur; },
 inputs: ["3[ab]c", () => spellGen(5701, {depth: 1, two: false, target: 80}), () => spellGen(5702, {depth: 1, two: false, target: 1500}),
   "2[a3[bc]]d", () => spellGen(5703, {depth: 3, two: false, target: 300}), () => spellGen(5704, {depth: 3, two: false, target: 1800}),
   "12[3[4[5[ab]]]]", () => spellGen(5705, {depth: 3, two: true, target: 600}), () => spellGen(5706, {depth: 4, two: true, target: 1900})]},

{id: "a058", title: "魔法水塔", limit: 4000,
 story: `沙漠中有一座神祕的綠洲城市，城裡有 n 座魔法水塔，排成一直線，編號 1～n，**一開始全部都是空的**。

每天晚上，水之精靈會施展一次魔法：選擇一段連續的水塔（編號 l 到 r），**讓這一段裡的每一座水塔，水量都增加 v 單位**。水之精靈一共施展了 m 次魔法。

城主想要知道：

1. 所有水塔中，**最高的水量**是多少？
2. 水量最高的水塔裡，**編號最小**的是第幾座？
3. 有多少座水塔的水量**至少有 T 單位**？（T 是城主規定的「及格水位」）

城主一邊喝著**珍珠奶茶**，一邊等你的答案。不要讓他等太久，否則……他會把你的程式丟進沙漠裡曬成乾。`,
 inFmt: `第一行有三個整數 n、m、T。接下來 m 行，每行三個整數 l、r、v，代表一次魔法。

- 1 ≤ n ≤ 10^6
- 1 ≤ m ≤ 2500
- 1 ≤ T ≤ 10^10
- 1 ≤ l ≤ r ≤ n
- 1 ≤ v ≤ 10^6`,
 outFmt: `輸出一行，包含三個以空白隔開的整數：最高的水量、水量最高且編號最小的水塔編號、水量至少為 T 的水塔數量。`,
 hint: `最後的水量可能超過 2^31（約 21 億），C++ 要用 \`long long\`。如果每次魔法都把 l 到 r 一座一座加上去，最壞要做 2500 × 10^6 次，一定超時。試試看「差分」。`,
 subtasks: [{score: 20, text: "n ≤ 1000，m ≤ 1000", tests: [0, 1, 2]}, {score: 30, text: "n ≤ 10^5", tests: [3, 4, 5]}, {score: 50, text: "無額外限制", tests: [6, 7, 8]}],
 samples: ["5 3 4\n1 3 2\n2 5 3\n3 3 1"],
 ref: s => { const L = s.split("\n"), [n, m, T] = L[0].split(" ").map(Number), d = new Float64Array(n + 2); for (let i = 1; i <= m; i++) { const [l, r, v] = L[i].split(" ").map(Number); d[l] += v; d[r + 1] -= v; } let cur = 0, best = 0, pos = 1, cnt = 0; for (let i = 1; i <= n; i++) { cur += d[i]; if (cur > best) { best = cur; pos = i; } if (cur >= T) cnt++; } return `${best} ${pos} ${cnt}`; },
 inputs: ["5 3 4\n1 3 2\n2 5 3\n3 3 1", () => towerCase(5801, 1000, 1000, 1e6), "1 1 1\n1 1 5",
   () => towerCase(5803, 1e5, 2500, 1e6), () => towerCase(5804, 1e5, 2500, 1e6, "narrow"), () => towerCase(5805, 1e5, 3, 1e6),
   () => towerCase(5806, 1e6, 2500, 1e6), () => towerCase(5807, 1e6, 2500, 1e6, "full"), () => towerCase(5808, 1e6, 2500, 1e6, "narrow")]},

{id: "a059", title: "掃地機器人", limit: 3000,
 story: `吉祥物機器人「小圓」是學校掃地機器人團隊的新成員。今天，它的任務是在一間 R × C 的教室裡掃地。教室的地圖是一個網格，每一格是：

- \`.\`：空地。
- \`#\`：牆壁或桌椅，不能進入。
- \`S\`：小圓一開始站的位置（也是空地）。

小圓一開始**面向北方**（地圖的上方）。它有一串固定的指令，指令只包含三種字元：

- \`F\`：往面向的方向前進一格。如果前面是牆壁，或是已經在教室外面，就**停在原地**（撞到了）。
- \`L\`：原地向左轉 90 度。
- \`R\`：原地向右轉 90 度。

小圓會把整串指令從頭到尾執行一遍，稱為「一輪」，接著**再重複同一串指令**，一共執行 K 輪。

老師想知道：K 輪結束後，小圓站在哪裡、面向哪個方向？以及這段期間（包含一開始站的位置），小圓**總共站過幾個不同的格子**？因為老師還要趕著去**買午餐的雞排**，請你快點寫出來！`,
 inFmt: `第一行有三個整數 R、C、K。接下來 R 行是教室地圖，每行有 C 個字元。最後一行是一串指令。

- 1 ≤ R, C ≤ 20
- 地圖中恰好有一個 \`S\`
- 指令的長度 L 滿足 1 ≤ L ≤ 100，只包含 \`F\`、\`L\`、\`R\`
- 1 ≤ K ≤ 10^9`,
 outFmt: `第一行輸出 K 輪結束後小圓的位置與面向的方向，格式是「列 行 方向」，以空白隔開。列、行都從 1 開始編號（最上面是第 1 列、最左邊是第 1 行）；方向用 \`N\`（北）、\`E\`（東）、\`S\`（南）、\`W\`（西）表示。

第二行輸出小圓總共站過幾個不同的格子（包含一開始的位置）。`,
 hint: `K 最大有 10^9，不可能真的做 K 輪。把「每一輪開始時的狀態」（位置與方向）記下來：狀態最多只有 R × C × 4 種，所以很快就會出現重複，之後就是不斷繞圈。`,
 subtasks: [{score: 20, text: "K ≤ 100", tests: [0, 1, 2]}, {score: 30, text: "K ≤ 10^6", tests: [3, 4, 5]}, {score: 50, text: "無額外限制", tests: [6, 7, 8]}],
 samples: ["5 6 3\n......\n.##...\n......\n..#...\nS.....\nFFRFFLF"],
 ref: s => {
   const L = s.split("\n"), [R, C, K] = L[0].split(" ").map(Number), g = L.slice(1, 1 + R), cmd = L[1 + R];
   let r = 0, c = 0, d = 0;
   for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) if (g[i][j] === "S") { r = i; c = j; }
   const dr = [-1, 0, 1, 0], dc = [0, 1, 0, -1], seen = new Set([r * C + c]), first = new Map(), states = [];
   let rounds = 0;
   while (rounds < K) {
     const key = (r * C + c) * 4 + d;
     if (first.has(key)) { const st = first.get(key), cyc = rounds - st; [r, c, d] = states[st + (K - st) % cyc]; break; }
     first.set(key, rounds); states.push([r, c, d]);
     for (const ch of cmd) {
       if (ch === "L") d = (d + 3) % 4; else if (ch === "R") d = (d + 1) % 4;
       else { const nr = r + dr[d], nc = c + dc[d]; if (nr >= 0 && nr < R && nc >= 0 && nc < C && g[nr][nc] !== "#") { r = nr; c = nc; seen.add(r * C + c); } }
     }
     rounds++;
   }
   return `${r + 1} ${c + 1} ${"NESW"[d]}\n${seen.size}`;
 },
 inputs: ["5 6 3\n......\n.##...\n......\n..#...\nS.....\nFFRFFLF", () => robotCase(5901, 8, 8, 50, 0.2, 20, 0.6), () => robotCase(5902, 1, 1, 100, 0, 5, 0.5),
   () => robotCase(5903, 15, 15, 1e6, 0.15, 40, 0.7), () => robotCase(5904, 20, 20, 1e6, 0.3, 100, 0.5), () => robotCase(5905, 10, 12, 999999, 0, 7, 0.8),
   () => robotCase(5906, 20, 20, 1e9, 0.2, 100, 0.6), () => robotCase(5907, 20, 20, 1e9, 0, 99, 0.9), () => robotCase(5908, 13, 17, 999999999, 0.25, 77, 0.65)]},

{id: "a060", title: "校園程式競賽排名", limit: 3000,
 story: `一年一度的**校園程式競賽**到了！主辦單位有 n 支參賽隊伍，每支隊伍都有一個隊名（不會重複）、解出的題數，以及總罰時（單位是分鐘）。

排名的規則如下：

1. 解題數**越多**，排名越前面。
2. 解題數一樣的話，總罰時**越少**，排名越前面。
3. 解題數和總罰時都一樣的隊伍，名次**並列**。輸出時，隊名**字典順序較小**的先輸出。

並列的隊伍名次相同，而下一支成績不同的隊伍，名次要把前面所有的隊伍數量都算進去。例如有兩隊並列第 2 名，那下一隊就是第 4 名（沒有第 3 名）。

頒獎典禮的主持人是**一隻戴著領結的企鵝**，牠不會算名次，只會吃魚。請你寫一支程式，幫牠排出完整的排行榜！`,
 inFmt: `第一行有一個整數 n。接下來 n 行，每行有三項以空白隔開的資料：隊名（只包含小寫英文字母，長度 1～10，所有隊名都不相同）、解題數 s、總罰時 t。

- 1 ≤ n ≤ 2000
- 0 ≤ s ≤ 20
- 0 ≤ t ≤ 10^5`,
 outFmt: `輸出 n 行，依排名順序，每行輸出「名次 隊名 解題數 總罰時」，以空白隔開。`,
 hint: `Python 可以用 \`sort(key=lambda …)\`，C++ 可以用 \`sort\` 搭配 lambda（或是用 pair、tuple）。把「解題數取負號」就能讓解題數大的排在前面。名次只有在「成績和前一名不同」的時候，才更新成目前的位置（i + 1）。`,
 subtasks: [{score: 20, text: "n ≤ 10，沒有任何兩隊的解題數和總罰時完全相同", tests: [0, 1, 2]}, {score: 30, text: "n ≤ 100", tests: [3, 4, 5]}, {score: 50, text: "無額外限制", tests: [6, 7, 8]}],
 samples: ["5\ncat 3 120\ndog 3 100\nowl 5 300\nbee 3 100\nfox 0 0"],
 ref: s => { const L = s.split("\n"), n = +L[0], t = []; for (let i = 1; i <= n; i++) { const [nm, a, b] = L[i].split(" "); t.push([nm, +a, +b]); } t.sort((x, y) => y[1] - x[1] || x[2] - y[2] || (x[0] < y[0] ? -1 : x[0] > y[0] ? 1 : 0)); let rank = 0; return t.map((x, i) => { if (i === 0 || x[1] !== t[i - 1][1] || x[2] !== t[i - 1][2]) rank = i + 1; return `${rank} ${x[0]} ${x[1]} ${x[2]}`; }).join("\n"); },
 inputs: ["5\ncat 3 120\ndog 3 100\nowl 5 300\nbee 2 100\nfox 0 0", () => teamCase(6001, 10, 20, 1e5, true), () => teamCase(6002, 1, 20, 1e5, true),
   () => teamCase(6003, 100, 5, 50), () => teamCase(6004, 100, 20, 1e5), () => teamCase(6005, 100, 0, 0),
   () => teamCase(6006, 2000, 20, 1e5), () => teamCase(6007, 2000, 3, 5), () => teamCase(6008, 2000, 0, 0)]}



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

// ---- APCS 風格題目用的測資產生器 ----
function pbal(n) {                       // 長度 n（偶數）的合法括號字串，只含 ( )
  let s = "", d = 0;
  for (let i = 0; i < n; i++) {
    if (d > 0 && (R() < 0.5 || d >= n - i)) { s += ")"; d--; } else { s += "("; d++; }
  }
  return s;
}
function mat(n, m, lo, hi) { return `${n} ${m}\n` + Array.from({length: n}, () => arr(m, lo, hi).join(" ")).join("\n"); }
function grid01(n, m, p) { return `${n} ${m}\n` + Array.from({length: n}, () => Array.from({length: m}, () => R() < p ? "1" : "0").join("")).join("\n"); }
function maze(n, m, p) {
  const g = Array.from({length: n}, () => Array.from({length: m}, () => R() < p ? "#" : "."));
  g[0][0] = "S"; g[n - 1][m - 1] = "E";
  return `${n} ${m}\n` + g.map(r => r.join("")).join("\n");
}
function snake(n, m) {                   // 蛇形走廊：一定要繞很遠才走得到終點
  const g = Array.from({length: n}, (_, i) => Array.from({length: m}, () => i % 2 ? "#" : "."));
  for (let i = 1; i < n; i += 2) g[i][i % 4 === 1 ? m - 1 : 0] = ".";
  g[0][0] = "S"; g[n - 1][m - 1] = "E";
  return `${n} ${m}\n` + g.map(r => r.join("")).join("\n");
}
function knap(n, W) { return `${n} ${W}\n` + Array.from({length: n}, () => `${ri(1, 200)} ${ri(1, 1000)}`).join("\n"); }
function acts(n, T, maxLen) {
  return `${n}\n` + Array.from({length: n}, () => { const s = ri(0, T - 1); return `${s} ${Math.min(T, s + ri(1, maxLen))}`; }).join("\n");
}
function wood(n, K, lo, hi) { return `${n} ${K}\n${arr(n, lo, hi).join(" ")}`; }

// ---- 公式題用的測資產生器：避開「四捨五入剛好在邊界」與「-0.00」，讓各種寫法算出來的結果一致 ----
function nearTie(x) { const f = (Math.abs(x) * 100) % 1; return Math.abs(f - 0.5) < 1e-3; }
function quadIn() {
  for (;;) {
    const a = ri(-30, 30), b = ri(-60, 60), c = ri(-30, 30);
    if (!a || !c) continue;
    const D = b * b - 4 * a * c;
    if (D > 0) {
      const r = Math.sqrt(D), x1 = (-b - r) / (2 * a), x2 = (-b + r) / (2 * a);
      if (nearTie(x1) || nearTie(x2) || Math.abs(x1) < 0.01 || Math.abs(x2) < 0.01) continue;
    } else if (D === 0 && nearTie(-b / (2 * a))) continue;
    return `${a} ${b} ${c}`;
  }
}
function linIn() {
  for (;;) {
    const v = arr(6, -20, 20), [a1, b1, c1, a2, b2, c2] = v, D = a1 * b2 - a2 * b1;
    const nx = c1 * b2 - c2 * b1, ny = a1 * c2 - a2 * c1;
    if (!D || !nx || !ny || nearTie(nx / D) || nearTie(ny / D)) continue;
    return `${a1} ${b1} ${c1}\n${a2} ${b2} ${c2}`;
  }
}

// ---- 競賽風格長題用的測資產生器：每筆測資用自己的亂數種子，第一次用到時才產生（不依賴載入順序、也不會拖慢其他頁面）----
const ri2 = (R2, a, b) => a + Math.floor(R2() * (b - a + 1));
const mlen = (y, m) => m <= 5 ? 40 : m <= 9 ? 35 : (y % 3 === 0 ? 40 : 35);

function dateLines(seed, cnt, maxK, maxY, mode) {
  const R2 = rng(seed), out = [];
  for (let i = 0; i < cnt; i++) {
    const y = ri2(R2, 1, maxY);
    let m = ri2(R2, 1, 10), d, k;
    if (mode === "edge") { m = [1, 5, 6, 9, 10][ri2(R2, 0, 4)]; d = R2() < 0.5 ? 1 : mlen(y, m); }
    else d = ri2(R2, 1, mlen(y, m));
    if (mode === "edge") k = [0, 1, 39, 40, 41, 374, 375, 376, 379, 380, 381, 1129, 1130, 1131, 2260, maxK][ri2(R2, 0, 15)];
    else if (mode === "cyc") k = 1130 * ri2(R2, 0, 880000) + ri2(R2, -2, 2);
    else k = ri2(R2, 0, maxK);
    out.push(`${y} ${m} ${d} ${Math.max(0, Math.min(k, maxK))}`);
  }
  return out.join("\n");
}
const expLen = s => {
  const st = []; let cur = 0, k = 0;
  for (const ch of s) {
    if (ch >= "0" && ch <= "9") k = k * 10 + +ch;
    else if (ch === "[") { st.push([cur, k]); cur = 0; k = 0; }
    else if (ch === "]") { const [p, kk] = st.pop(); cur = p + cur * kk; }
    else cur++;
  }
  return cur;
};
function spellGen(seed, o) {                     // o: {depth, two, target}
  const R2 = rng(seed);
  const letters = n => Array.from({length: n}, () => "abcdefghij"[ri2(R2, 0, 9)]).join("");
  const kk = () => o.two && R2() < 0.4 ? ri2(R2, 10, 99) : ri2(R2, 1, 9);
  const piece = depth => {
    let s = "";
    for (let i = ri2(R2, 1, 3); i > 0; i--) s += R2() < 0.4 || depth === 0 ? letters(ri2(R2, 1, 3)) : kk() + "[" + piece(depth - 1) + "]";
    return s;
  };
  let best = "";
  for (let t = 0; t < 12; t++) {
    let s = "";
    for (let g = 0; g < 120 && s.length < o.target; g++) {
      const p = piece(o.depth);
      if (s.length + p.length > 2000 || expLen(s + p) > 20000) continue;
      s += p;
    }
    if (s.length > best.length) best = s;
  }
  return best;
}
function towerCase(seed, n, m, maxV, wide) {
  const R2 = rng(seed), ops = [], diff = new Float64Array(n + 2);
  for (let i = 0; i < m; i++) {
    let l, r, v = ri2(R2, 1, maxV);
    if (wide === "full") { l = 1; r = n; v = maxV; }
    else if (wide === "narrow") { l = ri2(R2, 1, n); r = Math.min(n, l + ri2(R2, 0, 20)); }
    else { l = ri2(R2, 1, n); r = ri2(R2, l, n); }
    ops.push(`${l} ${r} ${v}`); diff[l] += v; diff[r + 1] -= v;
  }
  let cur = 0, T = 1;
  const pick = ri2(R2, 1, n);
  for (let i = 1; i <= n; i++) { cur += diff[i]; if (i === pick) T = Math.max(1, cur); }
  return `${n} ${m} ${T}\n${ops.join("\n")}`;
}
function robotCase(seed, R, C, K, wallP, L, fProb) {
  const R2 = rng(seed), g = Array.from({length: R}, () => Array.from({length: C}, () => R2() < wallP ? "#" : "."));
  g[ri2(R2, 0, R - 1)][ri2(R2, 0, C - 1)] = "S";
  const cmd = Array.from({length: L}, () => { const x = R2(); return x < fProb ? "F" : x < fProb + (1 - fProb) / 2 ? "L" : "R"; }).join("");
  return `${R} ${C} ${K}\n${g.map(r => r.join("")).join("\n")}\n${cmd}`;
}
function teamCase(seed, n, maxS, maxT, noTie) {
  const R2 = rng(seed), names = new Set(), seen = new Set(), rows = [];
  while (rows.length < n) {
    let nm = "";
    for (let i = ri2(R2, 1, 8); i > 0; i--) nm += "abcdefghijklmnopqrstuvwxyz"[ri2(R2, 0, 25)];
    if (names.has(nm)) continue;
    const s = ri2(R2, 0, maxS), t = ri2(R2, 0, maxT);
    if (noTie && seen.has(s + "," + t)) continue;
    names.add(nm); seen.add(s + "," + t); rows.push(`${nm} ${s} ${t}`);
  }
  return `${n}\n${rows.join("\n")}`;
}

// 難度：1 簡單（預設）、2 中等、3 困難
const LV = {a004: 2, a006: 2, a008: 2, a013: 2, a015: 2, a016: 2, a018: 2, a020: 2, a017: 3, a019: 3,
  a021: 2, a022: 2, a023: 2, a025: 2, a027: 3, a028: 2, a029: 2,
  a033: 2, a034: 2, a035: 2, a036: 3, a037: 3, a038: 2, a039: 2, a040: 3, a041: 3, a042: 3, a043: 3, a044: 3, a045: 3, a046: 3,
  a048: 1, a049: 2, a050: 1, a051: 1, a053: 2, a054: 2, a055: 2,
  a056: 3, a057: 3, a058: 3, a059: 3, a060: 2};

// 題目頁顯示的「範例」。預設用第一筆測資；如果第一筆是 0、1 這種邊界值（範例會很沒意義），就在這裡另外指定。
const SAMPLE = {a004: "17", a005: "10", a009: "5", a012: "3", a013: "12345", a015: "10", a017: "12", a019: "([]{})", a021: "10", a029: "5", a030: "5", a032: "(()(()))", a035: "4", a038: "3", a039: "3", a040: "6", a051: "5", a052: "37"};

const resolve = i => typeof i === "function" ? i() : i;
const groupOf = id => { const n = parseInt(id.slice(1), 10); return n > 55 ? "long" : n > 46 ? "formula" : n > 30 ? "apcs" : "basic"; };

export const PROBLEMS = RAW.map(p => {
  const o = {...p, level: LV[p.id] || 1, group: groupOf(p.id)};
  // 範例：可以有多組（samples），預設用第一筆測資（或 SAMPLE 指定的）
  o.samples = (p.samples || [SAMPLE[p.id] || resolve(p.inputs[0])]).map(si => [si, p.ref(si)]);
  o.sample = o.samples[0];
  // 測資第一次用到才產生（長題的測資比較大，不要拖慢其他頁面）
  let cache = null;
  Object.defineProperty(o, "tests", {enumerable: true, get() { return cache || (cache = p.inputs.map(i => { const s = resolve(i); return [s, p.ref(s)]; })); }});
  return o;
});
