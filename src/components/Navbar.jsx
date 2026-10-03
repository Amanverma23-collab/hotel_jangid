import React, { useState, useEffect } from 'react';
import { Building2, Phone, MapPin } from 'lucide-react';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';

export default function Navbar({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isPast = window.scrollY > 250;
      setScrolled(isPast);
      if (isPast) setHasScrolled(true);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Rooms', href: '#rooms' },
    { name: 'Gallery & Reviews', href: '#testimonials' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    if (href === '#' || href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNow = () => {
    setMobileMenuOpen(false);
    if (onBookClick) {
      onBookClick('ac');
    } else {
      const el = document.getElementById('rooms') || document.getElementById('booking');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Do not render anything at all on initial page load / refresh
  if (!hasScrolled && !scrolled) {
    return null;
  }

  return (
    <div
      id="floating-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center ${
        scrolled
          ? 'translate-y-0 opacity-100 pointer-events-auto visible'
          : '-translate-y-full opacity-0 pointer-events-none invisible'
      }`}
      style={{
        padding: '12px 12px 0 12px',
        boxSizing: 'border-box',
        visibility: scrolled ? 'visible' : 'hidden',
        display: scrolled ? 'flex' : 'none',
      }}
      aria-hidden={!scrolled}
    >
      <header
        className="pointer-events-auto transition-all"
        style={{
          backgroundColor: 'rgba(247, 246, 244, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '28px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          maxWidth: '1440px',
          width: '100%',
          height: '56px',
          padding: '0 12px 0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
          fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* LEFT: Logo = building icon + text "JANGID HOTEL" */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: '#111111',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#111111',
              flexShrink: 0,
            }}
          >
            <Building2 size={20} strokeWidth={2.2} />
          </div>
          <span
            style={{
              fontWeight: 600,
              letterSpacing: '0.5px',
              fontSize: '15px',
              color: '#111111',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            JANGID HOTEL
          </span>
        </a>

        {/* CENTER: 4 Site Links (gap 38px) */}
        <nav
          className="hidden md:flex"
          style={{
            alignItems: 'center',
            gap: '38px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              style={{
                fontSize: '13.5px',
                color: '#333333',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#000000')}
              onMouseLeave={(e) => (e.target.style.color = '#333333')}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* RIGHT: Site-Specific Actions (Desktop: 4 buttons, Mobile: only Hamburger) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* a) Book Now pill (Desktop only) */}
          <button
            type="button"
            onClick={handleBookNow}
            className="hidden md:inline-flex"
            style={{
              height: '36px',
              backgroundColor: '#EDECEA',
              borderRadius: '999px',
              padding: '0 16px',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: '#111111',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E0DDD9')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#EDECEA')}
          >
            Book Now
          </button>

          {/* b) WhatsApp direct chat circular button (Matches media_1791064302775) */}
          <a
            href="https://wa.me/919001187776?text=Hello%20Hotel%20Jangid,%20I%20want%20to%20inquire%20about%20room%20booking"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#EDECEA',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#111111',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E0DDD9')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#EDECEA')}
            title="Chat on WhatsApp (+91 90011 87776)"
            aria-label="Chat on WhatsApp"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#111111"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              <path
                d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"
                strokeWidth="2.1"
              />
            </svg>
          </a>

          {/* c) Google Maps Directions circular button (Matches media_1791064302775) */}
          <a
            href="https://www.google.com/travel/hotels/s/37kmAYoQB2s1j5xs6"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#EDECEA',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#111111',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E0DDD9')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#EDECEA')}
            title="Google Maps Location & Directions (400m to Temple)"
            aria-label="Google Maps Location"
          >
            <MapPin size={20} strokeWidth={1.9} color="#111111" />
          </a>

          {/* d) Black pill button: Phone + "Call Now" (Desktop only) */}
          <a
            href="tel:+919001187776"
            className="hidden md:inline-flex"
            style={{
              height: '38px',
              backgroundColor: '#111111',
              color: '#FFFFFF',
              borderRadius: '999px',
              padding: '0 20px',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111111')}
            title="Call Hotel Jangid: +91 90011 87776"
          >
            <Phone size={13} fill="#FFFFFF" />
            <span>Call Now</span>
          </a>

          {/* Mobile menu toggle (Clean icon without circle background) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden p-1.5 focus:outline-none focus:ring-0 active:outline-none"
            style={{
              background: 'transparent',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              WebkitTapHighlightColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#111111',
              cursor: 'pointer',
              padding: '6px',
            }}
            aria-label="Toggle navigation menu"
          >
            <MenuToggleIcon open={mobileMenuOpen} className="size-6" duration={400} />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden"
            style={{
              position: 'absolute',
              top: '64px',
              left: '0',
              right: '0',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '16px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.14)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {[
              { name: 'About Hotel', href: '#about' },
              { name: 'Amenities', href: '#amenities' },
              { name: 'Rooms & Pricing', href: '#rooms' },
              { name: 'Gallery & Reviews', href: '#testimonials' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#111111',
                  textDecoration: 'none',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#F7F6F4',
                }}
              >
                {link.name}
              </a>
            ))}

            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button
                type="button"
                onClick={handleBookNow}
                style={{
                  flex: 1,
                  height: '38px',
                  borderRadius: '999px',
                  backgroundColor: '#EDECEA',
                  color: '#111111',
                  fontWeight: 600,
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Book Now
              </button>
              <a
                href="https://wa.me/919001187776"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  height: '38px',
                  borderRadius: '999px',
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                }}
              >
                WhatsApp
              </a>
            </div>

            <a
              href="tel:+919001187776"
              style={{
                width: '100%',
                height: '40px',
                borderRadius: '999px',
                backgroundColor: '#111111',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textDecoration: 'none',
                marginTop: '2px',
              }}
            >
              <Phone size={14} fill="#FFFFFF" />
              <span>Call: +91 90011 87776</span>
            </a>
          </div>
        )}
      </header>
    </div>
  );
}
