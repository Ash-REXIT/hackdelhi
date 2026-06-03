import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`nav always-white ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="/" className="nav-logo" aria-label="ITEL and 60 Plus">
            <img alt="60 Plus" className="nav-logo-img" src="/logo/60_plus_india.png" />
            <span className="nav-logo-sep"></span>
            <img alt="ITEL" className="nav-logo-img" src="/logo/ITEL_LOGO.png" />
          </a>
          
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/testimonials">Testimonials</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
          
          <button className="btn-cta nav-cta-desk">Book Free Assessment</button>
          
          <button 
            className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} 
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mob-menu">
          <a href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          <a href="/testimonials" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</a>
          <a href="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</a>
          <a href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</a>
          <button className="mob-sub-btn">Book Free Assessment</button>
        </div>
      )}
    </>
  );
};

export default Navbar;
