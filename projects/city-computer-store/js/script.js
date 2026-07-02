// =======================================================
// CITY COMPUTER STORE — shared behaviour
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollReveal();
  initTypingTerminal();
  initFilters();
  initContactForm();
  initFooterYear();
});

/* ---------- Mobile nav toggle ---------- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('mobile-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.innerHTML = isOpen ? iconClose() : iconMenu();
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('mobile-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = iconMenu();
    });
  });
}

function iconMenu() {
  return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
}
function iconClose() {
  return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>';
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 4, 4) * 70}ms`;
    obs.observe(el);
  });
}

/* ---------- Hero terminal typing sequence ---------- */
function initTypingTerminal() {
  const body = document.querySelector('[data-terminal]');
  if (!body) return;

  const script = [
    { text: 'C:\\CITY_COMPUTER> boot diagnostics.exe', cls: 'prompt', pause: 350 },
    { text: 'Checking hardware...................... OK', cls: 'ok', pause: 260 },
    { text: 'Checking parts inventory............... OK', cls: 'ok', pause: 260 },
    { text: 'Checking bench technicians.............. 3 ONLINE', cls: 'ok', pause: 260 },
    { text: 'Loading Calgary service map............ OK', cls: 'ok', pause: 420 },
    { text: '', cls: 'dim', pause: 120 },
    { text: 'STATUS: SHOP OPEN — same-day diagnostics', cls: 'ok', pause: 0, bold: true },
  ];

  const cursorEl = document.createElement('span');
  cursorEl.className = 'terminal-cursor';

  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= script.length) {
      body.appendChild(cursorEl);
      return;
    }
    const item = script[lineIndex];
    const lineEl = document.createElement('div');
    lineEl.className = `line ${item.cls}`;
    body.appendChild(lineEl);

    let charIndex = 0;
    const speed = 14;

    function typeChar() {
      if (charIndex <= item.text.length) {
        lineEl.textContent = item.text.slice(0, charIndex);
        charIndex++;
        setTimeout(typeChar, speed);
      } else {
        lineIndex++;
        setTimeout(typeLine, item.pause);
      }
    }
    typeChar();
  }

  typeLine();
}

/* ---------- Product filters (products page) ---------- */
function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.build-item');
  if (!buttons.length || !items.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      items.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !match);
      });
    });
  });
}

/* ---------- Contact form (client-side only) ---------- */
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const status = document.querySelector('#form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[data-required]').forEach(field => {
      const errorEl = field.parentElement.querySelector('.error-msg');
      const value = field.value.trim();
      let message = '';

      if (!value) {
        message = 'This field is required.';
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = 'Enter a valid email address.';
      }

      if (message) {
        valid = false;
        field.style.borderColor = 'var(--led-red)';
        if (errorEl) errorEl.textContent = message;
      } else {
        field.style.borderColor = 'var(--border-line)';
        if (errorEl) errorEl.textContent = '';
      }
    });

    if (!valid) {
      status.className = 'form-status visible';
      status.style.background = 'var(--accent-orange-dim)';
      status.style.color = 'var(--accent-orange)';
      status.textContent = 'Please fix the highlighted fields before sending.';
      return;
    }

    status.className = 'form-status visible';
    status.style.background = 'var(--accent-cyan-dim)';
    status.style.color = 'var(--accent-cyan)';
    status.textContent = 'Message received — we typically reply within one business day.';
    form.reset();
  });
}

/* ---------- Footer year ---------- */
function initFooterYear() {
  const el = document.querySelector('#footer-year');
  if (el) el.textContent = new Date().getFullYear();
}
