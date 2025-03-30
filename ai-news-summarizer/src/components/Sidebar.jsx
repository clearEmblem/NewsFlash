import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaGlobe,
  FaBriefcase,
  FaFlask,
  FaBeer,
  FaFootballBall,
  FaLaptop,
  FaHeartbeat,
} from 'react-icons/fa';

function Sidebar() {
  const links = [
    { to: '/news/General', label: 'General', icon: <FaGlobe size={16} /> },
    { to: '/news/Sports', label: 'Sports', icon: <FaFootballBall size={16} /> },
    { to: '/news/Health', label: 'Health', icon: <FaHeartbeat size={16} /> },
    { to: '/news/Science', label: 'Science', icon: <FaFlask size={16} /> },
    { to: '/news/Technology', label: 'Technology', icon: <FaLaptop size={16} /> },
    { to: '/news/Business', label: 'Business', icon: <FaBriefcase size={16} /> },
    { to: '/news/Entertainment', label: 'Entertainment', icon: <FaBeer size={16} /> },
  ];
  

  return (
    <aside className="sidebar">
      <div>
        <NavLink to="/" className="sidebar-logo">
          NewsFlash
        </NavLink>
        <nav>
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive ? 'active-link sidebar-link' : 'sidebar-link'
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
