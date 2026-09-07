/**
 * Open eIDAS — Core Interactive Scripts
 * Standardized client-side handlers (Theme switcher, Code copying, Navigation)
 */

(function () {
  'use strict';

  // --- 1. Theme Management ---
  const themeBtn = document.getElementById('theme-toggle');
  const sunIcon = themeBtn ? themeBtn.querySelector('.sun-icon') : null;
  const moonIcon = themeBtn ? themeBtn.querySelector('.moon-icon') : null;

  function updateThemeUI(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    }
  }

  // Initial theme sync
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  updateThemeUI(initialTheme);

  // Toggle button listener
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || (systemPrefersDark ? 'dark' : 'light');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', nextTheme);
      updateThemeUI(nextTheme);
    });
  }

  // Listen to OS theme changes if user hasn't explicitly set preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        updateThemeUI(e.matches ? 'dark' : 'light');
      }
    });
  }

  // --- 2. Copy to Clipboard Utility ---
  const copyBtn = document.getElementById('copy-email-btn');
  const copyFeedback = document.getElementById('copy-feedback');
  if (copyBtn) {
    const emailToCopy = 'contact@open-eidas.eu';
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailToCopy);
        if (copyFeedback) {
          copyFeedback.textContent = '✔ Adresse email copiée dans le presse-papier\u00A0!';
          setTimeout(() => {
            copyFeedback.textContent = '';
          }, 3000);
        }
      } catch (err) {
        if (copyFeedback) {
          copyFeedback.textContent = 'Adresse\u00A0: contact@open-eidas.eu';
        }
      }
    });
  }

  // --- 3. Interactive Snippets Copy Buttons (if any) ---
  document.querySelectorAll('.copy-code-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-target');
      const targetElem = targetId ? document.getElementById(targetId) : btn.closest('.code-block')?.querySelector('code');
      if (targetElem) {
        try {
          await navigator.clipboard.writeText(targetElem.textContent.trim());
          const originalText = btn.textContent;
          btn.textContent = 'Copié\u00A0!';
          setTimeout(() => {
            btn.textContent = originalText;
          }, 2000);
        } catch (e) {
          console.error('Erreur de copie', e);
        }
      }
    });
  });

  // --- 4. Mobile Navigation Drawer ---
  const mobileNavToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileNavToggle && mobileNav) {
    function setMobileNavOpen(isOpen) {
      mobileNav.classList.toggle('is-open', isOpen);
      mobileNavToggle.classList.toggle('is-open', isOpen);
      mobileNavToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      mobileNavToggle.setAttribute(
        'aria-label',
        isOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'
      );
    }

    mobileNavToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileNav.classList.contains('is-open');
      setMobileNavOpen(!isOpen);
    });

    // Close when clicking on any mobile nav link
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        setMobileNavOpen(false);
      });
    });

    // Close when clicking outside header
    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('is-open')) {
        const header = mobileNav.closest('.site-header');
        if (header && !header.contains(e.target)) {
          setMobileNavOpen(false);
        }
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        setMobileNavOpen(false);
        mobileNavToggle.focus();
      }
    });

    // Close on window resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && mobileNav.classList.contains('is-open')) {
        setMobileNavOpen(false);
      }
    });
  }

})();
