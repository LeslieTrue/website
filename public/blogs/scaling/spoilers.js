(() => {
  const zh = document.documentElement.lang.startsWith('zh');
  const show = zh ? '点击查看原文' : 'Click to reveal';
  const hide = zh ? '点击重新打码' : 'Click to hide';
  document.querySelectorAll('.panda-spoiler').forEach((spoiler) => {
    const text = spoiler.querySelector('span');
    const toggle = () => {
      const expanded = spoiler.getAttribute('aria-expanded') !== 'true';
      spoiler.setAttribute('aria-expanded', String(expanded));
      text.setAttribute('aria-hidden', String(!expanded));
      spoiler.setAttribute('aria-label', expanded ? `${text.textContent} — ${hide}` : show);
      spoiler.title = expanded ? hide : show;
    };
    spoiler.addEventListener('click', toggle);
    spoiler.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  });
})();
