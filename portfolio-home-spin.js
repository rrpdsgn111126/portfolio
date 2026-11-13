(() => {
  const link = document.getElementById('portfolio-home-link');
  if (!link) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let scheduled = false;

  const update = () => {
    scheduled = false;
    // `rotate` composes with the existing hover animation on `transform`.
    link.style.rotate = reducedMotion.matches ? '' : `${Math.max(0, window.scrollY) * 0.5}deg`;
  };

  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  reducedMotion.addEventListener('change', schedule);
  schedule();
})();
