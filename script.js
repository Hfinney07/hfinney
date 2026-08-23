document.getElementById('year').textContent = new Date().getFullYear();

/* Mobile nav */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* Header scroll state + scroll progress bar */
const siteHeader = document.getElementById('siteHeader');
const scrollProgress = document.getElementById('scrollProgress');

function onScroll() {
  siteHeader.classList.toggle('scrolled', window.scrollY > 24);

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Animated number counters */
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = prefix + value.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));

/* Scroll reveal */
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* Timeline fill animation */
const timelineEl = document.querySelector('.timeline');
if (timelineEl) {
  const timelineObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  timelineObserver.observe(timelineEl);
}

/* Testimonial slider */
const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
const dotsWrap = document.getElementById('testimonialDots');
let activeSlide = 0;
let slideTimer;

if (slides.length && dotsWrap) {
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });

  function goToSlide(index) {
    slides[activeSlide].classList.remove('is-active');
    dotsWrap.children[activeSlide].classList.remove('is-active');
    activeSlide = index;
    slides[activeSlide].classList.add('is-active');
    dotsWrap.children[activeSlide].classList.add('is-active');
    restartTimer();
  }

  function nextSlide() {
    goToSlide((activeSlide + 1) % slides.length);
  }

  function restartTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, 6000);
  }

  restartTimer();
}

/* FAQ accordion */
document.querySelectorAll('.accordion-item').forEach((item) => {
  const trigger = item.querySelector('.accordion-trigger');
  trigger.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    item.classList.toggle('is-open', !isOpen);
    trigger.setAttribute('aria-expanded', String(!isOpen));
  });
});

/* Contact form */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formNote.textContent = "Thanks! We'll be in touch within one business day to schedule your call.";
  contactForm.reset();
});
