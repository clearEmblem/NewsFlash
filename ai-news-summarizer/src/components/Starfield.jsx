// src/components/Starfield.jsx
import React, { useEffect, useRef } from 'react';

const Starfield = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const stars = [];
    const numStars = 150;
    const speed = 0.15;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.3,
        glow: Math.random() * 5 + 3
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let star of stars) {
        star.y += speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;

        ctx.shadowBlur = star.glow;
        ctx.shadowColor = 'rgba(59, 130, 246, 0.4)'; // soft blue glow

        ctx.fill();
        ctx.shadowBlur = 0; // reset for next star
      }

      requestAnimationFrame(draw);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -2,
        pointerEvents: 'none',
      }}
    />
  );
};

export default Starfield;
