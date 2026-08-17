(function(){
'use strict';

// Ano
var yr = document.getElementById('yr');
if(yr) yr.textContent = new Date().getFullYear();



// ── SCROLL STUFF ───────────────────────────
var header  = document.getElementById('header');
var sticky  = document.getElementById('sticky');
var hero    = document.getElementById('hero');
var lastY   = 0;

function onScroll(){
  var y = window.scrollY;
  if(header) header.style.boxShadow = y>50 ? '0 2px 20px rgba(0,0,0,.5)' : '';
  // sticky: mostra apos hero
  if(sticky && hero){
    var heroBot = hero.getBoundingClientRect().bottom;
    sticky.classList.toggle('show', heroBot < 0);
  }
  lastY = y;
}

window.addEventListener('scroll', onScroll, {passive:true});

// ── FAQ ────────────────────────────────────
document.querySelectorAll('.faq-q').forEach(function(btn){
  btn.addEventListener('click',function(){
    var item = btn.closest('.faq-item');
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(function(i){i.classList.remove('open')});
    if(!isOpen) item.classList.add('open');
  });
});

// Wrapper faq-a content (necessario para animacao de altura)
document.querySelectorAll('.faq-a').forEach(function(el){
  var txt = el.innerHTML;
  el.innerHTML = '<div class="faq-a-in">'+txt+'</div>';
});

// ── SMOOTH SCROLL ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    var id = a.getAttribute('href').slice(1);
    var t  = id ? document.getElementById(id) : null;
    if(t){
      e.preventDefault();
      var offset = 80;
      var top = t.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({top:top,behavior:'smooth'});
    }
  });
});

})();
