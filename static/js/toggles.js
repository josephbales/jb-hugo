// Dark/Light mode toggle functionality
(function() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);

    // Update button text based on current theme
    function updateToggleButton(theme) {
        themeToggle.textContent = theme === 'light' ? '◐' : '○';
        themeToggle.setAttribute('aria-label',
            theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
        );
    }

    // Initialize button
    updateToggleButton(currentTheme);

    // Toggle theme function
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleButton(newTheme);
    }

    // Add click event listener
    themeToggle.addEventListener('click', toggleTheme);

    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', function(e) {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                html.setAttribute('data-theme', newTheme);
                updateToggleButton(newTheme);
            }
        });
    }
})();

// Mobile header menu toggle
(function() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const header = document.querySelector('.site-header');
  const panel = document.getElementById('mobileHeaderPanel');

  if (mobileMenuToggle && header && panel) {
    function closeMenu() {
      header.classList.remove('menu-open');
      mobileMenuToggle.setAttribute('aria-label', 'Toggle menu');
      mobileMenuToggle.textContent = '☰';
      panel.setAttribute('aria-hidden', 'true');
    }

    mobileMenuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = header.classList.toggle('menu-open');
      mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Toggle menu');
      mobileMenuToggle.textContent = isOpen ? '✕' : '☰';
      panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    // Close when clicking a link
    panel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 767.98) closeMenu();
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 767.98 && !header.contains(e.target)) {
        closeMenu();
      }
    });
  }
})();