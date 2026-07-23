import React, { useState, useEffect } from 'react';
import { OGGY_GIFS } from '../assets/oggyGifs';

const gifList = [
  OGGY_GIFS.happyFun,
  OGGY_GIFS.happyWork,
  OGGY_GIFS.funLove,
  OGGY_GIFS.happyFootball,
  OGGY_GIFS.neverEndingWash,
  OGGY_GIFS.tiredFriday,
  OGGY_GIFS.helpMe,
  OGGY_GIFS.laughLol,
  OGGY_GIFS.scaryMovie,
  OGGY_GIFS.madExplosion,
  OGGY_GIFS.goodNight,
];

const BackgroundCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % gifList.length);
    }, 4000); // Change GIF every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-carousel" aria-hidden="true">
      {gifList.map((gif, index) => (
        <div
          key={index}
          className={`bg-carousel__slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url("${gif.src}")` }}
        />
      ))}

      {/* Dark overlay & vignette for ultimate text readability */}
      <div className="bg-carousel__overlay" />
      <div className="bg-carousel__vignette" />

      {/* Scurrying Cockroaches Animation Layer */}
      <div className="oggy-bg__roach oggy-bg__roach--1" title="Joey" />
      <div className="oggy-bg__roach oggy-bg__roach--2" title="Dee Dee" />
      <div className="oggy-bg__roach oggy-bg__roach--3" title="Marky" />
      <div className="oggy-bg__dust" />
    </div>
  );
};

export default BackgroundCarousel;
