import React from 'react';

const Hero = () => {
    return (
        <section id="home" className="hero container">
            {/* Cartoon Speech Bubble */}
            <div className="hero__speech-bubble reveal stagger-1">
                <span>
                    "Welcome to Nitin's Animated House of Code! 🐱
                    <img 
                        src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1fab3.svg" 
                        alt="🪳" 
                        style={{ width: '1.2em', height: '1.2em', verticalAlign: '-0.25em', display: 'inline-block', margin: '0 0.05em' }} 
                    />"
                </span>
            </div>

            <div className="hero__eyebrow-wrapper reveal stagger-1">
                <span className="hero__eyebrow">
                    <i /> Full-Stack & AI Software Engineer
                </span>
            </div>

            <span className="hero__name reveal stagger-1">
                Hi, I'm Nitin Katkam <span className="hero__sparkle">✦</span>
            </span>

            <h1 className="hero__heading reveal stagger-2">
                Building <span className="gold-text">playful web apps</span> with big ideas & cartoon energy.
            </h1>

            <p className="hero__sub reveal stagger-3">
                Full-stack developer crafting fast, friendly digital experiences packed with creativity, smooth animations, and high performance.
            </p>

            <div className="hero__buttons reveal stagger-4">
                <a href="#project-grid" className="btn-premium btn-outline" onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('project-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                    Explore Projects <span>↘</span>
                </a>

                <a href="#contact" className="btn-premium btn-solid" onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                    Let's Chat <span>💬</span>
                </a>
            </div>

            {/* Clean Floating Cartoon Doodles */}
            <div className="hero__doodles" aria-hidden="true">
                <span className="doodle doodle--star">✦</span>
                <span className="doodle doodle--smile">☺</span>
                <span className="doodle doodle--cloud">☁️</span>
            </div>
        </section>
    );
};

export default Hero;
