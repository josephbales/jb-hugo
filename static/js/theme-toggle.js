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
        mediaQuery.addListener(function(e) {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                html.setAttribute('data-theme', newTheme);
                updateToggleButton(newTheme);
            }
        });
    }
})();

// Mobile menu toggle functionality
(function() {
    const mobileMenuToggle = document.querySelector('.mobile-header-menu');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');

    if (mobileMenuToggle && mobileNavMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNavMenu.classList.toggle('active');

            // Update aria-label for accessibility
            const isOpen = mobileNavMenu.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-label',
                isOpen ? 'Close menu' : 'Toggle menu'
            );
            mobileMenuToggle.textContent = isOpen ? '✕' : '☰';
        });

        // Close menu when clicking on a link
        const navLinks = mobileNavMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-label', 'Toggle menu');
                mobileMenuToggle.textContent = '☰';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileNavMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                mobileNavMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-label', 'Toggle menu');
                mobileMenuToggle.textContent = '☰';
            }
        });
    }
})();