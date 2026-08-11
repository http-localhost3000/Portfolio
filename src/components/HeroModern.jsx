import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroModern = () => {
  const heroRef = useRef(null);
  const bgImagesRef = useRef([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/bloodline-ss.png.png',
    '/VisionaryAI.jpeg',
    '/pageturn.png'
  ];

  useEffect(() => {
    // Cycle through background images
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const content = hero.querySelector('.hero__content');
    const bgImage = hero.querySelector('.hero__bg-image.active img');

    // Initial animations
    gsap.fromTo(
      content.children,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 1.5,
      }
    );

    // Scroll-triggered animations for background image
    if (bgImage) {
      gsap.fromTo(
        bgImage,
        {
          scale: 0.25,
          rotation: -15,
        },
        {
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }
  }, [currentImageIndex]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero__background">
        {images.map((img, index) => (
          <div
            key={index}
            ref={(el) => (bgImagesRef.current[index] = el)}
            className={`hero__bg-image ${index === currentImageIndex ? 'active' : ''}`}
          >
            <img src={img} alt="" />
          </div>
        ))}
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__content container">
        <span className="hero__eyebrow">Full-Stack & AI Software Engineer</span>
        
        <h1 className="hero__title">
          Hi, I'm <span className="text-gradient">Nitin Katkam</span>
        </h1>
        
        <p className="hero__subtitle">
          Building <span className="highlight">playful web apps</span> with big ideas & cartoon energy.
        </p>
        
        <p className="hero__description">
          Full-stack developer crafting fast, friendly digital experiences packed with creativity, 
          smooth animations, and high performance.
        </p>
        
        <div className="hero__buttons">
          <button 
            onClick={() => scrollToSection('work')} 
            className="btn btn-primary"
          >
            Explore Projects <span>↘</span>
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="btn btn-outline"
          >
            Let's Chat <span>💬</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroModern;
