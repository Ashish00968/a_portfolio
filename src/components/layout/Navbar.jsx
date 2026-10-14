import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { profile } from '../../data/portfolioData';
import CommandPalette from '../ui/CommandPalette';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Header background subtle blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''} ${mobileOpen ? 'mobile-active' : ''}`}>
      <div className="header-inner container">
        {/* Brand */}
        <Link to="/" className="brand-logo" aria-label="Ashish Nirankari — Home">
          <span className="brand-name">Ashish Nirankari</span>
          <span className="brand-dot"></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            <li>
              <NavLink
                to="/tech-stack"
                className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              >
                Tech Stack
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/travel"
                className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              >
                Travel
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/photography-video"
                className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              >
                Photography & Videography
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <button
            type="button"
            className="nav-command-pill"
            onClick={() => setPaletteOpen(true)}
            aria-label="Open Command Palette (⌘K)"
            title="Open Command Palette (⌘K / Ctrl+K)"
          >
            <span className="command-pill-symbol">⌘K</span>
          </button>

          <NavLink
            to="/tech-stack/discover-himalayan-trails"
            className="nav-flagship-pill"
            aria-label="Discover Himalayan Trails Atlas"
          >
            <span className="telemetry-dot" aria-hidden="true"></span>
            <span>DHT Atlas</span>
          </NavLink>
          <Link to="/contact" className="btn btn-secondary header-contact-btn">
            Contact
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'is-open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="mobile-drawer-content container">
          <div className="mobile-drawer-header">
            <span className="mobile-drawer-label">Index & Navigation</span>
          </div>

          <ul className="mobile-nav-list">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'is-active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="mobile-nav-num">01</span>
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tech-stack"
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'is-active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="mobile-nav-num">02</span>
                <span>Tech Stack</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/travel"
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'is-active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="mobile-nav-num">03</span>
                <span>Travel & Field</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/photography-video"
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'is-active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="mobile-nav-num">04</span>
                <span>Photography & Videography</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'is-active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="mobile-nav-num">05</span>
                <span>About</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'is-active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="mobile-nav-num">06</span>
                <span>Contact</span>
              </NavLink>
            </li>
          </ul>

          <div className="mobile-drawer-footer">
            <button
              type="button"
              className="mobile-command-pill"
              onClick={() => {
                setMobileOpen(false);
                setPaletteOpen(true);
              }}
            >
              <span className="mobile-cmd-left">
                <span className="mobile-cmd-badge">⌘K</span>
                <span>Command Palette</span>
              </span>
              <span className="telemetry-dot" aria-hidden="true"></span>
            </button>

            <a
              href={profile.social.dhtUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-external-pill"
            >
              <span>Discover Himalayan Trails Live</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Spaceship Orbital Command Palette Modal */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
    </header>
  );
};

export default Navbar;
