(() => {
  const links = [...document.querySelectorAll('[data-language-link]')];
  const updateLinks = () => {
    links.forEach((link) => {
      const url = new URL(link.href);
      url.hash = window.location.hash;
      link.href = url.href;
    });
  };
  updateLinks();
  window.addEventListener('hashchange', updateLinks);
})();
