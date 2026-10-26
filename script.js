(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];

  // Respect a saved preference; otherwise use the operating system preference.
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('portfolio-theme');
  } catch (_) {
    // Theme switching still works for this session when storage is unavailable.
  }
  if (!savedTheme) {
    root.dataset.theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  const updateThemeButton = () => {
    const isLight = root.dataset.theme === 'light';
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    themeToggle.setAttribute('title', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  };
  updateThemeButton();
  themeToggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('portfolio-theme', root.dataset.theme);
    } catch (_) {
      // Keep the selected theme for the current page session.
    }
    updateThemeButton();
  });

  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navLinks.classList.toggle('open', open);
  });
  navAnchors.forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }));

  // Reveal elements when they enter the viewport; no continuous scroll handler.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 65}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Highlight the current section in the navigation.
  if ('IntersectionObserver' in window) {
    const sections = [...document.querySelectorAll('main section[id]')];
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
