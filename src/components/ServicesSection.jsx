import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const servicesRef = useRef(null);

  const services = [
    {
      icon: "⚡",
      title: "Full-Stack Development",
      description: "Building robust web applications with modern frameworks and clean architecture. From database design to responsive frontends.",
      tags: ["JavaScript", "Python", "React", "Next.js", "Node.js"]
    },
    {
      icon: "👁️",
      title: "AI & Computer Vision",
      description: "Creating intelligent systems that see and understand. Leveraging machine learning for real-world visual recognition problems.",
      tags: ["Python", "OpenCV", "Mediapipe", "Machine Learning", "Tkinter"]
    },
    {
      icon: "🔥",
      title: "Cloud & Deployment",
      description: "Deploying scalable applications with modern cloud infrastructure. Real-time databases, authentication, and serverless solutions.",
      tags: ["Supabase", "PostgreSQL", "Vercel", "Firebase"]
    }
  ];

  useEffect(() => {
    const section = servicesRef.current;
    const cards = section.querySelectorAll('.service-card');

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );
    });
  }, []);

  return (
    <section className="services" ref={servicesRef}>
      <div className="container">
        <h2 className="section-title">
          What I <span className="text-gradient">Build</span>
        </h2>

        <div className="services__grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-card__icon">{service.icon}</div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
              <div className="service-card__tags">
                {service.tags.map((tag, i) => (
                  <span key={i} className="service-card__tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
