#!/usr/bin/env python3
"""在自己電腦上用 C++ 評測：
    python tools/judge_cpp.py a001 my.cpp
需要安裝 g++ 與 node（第一次會自動產生測資檔 tools/testdata.json）。
用 g++ -O2 -std=c++17 編譯，依題目的時間限制逐筆比對輸出（規則和網站相同：忽略每行尾端空白與結尾空行）。"""
import json, os, subprocess, sys, tempfile, time

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "testdata.json")

def norm(s):
    return "\n".join(l.rstrip() for l in s.replace("\r", "").split("\n")).strip()

def load():
    if not os.path.exists(DATA):
        print("第一次使用：產生測資檔…")
        if subprocess.run(["node", os.path.join(HERE, "export_tests.mjs")]).returncode:
            sys.exit("產生測資失敗，請確認已安裝 node")
    return json.load(open(DATA, encoding="utf-8"))

def main():
    if len(sys.argv) != 3:
        sys.exit("用法：python tools/judge_cpp.py <題號> <程式.cpp>")
    pid, src = sys.argv[1], sys.argv[2]
    data = load()
    if pid not in data:
        sys.exit("找不到題號：" + pid)
    prob = data[pid]
    exe = os.path.join(tempfile.mkdtemp(), "a.out")
    r = subprocess.run(["g++", "-O2", "-std=c++17", "-o", exe, src], capture_output=True, text=True)
    if r.returncode:
        print("CE 編譯錯誤\n" + r.stderr); sys.exit(1)
    ok, total = 0, len(prob["tests"])
    for k, (inp, exp) in enumerate(prob["tests"], 1):
        t0 = time.time()
        try:
            p = subprocess.run([exe], input=inp + "\n", capture_output=True, text=True, timeout=prob["limit"] / 1000)
        except subprocess.TimeoutExpired:
            print(f"測資 {k}：TLE"); continue
        ms = int((time.time() - t0) * 1000)
        if p.returncode:
            print(f"測資 {k}：RE（結束碼 {p.returncode}）")
        elif norm(p.stdout) != norm(exp):
            print(f"測資 {k}：WA")
        else:
            ok += 1; print(f"測資 {k}：AC（{ms} ms）")
    print(f"{pid} {prob['title']}：{ok}/{total} 通過" + ("　🎉 Accepted" if ok == total else ""))
    sys.exit(0 if ok == total else 2)

if __name__ == "__main__":
    main()
