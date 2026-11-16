#!/usr/bin/env python3
"""產生 data/lessons_cpp.js（C++ 教學單元）。
用法：python tools/build_cpp_lessons.py（需要 g++）
每個範例都會用 g++ -std=c++17 真的編譯、執行，「執行結果」是跑出來的，不要手寫。
想改教學內容：改這支程式的 UNITS，再重新執行。"""
import json, os, subprocess, sys, tempfile

def sec(h, p=(), code=(), ul=None, tip=None, warn=None):
    return {"h": h, "p": list(p), "ul": ul, "code": [c if isinstance(c, tuple) else (c, "") for c in code], "tip": tip, "warn": warn}

def unit(id, title, sub, goal, sections, must, more=(), tip=""):
    return {"id": id, "title": title, "sub": sub, "goal": goal, "sections": sections, "practice": {"must": list(must), "more": list(more), "tip": tip}}

H = "#include <bits/stdc++.h>\nusing namespace std;\n\n"
UNITS = [
unit("c01", "第一支 C++ 程式：輸入、輸出與變數", "認識 C++ 程式的骨架，會用 cin / cout 讀寫資料。",
 ["看得懂 `#include`、`main`、`cout` 的作用", "知道 int、long long、double、char、string 的差別", "會用 cin 讀入多筆資料，並知道什麼時候要用 long long"],
 [
  sec("程式的骨架", [r"`#include` 引入需要的工具，`main` 是程式開始執行的地方，`cout << …` 輸出。`<<` 可以一直接下去，`endl` 代表換行（也可以寫 `\"\\n\"`）。每個敘述都要以 `;` 結尾。"],
      [r'''#include <iostream>
using namespace std;

int main() {
    cout << "Hello" << endl;
    cout << 1 + 2 << endl;
    return 0;
}'''],
      tip="之後的範例都用 `#include <bits/stdc++.h>`，一次引入所有常用工具（寫競賽題很方便，但這是 GCC 才有的寫法）。"),
  sec("變數與資料型態", ["C++ 的變數要**先宣告型態**。常用的型態："],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    int a = 7;
    long long big = 3000000000LL;
    double pi = 3.14;
    char c = 'A';
    bool ok = true;
    string s = "Hi";
    cout << a << " " << big << " " << pi << " " << c << " " << ok << " " << s << endl;
    cout << a / 2 << " " << a / 2.0 << endl;
}'''],
      ul=["`int`：整數，約 ±21 億", "`long long`：大整數，約 ±9 × 10^18", "`double`：小數", "`char`：一個字元（用單引號 `'A'`）", "`bool`：true / false（印出來是 1 / 0）", "`string`：字串（用雙引號）"],
      warn="整數除以整數還是整數：`7 / 2` 是 3。要小數就要有一邊是 double，例如 `7 / 2.0`。"),
  sec("cin：讀取輸入", ["`cin >> 變數` 會依序讀入資料，**自動跳過空白和換行**，所以「一行多個數字」和「一行一個數字」寫法完全一樣。"],
      [(r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    string name;
    cin >> name;
    cout << "Hi, " << name << endl;
}''', "3 5\nAmy")]),
  sec("溢位：int 裝不下的時候", ["數字超過型態能裝的範圍就會「溢位」，答案會變得莫名其妙，而且不會有任何錯誤訊息。題目數字大（超過 10^9 級）時，一律改用 `long long`。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    int a = 100000;
    cout << a * a << endl;
    cout << (long long)a * a << endl;
}'''], warn="這是 C++ 初學者最常見的 WA 原因：兩個 10^9 相加就已經超過 int 了。"),
  sec("輸出小數", ["用 `fixed` 和 `setprecision(n)` 指定小數位數。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << 3.14159 << endl;
    cout << fixed << setprecision(2) << 3.14159 << endl;
}'''], tip="輸出量很大時，用 `\"\\n\"` 比 `endl` 快很多（`endl` 每次都會強制把資料送出去）。"),
 ], ["a001"], [], "A+B 的數字最大 10^9，兩個加起來會超過 int，記得用 long long。"),

unit("c02", "運算子與條件判斷", "讓程式會「算」，也會「選」。",
 ["會用 `/`、`%` 與比較、邏輯運算子", "會寫 `if / else if / else`、三元運算子與 `switch`", "知道 C++ 的負數除法和 Python 不一樣"],
 [
  sec("算術運算子", ["`+ - * / %`。整數 `/` 是整數除法，`%` 是餘數。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << 17 / 5 << " " << 17 % 5 << endl;
    cout << -7 / 2 << " " << -7 % 2 << endl;
    cout << 17 / 5.0 << endl;
    cout << (double)17 / 5 << endl;
}'''],
      warn="C++ 的整數除法是「往 0 取整」：`-7 / 2` 是 -3、`-7 % 2` 是 -1。Python 是 -4 和 1，兩邊不一樣！"),
  sec("比較與邏輯運算子", ["比較：`> < >= <= == !=`。邏輯：`&&`（且）、`||`（或）、`!`（非）。結果是 true / false，印出來是 1 / 0。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    int x = 15;
    cout << (x > 10) << (x == 15) << (x != 3) << endl;
    cout << (x > 10 && x < 20) << endl;
    cout << (x < 5 || x % 5 == 0) << endl;
    cout << !(x > 10) << endl;
}'''],
      warn="想判斷 x 在 0 到 10 之間，要寫成 `0 < x && x < 10`。寫成 `0 < x < 10` 不會報錯，但意思完全不一樣（結果會錯）。另外，`=` 是指定、`==` 才是比較。"),
  sec("if / else if / else", ["條件要放在小括號裡，執行的內容用大括號 `{ }` 包起來（只有一行時可以省略，但建議都寫）。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    int score = 75;
    if (score >= 90) {
        cout << "A" << endl;
    } else if (score >= 60) {
        cout << "B" << endl;
    } else {
        cout << "C" << endl;
    }
}''']),
  sec("三元運算子與 switch", ["`條件 ? 甲 : 乙` 是一行的 if。`switch` 適合「某個整數剛好等於哪幾種值」的情況，每個 `case` 後面要記得 `break`。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    int n = 7;
    cout << (n % 2 ? "odd" : "even") << endl;
    int d = 3;
    switch (d) {
        case 1: cout << "Mon" << endl; break;
        case 2: cout << "Tue" << endl; break;
        case 3: cout << "Wed" << endl; break;
        default: cout << "?" << endl;
    }
}''']),
  sec("實戰：閏年", ["4 的倍數是閏年，但 100 的倍數不是，除非又是 400 的倍數。"],
      [(r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    int y;
    cin >> y;
    if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) cout << "Yes" << endl;
    else cout << "No" << endl;
}''', "2000")], tip="`&&` 比 `||` 先算，混用時加括號最安全。"),
 ], ["a014"], [], "先自己測 2000、1900、2024、2023 四個年份，確認答案正確再提交。"),

unit("c03", "迴圈", "讓電腦替你重複做事。",
 ["會用 `for`、`while`、`do-while`", "會用累加、累乘，並選對型態", "看得懂巢狀迴圈，會用 `break` / `continue`"],
 [
  sec("for 迴圈", [r"`for (起始; 條件; 每次做完要做的事)`。`i++` 是 `i = i + 1`，`i -= 3` 是 `i = i - 3`。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    for (int i = 0; i < 3; i++) cout << i << " ";
    cout << endl;
    for (int i = 10; i > 0; i -= 3) cout << i << " ";
    cout << endl;
}'''], tip="`i < n` 不含 n；想包含 n 就寫 `i <= n`。"),
  sec("while 與 do-while", ["`while` 先判斷再做；`do { … } while (條件);` 會**至少做一次**，再判斷。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    int n = 100, cnt = 0;
    while (n > 0) {
        n /= 2;
        cnt++;
    }
    cout << cnt << endl;
    int x = 5;
    do {
        cout << x << " ";
        x--;
    } while (x > 3);
    cout << endl;
}''']),
  sec("累加與累乘", ["先放好起始值（加法 0、乘法 1），在迴圈裡一路更新。數字會變很大時，變數要用 `long long`。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    int sum = 0;
    for (int i = 1; i <= 10; i++) sum += i;
    cout << sum << endl;
    long long f = 1;
    for (int i = 2; i <= 5; i++) f *= i;
    cout << f << endl;
}''']),
  sec("巢狀迴圈、break 與 continue", ["內層會完整跑完一次，外層才前進一步。`break` 跳出所在的那層迴圈，`continue` 跳過這一輪。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) cout << i * j << " ";
        cout << endl;
    }
    for (int i = 1; i < 100; i++) {
        if (i * i > 50) {
            cout << i << endl;
            break;
        }
    }
}''']),
  sec("FizzBuzz 的思考方式", ["同時符合多個條件時，要**先判斷最嚴格的**（15 的倍數），再判斷 3、5 的倍數；否則 15 會被「3 的倍數」先攔走。"]),
 ], ["a012", "a030", "a009"], ["a005"], "先做乘法表和 FizzBuzz 熟悉 for 與判斷。階乘要用 long long；費氏數列用迴圈一步步往後推。"),

unit("c04", "陣列與 vector", "一次處理很多筆資料。",
 ["會宣告、讀入、走訪陣列與 vector", "會用 `sort`、`max_element` 等工具", "會用二維陣列，並知道陣列要小心的地方"],
 [
  sec("陣列", ["陣列是同一種型態的一排資料，索引從 0 開始。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    int a[5] = {5, 3, 8, 1, 9};
    cout << a[0] << " " << a[4] << endl;
    int sum = 0;
    for (int i = 0; i < 5; i++) sum += a[i];
    cout << sum << endl;
}'''],
      warn="索引超出範圍時 C++ **不會報錯**，只會讀到亂七八糟的值或直接當掉。大陣列（例如 10^6 個）要宣告在 `main` 外面（全域），放在裡面會爆掉。"),
  sec("讀入一排資料", ["先讀個數 n，再用迴圈一個一個讀進陣列。"],
      [(r'''#include <bits/stdc++.h>
using namespace std;

int a[1005];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];
    int mx = a[0];
    for (int i = 1; i < n; i++) mx = max(mx, a[i]);
    cout << mx << endl;
}''', "5\n3 9 2 7 1")]),
  sec("vector：會自己長大的陣列", ["不知道有幾筆資料、或想用 `push_back` 一個個加進去時，用 `vector`。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v;
    for (int i = 1; i <= 5; i++) v.push_back(i * i);
    cout << v.size() << " " << v.back() << endl;
    for (int x : v) cout << x << " ";
    cout << endl;
    vector<int> w(3, 7);
    cout << w[0] + w[2] << endl;
}'''], tip="`for (int x : v)` 是「依序取出每個元素」的簡潔寫法；想直接修改元素要寫 `for (int &x : v)`。"),
  sec("排序與找最大值", ["`sort(開頭, 結尾)` 預設由小到大。`v.begin()` 和 `v.end()` 代表整個 vector；`rbegin / rend` 是反方向，所以排出來是由大到小。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v = {4, 9, 2, 7};
    sort(v.begin(), v.end());
    for (int x : v) cout << x << " ";
    cout << endl;
    sort(v.rbegin(), v.rend());
    for (int x : v) cout << x << " ";
    cout << endl;
    cout << *max_element(v.begin(), v.end()) << endl;
}''']),
  sec("二維陣列", ["`g[i][j]` 是第 i 列第 j 行。大小不固定時用 vector 的 vector。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    int g[2][3] = {{1, 2, 3}, {4, 5, 6}};
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) cout << g[i][j] << " ";
        cout << endl;
    }
    vector<vector<int>> h(2, vector<int>(3, 0));
    h[1][2] = 5;
    cout << h[1][2] << " " << h[0][0] << endl;
}''']),
  sec("掃描一次、記住狀態", ["例：找最長的連續遞增段。用 `cur` 記錄目前這段的長度，比前一個大就加 1，否則重設為 1，再用 `best` 記錄最大值。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> a = {1, 2, 3, 2, 3, 4, 5};
    int best = 1, cur = 1;
    for (size_t i = 1; i < a.size(); i++) {
        if (a[i] > a[i - 1]) cur++;
        else cur = 1;
        best = max(best, cur);
    }
    cout << best << endl;
}''']),
 ], ["a002", "a010", "a006"], ["a018", "a020", "a025", "a026", "a027", "a029"], "先做前三題熟悉讀入與排序。總和、乘積可能很大，記得用 long long。"),

unit("c05", "字串 string", "文字處理的基本功。",
 ["會用 `string` 的長度、索引、串接與 `substr`", "會用 `cin` 與 `getline` 讀字串", "會用字元運算與常用函式，並用陣列 / map 計數"],
 [
  sec("string 基本操作", ["`string` 可以用 `+` 串接、用 `[ ]` 取字元、用 `size()` 取長度。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    string s = "hello";
    cout << s.size() << " " << s[0] << " " << s.back() << endl;
    s += " world";
    cout << s << endl;
    cout << s.substr(0, 5) << "|" << s.substr(6) << endl;
}''']),
  sec("讀字串：cin 與 getline", ["`cin >> s` 讀到空白就停；要讀「含空白的一整行」用 `getline(cin, s)`。"],
      [(r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    string a, line;
    cin >> a;
    getline(cin, line);
    cout << "[" << a << "][" << line << "]" << endl;
}''', "hello world\nbye")],
      warn="`cin >>` 讀完後，那一行剩下的內容（包含換行）還留著，馬上接 `getline` 會讀到殘留的部分。常見解法是先多一個 `getline` 把它吃掉。"),
  sec("走訪字元與字元運算", ["`char` 其實是一個小整數（ASCII 編號），可以做加減。`c - '0'` 把數字字元變成數字，`c - 'a'` 是字母在 0～25 的位置。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    string s = "banana";
    int cnt = 0;
    for (char c : s)
        if (c == 'a') cnt++;
    cout << cnt << endl;
    cout << '7' - '0' << " " << 'd' - 'a' << " " << char('a' + 3) << " " << (char)toupper('q') << endl;
}''']),
  sec("常用函式", ["`find` 找子字串（找不到會回傳 `string::npos`）、`reverse` 反轉、`sort` 也能排字串；`stoi` 把字串轉整數，`to_string` 把數字轉字串。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    string s = "banana";
    cout << s.find("na") << " " << (s.find("z") == string::npos) << endl;
    reverse(s.begin(), s.end());
    cout << s << endl;
    sort(s.begin(), s.end());
    cout << s << endl;
    cout << stoi("123") + 1 << " " << to_string(45) + "6" << endl;
}''']),
  sec("計數：陣列與 map", ["字母只有 26 種，開一個 `cnt[26]` 最快；種類不固定時用 `map`（會自動依鍵排序）。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    int cnt[26] = {};
    for (char c : string("banana")) cnt[c - 'a']++;
    cout << cnt[0] << cnt[1] << cnt[13] << endl;
    map<char, int> m;
    for (char c : string("banana")) m[c]++;
    for (auto &p : m) cout << p.first << p.second << " ";
    cout << endl;
}''']),
 ], ["a003", "a011", "a007", "a013"], ["a016", "a023", "a028"], "字串題先想：要走過每個字元嗎？要反轉嗎？再選工具。凱薩密碼要記得 z 之後接回 a。"),

unit("c06", "函式與 lambda", "把重複的步驟包起來，並學會寫 lambda。",
 ["會定義函式、了解傳值與傳參考", "會寫判斷質數、最大公因數的小函式", "會用 lambda（沒有名字的小函式）搭配 `sort` 自訂排序"],
 [
  sec("定義函式", ["函式的格式：`回傳型態 名字(參數) { … return …; }`。函式要寫在被呼叫的地方**之前**。沒有回傳值的函式，型態寫 `void`。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int add(int a, int b) { return a + b; }
bool isEven(int n) { return n % 2 == 0; }

int main() {
    cout << add(3, 4) << " " << isEven(10) << isEven(7) << endl;
}''']),
  sec("傳值與傳參考", ["預設是「傳值」：函式拿到的是**複製品**，改了不影響原本的變數。參數前面加 `&` 變成「傳參考」，改的就是原本那個。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

void bad(int a, int b) { int t = a; a = b; b = t; }
void good(int &a, int &b) { int t = a; a = b; b = t; }

int main() {
    int x = 1, y = 2;
    bad(x, y);
    cout << x << y << endl;
    good(x, y);
    cout << x << y << endl;
}'''], tip="傳 vector 給函式時，也建議寫成 `const vector<int> &v`，避免整個複製一份（又慢又浪費記憶體）。"),
  sec("經典小函式：質數與最大公因數", ["質數只需要試到 √n。最大公因數用輾轉相除法，C++17 也有現成的 `gcd`。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; (long long)i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}
int myGcd(int a, int b) { return b == 0 ? a : myGcd(b, a % b); }

int main() {
    for (int i = 1; i < 20; i++)
        if (isPrime(i)) cout << i << " ";
    cout << endl;
    cout << myGcd(12, 18) << " " << __gcd(12, 18) << " " << gcd(12, 18) << endl;
}''']),
  sec("lambda：沒有名字的小函式", [r"`[](參數) { 內容 }` 就是一個 lambda，可以直接放進變數（用 `auto`）或當成參數。中括號 `[ ]` 可以把外面的變數「帶進來」：`[base]` 是複製一份，`[&]` 是全部用參考。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    auto square = [](int x) { return x * x; };
    auto add = [](int a, int b) { return a + b; };
    cout << square(5) << " " << add(3, 4) << endl;
    int base = 10;
    auto addBase = [base](int x) { return x + base; };
    cout << addBase(5) << endl;
}''']),
  sec("lambda 最常見的用途：自訂排序", ["`sort` 的第三個參數可以放一個「比較函式」：傳回 `true` 代表 a 應該排在 b 前面。用 lambda 就能一行搞定，作用和 Python 的 `key=lambda` 一樣。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<pair<string, int>> v = {{"Amy", 80}, {"Bob", 95}, {"Cat", 80}};
    sort(v.begin(), v.end(), [](const pair<string, int> &a, const pair<string, int> &b) {
        if (a.second != b.second) return a.second > b.second;
        return a.first < b.first;
    });
    for (auto &p : v) cout << p.first << " " << p.second << endl;
}'''], tip="這個比較函式的意思是：分數高的排前面，同分再依名字由小到大排。")
 ], ["a008", "a015", "a004"], ["a024", "a017", "a021"], "質數、質因數都只需要試到 √n；最小公倍數可以直接用 gcd。"),

unit("c07", "STL 容器：pair、set、map、stack、queue", "C++ 內建的資料結構，競賽與 APCS 的好幫手。",
 ["會用 `pair`、`set`、`map`", "會用 `stack`（後進先出）與 `queue`（先進先出）", "會用 stack 檢查括號配對"],
 [
  sec("pair：一對資料", ["`pair<A, B>` 把兩個值綁在一起，用 `.first` 和 `.second` 取出。放進 vector 排序時，會先比 first、再比 second。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    pair<int, int> p = {3, 5};
    cout << p.first << " " << p.second << endl;
    vector<pair<int, int>> v = {{2, 9}, {1, 5}, {1, 2}};
    sort(v.begin(), v.end());
    for (auto &x : v) cout << x.first << "," << x.second << " ";
    cout << endl;
}''']),
  sec("set：不重複、自動排序", ["`set` 會自動去除重複並由小到大排好；`insert` 加入、`count` 查有沒有、`erase` 刪除。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    set<int> s;
    for (int x : {3, 1, 3, 2, 1}) s.insert(x);
    cout << s.size() << endl;
    for (int x : s) cout << x << " ";
    cout << endl;
    cout << s.count(2) << s.count(9) << endl;
    cout << *s.begin() << " " << *s.rbegin() << endl;
}''']),
  sec("map：鍵對應到值", ["`map<鍵, 值>` 適合計數、查表。`m[鍵]++` 在鍵不存在時會自動從 0 開始。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    map<string, int> cnt;
    for (string w : {"a", "b", "a", "c", "a"}) cnt[w]++;
    for (auto &p : cnt) cout << p.first << "=" << p.second << " ";
    cout << endl;
    cout << cnt.count("z") << " " << cnt["a"] << endl;
}'''], warn="用 `m[鍵]` 讀取一個不存在的鍵，會順便「建立」它（值是 0）。只想查有沒有，請用 `count`。"),
  sec("stack 與 queue", ["`stack`：後進先出，只能看和拿最上面的（`top`、`pop`）。`queue`：先進先出，從前面拿（`front`、`pop`）。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    stack<int> st;
    st.push(1); st.push(2); st.push(3);
    cout << st.top() << " ";
    st.pop();
    cout << st.top() << " " << st.size() << endl;
    queue<int> q;
    q.push(1); q.push(2); q.push(3);
    cout << q.front() << " ";
    q.pop();
    cout << q.front() << " " << q.size() << endl;
}''']),
  sec("實戰：括號配對", ["遇到左括號就推進 stack，遇到右括號就檢查最上面的是不是對應的左括號。最後 stack 必須是空的。"],
      [(r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;
    stack<char> st;
    bool ok = true;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') st.push(c);
        else {
            char need = c == ')' ? '(' : c == ']' ? '[' : '{';
            if (st.empty() || st.top() != need) { ok = false; break; }
            st.pop();
        }
    }
    cout << (ok && st.empty() ? "Yes" : "No") << endl;
}''', "([]{})")]),
 ], ["a022", "a028", "a019"], [], "第二大的數可以用 set 去重；不同單字數就是把單字全丟進 set 再看 size。"),

unit("c08", "遞迴與複雜度", "「自己呼叫自己」，以及估算程式夠不夠快。",
 ["會寫簡單遞迴並找出終止條件", "知道記憶化可以避免重複計算", "會估算運算次數，養成好習慣"],
 [
  sec("遞迴", ["遞迴函式要有**終止條件**和**縮小問題**兩個部分。`print` 放在遞迴呼叫前還是後，輸出順序完全不同。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

int fact(int n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
}
void f(int n) {
    if (n == 0) return;
    cout << "in " << n << endl;
    f(n - 1);
    cout << "out " << n << endl;
}

int main() {
    cout << fact(5) << endl;
    f(3);
}''']),
  sec("記憶化：避免重複計算", ["純遞迴的費氏數列會一直重複算同樣的東西，n 一大就超時。把算過的結果存進陣列，就能快很多。"],
      [r'''#include <bits/stdc++.h>
using namespace std;

long long memo[100];

long long fib(int n) {
    if (n < 2) return n;
    if (memo[n]) return memo[n];
    return memo[n] = fib(n - 1) + fib(n - 2);
}

int main() {
    cout << fib(50) << endl;
}''']),
  sec("估算運算次數", ["C++ 一秒大約能做 10^8 次簡單運算。用輸入大小 n 來估算："],
      [r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    int n = 4, m = 3, c = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++) c++;
    cout << c << endl;
    int k = 1, steps = 0;
    while (k <= 20) {
        k *= 2;
        steps++;
    }
    cout << steps << endl;
}'''],
      ul=["O(n)：n = 10^7 沒問題", "O(n log n)：排序，n = 10^6 沒問題", "O(n²)：n = 5000 沒問題，n = 10^5 一定超時", "O(√n)：質數判斷，n = 10^9 也沒問題"]),
  sec("好習慣：讀得更快、不要忘記的事", ["資料量很大（例如 10^5 筆以上）時，加上這兩行可以讓 `cin` 快很多。"],
      [(r'''#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        sum += x;
    }
    cout << sum << "\n";
}''', "3\n10 20 30")],
      ul=["數字大一點就用 `long long`", "陣列開大一點（多開幾格），並且小心索引從 0 開始", "提交前把除錯用的 `cout` 刪掉", "用 `\"\\n\"` 代替 `endl` 可以讓大量輸出快很多"]),
 ], ["a005"], ["a027", "a021", "a017", "a020"], "回頭挑一題當初用雙層迴圈寫的題目，試著改成更快的做法，感受時間差異。"),
]

def run(code, inp, exe):
    r = subprocess.run(["g++", "-std=c++17", "-O0", "-w", "-o", exe, "-x", "c++", "-"], input=code, capture_output=True, text=True)
    if r.returncode:
        raise SystemExit("編譯失敗：\n" + code[:200] + "\n" + r.stderr[:400])
    p = subprocess.run([exe], input=inp + "\n", capture_output=True, text=True, timeout=10)
    if p.returncode:
        raise SystemExit("執行失敗：\n" + code[:200])
    return p.stdout.rstrip("\n")

def main():
    here = os.path.dirname(os.path.abspath(__file__))
    exe = os.path.join(tempfile.mkdtemp(), "a.out")
    n = 0
    for u in UNITS:
        for s in u["sections"]:
            if not s["ul"]: s.pop("ul")
            for k in ("tip", "warn"):
                if not s[k]: s.pop(k)
            if not s["p"]: s.pop("p")
            codes = []
            for code, inp in s["code"]:
                c = {"c": code, "out": run(code, inp, exe)}
                if inp: c["inp"] = inp
                codes.append(c); n += 1
            if codes: s["code"] = codes
            else: s.pop("code")
    out = os.path.join(here, "..", "data", "lessons_cpp.js")
    with open(out, "w", encoding="utf-8") as f:
        f.write("// 由 tools/build_cpp_lessons.py 產生，請修改那支程式再重新執行，不要手改這個檔案。\n")
        f.write("export const LESSONS_CPP = " + json.dumps(UNITS, ensure_ascii=False, indent=1) + ";\n")
    print(f"完成：{len(UNITS)} 個單元、{n} 個範例（全部用 g++ 編譯並執行過）→ data/lessons_cpp.js")

if __name__ == "__main__":
    main()
