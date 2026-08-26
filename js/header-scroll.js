(() => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let placeholder = null;
  let floating = false;
  let lastHeight = 0;

  const syncPlaceholder = () => {
    if (placeholder) {
      lastHeight = nav.getBoundingClientRect().height;
      placeholder.style.height = `${lastHeight}px`;
    }
  };

  const enterFloating = () => {
    if (floating) return;
    floating = true;
    lastHeight = nav.getBoundingClientRect().height;
    placeholder = document.createElement('div');
    placeholder.className = 'nav-placeholder';
    placeholder.setAttribute('aria-hidden', 'true');
    placeholder.style.height = `${lastHeight}px`;
    nav.parentNode.insertBefore(placeholder, nav.nextSibling);
    document.body.classList.add('nav-floating');
    nav.classList.remove('nav-returning');
    void nav.offsetWidth;
    nav.classList.add('nav-floating-enter');
  };

  const leaveFloating = () => {
    if (!floating) return;
    nav.classList.remove('nav-floating-enter', 'nav-returning');
    document.body.classList.remove('nav-floating');
    if (placeholder) {
      placeholder.remove();
      placeholder = null;
    }
    floating = false;
  };

  const update = () => {
    const threshold = Math.max(nav.getBoundingClientRect().height + 8, 72);
    if (window.scrollY > threshold) enterFloating();
    else leaveFloating();
    syncPlaceholder();
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }, { passive: true });

  window.addEventListener('resize', syncPlaceholder, { passive: true });
  window.addEventListener('load', update);
  update();
})();
