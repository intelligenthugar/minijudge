// 首頁背景動畫：用程式符號排成的聖誕樹。文字會一波一波變色、燈會閃爍，旁邊還有飄落的雪。
// 深 / 淺色模式各有配色；使用者設定「減少動態效果」時只畫靜態的一張。
const cv = document.getElementById("bg");
if (cv) {
  const ctx = cv.getContext("2d"), root = document.documentElement;
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const GLYPHS = "{}()[]<>/;=+*#01$&|~^".split("");
  const LIGHTS = [[2, 85, 56], [46, 95, 60], [192, 90, 58], [0, 0, 100]];   // 紅、金、藍、白（不使用粉紅）
  const FLAKES = ["*", "·", "•", "."];
  const font = px => `${px}px ui-monospace, Menlo, Consolas, monospace`;
  let W, H, cw, ch, fs, cells = [], flakes = [], last = 0, timer;

  const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

  function layout() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fs = Math.max(11, Math.min(18, Math.round(Math.min(W, H) / 38)));
    ctx.font = font(fs);
    cw = ctx.measureText("M").width; ch = fs * 1.2;
    const cols = Math.floor(W / cw), rows = Math.floor(H / ch), R = rng(2026);
    const T = Math.max(16, Math.floor(rows * 0.74)), top = Math.floor(rows * 0.12), cx = Math.floor(cols / 2);
    const maxHalf = Math.max(6, Math.min(Math.floor(cols * 0.42), Math.floor(T * 0.62)));
    const tiers = 5, tierH = Math.ceil(T / tiers);
    cells = [{k: "star", r: top - 2, c: cx, p: 0}];
    for (let r = 0; r < T; r++) {                      // 一層一層往外長的樹
      const t = Math.floor(r / tierH), rr = r % tierH;
      const half = Math.max(1, Math.round(maxHalf * (0.12 + t * 0.13) + maxHalf * 0.35 * rr / tierH));
      for (let c = cx - half; c <= cx + half; c++) {
        const edge = c === cx - half || c === cx + half;
        const k = !edge && R() < 0.09 ? "light" : "leaf";
        cells.push({k, r: top + r, c, p: R() * 6.28, g: edge ? (c < cx ? "/" : "\\") : GLYPHS[Math.floor(R() * GLYPHS.length)]});
      }
    }
    for (let r = 0; r < 3; r++) for (let c = cx - 1; c <= cx + 1; c++) cells.push({k: "trunk", r: top + T + r, c, p: 0, g: "#"});
    const n = Math.max(40, Math.min(140, Math.floor(W * H / 9000)));
    flakes = Array.from({length: n}, () => ({x: R() * W, y: R() * H, v: 14 + R() * 32, a: 0.3 + R() * 0.6, ph: R() * 6.28, g: FLAKES[Math.floor(R() * FLAKES.length)]}));
  }

  function draw(t, dt) {
    const light = root.dataset.theme === "light";
    ctx.clearRect(0, 0, W, H);
    ctx.textBaseline = "top"; ctx.textAlign = "left";
    for (const c of cells) {
      const x = c.c * cw, y = c.r * ch;
      ctx.shadowBlur = 0;
      if (c.k === "leaf") {                            // 綠色的字，一道金光掃過時會變色
        const glow = Math.pow(Math.max(0, Math.sin(t / 800 - c.r * 0.4 + c.c * 0.1)), 8);
        const hue = 135 - glow * 85 + 8 * Math.sin(t / 2500 + c.p);
        ctx.fillStyle = `hsla(${hue},${70 + glow * 25}%,${(light ? 32 : 48) + glow * (light ? 14 : 22)}%,${(light ? 0.8 : 0.62) * (0.75 + 0.25 * glow)})`;
        ctx.font = font(fs);
        ctx.fillText(c.g, x, y);
      } else if (c.k === "light") {                    // 彩燈：顏色輪流換、明暗閃爍
        let [h, s, l] = LIGHTS[Math.floor(t / 900 + c.p) % 4];
        if (light && l === 100) { h = 215; s = 80; l = 45; }
        const blink = 0.5 + 0.5 * Math.sin(t / 260 + c.p * 5);
        ctx.fillStyle = `hsla(${h},${s}%,${l}%,${0.4 + 0.6 * blink})`;
        if (!light && blink > 0.6) { ctx.shadowColor = `hsl(${h},${s}%,${l}%)`; ctx.shadowBlur = 10; }
        ctx.font = font(Math.round(fs * 1.15));
        ctx.fillText("o", x, y);
      } else if (c.k === "trunk") {
        ctx.fillStyle = `hsla(28,45%,${light ? 30 : 42}%,0.8)`;
        ctx.font = font(fs);
        ctx.fillText(c.g, x, y);
      } else {                                         // 樹頂的星星，慢慢呼吸
        ctx.font = font(Math.round(fs * (2 + 0.2 * Math.sin(t / 500))));
        ctx.textAlign = "center";
        ctx.fillStyle = `hsl(48,100%,${light ? 45 : 62}%)`;
        if (!light) { ctx.shadowColor = "hsl(48,100%,60%)"; ctx.shadowBlur = 18; }
        ctx.fillText("★", x + cw / 2, y);
        ctx.textAlign = "left";
      }
    }
    ctx.shadowBlur = 0; ctx.font = font(Math.round(fs * 0.9));
    for (const f of flakes) {                          // 雪
      f.y += f.v * dt / 1000; f.x += Math.sin(t / 1200 + f.ph) * 8 * dt / 1000;
      if (f.y > H + 10) { f.y = -10; f.x = Math.random() * W; }
      ctx.fillStyle = light ? `rgba(100,130,180,${f.a})` : `rgba(235,245,255,${f.a})`;
      ctx.fillText(f.g, f.x, f.y);
    }
  }

  function loop(t) {
    requestAnimationFrame(loop);
    if (t - last < 33) return;                         // 約 30 幀就夠，省電
    const dt = Math.min(t - last, 100); last = t;
    draw(t, dt);
  }

  layout();
  if (still) {
    draw(2000, 0);
    new MutationObserver(() => draw(2000, 0)).observe(root, {attributes: true, attributeFilter: ["data-theme"]});
  } else requestAnimationFrame(loop);
  addEventListener("resize", () => { clearTimeout(timer); timer = setTimeout(() => { layout(); if (still) draw(2000, 0); }, 150); });
}
