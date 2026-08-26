/* Compact the top header into a persistent navigation bar after scrolling. */
(() => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const update = () => {
    nav.classList.toggle('is-compact', window.scrollY > 32);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
})();
