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
}`)
};
