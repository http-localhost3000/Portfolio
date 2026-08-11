import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturedWork = () => {
  const workRef = useRef(null);
  const marqueeRef = useRef(null);

  const projects = [
    {
      title: "BloodLine",
      category: "Mission-Critical Platform",
      description: "A comprehensive central command platform for managing blood donation campaigns and contributors with real-time analytics.",
      tech: ["Next.js 15", "Supabase", "TypeScript", "Tailwind CSS"],
      link: "https://bloodline-web.vercel.app",
      github: "https://github.com/htmlbody/Bloodline",
      image: "/bloodline-ss.png.png"
    },
    {
      title: "Visionary AI",
      category: "Computer Vision & AI",
      description: "An intelligent sign detection and recognition system leveraging machine learning to interpret visual inputs with high accuracy.",
      tech: ["Python", "OpenCV", "Machine Learning", "Tkinter"],
      link: "https://youtu.be/VWQkuuqOwDc?feature=shared",
      github: "https://github.com/htmlbody/Visionary-AI",
      image: "/VisionaryAI.jpeg"
    },
    {
      title: "PageTurn",
      category: "Full-Stack Library System",
      description: "A comprehensive platform for managing book inventory, circulation, and member activities with a real-time analytics dashboard.",
      tech: ["Next.js", "Tailwind CSS", "Supabase", "PostgreSQL"],
      link: "https://pageturn-web.vercel.app/",
      github: "https://github.com/htmlbody/Pageturn-Library-System",
      image: "/pageturn.png"
    }
  ];

  useEffect(() => {
    const work = workRef.current;
    const marquee = marqueeRef.current;
    const cards = work.querySelectorAll('.work__card');

    // Horizontal scrolling marquee
    gsap.to(marquee, {
      x: '-25%',
      scrollTrigger: {
        trigger: work,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Animate cards on scroll
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          rotateX: -15,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );
    });
  }, []);

  return (
    <section id="work" className="work" ref={workRef}>
      <div className="container">
        <div className="work__marquee" ref={marqueeRef}>
          SELECTED WORK • SELECTED WORK • SELECTED WORK • SELECTED WORK •
        </div>

        <div className="work__grid">
          {projects.map((project, index) => (
            <article key={index} className="work__card">
              <img 
                src={project.image} 
                alt={project.title} 
                className="work__card-image"
                loading="lazy"
              />
              
              <div className="work__card-overlay">
                <span className="work__card-category">{project.category}</span>
                <h3 className="work__card-title">{project.title}</h3>
                <p className="work__card-description">{project.description}</p>
                
                <div className="work__card-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="work__card-tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="work__card-links">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer"
                      className="work__card-link work__card-link--github"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="work__card-link"
                    aria-label={`View ${project.title} live`}
                  >
                    Live Demo
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
