// In-page nav: scroll manually instead of relying on href="#id" navigation
  // (native hash navigation gets flagged as an external link inside embedded/sandboxed previews)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e){
      const targetId = this.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'grid' ? 'none' : 'grid';
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.style.display = 'none'));

  // Scrollspy
  const sections = document.querySelectorAll('section[id]');
  const navA = document.querySelectorAll('.navlinks a');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navA.forEach(a => a.classList.remove('active'));
        const link = document.querySelector('.navlinks a[href="#' + entry.target.id + '"]');
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  // Scroll progress bar
  const progressBar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }, { passive: true });

  // Contact form (no backend — demo only)
  document.querySelector('.form-card .btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Thanks for reaching out! This form is a demo — please email owaisahmadknp.30@gmail.com directly for now.');
  });

  // Twinkling sparkle layer over the dark background
  (function initSparkles(){
    const container = document.getElementById('sparkles');
    if (!container) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const COUNT = 55;
    for (let i = 0; i < COUNT; i++) {
      const s = document.createElement('span');
      s.className = 'sparkle';
      const size = (Math.random() * 2 + 1).toFixed(1); // 1px - 3px
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      s.style.top = (Math.random() * 100) + '%';
      s.style.left = (Math.random() * 100) + '%';
      s.style.animationDuration = (2 + Math.random() * 3.5).toFixed(2) + 's';
      s.style.animationDelay = (Math.random() * 5).toFixed(2) + 's';
      container.appendChild(s);
    }
  })();

  // ---------- GSAP MOTION ----------
  const canUseGSAP = window.gsap && window.ScrollTrigger;

  if (canUseGSAP) {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion) {
      // 1. Nav bar entrance — slides down + fades in on load
      gsap.set('header', { willChange: 'transform, opacity' });
      const navTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      navTl
        .from('header', { y: -70, opacity: 0, duration: 0.7 })
        .from('.brand', { opacity: 0, x: -20, duration: 0.5 }, '-=0.4')
        .from('.navlinks a', { opacity: 0, y: -10, duration: 0.4, stagger: 0.06 }, '-=0.3')
        .from('header .btn-primary', { opacity: 0, scale: 0.8, duration: 0.4 }, '-=0.3');

      // 2. Hero entrance timeline — runs right after the nav
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.3 });
      heroTl
        .from('.eyebrow', { y: 20, opacity: 0, duration: 0.5 })
        .from('.hero h1', { y: 34, opacity: 0, duration: 0.7 }, '-=0.3')
        .from('.hero-tagline', { y: 18, opacity: 0, duration: 0.5 }, '-=0.4')
        .from('.hero p.desc', { y: 18, opacity: 0, duration: 0.5 }, '-=0.4')
        .from('.hero-actions .btn', { y: 18, opacity: 0, duration: 0.4, stagger: 0.1 }, '-=0.35')
        .from('.profile-card', { x: 50, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7')
        .from('.data-card', { opacity: 0, y: 12, duration: 0.5 }, '-=0.3');

      // 3. Scroll-triggered reveals for every .reveal group — batched with a stagger
      ScrollTrigger.batch('.reveal', {
        start: 'top 87%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out'
          });
        }
      });

      // 4. Section titles — subtle slide/fade tied to scroll position
      gsap.utils.toArray('.section-title').forEach((title) => {
        gsap.from(title, {
          scrollTrigger: { trigger: title, start: 'top 90%', once: true },
          y: 24, opacity: 0, duration: 0.6, ease: 'power2.out'
        });
      });

      // 5. Magnetic hover pull on primary buttons
      document.querySelectorAll('.btn-primary').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * 0.25;
          const y = (e.clientY - r.top - r.height / 2) * 0.25;
          gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
        });
      });

      // 6. Nav shrink/blur intensifies slightly once the page scrolls
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { targets: 'header', className: 'scrolled' }
      });
    } else {
      // Reduced motion: just make everything visible immediately, no animation
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('show'));
    }
  } else {
    // GSAP failed to load (e.g. offline) — fall back to the original IntersectionObserver reveal
    const revealEls = document.querySelectorAll('.reveal');
    const ro = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); ro.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => ro.observe(el));
  }
