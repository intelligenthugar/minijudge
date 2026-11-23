// 每題的 C++ 參考程式碼（和 solutions.js 的 Python 版對應）。全部用 g++ 對所有測資跑過。
const H = "#include <bits/stdc++.h>\nusing namespace std;\n\n";
const S = (body, note) => ({code: H + body, note});

export const SOLUTIONS_CPP = {
a001: S(`int main() {
    long long a, b;          // 兩個 10^9 相加會超過 int 的範圍，所以用 long long
    cin >> a >> b;
    cout << a + b << endl;
}`, "int 最大約 21 億。題目的數字最大 10^9，相加就可能超過，所以改用 long long。"),
a002: S(`int main() {
    int n, x, mx = INT_MIN;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> x;
        mx = max(mx, x);
    }
    cout << mx << endl;
}`),
a003: S(`int main() {
    string s;
    cin >> s;
    string r(s.rbegin(), s.rend());   // 反轉後的字串
    cout << (s == r ? "Yes" : "No") << endl;
}`),
a004: S(`int main() {
    long long n;
    cin >> n;
    bool ok = n >= 2;
    for (long long i = 2; i * i <= n; i++) {     // 只需檢查到 √n
        if (n % i == 0) { ok = false; break; }
    }
    cout << (ok ? "Yes" : "No") << endl;
}`, "i * i 可能超過 int（i 到 31623 時 i * i 接近 10^9），保險起見用 long long。"),
a005: S(`int main() {
    int n;
    cin >> n;
    long long a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        long long t = a + b;
        a = b;
        b = t;
    }
    cout << a << endl;
}`, "F(50) 約 1.2 × 10^10，超過 int，要用 long long。"),
a006: S(`int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    sort(a.begin(), a.end());          // 預設由小到大
    for (int i = 0; i < n; i++) cout << a[i] << (i + 1 < n ? " " : "\\n");
}`),
a007: S(`int main() {
    string s;
    cin >> s;
    int cnt = 0;
    for (char c : s)
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') cnt++;
    cout << cnt << endl;
}`),
a008: S(`int main() {
    long long a, b;
    cin >> a >> b;
    while (b) {                // 輾轉相除法
        long long t = a % b;
        a = b;
        b = t;
    }
    cout << a << endl;
}`),
a009: S(`int main() {
    int n;
    cin >> n;
    long long r = 1;
    for (int i = 2; i <= n; i++) r *= i;
    cout << r << endl;
}`, "18! 約 6.4 × 10^15，要用 long long；用 int 會在 13! 就溢位。"),
a010: S(`int main() {
    int n, x;
    long long sum = 0;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> x;
        if (x % 2 == 0) sum += x;      // 負的偶數 % 2 也是 0
    }
    cout << sum << endl;
}`, "1000 個 10^9 加起來會超過 int，總和用 long long。"),
a011: S(`int main() {
    string s;
    cin >> s;
    reverse(s.begin(), s.end());
    cout << s << endl;
}`),
a012: S(`int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= 9; i++)
        cout << n << " x " << i << " = " << n * i << "\\n";
}`),
a013: S(`int main() {
    string s;
    cin >> s;                          // 100 位數太大，當成字串讀
    int sum = 0;
    for (char c : s) sum += c - '0';   // 字元 '7' 減掉 '0' 就是數字 7
    cout << sum << endl;
}`),
a014: S(`int main() {
    int y;
    cin >> y;
    bool leap = (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
    cout << (leap ? "Yes" : "No") << endl;
}`),
a015: S(`int main() {
    long long n;
    cin >> n;
    if (n == 0) { cout << 0 << endl; return 0; }
    string bits;
    while (n > 0) {
        bits += char('0' + n % 2);
        n /= 2;
    }
    reverse(bits.begin(), bits.end());
    cout << bits << endl;
}`),
a016: S(`int main() {
    string s;
    int k;
    cin >> s >> k;
    for (char &c : s) c = (c - 'a' + k) % 26 + 'a';   // 加 k 之後用 % 26 繞回 a
    cout << s << endl;
}`),
a017: S(`int main() {
    long long n;
    cin >> n;
    vector<long long> f;
    for (long long p = 2; p * p <= n; p++)
        while (n % p == 0) { f.push_back(p); n /= p; }
    if (n > 1) f.push_back(n);           // 剩下的一定是質數
    for (size_t i = 0; i < f.size(); i++) cout << f[i] << (i + 1 < f.size() ? " " : "\\n");
}`),
a018: S(`int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    int best = 1, cur = 1;
    for (int i = 1; i < n; i++) {
        cur = a[i] > a[i - 1] ? cur + 1 : 1;
        best = max(best, cur);
    }
    cout << best << endl;
}`),
a019: S(`int main() {
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
}`),
a020: S(`int main() {
    int n;
    long long t;
    cin >> n >> t;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    int cnt = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            if (a[i] + a[j] == t) cnt++;
    cout << cnt << endl;
}`, "兩個 10^9 相加會超過 int，所以陣列和加總都用 long long。"),
a021: S(`int main() {
    int n;
    cin >> n;
    vector<bool> isPrime(n + 1, true);
    int cnt = 0;
    for (int i = 2; i <= n; i++) {
        if (!isPrime[i]) continue;
        cnt++;
        for (long long j = (long long)i * i; j <= n; j += i) isPrime[j] = false;
    }
    cout << cnt << endl;
}`),
a022: S(`int main() {
    int n, x;
    cin >> n;
    set<int, greater<int>> s;          // set 會自動去重，greater 讓它由大到小
    for (int i = 0; i < n; i++) {
        cin >> x;
        s.insert(x);
    }
    auto it = s.begin();
    ++it;                              // 第二個
    cout << *it << endl;
}`),
a023: S(`int main() {
    string s, res;
    cin >> s;
    for (size_t i = 0; i < s.size();) {
        size_t j = i;
        while (j < s.size() && s[j] == s[i]) j++;
        res += s[i] + to_string(j - i);
        i = j;
    }
    cout << res << endl;
}`),
a024: S(`int main() {
    long long a, b;
    cin >> a >> b;
    cout << a / gcd(a, b) * b << endl;    // gcd 在 <numeric>（C++17）
}`),
a025: S(`int main() {
    int n;
    long long k;
    cin >> n >> k;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    k %= n;                               // 轉 n 次等於沒轉
    rotate(a.begin(), a.begin() + (n - k) % n, a.end());
    for (int i = 0; i < n; i++) cout << a[i] << (i + 1 < n ? " " : "\\n");
}`),
a026: S(`int main() {
    int n, ans = -1;
    long long t, x;
    cin >> n >> t;
    for (int i = 1; i <= n; i++) {
        cin >> x;
        if (ans == -1 && x == t) ans = i;  // 只記第一次出現的位置，但還是要把資料讀完
    }
    cout << ans << endl;
}`),
a027: S(`int main() {
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    long long best = a[0], cur = a[0];
    for (int i = 1; i < n; i++) {
        cur = max(a[i], cur + a[i]);       // 接在前面，或從自己重新開始
        best = max(best, cur);
    }
    cout << best << endl;
}`),
a028: S(`int main() {
    string w;
    set<string> words;
    while (cin >> w) words.insert(w);      // 一直讀到沒有輸入為止
    cout << words.size() << endl;
}`),
a029: S(`int main() {
    int n;
    cin >> n;
    vector<long long> row = {1};
    for (int i = 0; i < n; i++) {
        for (size_t j = 0; j < row.size(); j++) cout << row[j] << (j + 1 < row.size() ? " " : "\\n");
        vector<long long> nxt(row.size() + 1, 1);
        for (size_t j = 1; j < row.size(); j++) nxt[j] = row[j - 1] + row[j];
        row = nxt;
    }
}`),
a030: S(`int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        if (i % 15 == 0) cout << "FizzBuzz\\n";
        else if (i % 3 == 0) cout << "Fizz\\n";
        else if (i % 5 == 0) cout << "Buzz\\n";
        else cout << i << "\\n";
    }
}`),
a031: S(`int main() {
    int n, x, mx = 0, mn = 100, fail = 0, sum = 0;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> x;
        mx = max(mx, x);
        mn = min(mn, x);
        sum += x;
        if (x < 60) fail++;
    }
    cout << mx << " " << mn << " " << sum / n << " " << fail << endl;
}`),
a032: S(`int main() {
    string s;
    cin >> s;
    int d = 0, best = 0;
    for (char c : s) {
        if (c == '(') best = max(best, ++d);
        else d--;
    }
    cout << best << endl;
}`),
a033: S(`int main() {
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    int cnt = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            if (a[i] > a[j]) cnt++;
    cout << cnt << endl;
}`, "最多 n(n-1)/2 = 499500 組，int 就夠；數字本身最大 10^9，所以陣列用 long long 比較保險。"),
a034: S(`int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> a(n, vector<int>(m));
    for (auto &row : a)
        for (int &x : row) cin >> x;
    for (int j = 0; j < m; j++)
        for (int i = n - 1; i >= 0; i--) cout << a[i][j] << (i > 0 ? " " : "\\n");
}`),
a035: S(`int main() {
    int n;
    cin >> n;
    vector<vector<int>> g(n, vector<int>(n, 0));
    int dr[4] = {0, 1, 0, -1}, dc[4] = {1, 0, -1, 0};
    int r = 0, c = 0, d = 0;
    for (int k = 1; k <= n * n; k++) {
        g[r][c] = k;
        int nr = r + dr[d], nc = c + dc[d];
        if (nr < 0 || nr >= n || nc < 0 || nc >= n || g[nr][nc] != 0) {   // 出界或填過就右轉
            d = (d + 1) % 4;
            nr = r + dr[d];
            nc = c + dc[d];
        }
        r = nr;
        c = nc;
    }
    for (auto &row : g)
        for (int j = 0; j < n; j++) cout << row[j] << (j + 1 < n ? " " : "\\n");
}`),
a036: S(`int n, m;
vector<string> g;

void dfs(int r, int c) {
    if (r < 0 || r >= n || c < 0 || c >= m || g[r][c] != '1') return;
    g[r][c] = '0';                      // 淹掉，不會重複走
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
}

int main() {
    cin >> n >> m;
    g.resize(n);
    for (auto &row : g) cin >> row;
    int cnt = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if (g[i][j] == '1') {
                cnt++;
                dfs(i, j);
            }
    cout << cnt << endl;
}`, "這裡用遞迴 DFS，n、m ≤ 20 不會爆；格子很大（例如 1000 × 1000）時遞迴會太深，要改用 BFS 或自己用 stack。"),
a037: S(`int main() {
    int n, m;
    cin >> n >> m;
    vector<string> g(n);
    for (auto &row : g) cin >> row;
    vector<vector<int>> dist(n, vector<int>(m, -1));
    queue<pair<int, int>> q;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if (g[i][j] == 'S') {
                dist[i][j] = 0;
                q.push({i, j});
            }
    int dr[4] = {1, -1, 0, 0}, dc[4] = {0, 0, 1, -1}, ans = -1;
    while (!q.empty()) {
        auto [r, c] = q.front();
        q.pop();
        if (g[r][c] == 'E') { ans = dist[r][c]; break; }
        for (int d = 0; d < 4; d++) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m && g[nr][nc] != '#' && dist[nr][nc] == -1) {
                dist[nr][nc] = dist[r][c] + 1;
                q.push({nr, nc});
            }
        }
    }
    cout << ans << endl;
}`),
a038: S(`void hanoi(int n, char a, char c, char b) {
    if (n == 0) return;
    hanoi(n - 1, a, b, c);
    cout << a << " " << c << "\\n";
    hanoi(n - 1, b, c, a);
}

int main() {
    int n;
    cin >> n;
    hanoi(n, 'A', 'C', 'B');
}`),
a039: S(`int main() {
    int n;
    cin >> n;
    vector<int> p(n);
    iota(p.begin(), p.end(), 1);
    do {
        for (int i = 0; i < n; i++) cout << p[i] << (i + 1 < n ? " " : "\\n");
    } while (next_permutation(p.begin(), p.end()));
}`, "next_permutation 會依字典順序產生「下一個」排列，所以一開始要先排好序（iota 填入 1, 2, …, n 已經是由小到大）。想練習回溯法，可以參考 Python 版的 DFS 寫法。"),
a040: S(`int n;
bool col[20], d1[40], d2[40];

int place(int r) {
    if (r == n) return 1;
    int total = 0;
    for (int c = 0; c < n; c++) {
        if (col[c] || d1[r - c + n] || d2[r + c]) continue;
        col[c] = d1[r - c + n] = d2[r + c] = true;
        total += place(r + 1);
        col[c] = d1[r - c + n] = d2[r + c] = false;      // 回溯
    }
    return total;
}

int main() {
    cin >> n;
    cout << place(0) << endl;
}`, "r - c 可能是負數，所以用 r - c + n 當索引，讓它變成正的。"),
a041: S(`int main() {
    int k, T;
    cin >> k >> T;
    vector<int> coins(k);
    for (int &c : coins) cin >> c;
    const int INF = 1e9;
    vector<int> dp(T + 1, INF);
    dp[0] = 0;
    for (int t = 1; t <= T; t++)
        for (int c : coins)
            if (c <= t && dp[t - c] + 1 < dp[t]) dp[t] = dp[t - c] + 1;
    cout << (dp[T] >= INF ? -1 : dp[T]) << endl;
}`, "INF 設成 10^9，加 1 之後也不會溢位；最後要判斷是否還是 INF（代表湊不出來）。"),
a042: S(`int main() {
    int n, W;
    cin >> n >> W;
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        int w, v;
        cin >> w >> v;
        for (int c = W; c >= w; c--) dp[c] = max(dp[c], dp[c - w] + v);   // 容量由大到小
    }
    cout << dp[W] << endl;
}`),
a043: S(`int main() {
    string a, b;
    cin >> a >> b;
    int n = a.size(), m = b.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            dp[i][j] = a[i - 1] == b[j - 1] ? dp[i - 1][j - 1] + 1 : max(dp[i - 1][j], dp[i][j - 1]);
    cout << dp[n][m] << endl;
}`),
a044: S(`int main() {
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto &x : a) cin >> x;
    vector<int> dp(n, 1);
    int best = 1;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++)
            if (a[j] < a[i]) dp[i] = max(dp[i], dp[j] + 1);
        best = max(best, dp[i]);
    }
    cout << best << endl;
}`),
a045: S(`int main() {
    int n;
    cin >> n;
    vector<pair<int, int>> acts(n);           // (結束時間, 開始時間)：sort 就會先依結束時間排
    for (auto &p : acts) cin >> p.second >> p.first;
    sort(acts.begin(), acts.end());
    int cnt = 0, last = -1;
    for (auto &p : acts) {
        if (p.second >= last) {
            cnt++;
            last = p.first;
        }
    }
    cout << cnt << endl;
}`, "把 pair 的第一個放「結束時間」，sort 預設就會先比結束時間，不用自己寫比較函式；也可以用 lambda 自訂比較。"),
a046: S(`int main() {
    int n;
    long long K;
    cin >> n >> K;
    vector<int> wood(n);
    for (int &w : wood) cin >> w;
    int lo = 1, hi = *max_element(wood.begin(), wood.end()), ans = 0;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        long long pieces = 0;
        for (int w : wood) pieces += w / mid;
        if (pieces >= K) { ans = mid; lo = mid + 1; }
        else hi = mid - 1;
    }
    cout << ans << endl;
}`, "總段數最多 1000 × 10^6 = 10^9，K 也可到 10^6，累加用 long long 比較保險。")
,
a047: S(`int main() {
    double a, b;
    cin >> a >> b;
    cout << fixed << setprecision(2) << sqrt(a * a + b * b) << endl;
}`, "fixed 加上 setprecision(2) 才是「小數點後 2 位」；只寫 setprecision(2) 是「總共 2 位有效數字」。sqrt 在 <cmath>。"),
a048: S(`int main() {
    long long v[3];
    cin >> v[0] >> v[1] >> v[2];
    sort(v, v + 3);
    cout << (v[0] * v[0] + v[1] * v[1] == v[2] * v[2] ? "Yes" : "No") << endl;
}`),
a049: S(`int main() {
    int a, b, c;
    cin >> a >> b >> c;
    int d = b * b - 4 * a * c;
    cout << fixed << setprecision(2);
    if (d < 0) cout << "No real roots" << endl;
    else if (d == 0) cout << -b / (2.0 * a) << endl;
    else {
        double r = sqrt((double)d);
        double x1 = (-b - r) / (2 * a), x2 = (-b + r) / (2 * a);
        cout << min(x1, x2) << " " << max(x1, x2) << endl;
    }
}`, "判別式用 int 算就夠（|b²| ≤ 10^4、|4ac| ≤ 4 × 10^4）；除法要有一邊是 double，否則會變成整數除法。"),
a050: S(`int main() {
    double x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;
    cout << fixed << setprecision(2) << hypot(x1 - x2, y1 - y2) << endl;
}`),
a051: S(`int main() {
    int r;
    cin >> r;
    const double PI = 3.14159;
    cout << fixed << setprecision(2) << PI * r * r << " " << 2 * PI * r << endl;
}`),
a052: S(`int main() {
    int c;
    cin >> c;
    cout << fixed << setprecision(1) << c * 9 / 5.0 + 32 << endl;
}`, "整數的 c * 9 / 5 會是整數除法（會被捨去小數）。把 5 寫成 5.0，結果才會是小數。"),
a053: S(`int main() {
    long long a, d, n;
    cin >> a >> d >> n;
    cout << a + (n - 1) * d << " " << n * (2 * a + (n - 1) * d) / 2 << endl;
}`, "前 n 項和最大約 5 × 10^17，超過 int 很多，要用 long long（上限約 9.2 × 10^18）。"),
a054: S(`int main() {
    double p, r;
    int n;
    cin >> p >> r >> n;
    cout << fixed << setprecision(2) << p * pow(1 + r / 100, n) << endl;
}`),
a055: S(`int main() {
    int a1, b1, c1, a2, b2, c2;
    cin >> a1 >> b1 >> c1 >> a2 >> b2 >> c2;
    double d = a1 * b2 - a2 * b1;
    cout << fixed << setprecision(2) << (c1 * b2 - c2 * b1) / d << " " << (a1 * c2 - a2 * c1) / d << endl;
}`)
,
a056: S(`int main() {
    long long y, m, d, k;
    auto mlen = [](long long y, int m) { return m <= 5 ? 40 : m <= 9 ? 35 : (y % 3 == 0 ? 40 : 35); };
    auto ylen = [](long long y) { return y % 3 == 0 ? 380 : 375; };
    while (cin >> y >> m >> d >> k) {          // 讀到 EOF 為止
        long long t = d - 1 + k;
        for (int i = 1; i < m; i++) t += mlen(y, i);
        long long q = t / 1130;                // 每 3 年剛好 1130 天
        y += 3 * q;
        t -= 1130 * q;
        while (t >= ylen(y)) { t -= ylen(y); y++; }
        m = 1;
        while (t >= mlen(y, m)) { t -= mlen(y, m); m++; }
        cout << y << " " << m << " " << t + 1 << "\\n";
    }
}`, "while (cin >> y >> m >> d >> k) 在讀不到資料（EOF）時會結束；k 最大 10^9 再加上天數，用 long long 比較保險。"),
a057: S(`int main() {
    string s, cur;
    cin >> s;
    vector<pair<string, int>> st;
    int k = 0;
    for (char ch : s) {
        if (isdigit(ch)) k = k * 10 + (ch - '0');
        else if (ch == '[') { st.push_back({cur, k}); cur = ""; k = 0; }
        else if (ch == ']') {
            auto [prev, times] = st.back();
            st.pop_back();
            string rep;
            for (int i = 0; i < times; i++) rep += cur;
            cur = prev + rep;
        } else cur += ch;
    }
    cout << cur << endl;
}`),
a058: S(`int main() {
    int n, m;
    long long T;
    cin >> n >> m >> T;
    vector<long long> diff(n + 2, 0);
    for (int i = 0; i < m; i++) {
        int l, r, v;
        cin >> l >> r >> v;
        diff[l] += v;
        diff[r + 1] -= v;
    }
    long long cur = 0, best = 0;
    int pos = 1, cnt = 0;
    for (int i = 1; i <= n; i++) {
        cur += diff[i];
        if (cur > best) { best = cur; pos = i; }
        if (cur >= T) cnt++;
    }
    cout << best << " " << pos << " " << cnt << endl;
}`, "水量最大會到 2.5 × 10^9，超過 int（約 2.1 × 10^9），所以 diff、cur、best 都要用 long long。"),
a059: S(`int main() {
    int R, C;
    long long K;
    cin >> R >> C >> K;
    vector<string> g(R);
    for (auto &row : g) cin >> row;
    string cmd;
    cin >> cmd;
    int r = 0, c = 0, d = 0;
    for (int i = 0; i < R; i++)
        for (int j = 0; j < C; j++)
            if (g[i][j] == 'S') { r = i; c = j; }
    int dr[4] = {-1, 0, 1, 0}, dc[4] = {0, 1, 0, -1};     // 北、東、南、西
    set<pair<int, int>> seen = {{r, c}};
    map<array<int, 3>, long long> first;
    vector<array<int, 3>> states;
    long long rounds = 0;
    while (rounds < K) {
        array<int, 3> st = {r, c, d};
        if (first.count(st)) {
            long long s = first[st], cyc = rounds - s;
            st = states[s + (K - s) % cyc];
            r = st[0]; c = st[1]; d = st[2];
            break;
        }
        first[st] = rounds;
        states.push_back(st);
        for (char ch : cmd) {
            if (ch == 'L') d = (d + 3) % 4;
            else if (ch == 'R') d = (d + 1) % 4;
            else {
                int nr = r + dr[d], nc = c + dc[d];
                if (nr >= 0 && nr < R && nc >= 0 && nc < C && g[nr][nc] != '#') { r = nr; c = nc; seen.insert({r, c}); }
            }
        }
        rounds++;
    }
    cout << r + 1 << " " << c + 1 << " " << "NESW"[d] << "\\n" << seen.size() << endl;
}`, "用 array<int, 3> 當 map 的鍵很方便；左轉要寫成 (d + 3) % 4，因為 C++ 的 % 對負數會得到負的餘數（-1 % 4 是 -1）。"),
a060: S(`int main() {
    int n;
    cin >> n;
    vector<tuple<string, int, int>> t(n);
    for (auto &[name, s, p] : t) cin >> name >> s >> p;
    sort(t.begin(), t.end(), [](auto &a, auto &b) {
        if (get<1>(a) != get<1>(b)) return get<1>(a) > get<1>(b);   // 解題數多的在前
        if (get<2>(a) != get<2>(b)) return get<2>(a) < get<2>(b);   // 罰時少的在前
        return get<0>(a) < get<0>(b);                                // 最後比隊名
    });
    int rank = 0;
    for (int i = 0; i < n; i++) {
        auto &[name, s, p] = t[i];
        if (i == 0 || s != get<1>(t[i - 1]) || p != get<2>(t[i - 1])) rank = i + 1;
        cout << rank << " " << name << " " << s << " " << p << "\\n";
    }
}`, "sort 的第三個參數是 lambda 比較函式：回傳 true 代表 a 應該排在 b 前面。")

};
