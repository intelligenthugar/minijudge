#!/usr/bin/env python3
"""在自己電腦上用 C++ 評測：先執行一次 node tools/export_tests.mjs 產生 testdata/，然後
    python tools/judge_cpp.py a001 my.cpp
需要安裝 g++。會用 g++ -O2 -std=c++17 編譯，依題目的時間限制逐筆比對輸出（和網站的比對規則相同：忽略每行尾端空白與結尾空行）。"""
import json, os, subprocess, sys, tempfile, time

def norm(s):
    return "\n".join(l.rstrip() for l in s.replace("\r", "").split("\n")).strip()

def main():
    if len(sys.argv) != 3:
        sys.exit("用法：python tools/judge_cpp.py <題號> <程式.cpp>")
    pid, src = sys.argv[1], sys.argv[2]
    root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "testdata", pid)
    if not os.path.isdir(root):
        sys.exit("找不到測資，請先執行：node tools/export_tests.mjs")
    meta = json.load(open(os.path.join(root, "meta.json"), encoding="utf-8"))
    exe = os.path.join(tempfile.mkdtemp(), "a.out")
    r = subprocess.run(["g++", "-O2", "-std=c++17", "-o", exe, src], capture_output=True, text=True)
    if r.returncode:
        print("CE 編譯錯誤\n" + r.stderr); sys.exit(1)
    ok = 0
    for k in range(1, meta["tests"] + 1):
        inp = open(os.path.join(root, f"{k}.in"), encoding="utf-8").read()
        exp = open(os.path.join(root, f"{k}.out"), encoding="utf-8").read()
        t0 = time.time()
        try:
            p = subprocess.run([exe], input=inp, capture_output=True, text=True, timeout=meta["limit"] / 1000)
        except subprocess.TimeoutExpired:
            print(f"測資 {k}：TLE"); continue
        ms = int((time.time() - t0) * 1000)
        if p.returncode:
            print(f"測資 {k}：RE（結束碼 {p.returncode}）")
        elif norm(p.stdout) != norm(exp):
            print(f"測資 {k}：WA")
        else:
            ok += 1; print(f"測資 {k}：AC（{ms} ms）")
    print(f"{pid} {meta['title']}：{ok}/{meta['tests']} 通過" + ("　🎉 Accepted" if ok == meta["tests"] else ""))
    sys.exit(0 if ok == meta["tests"] else 2)

if __name__ == "__main__":
    main()
