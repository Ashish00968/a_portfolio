import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container container">
          <a href="#" className="logo text-neon-blue">
            A<span className="text-neon-orange">.</span>N<span className="text-neon-orange">.</span>
          </a>
          <ul className="nav-links">
            <li><a href="#portfolio">Work</a></li>
            <li><a href="#services">Services</a></li>
          </ul>
          <div className="nav-cta">
            <ThemeToggle />
            <a href="#contact" className="btn btn-outline nav-btn">Hire Me</a>
          </div>
          {/* Mobile: theme toggle + hamburger always visible */}
          <div className="mobile-nav-actions">
            <ThemeToggle />
            <div className="hamburger" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={28} />
            </div>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="close-menu" onClick={() => setMobileMenuOpen(false)}>
          <X size={32} />
        </div>
        <ul className="mobile-links">
          <li><a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Work</a></li>
          <li><a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a></li>
          <li><a href="#contact" className="text-neon-orange" onClick={() => setMobileMenuOpen(false)}>Hire Me</a></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
