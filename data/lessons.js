// 教學單元。sections 內：h 標題、p 段落、ul 條列、code 範例（c 程式碼、inp 範例輸入，可在頁面上直接執行）、tip 提示、warn 注意。
// practice：must 必做題、more 挑戰題（題號必須存在於 problems.js）。行內 `code` 與 **粗體** 會自動轉換。
export const LESSONS = [
{id: "u01", title: "輸入、輸出與變數", sub: "寫出第一支會讀資料、算答案的程式。",
 goal: ["會用 `print()` 輸出、`input()` 讀入", "知道 int、float、str 的差別", "看懂評測結果 AC / WA / TLE / RE"],
 sections: [
  {h: "print：把結果印出來", p: ["`print()` 會把括號裡的東西印到畫面並自動換行。多個東西用逗號隔開，預設以空白分隔，可以用 `sep` 改。"],
   code: [{c: `print("Hello")
print(1 + 2)
print("a", "b", "c")
print("a", "b", sep="-")`}]},
  {h: "變數與資料型態", p: ["變數就是幫資料取名字。最常用的三種型態：整數 `int`、小數 `float`、字串 `str`，可以用 `type()` 查看。"],
   code: [{c: `x = 10
y = 3.5
name = "Amy"
print(type(x), type(y), type(name))
print(x + y)`}]},
  {h: "input：讀取輸入", p: ["`input()` 一次讀一行，**回傳的一定是字串**。要做數學運算，必須先用 `int()` 轉成整數。"],
   code: [{c: `a = input()
b = input()
print(a + b)
print(int(a) + int(b))`, inp: "3\n5"}],
   warn: "評測時 `input()` 括號裡不要放提示文字（例如 `input('請輸入：')`），提示會被當成輸出，結果就是 WA。"},
  {h: "一行有多個數字", p: ["`split()` 會把一行依空白切開，`map(int, ...)` 把每一段轉成整數。這是最常用的讀入寫法。"],
   code: [{c: `a, b = map(int, input().split())
print(a + b)`, inp: "3 5"}]},
  {h: "評測結果是什麼意思", ul: ["**AC**（Accepted）：全部測資都對。", "**WA**（Wrong Answer）：輸出不對，常見原因是格式、邊界值、多印或少印。", "**TLE**（Time Limit Exceeded）：程式跑太久，需要更有效率的做法。", "**RE**（Runtime Error）：程式執行到一半出錯，例如轉型失敗、索引超出範圍。"],
   tip: "答案要和題目的輸出格式一字不差：空白、換行都算。"}
 ],
 practice: {must: ["a001"], more: [], tip: "A+B 一行有兩個數字，記得用 `split()` 切開再轉成整數。"}},

{id: "u02", title: "運算子與條件判斷", sub: "讓程式會「算」、也會「選」。",
 goal: ["會用 `//`、`%`、`**` 等算術運算子", "會寫 `if / elif / else`", "會把文字規則轉成條件式"],
 sections: [
  {h: "算術運算子", ul: ["`/` 除法，結果一定是小數", "`//` 整數除法（商）、`%` 餘數", "`**` 次方"],
   code: [{c: `print(7 / 2)
print(7 // 2)
print(7 % 2)
print(2 ** 10)
print(-7 // 2)
print(-7 % 2)`}],
   warn: "負數的 `//` 是「往小的方向取整」，所以 -7 // 2 是 -4，不是 -3。"},
  {h: "比較與邏輯運算子", p: ["比較：`> < >= <= == !=`。邏輯：`and`、`or`、`not`。結果是 `True` 或 `False`。"],
   code: [{c: `x = 15
print(x > 10, x == 15, x != 3)
print(x > 10 and x < 20)
print(x < 5 or x % 5 == 0)
print(not x > 10)`}]},
  {h: "if / elif / else", p: ["Python 用**縮排**（通常 4 個空白）表示「屬於這個條件」。`=` 是指定，`==` 才是比較。"],
   code: [{c: `score = 75
if score >= 90:
    print("A")
elif score >= 60:
    print("B")
else:
    print("C")`}]},
  {h: "實戰：閏年", p: ["4 的倍數是閏年，但 100 的倍數不是，除非它又是 400 的倍數。"],
   code: [{c: `y = int(input())
if (y % 4 == 0 and y % 100 != 0) or y % 400 == 0:
    print("Yes")
else:
    print("No")`, inp: "2000"}],
   tip: "`and` 會比 `or` 先算，混用時加上括號最不容易錯。"}
 ],
 practice: {must: ["a014"], more: [], tip: "做完先自己測 2000、1900、2024、2023 這四個年份，確認答案符合預期再提交。"}},

{id: "u03", title: "迴圈", sub: "讓電腦替你重複做事。",
 goal: ["會用 `for` + `range()` 與 `while`", "會用累加、累乘的寫法", "看得懂巢狀迴圈、會用 `break`"],
 sections: [
  {h: "for 與 range", p: ["`range(n)` 是 0 到 n-1；`range(a, b)` 是 a 到 b-1（**不含 b**）；`range(a, b, k)` 每次增加 k。"],
   code: [{c: `for i in range(3):
    print(i)
print("---")
for i in range(1, 6):
    print(i, end=" ")
print()
for i in range(10, 0, -3):
    print(i, end=" ")
print()`}]},
  {h: "while：不知道要跑幾次", p: ["條件成立就一直重複。要確定迴圈裡有東西會讓條件最後變成 False，否則會變成無窮迴圈（TLE）。"],
   code: [{c: `n = 100
cnt = 0
while n > 0:
    n //= 2
    cnt += 1
print(cnt)`}]},
  {h: "累加與累乘", p: ["先準備一個起始值（加法從 0 開始、乘法從 1 開始），在迴圈裡一路更新。"],
   code: [{c: `total = 0
for i in range(1, 11):
    total += i
print(total)

f = 1
for i in range(2, 6):
    f *= i
print(f)`}]},
  {h: "巢狀迴圈與 break", p: ["迴圈裡面還有迴圈，內層會完整跑完一次，外層才前進一步。`break` 會立刻跳出所在的那一層迴圈。"],
   code: [{c: `for i in range(1, 4):
    for j in range(1, 4):
        print(i * j, end=" ")
    print()`}, {c: `for i in range(1, 100):
    if i * i > 50:
        print(i)
        break`}]},
  {h: "FizzBuzz 的思考方式", p: ["同時符合多個條件時，要**先判斷最嚴格的**（15 的倍數），再判斷 3、5 的倍數；否則 15 會被「3 的倍數」先攔走。"]}
 ],
 practice: {must: ["a012", "a030", "a009"], more: ["a005"], tip: "先做乘法表和 FizzBuzz 熟悉 `for` 與判斷。階乘注意 0! 是 1。費氏數列用迴圈一步步往後推。"}},

{id: "u04", title: "串列與輸入技巧", sub: "一次處理很多筆資料。",
 goal: ["會建立、索引、切片串列", "會讀入「一行多個數」與「多行」資料", "會用 `max`、`sum`、`sorted`、`set` 等工具"],
 sections: [
  {h: "串列基本操作", p: ["串列用 `[]` 建立，索引從 0 開始，`-1` 是最後一個。`a[1:3]` 取索引 1 到 2。"],
   code: [{c: `a = [5, 3, 8, 1]
print(a[0], a[-1])
a.append(9)
print(len(a), a)
print(a[1:3])`}]},
  {h: "讀入資料的兩種格式", p: ["第一種：一行放了所有數字。第二種：一行一個數字。看題目的輸入說明決定寫法。"],
   code: [{c: `n = int(input())
nums = list(map(int, input().split()))
print(n, nums)`, inp: "3\n10 20 30"}, {c: `n = int(input())
rows = [int(input()) for _ in range(n)]
print(rows)`, inp: "3\n4\n5\n6"}]},
  {h: "常用內建函式", code: [{c: `a = [4, 9, 2, 7]
print(max(a), min(a), sum(a), len(a))
print(sorted(a))
print(sorted(a, reverse=True))
a.sort()
print(a)`}], tip: "`sorted()` 回傳新串列；`a.sort()` 直接改變 a。"},
  {h: "走訪、過濾與輸出", p: ["串列生成式 `[x for x in a if 條件]` 可以一行篩選資料。輸出一排數字用 `print(*a)`，會以空白分隔。"],
   code: [{c: `a = [3, 8, 5, 12, 7]
evens = [x for x in a if x % 2 == 0]
print(evens)
for i, x in enumerate(a):
    if x > 6:
        print(i, x)
print(*a)`}]},
  {h: "set：去除重複", code: [{c: `a = [3, 1, 3, 2, 1]
print(set(a))
print(sorted(set(a)))
print(len(set(a)))`}]}
 ],
 practice: {must: ["a002", "a010", "a006"], more: ["a022", "a026"], tip: "輸出一排數字請用 `print(*nums)`。第二大的數：先用 `set` 去重再排序。"}},

{id: "u05", title: "字串", sub: "文字處理的基本功。",
 goal: ["會用索引、切片與反轉字串", "會走訪字元並計數", "認識常用字串方法、`ord` / `chr` 與字典計數"],
 sections: [
  {h: "索引與切片", p: ["字串和串列很像：可以索引、切片，`s[::-1]` 是反轉。但字串**不能直接修改**其中一個字元。"],
   code: [{c: `s = "hello"
print(s[0], s[-1], s[1:3])
print(s[::-1])
print(len(s))`}]},
  {h: "走訪字元與計數", code: [{c: `s = "banana"
cnt = 0
for c in s:
    if c == "a":
        cnt += 1
print(cnt)
print(s.count("an"))`}]},
  {h: "常用字串方法", code: [{c: `s = "Hello World"
print(s.upper(), s.lower())
print(s.split())
print("-".join(["a", "b", "c"]))
print(s.replace("l", "L"))
print("abc".isalpha(), "123".isdigit())`}]},
  {h: "字元與編號：ord / chr", p: ["`ord(c)` 取得字元的編號，`chr(n)` 把編號轉回字元。小寫 a 是 97，所以 `ord(c) - 97` 就是它在字母表的位置（a = 0）。"],
   code: [{c: `print(ord("a"), ord("A"))
print(chr(98))
print(chr((ord("z") - 97 + 3) % 26 + 97))`}],
   tip: "往後移再「繞回來」的題目，通常用 `% 26` 解決。"},
  {h: "回文與把數字當字串", code: [{c: `s = "level"
print(s == s[::-1])
n = "12345"
print(sum(int(c) for c in n))`}]},
  {h: "字典計數", p: ["字典 `dict` 用「鑰匙 → 值」存資料，最常用來計算每種東西出現幾次。`get(k, 0)` 表示沒有這把鑰匙時用 0。"],
   code: [{c: `s = "banana"
cnt = {}
for c in s:
    cnt[c] = cnt.get(c, 0) + 1
print(cnt)`}]}
 ],
 practice: {must: ["a003", "a011", "a007", "a013"], more: ["a016", "a023", "a028"], tip: "字串題先想：要走過每個字元嗎？要反轉嗎？再選工具。凱薩密碼注意 z 之後要接回 a。"}},

{id: "u06", title: "函式與數學小演算法", sub: "把重複的步驟包起來、用 lambda 寫一行小函式，並學會幾個經典數學技巧。",
 goal: ["會定義與呼叫函式", "會用 lambda 寫一行小函式，搭配 sorted / max / map / filter", "會判斷質數、做質因數分解", "會用輾轉相除法與進位轉換"],
 sections: [
  {h: "定義函式", p: ["`def` 定義函式，`return` 回傳結果。函式必須先定義才能呼叫。"],
   code: [{c: `def add(a, b):
    return a + b

def is_even(n):
    return n % 2 == 0

print(add(3, 4))
print(is_even(10), is_even(7))`}]},
  {h: "lambda：一行的小函式", p: ["`lambda 參數: 運算式` 可以不用 `def`，直接寫出一個小函式，結果就是那個運算式的值。適合只用一次、很短的函式。"],
   code: [{c: `square = lambda x: x * x
add = lambda a, b: a + b
print(square(5))
print(add(3, 4))`}],
   tip: "`lambda x: x * x` 等於 `def f(x): return x * x`，只是沒有名字，而且只能寫「一個運算式」。需要多行時還是用 `def`。"},
  {h: "lambda 最常見的用途：自訂排序與搜尋規則", p: ["`sorted()`、`max()`、`min()` 都有 `key=` 參數，告訴它「用什麼來比較」，這時候就是 lambda 派上用場的地方。"],
   code: [{c: `words = ["banana", "kiwi", "apple"]
print(sorted(words, key=lambda w: len(w)))
print(max(words, key=lambda w: w[-1]))

pts = [(1, 9), (3, 2), (2, 5)]
print(sorted(pts, key=lambda p: p[1]))`}, {c: `data = [("Amy", 80), ("Bob", 95), ("Cat", 80)]
data.sort(key=lambda s: (-s[1], s[0]))
print(data)`}],
   tip: "第二個範例很酷：`key` 回傳一組 `(-分數, 名字)`，就能做到「分數高的排前面，同分再依名字排」。分數加負號，是為了讓大的排前面。"},
  {h: "lambda 搭配 map 與 filter", p: ["`map(f, a)` 把 `f` 套用在每個元素上；`filter(f, a)` 只留下讓 `f` 回傳 True 的元素。"],
   code: [{c: `nums = [1, 2, 3, 4, 5, 6]
print(list(map(lambda x: x * x, nums)))
print(list(filter(lambda x: x % 2 == 0, nums)))`}],
   warn: "lambda 寫太長會很難讀。條件一多、或要重複使用，就改用 `def` 取一個好懂的名字。"},
  {h: "質數判斷：只需要試到 √n", p: ["如果 n 有因數，一定有一個因數 ≤ √n。所以只要檢查 2 到 √n，次數從 n 次降到約 √n 次。"],
   code: [{c: `def is_prime(n):
    if n < 2:
        return False
    i = 2
    while i * i <= n:
        if n % i == 0:
            return False
        i += 1
    return True

print([x for x in range(1, 20) if is_prime(x)])`}], warn: "1 不是質數。"},
  {h: "最大公因數與最小公倍數", p: ["輾轉相除法：gcd(a, b) = gcd(b, a % b)，做到餘數為 0。最小公倍數 = a × b ÷ gcd(a, b)。"],
   code: [{c: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

print(gcd(12, 18))
print(12 * 18 // gcd(12, 18))`}]},
  {h: "進位轉換", p: ["十進位轉二進位：一直除以 2，把餘數由後往前接起來。"],
   code: [{c: `n = 10
bits = ""
while n > 0:
    bits = str(n % 2) + bits
    n //= 2
print(bits)
print(bin(10)[2:], int("1010", 2))`}]},
  {h: "質因數分解", p: ["從 2 開始試除，能整除就一直除並記錄。最後如果還剩下大於 1 的數，它本身就是質數。"],
   code: [{c: `n = 360
res = []
p = 2
while p * p <= n:
    while n % p == 0:
        res.append(p)
        n //= p
    p += 1
if n > 1:
    res.append(n)
print(res)`}]}
 ],
 practice: {must: ["a008", "a015", "a004"], more: ["a024", "a017"], tip: "質數、質因數都只需要試到 √n。最小公倍數可以直接用剛學的 gcd。"}},

{id: "u07", title: "陣列掃描與雙層迴圈", sub: "用一次掃描或兩層迴圈解決「一排數字」的問題。",
 goal: ["會用「掃描一次 + 記錄狀態」解題", "會用雙層迴圈列舉所有配對", "認識切片旋轉與最大子陣列和"],
 sections: [
  {h: "掃描一次，記住目前狀態", p: ["例：找最長的連續遞增段。用 `cur` 記錄目前這段的長度，比前一個大就 +1，否則重設為 1，再用 `best` 記錄歷史最大值。"],
   code: [{c: `a = [1, 2, 3, 2, 3, 4, 5]
best = cur = 1
for i in range(1, len(a)):
    if a[i] > a[i - 1]:
        cur += 1
    else:
        cur = 1
    best = max(best, cur)
print(best)`}]},
  {h: "雙層迴圈列舉配對", p: ["要看「任兩個數」時，外層選第一個，內層從它後面開始選，這樣每一對只會算一次。"],
   code: [{c: `a = [1, 2, 3, 4]
t = 5
cnt = 0
for i in range(len(a)):
    for j in range(i + 1, len(a)):
        if a[i] + a[j] == t:
            cnt += 1
            print(a[i], a[j])
print(cnt)`}]},
  {h: "用切片旋轉", p: ["向右旋轉 k 次，就是把最後 k 個接到最前面。旋轉 n 次會回到原樣，所以先 `k %= n`。"],
   code: [{c: `a = [1, 2, 3, 4, 5]
n = len(a)
k = 7 % n
print(a[n - k:] + a[:n - k])`}]},
  {h: "最大連續子陣列和", p: ["`cur` 表示「以目前這個數結尾」的最大和：如果前面的和是負的，不如從自己重新開始。"],
   code: [{c: `a = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
best = cur = a[0]
for x in a[1:]:
    cur = max(x, cur + x)
    best = max(best, cur)
print(best)`}],
   warn: "初始值要用 `a[0]` 而不是 0，否則全部是負數時答案會錯。"}
 ],
 practice: {must: ["a018", "a020"], more: ["a025", "a027"], tip: "先用最小的例子測自己的程式：n = 1、全部相同、全部遞減。"}},

{id: "u08", title: "二維串列", sub: "表格、棋盤與網格。",
 goal: ["會正確建立二維串列", "會讀入與走訪表格", "會用方向陣列與邊界檢查"],
 sections: [
  {h: "建立二維串列", code: [{c: `grid = [[0] * 3 for _ in range(2)]
print(grid)
grid[1][2] = 5
print(grid)
bad = [[0] * 3] * 2
bad[0][0] = 9
print(bad)`}],
   warn: "`[[0] * 3] * 2` 兩列其實是同一個串列，改一列另一列也會跟著變。要用生成式建立。"},
  {h: "讀入並走訪表格", p: ["`g[i][j]` 是第 i 列第 j 行。外層迴圈走列，內層迴圈走行。"],
   code: [{c: `n, m = map(int, input().split())
g = [list(map(int, input().split())) for _ in range(n)]
for row in g:
    print(sum(row))
print(sum(g[i][i] for i in range(min(n, m))))`, inp: "2 3\n1 2 3\n4 5 6"}]},
  {h: "例：巴斯卡三角形", p: ["每一列的中間數字等於上一列相鄰兩數相加，頭尾都是 1。先印出目前這列，再算出下一列。"],
   code: [{c: `n = int(input())
row = [1]
for _ in range(n):
    print(*row)
    row = [1] + [row[i] + row[i + 1] for i in range(len(row) - 1)] + [1]`, inp: "5"}]},
  {h: "方向陣列與邊界檢查", p: ["走上下左右用一組 (dx, dy) 表示方向；走到新位置前要先確認沒有超出邊界。"],
   code: [{c: `dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
n = m = 3
x, y = 1, 1
for dx, dy in dirs:
    nx, ny = x + dx, y + dy
    if 0 <= nx < n and 0 <= ny < m:
        print(nx, ny)`}]}
 ],
 practice: {must: ["a029"], more: [], tip: "二維串列是 APCS 中級的主力題型，學會之後可以到 ZeroJudge 找網格相關的題目繼續練習。"}},

{id: "u09", title: "堆疊與遞迴", sub: "「後進先出」與「自己呼叫自己」。",
 goal: ["會用串列當堆疊（`append` / `pop`）", "會寫簡單遞迴並找出終止條件", "會追蹤遞迴的執行順序，並知道記憶化"],
 sections: [
  {h: "堆疊：後進先出", p: ["像疊盤子，最後放上去的最先拿走。串列的 `append()` 是推入，`pop()` 是取出最後一個。"],
   code: [{c: `stack = []
stack.append(1)
stack.append(2)
stack.append(3)
print(stack.pop())
print(stack)
print(len(stack) == 0)`}]},
  {h: "括號配對", p: ["只有一種括號時，用一個計數器就夠了：遇到 `(` 加 1、遇到 `)` 減 1，過程中不能小於 0、最後要剛好 0。"],
   code: [{c: `s = "(()())"
depth = 0
ok = True
for c in s:
    if c == "(":
        depth += 1
    else:
        depth -= 1
        if depth < 0:
            ok = False
            break
print(ok and depth == 0)`}],
   tip: "有 ()、[]、{} 多種括號時，計數器不夠用，要把左括號推進堆疊，遇到右括號時檢查「堆疊頂端」是否相配。"},
  {h: "遞迴", p: ["遞迴函式要有兩個部分：**終止條件**（不再呼叫自己）和**縮小問題**（呼叫自己時問題變小）。"],
   code: [{c: `def fact(n):
    if n <= 1:
        return 1
    return n * fact(n - 1)

print(fact(5))`}]},
  {h: "追蹤遞迴的執行順序", p: ["識讀題常考：`print` 放在遞迴呼叫「前」還是「後」，輸出順序完全不同。"],
   code: [{c: `def f(n):
    if n == 0:
        return
    print("進", n)
    f(n - 1)
    print("出", n)

f(3)`}]},
  {h: "記憶化：避免重複計算", p: ["純遞迴的費氏數列會一直重複算同樣的東西，n 一大就超時。把算過的結果存進字典，就能快很多。"],
   code: [{c: `memo = {}
def fib(n):
    if n < 2:
        return n
    if n not in memo:
        memo[n] = fib(n - 1) + fib(n - 2)
    return memo[n]

print(fib(50))`}]}
 ],
 practice: {must: ["a019"], more: ["a005"], tip: "括號配對有三種括號，要用堆疊。a005 費氏數列可以換個方式：用遞迴加記憶化再寫一次。"}},

{id: "u10", title: "複雜度與除錯", sub: "知道程式「夠不夠快」，以及卡住時怎麼找問題。",
 goal: ["會估算程式的運算次數", "認識篩法與用字典加速", "有一套找 WA、RE、TLE 的檢查清單"],
 sections: [
  {h: "估算次數", p: ["評測機大約每秒能跑 10⁶～10⁷ 次簡單運算（Python 偏慢）。用輸入大小 n 來估算："],
   ul: ["O(n)：n = 10⁵ 沒問題", "O(n log n)：排序，n = 10⁵ 沒問題", "O(n²)：n = 1000 沒問題，n = 10⁵ 一定超時", "O(√n)：質數判斷，n = 10⁹ 也沒問題"]},
  {h: "篩法：一次找出一堆質數", p: ["從 2 開始，遇到還沒被劃掉的數就是質數，並把它的倍數全部劃掉。比對每個數都試除快很多。"],
   code: [{c: `n = 30
sieve = [True] * (n + 1)
sieve[0] = sieve[1] = False
for i in range(2, n + 1):
    if sieve[i]:
        for j in range(i * i, n + 1, i):
            sieve[j] = False
print([i for i in range(n + 1) if sieve[i]])
print(sum(sieve))`}]},
  {h: "用字典把 O(n²) 變成 O(n)", p: ["兩數之和：掃過每個數 x 時，看「前面有幾個 t - x」，再把 x 記下來。只要掃一遍。"],
   code: [{c: `a = [1, 2, 3, 4, 2, 3]
t = 5
seen = {}
cnt = 0
for x in a:
    cnt += seen.get(t - x, 0)
    seen[x] = seen.get(x, 0) + 1
print(cnt)`}]},
  {h: "卡關時的檢查清單", ul: ["**WA**：自己造測資——最小的（0、1、空）、最大的、全部相同、已排序、完全反向；檢查輸出格式。", "**RE**：看錯誤訊息最後一行，常見是索引超出範圍、`int()` 轉型失敗、除以 0。", "**TLE**：先估算複雜度，看哪一層迴圈可以省掉；考慮用 `set` / `dict` / 篩法。"],
   tip: "用 `print()` 把中間變數印出來，是最簡單有效的除錯方法。提交前記得刪掉。"}
 ],
 practice: {must: ["a021"], more: ["a017", "a020", "a027"], tip: "回頭挑一題當初用雙層迴圈寫的題目，試著用 `dict` / `set` / 單次掃描改寫，感受時間差異。"}}
];
