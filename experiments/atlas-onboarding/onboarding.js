(() => {
  'use strict';

  // The physical Figma screen is 375 × 812. An additional slide at either
  // edge is a clone, allowing both loop boundaries to animate without a jump.
  const SCREENS = [
    {
      image: 'globe.png',
      title: 'One Card. Every Corner of the World',
      description: 'Spend your crypto anywhere cards are accepted — no banks, no exchanges, no waiting',
    },
    {
      image: 'stopwatch.png',
      title: 'Money That Moves When You Do',
      description: 'Send and withdraw in an instant, anywhere on earth. Your funds keep pace with you',
    },
    {
      image: 'crypto.png',
      title: 'Your Crypto Does It All',
      description: 'Spend it, send it, and save on every conversion — all from one app',
    },
    {
      image: 'security.png',
      title: "Built to Protect What's Yours",
      description: 'Layered security guards your assets 24/7 — locked down, never slowed down',
    },
  ];

  const HOLD_MS = 3600;
  const MOVE_MS = 620;
  const embedMode = new URLSearchParams(location.search).get('embed') === '1';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.getElementById('onboarding');
  const frame = document.getElementById('mockup-box');
  const windowEl = document.getElementById('slides-window');
  const track = document.getElementById('slides-track');
  const wizard = document.getElementById('wizard');
  const actions = document.getElementById('screen-actions');
  const nextButton = document.getElementById('next-button');
  const skipButton = document.getElementById('skip-button');

  if (embedMode) document.body.classList.add('is-embed');

  const slideMarkup = (screen, index, clone) => `
    <article class="slide" data-screen="${index}"${clone ? ' aria-hidden="true"' : ''}>
      <div class="artwork"><img src="./assets/${screen.image}" alt="" draggable="false" width="250" height="250"></div>
      <div class="copy"><h2>${screen.title}</h2><p>${screen.description}</p></div>
    </article>`;

  track.innerHTML = [
    slideMarkup(SCREENS[3], 3, true),
    ...SCREENS.map((screen, index) => slideMarkup(screen, index, false)),
    slideMarkup(SCREENS[0], 0, true),
  ].join('');

  wizard.innerHTML = SCREENS.map((_, index) => `
    <button type="button" class="step" data-step="${index}" aria-label="Show onboarding screen ${index + 1}"></button>`).join('');

  let screenIndex = 0;
  let trackIndex = 1;
  let timeoutId = null;
  let moving = false;
  let swipeStartX = null;
  let swipeStartY = null;

  function fit() {
    const horizontal = Math.max(0.3, (window.innerWidth - (embedMode ? 0 : 32)) / 375);
    const vertical = Math.max(0.3, (window.innerHeight - (embedMode ? 0 : 48)) / 812);
    const scale = Math.min(1, horizontal, vertical);
    frame.style.setProperty('--phone-scale', String(scale));
  }

  function updateControls() {
    const final = screenIndex === SCREENS.length - 1;
    actions.classList.toggle('is-final', final);
    nextButton.textContent = final ? 'Sign Up / Sign In' : 'Next';
    wizard.querySelectorAll('.step').forEach((step, index) => {
      step.classList.remove('is-done', 'is-active');
      // The Figma last screen shows all four indicators completed.
      if (index < screenIndex || final) step.classList.add('is-done');
      else if (index === screenIndex) step.classList.add('is-active');
      step.setAttribute('aria-current', index === screenIndex ? 'step' : 'false');
    });
    // Rebuild the current step's fill animation on every page change.
    if (!final && !reducedMotion.matches) {
      const active = wizard.querySelector('.is-active');
      if (active) {
        active.style.animation = 'none';
        void active.offsetWidth;
        active.style.animation = '';
      }
    }
    root.setAttribute('aria-label', `Atlas onboarding, screen ${screenIndex + 1} of 4`);
  }

  function placeTrack(withAnimation) {
    track.style.transition = withAnimation && !reducedMotion.matches
      ? `transform ${MOVE_MS}ms cubic-bezier(.27,.73,.25,1)`
      : 'none';
    track.style.transform = `translate3d(${-trackIndex * 100}%, 0, 0)`;
  }

  function schedule() {
    clearTimeout(timeoutId);
    if (!document.hidden && !reducedMotion.matches) {
      timeoutId = setTimeout(() => advance(1), HOLD_MS);
    }
  }

  function resetIfCloned() {
    if (trackIndex === 5) trackIndex = 1;
    if (trackIndex === 0) trackIndex = 4;
    placeTrack(false);
    moving = false;
  }

  function advance(direction) {
    if (moving) return;
    const next = (screenIndex + direction + SCREENS.length) % SCREENS.length;
    clearTimeout(timeoutId);
    moving = !reducedMotion.matches;
    screenIndex = next;
    trackIndex += direction;
    updateControls();
    placeTrack(true);
    if (!moving) resetIfCloned();
    schedule();
  }

  function goTo(target) {
    if (moving || target === screenIndex) return;
    const forward = (target - screenIndex + SCREENS.length) % SCREENS.length;
    const backward = (screenIndex - target + SCREENS.length) % SCREENS.length;
    if (forward === 1) advance(1);
    else if (backward === 1) advance(-1);
    else {
      clearTimeout(timeoutId);
      screenIndex = target;
      trackIndex = target + 1;
      updateControls();
      placeTrack(false);
      schedule();
    }
  }

  track.addEventListener('transitionend', event => {
    if (event.target !== track || event.propertyName !== 'transform') return;
    resetIfCloned();
  });

  nextButton.addEventListener('click', () => advance(1));
  skipButton.addEventListener('click', () => goTo(3));
  wizard.addEventListener('click', event => {
    const step = event.target.closest('.step');
    if (step) goTo(Number(step.dataset.step));
  });

  root.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); advance(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); advance(-1); }
  });

  windowEl.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    swipeStartX = event.clientX;
    swipeStartY = event.clientY;
  });
  windowEl.addEventListener('pointerup', event => {
    if (swipeStartX === null) return;
    const dx = event.clientX - swipeStartX;
    const dy = event.clientY - swipeStartY;
    swipeStartX = null;
    swipeStartY = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) advance(dx < 0 ? 1 : -1);
  });
  windowEl.addEventListener('pointercancel', () => { swipeStartX = null; swipeStartY = null; });

  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', () => {
    placeTrack(false);
    updateControls();
    schedule();
  });
  window.addEventListener('resize', fit);

  fit();
  placeTrack(false);
  updateControls();
  schedule();
})();