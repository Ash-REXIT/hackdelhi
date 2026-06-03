import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Instagram, Youtube, ArrowUp, MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <a href="/" className="footer-logo" aria-label="ITEL and 60 Plus">
                <img alt="60 Plus" className="footer-logo-img" src="/logo/60_plus_india.png" />
                <span className="footer-logo-sep"></span>
                <img alt="ITEL" className="footer-logo-img" src="/logo/ITEL_LOGO.png" />
              </a>
              <p className="footer-tagline">
                Helping you care for your parents - even from miles away.
              </p>
              
              <div className="footer-social-wrapper">
                <h4 className="footer-heading footer-heading-social">FOLLOW US</h4>
                <div className="footer-social">
                  <a href="#instagram" aria-label="Instagram" className="social-link">
                    <Instagram size={18} />
                  </a>
                  <a href="#youtube" aria-label="YouTube" className="social-link">
                    <Youtube size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Empty Spacer Column for Alignment (Optional based on screenshot spacing) */}
            <div className="footer-column footer-spacer-col"></div>

            {/* Quick Links Column */}
            <div className="footer-column">
              <h4 className="footer-heading">QUICK LINKS</h4>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info Column */}
            <div className="footer-column footer-contact-col">
              <h4 className="footer-heading">CONTACT INFO</h4>
              <div className="footer-contact">
                <div className="contact-item">
                  <Phone size={16} />
                  <a href="tel:+919499944939">+91 94999 44939</a>
                </div>
                <div className="contact-item">
                  <MessageCircle size={16} />
                  <a href="https://wa.me/919499944939" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
                </div>
                <div className="contact-item">
                  <Mail size={16} />
                  <a href="mailto:reach@nurahub.com">reach@nurahub.com</a>
                </div>
                <div className="contact-item contact-item-address">
                  <MapPin size={16} className="map-pin-icon" />
                  <span>
                    Nura AI Labs (Incubated at ITEL),<br />
                    Plot No. 22,<br />
                    Rajalakshmi Nagar, 3rd Main Road,<br />
                    Velachery, Chennai – 600 042,<br />
                    Tamil Nadu, India.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2026 60Plus India. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="/terms">Terms & Conditions</a>
              <a href="/privacy">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fab-container">
        {isVisible && (
          <button className="fab-button fab-up" onClick={scrollToTop} aria-label="Scroll to top">
            <ArrowUp size={24} />
          </button>
        )}
        <div className="fab-whatsapp-wrapper">
          <span className="fab-tooltip">Talk to our team</span>
          <a 
            href="https://wa.me/919499944939" 
            target="_blank" 
            rel="noreferrer" 
            className="fab-button fab-whatsapp"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;