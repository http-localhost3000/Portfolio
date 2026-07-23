## Oggy & the Cockroaches — light lavender cartoon theme

### Goal
Shift the page from a dark purple background to a **bright soft lavender** (#EDE3FF) light theme, matching the reference image, while keeping all your vibrant blue/pink/yellow/teal accents and dark ink comic borders. Add floating cartoon doodles (clouds, sparkles) to the background.

### Change 1 — `src/index.css` :root (lines 3–15)
Add a new lavender variable for clarity:
```css
--lavender: #EDE3FF;
--lavender-line: #C9B8F5;  /* faint grid + soft shadows */
```

### Change 2 — body background + overlays (lines 28–30)
- **Line 28** `body`: `background: var(--purple)` → `background: var(--lavender)`
- **Line 29** `body::before` grid: switch white lines `rgba(255,255,255,.62)` → soft lilac `rgba(122,44,255,.10)` so the grid is visible on light bg
- **Line 30** `body::after` glows: keep but soften opacity so they read as gentle warm spots, not overpowering

### Change 3 — flip hero text to dark (lines 54, 56, 57)
Currently light `var(--paper)` text on dark bg → becomes invisible on lavender. Flip:
- `.hero__name` → `color: var(--ink)` (the ✦ span stays yellow)
- `.hero__heading` → `color: var(--ink)`; change `text-shadow: 5px 5px 0 var(--ink)` → `5px 5px 0 var(--lavender-line)` for soft purple depth (dark-on-dark shadow would vanish)
- `.hero__sub` → `color: #4f4760` (softer body text)

### Change 4 — add floating cartoon doodles
Two-part addition for the playful Oggy vibe:

**A. JSX** — add a `<div className="bg-doodles" aria-hidden="true">` layer in `App.jsx` (next to the existing `bg-glow` divs) containing:
- 3 fluffy cloud divs (`.bg-doodle--cloud`)
- 2 sparkle divs (`.bg-doodle--spark`)
- 1 paw-print cluster (`.bg-doodle--paws`)

**B. CSS** — new `.bg-doodles` rules:
- Fixed position, full viewport, behind content (`z-index: 0`, content sits above)
- Clouds: white rounded blobs with dark ink border + soft shadow, slow `drift` animation (translateX + bob)
- Sparkles: yellow ✦ characters, gentle pulse/rotate
- Paws: small ink-colored dot clusters
- `pointer-events: none` so they never block clicks
- Respects `prefers-reduced-motion`

### What stays untouched (no contrast issues)
- `.project-card__back` (line 79) — pink bg + light text + dark shadow stays correct
- `.footer` (line 105) — yellow footer, pink span text — still pops on lavender
- `.gold-text`, `.footer__text span` — pink + dark shadow — fine on light
- All card backgrounds (`var(--paper)` cream) — now pop *more* against lavender
- Scrollbar (pink/yellow native) — unchanged
- Reveal animation, project flip animation — unchanged

### Net change
- ~2 lines added to `:root`
- ~5 lines tweaked (body, hero text)
- ~1 new `<div>` block in `App.jsx`
- ~35 lines of new `.bg-doodles` CSS
- Zero new dependencies, zero structural/routing changes

### Risk check
The only contrast-critical changes are the 3 hero text flips (lines 54/56/57) — all explicitly addressed. Everything else is additive decoration or the single body bg swap. The existing card/border/accent system was *designed* for this kind of swap, so no ripple effects expected.