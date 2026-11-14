// 深淺色切換：預設深色，選擇會記在瀏覽器（localStorage）
(function () {
  var k = "mj-theme", r = document.documentElement;
  function get() { try { return localStorage.getItem(k) || "dark"; } catch (e) { return "dark"; } }
  function label(t) { var b = document.getElementById("theme"); if (b) b.textContent = t === "dark" ? "☀️ 淺色" : "🌙 深色"; }
  function set(t) { r.setAttribute("data-theme", t); try { localStorage.setItem(k, t); } catch (e) {} label(t); }
  r.setAttribute("data-theme", get());
  document.addEventListener("DOMContentLoaded", function () {
    var hd = document.querySelector("header");
    if (hd) {
      var hh = function () { r.style.setProperty("--hh", hd.offsetHeight + "px"); };
      hh();
      if (window.ResizeObserver) new ResizeObserver(hh).observe(hd);
    }
    var b = document.getElementById("theme");
    if (!b) return;
    label(get());
    b.onclick = function () { set(r.getAttribute("data-theme") === "dark" ? "light" : "dark"); };
  });
})();
