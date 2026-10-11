/* Marcus Valério · portfolio
   Language switch, reveals, the square cursor, films and contact. No dependencies. */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var META = {
    pt: {
      title: 'Marcus Valério · Estratégia, criação e sistemas',
      desc: 'Portfólio de Marcus Valério: estratégia, direção criativa, marketing, produtos e sistemas. Ideias tiradas do papel.'
    },
    en: {
      title: 'Marcus Valério · Strategy, creative direction and systems',
      desc: 'Portfolio of Marcus Valério: strategy, creative direction, marketing, products and systems. Ideas taken off the page.'
    }
  };

  /* ── language ─────────────────────────────────────────────────── */
  function setLang(l, save) {
    root.setAttribute('data-lang', l);
    root.lang = l === 'pt' ? 'pt-BR' : 'en';
    document.title = META[l].title;
    var d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute('content', META[l].desc);
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === l));
    });
    document.querySelectorAll('[data-alt-pt]').forEach(function (el) {
      var v = el.getAttribute('data-alt-' + l);
      if (el.tagName === 'VIDEO') el.setAttribute('aria-label', v); else el.setAttribute('alt', v);
    });
    document.querySelectorAll('[data-a-pt]').forEach(function (el) {
      el.setAttribute('aria-label', el.getAttribute('data-a-' + l));
    });
    // restart the hero of the chosen language so its story begins from the signature
    document.querySelectorAll('.hero-art[data-l="' + l + '"] svg').forEach(function (svg) {
      if (svg.setCurrentTime) svg.setCurrentTime(reduced ? 4.5 : 0);
    });
    if (save) { try { localStorage.setItem('mv-lang', l); } catch (e) {} }
  }
  document.querySelectorAll('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-set-lang'), true); });
  });
  setLang(root.getAttribute('data-lang') || 'pt', false);

  /* ── reduced motion: hold every SVG on a composed frame ───────── */
  if (reduced) {
    document.querySelectorAll('.hero-art svg').forEach(function (s) { s.pauseAnimations(); s.setCurrentTime(4.5); });
    document.querySelectorAll('.stamp svg, .panel svg').forEach(function (s) { s.pauseAnimations(); s.setCurrentTime(3); });
  }

  /* ── bar ──────────────────────────────────────────────────────── */
  var bar = document.querySelector('.bar');
  function onScroll() { bar.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['trabalho', 'sobre', 'abordagem', 'contato'].forEach(function (id) {
      var el = document.getElementById(id); if (el) spy.observe(el);
    });
  }

  /* ── reveals ──────────────────────────────────────────────────── */
  var revealables = document.querySelectorAll('.reveal, .reveal-img');
  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ── areas: the square points at the field you are reading ────── */
  var areas = document.querySelector('.areas');
  if (areas) {
    areas.querySelectorAll('.area').forEach(function (a) {
      a.addEventListener('mouseenter', function () { areas.setAttribute('data-hover', a.getAttribute('data-i')); });
    });
    areas.addEventListener('mouseleave', function () { areas.removeAttribute('data-hover'); });
  }

  /* ── films: play when seen, pause when not, always pausable ───── */
  document.querySelectorAll('.film').forEach(function (v) {
    var btn = v.parentNode.querySelector('.film-toggle');
    var userPaused = reduced;
    function sync() { if (btn) btn.setAttribute('aria-pressed', String(v.paused)); }
    function play() { v.preload = 'auto'; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    v.addEventListener('play', sync); v.addEventListener('pause', sync);
    if (btn) btn.addEventListener('click', function () {
      if (v.paused) { userPaused = false; play(); } else { userPaused = true; v.pause(); }
    });
    sync();
    if (btn) btn.setAttribute('aria-pressed', 'true');
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !userPaused) play();
          else if (!e.isIntersecting && !v.paused) v.pause();
        });
      }, { threshold: 0.35 }).observe(v);
    }
  });

  /* ── contact: copy the address ────────────────────────────────── */
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy');
      function done() { b.classList.add('copied'); setTimeout(function () { b.classList.remove('copied'); }, 2200); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
      } else { fallback(text); done(); }
    });
  });
  function fallback(text) {
    var t = document.createElement('textarea');
    t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(t);
  }

  /* ── the square follows the cursor ────────────────────────────── */
  var cur = document.querySelector('.cursor');
  if (cur && !reduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var x = -100, y = -100, cx = -100, cy = -100, r = 0, raf = null;
    function loop() {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      r += ((x - cx) * 0.6 - r) * 0.1;
      cur.style.transform = 'translate(' + cx + 'px,' + cy + 'px) rotate(' + r + 'deg)';
      raf = (Math.abs(x - cx) + Math.abs(y - cy) > 0.1) ? requestAnimationFrame(loop) : null;
    }
    window.addEventListener('mousemove', function (e) {
      x = e.clientX; y = e.clientY; cur.classList.add('on');
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    document.addEventListener('mouseleave', function () { cur.classList.remove('on'); });
    document.querySelectorAll('a, button, .area').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cur.classList.add('big'); });
      el.addEventListener('mouseleave', function () { cur.classList.remove('big'); });
    });
  }
})();
