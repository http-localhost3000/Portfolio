import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PageTransition = () => {
  const transitionRef = useRef(null);

  useEffect(() => {
    const container = transitionRef.current;
    const layers = container.querySelectorAll('.page-transition__layer');

    // Page entrance animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Hide the transition container after animation completes
        container.style.display = 'none';
      }
    });

    tl.fromTo(
      layers,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.inOut',
      }
    ).to(
      layers,
      {
        yPercent: -100,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.inOut',
        delay: 0.2,
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="page-transition" ref={transitionRef}>
      <div className="page-transition__layer"></div>
      <div className="page-transition__layer"></div>
      <div className="page-transition__layer"></div>
    </div>
  );
};

export default PageTransition;
