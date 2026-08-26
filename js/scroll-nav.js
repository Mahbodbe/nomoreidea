(() => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let compact = false;
  let ticking = false;

  const update = () => {
    const shouldCompact = window.scrollY > 48;
    if (shouldCompact !== compact) {
      compact = shouldCompact;
      nav.classList.toggle('nav--compact', compact);
      document.body.classList.toggle('has-compact-nav', compact);
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
})();
