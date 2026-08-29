// transition.js - Premium cinematic page entrance with static vertical bars to prevent FOUC

import gsap from "gsap";



// Replay entrance transition when page is shown (handles initial load, refresh, and back/forward cache)
window.addEventListener("pageshow", (event) => {
  // Show all transition elements again
  const transition = document.querySelector('.transition');
  const loader = document.querySelector('.transition-loader');
  const progress = document.querySelector('.transition-progress');
  const labels = document.querySelectorAll('.transition-corner-label');
  if (transition) transition.style.display = 'block';
  if (loader) loader.style.display = 'flex';
  if (progress) progress.style.display = 'block';
  labels.forEach(label => label.style.display = 'block');

  // Reset bars to cover screen
  const bars = document.querySelectorAll(".transition-bar");
  bars.forEach((bar) => {
    gsap.set(bar, { yPercent: 0, clearProps: "all" });
  });

  // Run the entrance animation
  // We use a 100ms delay to allow the GSAP ticker to process the time jump / lag from pageshow restore
  setTimeout(() => {
    revealTransition();
  }, 100);
});

function revealTransition() {
  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Hide transition elements when finished
        const transition = document.querySelector('.transition');
        const loader = document.querySelector('.transition-loader');
        const progress = document.querySelector('.transition-progress');
        const labels = document.querySelectorAll('.transition-corner-label');
        if (transition) transition.style.display = 'none';
        if (loader) loader.style.display = 'none';
        if (progress) progress.style.display = 'none';
        labels.forEach(label => label.style.display = 'none');
        resolve();
      }
    });

    // --- Phase 0: Initial states ---
    gsap.set('.transition-loader-card', { opacity: 0, scale: 0.92, y: 30 });
    gsap.set('.transition-loader-monogram', { opacity: 0, y: 12 });
    gsap.set('.transition-loader-line', { scaleX: 0 });
    gsap.set('.transition-loader-tagline', { opacity: 0, y: 8 });
    gsap.set('.transition-progress-bar', { scaleX: 0 });
    gsap.set('.transition-corner-label', { opacity: 0 });

    // --- Phase 1: Card Reveal ---
    tl.to('.transition-loader-card', {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, 0.15);

    // --- Phase 2: Card Inner Elements Reveal ---
    tl.to('.transition-loader-monogram', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, 0.45);

    tl.to('.transition-loader-line', {
      scaleX: 1,
      duration: 0.4,
      ease: 'power2.inOut',
    }, 0.6);

    tl.to('.transition-loader-tagline', {
      opacity: 0.75,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
    }, 0.75);

    tl.to('.transition-corner-label', {
      opacity: 0.6,
      duration: 0.4,
    }, 0.85);

    // --- Phase 3: Progress count & bar fill ---
    const percentLabel = document.querySelector('.transition-corner-label.bottom-right');
    tl.to('.transition-progress-bar', {
      scaleX: 1,
      duration: 1.4,
      ease: 'power2.inOut',
    }, 0.95);

    if (percentLabel) {
      tl.to({ val: 0 }, {
        val: 100,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: function() {
          percentLabel.textContent = `${Math.round(this.targets()[0].val)}%`;
        }
      }, 0.95);
    }

    // --- Phase 4: Fade out loader and labels ---
    tl.to('.transition-loader-card', {
      opacity: 0,
      scale: 0.95,
      y: -20,
      duration: 0.4,
      ease: 'power2.in',
    }, 2.5);

    tl.to('.transition-corner-label', {
      opacity: 0,
      duration: 0.3,
    }, 2.5);

    tl.to('.transition-progress', {
      opacity: 0,
      duration: 0.3,
    }, 2.5);

    // --- Phase 5: Staggered rising curtain reveal ---
    tl.to('.transition-bar', {
      yPercent: -100,
      duration: 0.85,
      ease: 'power3.inOut',
      stagger: {
        amount: 0.4,
        from: 'start'
      }
    }, 2.8);

    // --- Phase 6: Coordinated Hero Entrance ---
    tl.fromTo('nav .logo', {
      opacity: 0,
      y: -20,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, 3.35);

    tl.fromTo('nav .menu-toggle-btn', {
      opacity: 0,
      y: -20,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, 3.45);

    tl.fromTo('.hero .hero-header h1', {
      opacity: 0,
      y: 80,
      rotateX: -15,
    }, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
    }, 3.5);

    tl.fromTo('.hero .hero-footer', {
      opacity: 0,
      y: 30,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, 3.85);
  });
}

function animateTransition() {
  return new Promise((resolve) => {
    // Make transition element visible
    const transition = document.querySelector('.transition');
    if (transition) transition.style.display = 'block';

    const tl = gsap.timeline({ onComplete: resolve });

    const bars = document.querySelectorAll('.transition-bar');
    bars.forEach((bar, index) => {
      const fromTop = index % 2 === 0;
      gsap.set(bar, { yPercent: fromTop ? -100 : 100 });
    });

    // Slide bars in with zipper stagger
    tl.to('.transition-bar', {
      yPercent: 0,
      duration: 0.6,
      ease: 'power3.inOut',
      stagger: {
        amount: 0.35,
        from: 'center'
      }
    }, 0);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.warn("DOMContentLoaded fired in transition.js");

  // Close mobile menu if open
  function closeMenuIfOpen() {
    const menuToggleBtn = document.querySelector(".menu-toggle-btn");
    if (menuToggleBtn && menuToggleBtn.classList.contains("menu-open")) {
      menuToggleBtn.click();
    }
  }

  // Check if link points to the current page
  function isSamePage(href) {
    if (!href || href === "#" || href === "") return true;

    const currentPath = window.location.pathname;

    if (href === currentPath) return true;

    if (
      (currentPath === "/" || currentPath === "/index.html") &&
      (href === "/" ||
        href === "/index.html" ||
        href === "index.html" ||
        href === "./index.html")
    ) {
      return true;
    }

    const currentFileName = currentPath.split("/").pop() || "index.html";
    const hrefFileName = href.split("/").pop();
    if (currentFileName === hrefFileName) return true;

    return false;
  }

  // Add click event listeners to all <a> tags
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      const target = link.getAttribute("target");

      // Allow default behavior for links that open in new tab
      if (target === "_blank") return;

      // Allow default behavior for external links, mailto, tel, or PDF links
      if (
        href &&
        (href.startsWith("http") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:") ||
          href.endsWith(".pdf"))
      ) {
        return;
      }

      // Prevent navigation for same-page links and close menu
      if (isSamePage(href)) {
        event.preventDefault();
        closeMenuIfOpen();
        return;
      }

      // Perform transition for different page links
      event.preventDefault();
      animateTransition().then(() => {
        window.location.href = href;
      });
    });
  });
});