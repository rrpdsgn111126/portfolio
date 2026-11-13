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
