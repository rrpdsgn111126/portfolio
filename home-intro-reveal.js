(() => {
  // Reuse Finam's per-rendered-line reveal without changing its case page.
  const intro = document.getElementById('home-intro');
  const root = document.documentElement;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const elements = [intro?.querySelector('#home-title'), intro?.querySelector('#home-description')].filter(Boolean);
  const originals = elements.map(element => ({
    element,
    nodes: [...element.childNodes].map(node => node.cloneNode(true)),
  }));
  let prepared = false;
  let shown = false;
  let resizeTimer;
  let startTimer;

  function restore() {
    clearTimeout(resizeTimer);
    clearTimeout(startTimer);
    root.classList.remove('home-intro-reveal-pending', 'has-home-intro-reveal');
    for (const {element, nodes} of originals) {
      element.replaceChildren(...nodes.map(node => node.cloneNode(true)));
      element.classList.remove('text-reveal-ready', 'text-reveal-visible');
    }
    prepared = false;
  }

  function splitByRenderedLines(item, startOrder) {
    const {element, nodes} = item;
    element.replaceChildren(...nodes.map(node => node.cloneNode(true)));
    const pieces = [];
    for (const node of [...element.childNodes]) {
      if (node.nodeName === 'BR') {
        pieces.push({break: true});
        continue;
      }
      if (node.nodeType !== Node.TEXT_NODE) return -1;
      for (const token of node.textContent.match(/\S+\s*|\s+/gu) || []) {
        const span = document.createElement('span');
        span.textContent = token;
        pieces.push({span, token});
      }
    }
    element.replaceChildren(...pieces.map(part => part.break ? document.createElement('br') : part.span));

    const lines = [];
    let previousTop = null;
    let forcedBreak = false;
    for (const part of pieces) {
      if (part.break) { forcedBreak = true; previousTop = null; continue; }
      const rect = part.span.getClientRects()[0];
      if (!rect) return -1;
      if (forcedBreak || previousTop === null || Math.abs(rect.top - previousTop) > 2) {
        lines.push('');
        previousTop = rect.top;
        forcedBreak = false;
      }
      lines[lines.length - 1] += part.token;
    }
    if (!lines.length) return -1;

    const fragment = document.createDocumentFragment();
    lines.forEach((line, index) => {
      const clip = document.createElement('span');
      clip.className = 'text-reveal-line';
      const inner = document.createElement('span');
      inner.className = 'text-reveal-line-inner';
      inner.style.setProperty('--reveal-order', startOrder + index);
      inner.textContent = line;
      clip.append(inner);
      fragment.append(clip);
    });
    element.replaceChildren(fragment);
    if (element.textContent !== nodes.map(node => node.textContent).join('')) return -1;
    element.classList.add('text-reveal-ready');
    if (shown) element.classList.add('text-reveal-visible');
    return lines.length;
  }

  function prepare() {
    if (motion.matches) { restore(); return false; }
    root.classList.remove('has-home-intro-reveal');
    let order = 0;
    for (const item of originals) {
      const count = splitByRenderedLines(item, order);
      if (count < 0) { restore(); return false; }
      order += count + 1;
    }
    root.classList.add('has-home-intro-reveal');
    root.classList.remove('home-intro-reveal-pending');
    prepared = true;
    return true;
  }

  function reveal() {
    if (motion.matches || !prepared) return;
    shown = true;
    for (const {element} of originals) element.classList.add('text-reveal-visible');
  }

  if (!elements.length || motion.matches) { root.classList.remove('home-intro-reveal-pending'); return; }

  // Wait for the final font metrics before splitting; never begin the animation early.
  const fontsReady = document.fonts?.ready || Promise.resolve();
  fontsReady.then(() => {
    if (!prepare()) return;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      startTimer = setTimeout(reveal, 450);
    }));
  }).catch(restore);

  window.addEventListener('resize', () => {
    if (!prepared || motion.matches) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(prepare, 120);
  }, {passive: true});
  motion.addEventListener?.('change', () => {
    if (motion.matches) restore();
  });
})();
