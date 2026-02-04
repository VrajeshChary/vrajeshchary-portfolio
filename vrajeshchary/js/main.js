/**
 * M Vrajesh Chary - Technical Portfolio
 * Main JavaScript File
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const themeToggle = document.querySelector(".theme-toggle");
  const htmlElement = document.documentElement;
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.querySelector(".site-header");
  const sections = document.querySelectorAll("section");
  const contactForm = document.querySelector(".contact-form");

  // --- Dark Mode Logic ---
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });

  function setTheme(theme) {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Update icon
    const icon = themeToggle.querySelector("i");
    if (theme === "dark") {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    } else {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
  }

  // --- Mobile Menu Logic ---
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    toggleMenu(!isExpanded);
  });

  // Close menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu(false);
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!header.contains(e.target) && navList.classList.contains("active")) {
      toggleMenu(false);
    }
  });

  function toggleMenu(show) {
    if (show) {
      navList.classList.add("active");
      menuToggle.classList.add("active");
      menuToggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      navList.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = ""; // Restore scrolling
    }
  }

  // --- Sticky Header & Active Link Highlighting ---
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Header shadow
    if (scrollY > 50) {
      header.style.boxShadow = "var(--shadow-md)";
    } else {
      header.style.boxShadow = "none";
    }

    // Active Link Highlighting
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // --- Scroll Animations (Intersection Observer) ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optional: Stop observing once visible
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe section titles and cards
  document
    .querySelectorAll(".section-title, .skill-card, .project-card")
    .forEach((el) => {
      el.classList.add("scroll-hidden"); // Add initial hidden state via JS if needed, or rely on CSS
      observer.observe(el);
    });

  // --- Form Validation ---
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simple client-side validation
    const inputs = contactForm.querySelectorAll("input, textarea");
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = "var(--color-accent)";
      } else {
        input.style.borderColor = "var(--color-border)";
      }
    });

    if (isValid) {
      // Simulate submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;

      submitBtn.innerText = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerText = "Message Sent!";
        submitBtn.style.backgroundColor = "var(--color-primary)";
        submitBtn.style.color = "#000";

        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = "";
          submitBtn.style.color = "";
        }, 3000);
      }, 1500);
    }
  });
});
