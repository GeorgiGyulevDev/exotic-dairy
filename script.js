// =========================
// MOBILE MENU
// =========================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.setAttribute("aria-label", "Open menu");
  menuBtn.setAttribute("aria-expanded", "false");

  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");

    menuBtn.classList.toggle("is-open", isOpen);
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuBtn.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open menu");
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
// HOME ACTIVE NAVIGATION
// =========================

const homeNavLinks =
  document.querySelectorAll(".home-nav-link");

if (homeNavLinks.length) {
  const homeNavSections =
    Array.from(homeNavLinks)
      .map(link => {
        const sectionId = link.dataset.section;

        return document.getElementById(sectionId);
      })
      .filter(Boolean);

  function updateHomeActiveNav() {
    const headerHeight =
      document.querySelector(".site-header")?.offsetHeight || 86;

    const scrollMarker =
      window.scrollY + headerHeight + 60;

    let currentSection =
      homeNavSections[0];

    homeNavSections.forEach(section => {
      if (section.offsetTop <= scrollMarker) {
        currentSection = section;
      }
    });

    homeNavLinks.forEach(link => {
      link.classList.remove("is-active");
    });

    if (currentSection) {
      const activeLink =
        document.querySelector(
          `.home-nav-link[data-section="${currentSection.id}"]`
        );

      activeLink?.classList.add("is-active");
    }
  }

  window.addEventListener(
    "scroll",
    updateHomeActiveNav,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    updateHomeActiveNav
  );

  window.addEventListener(
    "load",
    updateHomeActiveNav
  );

  requestAnimationFrame(
    updateHomeActiveNav
  );
}

// =========================
// MODALS
// =========================

function createContactModal() {
  if (document.getElementById("contactModal")) return;

  const modalHTML = `
    <div class="modal" id="contactModal">
      <div class="modal-backdrop modal-close"></div>

      <div class="modal-panel contact-panel">
        <button class="modal-x modal-close">×</button>

        <p class="eyebrow">Contact</p>
        <h2>Let's Build the Future Together</h2>

        <p class="modal-intro">
          Connect with the Exotic Dairy team to discuss products, research, partnerships and future opportunities.
        </p>

        <form class="contact-form" action="https://formspree.io/f/mqeonyjr" method="POST">
          <input type="hidden" name="_subject" value="New Exotic Dairy Inquiry">

          <div class="form-row">
            <label>Name *</label>
            <input type="text" name="name" minlength="2" required>
          </div>

          <div class="form-row">
            <label>Email *</label>
            <input type="email" name="email" required>
          </div>

          <div class="form-row">
            <label>Company</label>
            <input type="text" name="company">
          </div>

          <div class="form-row">
            <label>Country</label>
            <input type="text" name="country">
          </div>

          <div class="form-row">
            <label>Interest</label>
            <select name="interest">
              <option>Research</option>
              <option>Products</option>
              <option>Distribution</option>
              <option>Investment</option>
              <option>Partnerships</option>
              <option>Media</option>
            </select>
          </div>

          <div class="form-row full">
            <label>Message *</label>
            <textarea name="message" rows="5" minlength="10" required></textarea>
          </div>

          <div class="form-row full">
            <label class="checkbox-label">
              <input type="checkbox" name="consent" value="yes" required>
              I agree to the Privacy Policy and consent to being contacted.
            </label>
          </div>

          <button class="btn" type="submit">Send inquiry</button>

          <div id="form-success" style="display:none;">
            Thank you for contacting Exotic Dairy.
            We will get back to you shortly.
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

createContactModal();

document.addEventListener("click", e => {
  const trigger = e.target.closest(".modal-trigger");

  if (trigger) {
    e.preventDefault();

    const modalId = trigger.dataset.modal;
    const modal = document.getElementById(modalId);

    if (!modal) return;

    const interest = trigger.dataset.interest;

    if (interest) {
      const interestSelect = modal.querySelector('select[name="interest"]');

      if (interestSelect) {
        interestSelect.value = interest;
      }
    }

    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  if (e.target.closest(".modal-close")) {
    document.querySelectorAll(".modal.is-open").forEach(modal => {
      modal.classList.remove("is-open");
    });

    document.body.style.overflow = "";
  }
});

document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;

  document.querySelectorAll(".modal.is-open").forEach(modal => {
    modal.classList.remove("is-open");
  });

  document.body.style.overflow = "";
});