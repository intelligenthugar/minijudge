#!/usr/bin/env python3
"""產生 data/functions.js（函式對照表）。
用法：python tools/build_functions.py
每個範例都會用 python3 實際執行，「執行結果」是真的跑出來的，不要手寫。
新增函式：在 ENTRIES 加一行 (分類, 函式/寫法, 用途, 範例程式, 範例輸入, 對應教學單元)。"""
import json, os, subprocess, sys

CATS = [
 ("io", "輸入與輸出", "第一步是把資料讀進來、把答案印出去；格式讀錯或印錯，後面寫得再好也會 WA。"),
 ("type", "型態轉換", "字串和數字之間的轉換，是最常見的無聲錯誤來源。"),
 ("op", "運算子", "// 和 % 的組合最常出現，負數的結果要特別小心。"),
 ("loop", "迴圈與 range", "range 的起點、終點、間隔是最常見的陷阱：終點不包含。"),
 ("list", "串列", "一排資料的主力工具：索引、切片、走訪要練到不用想。"),
 ("str", "字串與字元", "字串不能直接修改，要用切片、串接組出新字串。"),
 ("dict", "字典與集合", "統計每種東西出現幾次、判斷有沒有出現過。"),
 ("grid", "二維串列", "表格、棋盤、網格題：建立、走訪、邊界、方向。"),
 ("func", "函式、lambda 與遞迴", "把步驟包起來；lambda 寫一行小函式；遞迴要先找終止條件。"),
 ("sort", "排序、搜尋與效率", "能用內建就用內建；知道程式大約要跑幾次，才知道會不會 TLE。"),
]

E = []
def add(cat, fn, use, code, inp="", unit="u01"): E.append((cat, fn, use, code, inp, unit))

# ---- 輸入與輸出 ----
add("io", "input()", "讀入一整行文字，結果一定是字串", 's = input()\nprint(s, type(s))', "42")
add("io", "print(a, b)", "印出多個值，預設用空白隔開、最後換行", 'print(3, 5, "ok")')
add("io", "print(…, sep=…)", "指定多個值之間的分隔符號", 'print(2026, 10, 5, sep="/")')
add("io", "print(…, end=…)", "指定結尾；不換行就能接著印", 'print("A", end="")\nprint("B")')
add("io", "f-string", "把變數或運算結果直接嵌進字串", 'x = 7\nprint(f"[{x * 2}]")')
add("io", 'f"{x:.2f}"', "格式化：固定小數位數、補零", 'print(f"{3.14159:.2f}", f"{7:03d}")')
add("io", "s.split()", "依空白把字串切成串列（元素還是字串）", 'print("3 5 7".split())')
add("io", "map(int, …)", "把每個元素都轉成整數", 'print(list(map(int, ["3", "5"])))')
add("io", "list(map(int, input().split()))", "一行讀入多個整數（最常見）", 'nums = list(map(int, input().split()))\nprint(nums, sum(nums))', "4 8 15")
add("io", "a, b = map(int, input().split())", "一行讀入固定個數的整數", 'n, m = map(int, input().split())\nprint(n * m)', "3 4")
add("io", "print(*a)", "把串列展開，用空白隔開輸出", 'a = [3, 1, 4]\nprint(*a)\nprint(*a, sep=",")', "", "u04")
add("io", "先讀 n 再讀 n 行", "n 行資料，每行兩個整數", 'n = int(input())\nfor _ in range(n):\n    a, b = map(int, input().split())\n    print(a + b)', "2\n1 2\n3 4", "u04")
# ---- 型態轉換 ----
add("type", "int(x)", "轉成整數；小數會直接去掉小數部分", 'print(int("15") + 1, int(3.9), int(-3.9))')
add("type", "float(x)", "轉成小數", 'print(float("2.5") * 2)')
add("type", "str(x)", "轉成字串", 'print(str(15) + "1")')
add("type", "round(x)", "四捨五入到整數；剛好 .5 時取偶數", 'print(round(3.7), round(2.5), round(3.5))')
add("type", "round(x, n)", "取到小數第 n 位", 'print(round(3.14159, 2))')
add("type", "list(x)", "轉成串列", 'print(list(range(4)), list("abc"))', "", "u04")
add("type", "set(x)", "轉成集合，自動去除重複", 'print(set([3, 1, 3, 2]))', "", "u04")
add("type", "bool(x)", "0、空字串、空串列是 False，其餘是 True", 'print(bool(0), bool(""), bool([]), bool(5))', "", "u02")
add("type", "type(x)", "查看資料型態", 'print(type(3), type(3.0), type("3"))')
# ---- 運算子 ----
add("op", "a // b", "整數除法，往下取整（負數要小心）", 'print(17 // 5, -7 // 2)', "", "u02")
add("op", "a % b", "取餘數", 'print(17 % 5, 76 % 48)', "", "u02")
add("op", "a / b", "除法，結果一定是小數", 'print(7 / 2, 8 / 2)', "", "u02")
add("op", "a ** b", "次方", 'print(3 ** 7)', "", "u02")
add("op", "divmod(a, b)", "同時取得商和餘數", 'q, r = divmod(17, 5)\nprint(q, r)', "", "u02")
add("op", "abs(x)", "絕對值；常用來算距離", 'print(abs(-5), abs(2 - 7) + abs(5 - 1))', "", "u02")
add("op", "and / or / not", "邏輯運算", 'x = 15\nprint(x > 10 and x % 2 == 0, not x < 0)', "", "u02")
add("op", "0 < x < 10", "連續比較，可以連著寫", 'x = 5\nprint(0 < x < 10, 0 < x < 3)', "", "u02")
add("op", "運算子優先順序", "** → 負號 → * / // % → + - → 比較 → not → and → or", 'print(2 + 3 * 4, -2 ** 2, 2 ** 3 ** 2)', "", "u02")
add("op", "a if 條件 else b", "一行的條件運算", 'n = 7\nprint("奇" if n % 2 else "偶")', "", "u02")
add("op", "x += 1", "複合指定運算", 'x = 5\nx += 3\nx *= 2\nprint(x)', "", "u02")
add("op", "0 視為假", "if 後面放數字：0 是假，非 0 是真", 'count = 0\nif count:\n    print("真")\nelse:\n    print("假")', "", "u02")
# ---- 迴圈 ----
add("loop", "range(n)", "0, 1, …, n-1", 'print(list(range(5)))', "", "u03")
add("loop", "range(a, b)", "a 到 b-1（不含 b）", 'print(list(range(2, 6)))', "", "u03")
add("loop", "range(a, b, k)", "每次加 k", 'print(list(range(0, 20, 5)))', "", "u03")
add("loop", "range(a, b, -1)", "由大往小，一樣不含 b", 'print(list(range(6, 0, -1)))', "", "u03")
add("loop", "while 條件:", "條件成立就一直重複", 'i = 1\nwhile i < 20:\n    i = i * 3\nprint(i)', "", "u03")
add("loop", "break / continue", "跳出迴圈／跳過這一輪", 'for i in range(10):\n    if i % 2 == 0:\n        continue\n    if i > 6:\n        break\n    print(i, end=" ")\nprint()', "", "u03")
add("loop", "enumerate(a)", "同時取得索引與元素", 'for i, x in enumerate(["a", "b"]):\n    print(i, x)', "", "u04")
add("loop", "zip(a, b)", "同時走訪兩個串列", 'for x, y in zip([1, 2], ["a", "b"]):\n    print(x, y)', "", "u04")
add("loop", '"*" * m', "字串乘法：重複 m 次，印圖形常用", 'for m in range(1, 4):\n    print(" " * (3 - m) + "*" * (2 * m - 1))', "", "u03")
# ---- 串列 ----
add("list", "[0] * n", "建立 n 個 0 的串列", 'print([0] * 5)', "", "u04")
add("list", "a[i]、a[-1]", "取第 i 個／最後一個元素", 'a = [8, 3, 6, 1]\nprint(a[0], a[-1])', "", "u04")
add("list", "a[i:j:k]", "切片：從 i 到 j-1，每次跳 k", 'a = [0, 1, 2, 3, 4, 5]\nprint(a[1:4], a[::2])', "", "u04")
add("list", "a[::-1]", "反轉後的新串列", 'print([1, 2, 3][::-1])', "", "u04")
add("list", "len(a)", "元素個數", 'print(len([4, 7, 1]))', "", "u04")
add("list", "a.append(x)", "在尾端加入元素", 'a = []\nfor i in range(3):\n    a.append(i * i)\nprint(a)', "", "u04")
add("list", "a.pop()", "取出並移除最後一個（堆疊）", 'a = [1, 2, 3]\nprint(a.pop(), a)', "", "u09")
add("list", "a.insert(i, x)", "在位置 i 插入 x", 'a = [1, 3]\na.insert(1, 2)\nprint(a)', "", "u04")
add("list", "a.remove(x)", "移除第一個 x", 'a = [1, 2, 1]\na.remove(1)\nprint(a)', "", "u04")
add("list", "max() / min() / sum()", "最大值、最小值、總和", 'a = [80, 90, 100]\nprint(max(a), min(a), sum(a))', "", "u04")
add("list", "a.count(x)", "x 出現幾次", 'print([1, 2, 1, 1].count(1))', "", "u04")
add("list", "a.index(x)", "x 第一次出現的位置（找不到會出錯）", 'print([5, 7, 9, 7].index(7))', "", "u04")
add("list", "x in a", "判斷 x 在不在串列裡", 'print(7 in [5, 7, 9], 4 in [5, 7, 9])', "", "u04")
add("list", "a[i], a[j] = a[j], a[i]", "交換兩個元素", 'a = [1, 2, 3, 4]\na[0], a[3] = a[3], a[0]\nprint(a)', "", "u04")
add("list", "[運算式 for i in range(n)]", "串列生成式：一行產生串列", 'print([i * i for i in range(6)])', "", "u04")
add("list", "[x for x in a if 條件]", "生成式加上過濾", 'print([x for x in range(10) if x % 3 == 0])', "", "u04")
add("list", "a + b", "串接兩個串列", 'print([1, 2] + [3])', "", "u04")
add("list", "a[:] / a.copy()", "複製一份新的串列", 'a = [1, 2]\nb = a\nc = a[:]\na.append(3)\nprint(b, c)', "", "u04")
add("list", "前綴和", "pre[i] = 前 i 項總和；區間和用相減", 'a = [3, 1, 4, 1, 5]\npre = [0] * (len(a) + 1)\nfor i in range(len(a)):\n    pre[i + 1] = pre[i] + a[i]\nprint(pre, pre[4] - pre[1])', "", "u10")
# ---- 字串 ----
add("str", "s[i]、s[i:j]", "取字元／取一段子字串", 's = "MINGDAO"\nprint(s[0], s[1:4], s[:3])', "", "u05")
add("str", "s1 + s2", "串接字串", 'print("APCS" + "-" + "Py")', "", "u05")
add("str", "s * n", "字串重複 n 次", 'print("ab" * 3)', "", "u05")
add("str", "s[::-1]", "反轉字串", 'print("abcde"[::-1])', "", "u05")
add("str", "s.split(sep)", "依指定符號切開", 'print("8,9,10".split(","))', "", "u05")
add("str", "sep.join(lst)", "把字串串列接起來", 'print("-".join(["2026", "10", "05"]))', "", "u05")
add("str", "s.replace(a, b)", "把 a 全部換成 b", 'print("a-b-c".replace("-", ""))', "", "u05")
add("str", "s.find(x)", "x 第一次出現的位置，找不到回傳 -1", 'print("banana".find("n"), "banana".find("z"))', "", "u05")
add("str", "s.count(x)", "x 出現幾次", 'print("banana".count("a"))', "", "u05")
add("str", "s.strip()", "去掉頭尾的空白與換行", 'print("[" + " hi \\n".strip() + "]")', "", "u05")
add("str", "s.upper() / s.lower()", "轉成大寫／小寫", 'print("Apcs".upper(), "Apcs".lower())', "", "u05")
add("str", "s.startswith(x)", "是否以 x 開頭（endswith 是結尾）", 'print("apcs".startswith("ap"), "apcs".endswith("cs"))', "", "u05")
add("str", "c.isdigit()", "是否為數字字元", 'print("7".isdigit(), "x".isdigit())', "", "u05")
add("str", "c.isalpha()", "是否為英文字母", 'print("Q".isalpha(), "3".isalpha())', "", "u05")
add("str", "c.isupper() / c.islower()", "是否為大寫／小寫字母", 'print("A".isupper(), "a".isupper())', "", "u05")
add("str", "ord(c)", "字元 → 編號", 'print(ord("A"), ord("a"), ord("0"))', "", "u05")
add("str", "chr(n)", "編號 → 字元", 'print(chr(66), chr(98))', "", "u05")
add("str", 'ord(c) - ord("a")', "字母轉成 0～25 的索引", 'cnt = [0] * 26\nfor c in "banana":\n    cnt[ord(c) - ord("a")] += 1\nprint(cnt[0], cnt[1], cnt[13])', "", "u05")
# ---- 字典與集合 ----
add("dict", "d = {}", "建立空字典，用 d[鍵] = 值 存資料", 'd = {}\nd["a"] = 2\nprint(d)', "", "u05")
add("dict", "d.get(k, 0)", "取值；鍵不存在時回傳預設值", 'd = {"a": 3}\nprint(d.get("a", 0), d.get("z", 0))', "", "u05")
add("dict", "計數寫法", "d[k] = d.get(k, 0) + 1", 'cnt = {}\nfor w in ["a", "b", "a"]:\n    cnt[w] = cnt.get(w, 0) + 1\nprint(cnt)', "", "u05")
add("dict", "for k, v in d.items()", "同時走訪鍵與值", 'd = {"A": 2, "B": 5}\nfor k, v in d.items():\n    print(k, v)', "", "u05")
add("dict", "k in d", "判斷鍵是否存在", 'print("A" in {"A": 1}, "B" in {"A": 1})', "", "u05")
add("dict", "max(d, key=d.get)", "找出值最大的那個鍵", 'd = {"x": 2, "y": 7, "z": 1}\nbest = max(d, key=d.get)\nprint(best, d[best])', "", "u05")
add("dict", "s.add(x)", "集合：加入元素、判斷有沒有出現過", 's = set()\ns.add(3)\ns.add(3)\nprint(len(s), 3 in s)', "", "u04")
# ---- 二維串列 ----
add("grid", "[[0] * m for _ in range(n)]", "建立 n 列 m 行的二維串列", 'g = [[0] * 3 for _ in range(2)]\nprint(g)', "", "u08")
add("grid", "[[0] * m] * n（錯誤）", "每一列其實是同一個串列，改一格整行都變", 'g = [[0] * 3] * 2\ng[0][0] = 9\nprint(g)', "", "u08")
add("grid", "讀入 n 列矩陣", "每一列用 list(map(int, input().split()))", 'n, m = map(int, input().split())\ng = [list(map(int, input().split())) for _ in range(n)]\nprint(g)', "2 3\n1 2 3\n4 5 6", "u08")
add("grid", "len(g)、len(g[0])", "列數、行數", 'g = [[1, 2, 3], [4, 5, 6]]\nprint(len(g), len(g[0]))', "", "u08")
add("grid", "雙層走訪", "外層跑列、內層跑行", 'g = [[1, 2, 3], [4, 5, 6]]\nfor i in range(len(g)):\n    for j in range(len(g[0])):\n        print(g[i][j], end=" ")\n    print()', "", "u08")
add("grid", "方向陣列", "上右下左四個方向的位移", 'dr = [-1, 0, 1, 0]\ndc = [0, 1, 0, -1]\nr, c = 1, 1\nfor d in range(4):\n    print((r + dr[d], c + dc[d]), end=" ")\nprint()', "", "u08")
add("grid", "0 <= r < n and 0 <= c < m", "判斷座標有沒有出界", 'n, m = 3, 4\nfor r, c in [(0, 0), (3, 1), (2, -1)]:\n    print(0 <= r < n and 0 <= c < m, end=" ")\nprint()', "", "u08")
add("grid", "zip(*A)", "轉置：列變成行", 'A = [[1, 2, 3], [4, 5, 6]]\nprint([list(r) for r in zip(*A)])', "", "u08")
add("grid", "[row[::-1] for row in A]", "每一列左右翻轉", 'A = [[1, 2, 3], [4, 5, 6]]\nprint([row[::-1] for row in A])', "", "u08")
# ---- 函式、lambda、遞迴 ----
add("func", "def f(x): … return …", "定義函式並回傳結果", 'def area(w, h):\n    return w * h\n\nprint(area(3, 4))', "", "u06")
add("func", "預設參數", "呼叫時沒給就用預設值", 'def hi(name, times=2):\n    return name * times\n\nprint(hi("Py"), hi("Py", 3))', "", "u06")
add("func", "global", "函式裡要改外面的變數，要先宣告", 'total = 0\n\ndef add(x):\n    global total\n    total += x\n\nadd(5)\nadd(7)\nprint(total)', "", "u06")
add("func", "lambda 參數: 運算式", "一行的小函式（不用取名字也能用）", 'square = lambda x: x * x\nadd = lambda a, b: a + b\nprint(square(5), add(3, 4))', "", "u06")
add("func", "map(lambda …, a)", "對每個元素套用同一個運算", 'print(list(map(lambda x: x * x, [1, 2, 3])))', "", "u06")
add("func", "filter(lambda …, a)", "只留下條件成立的元素", 'print(list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4])))', "", "u06")
add("func", "math.gcd(a, b)", "最大公因數（內建）", 'import math\nprint(math.gcd(12, 18))', "", "u06")
add("func", "math.sqrt / math.isqrt", "開根號（小數）／整數開根號", 'import math\nprint(math.sqrt(16), math.isqrt(17))', "", "u06")
add("func", "math.floor / math.ceil", "無條件捨去／無條件進位", 'import math\nprint(math.floor(3.7), math.ceil(3.2))', "", "u06")
add("func", "遞迴：階乘", "n! = n × (n-1)!，終止條件 n <= 1", 'def fac(n):\n    if n <= 1:\n        return 1\n    return n * fac(n - 1)\n\nprint(fac(5))', "", "u09")
add("func", "遞迴：最大公因數", "gcd(a, b) = gcd(b, a % b)", 'def gcd(a, b):\n    if b == 0:\n        return a\n    return gcd(b, a % b)\n\nprint(gcd(76, 48))', "", "u09")
add("func", "遞迴 + 記憶化", "把算過的結果存起來，避免重複計算", 'memo = {}\n\ndef fib(n):\n    if n < 2:\n        return n\n    if n not in memo:\n        memo[n] = fib(n - 1) + fib(n - 2)\n    return memo[n]\n\nprint(fib(50))', "", "u09")
add("func", "deque（佇列）", "從頭取出用 popleft()，比串列的 pop(0) 快", 'from collections import deque\n\nq = deque([1, 2, 3])\nq.append(4)\nprint(q.popleft(), list(q))', "", "u09")
# ---- 排序、搜尋、效率 ----
add("sort", "a.sort()", "原地排序，沒有回傳值", 'a = [3, 1, 2]\na.sort()\nprint(a)', "", "u04")
add("sort", "sorted(a)", "回傳排好的新串列，原本的不變", 'a = [3, 1, 2]\nprint(sorted(a), a)', "", "u04")
add("sort", "reverse=True", "由大到小", 'print(sorted([3, 1, 2], reverse=True))', "", "u04")
add("sort", "key=lambda …", "依自訂規則排序", 'pts = [(1, 9), (3, 2), (2, 5)]\nprint(sorted(pts, key=lambda p: p[1]))', "", "u06")
add("sort", "key 回傳多個條件", "先比第一個、同分再比第二個（加負號＝由大到小）", 'data = [("Amy", 80), ("Bob", 95), ("Cat", 80)]\ndata.sort(key=lambda s: (-s[1], s[0]))\nprint(data)', "", "u06")
add("sort", "max(…, key=lambda …)", "依自訂規則找最大／最小", 'words = ["banana", "kiwi", "apple"]\nprint(max(words, key=lambda w: len(w)), min(words, key=lambda w: len(w)))', "", "u06")
add("sort", "bisect", "在已排序的串列裡做二分搜尋", 'import bisect\n\na = [1, 3, 5, 7]\nprint(bisect.bisect_left(a, 5), bisect.bisect_right(a, 5))', "", "u10")
add("sort", "二分搜尋", "每次砍掉一半，n 筆最多約 log₂n 次", 'a = [3 * k + 1 for k in range(100)]\nlow, high, cnt = 0, 99, 0\nwhile low <= high:\n    cnt += 1\n    mid = (low + high) // 2\n    if a[mid] == 100:\n        break\n    elif a[mid] < 100:\n        low = mid + 1\n    else:\n        high = mid - 1\nprint(mid, cnt)', "", "u10")
add("sort", "迴圈次數估算", "k 每次乘 2 的迴圈，約跑 log₂n 次", 'n, cnt, k = 20, 0, 1\nwhile k <= n:\n    cnt += 1\n    k *= 2\nprint(cnt)', "", "u10")
add("sort", "O( ) 時間複雜度", "只留最大項、去掉常數：兩層迴圈 n × m 次 → O(nm)", 'n, m, c = 4, 3, 0\nfor i in range(n):\n    for j in range(m):\n        c += 1\nprint(c)', "", "u10")

def main():
    here = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(here, "..", "data", "functions.js")
    rows, bad = [], 0
    for cat, fn, use, code, inp, unit in E:
        r = subprocess.run([sys.executable, "-c", code], input=inp + "\n", capture_output=True, text=True, timeout=20)
        if r.returncode:
            bad += 1; print("執行失敗：", fn, r.stderr.strip().splitlines()[-1]); continue
        rows.append({"cat": cat, "fn": fn, "use": use, "code": code, "inp": inp, "out": r.stdout.rstrip("\n"), "unit": unit})
    cats = [{"id": i, "title": t, "blurb": b} for i, t, b in CATS]
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("// 由 tools/build_functions.py 產生，請修改那支程式再重新執行，不要手改這個檔案。\n")
        f.write("export const FUNC_CATS = " + json.dumps(cats, ensure_ascii=False, indent=1) + ";\n")
        f.write("export const FUNCS = [\n" + ",\n".join(json.dumps(r, ensure_ascii=False) for r in rows) + "\n];\n")
    print(f"完成：{len(rows)} 個函式，失敗 {bad} 個 → data/functions.js")

if __name__ == "__main__":
    main()
