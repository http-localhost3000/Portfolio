// about.js - Premium scroll-linked animations with GSAP ScrollTrigger

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
  const aboutHero = document.querySelector('.about-hero');
  if (!aboutHero) return;

  gsap.registerPlugin(ScrollTrigger);

  // ========================================
  // 1. WRAP HEADING TEXT FOR CLIP REVEAL
  // ========================================
  const headers = aboutHero.querySelectorAll('.about-hero-header h1');
  headers.forEach(h1 => {
    const text = h1.textContent;
    h1.innerHTML = `<span class="header-line">${text}</span>`;
  });

  // ========================================
  // 2. SPLIT TAGLINE INTO INDIVIDUAL WORDS
  // ========================================
  const tagline = aboutHero.querySelector('.about-hero-bio p.mn');
  if (tagline) {
    const parts = tagline.textContent.split(' / ');
    tagline.innerHTML = parts.map((word, i) => {
      const wordSpan = `<span class="tagline-word">${word.trim()}</span>`;
      const separator = i < parts.length - 1 ? `<span class="tagline-separator">/</span>` : '';
      return wordSpan + separator;
    }).join('');
  }

  // ========================================
  // 3. INSERT DECORATIVE DIVIDER LINE
  // ========================================
  const headerDiv = aboutHero.querySelector('.about-hero-header');
  const bioDiv = aboutHero.querySelector('.about-hero-bio');
  if (headerDiv && bioDiv) {
    const divider = document.createElement('div');
    divider.className = 'about-hero-divider';
    headerDiv.parentNode.insertBefore(divider, bioDiv);
  }

  // ========================================
  // 4. MAIN SCROLL TIMELINE
  // ========================================
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.about-hero',
      start: 'top 85%',
      end: 'top 15%',
      scrub: 1.2,
    }
  });

  // --- Left side entrance ---
  tl.to('.about-hero-left', {
    opacity: 1,
    x: 0,
    duration: 0.3,
  }, 0);

  // --- Heading lines clip reveal ---
  const headerLines = aboutHero.querySelectorAll('.header-line');
  headerLines.forEach((line, i) => {
    tl.to(line, {
      y: '0%',
      duration: 0.5,
      ease: 'power3.out',
    }, 0.05 + i * 0.12);
  });

  // --- Decorative divider draw ---
  tl.to('.about-hero-divider', {
    scaleX: 1,
    duration: 0.4,
    ease: 'power2.inOut',
  }, 0.2);

  // --- Bio paragraph fade in ---
  tl.fromTo('.about-hero-bio p.ss', {
    opacity: 0,
    y: 40,
  }, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power2.out',
  }, 0.3);

  // --- Tagline words stagger ---
  const taglineWords = aboutHero.querySelectorAll('.tagline-word');
  const taglineSeps = aboutHero.querySelectorAll('.tagline-separator');
  
  tl.to(taglineWords, {
    opacity: 1,
    y: 0,
    duration: 0.3,
    stagger: 0.06,
    ease: 'back.out(1.4)',
  }, 0.5);

  tl.to(taglineSeps, {
    opacity: 0.6,
    y: 0,
    duration: 0.2,
    stagger: 0.04,
    ease: 'power2.out',
  }, 0.55);

  // --- Right side (profile card) entrance ---
  tl.fromTo('.about-hero-right', {
    opacity: 0,
    x: 80,
    rotation: 4,
  }, {
    opacity: 1,
    x: 0,
    rotation: 0,
    duration: 0.6,
    ease: 'power3.out',
  }, 0.1);

  // ========================================
  // 5. PARALLAX DEPTH EFFECT (separate trigger)
  // ========================================
  gsap.to('.about-hero-left-scroll', {
    y: -60,
    ease: 'none',
    scrollTrigger: {
      trigger: '.about-hero',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.8,
    }
  });

  gsap.to('.profile-card-scroll', {
    y: -100,
    ease: 'none',
    scrollTrigger: {
      trigger: '.about-hero',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.8,
    }
  });

  // ========================================
  // 6. PROFILE CARD SHADOW SCROLL ANIMATION
  // ========================================
  const profileCardInner = document.querySelector('.profile-card-inner');
  if (profileCardInner) {
    ScrollTrigger.create({
      trigger: '.about-hero',
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const p = self.progress;
        const offsetX = 15 + p * 10;
        const offsetY = 15 + p * 10;
        const offset2X = 30 + p * 20;
        const offset2Y = 30 + p * 20;
        profileCardInner.style.boxShadow = 
          `${offsetX}px ${offsetY}px 0px 0px var(--accent1), ${offset2X}px ${offset2Y}px 0px 0px rgba(237, 106, 90, ${0.2 + p * 0.2})`;
      }
    });
  }

  // ========================================
  // 7. 3D MOUSE TILT (Desktop only)
  // ========================================
  if (window.innerWidth > 1000 && profileCardInner) {
    const profileCard = document.querySelector('.profile-card');
    
    profileCard.addEventListener('mousemove', (e) => {
      const rect = profileCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      gsap.to(profileCardInner, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    profileCard.addEventListener('mouseleave', () => {
      gsap.to(profileCardInner, {
        rotateX: 0,
        rotateY: 0,
        transformPerspective: 1000,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  }

  console.log("✅ About section scroll animations initialized");
});
