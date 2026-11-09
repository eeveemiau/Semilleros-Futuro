document.querySelectorAll('.texto-luz').forEach(el => {
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - r.left}px`);
    el.style.setProperty('--y', `${e.clientY - r.top}px`);
  });

  el.addEventListener('pointerleave', () => {
    el.style.setProperty('--x', '-200px');
    el.style.setProperty('--y', '-200px');
  });
});