// Cloudflare Worker：把網頁送來的 C++ 程式轉給 OnlineCompiler.io 執行。
// API 金鑰只放在這裡（Worker 的「機密」設定），不會出現在網站的程式碼裡。
//
// 需要在 Worker 設定兩個變數：
//   SITE_ORIGIN              你的網站網址（只寫到網域，不含路徑），例如 https://intelligenthugar.github.io
//                            要同時允許本機測試的話，用逗號隔開：https://intelligenthugar.github.io,http://localhost:8000
//   ONLINECOMPILER_API_KEY   OnlineCompiler.io 的 API 金鑰（請設成「機密 / Secret」）

const API = "https://api.onlinecompiler.io/api/v2/piston/execute";

export default {
  async fetch(request, env) {
    const allowed = (env.SITE_ORIGIN || "").split(",").map(s => s.trim()).filter(Boolean);
    const origin = request.headers.get("Origin");
    const ok = allowed.includes(origin);
    const cors = {
      "Access-Control-Allow-Origin": ok ? origin : (allowed[0] || ""),
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };
    const json = (obj, status = 200) => new Response(JSON.stringify(obj), {status, headers: {...cors, "Content-Type": "application/json"}});

    if (request.method === "OPTIONS") return new Response(null, {status: ok ? 204 : 403, headers: cors});
    if (!ok) return json({message: "Forbidden"}, 403);                      // 不是你的網站，一律拒絕
    if (request.method !== "POST") return json({message: "Method not allowed"}, 405);

    let body;
    try { body = await request.json(); } catch (e) { return json({message: "請求格式錯誤"}, 400); }
    const code = typeof body.code === "string" ? body.code : "";
    const stdin = typeof body.stdin === "string" ? body.stdin : "";
    if (!code) return json({message: "沒有程式碼"}, 400);
    if (code.length > 64000 || stdin.length > 64000) return json({message: "程式碼或輸入太長（上限 64000 字元）"}, 413);
    const timeout = Math.min(Math.max(parseInt(body.timeout, 10) || 3000, 500), 10000);   // 毫秒，限制在 0.5～10 秒

    // 只允許執行 C++：請求內容由 Worker 自己組，網頁不能指定語言或其他參數
    const res = await fetch(API, {
      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": env.ONLINECOMPILER_API_KEY},
      body: JSON.stringify({language: "c++", version: "*", files: [{name: "main.cpp", content: code}], stdin, run_timeout: timeout})
    });
    return new Response(res.body, {status: res.status, headers: {...cors, "Content-Type": "application/json"}});
  }
};
