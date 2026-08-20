(function () {
  'use strict';

  // Ano
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // ── CONTADOR REGRESSIVO 10 MIN ──────────────
  (function () {
    var KEY = 'nv_countdown_end';
    var DURATION = 10 * 60 * 1000; // 10 minutos em ms
    var el = document.getElementById('countdown');
    if (!el) return;

    var end = parseInt(sessionStorage.getItem(KEY), 10);
    if (!end || end <= Date.now()) {
      end = Date.now() + DURATION;
      sessionStorage.setItem(KEY, end);
    }

    function tick() {
      var rem = Math.max(0, Math.round((end - Date.now()) / 1000));
      var m = Math.floor(rem / 60);
      var s = rem % 60;
      el.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
      if (rem <= 0) {
        end = Date.now() + DURATION;
        sessionStorage.setItem(KEY, end);
      }
    }
    tick();
    setInterval(tick, 1000);
  })();


  // ── SCROLL STUFF ───────────────────────────
  var header = document.getElementById('header');
  var sticky = document.getElementById('sticky');
  var hero = document.getElementById('hero');
  var lastY = 0;

  function onScroll() {
    var y = window.scrollY;
    if (header) header.style.boxShadow = y > 50 ? '0 2px 20px rgba(0,0,0,.5)' : '';
    // sticky: mostra apos hero
    if (sticky && hero) {
      var heroBot = hero.getBoundingClientRect().bottom;
      sticky.classList.toggle('show', heroBot < 0);
    }
    lastY = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── CHAOS TABS ─────────────────────────────
  (function () {
    var tabs   = document.querySelectorAll('.chaos-tab');
    var panels = document.querySelectorAll('.chaos-panel');
    if (!tabs.length) return;

    function activate(idx) {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      panels.forEach(function (p) { p.classList.remove('active'); });
      tabs[idx].classList.add('active');
      panels[idx].classList.add('active');
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        clearInterval(autoRotate);
        activate(parseInt(tab.dataset.tab));
      });
    });

    // Auto-rotate passively
    var current = 0;
    var autoRotate = setInterval(function () {
      current = (current + 1) % tabs.length;
      activate(current);
    }, 2500);
  })();

  // ── FAQ ────────────────────────────────────
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── SMOOTH SCROLL ──────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      var t = id ? document.getElementById(id) : null;
      if (t) {
        e.preventDefault();
        var offset = 100;
        var top = t.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
