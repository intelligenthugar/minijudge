// 首頁背景動畫：多種場景，全部用文字符號畫成。後台可以切換（config/site.bg）。
// 深 / 淺色模式各有配色；顏色不使用粉紅；使用者設定「減少動態效果」時只畫靜態的一張。
export const BG_LIST = [
  {id: "tree", name: "🎄 聖誕樹", desc: "程式符號排成的聖誕樹，文字變色、彩燈閃爍、飄著雪"},
  {id: "matrix", name: "💻 程式碼雨", desc: "一行行落下的程式碼，顏色在綠與青之間流動"},
  {id: "snow", name: "❄️ 大雪", desc: "遠近不同的雪花隨風飄落"},
  {id: "stars", name: "✨ 星空流星", desc: "閃爍的星星，不時劃過一道彩色流星"},
  {id: "fireworks", name: "🎆 煙火", desc: "文字組成的煙火升空、綻放、變色、散落"},
  {id: "plasma", name: "🌊 二進位波浪", desc: "0 與 1 排成的波浪，在青藍之間流動，偶爾閃過金光"},
  {id: "random", name: "🎲 每次隨機", desc: "每次開啟首頁，隨機挑一種場景"},
  {id: "off", name: "⏸ 關閉動畫", desc: "只顯示漸層背景"}
];

const root = typeof document !== "undefined" ? document.documentElement : null;
const font = px => `${px}px ui-monospace, Menlo, Consolas, monospace`;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

// ---------- 場景 1：聖誕樹 ----------
function treeScene(e) {
  const {ctx, W, H, fs, cw, ch} = e, R = rng(2026);
  const GLYPHS = "{}()[]<>/;=+*#01$&|~^".split("");
  const LIGHTS = [[2, 85, 56], [46, 95, 60], [192, 90, 58], [0, 0, 100]];   // 紅、金、藍、白
  const FLAKES = ["*", "·", "•", "."];
  const cols = Math.floor(W / cw), rows = Math.floor(H / ch);
  const T = Math.max(16, Math.floor(rows * 0.74)), top = Math.floor(rows * 0.12), cx = Math.floor(cols / 2);
  const maxHalf = Math.max(6, Math.min(Math.floor(cols * 0.42), Math.floor(T * 0.62)));
  const tiers = 5, tierH = Math.ceil(T / tiers);
  const cells = [{k: "star", r: top - 2, c: cx, p: 0}];
  for (let r = 0; r < T; r++) {
    const t = Math.floor(r / tierH), rr = r % tierH;
    const half = Math.max(1, Math.round(maxHalf * (0.12 + t * 0.13) + maxHalf * 0.35 * rr / tierH));
    for (let c = cx - half; c <= cx + half; c++) {
      const edge = c === cx - half || c === cx + half;
      cells.push({k: !edge && R() < 0.09 ? "light" : "leaf", r: top + r, c, p: R() * 6.28, g: edge ? (c < cx ? "/" : "\\") : GLYPHS[Math.floor(R() * GLYPHS.length)]});
    }
  }
  for (let r = 0; r < 3; r++) for (let c = cx - 1; c <= cx + 1; c++) cells.push({k: "trunk", r: top + T + r, c, p: 0, g: "#"});
  const n = clamp(Math.floor(W * H / 9000), 40, 140);
  const flakes = Array.from({length: n}, () => ({x: R() * W, y: R() * H, v: 14 + R() * 32, a: 0.3 + R() * 0.6, ph: R() * 6.28, g: FLAKES[Math.floor(R() * FLAKES.length)]}));
  return {draw(t, dt) {
    const light = e.light();
    ctx.clearRect(0, 0, W, H); ctx.textBaseline = "top"; ctx.textAlign = "left";
    for (const c of cells) {
      const x = c.c * cw, y = c.r * ch;
      ctx.shadowBlur = 0;
      if (c.k === "leaf") {
        const glow = Math.pow(Math.max(0, Math.sin(t / 800 - c.r * 0.4 + c.c * 0.1)), 8);
        const hue = 135 - glow * 85 + 8 * Math.sin(t / 2500 + c.p);
        ctx.fillStyle = `hsla(${hue},${70 + glow * 25}%,${(light ? 32 : 48) + glow * (light ? 14 : 22)}%,${(light ? 0.8 : 0.62) * (0.75 + 0.25 * glow)})`;
        ctx.font = font(fs); ctx.fillText(c.g, x, y);
      } else if (c.k === "light") {
        let [h, s, l] = LIGHTS[Math.floor(t / 900 + c.p) % 4];
        if (light && l === 100) { h = 215; s = 80; l = 45; }
        const blink = 0.5 + 0.5 * Math.sin(t / 260 + c.p * 5);
        ctx.fillStyle = `hsla(${h},${s}%,${l}%,${0.4 + 0.6 * blink})`;
        if (!light && blink > 0.6) { ctx.shadowColor = `hsl(${h},${s}%,${l}%)`; ctx.shadowBlur = 10; }
        ctx.font = font(Math.round(fs * 1.15)); ctx.fillText("o", x, y);
      } else if (c.k === "trunk") {
        ctx.fillStyle = `hsla(28,45%,${light ? 30 : 42}%,0.8)`;
        ctx.font = font(fs); ctx.fillText(c.g, x, y);
      } else {
        ctx.font = font(Math.round(fs * (2 + 0.2 * Math.sin(t / 500)))); ctx.textAlign = "center";
        ctx.fillStyle = `hsl(48,100%,${light ? 45 : 62}%)`;
        if (!light) { ctx.shadowColor = "hsl(48,100%,60%)"; ctx.shadowBlur = 18; }
        ctx.fillText("★", x + cw / 2, y); ctx.textAlign = "left";
      }
    }
    ctx.shadowBlur = 0; ctx.font = font(Math.round(fs * 0.9));
    for (const f of flakes) {
      f.y += f.v * dt / 1000; f.x += Math.sin(t / 1200 + f.ph) * 8 * dt / 1000;
      if (f.y > H + 10) { f.y = -10; f.x = Math.random() * W; }
      ctx.fillStyle = light ? `rgba(100,130,180,${f.a})` : `rgba(235,245,255,${f.a})`;
      ctx.fillText(f.g, f.x, f.y);
    }
  }};
}

// ---------- 場景 2：程式碼雨 ----------
function matrixScene(e) {
  const {ctx, W, H, fs, cw, ch} = e, R = rng(7);
  const cols = Math.floor(W / cw), rows = Math.floor(H / ch), G = "01{}()[]<>/;=+*#$&|~^%".split("");
  const drops = Array.from({length: cols}, () => ({y: R() * rows, v: 6 + R() * 14, len: 8 + Math.floor(R() * 14)}));
  return {draw(t, dt) {
    const light = e.light();
    ctx.clearRect(0, 0, W, H); ctx.textBaseline = "top"; ctx.textAlign = "left"; ctx.font = font(fs);
    drops.forEach((d, c) => {
      d.y += d.v * dt / 1000;
      if (d.y - d.len > rows) { d.y = -1; d.v = 6 + Math.random() * 14; d.len = 8 + Math.floor(Math.random() * 14); }
      const hue = 150 + 40 * Math.sin(t / 3500 + c * 0.12);          // 綠 ↔ 青
      for (let k = 0; k < d.len; k++) {
        const row = Math.floor(d.y) - k;
        if (row < 0 || row >= rows) continue;
        const fade = 1 - k / d.len;
        ctx.fillStyle = k === 0 ? `hsla(${hue},40%,${light ? 28 : 90}%,${light ? 0.9 : 0.85})` : `hsla(${hue},75%,${light ? 30 : 52}%,${fade * (light ? 0.75 : 0.6)})`;
        ctx.fillText(G[(c * 31 + row * 17 + Math.floor(t / 400) * (k + 1)) % G.length], c * cw, row * ch);
      }
    });
  }};
}

// ---------- 場景 3：大雪 ----------
function snowScene(e) {
  const {ctx, W, H, fs} = e, R = rng(11), CH = ["❄", "❅", "*", "·", "•"];
  const n = clamp(Math.floor(W * H / 6500), 60, 220);
  const fl = Array.from({length: n}, () => ({x: R() * W, y: R() * H, z: R(), ph: R() * 6.28, g: CH[Math.floor(R() * CH.length)]}));
  return {draw(t, dt) {
    const light = e.light(), wind = Math.sin(t / 4000) * 30;
    ctx.clearRect(0, 0, W, H); ctx.textBaseline = "top"; ctx.textAlign = "left";
    for (const f of fl) {
      f.y += (20 + f.z * 70) * dt / 1000;
      f.x += (wind * f.z + Math.sin(t / 900 + f.ph) * 14 * f.z) * dt / 1000;
      if (f.y > H + 20) { f.y = -20; f.x = Math.random() * W; }
      if (f.x > W + 20) f.x = -20;
      if (f.x < -20) f.x = W + 20;
      ctx.font = font(Math.round(fs * (0.7 + f.z * 1.4)));
      ctx.fillStyle = light ? `rgba(90,120,175,${0.25 + f.z * 0.55})` : `rgba(235,245,255,${0.2 + f.z * 0.65})`;
      ctx.fillText(f.g, f.x, f.y);
    }
  }};
}

// ---------- 場景 4：星空與流星 ----------
function starsScene(e) {
  const {ctx, W, H, fs} = e, R = rng(5), CH = ["·", "+", "*", "✦"];
  const n = clamp(Math.floor(W * H / 5000), 60, 260);
  const st = Array.from({length: n}, () => ({x: R() * W, y: R() * H, p: R() * 6.28, s: 600 + R() * 1400, g: CH[Math.floor(R() * CH.length)]}));
  let meteors = [], next = 0;
  return {draw(t, dt) {
    const light = e.light();
    ctx.clearRect(0, 0, W, H); ctx.textBaseline = "top"; ctx.textAlign = "left"; ctx.font = font(fs);
    for (const s of st) {
      const a = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(t / s.s + s.p));
      ctx.fillStyle = light ? `rgba(70,90,150,${a * 0.7})` : `rgba(230,238,255,${a})`;
      ctx.fillText(s.g, s.x, s.y);
    }
    if (t > next) { meteors.push({x: W * (0.3 + Math.random() * 0.7), y: Math.random() * H * 0.4, age: 0}); next = t + 900 + Math.random() * 2200; }
    meteors = meteors.filter(m => m.age < 1.2);
    for (const m of meteors) {
      m.age += dt / 1000; m.x -= 520 * dt / 1000; m.y += 300 * dt / 1000;
      for (let k = 0; k < 16; k++) {
        const a = (1 - k / 16) * Math.min(1, (1.2 - m.age) * 2);
        ctx.fillStyle = `hsla(${200 - k * 9 + 40 * m.age},90%,${light ? 40 : 70}%,${a})`;   // 青 → 金
        ctx.font = font(Math.round(fs * (k === 0 ? 1.6 : 1)));
        ctx.fillText(k === 0 ? "*" : k < 5 ? "-" : "·", m.x + k * 7.8, m.y - k * 4.5);
      }
    }
  }};
}

// ---------- 場景 5：煙火 ----------
function fireScene(e) {
  const {ctx, W, H, fs} = e, PAL = [2, 46, 120, 190, 210, 28];   // 紅、金、綠、青、藍、橘
  let rockets = [], parts = [], next = 0;
  return {draw(t, dt) {
    const light = e.light(), s = dt / 1000;
    ctx.clearRect(0, 0, W, H); ctx.textBaseline = "top"; ctx.textAlign = "center";
    if (t > next) { rockets.push({x: W * (0.15 + Math.random() * 0.7), y: H, ty: H * (0.15 + Math.random() * 0.35), hue: PAL[Math.floor(Math.random() * PAL.length)]}); next = t + 700 + Math.random() * 1300; }
    rockets = rockets.filter(r => {
      r.y -= H * 0.55 * s;
      ctx.font = font(fs); ctx.fillStyle = light ? "rgba(120,90,20,.9)" : "rgba(255,230,160,.9)";
      ctx.fillText("|", r.x, r.y); ctx.fillText("·", r.x, r.y + fs * 1.2);
      if (r.y > r.ty) return true;
      const n = 36 + Math.floor(Math.random() * 28), v0 = 90 + Math.random() * 120;
      for (let i = 0; i < n; i++) {
        const a = i / n * 6.283 + Math.random() * 0.2, v = v0 * (0.5 + Math.random() * 0.5);
        parts.push({x: r.x, y: r.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, hue: r.hue, life: 1.3 + Math.random() * 0.9, age: 0, g: "*+o.".charAt(Math.floor(Math.random() * 4))});
      }
      return false;
    });
    parts = parts.filter(p => p.age < p.life);
    for (const p of parts) {
      p.age += s; p.vy += 90 * s; p.vx *= 0.99; p.x += p.vx * s; p.y += p.vy * s;
      const f = 1 - p.age / p.life;
      ctx.font = font(Math.round(fs * (0.8 + f * 0.6)));
      ctx.fillStyle = `hsla(${Math.min(250, p.hue + 30 * p.age)},95%,${light ? 42 : 62}%,${f})`;
      ctx.fillText(p.g, p.x, p.y);
    }
    ctx.textAlign = "left";
  }};
}

// ---------- 場景 6：二進位波浪 ----------
function plasmaScene(e) {
  const {ctx, W, H, fs, cw, ch} = e, cols = Math.floor(W / cw), rows = Math.floor(H / ch);
  return {fps: 20, draw(t) {
    const light = e.light();
    ctx.clearRect(0, 0, W, H); ctx.textBaseline = "top"; ctx.textAlign = "left"; ctx.font = font(fs);
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const v = Math.sin(c * 0.18 + t / 900) + Math.sin(r * 0.3 - t / 1100) + Math.sin((c + r) * 0.12 + t / 1500) + Math.sin(Math.hypot(c - cols / 2, (r - rows / 2) * 2) * 0.15 - t / 700);
      const n = (v + 4) / 8;
      if (n < 0.3) continue;
      ctx.fillStyle = `hsla(${n > 0.9 ? 48 : 165 + 75 * n},${n > 0.9 ? 95 : 80}%,${light ? 38 : 58}%,${0.06 + 0.55 * n * n * n})`;
      ctx.fillText(n > 0.55 ? "1" : "0", c * cw, r * ch);
    }
  }};
}

const SCENES = {tree: treeScene, matrix: matrixScene, snow: snowScene, stars: starsScene, fireworks: fireScene, plasma: plasmaScene};
const SCENE_IDS = Object.keys(SCENES);

function makeEnv(cv, ctx) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2), W = innerWidth, H = innerHeight;
  cv.width = W * dpr; cv.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const fs = Math.max(11, Math.min(18, Math.round(Math.min(W, H) / 38)));
  ctx.font = font(fs);
  return {ctx, W, H, fs, cw: ctx.measureText("M").width, ch: fs * 1.2, light: () => root.dataset.theme === "light"};
}

let state = {name: null, stop: null}, randomPick = null;

export function stopBg() { if (state.stop) state.stop(); state = {name: null, stop: null}; }

// setting：場景代號、"random"（每次隨機）或 "off"（關閉）。同一個設定重複呼叫不會重新開始。
export function startBg(setting) {
  const cv = document.getElementById("bg");
  if (!cv) return;
  let name = setting || "tree";
  if (name === "random") { randomPick = randomPick || SCENE_IDS[Math.floor(Math.random() * SCENE_IDS.length)]; name = randomPick; }
  if (state.name === name) return;
  stopBg();
  const ctx = cv.getContext("2d");
  if (name === "off" || !SCENES[name]) { ctx.clearRect(0, 0, cv.width, cv.height); state.name = name; return; }
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let scene, last = 0, raf = 0, timer = 0;
  const init = () => {
    scene = SCENES[name](makeEnv(cv, ctx));
    if (still) { for (let i = 0; i < 60; i++) scene.draw(i * 50, 50); scene.draw(3000, 0); }
  };
  const loop = t => {
    raf = requestAnimationFrame(loop);
    if (t - last < 1000 / (scene.fps || 30)) return;                 // 約 30 幀就夠，省電
    const dt = Math.min(t - last, 100); last = t;
    scene.draw(t, dt);
  };
  const onResize = () => { clearTimeout(timer); timer = setTimeout(init, 150); };
  const mo = still ? new MutationObserver(() => scene.draw(3000, 0)) : null;
  init();
  if (still) mo.observe(root, {attributes: true, attributeFilter: ["data-theme"]}); else raf = requestAnimationFrame(loop);
  addEventListener("resize", onResize);
  state = {name, stop: () => { cancelAnimationFrame(raf); clearTimeout(timer); removeEventListener("resize", onResize); if (mo) mo.disconnect(); }};
}
