import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getWhatsAppUrl } from '../data/whatsappMessages';

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/life_after_sixty_tamil',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    label: 'YouTube',
    href: 'https://m.youtube.com/@LifeAfterSixty-Tamil',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
];

const NAV_LINKS = [
  ['Home',         'home'],
  ['Services',     'services'],
  ['Testimonials', 'testimonials'],
  ['Blog',         '/blogs'],
  ['About Us',     '/about'],
  ['Contact Us',   '/contact'],
];

const CONTACT_ITEMS = [
  {
    icon: <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>,
    fill: '#8235d0',
    content: <a href="tel:+919499944939">+91 94999 44939</a>,
  },
  {
    icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.885l6.233-1.633A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.7.97.988-3.607-.234-.37A9.818 9.818 0 1112 21.818z"/>,
    fill: '#8235d0',
    content: <a href={getWhatsAppUrl(location.pathname)} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>,
  },
  {
    icon: <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>,
    fill: '#8235d0',
    content: <a href="mailto:reach@nurahub.com">reach@nurahub.com</a>,
  },
  {
    icon: <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>,
    fill: '#8235d0',
    content: (
      <address>
        Nura AI Labs (Incubated at ITEL),<br />
        Plot No. 22,<br />
        Rajalakshmi Nagar, 3rd Main Road,<br />
        Velachery, Chennai – 600 042,<br />
        Tamil Nadu, India.
      </address>
    ),
  },
];

// Maps footer link keys → actual DOM element IDs used in each section component
const SECTION_ID_MAP = {
  home:         'home',
  services:     'services-cards',   // Services.jsx uses id="services-cards"
  testimonials: 'testimonials',     // Testimonials.jsx uses id="testimonials"
};

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLotteryPage = location.pathname === '/lottery';
  const footerAccent = isLotteryPage ? '#b8956a' : '#8235d0';

  const scrollToSection = (sectionKey) => {
    const targetId = SECTION_ID_MAP[sectionKey];

    const doScroll = () => {
      const el = document.getElementById(targetId);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 76;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    if (location.pathname === '/') {
      // Already on home page - scroll directly
      doScroll();
    } else {
      // On another page - navigate home, then scroll after mount
      sessionStorage.setItem('scrollTo', targetId);
      navigate('/');
    }
  };

  return (
    <footer className="footer">
      <style>{`
        .footer {
          background: #0f0a1f;
          color: rgba(255,255,255,0.8);
          padding: 60px 40px 28px;
          padding-bottom: calc(28px + var(--sb-h, 0px));
          font-family: 'Nunito Sans', sans-serif;
          transition: padding-bottom 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .footer-grid {
          max-width: 1160px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.7fr 0.9fr 1.4fr;
          gap: 48px;
          padding-bottom: 40px;
          align-items: start;
        }

        .footer-heading {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: rgba(255,255,255,0.9);
          margin: 0 0 20px 0;
          display: block;
        }

        /* COL 1 */
        .footer-logo-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .footer-logo-row img {
          height: 42px;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .footer-logo-sep {
          width: 1px;
          height: 24px;
          background: rgba(255,255,255,0.2);
          flex-shrink: 0;
        }
        .footer-tagline {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,0.45);
          margin: 0 0 28px 0;
          max-width: 300px;
        }
        .footer-social {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }
        .social-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          flex-shrink: 0;
          transition: background 0.22s, border-color 0.22s, transform 0.22s;
        }
        .social-icon:hover {
          background: ${footerAccent};
          border-color: ${footerAccent};
          transform: translateY(-3px);
        }
        .social-icon svg {
          width: 14px;
          height: 14px;
          fill: rgba(255,255,255,0.7);
          display: block;
        }
        .social-icon:hover svg { fill: #fff; }

        /* COL 2 */
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .footer-links a,
        .footer-links button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 6px 0;
          text-decoration: none;
          color: rgba(255,255,255,0.5);
          font-size: 14px;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Nunito Sans', sans-serif;
          transition: color 0.2s, transform 0.2s;
        }
        .footer-links a:hover,
        .footer-links button:hover {
          color: #ffffff;
          transform: translateX(4px);
        }

        /* COL 3 */
        .footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .footer-contact-icon {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          margin-top: 2px;
        }
        .footer-contact-item a,
        .footer-contact-item address {
          font-size: 13.5px;
          line-height: 1.65;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-style: normal;
          transition: color 0.2s;
        }
        .footer-contact-item a:hover { color: rgba(255,255,255,0.85); }
        
        /* BOTTOM BAR */
        .footer-bottom {
          max-width: 1160px;
          margin: 0 auto;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.07);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        .footer-bottom p {
          font-size: 12.5px;
          color: rgba(255,255,255,0.28);
          margin: 0;
        }
        .footer-bottom-links {
          display: flex;
          gap: 10px;
          white-space: nowrap;
          flex-wrap: nowrap;
        }

        @media (min-width: 861px) {
          .footer-bottom-links {
            margin-right: 80px;   /* push left slightly */
          }
        }
        .footer-bottom-links a {
          font-size: 12.5px;
          color: rgba(255,255,255,0.38);
          text-decoration: none;
          padding: 3px 8px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .footer-bottom-links a:hover { color: #fff; }

        /* MOBILE */
        @media (max-width: 860px) {
          .footer { padding: 52px 24px 28px; padding-bottom: calc(28px + var(--sb-h, 0px)); }
          .footer-grid { grid-template-columns: 1fr; gap: 36px; }
          .footer-tagline { max-width: 100%; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="footer-grid">

        {/* COL 1 - Brand + Social */}
        <div>
          <div className="footer-logo-row">
            <img src="/logo/60_plus_india.png" alt="60 Plus" />
            <span className="footer-logo-sep" />
            <img src="/logo/ITEL_LOGO.png" alt="ITEL" />
          </div>
          <p className="footer-tagline">
            Helping you care for your parents - even from miles away.
          </p>
          <span className="footer-heading">Follow Us</span>
          <div className="footer-social">
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={s.label}
              >
                <svg viewBox="0 0 24 24"><path d={s.path} /></svg>
              </a>
            ))}
          </div>
        </div>

        {/* COL 2 - Quick Links */}
        <div>
          <span className="footer-heading">Quick Links</span>
          <div className="footer-links">
            {NAV_LINKS.map(([label, href]) =>
              ['home', 'services', 'testimonials'].includes(href) ? (
                <button key={label} onClick={() => scrollToSection(href)}>
                  {label}
                </button>
              ) : (
                <Link key={label} to={href} onClick={() => window.scrollTo(0, 0)}>
                  {label}
                </Link>
              )
            )}
          </div>
        </div>

        {/* COL 3 - Contact */}
        <div>
          <span className="footer-heading">Contact Info</span>
          <div className="footer-contact-list">
            {CONTACT_ITEMS.map((item, i) => (
              <div className="footer-contact-item" key={i}>
                <svg
                  className="footer-contact-icon"
                  viewBox="0 0 24 24"
                  fill={isLotteryPage ? '#b8956a' : item.fill}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {item.icon}
                </svg>
                <div>{item.content}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>© 2026 60Plus India. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="/terms-and-conditions">Terms &amp; Conditions</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;