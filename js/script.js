document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const revealItems = document.querySelectorAll('.reveal');
  const galleryItems = document.querySelectorAll('[data-lightbox-image]');
  const contactForm = document.querySelector('[data-contact-form]');
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = document.querySelector('[data-lightbox-target]');
  const lightboxCaption = document.querySelector('[data-lightbox-caption]');
  const lightboxClose = document.querySelector('[data-lightbox-close]');

  const syncHeaderShadow = () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 16 ? '0 12px 30px rgba(95, 70, 57, 0.08)' : 'none';
  };

  syncHeaderShadow();
  window.addEventListener('scroll', syncHeaderShadow, { passive: true });

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });
  }

  if (revealItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
      },
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  };

  if (galleryItems.length && lightbox && lightboxImage && lightboxCaption) {
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        lightboxImage.src = item.dataset.lightboxImage;
        lightboxImage.alt = item.dataset.lightboxAlt || 'Imagen de repostería DOLCE';
        lightboxCaption.textContent = item.dataset.lightboxCaption || '';
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('menu-open');
      });
    });

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox || event.target === lightboxClose) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    });
  }

  if (contactForm) {
    const feedback = contactForm.querySelector('.form-feedback');
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = contactForm.querySelector('#nombre')?.value.trim();
      const email = contactForm.querySelector('#email')?.value.trim();
      const message = contactForm.querySelector('#mensaje')?.value.trim();

      if (!name || !email || !message) {
        feedback.textContent = 'Por favor completa todos los campos antes de enviar tu mensaje.';
        return;
      }

      feedback.textContent = `Gracias, ${name}. Hemos recibido tu mensaje y pronto te contactaremos.`;
      contactForm.reset();
    });
  }
});
