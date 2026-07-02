/* Dietrichs Marketing · interaksjon og bevegelse */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header-skygge ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobilmeny ---------- */
  var menu = document.querySelector('.fs-menu');
  var openBtn = document.querySelector('.menu-btn');
  var closeBtn = document.querySelector('.fs-close');
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (openBtn) openBtn.addEventListener('click', function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
  if (menu) menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ---------- GSAP scroll-reveals ---------- */
  if (reduced || typeof gsap === 'undefined') {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.style.opacity = 1; el.style.transform = 'none';
    });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'expo.out',
      delay: (parseFloat(el.dataset.delay) || 0),
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  /* subtil parallax på dekorformer */
  document.querySelectorAll('.deco').forEach(function (el, i) {
    gsap.to(el, {
      y: i % 2 === 0 ? -46 : 40,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('section') || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });
  });
})();
