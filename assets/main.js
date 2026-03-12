(() => {
  const config = window.SITE_CONFIG || {};

  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element && value) element.textContent = value;
  };

  const setLink = (selector, text, href) => {
    const element = document.querySelector(selector);
    if (!element) return;
    if (text) element.textContent = text;
    if (href) element.href = href;
  };

  const applyImages = () => {
    const images = config.images || {};
    document.querySelectorAll("[data-slot]").forEach((element) => {
      const slot = element.dataset.slot;
      const source = images[slot];
      if (source) element.src = source;
    });
  };

  const applyBusinessInfo = () => {
    setLink('[data-bind="phone-link"]', config.phoneDisplay, config.phoneHref);
    setLink('[data-bind="email-link"]', config.emailDisplay, config.emailHref);
    setLink(
      '[data-bind="instagram-link"]',
      config.instagramDisplay,
      config.instagramHref
    );
    setText('[data-bind="service-area"]', config.serviceArea);
  };

  const setupMobileMenu = () => {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;

    const closeMenu = () => {
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("open");
    };

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      toggle.classList.toggle("active", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  };

  const setupReveal = () => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    reveals.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 40, 220)}ms`;
      observer.observe(item);
    });
  };

  const setupFormDemo = () => {
    const form = document.getElementById("contact-form");
    const note = document.getElementById("form-note");
    if (!form || !note) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      note.textContent =
        "Demo mode only. Connect this form to a real form service before launch.";
    });
  };

  const setYear = () => {
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  };

  applyImages();
  applyBusinessInfo();
  setupMobileMenu();
  setupReveal();
  setupFormDemo();
  setYear();
})();
