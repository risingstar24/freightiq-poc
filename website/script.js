/* FreightIQ Marketing Website — Interactions */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Nav ── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      const isOpen = mobileNav.classList.contains('open');
      spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity  = isOpen ? '0' : '';
      spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
      });
    });
  }

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item  = btn.closest('.accordion-item');
      const body  = item.querySelector('.accordion-body');
      const isOpen = btn.classList.contains('open');
      /* close all */
      document.querySelectorAll('.accordion-trigger').forEach(b => {
        b.classList.remove('open');
        b.closest('.accordion-item').querySelector('.accordion-body').classList.remove('open');
      });
      if (!isOpen) { btn.classList.add('open'); body.classList.add('open'); }
    });
  });

  /* ── Sticky Nav shadow ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 20
        ? '0 4px 24px rgba(0,0,0,.25)' : '';
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ── Animate on scroll ── */
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.animate').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    obs.observe(el);
  });
  const styleEl = document.createElement('style');
  styleEl.textContent = '.animate.visible { opacity: 1 !important; transform: none !important; }';
  document.head.appendChild(styleEl);

  /* ── ROI Calculator ── */
  const loadsInput = document.getElementById('loads-per-month');
  const rateInput  = document.getElementById('hourly-rate');
  const savingsEl  = document.getElementById('annual-savings');
  const fteEl      = document.getElementById('fte-saved');
  if (loadsInput && savingsEl) {
    const calc = () => {
      const loads = +loadsInput.value || 300;
      const rate  = rateInput ? (+rateInput.value || 45) : 45;
      document.getElementById('loads-display') && (document.getElementById('loads-display').textContent = loads.toLocaleString());
      document.getElementById('rate-display')  && (document.getElementById('rate-display').textContent  = '$' + rate);
      const hoursPerLoad = 1.8;
      const automationPct = 0.78;
      const savedHours = loads * hoursPerLoad * automationPct * 12;
      const savings = Math.round(savedHours * rate);
      const fte = (savedHours / 2080).toFixed(1);
      if (savingsEl) savingsEl.textContent = '$' + savings.toLocaleString();
      if (fteEl)     fteEl.textContent = fte + ' FTE';
    };
    loadsInput.addEventListener('input', calc);
    rateInput && rateInput.addEventListener('input', calc);
    calc();
  }

  /* ── Set active nav link ── */
  const current = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Progress bars animate ── */
  const progObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target.querySelector('.progress-fill');
        if (fill) { const w = fill.dataset.width; fill.style.width = '0'; setTimeout(() => fill.style.transition = 'width 1s ease', 50); setTimeout(() => fill.style.width = w, 100); }
        progObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.progress-bar').forEach(el => progObs.observe(el));

  /* ── Number count-up ── */
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const end = parseFloat(el.dataset.count);
        const duration = 1400;
        const start = performance.now();
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const dec = (end % 1 !== 0) ? 1 : 0;
        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = prefix + (end * eased).toFixed(dec) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

});
