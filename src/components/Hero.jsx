import React, { useState, useEffect } from 'react';
import {
  Building2,
  ChevronDown,
  Phone,
  ArrowUpRight,
  MapPin,
  Menu,
  X
} from 'lucide-react';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';

/**
 * Pixel-Accurate HERO SECTION matching user specification & reference screenshot.
 *
 * SPECIFICATION ADHERENCE:
 * 1. PAGE + OUTER FRAME:
 *    - Page background: #CFC6BF (warm taupe/grey)
 *    - Container: background #F7F6F4, border-radius 28px, padding 12px, max-width 1440px, centered, min-height 100vh
 *    - Font: Plus Jakarta Sans / Inter for UI text; Playfair Display Italic for the word "Comfort"
 * 2. NAVBAR (inside container, top):
 *    - Height ~56px, flex space-between, vertically centered, no border
 *    - LEFT: building icon + "JANGID HOTEL" (uppercase, 600, 15px, color #111)
 *    - CENTER: "About", "Rooms", "Destinations", "Services" (13px, #333, gap 44px)
 *    - RIGHT: EN pill (36px, #EDECEA), User round button (36px), Bell round button (36px), Black pill "Contact Us" (38px, #111)
 * 3. MAIN BENTO GRID:
 *    - Below navbar, gap 14px, height ~ calc(100vh - 110px) on desktop
 *    - Columns: 1.7fr (left big card) | 1fr (right column)
 *    - 3A. Left Big Hero Card:
 *        Luxury king bed image, bottom 45% dark gradient, 3 frosted glass pills top-left,
 *        white search box card top-right (~190px x 112px, radius 22px),
 *        headline bottom-left ("Your <em>Comfort</em> Outside Home"),
 *        slider dots bottom-right (3 dots, 8px, clickable)
 *    - 3B. Top-Right Image Card:
 *        Bright airy hotel room, bottom 50% gradient, gallery & play icons top-left,
 *        ↗ arrow top-right, "Jangid Hotel" (34px) + "Gogamedi, Rajasthan" bottom-left,
 *        "Directions" link bottom-right
 *    - 3C. Booking Card:
 *        bg #F1F0EE, radius 28px, padding 16px 18px, 3 rows (Check In, Check Out, Guests),
 *        outlined pill button "Book Now" (38px, 1px solid #222)
 *    - 3D. Two Small Image Cards (side by side):
 *        Card 1: A-frame wooden ceiling cozy room, top-right glass arrow, "AC Room - Rs 1200"
 *        Card 2: Minimal room, wooden panels, round window, top-right glass arrow, "Non-AC Room - Rs 1000"
 * 4. INTERACTIONS:
 *    - Load animations: left card fades in + scale 1.04 -> 1, right cards slide up with 80ms stagger, headline mask reveal
 *    - Background slow zoom: scale 1 -> 1.06 over 12s
 *    - Slider auto-advance every 5s with crossfade, clickable dots
 *    - Card hover: image scale 1.05 (600ms), arrow button rotates 45deg
 * 5. RESPONSIVE:
 *    - Desktop: 1.7fr 1fr grid, calc(100vh - 110px)
 *    - Tablet: left card full width (60vh), right column 2-col grid below
 *    - Mobile: single column stack, 24px radius, 12px gap
 */

const TOP_RIGHT_SLIDES = [
  {
    image: '/images/route-map-400m.jpg',
    alt: '400 Meter Walking Route from Hotel Jangid to Shri Goga Mandir',
    subtitle: '400m to Goga Ji Mandir',
  },
  {
    image: '/images/gogamedi-temple.jpg',
    alt: 'Shri Goga Ji Maharaj Mandir, Gogamedi',
    subtitle: 'Gogamedi, Rajasthan',
  },
];

export default function Hero({ onBookClick }) {
  const [topRightSlide, setTopRightSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Real upcoming date format DD - MM - YYYY with dynamic native picker support
  const getTodayIso = () => new Date().toISOString().split('T')[0];
  const getTomorrowIso = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [checkInDate, setCheckInDate] = useState(getTodayIso);
  const [checkOutDate, setCheckOutDate] = useState(getTomorrowIso);
  const [guestsCount, setGuestsCount] = useState('2 Adult(s)');

  const formatDisplayDate = (isoStr) => {
    if (!isoStr) return '';
    const parts = isoStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]} - ${parts[1]} - ${parts[0]}`;
    }
    return isoStr;
  };

  // Auto-advance Top-Right card slides every 4s with smooth crossfade
  useEffect(() => {
    const timer = setInterval(() => {
      setTopRightSlide((prev) => (prev + 1) % TOP_RIGHT_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleBookNow = (roomType = 'ac') => {
    const guestsNum = parseInt(guestsCount, 10) || 2;
    if (onBookClick) {
      onBookClick(roomType, {
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: guestsNum,
      });
    } else {
      const el = document.getElementById('rooms') || document.getElementById('booking');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavScroll = (selector) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#CFC6BF', // Page background: warm taupe/grey
        minHeight: '100vh',
        padding: '16px 12px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, sans-serif',
      }}
    >
      {/* ==================== 1. CONTAINER ==================== */}
      <div
        style={{
          backgroundColor: '#F7F6F4', // Container background
          borderRadius: '28px',
          padding: '12px',
          maxWidth: '1440px',
          width: '100%',
          boxSizing: 'border-box',
          minHeight: 'calc(100vh - 32px)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
          position: 'relative',
        }}
        className="hero-outer-container"
      >
        {/* ==================== 2. NAVBAR (inside container, top) ==================== */}
        <header
          style={{
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 8px 0 12px',
            position: 'relative',
            zIndex: 30,
            border: 'none',
          }}
        >
          {/* LEFT: Logo = small building/cottage icon + text "JANGID HOTEL" */}
          {/* LEFT: Logo = small building/cottage icon + text "JANGID HOTEL" */}
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

          {/* CENTER: Real Site Links (gap 38px) */}
          <nav
            className="hidden md:flex"
            style={{
              alignItems: 'center',
              gap: '38px',
            }}
          >
            {[
              { name: 'About', href: '#hero' },
              { name: 'Rooms', href: '#rooms' },
              { name: 'Amenities', href: '#amenities' },
              { name: 'Gallery & Reviews', href: '#testimonials' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavScroll(link.href);
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
              onClick={() => handleBookNow('ac')}
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
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#DFDDD8';
                e.currentTarget.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#EDECEA';
                e.currentTarget.style.transform = 'scale(1)';
              }}
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
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#DFDDD8';
                e.currentTarget.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#EDECEA';
                e.currentTarget.style.transform = 'scale(1)';
              }}
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
        </header>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '16px',
              marginTop: '8px',
              marginBottom: '12px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              zIndex: 40,
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {[
              { name: 'About Hotel', href: '#hero' },
              { name: 'Rooms & Pricing', href: '#rooms' },
              { name: 'Amenities', href: '#amenities' },
              { name: 'Gallery & Reviews', href: '#testimonials' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavScroll(link.href);
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

            {/* Quick action buttons in mobile dropdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
              <button
                type="button"
                onClick={() => handleBookNow('ac')}
                style={{
                  height: '40px',
                  borderRadius: '999px',
                  backgroundColor: '#EDECEA',
                  color: '#111111',
                  fontWeight: 600,
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Book Now
              </button>
              <a
                href="https://wa.me/919001187776?text=Hello%20Hotel%20Jangid,%20I%20want%20to%20inquire%20about%20room%20booking"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  height: '40px',
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <a
                href="https://www.google.com/travel/hotels/s/37kmAYoQB2s1j5xs6"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  height: '40px',
                  borderRadius: '999px',
                  backgroundColor: '#EDECEA',
                  color: '#111111',
                  fontWeight: 600,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                }}
              >
                <MapPin size={15} />
                <span>Directions</span>
              </a>
              <a
                href="tel:+919001187776"
                style={{
                  height: '40px',
                  borderRadius: '999px',
                  backgroundColor: '#111111',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                }}
              >
                <Phone size={14} fill="#FFFFFF" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        )}

        {/* ==================== 3. MAIN BENTO GRID ==================== */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gap: '14px',
            marginTop: '10px',
            boxSizing: 'border-box',
          }}
          className="bento-grid-layout"
        >
          {/* ---------- 3A. LEFT BIG HERO CARD ---------- */}
          <div
            style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              backgroundColor: '#E5E2DC',
            }}
            className="left-hero-card"
          >
            {/* Hotel Jangid Exterior Building Photo (Responsive: Mobile Vertical vs Desktop Landscape) */}
            <picture style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <source
                media="(max-width: 767px)"
                srcSet="/images/hotel-building-hero-mobile.jpg"
              />
              <img
                src="/images/hotel-building-hero.jpg"
                alt="Hotel Jangid Main Luxury Building in Gogamedi"
                loading="eager"
                fetchPriority="high"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: 'scale(1)',
                  transition: 'transform 0.8s ease-out',
                }}
                className="hero-building-image"
              />
            </picture>

            {/* Dark gradient overlay on bottom for crisp text readability */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 30%, rgba(0,0,0,0.05) 55%, transparent 100%)',
                pointerEvents: 'none',
              }}
              className="hero-gradient-overlay"
            />





            {/* BOTTOM-LEFT: Headline */}
            <div
              style={{
                position: 'absolute',
                left: '20px',
                bottom: '36px',
                zIndex: 20,
                paddingBottom: '16px',
                paddingRight: '16px',
              }}
              className="hero-headline-wrap"
            >
              <h1
                style={{
                  margin: 0,
                  color: '#FFFFFF',
                  fontSize: 'clamp(38px, 4.8vw, 60px)',
                  lineHeight: 1.22,
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  textShadow: '0 2px 14px rgba(0,0,0,0.4)',
                  paddingBottom: '8px',
                }}
                className="hero-headline-text"
              >
                <span>Stay Close to</span>
                <br />
                <em
                  style={{
                    fontFamily: '"Playfair Display", "Instrument Serif", Georgia, serif',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    display: 'inline-block',
                    paddingBottom: '6px',
                    paddingRight: '6px',
                  }}
                >
                  Goga Ji
                </em>
                <span> Temple</span>
              </h1>
            </div>
          </div>

          {/* ---------- RIGHT COLUMN (3B, 3C, 3D) ---------- */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
            className="right-column-container"
          >
            {/* ---------- 3B. TOP-RIGHT IMAGE CARD (Slideshow: 400m Route Map & Temple, ~200px) ---------- */}
            <div
              style={{
                height: '200px',
                position: 'relative',
                borderRadius: '28px',
                overflow: 'hidden',
                backgroundColor: '#D1CCC6',
              }}
              className="group right-card-stagger-1"
            >
              {/* Slideshow: Route Map & Goga Ji Temple with Smooth Crossfade */}
              {TOP_RIGHT_SLIDES.map((slide, idx) => (
                <img
                  key={idx}
                  src={slide.image}
                  alt={slide.alt}
                  loading="eager"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: topRightSlide === idx ? 1 : 0,
                    transform: topRightSlide === idx ? 'scale(1)' : 'scale(1.05)',
                    transition: 'opacity 0.9s ease-in-out, transform 0.9s ease-out',
                  }}
                  className="group-hover:scale-105"
                />
              ))}

              {/* Dark gradient overlay on bottom for clear text readability */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 45%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* TOP-LEFT: 400m to Goga Ji Mandir (No Box) */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '14px',
                  zIndex: 10,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#111111',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  textShadow: '0 1px 2px rgba(255, 255, 255, 0.8), 0 0 6px rgba(255, 255, 255, 0.6)',
                }}
              >
                <MapPin size={14} color="#DC2626" />
                <span>{TOP_RIGHT_SLIDES[topRightSlide].subtitle}</span>
              </div>

              {/* TOP-RIGHT: One small white round icon button (30px) with diagonal arrow (↗) */}
              <a
                href="https://www.google.com/travel/hotels/s/37kmAYoQB2s1j5xs6"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#111111',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  textDecoration: 'none',
                  zIndex: 10,
                  transition: 'transform 0.3s ease',
                }}
                className="group-hover:rotate-45"
                aria-label="View Map Directions"
              >
                <ArrowUpRight size={16} />
              </a>

              {/* Slide dots indicator (2 dots) */}
              <div
                style={{
                  position: 'absolute',
                  right: '84px',
                  bottom: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  zIndex: 10,
                }}
              >
                {TOP_RIGHT_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTopRightSlide(idx)}
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      opacity: topRightSlide === idx ? 1 : 0.45,
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'opacity 0.3s ease',
                    }}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* BOTTOM-RIGHT: Small underlined white text "Directions" (12px) */}
              <a
                href="https://www.google.com/travel/hotels/s/37kmAYoQB2s1j5xs6"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: 'absolute',
                  right: '16px',
                  bottom: '14px',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  textDecoration: 'underline',
                  fontWeight: 500,
                  zIndex: 10,
                  textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                }}
              >
                Directions
              </a>
            </div>

            {/* ---------- 3C. BOOKING CARD (~144px) ---------- */}
            <div
              style={{
                backgroundColor: '#F1F0EE',
                borderRadius: '28px',
                padding: '16px 18px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
              className="right-card-stagger-2"
            >
              {/* Row 1: Check In */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  padding: '2px 4px',
                  borderRadius: '6px',
                  transition: 'background-color 0.15s',
                }}
                className="hover:bg-black/5"
              >
                <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#111111' }}>
                  Check In
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', color: '#555555' }}>{formatDisplayDate(checkInDate)}</span>
                  <ChevronDown size={14} color="#777777" />
                </div>
                <input
                  type="date"
                  value={checkInDate}
                  min={getTodayIso()}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val) return;
                    setCheckInDate(val);
                    if (val >= checkOutDate) {
                      const next = new Date(val);
                      next.setDate(next.getDate() + 1);
                      setCheckOutDate(next.toISOString().split('T')[0]);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                  aria-label="Select Check In date"
                />
              </div>

              {/* Row 2: Check Out */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  padding: '2px 4px',
                  borderRadius: '6px',
                  transition: 'background-color 0.15s',
                }}
                className="hover:bg-black/5"
              >
                <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#111111' }}>
                  Check Out
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', color: '#555555' }}>{formatDisplayDate(checkOutDate)}</span>
                  <ChevronDown size={14} color="#777777" />
                </div>
                <input
                  type="date"
                  value={checkOutDate}
                  min={checkInDate || getTodayIso()}
                  onChange={(e) => {
                    if (e.target.value) setCheckOutDate(e.target.value);
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                  aria-label="Select Check Out date"
                />
              </div>

              {/* Row 3: Guests */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  padding: '2px 4px',
                  borderRadius: '6px',
                  transition: 'background-color 0.15s',
                }}
                className="hover:bg-black/5"
              >
                <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#111111' }}>
                  Guests
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '12.5px', color: '#555555' }}>{guestsCount}</span>
                  <ChevronDown size={14} color="#777777" />
                </div>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                  aria-label="Select number of guests"
                >
                  <option value="1 Adult">1 Adult</option>
                  <option value="2 Adult(s)">2 Adult(s)</option>
                  <option value="3 Adult(s)">3 Adult(s)</option>
                  <option value="4 Adult(s)">4 Adult(s)</option>
                  <option value="5+ Guests">5+ Guests</option>
                </select>
              </div>

              {/* Full-width outlined pill button: "Book Now" (height 38px, 1px solid #222) */}
              <button
                type="button"
                onClick={() => handleBookNow('ac')}
                style={{
                  width: '100%',
                  height: '38px',
                  borderRadius: '999px',
                  border: '1px solid #222222',
                  backgroundColor: '#FFFFFF',
                  color: '#111111',
                  fontSize: '13px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s, color 0.2s',
                  marginTop: '2px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#111111';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#111111';
                }}
              >
                Book Now
              </button>
            </div>

            {/* ---------- 3D. TWO SMALL IMAGE CARDS (side by side, ~118px each) ---------- */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px',
                height: '118px',
              }}
              className="right-card-stagger-3"
            >
              {/* Card 1: AC Room - Rs 1200 (Cozy hotel room with warm wood A-frame / angled wooden ceiling) */}
              <div
                onClick={() => handleBookNow('ac')}
                style={{
                  position: 'relative',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  backgroundColor: '#D1CCC6',
                  cursor: 'pointer',
                }}
                className="group"
              >
                <img
                  src="/images/room-ac-deluxe.jpg"
                  alt="Deluxe AC Room - Rs 1200 - Hotel Jangid"
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease-out',
                  }}
                  className="group-hover:scale-105"
                />
                {/* Bottom dark gradient */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0) 60%)',
                    pointerEvents: 'none',
                  }}
                />
                {/* Top-right frosted glass arrow button (30px, ↗ arrow, frosted white border) */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.40)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.60)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    transition: 'transform 0.3s ease',
                  }}
                  className="group-hover:rotate-45"
                >
                  <ArrowUpRight size={14} />
                </div>
                {/* Bottom-left label: "AC Room - Rs 1200" */}
                <span
                  style={{
                    position: 'absolute',
                    left: '12px',
                    bottom: '10px',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: '#FFFFFF',
                    lineHeight: 1.1,
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  AC Room - Rs 1200
                </span>
              </div>

              {/* Card 2: Non-AC Room - Rs 1000 (Clean minimal room, wooden panels, round window) */}
              <div
                onClick={() => handleBookNow('cooler')}
                style={{
                  position: 'relative',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  backgroundColor: '#D1CCC6',
                  cursor: 'pointer',
                }}
                className="group"
              >
                <img
                  src="/images/room-standard-ac.jpg"
                  alt="Non-AC Room - Rs 1000 - Hotel Jangid"
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease-out',
                  }}
                  className="group-hover:scale-105"
                />
                {/* Bottom dark gradient */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0) 60%)',
                    pointerEvents: 'none',
                  }}
                />
                {/* Top-right frosted glass arrow button (30px, ↗ arrow, frosted white border) */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.40)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.60)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    transition: 'transform 0.3s ease',
                  }}
                  className="group-hover:rotate-45"
                >
                  <ArrowUpRight size={14} />
                </div>
                {/* Bottom-left label: "Non-AC Room - Rs 1000" */}
                <span
                  style={{
                    position: 'absolute',
                    left: '12px',
                    bottom: '10px',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: '#FFFFFF',
                    lineHeight: 1.1,
                    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  Non-AC Room - Rs 1000
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded CSS for exact keyframe animations and responsive layouts */}
      <style>{`
        @keyframes heroCardFadeIn {
          from {
            opacity: 0;
            transform: scale(1.04);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes cardSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes headlineMaskReveal {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .left-hero-card {
          opacity: 0;
          animation: heroCardFadeIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }

        .hero-headline-text {
          opacity: 0;
          animation: headlineMaskReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }

        .right-card-stagger-1 {
          opacity: 0;
          animation: cardSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.08s forwards;
        }

        .right-card-stagger-2 {
          opacity: 0;
          animation: cardSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.16s forwards;
        }

        .right-card-stagger-3 {
          opacity: 0;
          animation: cardSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.24s forwards;
        }

        /* Desktop (>= 1024px) */
        @media (min-width: 1024px) {
          .bento-grid-layout {
            grid-template-columns: 1.7fr 1fr !important;
            height: calc(100vh - 110px) !important;
          }
          .left-hero-card {
            height: 100% !important;
          }
          .right-column-container {
            height: 100% !important;
            justify-content: space-between !important;
          }
        }

        /* Tablet (768px - 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .bento-grid-layout {
            grid-template-columns: 1fr !important;
          }
          .left-hero-card {
            height: 60vh !important;
            min-height: 480px;
          }
          .right-column-container {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 14px !important;
          }
          .right-card-stagger-1 {
            grid-column: 1 / 2;
            height: 220px !important;
          }
          .right-card-stagger-2 {
            grid-column: 2 / 3;
            height: 220px !important;
          }
          .right-card-stagger-3 {
            grid-column: 1 / 3;
            height: 140px !important;
          }
        }

        /* Mobile (< 768px) */
        @media (max-width: 767px) {
          .hero-outer-container {
            border-radius: 24px !important;
            padding: 8px !important;
          }
          .bento-grid-layout {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .left-hero-card {
            height: auto !important;
            min-height: 0 !important;
            aspect-ratio: 5 / 4 !important;
            border-radius: 24px !important;
          }
          .hero-building-image {
            object-fit: cover !important;
            object-position: center 35% !important;
          }
          .hero-search-card {
            top: auto !important;
            bottom: 100px !important;
            right: 12px !important;
            left: 12px !important;
            width: auto !important;
          }
          .hero-headline-wrap {
            bottom: 16px !important;
            left: 16px !important;
          }
          .hero-headline-text {
            font-size: 30px !important;
            line-height: 1.1 !important;
          }
          .right-column-container {
            gap: 12px !important;
          }
          .right-card-stagger-1,
          .right-card-stagger-2 {
            border-radius: 24px !important;
          }
          .right-card-stagger-3 > div {
            border-radius: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
