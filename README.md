# Nitin Katkam | Portfolio

> Modern, high-performance portfolio crafted with fluid GSAP animations, Lenis smooth scrolling, custom typography, and a dark/light theme toggle.

- **Live Site:** [https://nitinka.vercel.app/](https://nitinka.vercel.app/)

---

## 📁 Project Structure

```text
Nithin_Portfolio/
│
├── index.html              # Main Home page (Hero, Ticker, Projects, Services, About, Footer)
├── contact/
│   └── index.html          # Contact page with Web3Forms integration
│
├── css/                    # Modular Stylesheets (loaded in index.html & contact/index.html)
│   ├── globals.css         # Design tokens, CSS variables (light & dark mode), typography
│   ├── fonts.css           # @font-face declarations (Formula, Rader, Supply Mono)
│   ├── transition.css      # Preloader bar animation & page transition curtains
│   ├── menu.css            # Navigation bar, mobile drawer, and theme toggle buttons
│   ├── home.css            # Hero section, tech ticker, service cards, & project grids
│   ├── about.css           # About Me section styling and interactive elements
│   ├── contact.css         # Contact form, inputs, and layout styling
│   ├── footer.css          # Footer layout, social links, and explosion doodle effects
│   └── work.css            # (Optional) Reserved styles for a future standalone /work page
│
├── js/                     # Component-Scoped ES Modules
│   ├── theme.js            # Circular ripple theme toggle (Light / Dark mode persistence)
│   ├── transition.js       # Preloader screen and smooth page-to-page navigation
│   ├── lenis-scroll.js     # Lenis smooth momentum scrolling initialization
│   ├── menu.js             # Navigation overlay menu open/close GSAP animations
│   ├── hero.js             # Floating certificate image trail animation on cursor move
│   ├── ticker.js           # 120 FPS GPU-composited 3D concave tech stack infinite scroller
│   ├── featured-work.js    # Project card hover previews and GSAP interactions
│   ├── services.js         # Horizontal / pinned scroll service cards
│   ├── about.js            # ScrollTrigger animations for About Me section
│   ├── contact.js          # Contact form validation & submission handling
│   └── footer.js           # Interactive footer hover physics & doodle effects
│
├── public/                 # Static Assets (served at root URL '/')
│   ├── Nitin_Katkam_Resume.pdf  # Downloadable resume
│   ├── Nitin1.jpeg, Nitin2.jpg  # Profile photos used in About section
│   ├── 1.png ... 11.png         # Certificate badges for floating hero trail
│   ├── bloodline-ss.png.png     # BloodLine project screenshot
│   ├── pageturn.png             # PageTurn project screenshot
│   ├── VisionaryAI.jpeg         # Visionary AI project image
│   ├── fonts/                   # Custom webfonts (PPFormula, PPRader, PPSupplyMono)
│   └── images/                  # Categorized vector doodles and icons
│       ├── doodles/             # Doodle PNGs used for background patterns
│       ├── global/              # Site favicon, symbols, and dark/light accents
│       ├── hero/                # Hero imagery assets
│       ├── services/            # Service card illustration covers
│       ├── services-header/     # Header portrait
│       └── work-items/          # Additional work showcase thumbnails
│
├── vite.config.js          # Vite build config (multi-page inputs: index.html & contact)
├── vercel.json             # Vercel deployment routes and security/caching headers
├── eslint.config.js        # Modern ESLint configuration
└── package.json            # Project scripts and dependencies (GSAP, Lenis, Vite)
```

---

## 🛠️ How to Make Changes

### 1. Updating Projects
- Open [`index.html`](index.html).
- Find `<section class="featured-work">` (around line 210).
- Update the project title, description, tags, GitHub link, and Live Demo link.
- Add project preview images into [`public/`](public/) and link them via `<img src="/your-image.png" />`.

### 2. Updating Hero & Floating Certificate Trail
- **Hero Title/Tagline:** In [`index.html`](index.html), search for `<div class="hero-header">`.
- **Certificate Badges:** Certificates `1.png` through `11.png` in [`public/`](public/) are dynamically cycled by [`js/hero.js`](js/hero.js). To add or change badges, update the `images` array in [`js/hero.js`](js/hero.js).

### 3. Updating the Tech Stack Ticker
- In [`index.html`](index.html), locate `<div class="carousel-track-3d">` (around line 170).
- Edit or add `.ticker-item` blocks.
- *Note:* The items are duplicated once in the HTML to ensure a seamless 360° infinite loop.

### 4. Updating About Me & Skills
- In [`index.html`](index.html), locate `<section class="about-section">`.
- Profile photos can be replaced in [`public/Nitin2.jpg`](public/Nitin2.jpg) or changed in the `<img>` tags.

### 5. Updating Contact Information & Social Links
- **Social Links:** Found in the footer of both [`index.html`](index.html) and [`contact/index.html`](contact/index.html), as well as in the navigation drawer (`.nav-overlay`).
- **Contact Form:** Handled by [Web3Forms](https://web3forms.com) in [`contact/index.html`](contact/index.html). Replace the `access_key` input with your own Web3Forms key to receive emails directly.

### 6. Changing Colors & Typography
- Global theme variables for both Light Mode and Dark Mode are defined at the top of [`css/globals.css`](css/globals.css):
  - `--bg-primary` & `--text-primary`
  - `--accent-gold`, `--accent-crimson`, `--accent-teal`
  - `--border-color`

---

## 🚀 Development & Build Commands

```bash
# Install dependencies
npm install

# Start local development server (runs on http://localhost:5173)
npm run dev

# Create optimized production build (output in /dist)
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```
