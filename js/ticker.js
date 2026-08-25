/**
 * Tech Stack Ticker - JS-driven 3D Concave Scroller
 *
 * Moves the flex-row track continuously to the left.
 * On every frame, each card's distance from screen center is measured,
 * and scale + rotateY are applied: biggest + most-tilted at edges,
 * smallest + flat at center.
 */
(function initTicker() {
  const viewport = document.querySelector(".carousel-viewport");
  const track    = document.querySelector(".carousel-track-3d");
  if (!viewport || !track) return;

  // Config
  const SPEED        = 1.0;   // px per frame (~60fps)
  const SCALE_CENTER = 0.72;  // scale when a card is dead-center
  const SCALE_EDGE   = 1.28;  // scale when a card is at the screen edge
  const TILT_MAX     = 22;    // max rotateY degrees (at screen edge)

  let x         = 0;
  let isHovered = false;
  let halfWidth = 0;

  viewport.addEventListener("mouseenter", () => { isHovered = true;  });
  viewport.addEventListener("mouseleave", () => { isHovered = false; });

  function calcHalfWidth() {
    // Card 8 (9th card) is the start of the duplicated set.
    // Its offsetLeft is the exact pixel distance of one full loop set including gaps.
    if (track.children && track.children.length > 8) {
      halfWidth = track.children[8].offsetLeft;
    } else {
      halfWidth = track.scrollWidth / 2;
    }
  }

  function applyDepth() {
    const cx = window.innerWidth / 2;
    track.querySelectorAll(".ticker-item").forEach(function(card) {
      const rect    = card.getBoundingClientRect();
      const cardCx  = rect.left + rect.width / 2;
      const dist    = cardCx - cx;
      const maxDist = cx + rect.width * 0.6;
      const t       = Math.min(Math.abs(dist) / maxDist, 1);

      const scale   = SCALE_CENTER + t * (SCALE_EDGE - SCALE_CENTER);
      const rotateY = -(dist / maxDist) * TILT_MAX;

      if (rect.right > -200 && rect.left < window.innerWidth + 200) {
        card.style.transform = "scale(" + scale.toFixed(4) + ") rotateY(" + rotateY.toFixed(2) + "deg)";
        card.style.zIndex    = Math.round(t * 10).toString();
      }
    });
  }

  function tick() {
    if (!isHovered) {
      x -= SPEED;
      if (halfWidth && Math.abs(x) >= halfWidth) {
        x += halfWidth;
      }
      track.style.transform = "translateX(" + x.toFixed(2) + "px)";
    }
    applyDepth();
    requestAnimationFrame(tick);
  }

  // Recalculate if window resizes (for responsive layouts)
  window.addEventListener("resize", calcHalfWidth);

  requestAnimationFrame(function() {
    calcHalfWidth();
    tick();
  });
})();
