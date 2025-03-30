// src/components/ThemeToggle.jsx
import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light', light);
  }, [light]);

  return (
    <div className="theme-toggle" onClick={() => setLight(!light)}>
      {light ? <FaSun /> : <FaMoon />}
      <span>{light ? 'Light Mode' : 'Dark Mode'}</span>
    </div>
  );
}

export default ThemeToggle;
