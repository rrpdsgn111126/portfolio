(() => {
  const cards=[...document.querySelectorAll('.home-project')];
  if (!cards.length || !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('home-motion');
  const observer=new IntersectionObserver(entries => {
    for(const entry of entries) {
      if(!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  },{rootMargin:'0px 0px 60px 0px',threshold:0.08});
  cards.forEach(card=>observer.observe(card));
})();


/* Align the union of the two screenshots with the union of the heading,
   description and tags. Their absolute positioning makes container centering
   inaccurate, especially when text wraps at different viewport widths. */
(() => {
  const cards = [...document.querySelectorAll('.home-project')];
  if (!cards.length) return;
  const desktop = window.matchMedia('(min-width: 768px)');
  let queued = false;

  function alignImagePairs() {
    queued = false;
    for (const card of cards) {
      if (!desktop.matches) {
        card.style.removeProperty('--home-shot-center-offset');
        continue;
      }
      const copy = card.querySelector('.home-project__copy');
      const textParts = [...copy.querySelectorAll('h2, p, .home-tags')];
      const images = [...card.querySelectorAll('.home-project__shot')];
      if (!textParts.length || images.some(img => !img.offsetHeight)) continue;
      const textTop = copy.offsetTop + Math.min(...textParts.map(el => el.offsetTop));
      const textBottom = copy.offsetTop + Math.max(...textParts.map(el => el.offsetTop + el.offsetHeight));
      const imageTop = Math.min(...images.map(img => img.offsetTop));
      const imageBottom = Math.max(...images.map(img => img.offsetTop + img.offsetHeight));
      const offset = (textTop + textBottom - imageTop - imageBottom) / 2;
      card.style.setProperty('--home-shot-center-offset', `${offset.toFixed(2)}px`);
    }
  }

  const requestAlignment = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(alignImagePairs);
  };

  for (const card of cards) {
    for (const img of card.querySelectorAll('.home-project__shot')) {
      img.addEventListener('load', requestAlignment);
    }
  }
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(requestAlignment);
    for (const card of cards) {
      observer.observe(card.querySelector('.home-project__copy'));
      observer.observe(card.querySelector('.home-tags'));
      for (const img of card.querySelectorAll('.home-project__shot')) observer.observe(img);
    }
  }
  window.addEventListener('resize', requestAlignment, { passive: true });
  document.fonts?.ready.then(requestAlignment);
  requestAlignment();
})();
