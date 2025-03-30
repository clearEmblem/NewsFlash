// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaGlobe, FaBusinessTime, FaFlask } from 'react-icons/fa';

function Sidebar() {
  const links = [
    { to: '/', label: 'Home', icon: <FaHome size={16} /> },
    { to: '/politics', label: 'Politics', icon: <FaGlobe size={16} /> },
    { to: '/business', label: 'Business', icon: <FaBusinessTime size={16} /> },
    { to: '/science', label: 'Science', icon: <FaFlask size={16} /> },
  ];

  return (
    <aside className="sidebar">
      <div>
        <h2>NewsFlash</h2>
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
