// 每題的解析 (exp) 與 Python 參考程式碼 (py)。新增題目時請同步在這裡補上。
export const SOLUTIONS = {
a001: {exp: "用 split() 把一行拆成兩個字串，再用 map(int, ...) 轉成整數相加。Python 的整數不會溢位，10^9 等級也不用擔心。", py: `a, b = map(int, input().split())
print(a + b)`},
a002: {exp: "先讀 n，再把整行數字轉成 list，用內建的 max() 取最大值。時間 O(n)。", py: `n = int(input())
nums = list(map(int, input().split()))
print(max(nums))`},
a003: {exp: "s[::-1] 是把字串反轉。回文就是「反轉後和原本一樣」。", py: `s = input()
print("Yes" if s == s[::-1] else "No")`},
a004: {exp: "若 n 有因數，一定有一個 ≤ √n，所以只需要試除到 √n。n = 10^9 時最多約 31623 次。注意 1 不是質數。", py: `n = int(input())
ok = n >= 2
i = 2
while i * i <= n:      # 只需檢查到 √n
    if n % i == 0:
        ok = False
        break
    i += 1
print("Yes" if ok else "No")`},
a005: {exp: "迴圈 n 次，每次把 (a, b) 更新成 (b, a+b)，結束時 a 就是 F(n)。不要用純遞迴，n = 50 時會因為指數時間而超時。", py: `n = int(input())
a, b = 0, 1
for _ in range(n):
    a, b = b, a + b
print(a)`},
a006: {exp: "sort() 由小到大排序；print(*nums) 會把 list 展開，以空白分隔輸出。時間 O(n log n)。", py: `n = int(input())
nums = list(map(int, input().split()))
nums.sort()
print(*nums)`},
a007: {exp: "逐一檢查每個字元是否在「aeiou」裡，符合就算 1，最後加總。", py: `s = input()
print(sum(1 for c in s if c in "aeiou"))`},
a008: {exp: "輾轉相除法：gcd(a, b) = gcd(b, a mod b)，一直做到餘數為 0。也可以直接用 math.gcd。時間 O(log n)。", py: `a, b = map(int, input().split())
while b:
    a, b = b, a % b     # 輾轉相除法
print(a)`},
a009: {exp: "從 2 乘到 n。0! 與 1! 都是 1，迴圈不會執行，結果維持 1。18! 約 6.4 × 10^15，所以本題限制 n ≤ 18（C++ 要用 long long，用 int 在 13! 就會溢位）。", py: `n = int(input())
r = 1
for i in range(2, n + 1):
    r *= i
print(r)`},
a010: {exp: "x % 2 == 0 可判斷偶數，負數也適用（Python 中 -4 % 2 == 0）。沒有偶數時，空序列的 sum 是 0。", py: `n = int(input())
nums = list(map(int, input().split()))
print(sum(x for x in nums if x % 2 == 0))`},
a011: {exp: "切片 [::-1] 代表步長 -1，從尾到頭取，直接得到反轉後的字串。", py: `print(input()[::-1])`},
a012: {exp: "f-string 可以把變數和運算結果直接嵌進字串。注意輸出格式（空白與等號）要和題目完全一致。", py: `n = int(input())
for i in range(1, 10):
    print(f"{n} x {i} = {n * i}")`},
a013: {exp: "把數字當成字串處理，逐字元轉成整數再相加，這樣就不用擔心 100 位數太大。", py: `s = input()
print(sum(int(c) for c in s))`},
a014: {exp: "規則：4 的倍數是閏年，但 100 的倍數要排除，除非同時是 400 的倍數。所以 1900 不是閏年、2000 是。", py: `y = int(input())
leap = (y % 4 == 0 and y % 100 != 0) or y % 400 == 0
print("Yes" if leap else "No")`},
a015: {exp: "bin(n) 會得到像 '0b101' 的字串，用 [2:] 去掉前綴。n = 0 時 bin(0)[2:] 是 '0'，剛好符合題目要求。", py: `n = int(input())
print(bin(n)[2:])`},
a016: {exp: "ord 取得字元編號，減 97 讓 a 變成 0，加上 k 後對 26 取餘數就能繞回 a，最後加回 97 並用 chr 轉回字元。", py: `s = input()
k = int(input())
print("".join(chr((ord(c) - 97 + k) % 26 + 97) for c in s))`},
a017: {exp: "從 2 開始試除，能整除就一直除並記錄。小的質因數都除乾淨之後，如果 n 還大於 1，它本身就是最後一個質因數。複雜度 O(√n)。", py: `n = int(input())
res = []
p = 2
while p * p <= n:
    while n % p == 0:
        res.append(p)
        n //= p
    p += 1
if n > 1:               # 剩下的一定是質數
    res.append(n)
print(*res)`},
a018: {exp: "掃過一次：比前一個大就把目前連續長度 +1，否則重設為 1，同時記錄最大值。注意是「嚴格」遞增，相等不算。", py: `n = int(input())
a = list(map(int, input().split()))
best = cur = 1
for i in range(1, n):
    cur = cur + 1 if a[i] > a[i - 1] else 1
    best = max(best, cur)
print(best)`},
a019: {exp: "用堆疊：遇到左括號就推入，遇到右括號就必須和堆疊頂端的左括號相配。最後堆疊必須是空的，否則還有沒關上的括號。", py: `s = input()
pair = {")": "(", "]": "[", "}": "{"}
stack = []
ok = True
for c in s:
    if c in pair:
        if not stack or stack.pop() != pair[c]:
            ok = False
            break
    else:
        stack.append(c)
print("Yes" if ok and not stack else "No")`},
a020: {exp: "n ≤ 1000，雙層迴圈約 50 萬次比較就夠了。更快的做法是用字典記錄每個數出現的次數，掃一遍即可，時間 O(n)。", py: `n, t = map(int, input().split())
a = list(map(int, input().split()))
cnt = 0
for i in range(n):
    for j in range(i + 1, n):
        if a[i] + a[j] == t:
            cnt += 1
print(cnt)`},
a021: {exp: "埃拉托斯特尼篩法：從 2 開始，每遇到還沒被刪掉的數就是質數，並把它的倍數全部標記成非質數。時間約 O(n log log n)，比逐一試除快很多。", py: `n = int(input())
sieve = [True] * (n + 1)
cnt = 0
for i in range(2, n + 1):
    if sieve[i]:
        cnt += 1
        for j in range(i * i, n + 1, i):   # 把 i 的倍數刪掉
            sieve[j] = False
print(cnt)`},
a022: {exp: "先用 set 去除重複，再由大到小排序，第二個（索引 1）就是答案。", py: `n = int(input())
nums = sorted(set(map(int, input().split())), reverse=True)
print(nums[1])`},
a023: {exp: "用 i 指向一段的開頭，j 往後找到這一段的結尾，長度就是 j - i，然後把 i 跳到 j。每個字元只看一次，時間 O(n)。", py: `s = input()
res = []
i = 0
while i < len(s):
    j = i
    while j < len(s) and s[j] == s[i]:
        j += 1
    res.append(s[i] + str(j - i))
    i = j
print("".join(res))`},
a024: {exp: "lcm(a, b) = a × b ÷ gcd(a, b)。先除再乘可以避免中間值太大。本題限制在 10^6 以內，a × b 的結果不會太大。", py: `from math import gcd

a, b = map(int, input().split())
print(a // gcd(a, b) * b)`},
a025: {exp: "旋轉 n 次會回到原樣，所以先 k %= n。向右旋轉 k 次，就是把最後 k 個接到最前面。k = 0 時 a[n:] 是空的、a[:n] 是全部，結果仍然正確。", py: `n, k = map(int, input().split())
a = input().split()
k %= n                       # 轉 n 次等於沒轉
print(*(a[n - k:] + a[:n - k]))`},
a026: {exp: "list.index(t) 回傳第一次出現的索引（從 0 開始），所以要 +1。先用 in 檢查有沒有，沒有就輸出 -1，否則 index 會丟出錯誤。", py: `n, t = map(int, input().split())
a = list(map(int, input().split()))
print(a.index(t) + 1 if t in a else -1)`},
a027: {exp: "Kadane 演算法：cur 表示「以目前這個數結尾」的最大和。如果前面的和是負的，不如從自己重新開始。全部是負數時答案是最大的那個負數，所以初始值要用 a[0]，不能用 0。時間 O(n)。", py: `n = int(input())
a = list(map(int, input().split()))
best = cur = a[0]
for x in a[1:]:
    cur = max(x, cur + x)    # 接在前面，或從自己重新開始
    best = max(best, cur)
print(best)`},
a028: {exp: "split() 把句子切成單字，set 會自動去除重複，len 就是不同單字的個數。", py: `print(len(set(input().split())))`},
a029: {exp: "每一列的中間數字等於上一列相鄰兩數相加，頭尾都是 1。先印出目前這一列，再算出下一列。", py: `n = int(input())
row = [1]
for _ in range(n):
    print(*row)
    row = [1] + [row[i] + row[i + 1] for i in range(len(row) - 1)] + [1]`},
a030: {exp: "判斷順序很重要：要先檢查 15 的倍數，否則 15 會被「3 的倍數」條件先攔走，只印出 Fizz。", py: `n = int(input())
for i in range(1, n + 1):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`},
a031: {exp: "平均要「無條件捨去」，分數都是非負整數，所以用整數除法 sum(a) // n 就對了。最高、最低、不及格人數都只要掃過一遍，時間 O(n)。", py: `n = int(input())
a = list(map(int, input().split()))
print(max(a), min(a), sum(a) // n, sum(1 for x in a if x < 60))`},
a032: {exp: "遇到 ( 深度加 1、遇到 ) 深度減 1，過程中出現過的最大深度就是答案。因為保證括號合法，深度不會變成負的。時間 O(n)。", py: `s = input()
depth = best = 0
for c in s:
    if c == "(":
        depth += 1
        best = max(best, depth)
    else:
        depth -= 1
print(best)`},
a033: {exp: "雙層迴圈列舉所有 i < j 的配對，數出 a[i] > a[j] 的個數。n ≤ 1000 時約 50 萬次比較就夠了。更快的做法是在合併排序（merge sort）的過程中順便計算，時間 O(n log n)。", py: `n = int(input())
a = list(map(int, input().split()))
cnt = 0
for i in range(n):
    for j in range(i + 1, n):
        if a[i] > a[j]:
            cnt += 1
print(cnt)`},
a034: {exp: "旋轉後的第 j 列，就是原矩陣第 j 行「由下往上」讀出來的結果。外層迴圈跑 j，內層迴圈讓 i 從 n-1 倒數到 0，直接輸出即可。", py: `n, m = map(int, input().split())
a = [input().split() for _ in range(n)]
for j in range(m):
    print(" ".join(a[i][j] for i in range(n - 1, -1, -1)))`},
a035: {exp: "用方向陣列控制走向（右、下、左、上）：往前一格如果出界或已經填過，就右轉（d + 1）。每個格子剛好填一次，時間 O(n²)。", py: `n = int(input())
g = [[0] * n for _ in range(n)]
dr, dc = [0, 1, 0, -1], [1, 0, -1, 0]
r = c = d = 0
for k in range(1, n * n + 1):
    g[r][c] = k
    nr, nc = r + dr[d], c + dc[d]
    if not (0 <= nr < n and 0 <= nc < n and g[nr][nc] == 0):
        d = (d + 1) % 4              # 撞牆或撞到填過的格子，就右轉
        nr, nc = r + dr[d], c + dc[d]
    r, c = nr, nc
for row in g:
    print(*row)`},
a036: {exp: "掃描每個格子，遇到還沒走過的陸地就算一座新島，並用 DFS（這裡用堆疊）把整座島「淹掉」（改成 0），之後就不會重複計算。每個格子最多處理一次，O(nm)。遞迴版的 DFS 在島很大時，可能超過 Python 的遞迴深度上限，用堆疊比較安全。", py: `n, m = map(int, input().split())
g = [list(input()) for _ in range(n)]
cnt = 0
for i in range(n):
    for j in range(m):
        if g[i][j] == "1":
            cnt += 1
            g[i][j] = "0"
            stack = [(i, j)]
            while stack:
                r, c = stack.pop()
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < n and 0 <= nc < m and g[nr][nc] == "1":
                        g[nr][nc] = "0"
                        stack.append((nr, nc))
print(cnt)`},
a037: {exp: "「最少步數」（每一步成本相同）要用 BFS：從起點一層一層往外擴張，第一次碰到終點時走的步數就是最少步數。dist 陣列同時記錄「有沒有走過」與「走了幾步」。走不到終點時佇列會被清空，答案維持 -1。時間 O(nm)。", py: `from collections import deque

n, m = map(int, input().split())
g = [input() for _ in range(n)]
for i in range(n):
    for j in range(m):
        if g[i][j] == "S":
            sr, sc = i, j
dist = [[-1] * m for _ in range(n)]
dist[sr][sc] = 0
q = deque([(sr, sc)])
ans = -1
while q:
    r, c = q.popleft()
    if g[r][c] == "E":
        ans = dist[r][c]
        break
    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        nr, nc = r + dr, c + dc
        if 0 <= nr < n and 0 <= nc < m and g[nr][nc] != "#" and dist[nr][nc] == -1:
            dist[nr][nc] = dist[r][c] + 1
            q.append((nr, nc))
print(ans)`},
a038: {exp: "把 n 個盤子從 A 搬到 C：先把上面 n-1 個搬到 B（借用 C），再把最大的從 A 搬到 C，最後把 n-1 個從 B 搬到 C（借用 A）。總步數是 2^n - 1。這是遞迴最經典的例子：相信「n-1 個盤子的搬法」已經會了，只要處理最大的那一個。", py: `def hanoi(n, a, c, b):
    if n == 0:
        return
    hanoi(n - 1, a, b, c)
    print(a, c)
    hanoi(n - 1, b, c, a)

hanoi(int(input()), "A", "C", "B")`},
a039: {exp: "回溯法：每一層從「還沒用過」的數字中挑一個放進去，遞迴處理下一個位置，回來之後要「撤銷選擇」（pop 並把 used 設回 False）。因為每層都從小到大挑，輸出自然就是字典順序。Python 也可以直接用 itertools.permutations。", py: `n = int(input())
used = [False] * (n + 1)
cur = []

def dfs():
    if len(cur) == n:
        print(*cur)
        return
    for x in range(1, n + 1):
        if not used[x]:
            used[x] = True
            cur.append(x)
            dfs()
            cur.pop()
            used[x] = False

dfs()`},
a040: {exp: "一列放一個皇后，逐列嘗試每個欄位。用三個集合記錄已被佔用的「欄」、「左上到右下的斜線（r - c 相同）」與「右上到左下的斜線（r + c 相同）」，衝突就跳過。往下遞迴回來之後，要把剛放的皇后移除（回溯）。n = 8 時有 92 種放法。", py: `n = int(input())
cols, d1, d2 = set(), set(), set()

def place(r):
    if r == n:
        return 1
    total = 0
    for c in range(n):
        if c in cols or r - c in d1 or r + c in d2:
            continue
        cols.add(c); d1.add(r - c); d2.add(r + c)
        total += place(r + 1)
        cols.remove(c); d1.remove(r - c); d2.remove(r + c)
    return total

print(place(0))`},
a041: {exp: "dp[t] 表示湊出金額 t 所需的最少硬幣數：dp[t] = min(dp[t - c] + 1)。這題不能用貪心（先拿最大面額）：面額 1、3、4 要湊 6，貪心拿 4 + 1 + 1 要 3 枚，但 3 + 3 只要 2 枚。時間 O(kT)。", py: `k, T = map(int, input().split())
coins = list(map(int, input().split()))
INF = float("inf")
dp = [0] + [INF] * T
for t in range(1, T + 1):
    for c in coins:
        if c <= t and dp[t - c] + 1 < dp[t]:
            dp[t] = dp[t - c] + 1
print(dp[T] if dp[T] != INF else -1)`},
a042: {exp: "dp[c] 表示「容量 c 時的最大價值」。一件一件物品處理，容量要「由大到小」更新，才能保證每件物品最多只用一次（由小到大更新就變成每件可以無限拿）。時間 O(nW)。", py: `n, W = map(int, input().split())
dp = [0] * (W + 1)
for _ in range(n):
    w, v = map(int, input().split())
    for c in range(W, w - 1, -1):        # 容量由大到小，每件物品就不會被重複拿
        dp[c] = max(dp[c], dp[c - w] + v)
print(dp[W])`},
a043: {exp: "dp[i][j] 表示 A 的前 i 個字元與 B 的前 j 個字元的 LCS 長度。如果最後一個字元相同，就接在 dp[i-1][j-1] 後面加 1；不同的話，取「A 少看一個」或「B 少看一個」比較大的那個。時間 O(nm)。", py: `a = input()
b = input()
n, m = len(a), len(b)
dp = [[0] * (m + 1) for _ in range(n + 1)]
for i in range(1, n + 1):
    for j in range(1, m + 1):
        if a[i - 1] == b[j - 1]:
            dp[i][j] = dp[i - 1][j - 1] + 1
        else:
            dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
print(dp[n][m])`},
a044: {exp: "dp[i] 表示「以 a[i] 結尾」的最長遞增子序列長度：看前面每一個比 a[i] 小的 a[j]，取 dp[j] + 1 的最大值。這樣是 O(n²)，n ≤ 1000 剛好夠用；進階可以用二分搜尋維護一個「各長度最小結尾」的陣列，做到 O(n log n)。", py: `n = int(input())
a = list(map(int, input().split()))
dp = [1] * n
for i in range(n):
    for j in range(i):
        if a[j] < a[i] and dp[j] + 1 > dp[i]:
            dp[i] = dp[j] + 1
print(max(dp))`},
a045: {exp: "貪心：每次都選「最早結束」而且和已選活動不衝突的那一場，這樣留給後面的時間最多。先依結束時間排序（這裡用 lambda 當排序的依據），再一次掃過。結束時間剛好等於開始時間可以接著參加，所以條件是 s >= last。排序 O(n log n)。", py: `n = int(input())
acts = [tuple(map(int, input().split())) for _ in range(n)]
acts.sort(key=lambda x: x[1])           # 依結束時間排序
cnt, last = 0, -1
for s, e in acts:
    if s >= last:
        cnt += 1
        last = e
print(cnt)`},
a046: {exp: "「切得越短，能切出的段數越多」——有這種單調性，就可以對「答案」做二分搜尋：猜一個長度 mid，算 sum(w // mid) 是否 ≥ K；夠，就試試更長的；不夠，就縮短。只要檢查約 log₂(10^6) ≈ 20 次，每次 O(n)。", py: `n, K = map(int, input().split())
wood = list(map(int, input().split()))
lo, hi, ans = 1, max(wood), 0
while lo <= hi:
    mid = (lo + hi) // 2
    if sum(w // mid for w in wood) >= K:
        ans = mid                       # 可以，再試試更長的
        lo = mid + 1
    else:
        hi = mid - 1
print(ans)`}
,
a047: {exp: "斜邊 c = √(a² + b²)。Python 可以用 math.sqrt，或寫成 (a * a + b * b) ** 0.5，也可以直接用 math.hypot(a, b)。輸出固定 2 位小數要用格式化：f 字串裡的 :.2f。", py: `import math

a, b = map(int, input().split())
print(f"{math.sqrt(a * a + b * b):.2f}")`},
a048: {exp: "先排序，最後一個就是最長邊；再用「整數」的平方來比較 a² + b² == c²。不要用開根號再比較，浮點數會有誤差。", py: `a, b, c = sorted(map(int, input().split()))
print("Yes" if a * a + b * b == c * c else "No")`},
a049: {exp: "先算判別式 D = b² - 4ac（整數運算，不會有誤差）：D < 0 沒有實數解；D = 0 只有一個解 -b / 2a；D > 0 有兩個解 (-b ± √D) / 2a。注意：a 是負數時，「減號那個解」反而比較大，所以要用 min、max 排好順序再輸出。", py: `import math

a, b, c = map(int, input().split())
d = b * b - 4 * a * c
if d < 0:
    print("No real roots")
elif d == 0:
    print(f"{-b / (2 * a):.2f}")
else:
    r = math.sqrt(d)
    x1, x2 = (-b - r) / (2 * a), (-b + r) / (2 * a)
    print(f"{min(x1, x2):.2f} {max(x1, x2):.2f}")`},
a050: {exp: "距離公式就是畢氏定理：dx = x1 - x2、dy = y1 - y2，距離 = √(dx² + dy²)。Python 的 math.hypot(dx, dy) 可以直接算出來。", py: `import math

x1, y1, x2, y2 = map(int, input().split())
print(f"{math.hypot(x1 - x2, y1 - y2):.2f}")`},
a051: {exp: "面積 = π × r²，周長 = 2 × π × r，π 題目指定用 3.14159。輸出兩個數字、各自固定 2 位小數。", py: `r = int(input())
PI = 3.14159
print(f"{PI * r * r:.2f} {2 * PI * r:.2f}")`},
a052: {exp: "照公式算 C * 9 / 5 + 32，輸出固定 1 位小數：:.1f。Python 的 / 一定是小數除法，所以 9 / 5 不會變成 1。", py: `c = int(input())
print(f"{c * 9 / 5 + 32:.1f}")`},
a053: {exp: "第 n 項 = a + (n - 1) × d；前 n 項和 = n × (2a + (n - 1) × d) / 2（首項加末項，乘以項數再除以 2）。這個乘積一定是偶數，所以用整數除法 // 2 剛好整除。Python 的整數不會溢位；用 C++ 時數字會到 10^17 以上，要用 long long。", py: `a, d, n = map(int, input().split())
print(a + (n - 1) * d, n * (2 * a + (n - 1) * d) // 2)`},
a054: {exp: "每年的本利和是前一年的 (1 + r / 100) 倍，所以 n 年後是 P × (1 + r / 100)^n。Python 用 ** 做次方。也可以用迴圈一年一年乘上去，結果一樣。", py: `p, r, n = map(int, input().split())
print(f"{p * (1 + r / 100) ** n:.2f}")`},
a055: {exp: "用克拉瑪公式：D = a1·b2 - a2·b1，x = (c1·b2 - c2·b1) / D，y = (a1·c2 - a2·c1) / D。分子、分母都先用整數算好，最後才相除，誤差最小。D 不為 0 才有唯一解。", py: `a1, b1, c1 = map(int, input().split())
a2, b2, c2 = map(int, input().split())
d = a1 * b2 - a2 * b1
x = (c1 * b2 - c2 * b1) / d
y = (a1 * c2 - a2 * c1) / d
print(f"{x:.2f} {y:.2f}")`}
,
a056: {exp: "「一天一天加」最多要跑 10^9 次，一定超時。改成先把日期換成「從這一年 1 月 1 日起算的第幾天」，加上 k，再一次跳過很多年：任意連續 3 年恰好有一個貓年，所以每 3 年剛好 3 × 375 + 5 = 1130 天，可以用整數除法一次跳過。跳完之後，剩下的天數不到 3 年，再用迴圈逐年、逐月扣掉就好。每筆測資只需要常數時間。EOF 的輸入，Python 用 for line in sys.stdin 讀到結束；C++ 用 while (cin >> …)。", py: `import sys

def month_len(y, m):
    if m <= 5:
        return 40
    if m <= 9:
        return 35
    return 40 if y % 3 == 0 else 35

def year_len(y):
    return 380 if y % 3 == 0 else 375

for line in sys.stdin:
    if not line.strip():
        continue
    y, m, d, k = map(int, line.split())
    total = d - 1 + k + sum(month_len(y, i) for i in range(1, m))   # 從 y 年 1 月 1 日起算（第 0 天開始）
    q = total // 1130                                                # 每 3 年剛好 1130 天
    y += 3 * q
    total -= 1130 * q
    while total >= year_len(y):
        total -= year_len(y)
        y += 1
    m = 1
    while total >= month_len(y, m):
        total -= month_len(y, m)
        m += 1
    print(y, m, total + 1)`},
a057: {exp: "用堆疊處理巢狀：遇到 [ 時，先把「目前已經組好的字串 cur」和「這一段要重複的次數 k」一起收進堆疊，然後 cur 重新開始；遇到 ] 時，把堆疊頂端拿出來，新的 cur = 拿出來的字串 + 目前的 cur 重複 k 次。數字可能不只一位，所以遇到數字要用 k = k * 10 + 數字 累積起來。時間跟展開後的長度成正比。", py: `s = input()
stack = []
cur, k = "", 0
for ch in s:
    if ch.isdigit():
        k = k * 10 + int(ch)
    elif ch == "[":
        stack.append((cur, k))          # 先把目前組好的字串和重複次數收起來
        cur, k = "", 0
    elif ch == "]":
        prev, times = stack.pop()
        cur = prev + cur * times
    else:
        cur += ch
print(cur)`},
a058: {exp: "每次魔法如果真的把 l 到 r 一座座加上去，最壞要做 2500 × 10^6 次。改用「差分」：只在 diff[l] 加 v、在 diff[r + 1] 減 v，最後從左到右累加一遍（前綴和），就還原出每座水塔的水量。總時間 O(n + m)。水量最大會到 2500 × 10^6 = 2.5 × 10^9，超過 32 位元整數的範圍，C++ 要用 long long。找最高的水塔時，只在「嚴格大於」目前最大值時才更新編號，就會保留編號最小的那座。", py: `n, m, T = map(int, input().split())
diff = [0] * (n + 2)
for _ in range(m):
    l, r, v = map(int, input().split())
    diff[l] += v
    diff[r + 1] -= v
cur = best = cnt = 0
pos = 1
for i in range(1, n + 1):
    cur += diff[i]                      # 前綴和：還原第 i 座水塔的水量
    if cur > best:
        best, pos = cur, i
    if cur >= T:
        cnt += 1
print(best, pos, cnt)`},
a059: {exp: "K 最大有 10^9，不可能真的做 K 輪。把「每一輪開始時的狀態」（位置 + 方向）記下來：狀態最多只有 R × C × 4 = 1600 種，所以最多模擬 1600 多輪，就一定會遇到之前出現過的狀態，之後就是不斷繞圈。找到重複的那一刻，設第一次出現在第 s 輪、現在是第 rounds 輪，繞一圈的長度 cyc = rounds - s，那麼 K 輪之後的狀態，就等於第 s + (K - s) % cyc 輪開始時的狀態。站過的格子，在模擬到發現重複之前就已經全部走過了，所以直接數集合的大小即可。", py: `R, C, K = map(int, input().split())
g = [input() for _ in range(R)]
cmd = input()
for i in range(R):
    for j in range(C):
        if g[i][j] == "S":
            r, c = i, j
dr, dc = [-1, 0, 1, 0], [0, 1, 0, -1]       # 北、東、南、西
d = 0
seen = {(r, c)}
first = {}                                    # 某個「一輪開始時的狀態」第一次出現在第幾輪
states = []
rounds = 0
while rounds < K:
    state = (r, c, d)
    if state in first:
        s = first[state]
        cyc = rounds - s
        r, c, d = states[s + (K - s) % cyc]
        break
    first[state] = rounds
    states.append(state)
    for ch in cmd:
        if ch == "L":
            d = (d - 1) % 4
        elif ch == "R":
            d = (d + 1) % 4
        else:
            nr, nc = r + dr[d], c + dc[d]
            if 0 <= nr < R and 0 <= nc < C and g[nr][nc] != "#":
                r, c = nr, nc
                seen.add((r, c))
    rounds += 1
print(r + 1, c + 1, "NESW"[d])
print(len(seen))`},
a060: {exp: "先排序再算名次。排序的規則有三層：解題數由大到小、罰時由小到大、隊名由小到大，所以用 key=lambda x: (-解題數, 罰時, 隊名)（把解題數加負號，就能讓大的排前面）。名次的算法：只有在「成績和前一名不同」的時候，才把名次更新成目前的位置 i + 1；成績相同就沿用上一個名次，這樣並列之後的下一名會自動跳號。時間 O(n log n)。", py: `n = int(input())
teams = []
for _ in range(n):
    name, s, t = input().split()
    teams.append((name, int(s), int(t)))
teams.sort(key=lambda x: (-x[1], x[2], x[0]))
rank = 0
for i, (name, s, t) in enumerate(teams):
    if i == 0 or (s, t) != (teams[i - 1][1], teams[i - 1][2]):
        rank = i + 1                    # 成績不同才更新名次
    print(rank, name, s, t)`}

};
