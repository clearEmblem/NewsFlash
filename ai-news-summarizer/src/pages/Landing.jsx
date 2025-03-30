import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Starfield from '../components/Starfield';

function Landing() {
  return (
    <div className="landing">
      <Starfield />

      <motion.div
        className="grid-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
      />

      <motion.div
        className="landing-card"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Link to="/" className="landing-logo">NewsFlash</Link>

        {/* ⬇️ Divider line */}
        <div className="landing-divider" />

        <div className="landing-title">
          <span className="landing-typewriter-label">Stay Informed,</span>
          <br />
          <span className="landing-typewriter-line">
            <Typewriter
              words={['Not Overwhelmed.']}
              loop={false}
              typeSpeed={70}
              cursor
              cursorStyle="_"
            />
          </span>
        </div>

        <p className="landing-subtitle">
          We aggregate news from trustworthy sources, summarize it using AI, and serve it up in a clean, unbiased format — daily.
        </p>

        <Link to="/news/General" className="cta-button">
          Explore →
        </Link>
      </motion.div>
    </div>
  );
}

export default Landing;
