// ============================================================
// script.js — Aditya Raghav Portfolio
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── AOS init ──────────────────────────────────────────────
  AOS.init({ duration: 700, once: true, offset: 80 });

  // ── Navbar scroll state ────────────────────────────────────
  const nav = document.getElementById('mainNav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);

    // Back-to-top visibility
    document.getElementById('backToTop')
      .classList.toggle('show', window.scrollY > 400);

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(sec => {
      const top  = sec.offsetTop - 100;
      const bot  = top + sec.offsetHeight;
      const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (link) link.classList.toggle('active', window.scrollY >= top && window.scrollY < bot);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Back to top ────────────────────────────────────────────
  document.getElementById('backToTop')?.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  // ── Animated counters ──────────────────────────────────────
  const animateCounter = (el) => {
    const target = +el.dataset.target;
    const step   = Math.ceil(target / 60);
    let   count  = 0;
    const tick   = () => {
      count = Math.min(count + step, target);
      el.textContent = count;
      if (count < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

  // ── Skill bar animation ────────────────────────────────────
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.progress-bar').forEach(bar => {
          bar.style.width = bar.style.width; // trigger reflow
        });
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-card').forEach(card => {
    // Store widths, reset to 0, then animate when visible
    card.querySelectorAll('.progress-bar').forEach(bar => {
      const targetW = bar.style.width;
      bar.dataset.width = targetW;
      bar.style.width = '0';
    });
    barObserver.observe(card);
  });

  // When card enters viewport, fill bars
  const fillObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.progress-bar').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
        fillObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-card').forEach(card => fillObserver.observe(card));

  // ── Close mobile nav on link click ────────────────────────
  document.querySelectorAll('#navMenu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.getElementById('navMenu');
      const bsCollapse = bootstrap.Collapse.getInstance(collapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });

  // ── Contact form ───────────────────────────────────────────
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.classList.add('was-validated'); return; }

    const label = submitBtn.querySelector('.btn-label');
    submitBtn.disabled = true;
    label.textContent  = 'Sending…';

    // Simulate send (replace with real fetch/EmailJS call)
    setTimeout(() => {
      label.textContent       = '✓ Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';

      setTimeout(() => {
        form.reset();
        form.classList.remove('was-validated');
        label.textContent      = 'Send Message';
        submitBtn.disabled     = false;
        submitBtn.style.background = '';
      }, 2800);
    }, 1500);
  });

});