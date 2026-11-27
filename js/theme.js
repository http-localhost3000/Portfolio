// js/theme.js — Premium Circular Ripple Theme Transition
// Uses the View Transitions API (Chrome 111+) with a clip-path circle expanding
// from the toggle button outward — the same technique used on Awwwards sites.

(function () {

  // ─── Instant init — runs before DOMContentLoaded to prevent flicker ───────
  // (head inline script already sets data-theme from localStorage; this just
  //  wires up the toggle button once the DOM is ready)

  function applyTheme(newTheme) {
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: newTheme } }));
  }

  // ─── bfcache Fix — Back/Forward Button ──────────────────────────────────
  // When the user presses the browser Back button, the browser restores an exact
  // frozen snapshot of the page (bfcache). The inline <head> script doesn't re-run,
  // so the old data-theme survives. The `pageshow` event fires on bfcache restores
  // (event.persisted === true) — we use it to re-sync from localStorage instantly.
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      document.documentElement.setAttribute(
        "data-theme",
        localStorage.getItem("theme") || "light"
      );
    }
  });

  function doTransition(newTheme, originX, originY) {
    // Max radius needed to cover the entire page from the click origin
    const endRadius = Math.hypot(
      Math.max(originX, window.innerWidth  - originX),
      Math.max(originY, window.innerHeight - originY)
    );

    // ── Path A: View Transitions API (Chrome 111+, Edge 111+) ────────────────
    // This is the gold-standard Awwwards-level approach
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        applyTheme(newTheme);
      });

      // Once the new snapshot is ready in the pseudo-element, play the circle
      transition.ready.then(() => {
        const clipKeyframes = {
          clipPath: [
            `circle(0px at ${originX}px ${originY}px)`,
            `circle(${endRadius}px at ${originX}px ${originY}px)`
          ]
        };

        const timing = {
          duration: 550,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",  // smooth "ease-out-expo"
          pseudoElement: "::view-transition-new(root)"
        };

        document.documentElement.animate(clipKeyframes, timing);
      });
      return;
    }

    // ── Path B: Fallback — clip-path overlay on a fixed div ──────────────────
    // For Safari / Firefox where View Transitions API isn't available
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 99999;
      pointer-events: none;
      clip-path: circle(0px at ${originX}px ${originY}px);
      background: var(--bg);
    `;

    // First apply new theme, then animate the overlay (it briefly covers old snapshot)
    applyTheme(newTheme);
    document.body.appendChild(overlay);

    // Force reflow then animate
    overlay.getBoundingClientRect();
    overlay.style.transition = `clip-path 550ms cubic-bezier(0.22, 1, 0.36, 1)`;
    overlay.style.clipPath = `circle(${endRadius}px at ${originX}px ${originY}px)`;

    overlay.addEventListener("transitionend", () => overlay.remove(), { once: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const toggleButtons = document.querySelectorAll(".theme-toggle-btn");

    toggleButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme     = currentTheme === "dark" ? "light" : "dark";

        // Get exact center of the clicked button as the ripple origin
        const rect    = btn.getBoundingClientRect();
        const originX = Math.round(rect.left + rect.width  / 2);
        const originY = Math.round(rect.top  + rect.height / 2);

        doTransition(newTheme, originX, originY);
      });
    });
  });

})();
