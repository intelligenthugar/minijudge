// 由 tools/build_cpp_lessons.py 產生，請修改那支程式再重新執行，不要手改這個檔案。
export const LESSONS_CPP = [
 {
  "id": "c01",
  "title": "第一支 C++ 程式：輸入、輸出與變數",
  "sub": "認識 C++ 程式的骨架，會用 cin / cout 讀寫資料。",
  "goal": [
   "看得懂 `#include`、`main`、`cout` 的作用",
   "知道 int、long long、double、char、string 的差別",
   "會用 cin 讀入多筆資料，並知道什麼時候要用 long long"
  ],
  "sections": [
   {
    "h": "程式的骨架",
    "p": [
     "`#include` 引入需要的工具，`main` 是程式開始執行的地方，`cout << …` 輸出。`<<` 可以一直接下去，`endl` 代表換行（也可以寫 `\\\"\\\\n\\\"`）。每個敘述都要以 `;` 結尾。"
    ],
    "code": [
     {
      "c": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello\" << endl;\n    cout << 1 + 2 << endl;\n    return 0;\n}",
      "out": "Hello\n3"
     }
    ],
    "tip": "之後的範例都用 `#include <bits/stdc++.h>`，一次引入所有常用工具（寫競賽題很方便，但這是 GCC 才有的寫法）。"
   },
   {
    "h": "變數與資料型態",
    "p": [
     "C++ 的變數要**先宣告型態**。常用的型態："
    ],
    "ul": [
     "`int`：整數，約 ±21 億",
     "`long long`：大整數，約 ±9 × 10^18",
     "`double`：小數",
     "`char`：一個字元（用單引號 `'A'`）",
     "`bool`：true / false（印出來是 1 / 0）",
     "`string`：字串（用雙引號）"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int a = 7;\n    long long big = 3000000000LL;\n    double pi = 3.14;\n    char c = 'A';\n    bool ok = true;\n    string s = \"Hi\";\n    cout << a << \" \" << big << \" \" << pi << \" \" << c << \" \" << ok << \" \" << s << endl;\n    cout << a / 2 << \" \" << a / 2.0 << endl;\n}",
      "out": "7 3000000000 3.14 A 1 Hi\n3 3.5"
     }
    ],
    "warn": "整數除以整數還是整數：`7 / 2` 是 3。要小數就要有一邊是 double，例如 `7 / 2.0`。"
   },
   {
    "h": "cin：讀取輸入",
    "p": [
     "`cin >> 變數` 會依序讀入資料，**自動跳過空白和換行**，所以「一行多個數字」和「一行一個數字」寫法完全一樣。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    string name;\n    cin >> name;\n    cout << \"Hi, \" << name << endl;\n}",
      "out": "8\nHi, Amy",
      "inp": "3 5\nAmy"
     }
    ]
   },
   {
    "h": "溢位：int 裝不下的時候",
    "p": [
     "數字超過型態能裝的範圍就會「溢位」，答案會變得莫名其妙，而且不會有任何錯誤訊息。題目數字大（超過 10^9 級）時，一律改用 `long long`。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int a = 100000;\n    cout << a * a << endl;\n    cout << (long long)a * a << endl;\n}",
      "out": "1410065408\n10000000000"
     }
    ],
    "warn": "這是 C++ 初學者最常見的 WA 原因：兩個 10^9 相加就已經超過 int 了。"
   },
   {
    "h": "輸出小數",
    "p": [
     "用 `fixed` 和 `setprecision(n)` 指定小數位數。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    cout << 3.14159 << endl;\n    cout << fixed << setprecision(2) << 3.14159 << endl;\n}",
      "out": "3.14159\n3.14"
     }
    ],
    "tip": "輸出量很大時，用 `\"\\n\"` 比 `endl` 快很多（`endl` 每次都會強制把資料送出去）。"
   }
  ],
  "practice": {
   "must": [
    "a001"
   ],
   "more": [],
   "tip": "A+B 的數字最大 10^9，兩個加起來會超過 int，記得用 long long。"
  }
 },
 {
  "id": "c02",
  "title": "運算子與條件判斷",
  "sub": "讓程式會「算」，也會「選」。",
  "goal": [
   "會用 `/`、`%` 與比較、邏輯運算子",
   "會寫 `if / else if / else`、三元運算子與 `switch`",
   "知道 C++ 的負數除法和 Python 不一樣"
  ],
  "sections": [
   {
    "h": "算術運算子",
    "p": [
     "`+ - * / %`。整數 `/` 是整數除法，`%` 是餘數。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    cout << 17 / 5 << \" \" << 17 % 5 << endl;\n    cout << -7 / 2 << \" \" << -7 % 2 << endl;\n    cout << 17 / 5.0 << endl;\n    cout << (double)17 / 5 << endl;\n}",
      "out": "3 2\n-3 -1\n3.4\n3.4"
     }
    ],
    "warn": "C++ 的整數除法是「往 0 取整」：`-7 / 2` 是 -3、`-7 % 2` 是 -1。Python 是 -4 和 1，兩邊不一樣！"
   },
   {
    "h": "比較與邏輯運算子",
    "p": [
     "比較：`> < >= <= == !=`。邏輯：`&&`（且）、`||`（或）、`!`（非）。結果是 true / false，印出來是 1 / 0。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int x = 15;\n    cout << (x > 10) << (x == 15) << (x != 3) << endl;\n    cout << (x > 10 && x < 20) << endl;\n    cout << (x < 5 || x % 5 == 0) << endl;\n    cout << !(x > 10) << endl;\n}",
      "out": "111\n1\n1\n0"
     }
    ],
    "warn": "想判斷 x 在 0 到 10 之間，要寫成 `0 < x && x < 10`。寫成 `0 < x < 10` 不會報錯，但意思完全不一樣（結果會錯）。另外，`=` 是指定、`==` 才是比較。"
   },
   {
    "h": "if / else if / else",
    "p": [
     "條件要放在小括號裡，執行的內容用大括號 `{ }` 包起來（只有一行時可以省略，但建議都寫）。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int score = 75;\n    if (score >= 90) {\n        cout << \"A\" << endl;\n    } else if (score >= 60) {\n        cout << \"B\" << endl;\n    } else {\n        cout << \"C\" << endl;\n    }\n}",
      "out": "B"
     }
    ]
   },
   {
    "h": "三元運算子與 switch",
    "p": [
     "`條件 ? 甲 : 乙` 是一行的 if。`switch` 適合「某個整數剛好等於哪幾種值」的情況，每個 `case` 後面要記得 `break`。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n = 7;\n    cout << (n % 2 ? \"odd\" : \"even\") << endl;\n    int d = 3;\n    switch (d) {\n        case 1: cout << \"Mon\" << endl; break;\n        case 2: cout << \"Tue\" << endl; break;\n        case 3: cout << \"Wed\" << endl; break;\n        default: cout << \"?\" << endl;\n    }\n}",
      "out": "odd\nWed"
     }
    ]
   },
   {
    "h": "實戰：閏年",
    "p": [
     "4 的倍數是閏年，但 100 的倍數不是，除非又是 400 的倍數。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int y;\n    cin >> y;\n    if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) cout << \"Yes\" << endl;\n    else cout << \"No\" << endl;\n}",
      "out": "Yes",
      "inp": "2000"
     }
    ],
    "tip": "`&&` 比 `||` 先算，混用時加括號最安全。"
   }
  ],
  "practice": {
   "must": [
    "a014"
   ],
   "more": [],
   "tip": "先自己測 2000、1900、2024、2023 四個年份，確認答案正確再提交。"
  }
 },
 {
  "id": "c03",
  "title": "迴圈",
  "sub": "讓電腦替你重複做事。",
  "goal": [
   "會用 `for`、`while`、`do-while`",
   "會用累加、累乘，並選對型態",
   "看得懂巢狀迴圈，會用 `break` / `continue`"
  ],
  "sections": [
   {
    "h": "for 迴圈",
    "p": [
     "`for (起始; 條件; 每次做完要做的事)`。`i++` 是 `i = i + 1`，`i -= 3` 是 `i = i - 3`。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    for (int i = 0; i < 3; i++) cout << i << \" \";\n    cout << endl;\n    for (int i = 10; i > 0; i -= 3) cout << i << \" \";\n    cout << endl;\n}",
      "out": "0 1 2 \n10 7 4 1 "
     }
    ],
    "tip": "`i < n` 不含 n；想包含 n 就寫 `i <= n`。"
   },
   {
    "h": "while 與 do-while",
    "p": [
     "`while` 先判斷再做；`do { … } while (條件);` 會**至少做一次**，再判斷。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n = 100, cnt = 0;\n    while (n > 0) {\n        n /= 2;\n        cnt++;\n    }\n    cout << cnt << endl;\n    int x = 5;\n    do {\n        cout << x << \" \";\n        x--;\n    } while (x > 3);\n    cout << endl;\n}",
      "out": "7\n5 4 "
     }
    ]
   },
   {
    "h": "累加與累乘",
    "p": [
     "先放好起始值（加法 0、乘法 1），在迴圈裡一路更新。數字會變很大時，變數要用 `long long`。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int sum = 0;\n    for (int i = 1; i <= 10; i++) sum += i;\n    cout << sum << endl;\n    long long f = 1;\n    for (int i = 2; i <= 5; i++) f *= i;\n    cout << f << endl;\n}",
      "out": "55\n120"
     }
    ]
   },
   {
    "h": "巢狀迴圈、break 與 continue",
    "p": [
     "內層會完整跑完一次，外層才前進一步。`break` 跳出所在的那層迴圈，`continue` 跳過這一輪。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        for (int j = 1; j <= 3; j++) cout << i * j << \" \";\n        cout << endl;\n    }\n    for (int i = 1; i < 100; i++) {\n        if (i * i > 50) {\n            cout << i << endl;\n            break;\n        }\n    }\n}",
      "out": "1 2 3 \n2 4 6 \n3 6 9 \n8"
     }
    ]
   },
   {
    "h": "FizzBuzz 的思考方式",
    "p": [
     "同時符合多個條件時，要**先判斷最嚴格的**（15 的倍數），再判斷 3、5 的倍數；否則 15 會被「3 的倍數」先攔走。"
    ]
   }
  ],
  "practice": {
   "must": [
    "a012",
    "a030",
    "a009"
   ],
   "more": [
    "a005"
   ],
   "tip": "先做乘法表和 FizzBuzz 熟悉 for 與判斷。階乘要用 long long；費氏數列用迴圈一步步往後推。"
  }
 },
 {
  "id": "c04",
  "title": "陣列與 vector",
  "sub": "一次處理很多筆資料。",
  "goal": [
   "會宣告、讀入、走訪陣列與 vector",
   "會用 `sort`、`max_element` 等工具",
   "會用二維陣列，並知道陣列要小心的地方"
  ],
  "sections": [
   {
    "h": "陣列",
    "p": [
     "陣列是同一種型態的一排資料，索引從 0 開始。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int a[5] = {5, 3, 8, 1, 9};\n    cout << a[0] << \" \" << a[4] << endl;\n    int sum = 0;\n    for (int i = 0; i < 5; i++) sum += a[i];\n    cout << sum << endl;\n}",
      "out": "5 9\n26"
     }
    ],
    "warn": "索引超出範圍時 C++ **不會報錯**，只會讀到亂七八糟的值或直接當掉。大陣列（例如 10^6 個）要宣告在 `main` 外面（全域），放在裡面會爆掉。"
   },
   {
    "h": "讀入一排資料",
    "p": [
     "先讀個數 n，再用迴圈一個一個讀進陣列。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint a[1005];\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 0; i < n; i++) cin >> a[i];\n    int mx = a[0];\n    for (int i = 1; i < n; i++) mx = max(mx, a[i]);\n    cout << mx << endl;\n}",
      "out": "9",
      "inp": "5\n3 9 2 7 1"
     }
    ]
   },
   {
    "h": "vector：會自己長大的陣列",
    "p": [
     "不知道有幾筆資料、或想用 `push_back` 一個個加進去時，用 `vector`。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    vector<int> v;\n    for (int i = 1; i <= 5; i++) v.push_back(i * i);\n    cout << v.size() << \" \" << v.back() << endl;\n    for (int x : v) cout << x << \" \";\n    cout << endl;\n    vector<int> w(3, 7);\n    cout << w[0] + w[2] << endl;\n}",
      "out": "5 25\n1 4 9 16 25 \n14"
     }
    ],
    "tip": "`for (int x : v)` 是「依序取出每個元素」的簡潔寫法；想直接修改元素要寫 `for (int &x : v)`。"
   },
   {
    "h": "排序與找最大值",
    "p": [
     "`sort(開頭, 結尾)` 預設由小到大。`v.begin()` 和 `v.end()` 代表整個 vector；`rbegin / rend` 是反方向，所以排出來是由大到小。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    vector<int> v = {4, 9, 2, 7};\n    sort(v.begin(), v.end());\n    for (int x : v) cout << x << \" \";\n    cout << endl;\n    sort(v.rbegin(), v.rend());\n    for (int x : v) cout << x << \" \";\n    cout << endl;\n    cout << *max_element(v.begin(), v.end()) << endl;\n}",
      "out": "2 4 7 9 \n9 7 4 2 \n9"
     }
    ]
   },
   {
    "h": "二維陣列",
    "p": [
     "`g[i][j]` 是第 i 列第 j 行。大小不固定時用 vector 的 vector。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int g[2][3] = {{1, 2, 3}, {4, 5, 6}};\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 3; j++) cout << g[i][j] << \" \";\n        cout << endl;\n    }\n    vector<vector<int>> h(2, vector<int>(3, 0));\n    h[1][2] = 5;\n    cout << h[1][2] << \" \" << h[0][0] << endl;\n}",
      "out": "1 2 3 \n4 5 6 \n5 0"
     }
    ]
   },
   {
    "h": "掃描一次、記住狀態",
    "p": [
     "例：找最長的連續遞增段。用 `cur` 記錄目前這段的長度，比前一個大就加 1，否則重設為 1，再用 `best` 記錄最大值。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    vector<int> a = {1, 2, 3, 2, 3, 4, 5};\n    int best = 1, cur = 1;\n    for (size_t i = 1; i < a.size(); i++) {\n        if (a[i] > a[i - 1]) cur++;\n        else cur = 1;\n        best = max(best, cur);\n    }\n    cout << best << endl;\n}",
      "out": "4"
     }
    ]
   }
  ],
  "practice": {
   "must": [
    "a002",
    "a010",
    "a006"
   ],
   "more": [
    "a018",
    "a020",
    "a025",
    "a026",
    "a027",
    "a029"
   ],
   "tip": "先做前三題熟悉讀入與排序。總和、乘積可能很大，記得用 long long。"
  }
 },
 {
  "id": "c05",
  "title": "字串 string",
  "sub": "文字處理的基本功。",
  "goal": [
   "會用 `string` 的長度、索引、串接與 `substr`",
   "會用 `cin` 與 `getline` 讀字串",
   "會用字元運算與常用函式，並用陣列 / map 計數"
  ],
  "sections": [
   {
    "h": "string 基本操作",
    "p": [
     "`string` 可以用 `+` 串接、用 `[ ]` 取字元、用 `size()` 取長度。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string s = \"hello\";\n    cout << s.size() << \" \" << s[0] << \" \" << s.back() << endl;\n    s += \" world\";\n    cout << s << endl;\n    cout << s.substr(0, 5) << \"|\" << s.substr(6) << endl;\n}",
      "out": "5 h o\nhello world\nhello|world"
     }
    ]
   },
   {
    "h": "讀字串：cin 與 getline",
    "p": [
     "`cin >> s` 讀到空白就停；要讀「含空白的一整行」用 `getline(cin, s)`。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string a, line;\n    cin >> a;\n    getline(cin, line);\n    cout << \"[\" << a << \"][\" << line << \"]\" << endl;\n}",
      "out": "[hello][ world]",
      "inp": "hello world\nbye"
     }
    ],
    "warn": "`cin >>` 讀完後，那一行剩下的內容（包含換行）還留著，馬上接 `getline` 會讀到殘留的部分。常見解法是先多一個 `getline` 把它吃掉。"
   },
   {
    "h": "走訪字元與字元運算",
    "p": [
     "`char` 其實是一個小整數（ASCII 編號），可以做加減。`c - '0'` 把數字字元變成數字，`c - 'a'` 是字母在 0～25 的位置。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string s = \"banana\";\n    int cnt = 0;\n    for (char c : s)\n        if (c == 'a') cnt++;\n    cout << cnt << endl;\n    cout << '7' - '0' << \" \" << 'd' - 'a' << \" \" << char('a' + 3) << \" \" << (char)toupper('q') << endl;\n}",
      "out": "3\n7 3 d Q"
     }
    ]
   },
   {
    "h": "常用函式",
    "p": [
     "`find` 找子字串（找不到會回傳 `string::npos`）、`reverse` 反轉、`sort` 也能排字串；`stoi` 把字串轉整數，`to_string` 把數字轉字串。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string s = \"banana\";\n    cout << s.find(\"na\") << \" \" << (s.find(\"z\") == string::npos) << endl;\n    reverse(s.begin(), s.end());\n    cout << s << endl;\n    sort(s.begin(), s.end());\n    cout << s << endl;\n    cout << stoi(\"123\") + 1 << \" \" << to_string(45) + \"6\" << endl;\n}",
      "out": "2 1\nananab\naaabnn\n124 456"
     }
    ]
   },
   {
    "h": "計數：陣列與 map",
    "p": [
     "字母只有 26 種，開一個 `cnt[26]` 最快；種類不固定時用 `map`（會自動依鍵排序）。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int cnt[26] = {};\n    for (char c : string(\"banana\")) cnt[c - 'a']++;\n    cout << cnt[0] << cnt[1] << cnt[13] << endl;\n    map<char, int> m;\n    for (char c : string(\"banana\")) m[c]++;\n    for (auto &p : m) cout << p.first << p.second << \" \";\n    cout << endl;\n}",
      "out": "312\na3 b1 n2 "
     }
    ]
   }
  ],
  "practice": {
   "must": [
    "a003",
    "a011",
    "a007",
    "a013"
   ],
   "more": [
    "a016",
    "a023",
    "a028"
   ],
   "tip": "字串題先想：要走過每個字元嗎？要反轉嗎？再選工具。凱薩密碼要記得 z 之後接回 a。"
  }
 },
 {
  "id": "c06",
  "title": "函式與 lambda",
  "sub": "把重複的步驟包起來，並學會寫 lambda。",
  "goal": [
   "會定義函式、了解傳值與傳參考",
   "會寫判斷質數、最大公因數的小函式",
   "會用 lambda（沒有名字的小函式）搭配 `sort` 自訂排序"
  ],
  "sections": [
   {
    "h": "定義函式",
    "p": [
     "函式的格式：`回傳型態 名字(參數) { … return …; }`。函式要寫在被呼叫的地方**之前**。沒有回傳值的函式，型態寫 `void`。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint add(int a, int b) { return a + b; }\nbool isEven(int n) { return n % 2 == 0; }\n\nint main() {\n    cout << add(3, 4) << \" \" << isEven(10) << isEven(7) << endl;\n}",
      "out": "7 10"
     }
    ]
   },
   {
    "h": "傳值與傳參考",
    "p": [
     "預設是「傳值」：函式拿到的是**複製品**，改了不影響原本的變數。參數前面加 `&` 變成「傳參考」，改的就是原本那個。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nvoid bad(int a, int b) { int t = a; a = b; b = t; }\nvoid good(int &a, int &b) { int t = a; a = b; b = t; }\n\nint main() {\n    int x = 1, y = 2;\n    bad(x, y);\n    cout << x << y << endl;\n    good(x, y);\n    cout << x << y << endl;\n}",
      "out": "12\n21"
     }
    ],
    "tip": "傳 vector 給函式時，也建議寫成 `const vector<int> &v`，避免整個複製一份（又慢又浪費記憶體）。"
   },
   {
    "h": "經典小函式：質數與最大公因數",
    "p": [
     "質數只需要試到 √n。最大公因數用輾轉相除法，C++17 也有現成的 `gcd`。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nbool isPrime(int n) {\n    if (n < 2) return false;\n    for (int i = 2; (long long)i * i <= n; i++)\n        if (n % i == 0) return false;\n    return true;\n}\nint myGcd(int a, int b) { return b == 0 ? a : myGcd(b, a % b); }\n\nint main() {\n    for (int i = 1; i < 20; i++)\n        if (isPrime(i)) cout << i << \" \";\n    cout << endl;\n    cout << myGcd(12, 18) << \" \" << __gcd(12, 18) << \" \" << gcd(12, 18) << endl;\n}",
      "out": "2 3 5 7 11 13 17 19 \n6 6 6"
     }
    ]
   },
   {
    "h": "lambda：沒有名字的小函式",
    "p": [
     "`[](參數) { 內容 }` 就是一個 lambda，可以直接放進變數（用 `auto`）或當成參數。中括號 `[ ]` 可以把外面的變數「帶進來」：`[base]` 是複製一份，`[&]` 是全部用參考。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    auto square = [](int x) { return x * x; };\n    auto add = [](int a, int b) { return a + b; };\n    cout << square(5) << \" \" << add(3, 4) << endl;\n    int base = 10;\n    auto addBase = [base](int x) { return x + base; };\n    cout << addBase(5) << endl;\n}",
      "out": "25 7\n15"
     }
    ]
   },
   {
    "h": "lambda 最常見的用途：自訂排序",
    "p": [
     "`sort` 的第三個參數可以放一個「比較函式」：傳回 `true` 代表 a 應該排在 b 前面。用 lambda 就能一行搞定，作用和 Python 的 `key=lambda` 一樣。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    vector<pair<string, int>> v = {{\"Amy\", 80}, {\"Bob\", 95}, {\"Cat\", 80}};\n    sort(v.begin(), v.end(), [](const pair<string, int> &a, const pair<string, int> &b) {\n        if (a.second != b.second) return a.second > b.second;\n        return a.first < b.first;\n    });\n    for (auto &p : v) cout << p.first << \" \" << p.second << endl;\n}",
      "out": "Bob 95\nAmy 80\nCat 80"
     }
    ],
    "tip": "這個比較函式的意思是：分數高的排前面，同分再依名字由小到大排。"
   }
  ],
  "practice": {
   "must": [
    "a008",
    "a015",
    "a004"
   ],
   "more": [
    "a024",
    "a017",
    "a021"
   ],
   "tip": "質數、質因數都只需要試到 √n；最小公倍數可以直接用 gcd。"
  }
 },
 {
  "id": "c07",
  "title": "STL 容器：pair、set、map、stack、queue",
  "sub": "C++ 內建的資料結構，競賽與 APCS 的好幫手。",
  "goal": [
   "會用 `pair`、`set`、`map`",
   "會用 `stack`（後進先出）與 `queue`（先進先出）",
   "會用 stack 檢查括號配對"
  ],
  "sections": [
   {
    "h": "pair：一對資料",
    "p": [
     "`pair<A, B>` 把兩個值綁在一起，用 `.first` 和 `.second` 取出。放進 vector 排序時，會先比 first、再比 second。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    pair<int, int> p = {3, 5};\n    cout << p.first << \" \" << p.second << endl;\n    vector<pair<int, int>> v = {{2, 9}, {1, 5}, {1, 2}};\n    sort(v.begin(), v.end());\n    for (auto &x : v) cout << x.first << \",\" << x.second << \" \";\n    cout << endl;\n}",
      "out": "3 5\n1,2 1,5 2,9 "
     }
    ]
   },
   {
    "h": "set：不重複、自動排序",
    "p": [
     "`set` 會自動去除重複並由小到大排好；`insert` 加入、`count` 查有沒有、`erase` 刪除。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    set<int> s;\n    for (int x : {3, 1, 3, 2, 1}) s.insert(x);\n    cout << s.size() << endl;\n    for (int x : s) cout << x << \" \";\n    cout << endl;\n    cout << s.count(2) << s.count(9) << endl;\n    cout << *s.begin() << \" \" << *s.rbegin() << endl;\n}",
      "out": "3\n1 2 3 \n10\n1 3"
     }
    ]
   },
   {
    "h": "map：鍵對應到值",
    "p": [
     "`map<鍵, 值>` 適合計數、查表。`m[鍵]++` 在鍵不存在時會自動從 0 開始。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    map<string, int> cnt;\n    for (string w : {\"a\", \"b\", \"a\", \"c\", \"a\"}) cnt[w]++;\n    for (auto &p : cnt) cout << p.first << \"=\" << p.second << \" \";\n    cout << endl;\n    cout << cnt.count(\"z\") << \" \" << cnt[\"a\"] << endl;\n}",
      "out": "a=3 b=1 c=1 \n0 3"
     }
    ],
    "warn": "用 `m[鍵]` 讀取一個不存在的鍵，會順便「建立」它（值是 0）。只想查有沒有，請用 `count`。"
   },
   {
    "h": "stack 與 queue",
    "p": [
     "`stack`：後進先出，只能看和拿最上面的（`top`、`pop`）。`queue`：先進先出，從前面拿（`front`、`pop`）。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    stack<int> st;\n    st.push(1); st.push(2); st.push(3);\n    cout << st.top() << \" \";\n    st.pop();\n    cout << st.top() << \" \" << st.size() << endl;\n    queue<int> q;\n    q.push(1); q.push(2); q.push(3);\n    cout << q.front() << \" \";\n    q.pop();\n    cout << q.front() << \" \" << q.size() << endl;\n}",
      "out": "3 2 2\n1 2 2"
     }
    ]
   },
   {
    "h": "實戰：括號配對",
    "p": [
     "遇到左括號就推進 stack，遇到右括號就檢查最上面的是不是對應的左括號。最後 stack 必須是空的。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    stack<char> st;\n    bool ok = true;\n    for (char c : s) {\n        if (c == '(' || c == '[' || c == '{') st.push(c);\n        else {\n            char need = c == ')' ? '(' : c == ']' ? '[' : '{';\n            if (st.empty() || st.top() != need) { ok = false; break; }\n            st.pop();\n        }\n    }\n    cout << (ok && st.empty() ? \"Yes\" : \"No\") << endl;\n}",
      "out": "Yes",
      "inp": "([]{})"
     }
    ]
   }
  ],
  "practice": {
   "must": [
    "a022",
    "a028",
    "a019"
   ],
   "more": [],
   "tip": "第二大的數可以用 set 去重；不同單字數就是把單字全丟進 set 再看 size。"
  }
 },
 {
  "id": "c08",
  "title": "遞迴與複雜度",
  "sub": "「自己呼叫自己」，以及估算程式夠不夠快。",
  "goal": [
   "會寫簡單遞迴並找出終止條件",
   "知道記憶化可以避免重複計算",
   "會估算運算次數，養成好習慣"
  ],
  "sections": [
   {
    "h": "遞迴",
    "p": [
     "遞迴函式要有**終止條件**和**縮小問題**兩個部分。`print` 放在遞迴呼叫前還是後，輸出順序完全不同。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint fact(int n) {\n    if (n <= 1) return 1;\n    return n * fact(n - 1);\n}\nvoid f(int n) {\n    if (n == 0) return;\n    cout << \"in \" << n << endl;\n    f(n - 1);\n    cout << \"out \" << n << endl;\n}\n\nint main() {\n    cout << fact(5) << endl;\n    f(3);\n}",
      "out": "120\nin 3\nin 2\nin 1\nout 1\nout 2\nout 3"
     }
    ]
   },
   {
    "h": "記憶化：避免重複計算",
    "p": [
     "純遞迴的費氏數列會一直重複算同樣的東西，n 一大就超時。把算過的結果存進陣列，就能快很多。"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nlong long memo[100];\n\nlong long fib(int n) {\n    if (n < 2) return n;\n    if (memo[n]) return memo[n];\n    return memo[n] = fib(n - 1) + fib(n - 2);\n}\n\nint main() {\n    cout << fib(50) << endl;\n}",
      "out": "12586269025"
     }
    ]
   },
   {
    "h": "估算運算次數",
    "p": [
     "C++ 一秒大約能做 10^8 次簡單運算。用輸入大小 n 來估算："
    ],
    "ul": [
     "O(n)：n = 10^7 沒問題",
     "O(n log n)：排序，n = 10^6 沒問題",
     "O(n²)：n = 5000 沒問題，n = 10^5 一定超時",
     "O(√n)：質數判斷，n = 10^9 也沒問題"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n = 4, m = 3, c = 0;\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < m; j++) c++;\n    cout << c << endl;\n    int k = 1, steps = 0;\n    while (k <= 20) {\n        k *= 2;\n        steps++;\n    }\n    cout << steps << endl;\n}",
      "out": "12\n5"
     }
    ]
   },
   {
    "h": "好習慣：讀得更快、不要忘記的事",
    "p": [
     "資料量很大（例如 10^5 筆以上）時，加上這兩行可以讓 `cin` 快很多。"
    ],
    "ul": [
     "數字大一點就用 `long long`",
     "陣列開大一點（多開幾格），並且小心索引從 0 開始",
     "提交前把除錯用的 `cout` 刪掉",
     "用 `\"\\n\"` 代替 `endl` 可以讓大量輸出快很多"
    ],
    "code": [
     {
      "c": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    cin >> n;\n    long long sum = 0;\n    for (int i = 0; i < n; i++) {\n        int x;\n        cin >> x;\n        sum += x;\n    }\n    cout << sum << \"\\n\";\n}",
      "out": "60",
      "inp": "3\n10 20 30"
     }
    ]
   }
  ],
  "practice": {
   "must": [
    "a005"
   ],
   "more": [
    "a027",
    "a021",
    "a017",
    "a020"
   ],
   "tip": "回頭挑一題當初用雙層迴圈寫的題目，試著改成更快的做法，感受時間差異。"
  }
 }
];
