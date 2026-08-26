(() => {
  const start = () => {
    const nav = document.querySelector('.nav');
    if (!nav || nav.dataset.headerScrollReady) return;
    nav.dataset.headerScrollReady = '1';

    let stuck = false;
    let ticking = false;
    let threshold = 0;

    const measure = () => {
      if (!stuck) threshold = Math.max(nav.offsetHeight + nav.offsetTop + 8, 72);
    };

    const setStuck = (next) => {
      if (next === stuck) return;
      stuck = next;
      nav.classList.toggle('nav--stuck', stuck);
      document.body.classList.toggle('nav-has-sticky', stuck);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        measure();
        setStuck(window.scrollY > threshold);
        ticking = false;
      });
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { measure(); onScroll(); }, { passive: true });
    onScroll();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
