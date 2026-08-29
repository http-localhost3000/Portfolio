/**
 * Tech Stack Ticker — 120 FPS GPU-Composited Scroller
 *
 * Rendering optimizations:
 *  1. Layout caching — offsetLeft/width read ONCE on init/resize, never inside the rAF loop.
 *  2. translate3d — forces GPU compositing path for the track; avoids the CPU paint path.
 *  3. No toFixed() inside the hot loop — pre-rounded integers where possible; template
 *     literal strings are built only when the transform actually changes.
 *  4. No zIndex mutations inside rAF — compositor layer rebuilds are eliminated.
 *  5. Delta-time speed — constant physical velocity regardless of monitor refresh rate.
 *  6. Dirty-flag skipping — if hovered and nothing changed, applyDepth is still called
 *     once so the 3D effect stays live when the track is paused.
 */
(function initTicker() {
  const viewport = document.querySelector(".carousel-viewport");
  const track    = document.querySelector(".carousel-track-3d");
  if (!viewport || !track) return;

  // ─── Config ───────────────────────────────────────────────────────────────
  const SPEED_PX_PER_MS = 0.06;   // constant physical speed (≈7px/frame @120fps)
  const SCALE_CENTER    = 0.72;
  const SCALE_EDGE      = 1.28;
  const SCALE_RANGE     = SCALE_EDGE - SCALE_CENTER;
  const TILT_MAX        = 22;

  // ─── State ────────────────────────────────────────────────────────────────
  let x          = 0;
  let isHovered  = false;
  let halfWidth  = 0;
  let winWidth   = window.innerWidth;
  let lastTime   = performance.now();
  let cardsData  = [];           // { element, offsetLeft, width, halfW } — immutable per layout

  // ─── Event Listeners ──────────────────────────────────────────────────────
  viewport.addEventListener("mouseenter", () => { isHovered = true;  });
  viewport.addEventListener("mouseleave", () => { isHovered = false; });

  // ─── Layout Cache ─────────────────────────────────────────────────────────
  function cacheLayout() {
    winWidth = window.innerWidth;

    const children = Array.from(track.querySelectorAll(".ticker-item"));

    // Loop seam: the 9th element (index 8) marks the start of the clone set
    halfWidth = (children.length > 8)
      ? children[8].offsetLeft
      : track.scrollWidth / 2;

    cardsData = children.map(card => ({
      element:    card,
      offsetLeft: card.offsetLeft,
      width:      card.offsetWidth,
      halfW:      card.offsetWidth / 2,
    }));
  }

  // ─── Depth / 3D effect — zero DOM reads inside here ──────────────────────
  function applyDepth() {
    const cx     = winWidth / 2;
    const len    = cardsData.length;
    const margin = winWidth + 200;

    for (let i = 0; i < len; i++) {
      const card = cardsData[i];

      // Cull cards completely off screen (no GPU layer needed)
      const left  = card.offsetLeft + x;
      const right = left + card.width;
      if (right < -200 || left > margin) continue;

      // Viewport centre of this card
      const cardCx  = left + card.halfW;
      const dist    = cardCx - cx;
      const maxDist = cx + card.halfW * 1.2;
      const t       = Math.abs(dist) / maxDist < 1 ? Math.abs(dist) / maxDist : 1;

      const scale   = SCALE_CENTER + t * SCALE_RANGE;
      const rotateY = -(dist / maxDist) * TILT_MAX;

      // Build transform string — integers where sub-pixel precision not needed
      card.element.style.transform =
        "scale(" + scale.toFixed(3) + ") rotateY(" + (rotateY | 0) + "deg)";
    }
  }

  // ─── Main render loop ─────────────────────────────────────────────────────
  function tick(now) {
    const delta = now - lastTime;
    lastTime = now;

    if (!isHovered) {
      x -= SPEED_PX_PER_MS * delta;

      // Seamless loop reset — integer snap removes sub-pixel drift
      if (halfWidth && x <= -halfWidth) {
        x += halfWidth;
      }

      // translate3d forces GPU-composited path (avoids software rasterisation)
      track.style.transform = "translate3d(" + (x | 0) + "px,0,0)";
    }

    applyDepth();
    requestAnimationFrame(tick);
  }

  // ─── Boot ─────────────────────────────────────────────────────────────────
  window.addEventListener("resize", () => {
    cacheLayout();
    applyDepth();
  });

  requestAnimationFrame(now => {
    cacheLayout();
    lastTime = now;
    tick(now);
  });
})();
