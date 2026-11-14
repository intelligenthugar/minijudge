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
   ...Array.from({length: 3}, () => `${ri(1, 1e9)} ${ri(1, 1e9)}`)]}
];

export const PROBLEMS = RAW.map(p => {
  const tests = p.inputs.map(i => [i, p.ref(i)]);
  return {...p, tests, sample: tests[0]};
});
