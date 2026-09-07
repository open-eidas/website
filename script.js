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
          copyFeedback.textContent = '✔ Adresse email copiée dans le presse-papier !';
          setTimeout(() => {
            copyFeedback.textContent = '';
          }, 3000);
        }
      } catch (err) {
        if (copyFeedback) {
          copyFeedback.textContent = 'Adresse : contact@open-eidas.eu';
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
          btn.textContent = 'Copié !';
          setTimeout(() => {
            btn.textContent = originalText;
          }, 2000);
        } catch (e) {
          console.error('Erreur de copie', e);
        }
      }
    });
  });

})();
