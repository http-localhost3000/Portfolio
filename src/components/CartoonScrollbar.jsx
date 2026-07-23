import React, { useEffect, useRef } from 'react';

const CartoonScrollbar = () => {
    const trackRef = useRef(null);
    const thumbRef = useRef(null);

    useEffect(() => {
        const update = () => {
            const track = trackRef.current;
            const thumb = thumbRef.current;
            if (!track || !thumb) return;

            const total = document.documentElement.scrollHeight;
            const viewport = window.innerHeight;
            const trackHeight = track.clientHeight;
            const thumbHeight = Math.min(trackHeight, Math.max(24, trackHeight * (viewport / Math.max(total, viewport))));
            const maxTop = Math.max(0, trackHeight - thumbHeight);
            const maxScroll = Math.max(1, total - viewport);
            const top = maxTop * (window.scrollY / maxScroll);

            thumb.style.height = `${thumbHeight}px`;
            thumb.style.transform = `translateY(${top}px)`;
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    const movePage = (amount) => window.scrollBy({ top: amount, behavior: 'smooth' });

    const startDrag = (event) => {
        event.preventDefault();
        const track = trackRef.current;
        const thumb = thumbRef.current;
        if (!track || !thumb) return;

        const startY = event.clientY;
        const startTop = thumb.offsetTop;
        const trackHeight = track.clientHeight;
        const thumbHeight = thumb.clientHeight;
        const maxTop = Math.max(1, trackHeight - thumbHeight);
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

        const move = (moveEvent) => {
            const nextTop = Math.max(0, Math.min(maxTop, startTop + moveEvent.clientY - startY));
            window.scrollTo({ top: (nextTop / maxTop) * maxScroll });
        };
        const stop = () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', stop);
        };

        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', stop, { once: true });
    };

    return (
        <aside className="cartoon-scrollbar" aria-label="Page scrollbar">
            <button className="cartoon-scrollbar__arrow" type="button" aria-label="Scroll up" onClick={() => movePage(-window.innerHeight * 0.8)}>
                <span className="cartoon-scrollbar__triangle cartoon-scrollbar__triangle--up" />
            </button>
            <div className="cartoon-scrollbar__track" ref={trackRef}>
                <div className="cartoon-scrollbar__thumb" ref={thumbRef} onPointerDown={startDrag}>
                    <span /><span /><span />
                </div>
            </div>
            <button className="cartoon-scrollbar__arrow" type="button" aria-label="Scroll down" onClick={() => movePage(window.innerHeight * 0.8)}>
                <span className="cartoon-scrollbar__triangle cartoon-scrollbar__triangle--down" />
            </button>
        </aside>
    );
};

export default CartoonScrollbar;
