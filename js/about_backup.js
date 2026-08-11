// about.js

// Import GSAP and ScrollTrigger plugin
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Wait for DOM to fully load before executing
document.addEventListener("DOMContentLoaded", () => {
  // Check if current page is the about page or has about-hero section; exit if not
  const isAboutPage = document.querySelector(".page.about-page") || document.querySelector(".about-hero");
  if (!isAboutPage) return;

  // Register ScrollTrigger plugin with GSAP
  gsap.registerPlugin(ScrollTrigger);

  let scrollTriggerInstances = []; // Store ScrollTrigger instances for cleanup

  // Initialize animations
  const initAnimations = () => {
    // Clean up existing ScrollTrigger instances
    scrollTriggerInstances.forEach((instance) => {
      if (instance) instance.kill();
    });
    scrollTriggerInstances = [];

    // Profile card parallax and tilt animations
    const profileCard = document.querySelector('.profile-card');
    const profileCardInner = document.querySelector('.profile-card-inner');
    const profileImage = document.querySelector('.profile-image');
    const aboutHeroLeft = document.querySelector('.about-hero-left');
    const aboutHeroHeader = document.querySelector('.about-hero-header h1');
    const aboutBioParagraphs = document.querySelectorAll('.about-hero-bio p');
    const cardCorners = document.querySelectorAll('.profile-card-corner');
    
    if (profileCard && window.innerWidth > 1000) {
      // Parallax scroll effect for profile card (deeper movement)
      const cardParallax = gsap.to('.profile-card', {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
      scrollTriggerInstances.push(cardParallax.scrollTrigger);

      // Counter parallax for left content
      const leftParallax = gsap.to('.about-hero-left', {
        y: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
      scrollTriggerInstances.push(leftParallax.scrollTrigger);

      // Image zoom effect on scroll
      if (profileImage) {
        const imageZoom = gsap.to('.profile-image', {
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        });
        scrollTriggerInstances.push(imageZoom.scrollTrigger);
      }

      // Rotate card slightly on scroll
      const cardRotate = gsap.to('.profile-card-inner', {
        rotation: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
      scrollTriggerInstances.push(cardRotate.scrollTrigger);

      // Corners spin animation on scroll
      if (cardCorners.length > 0) {
        cardCorners.forEach((corner, index) => {
          const direction = index % 2 === 0 ? 360 : -360;
          const cornerRotate = gsap.to(corner, {
            rotation: direction,
            ease: 'none',
            scrollTrigger: {
              trigger: '.about-hero',
              start: 'top center',
              end: 'bottom top',
              scrub: 1,
            },
          });
          scrollTriggerInstances.push(cornerRotate.scrollTrigger);
        });
      }

      // 3D tilt effect on mouse move (enhanced)
      if (profileCardInner) {
        profileCard.addEventListener('mousemove', (e) => {
          const rect = profileCard.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = ((y - centerY) / centerY) * -12;
          const rotateY = ((x - centerX) / centerX) * 12;
          
          gsap.to(profileCardInner, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000,
            transformStyle: 'preserve-3d',
          });

          // Move image slightly opposite
          gsap.to(profileImage, {
            x: -rotateY * 0.5,
            y: -rotateX * 0.5,
            duration: 0.5,
            ease: 'power2.out',
          });
        });
        
        profileCard.addEventListener('mouseleave', () => {
          gsap.to(profileCardInner, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out',
          });

          gsap.to(profileImage, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        });
      }

      // Continuous floating animation for profile card
      gsap.to('.profile-card', {
        y: '+=20',
        duration: 3.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Glow pulse animation (enhanced)
      const glowElement = document.querySelector('.profile-card-glow');
      if (glowElement) {
        gsap.to('.profile-card-glow', {
          scale: 1.3,
          opacity: 1,
          duration: 4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      // Corners breathing animation
      if (cardCorners.length > 0) {
        gsap.to(cardCorners, {
          scale: 1.3,
          opacity: 0.6,
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.2,
            from: 'start',
          },
        });
      }
    }

    // Text reveal animations
    if (aboutHeroHeader) {
      const headerWords = document.querySelectorAll('.about-hero-header h1');
      gsap.from(headerWords, {
        y: 100,
        opacity: 0,
        rotationX: -90,
        transformOrigin: 'center top',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.about-hero-header',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }

    // Bio text stagger animation
    if (aboutBioParagraphs.length > 0) {
      gsap.from(aboutBioParagraphs, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.3,
        scrollTrigger: {
          trigger: '.about-hero-bio',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Text wave effect on hover
      aboutBioParagraphs.forEach(para => {
        if (para.classList.contains('ss')) {
          const text = para.textContent;
          const words = text.split(' ');
          para.innerHTML = words.map(word => `<span class="word">${word} </span>`).join('');
          
          const wordSpans = para.querySelectorAll('.word');
          
          para.addEventListener('mouseenter', () => {
            gsap.to(wordSpans, {
              y: -5,
              duration: 0.3,
              ease: 'power2.out',
              stagger: {
                each: 0.02,
                from: 'start',
              },
            });
          });

          para.addEventListener('mouseleave', () => {
            gsap.to(wordSpans, {
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
              stagger: {
                each: 0.02,
                from: 'start',
              },
            });
          });
        }
      });
    }

    // Profile card entrance animation with bounce
    if (profileCard) {
      gsap.from('.profile-card', {
        scale: 0.8,
        opacity: 0,
        rotation: -10,
        duration: 1.5,
        ease: 'elastic.out(1, 0.6)',
        scrollTrigger: {
          trigger: '.about-hero',
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });
    }

    // Shadow animation on scroll
    const shadowAnimation = gsap.to('.profile-card-inner', {
      boxShadow: '25px 25px 0px 0px var(--accent1), 50px 50px 0px 0px rgba(237, 106, 90, 0.5)',
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-hero',
        start: 'top center',
        end: 'bottom top',
        scrub: 1,
      },
    });
    scrollTriggerInstances.push(shadowAnimation.scrollTrigger);

    // Stats items animation (if stats elements exist)
    const statsElements = document.querySelectorAll(".stats-item-1, .stats-item-2, .stats-item-3");
    if (statsElements.length > 0) {
      // Set initial state for stats items
      gsap.set([".stats-item-1", ".stats-item-2", ".stats-item-3"], {
        scale: 0, // Start scaled down
      });

      // Animate stats items
      const statsAnimation = gsap.to(
        [".stats-item-1", ".stats-item-2", ".stats-item-3"],
        {
          scale: 1, // Scale to full size
          duration: 1, // Animation duration
          stagger: 0.1, // Stagger animations by 0.1s
          ease: "power4.out", // Smooth easing
          scrollTrigger: {
            trigger: ".stats", // Trigger element
            start: "top 50%", // Start when top of stats hits 50% of viewport
            toggleActions: "play none none none", // Play animation on enter
          },
        }
      );
      scrollTriggerInstances.push(statsAnimation.scrollTrigger); // Store instance
    }

    // Animations for larger screens (> 1000px)
    if (window.innerWidth > 1000) {
      // Portrait animation (if element exists)
      const portraitElement = document.querySelector(".about-hero-portrait");
      if (portraitElement) {
        const portraitAnimation = gsap.to(".about-hero-portrait", {
          y: -200, // Move up by 200px
          rotation: -25, // Rotate -25 degrees
          scrollTrigger: {
            trigger: ".about-hero", // Trigger element
            start: "top top", // Start when top of hero hits top of viewport
            end: "bottom top", // End when bottom of hero hits top of viewport
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(portraitAnimation.scrollTrigger); // Store instance
      }

      // Tag animations (if elements exist)
      const tag1 = document.querySelector("#tag-1");
      if (tag1) {
        const tag1Animation = gsap.to("#tag-1", {
          y: -300, // Move up by 300px
          rotation: -45, // Rotate -45 degrees
          scrollTrigger: {
            trigger: ".about-copy", // Trigger element
            start: "top bottom", // Start when top of about-copy hits bottom of viewport
            end: "bottom+=100% top", // End after scrolling 100% beyond bottom
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(tag1Animation.scrollTrigger); // Store instance
      }

      const tag2 = document.querySelector("#tag-2");
      if (tag2) {
        const tag2Animation = gsap.to("#tag-2", {
          y: -150, // Move up by 150px
          rotation: 70, // Rotate 70 degrees
          scrollTrigger: {
            trigger: ".about-copy", // Trigger element
            start: "top bottom", // Start when top of about-copy hits bottom of viewport
            end: "bottom+=100% top", // End after scrolling 100% beyond bottom
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(tag2Animation.scrollTrigger); // Store instance
      }

      const tag3 = document.querySelector("#tag-3");
      if (tag3) {
        const tag3Animation = gsap.to("#tag-3", {
          y: -400, // Move up by 400px
          rotation: 120, // Rotate 120 degrees
          scrollTrigger: {
            trigger: ".about-copy", // Trigger element
            start: "top bottom", // Start when top of about-copy hits bottom of viewport
            end: "bottom+=100% top", // End after scrolling 100% beyond bottom
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(tag3Animation.scrollTrigger); // Store instance
      }

      const tag4 = document.querySelector("#tag-4");
      if (tag4) {
        const tag4Animation = gsap.to("#tag-4", {
          y: -350, // Move up by 350px
          rotation: -60, // Rotate -60 degrees
          scrollTrigger: {
            trigger: ".about-copy", // Trigger element
            start: "top bottom", // Start when top of about-copy hits bottom of viewport
            end: "bottom+=100% top", // End after scrolling 100% beyond bottom
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(tag4Animation.scrollTrigger); // Store instance
      }

      const tag5 = document.querySelector("#tag-5");
      if (tag5) {
        const tag5Animation = gsap.to("#tag-5", {
          y: -200, // Move up by 200px
          rotation: 100, // Rotate 100 degrees
          scrollTrigger: {
            trigger: ".about-copy", // Trigger element
            start: "top bottom", // Start when top of about-copy hits bottom of viewport
            end: "bottom+=100% top", // End after scrolling 100% beyond bottom
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(tag5Animation.scrollTrigger); // Store instance
      }
    }
  };

  // Run animations on page load
  initAnimations();

  // Re-run animations on window resize to recalculate trigger points
  window.addEventListener("resize", () => {
    initAnimations();
  });
});