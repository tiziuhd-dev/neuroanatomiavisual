// ============================================================
// GUIA DE EQUILÍBRIO — JS MÍNIMO E PERFORMÁTICO
// ============================================================

// Sticky bar: aparece após o hero sair da tela
(function () {
  var bar  = document.getElementById('sticky-bar');
  var hero = document.querySelector('.hero');
  if (!bar || !hero) return;

  var io = new IntersectionObserver(function (entries) {
    bar.classList.toggle('show', !entries[0].isIntersecting);
  }, { threshold: 0.05 });

  io.observe(hero);
})();

// FAQ: fecha o anterior ao abrir um novo
(function () {
  var items = document.querySelectorAll('.faq__item');
  items.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      items.forEach(function (other) {
        if (other !== item && other.open) other.open = false;
      });
    });
  });
})();

// Smooth scroll para âncoras
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

// ── COUNTDOWN TIMER ───────────────────────────────────────────
(function () {
  var el = document.getElementById('countdown');
  if (!el) return;
  var total = 8 * 60; // 8 minutos em segundos
  function tick() {
    var m = Math.floor(total / 60);
    var s = total % 60;
    el.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    if (total > 0) { total--; } else { total = 8 * 60; } // reinicia
  }
  tick();
  setInterval(tick, 1000);
})();


// ── CARROSSEL DE PÁGINAS ──────────────────────────────────────
(function () {
  var track   = document.getElementById('carousel-track');
  var prevBtn = document.getElementById('prev-btn');
  var nextBtn = document.getElementById('next-btn');
  var dotsEl  = document.getElementById('carousel-dots');
  if (!track || !prevBtn || !nextBtn) return;

  var slides     = track.querySelectorAll('.carousel-slide');
  var totalSlides = slides.length;
  var current    = 0;
  var slideWidth = 0;
  var visibleCount = 1;

  function calcDimensions() {
    slideWidth   = slides[0].offsetWidth + 16; // 16 = gap
    visibleCount = Math.floor(track.parentElement.offsetWidth / slideWidth) || 1;
  }

  // Criar dots
  function buildDots() {
    dotsEl.innerHTML = '';
    var total = totalSlides - visibleCount + 1;
    if (total <= 1) { dotsEl.style.display = 'none'; return; }
    dotsEl.style.display = 'flex';
    for (var i = 0; i < total; i++) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.dataset.index = i;
      dot.addEventListener('click', function () { goTo(+this.dataset.index); });
      dotsEl.appendChild(dot);
    }
  }

  function updateDots() {
    var dots = dotsEl.querySelectorAll('.carousel-dot');
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    var max = Math.max(0, totalSlides - visibleCount);
    current = Math.max(0, Math.min(index, max));
    track.style.transform = 'translateX(-' + (current * slideWidth) + 'px)';
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= max;
    updateDots();
  }

  prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); });

  // Teclado
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  // Touch / swipe
  var touchStart = 0;
  track.addEventListener('touchstart', function (e) {
    touchStart = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', function (e) {
    var diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });

  // Init + resize
  function init() {
    calcDimensions();
    buildDots();
    goTo(0);
  }

  init();
  window.addEventListener('resize', function () {
    calcDimensions();
    buildDots();
    goTo(Math.min(current, Math.max(0, totalSlides - visibleCount)));
  });
})();
