import React from 'react';

const Projects = () => {
    const projects = [
        {
            title: "BloodLine",
            category: "Mission-Critical Platform",
            description: "A comprehensive central command platform for managing blood donation campaigns and contributors with real-time analytics.",
            tech: ["Next.js 15", "Supabase", "TypeScript", "Tailwind CSS"],
            link: "https://bloodline-web.vercel.app",
            github: "https://github.com/htmlbody/Bloodline",
            image: "/bloodline-ss.png.png",
            badgeText: "Oggy Approved 🐾",
            stampColor: "#ec4899"
        },
        {
            title: "Visionary AI",
            category: "Computer Vision & AI",
            description: "An intelligent sign detection and recognition system leveraging machine learning to interpret visual inputs with high accuracy.",
            tech: ["Python", "OpenCV", "Machine Learning", "Tkinter"],
            link: "https://youtu.be/VWQkuuqOwDc?feature=shared",
            github: "https://github.com/htmlbody/Visionary-AI",
            badgeText: "AI Precision ⚽",
            stampColor: "#3b82f6"
        },
        {
            title: "PageTurn",
            category: "Full-Stack Library System",
            description: "A comprehensive platform for managing book inventory, circulation, and member activities with a real-time analytics dashboard.",
            tech: ["Next.js", "Tailwind CSS", "Supabase", "PostgreSQL"],
            link: "https://pageturn-web.vercel.app/",
            github: "https://github.com/htmlbody/Pageturn-Library-System",
            badgeText: "Clean Code 🧼",
            stampColor: "#10b981"
        }
    ];

    return (
        <section id="work" className="container">
            <div className="section-title-wrapper reveal">
                <h2 className="section-title">
                    Selected <span className="gold-text">Work</span>
                </h2>
            </div>

            <div id="project-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1.8rem', justifyContent: 'center' }}>
                {projects.map((p, i) => {
                    const accentClass = p.title === 'BloodLine' ? 'project-card--neon project-card--gold' :
                        p.title === 'Visionary AI' ? 'project-card--neon project-card--cyan' :
                            p.title === 'PageTurn' ? 'project-card--neon project-card--emerald' : '';

                    return (
                        <div key={i} className={`project-flip reveal stagger-${i + 1}`}>
                            <article className={`project-card ${accentClass}`}>
                                <div className="project-card__top-header">
                                    <div className="project-card__badge">{p.category}</div>
                                </div>

                                <h3 className="project-card__title">{p.title}</h3>
                                <p className="project-card__desc">{p.description}</p>

                                <div className="project-card__tags">
                                    {p.tech.map((t, idx) => (
                                        <span key={idx} className="project-card__tag">{t}</span>
                                    ))}
                                </div>

                                <div className="project-card__actions">
                                    {p.github && (
                                        <a
                                            href={p.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="project-card__icon-btn project-card__github"
                                            aria-label="View GitHub"
                                            title="View GitHub"
                                        >
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                        </a>
                                    )}
                                    <a
                                        href={p.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="project-card__icon-btn project-card__link"
                                        aria-label="View Project"
                                        title="View Project"
                                    >
                                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                    </a>
                                </div>
                            </article>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Projects;
