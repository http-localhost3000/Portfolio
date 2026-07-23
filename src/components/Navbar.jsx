import React, { useState, useEffect, useRef } from 'react';

const Navbar = () => {
    const [active, setActive] = useState('home');
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio('/oggy_and_ckroaches.mp3');
        audioRef.current.loop = true;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    const toggleAudio = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch((err) => console.error("Playback failed", err));
        }
    };

    useEffect(() => {
        const sections = ['home', 'project-grid', 'about'];

        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const links = [
        { id: 'home', label: 'Home' },
        { id: 'project-grid', label: 'Work' },
        { id: 'about', label: 'About' },
    ];

    return (
        <nav className="navbar" id="main-nav">
            <a className="navbar__brand" href="#home" aria-label="Nitin Katkam home" onClick={(e) => {
                e.preventDefault();
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            }}>
                <div className="navbar__oggy-container">
                    <img src="/my-oggy.jpg.jpg" alt="Oggy Logo" className="navbar__oggy-logo" />
                    <button
                        className={`navbar__audio-btn ${isPlaying ? 'is-playing' : ''}`}
                        onClick={toggleAudio}
                        aria-label={isPlaying ? "Mute theme song" : "Play theme song"}
                        title={isPlaying ? "Mute theme song" : "Play theme song"}
                    >
                        {isPlaying ? (
                            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="currentColor"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                        ) : (
                            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="currentColor"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>
                        )}
                    </button>
                </div>
                <span className="navbar__brand-text">NK<span>✦</span></span>
            </a>
            {links.map((link) => (
                <a
                    key={link.id}
                    href={`#${link.id}`}
                    className={active === link.id ? 'active' : ''}
                    onClick={(e) => {
                        e.preventDefault();
                        setActive(link.id);
                        document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    {link.label}
                </a>
            ))}
            <a
                href="/Nitin_Katkam_Resume.pdf"
                download
                className="navbar__resume"
                aria-label="Download Resume"
            >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Resume
            </a>
        </nav>
    );
};

export default Navbar;
