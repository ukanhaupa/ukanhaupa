const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');
const mapNodes = document.querySelectorAll('.map-node');
const stories = document.querySelectorAll('[data-story]');

const applyTheme = (theme) => {
  root.dataset.theme = theme;
  const isDark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeLabel.textContent = isDark ? 'Dark' : 'Light';
};

const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
applyTheme(preferredTheme);

themeToggle.addEventListener('click', () => {
  applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
});

mapNodes.forEach((node) => {
  node.addEventListener('click', () => {
    const { topic } = node.dataset;
    mapNodes.forEach((item) => {
      const isActive = item === node;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
    stories.forEach((story) => {
      story.hidden = story.dataset.story !== topic;
    });
  });
});
