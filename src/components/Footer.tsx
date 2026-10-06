import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  MapPin,
  X,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { RetroButton } from '@/components/ui/retro-button';

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
 * - CTA Button: 170x70px, radius 20px, hover cream.
 * - 1px divider, copyright + SVG barcode on left, uppercase 3-line address on right.
 * - Staggered scroll animations & fully responsive (desktop, tablet, mobile).
 * - Sticky curtain reveal effect: footer is stationary beneath preceding page content.
 */

interface FooterProps {
  onBookClick?: (type?: string) => void;
}

export default function Footer({ onBookClick }: FooterProps = {}) {
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [palette, setPalette] = useState<'jangid' | 'blue'>('jangid');
  const [isInView, setIsInView] = useState(false);
  const [footerHeight, setFooterHeight] = useState<number>(720);
  const revealRef = useRef<HTMLDivElement>(null);
  const ftrRef = useRef<HTMLElement>(null);

  const handleBookNow = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onBookClick) {
      onBookClick('ac');
    } else {
      const el = document.getElementById('rooms') || document.getElementById('hero');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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

  // Measure footer height for clip-path sticky reveal (Both desktop & mobile)
  useEffect(() => {
    const ftr = ftrRef.current;
    if (!ftr) return;

    const updateSize = () => {
      if (ftr.offsetHeight > 0) {
        setFooterHeight(ftr.offsetHeight);
      }
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(ftr);

    window.addEventListener('resize', updateSize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateSize);
    }

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  // Listen for external requests to open policy modals (e.g. from Cookie Consent banner)
  useEffect(() => {
    const handlePolicyEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && ['privacy', 'terms', 'refund'].includes(customEvent.detail)) {
        setModalContent(customEvent.detail);
      }
    };
    window.addEventListener('open-hotel-policy', handlePolicyEvent);
    return () => window.removeEventListener('open-hotel-policy', handlePolicyEvent);
  }, []);

  // IntersectionObserver for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.05 }
    );

    if (revealRef.current) {
      observer.observe(revealRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative w-full ftr-reveal"
      id="ftrReveal"
      ref={revealRef}
      style={{
        height: footerHeight ? `${footerHeight}px` : undefined,
        clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)',
        zIndex: 1,
      }}
    >
      <div
        className="fixed bottom-0 left-0 right-0 w-full"
        style={{
          height: footerHeight ? `${footerHeight}px` : undefined,
          zIndex: 1,
        }}
      >
        <div
          className="sticky h-full w-full"
          style={{
            top: footerHeight ? `calc(100vh - ${footerHeight}px)` : undefined,
          }}
        >
          <footer
            className="ftr"
            id="ftr"
            ref={ftrRef}
            style={{
              '--page-bg': colors.pageBg,
              '--footer-bg': colors.footerBg,
              '--heading-tint': colors.headingTint,
              '--btn-bg': colors.btnBg,
              '--btn-text': colors.btnText,
              backgroundColor: colors.pageBg,
            } as React.CSSProperties}
          >
        {/* SCOPED CSS FOR REVEAL, HOVERS, AND GEOMETRY */}
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
        .social-icon-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #FFFFFF;
          color: #111111;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          transition: background-color 0.2s ease, opacity 0.2s ease;
        }
        .social-icon-btn:hover {
          background-color: #FDF6EA;
          color: #111111;
        }

        .wordmark-wrap,
        .wordmark-wrapper {
          width: 100%;
          overflow: visible;
          margin-top: 24px;
          margin-bottom: 0;
          padding-bottom: 0.04em;
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
          font-size: min(23vw, 46vh);
        }
        .wordmark,
        .wordmark-letter {
          --lift: 0.08em;                 /* raise the wordmark slightly; tune 0.04em - 0.12em */
          font-size: min(23vw, 46vh);
          display: inline-block;
          line-height: 0.8;
          letter-spacing: -0.02em;
          text-align: center;
          white-space: nowrap;

          padding-bottom: 0.26em;         /* NEW: room for the J and g descenders */
          margin-bottom: calc(-0.26em + var(--lift));   /* cancels the padding, then lifts */
          overflow: visible;

          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.28) 0em,       /* top of letters (d, i dot, J serif) */
            rgba(255, 255, 255, 0.14) 0.36em,    /* middle of the letters */
            rgba(255, 255, 255, 0.03) 0.76em,    /* baseline: almost gone, like the original */
            rgba(255, 255, 255, 0.03) 1.07em     /* J curve and g tail: very faint but visible */
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          text-shadow: none;
          box-shadow: none;
        }

        /* ==================== 1. STRUCTURE & VARIABLES ==================== */
        .ftr-reveal {
          position: relative;
          z-index: 1;
          background: var(--page-bg);
        }

        .ftr {
          --page-bg: #FDF6EA;
          --footer-bg: #566B4B;
          --nw: 225px;   /* notch width  (desktop) */
          --nh: 225px;   /* notch height (desktop) */
          --r:  28px;    /* corner radius (desktop) */
          background: var(--page-bg);
          width: 100%;
          box-sizing: border-box;
          padding: 70px 16px 0 16px;
          padding-bottom: 0 !important;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
          font-family: "Plus Jakarta Sans", "Inter Tight", -apple-system, BlinkMacSystemFont, sans-serif;
          transition: background-color 0.4s ease;
        }
        @media (max-width: 767px) {
          .ftr {
            --nw: 112px;
            --nh: 112px;
            --r:  20px;
            padding: 32px 12px 0 12px !important;
            padding-bottom: 0 !important;
          }
        }

        .ftr-card {
          width: 100%;
          max-width: 1240px;
          position: relative;
          z-index: 10;
        }

        .ftr-head {
          display: flex;
          align-items: stretch;
          width: 100%;
        }

        /* the cut-out (shows page background) */
        .ftr-notch {
          width: var(--nw, 225px);
          height: var(--nh, 225px);
          max-width: var(--nw, 225px);
          max-height: var(--nh, 225px);
          flex: 0 0 var(--nw, 225px);
          background: transparent;
          position: relative;
        }
        /* logo mark inside the notch: ~80% of notch width, near the top-left */
        .ftr-notch svg {
          width: 80%;
          max-width: 180px;
          height: auto;
          margin: 4% 0 0 4%;
          display: block;
        }

        /* top panel, to the right of the notch */
        .ftr-top {
          flex: 1;
          min-height: var(--nh);
          background: var(--footer-bg);
          border-radius: var(--r) var(--r) 0 0;        /* rounded top-left + top-right */
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-block: clamp(24px, 4vh, 48px);
          padding-inline: 56px;
          box-sizing: border-box;
        }
        /* concave inner corner where the notch meets the bottom panel */
        .ftr-top::before {
          content: "";
          position: absolute;
          right: 100%;
          bottom: 0;
          width: var(--r);
          height: var(--r);
          background: radial-gradient(
            circle at 0 0,
            transparent calc(var(--r) - 0.5px),
            var(--footer-bg) var(--r)
          );
          pointer-events: none;
        }

        .ftr-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          flex-shrink: 0;
        }
        .ftr-social,
        .ftr-socials {
          display: flex;
          gap: 14px;
          align-items: center;
          padding-top: 2px;
        }
        .ftr-cta {
          margin-top: 48px;                  /* space between the icons and the button */
          height: 60px;
          padding: 0 36px;
          border-radius: 18px;
          background: #FFFFFF;
          color: #566B4B;
          font-size: 16px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, box-shadow 0.25s ease;
        }
        .ftr-cta:hover {
          background: #FDF6EA;
          transform: scale(1.03);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
        }

        /* bottom panel, full width, sits directly under the head */
        .ftr-bottom {
          background: var(--footer-bg);
          border-radius: var(--r) 0 0 0;                /* top-left convex, bottom flush with screen */
          margin-top: -1px;                             /* hides any hairline seam */
          position: relative;
          overflow: hidden;
          padding: 0 56px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }
        .ftr-bottom .wordmark-wrap {
          padding-bottom: 0.04em;
        }

        .ftr-links,
        .ftr-top-links {
          display: flex;
          gap: 58px;
          align-items: flex-start;
        }
        .ftr-col {
          display: flex;
          flex-direction: column;
        }
        .ftr-col-heading {
          font-size: 15px;
          font-weight: 500;
          color: var(--heading-tint, #B9CDA8);
          margin-bottom: 20px;
        }
        .ftr-col-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ftr-mobile-links {
          display: none;
        }
        .ftr-mobile-cta-wrap {
          display: none;
        }

        .ftr-divider-wrap {
          width: 100%;
        }
        .ftr-divider {
          width: 100%;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.45);
          margin-top: clamp(24px, 5vh, 48px);
          margin-bottom: 16px;
        }

        .ftr-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
        }
        .ftr-bottom-address {
          text-align: right;
          font-size: 11px;
          line-height: 1.35;
          letter-spacing: 0.5px;
          color: rgba(255, 255, 255, 0.85);
          text-transform: uppercase;
        }

        /* Mobile adjustments (< 768px) */
        @media (max-width: 767px) {
          .ftr-top {
            height: var(--nh);
            min-height: var(--nh);
            padding: 0 20px !important;
            padding-block: 0 !important;
            justify-content: flex-end;
            align-items: center;
          }
          .ftr-links,
          .ftr-top-links {
            display: none !important;
          }
          .ftr-right {
            height: 100%;
            justify-content: center;
            align-items: flex-end;
          }
          .ftr-right button,
          .ftr-top .ftr-cta {
            display: none !important;
          }
          .social-icon-btn {
            width: 38px;
            height: 38px;
          }
          .ftr-social,
          .ftr-socials {
            gap: 10px;
            padding-top: 0;
          }
          .ftr-bottom {
            padding: 0 0 0 0 !important;
            min-height: auto;
          }
          .ftr-mobile-links {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 28px 20px;
            padding: 28px 24px 0 24px;
            box-sizing: border-box;
          }
          .ftr-mobile-links .ftr-col-heading {
            margin-bottom: 12px;
          }
          .ftr-mobile-links .ftr-col-list {
            gap: 12px;
          }
          .ftr-mobile-cta-wrap {
            display: block !important;
            width: 100%;
            padding: 0 24px;
            box-sizing: border-box;
          }
          .ftr-mobile-cta {
            display: flex !important;
            width: 100%;
            height: 56px;
            border-radius: 18px;
            background: #FFFFFF;
            color: #566B4B;
            font-size: 16px;
            font-weight: 600;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            margin-top: 28px;
            box-sizing: border-box;
            transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease;
          }
          .ftr-mobile-cta:hover,
          .ftr-mobile-cta:active {
            background: #FDF6EA;
            transform: scale(1.02);
          }
          .ftr-divider-wrap {
            padding: 0 24px;
            box-sizing: border-box;
          }
          .ftr-divider {
            margin-top: 32px !important;
            margin-bottom: 16px !important;
          }
          .ftr-bottom-row {
            display: none !important;
          }
          .wordmark-wrap,
          .wordmark-wrapper {
            font-size: 24vw !important;
            margin-top: 16px !important;
            margin-bottom: 0 !important;
            padding-bottom: 0.04em !important;
            overflow: visible !important;
          }
          .wordmark,
          .wordmark-letter {
            font-size: 24vw !important;
            --lift: 0.08em;
            padding-bottom: 0.26em;
            margin-bottom: calc(-0.26em + var(--lift));
            overflow: visible;
          }
        }
      `}</style>

      {/* 5. DECORATIVE RING (BEHIND FOOTER) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '15px',
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
      <div
        className="ftr-card"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* ==================== 1. HEADER (NOTCH + TOP PANEL) ==================== */}
        <div className="ftr-head">
          {/* THE NOTCH CUT-OUT (shows page-bg through transparent cutout) */}
          <div className="ftr-notch">
            <svg
              viewBox="0 0 180 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '80%', maxWidth: '100%', height: 'auto', display: 'block' }}
            >
              {/* Shape 1: Tall rounded rectangle on left with big top-right radius */}
              <path
                d="M 38 0 H 68 Q 115 0 115 48 V 140 Q 115 178 77 178 H 38 Q 0 178 0 140 V 38 Q 0 0 38 0 Z"
                fill="var(--footer-bg)"
              />
              {/* Shape 2: Solid circle at bottom-right (diameter ~82px) with small page-bg gap */}
              <circle cx="138" cy="137" r="41" fill="var(--footer-bg)" />

              {/* Inner subtle stylized J contour in page-bg */}
              <path
                d="M 68 45 V 110 Q 68 135 48 135 Q 32 135 32 120"
                stroke="var(--page-bg)"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* TOP PANEL (right of the notch) */}
          <div className="ftr-top">
            {/* DESKTOP 4 LINK COLUMNS (hidden on mobile) */}
            <div className="ftr-links ftr-top-links">
              {/* Column 1: Explore */}
              <div className="ftr-col">
                <div className="ftr-col-heading">Explore</div>
                <div className="ftr-col-list">
                  <a href="/" className="footer-link-item">
                    <span className="arrow-icon">→</span>
                    <span>Home</span>
                  </a>
                  <a href="/#rooms" className="footer-link-item">
                    <span className="arrow-icon">→</span>
                    <span>Rooms</span>
                  </a>
                  <a href="/#about" className="footer-link-item">
                    <span className="arrow-icon">→</span>
                    <span>About Us</span>
                  </a>
                  <a href="/#contact" className="footer-link-item">
                    <span className="arrow-icon">→</span>
                    <span>Contact</span>
                  </a>
                  <a
                    href="https://www.instagram.com/hotel_jangid/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link-item"
                  >
                    <span className="arrow-icon">→</span>
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.facebook.com/vijay.janger.35"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link-item"
                  >
                    <span className="arrow-icon">→</span>
                    <span>Facebook</span>
                  </a>
                </div>
              </div>

              {/* Column 2: Rooms */}
              <div className="ftr-col">
                <div className="ftr-col-heading">Rooms</div>
                <div className="ftr-col-list">
                  <a href="/#rooms" className="footer-link-item">
                    <span className="arrow-icon">→</span>
                    <span>AC Room</span>
                  </a>
                  <a href="/#rooms" className="footer-link-item">
                    <span className="arrow-icon">→</span>
                    <span>Non-AC Room</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleBookNow}
                    className="footer-link-item"
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                  >
                    <span className="arrow-icon">→</span>
                    <span>Book Now</span>
                  </button>
                </div>
              </div>

              {/* Column 3: Nearby */}
              <div className="ftr-col">
                <div className="ftr-col-heading">Nearby</div>
                <div className="ftr-col-list">
                  <a href="/#amenities" className="footer-link-item">
                    <span className="arrow-icon">→</span>
                    <span>Goga Ji Temple</span>
                  </a>
                  <a href="/#amenities" className="footer-link-item">
                    <span className="arrow-icon">→</span>
                    <span>Railway Station</span>
                  </a>
                  <a href="/#location" className="footer-link-item">
                    <span className="arrow-icon">→</span>
                    <span>How to Reach</span>
                  </a>
                </div>
              </div>

              {/* Column 4: Legal */}
              <div className="ftr-col">
                <div className="ftr-col-heading">Legal</div>
                <div className="ftr-col-list">
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
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-preferences'))}
                    className="footer-link-item"
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                  >
                    <span className="arrow-icon">→</span>
                    <span>Cookie Preferences</span>
                  </button>
                  <a href="/sitemap.xml" className="footer-link-item">
                    <span className="arrow-icon">→</span>
                    <span>XML Sitemap</span>
                  </a>
                  <a href="/.well-known/security.txt" className="footer-link-item">
                    <span className="arrow-icon">→</span>
                    <span>Security Policy</span>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: WHATSAPP & LOCATION CIRCULAR BUTTONS + BOOK YOUR STAY CTA (DESKTOP) */}
            <div className="ftr-right">
              <div className="ftr-social ftr-socials">
                <a
                  href="https://www.instagram.com/hotel_jangid/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="Follow Hotel Jangid on Instagram"
                  aria-label="Follow Hotel Jangid on Instagram"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/vijay.janger.35"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="Connect with Hotel Jangid on Facebook"
                  aria-label="Connect with Hotel Jangid on Facebook"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/919001187776?text=Hello%20Vijay%20ji,%20I%20want%20to%20inquire%20about%20room%20availability%20at%20Hotel%20Jangid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="Chat on WhatsApp"
                  aria-label="Chat on WhatsApp"
                >
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path
                      d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"
                      strokeWidth="1.9"
                    />
                  </svg>
                </a>
                <a
                  href={HOTEL_INFO.mapUrl || 'https://maps.google.com/?q=Hotel+Jangid+Gogamedi'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title="Hotel Location on Google Maps"
                  aria-label="Hotel Location on Google Maps"
                >
                  <MapPin size={21} strokeWidth={1.9} />
                </a>
              </div>
              <RetroButton
                variant="default"
                size="lg"
                onClick={handleBookNow}
                className="hidden md:inline-flex mt-10 sm:mt-12 text-sm sm:text-base font-semibold"
                innerClassName="py-3 px-6 text-sm sm:text-base tracking-widest font-bold"
              >
                Book Your Stay
              </RetroButton>
            </div>
          </div>
        </div>

        {/* ==================== 2. BOTTOM PANEL (FULL WIDTH) ==================== */}
        <div className="ftr-bottom">
          {/* MOBILE 4 LINK COLUMNS (hidden on desktop, 2x2 grid on mobile) */}
          <div className="ftr-mobile-links">
            {/* Column 1: Explore */}
            <div>
              <div className="ftr-col-heading">Explore</div>
              <div className="ftr-col-list">
                <a href="/" className="footer-link-item">
                  <span className="arrow-icon">→</span>
                  <span>Home</span>
                </a>
                <a href="/#rooms" className="footer-link-item">
                  <span className="arrow-icon">→</span>
                  <span>Rooms</span>
                </a>
                <a href="/#about" className="footer-link-item">
                  <span className="arrow-icon">→</span>
                  <span>About Us</span>
                </a>
                <a href="/#contact" className="footer-link-item">
                  <span className="arrow-icon">→</span>
                  <span>Contact</span>
                </a>
                <a
                  href="https://www.instagram.com/hotel_jangid/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-item"
                >
                  <span className="arrow-icon">→</span>
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/vijay.janger.35"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-item"
                >
                  <span className="arrow-icon">→</span>
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            {/* Column 2: Legal (Swapped with Rooms for clean 2x2 mobile grid symmetry) */}
            <div>
              <div className="ftr-col-heading">Legal</div>
              <div className="ftr-col-list">
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
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-preferences'))}
                  className="footer-link-item"
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  <span className="arrow-icon">→</span>
                  <span>Cookie Preferences</span>
                </button>
                <a href="/sitemap.xml" className="footer-link-item">
                  <span className="arrow-icon">→</span>
                  <span>XML Sitemap</span>
                </a>
                <a href="/.well-known/security.txt" className="footer-link-item">
                  <span className="arrow-icon">→</span>
                  <span>Security Policy</span>
                </a>
              </div>
            </div>

            {/* Column 3: Nearby */}
            <div>
              <div className="ftr-col-heading">Nearby</div>
              <div className="ftr-col-list">
                <a href="/#amenities" className="footer-link-item">
                  <span className="arrow-icon">→</span>
                  <span>Goga Ji Temple</span>
                </a>
                <a href="/#amenities" className="footer-link-item">
                  <span className="arrow-icon">→</span>
                  <span>Railway Station</span>
                </a>
                <a href="/#location" className="footer-link-item">
                  <span className="arrow-icon">→</span>
                  <span>How to Reach</span>
                </a>
              </div>
            </div>

            {/* Column 4: Rooms (Swapped with Legal) */}
            <div>
              <div className="ftr-col-heading">Rooms</div>
              <div className="ftr-col-list">
                <a href="/#rooms" className="footer-link-item">
                  <span className="arrow-icon">→</span>
                  <span>AC Room</span>
                </a>
                <a href="/#rooms" className="footer-link-item">
                  <span className="arrow-icon">→</span>
                  <span>Non-AC Room</span>
                </a>
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="footer-link-item"
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  <span className="arrow-icon">→</span>
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          </div>

          <div className="ftr-mobile-cta-wrap mt-6">
            <RetroButton
              variant="default"
              size="full"
              onClick={handleBookNow}
              className="w-full text-base font-semibold"
              innerClassName="py-3.5 px-6 text-base tracking-widest font-bold"
            >
              Book Your Stay
            </RetroButton>
          </div>

          {/* DIVIDER LINE (margin-top: 48px from top panel on desktop, 32px on mobile) */}
          <div className="ftr-divider-wrap">
            <div className="ftr-divider" />
          </div>

          {/* BOTTOM ROW (below divider): Copyright & Barcode on left, Address on right */}
          <div className="ftr-bottom-row">
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
                <rect x="101" y="5" width="4" height="4" rx="1" fill="var(--footer-bg)" />
              </svg>
            </div>

            {/* RIGHT: 3 lines, UPPERCASE address */}
            <div id="contact" className="ftr-bottom-address">
              <div>+91 90011 87776</div>
              <div>HOTEL JANGID, NEAR GOGA JI TEMPLE</div>
              <div>GOGAMEDI, HANUMANGARH, RAJASTHAN - 335504</div>
            </div>
          </div>

          {/* GIANT FADED BRAND WORDMARK "Jangid" */}
          <div
            aria-hidden="true"
            className="wordmark-wrapper wordmark-wrap"
          >
            {['J', 'a', 'n', 'g', 'i', 'd'].map((letter, idx) => (
              <span
                key={idx}
                className="wordmark-letter wordmark"
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
    </footer>
  </div>
</div>

      {/* RAZORPAY COMPLIANCE MODAL (Rendered via Portal to escape clip-path) */}
      {modalContent && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
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
                <h3 className="font-serif font-bold text-2xl text-slate-950">Cancellation & Refund Policy</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  We understand that travel plans and pilgrimage schedules can change. Our cancellation and refund policy is simple, fair, and completely transparent:
                </p>

                {/* Visual refund timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 100% refund card */}
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 mx-auto">
                      <CheckCircle2 className="size-5" />
                    </div>
                    <p className="text-xl font-bold text-emerald-800">100% Refund</p>
                    <p className="text-xs text-emerald-700 leading-snug">
                      Full refund when cancelled at least <strong>48 hours before</strong> check-in
                    </p>
                  </div>
                  {/* No refund card */}
                  <div className="rounded-2xl border border-red-200 bg-red-50/60 p-4 text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 mx-auto">
                      <X className="size-5" />
                    </div>
                    <p className="text-xl font-bold text-red-700">No Refund</p>
                    <p className="text-xs text-red-600 leading-snug">
                      Non-refundable when cancelled <strong>within 48 hours</strong> of check-in
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-amber-50 border border-amber-200/60 p-3.5 text-xs sm:text-sm text-amber-900 leading-relaxed">
                  <strong>Refund Process:</strong> Approved refunds will be credited back to your original payment method within 5–7 business days. For any reservation inquiries or refund assistance, contact host Vijay Jangid directly: <a href="tel:+919001187776" className="underline font-semibold">+91 90011 87776</a>
                </div>
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
        </div>,
        document.body
      )}
    </div>
  );
}
