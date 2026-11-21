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
        print(i)`}
};
