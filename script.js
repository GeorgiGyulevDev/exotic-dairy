// =========================
// MOBILE MENU
// =========================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
    });
  });
}

// =========================
// HEADER SCROLL EFFECT
// =========================

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";
  } else {
    header.style.boxShadow = "none";
  }
});

// =========================
// REVEAL ON SCROLL
// =========================

const revealElements = document.querySelectorAll(
  ".opportunity, .solution, #products, .beyond, .hub, .rd, .roadmap, .faq, .ecosystem"
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// =========================
// COUNTER ANIMATION
// =========================

const counters = document.querySelectorAll("[data-counter]");

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.counter);

      let current = 0;
      const increment = target / 80;

      const updateCounter = () => {
        current += increment;

        if (current >= target) {
          counter.textContent = target;
          return;
        }

        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      };

      updateCounter();

      counterObserver.unobserve(counter);
    });
  },
  {
    threshold: 0.5
  }
);

counters.forEach(counter => {
  counterObserver.observe(counter);
});

// =========================
// SMOOTH SCROLL OFFSET
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    const headerHeight = document.querySelector(".site-header").offsetHeight;

    const offsetPosition =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  });
});

// =========================
// ACTIVE MENU HIGHLIGHT
// =========================

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav a").forEach(link => {
    link.classList.remove("active");

    if (
      link.getAttribute("href") === `#${current}`
    ) {
      link.classList.add("active");
    }
  });
});

console.log("Exotic Dairy Loaded");

// =========================
// MODALS
// =========================

const modalTriggers = document.querySelectorAll(".modal-trigger");
const modalClosers = document.querySelectorAll(".modal-close");

modalTriggers.forEach(trigger => {
  trigger.addEventListener("click", e => {
    e.preventDefault();

    const modalId = trigger.dataset.modal;
    const modal = document.getElementById(modalId);

    if (!modal) return;

    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  });
});

modalClosers.forEach(closer => {
  closer.addEventListener("click", () => {
    document.querySelectorAll(".modal.is-open").forEach(modal => {
      modal.classList.remove("is-open");
    });

    document.body.style.overflow = "";
  });
});

document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;

  document.querySelectorAll(".modal.is-open").forEach(modal => {
    modal.classList.remove("is-open");
  });

  document.body.style.overflow = "";
});