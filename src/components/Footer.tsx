import React, { useState, useEffect, useRef } from 'react';
import {
  Instagram,
  Facebook,
  MessageCircle,
  MapPin,
  X,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

/**
 * Pixel-Accurate Notched Folder-Tab FOOTER
 *
 * SPECIFICATION ADHERENCE:
 * - Overall shape: Notched folder-tab silhouette with concave fillet (radius 24px).
 * - Exact measurements: 1240px container, top-right panel (225px h), bottom panel (335px h).
 * - Top-left notch: 225x225px revealing page-bg with solid blob logo mark.
 * - Decorative ring behind footer: ~330x210px in --ring-fill, ~60% peeking out.
 * - Palette tokens: Jangid olive (#566B4B) default + Cobalt blue set toggle.
 * - 4 Link columns with arrow icons, 4 social icons top-right.
 * - 54px 3-line headline ("A peaceful stay / just 400 m from / Goga Ji Temple").
 * - CTA Button: 170x70px, radius 20px, hover cream.
 * - 1px divider, copyright + SVG barcode on left, uppercase 3-line address on right.
 * - Staggered scroll animations & fully responsive (desktop, tablet, mobile).
 */

export default function Footer() {
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [palette, setPalette] = useState<'jangid' | 'blue'>('jangid');
  const [isInView, setIsInView] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  // Palette color definitions
  const colors = palette === 'jangid'
    ? {
        pageBg: '#FDF6EA',
        footerBg: '#566B4B',
        headingTint: '#B9CDA8',
        footerText: '#FFFFFF',
        btnBg: '#FFFFFF',
        btnText: '#566B4B',
        ringFill: '#E8E1D2',
        ringStroke: '#D8D0C0',
      }
    : {
        pageBg: '#F4F4FA',
        footerBg: '#1A14B3',
        headingTint: '#7C8DFF',
        footerText: '#FFFFFF',
        btnBg: '#FFFFFF',
        btnText: '#1A14B3',
        ringFill: '#DDDDEA',
        ringStroke: '#C7C7D8',
      };

  // IntersectionObserver for lightweight entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        backgroundColor: colors.pageBg,
        width: '100%',
        minHeight: '100%',
        boxSizing: 'border-box',
        padding: '120px 16px 40px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '"Plus Jakarta Sans", "Inter Tight", -apple-system, BlinkMacSystemFont, sans-serif',
        transition: 'background-color 0.4s ease',
      }}
    >
      {/* SCOPED CSS FOR TRANSITIONS, HOVERS, AND MASKS */}
      <style>{`
        .footer-link-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #FFFFFF;
          font-size: 13.5px;
          line-height: 1;
          text-decoration: none;
          transition: transform 0.2s ease, text-decoration 0.2s ease, opacity 0.2s ease;
        }
        .footer-link-item:hover {
          text-decoration: underline;
        }
        .footer-link-item .arrow-icon {
          font-size: 12px;
          display: inline-block;
          transition: transform 0.2s ease;
        }
        .footer-link-item:hover .arrow-icon {
          transform: translateX(4px);
        }
        .cta-btn-hover {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, box-shadow 0.25s ease;
        }
        .cta-btn-hover:hover {
          background-color: #FDF6EA !important;
          transform: scale(1.03);
          box-shadow: 0 12px 28px rgba(0,0,0,0.18);
        }
        .social-icon-btn {
          color: #FFFFFF;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .social-icon-btn:hover {
          opacity: 0.8;
          transform: translateY(-2px);
        }
        .wordmark-wrapper {
          width: 100%;
          overflow: hidden;
          margin-top: 24px;
          margin-bottom: 0;
          padding-bottom: 8px;
          line-height: 0.8;
          text-align: center;
          white-space: nowrap;
          user-select: none;
          pointer-events: none;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          font-family: "Playfair Display", "DM Serif Display", "Instrument Serif", Georgia, serif;
          font-weight: 400;
          letter-spacing: -0.02em;
        }
        .wordmark-letter {
          display: inline-block;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.28) 0%,
            rgba(255, 255, 255, 0.14) 45%,
            rgba(255, 255, 255, 0.00) 95%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          text-shadow: none;
          box-shadow: none;
        }
        @media (max-width: 767px) {
          .desktop-only { display: none !important; }
        }
        @media (min-width: 768px) {
          .mobile-only { display: none !important; }
        }
      `}</style>

      {/* 5. DECORATIVE RING (BEHIND FOOTER) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30px',
          left: '46%',
          transform: isInView
            ? 'translate(-50%, 0)'
            : 'translate(-50%, -20px)',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: isInView ? 1 : 0,
          transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease',
        }}
      >
        <svg
          width="330"
          height="210"
          viewBox="0 0 330 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer flat rounded ring */}
          <rect
            x="2"
            y="2"
            width="326"
            height="206"
            rx="96"
            fill={colors.ringFill}
            stroke={colors.ringStroke}
            strokeWidth="1.5"
          />
          {/* Inner cutout hole */}
          <rect
            x="95"
            y="55"
            width="140"
            height="100"
            rx="46"
            fill={colors.pageBg}
            stroke={colors.ringStroke}
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* THEME COLOR TOGGLE (Discrete reference picker: Jangid Olive vs Reference Blue) */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          maxWidth: '1240px',
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '10px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(0,0,0,0.04)',
            padding: '4px 8px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#666',
          }}
        >
          <span>Theme:</span>
          <button
            type="button"
            onClick={() => setPalette('jangid')}
            style={{
              border: 'none',
              padding: '3px 8px',
              borderRadius: '999px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 600,
              backgroundColor: palette === 'jangid' ? '#566B4B' : 'transparent',
              color: palette === 'jangid' ? '#FFF' : '#666',
              transition: 'all 0.2s ease',
            }}
          >
            Jangid Olive
          </button>
          <button
            type="button"
            onClick={() => setPalette('blue')}
            style={{
              border: 'none',
              padding: '3px 8px',
              borderRadius: '999px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 600,
              backgroundColor: palette === 'blue' ? '#1A14B3' : 'transparent',
              color: palette === 'blue' ? '#FFF' : '#666',
              transition: 'all 0.2s ease',
            }}
          >
            Reference Blue
          </button>
        </div>
      </div>

      {/* ==================== 2. MAIN FOOTER SILHOUETTE CONTAINER ==================== */}
      <footer
        id="contact"
        ref={footerRef}
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1240px',
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* ============================================================== */}
        {/* DESKTOP & TABLET VIEW (>= 768px)                                */}
        {/* ============================================================== */}
        <div className="desktop-only" style={{ width: '100%', position: 'relative' }}>
          
          {/* TOP SECTION: NOTCH (LEFT 225px) + TOP-RIGHT PANEL (REST) */}
          <div style={{ display: 'flex', width: '100%', height: '225px', position: 'relative' }}>
            
            {/* NOTCH CUT-OUT (225 x 225px) containing LOGO MARK in footer-bg */}
            <div
              style={{
                width: '225px',
                height: '225px',
                flexShrink: 0,
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                paddingTop: '6px',
                paddingLeft: '6px',
                backgroundColor: 'transparent',
              }}
            >
              {/* LOGO MARK: bold rounded blob mark made of 2 solid shapes (180x180) */}
              <div
                style={{
                  width: '180px',
                  height: '180px',
                  position: 'relative',
                }}
              >
                <svg
                  width="180"
                  height="180"
                  viewBox="0 0 180 180"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Shape 1: Tall rounded rectangle on left with big top-right radius */}
                  <path
                    d="M 38 0 H 68 Q 115 0 115 48 V 140 Q 115 178 77 178 H 38 Q 0 178 0 140 V 38 Q 0 0 38 0 Z"
                    fill={colors.footerBg}
                  />
                  {/* Shape 2: Solid circle at bottom-right (diameter ~82px) with small page-bg gap */}
                  <circle cx="138" cy="137" r="41" fill={colors.footerBg} />

                  {/* Inner subtle stylized J contour in page-bg */}
                  <path
                    d="M 68 45 V 110 Q 68 135 48 135 Q 32 135 32 120"
                    stroke={colors.pageBg}
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* CONCAVE FILLET (24px radius) at the inner notch corner */}
              {/* Sits at the bottom-right of the notch, connecting the vertical notch wall with the horizontal bottom panel edge */}
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  width: '24px',
                  height: '24px',
                  pointerEvents: 'none',
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ display: 'block' }}
                >
                  <path
                    d="M 24 0 L 24 24 L 0 24 A 24 24 0 0 0 24 0 Z"
                    fill={colors.footerBg}
                  />
                </svg>
              </div>
            </div>

            {/* ==================== 3. TOP-RIGHT PANEL ==================== */}
            <div
              style={{
                flex: 1,
                height: '225px',
                backgroundColor: colors.footerBg,
                borderTopLeftRadius: '28px',
                borderTopRightRadius: '28px',
                padding: '46px 56px 20px 56px',
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              {/* LEFT: 4 Link Columns (Explore, Rooms, Nearby, Legal) */}
              <div style={{ display: 'flex', gap: '58px', alignItems: 'flex-start' }}>
                
                {/* Column 1: Explore */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      color: colors.headingTint,
                      marginBottom: '20px',
                    }}
                  >
                    Explore
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <a href="#hero" className="footer-link-item">
                      <span className="arrow-icon">→</span>
                      <span>Home</span>
                    </a>
                    <a href="#rooms" className="footer-link-item">
                      <span className="arrow-icon">→</span>
                      <span>Rooms</span>
                    </a>
                    <a href="#about" className="footer-link-item">
                      <span className="arrow-icon">→</span>
                      <span>About Us</span>
                    </a>
                    <a href="#contact" className="footer-link-item">
                      <span className="arrow-icon">→</span>
                      <span>Contact</span>
                    </a>
                  </div>
                </div>

                {/* Column 2: Rooms */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      color: colors.headingTint,
                      marginBottom: '20px',
                    }}
                  >
                    Rooms
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <a href="#rooms" className="footer-link-item">
                      <span className="arrow-icon">→</span>
                      <span>AC Room</span>
                    </a>
                    <a href="#rooms" className="footer-link-item">
                      <span className="arrow-icon">→</span>
                      <span>Non-AC Room</span>
                    </a>
                    <a href="#book" className="footer-link-item">
                      <span className="arrow-icon">→</span>
                      <span>Book Now</span>
                    </a>
                  </div>
                </div>

                {/* Column 3: Nearby */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      color: colors.headingTint,
                      marginBottom: '20px',
                    }}
                  >
                    Nearby
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <a href="#amenities" className="footer-link-item">
                      <span className="arrow-icon">→</span>
                      <span>Goga Ji Temple</span>
                    </a>
                    <a href="#amenities" className="footer-link-item">
                      <span className="arrow-icon">→</span>
                      <span>Railway Station</span>
                    </a>
                    <a href="#location" className="footer-link-item">
                      <span className="arrow-icon">→</span>
                      <span>How to Reach</span>
                    </a>
                  </div>
                </div>

                {/* Column 4: Legal */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      color: colors.headingTint,
                      marginBottom: '20px',
                    }}
                  >
                    Legal
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <button
                      type="button"
                      onClick={() => setModalContent('privacy')}
                      className="footer-link-item"
                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                      <span className="arrow-icon">→</span>
                      <span>Privacy Policy</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalContent('terms')}
                      className="footer-link-item"
                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                      <span className="arrow-icon">→</span>
                      <span>Terms & Conditions</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalContent('refund')}
                      className="footer-link-item"
                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                      <span className="arrow-icon">→</span>
                      <span>Refund Policy</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* RIGHT: 4 Small Social Icons (Instagram, Facebook, WhatsApp, Maps) */}
              <div style={{ display: 'flex', gap: '26px', alignItems: 'center', paddingTop: '2px' }}>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://wa.me/919414487691?text=Hello%20Vijay%20ji,%20I%20want%20to%20inquire%20about%20room%20availability%20at%20Hotel%20Jangid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href={HOTEL_INFO.mapUrl || 'https://maps.google.com/?q=Hotel+Jangid+Gogamedi'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="Google Maps"
                >
                  <MapPin size={18} />
                </a>
              </div>

            </div>
          </div>

          {/* ==================== 4. BOTTOM PANEL ==================== */}
          <div
            style={{
              width: '100%',
              minHeight: '335px',
              height: 'auto',
              backgroundColor: colors.footerBg,
              borderTopLeftRadius: '28px',
              borderBottomLeftRadius: '28px',
              borderBottomRightRadius: '28px',
              overflow: 'hidden',
              padding: '44px 56px 16px 56px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              marginTop: '-1px', // Seamless junction with top-right panel
            }}
          >
            {/* CTA ROW */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingTop: '20px',
              }}
            >

              {/* CTA BUTTON (170 x 70px, radius 20px, text: Book Your Stay) */}
              <a
                href="#book"
                className="cta-btn-hover"
                style={{
                  width: '170px',
                  height: '70px',
                  borderRadius: '20px',
                  backgroundColor: colors.btnBg,
                  color: colors.btnText,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                Book Your Stay
              </a>
            </div>

            {/* DIVIDER LINE (1px line, rgba(255,255,255,0.45)) */}
            <div
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.45)',
                margin: '24px 0 16px 0',
              }}
            />

            {/* BOTTOM ROW (below divider): Copyright & Barcode on left, Uppercase Address on right */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                width: '100%',
              }}
            >
              {/* LEFT: Copyright + Barcode */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.85)',
                    letterSpacing: '0.2px',
                  }}
                >
                  © 2026 Hotel Jangid, Gogamedi
                </span>

                {/* DECORATIVE BARCODE STRIP (SVG ~110 x 14px) */}
                <svg
                  width="110"
                  height="14"
                  viewBox="0 0 110 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ opacity: 0.85 }}
                >
                  <rect x="0" y="0" width="2" height="14" fill="#FFFFFF" />
                  <rect x="4" y="0" width="1" height="14" fill="#FFFFFF" />
                  <rect x="7" y="0" width="3" height="14" fill="#FFFFFF" />
                  <rect x="12" y="0" width="1" height="14" fill="#FFFFFF" />
                  <rect x="15" y="0" width="2" height="14" fill="#FFFFFF" />
                  <rect x="19" y="0" width="4" height="14" fill="#FFFFFF" />
                  <rect x="25" y="0" width="1" height="14" fill="#FFFFFF" />
                  <rect x="28" y="0" width="2" height="14" fill="#FFFFFF" />
                  <rect x="32" y="0" width="1" height="14" fill="#FFFFFF" />
                  <rect x="35" y="0" width="3" height="14" fill="#FFFFFF" />
                  <rect x="40" y="0" width="2" height="14" fill="#FFFFFF" />
                  <rect x="44" y="0" width="1" height="14" fill="#FFFFFF" />
                  <rect x="47" y="0" width="3" height="14" fill="#FFFFFF" />
                  <rect x="52" y="0" width="2" height="14" fill="#FFFFFF" />
                  <rect x="56" y="0" width="1" height="14" fill="#FFFFFF" />
                  <rect x="59" y="0" width="4" height="14" fill="#FFFFFF" />
                  <rect x="65" y="0" width="2" height="14" fill="#FFFFFF" />
                  <rect x="69" y="0" width="1" height="14" fill="#FFFFFF" />
                  <rect x="72" y="0" width="3" height="14" fill="#FFFFFF" />
                  <rect x="77" y="0" width="2" height="14" fill="#FFFFFF" />
                  <rect x="81" y="0" width="1" height="14" fill="#FFFFFF" />
                  <rect x="84" y="0" width="2" height="14" fill="#FFFFFF" />
                  <rect x="88" y="0" width="1" height="14" fill="#FFFFFF" />
                  <rect x="91" y="0" width="3" height="14" fill="#FFFFFF" />
                  {/* End tiny logo square */}
                  <rect x="98" y="2" width="10" height="10" rx="2" fill="#FFFFFF" />
                  <rect x="101" y="5" width="4" height="4" rx="1" fill={colors.footerBg} />
                </svg>
              </div>

              {/* RIGHT: 3 lines, UPPERCASE, 11px, line-height 1.35, letter-spacing 0.5px */}
              <div
                style={{
                  textAlign: 'right',
                  fontSize: '11px',
                  lineHeight: 1.35,
                  letterSpacing: '0.5px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  textTransform: 'uppercase',
                }}
              >
                <div>+91 94144 87691</div>
                <div>HOTEL JANGID, NEAR GOGA JI TEMPLE</div>
                <div>GOGAMEDI, HANUMANGARH, RAJASTHAN - 335504</div>
              </div>
            </div>

            {/* GIANT FADED BRAND WORDMARK "Jangid" */}
            <div
              aria-hidden="true"
              className="wordmark-wrapper"
              style={{
                fontSize: 'clamp(96px, 23vw, 280px)',
              }}
            >
              {['J', 'a', 'n', 'g', 'i', 'd'].map((letter, idx) => (
                <span
                  key={idx}
                  className="wordmark-letter"
                  style={{
                    transform: isInView ? 'translateY(0)' : 'translateY(60%)',
                    opacity: isInView ? 1 : 0,
                    transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 70}ms, opacity 900ms ease-out ${idx * 70}ms`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>

          </div>

        </div>

        {/* ============================================================== */}
        {/* MOBILE VIEW (< 768px)                                           */}
        {/* ============================================================== */}
        <div
          className="mobile-only"
          style={{
            width: '100%',
            backgroundColor: colors.footerBg,
            borderRadius: '24px',
            overflow: 'hidden',
            padding: '24px 20px 14px 20px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Top Notch Tab: 110x110 with Logo Mark */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: colors.pageBg,
                borderRadius: '18px',
                padding: '10px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 180 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 38 0 H 68 Q 115 0 115 48 V 140 Q 115 178 77 178 H 38 Q 0 178 0 140 V 38 Q 0 0 38 0 Z"
                  fill={colors.footerBg}
                />
                <circle cx="138" cy="137" r="41" fill={colors.footerBg} />
                <path
                  d="M 68 45 V 110 Q 68 135 48 135 Q 32 135 32 120"
                  stroke={colors.pageBg}
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Social Icons row on mobile */}
            <div style={{ display: 'flex', gap: '18px', alignItems: 'center', paddingTop: '8px' }}>
              <a href="https://instagram.com" className="social-icon-btn" title="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" className="social-icon-btn" title="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://wa.me/919414487691" className="social-icon-btn" title="WhatsApp">
                <MessageCircle size={18} />
              </a>
              <a href={HOTEL_INFO.mapUrl || '#'} className="social-icon-btn" title="Maps">
                <MapPin size={18} />
              </a>
            </div>
          </div>

          {/* Link columns (2 per row on mobile) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px 16px',
            }}
          >
            {/* Explore */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: colors.headingTint, marginBottom: '12px' }}>
                Explore
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#hero" className="footer-link-item">→ Home</a>
                <a href="#rooms" className="footer-link-item">→ Rooms</a>
                <a href="#about" className="footer-link-item">→ About Us</a>
                <a href="#contact" className="footer-link-item">→ Contact</a>
              </div>
            </div>

            {/* Rooms */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: colors.headingTint, marginBottom: '12px' }}>
                Rooms
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#rooms" className="footer-link-item">→ AC Room</a>
                <a href="#rooms" className="footer-link-item">→ Non-AC</a>
                <a href="#book" className="footer-link-item">→ Book Now</a>
              </div>
            </div>

            {/* Nearby */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: colors.headingTint, marginBottom: '12px' }}>
                Nearby
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#amenities" className="footer-link-item">→ Goga Ji Temple</a>
                <a href="#amenities" className="footer-link-item">→ Railway Station</a>
                <a href="#location" className="footer-link-item">→ How to Reach</a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: colors.headingTint, marginBottom: '12px' }}>
                Legal
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setModalContent('privacy')}
                  className="footer-link-item"
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  → Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => setModalContent('terms')}
                  className="footer-link-item"
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  → Terms of Stay
                </button>
                <button
                  type="button"
                  onClick={() => setModalContent('refund')}
                  className="footer-link-item"
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  → Refund Policy
                </button>
              </div>
            </div>
          </div>

          {/* CTA Button full width */}
          <a
            href="#book"
            className="cta-btn-hover"
            style={{
              width: '100%',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: colors.btnBg,
              color: colors.btnText,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 600,
            }}
          >
            Book Your Stay
          </a>

          {/* Mobile Divider */}
          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.35)',
              margin: '6px 0',
            }}
          />

          {/* Mobile bottom address & copyright */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.85)' }}>
                © 2026 Hotel Jangid, Gogamedi
              </span>
              <svg
                width="110"
                height="14"
                viewBox="0 0 110 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ opacity: 0.85 }}
              >
                <rect x="0" y="0" width="2" height="14" fill="#FFFFFF" />
                <rect x="4" y="0" width="1" height="14" fill="#FFFFFF" />
                <rect x="7" y="0" width="3" height="14" fill="#FFFFFF" />
                <rect x="12" y="0" width="1" height="14" fill="#FFFFFF" />
                <rect x="15" y="0" width="2" height="14" fill="#FFFFFF" />
                <rect x="19" y="0" width="4" height="14" fill="#FFFFFF" />
                <rect x="25" y="0" width="1" height="14" fill="#FFFFFF" />
                <rect x="28" y="0" width="2" height="14" fill="#FFFFFF" />
                <rect x="32" y="0" width="1" height="14" fill="#FFFFFF" />
                <rect x="35" y="0" width="3" height="14" fill="#FFFFFF" />
                <rect x="40" y="0" width="2" height="14" fill="#FFFFFF" />
                <rect x="44" y="0" width="1" height="14" fill="#FFFFFF" />
                <rect x="47" y="0" width="3" height="14" fill="#FFFFFF" />
                <rect x="52" y="0" width="2" height="14" fill="#FFFFFF" />
                <rect x="56" y="0" width="1" height="14" fill="#FFFFFF" />
                <rect x="59" y="0" width="4" height="14" fill="#FFFFFF" />
                <rect x="65" y="0" width="2" height="14" fill="#FFFFFF" />
                <rect x="69" y="0" width="1" height="14" fill="#FFFFFF" />
                <rect x="72" y="0" width="3" height="14" fill="#FFFFFF" />
                <rect x="77" y="0" width="2" height="14" fill="#FFFFFF" />
                <rect x="81" y="0" width="1" height="14" fill="#FFFFFF" />
                <rect x="84" y="0" width="2" height="14" fill="#FFFFFF" />
                <rect x="88" y="0" width="1" height="14" fill="#FFFFFF" />
                <rect x="91" y="0" width="3" height="14" fill="#FFFFFF" />
                <rect x="98" y="2" width="10" height="10" rx="2" fill="#FFFFFF" />
                <rect x="101" y="5" width="4" height="4" rx="1" fill={colors.footerBg} />
              </svg>
            </div>

            <div
              style={{
                fontSize: '11px',
                lineHeight: 1.4,
                letterSpacing: '0.4px',
                color: 'rgba(255, 255, 255, 0.85)',
                textTransform: 'uppercase',
              }}
            >
              <div>+91 94144 87691</div>
              <div>HOTEL JANGID, NEAR GOGA JI TEMPLE</div>
              <div>GOGAMEDI, HANUMANGARH, RAJASTHAN - 335504</div>
            </div>
          </div>

          {/* GIANT FADED BRAND WORDMARK "Jangid" ON MOBILE */}
          <div
            aria-hidden="true"
            className="wordmark-wrapper"
            style={{
              fontSize: '24vw',
              marginTop: '16px',
              marginBottom: '0',
            }}
          >
            {['J', 'a', 'n', 'g', 'i', 'd'].map((letter, idx) => (
              <span
                key={idx}
                className="wordmark-letter"
                style={{
                  transform: isInView ? 'translateY(0)' : 'translateY(60%)',
                  opacity: isInView ? 1 : 0,
                  transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 70}ms, opacity 900ms ease-out ${idx * 70}ms`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

      </footer>

      {/* RAZORPAY COMPLIANCE MODAL */}
      {modalContent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalContent(null)}
        >
          <div
            className="bg-[#FAF8F5] text-slate-900 max-w-xl w-full max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-amber-200/50 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>

            {modalContent === 'privacy' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="size-4 text-amber-700" />
                  <span>Guest Privacy & Data Protection</span>
                </div>
                <h3 className="font-serif font-bold text-2xl text-slate-950">Privacy Policy</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Jangid Hotel values your privacy. Personal information collected during online booking (Name, Mobile Number, City) is strictly used for room reservations, check-in registration, and direct host-to-guest communication.
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  We never sell or share guest contact details with third parties. All online payments are handled directly by Razorpay with 256-bit SSL encryption. No banking credentials or card details are stored on our servers.
                </p>
              </div>
            )}

            {modalContent === 'terms' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="size-4 text-amber-700" />
                  <span>Standard Booking Terms</span>
                </div>
                <h3 className="font-serif font-bold text-2xl text-slate-950">Terms & Conditions</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 list-disc pl-5">
                  <li>Standard check-in time is 12:00 PM and check-out is 11:00 AM (flexible on advance notice to host).</li>
                  <li>Every adult guest must produce a valid government photo ID (Aadhaar Card, Voter ID, or Driving License) upon arrival.</li>
                  <li>Jangid Hotel is strictly a family & pilgrim rooms-only property. Cooking inside rooms and illegal activities are prohibited.</li>
                  <li>Guests are kindly requested to preserve room cleanliness and hotel property.</li>
                </ul>
              </div>
            )}

            {modalContent === 'refund' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="size-4 text-amber-700" />
                  <span>100% Transparent Policy</span>
                </div>
                <h3 className="font-serif font-bold text-2xl text-slate-950">Cancellation & Refund Policy</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  We recognize that pilgrimage and travel schedules can change unexpectedly:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 list-disc pl-5">
                  <li>Cancellations requested 24 hours prior to check-in are eligible for a 90% refund processed back to the original payment source within 5–7 business days.</li>
                  <li>For cancellations made within 24 hours of check-in, dates can be rescheduled without additional fees by contacting host Vijay Jangid.</li>
                  <li>For immediate support or questions regarding refunds, call +91 94144 87691.</li>
                </ul>
              </div>
            )}

            <div className="pt-6 border-t border-slate-200 mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-6 py-2.5 text-sm font-semibold cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
