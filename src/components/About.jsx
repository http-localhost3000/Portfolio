import React from 'react';

const About = () => {
    const stack = [
        { name: "C (Programming Language)", level: "Core", icon: "⚡" },
        { name: "C++", level: "High Performance", icon: "🚀" },
        { name: "Python", level: "ML & OpenCV", icon: "🐍" },
        { name: "JavaScript", level: "Full-Stack", icon: "✨" },
        { name: "Tkinter", level: "GUI Apps", icon: "🖼️" },
        { name: "Mediapipe", level: "Vision AI", icon: "👁️" },
        { name: "Supabase", level: "Backend & Auth", icon: "🔥" },
        { name: "Vercel", level: "Cloud Deployment", icon: "☁️" },
    ];

    return (
        <>
            <section id="about" className="container about-section">
                <h2 className="section-title reveal">
                    About <span className="gold-text">Me</span>
                </h2>

                <div className="about-card reveal">
                    <div className="window-bar" aria-hidden="true">
                        <span className="window-dot window-dot--pink" />
                        <span className="window-dot window-dot--yellow" />
                        <span className="window-dot window-dot--blue" />
                        <span className="window-bar__title">nitin_bio.md</span>
                    </div>

                    <div className="about-card__content">
                        <div className="about-card__text-block">
                            <h3 className="about-card__heading">Passionate Developer & Creative Problem Solver 🐱🪳</h3>
                            <p className="about-card__text">
                                I'm Nitin Katkam, a full-stack developer dedicated to crafting robust, high-performance web applications and intelligent computer vision systems. Inspired by the playful energy of cartoons, I bring enthusiasm, clean code, and fast problem solving to every project I build!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="stack" className="container">
                <h2 className="section-title reveal">
                    The <span className="gold-text">Tech Stack</span>
                </h2>
                <div className="stack-grid">
                    {stack.map((item, i) => (
                        <div key={i} className={`stack-badge reveal stagger-${(i % 4) + 1}`}>
                            <span className="stack-badge__icon">{item.icon}</span>
                            <span className="stack-badge__name">{item.name}</span>
                            <span className="stack-badge__level">{item.level}</span>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default About;
