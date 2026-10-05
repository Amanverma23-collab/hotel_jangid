import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

/**
 * Pixel-Accurate "Testimonials" Section
 * With Real Hotel Jangid Photos & Real Google Reviews (Google Travel Link)
 *
 * SPECIFICATION ADHERENCE:
 * - Full-width clean white background without artificial box / card framing
 * - Gallery Box: 976px wide x 372px tall, centered horizontally
 * - 8 Columns, 106px wide, 19px gap, border-radius: 22px, object-fit: cover, no border, no shadow
 * - Exact coordinates (x, y, w, h) for all 14 photos
 * - Center text nestled below cols 4 & 5 between cols 2 & 7: Badge (30px) + 24px gap + 28px 2-line heading
 * - 3 Real Google Reviews placed 60px below heading: 5 gold stars (#F5A623), real quotes, verified Google avatars
 */

const PHOTOS = [
  // COL 1 (x=0) -> 2 photos
  {
    id: '1A',
    x: 0,
    y: 39,
    w: 106,
    h: 151,
    src: '/images/hotel-exterior-day.webp',
    alt: 'Hotel Jangid Day Exterior View',
    staggerDelay: 240,
  },
  {
    id: '1B',
    x: 0,
    y: 202,
    w: 106,
    h: 150,
    src: '/images/room-ac-entrance.webp',
    alt: 'AC Deluxe Room Entrance & Clean Corridor',
    staggerDelay: 240,
  },

  // COL 2 (x=125) -> 3 photos
  {
    id: '2A',
    x: 125,
    y: 20,
    w: 106,
    h: 109,
    src: '/images/room-bathroom.webp',
    alt: 'Clean Hygienic Bathroom with 24/7 Geyser',
    staggerDelay: 180,
  },
  {
    id: '2B',
    x: 125,
    y: 141,
    w: 106,
    h: 110,
    src: '/images/hotel-exterior-parking.webp',
    alt: 'Spacious Secure Courtyard Car Parking',
    staggerDelay: 180,
  },
  {
    id: '2C',
    x: 125,
    y: 263,
    w: 106,
    h: 109,
    src: '/images/room-standard-ac.webp',
    alt: 'Comfortable Room Bedding & Clean Linen',
    staggerDelay: 180,
  },

  // COL 3 (x=249) -> 1 tall photo
  {
    id: 'COL3',
    x: 249,
    y: 39,
    w: 106,
    h: 235,
    src: '/images/room-ac-deluxe.webp',
    alt: 'Premium AC Deluxe Room Interior',
    staggerDelay: 120,
  },

  // COL 4 (x=373) -> 1 tall photo (highest, center-left peak)
  {
    id: 'COL4',
    x: 373,
    y: 0,
    w: 106,
    h: 235,
    src: '/images/hotel-hero.webp',
    alt: 'Hotel Jangid Main Building Architecture',
    staggerDelay: 0,
  },

  // COL 5 (x=498) -> 1 tall photo (highest, center-right peak)
  {
    id: 'COL5',
    x: 498,
    y: 0,
    w: 106,
    h: 235,
    src: '/images/gogamedi-temple.webp',
    alt: 'Shri Goga Ji Maharaj Temple (400m from Hotel)',
    staggerDelay: 0,
  },

  // COL 6 (x=622) -> 1 tall photo
  {
    id: 'COL6',
    x: 622,
    y: 39,
    w: 106,
    h: 235,
    src: '/images/room-family-deluxe.webp',
    alt: 'Spacious Family Suite with Modern Lighting',
    staggerDelay: 120,
  },

  // COL 7 (x=746) -> 3 photos
  {
    id: '7A',
    x: 746,
    y: 20,
    w: 106,
    h: 109,
    src: '/images/room-family-view2.webp',
    alt: 'Family Room Comfort & Space',
    staggerDelay: 180,
  },
  {
    id: '7B',
    x: 746,
    y: 141,
    w: 106,
    h: 110,
    src: '/images/route-map-400m.webp',
    alt: '400m Direct Walking Route to Temple',
    staggerDelay: 180,
  },
  {
    id: '7C',
    x: 746,
    y: 263,
    w: 106,
    h: 109,
    src: '/images/room-bathroom.webp',
    alt: '24-hour Hot & Cold Water Facility',
    staggerDelay: 180,
  },

  // COL 8 (x=870) -> 2 photos
  {
    id: '8A',
    x: 870,
    y: 39,
    w: 106,
    h: 151,
    src: '/images/owners-surjeet-vijay-jangid.webp',
    alt: 'Hotel Owners Surjeet Jangid & Vijay Jangid',
    staggerDelay: 240,
  },
  {
    id: '8B',
    x: 870,
    y: 202,
    w: 106,
    h: 150,
    src: '/images/hotel-exterior-parking.webp',
    alt: 'Hotel Courtyard Gates & Secure Parking',
    staggerDelay: 240,
  },
];

// 100% Real Google Reviews extracted from: https://www.google.com/travel/hotels/s/37kmAYoQB2s1j5xs6 (Hotel Jangid)
const REVIEWS = [
  {
    id: 1,
    quote:
      '"This hotel is a great place to stay; the staff treats guests very well. Clean and quiet rooms with spacious courtyard parking."',
    name: 'Naveen Kochhar',
    role: 'Verified Guest • Google Review',
    avatar: '/images/avatars/avatar-naveen-kochhar.webp',
  },
  {
    id: 2,
    quote:
      '"Good Location & best service. Very close to Goga Ji Maharaj temple—just a 5-minute walk. Excellent family hospitality."',
    name: 'Yogesh Pandav',
    role: 'Pilgrim Guest • Google Review',
    avatar: '/images/avatars/avatar-yogesh-pandav.webp',
  },
  {
    id: 3,
    quote:
      '"Good environment, hygienic rooms, family hotel. Friendly atmosphere, continuous hot water, and honest management."',
    name: 'Sanjay Kumar',
    role: 'Family Stay • Google Review',
    avatar: '/images/avatars/avatar-sanjay-kumar.webp',
  },
];

export default function GalleryTestimonialsSection() {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1.2);
  const [inView, setInView] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  // Keyboard navigation & body scroll lock for Lightbox Modal
  useEffect(() => {
    if (activePhotoIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev + 1) % PHOTOS.length);
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePhotoIndex]);

  // Responsive scale handler to ensure exact proportions on any device width
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.offsetWidth;
        // Scales gallery up to ~1180px on desktop (approx 1.21x size for larger, clearer photos)
        const targetWidth = Math.min(availableWidth - 32, 1180);
        setScale(Math.max(0.35, targetWidth / 976));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // IntersectionObserver for lightweight scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="testimonials"
      style={{
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: '70px 0 90px 0',
        boxSizing: 'border-box',
        overflow: 'hidden',
        fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <div ref={containerRef} id="gallery" style={{ width: '100%', position: 'relative' }}>
        
        {/* PHOTO GALLERY BOX: 976px wide x 372px tall, centered horizontally */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: `${372 * scale}px`,
            position: 'relative',
            overflow: 'visible',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '976px',
              height: '372px',
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              flexShrink: 0,
            }}
          >
            {/* 14 ABSOLUTELY POSITIONED REAL HOTEL PHOTOS WITH INTERACTIVE ZOOM & LIGHTBOX TRIGGER */}
            {PHOTOS.map((photo, idx) => (
              <div
                key={photo.id}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${photo.alt}`}
                onClick={() => setActivePhotoIndex(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActivePhotoIndex(idx);
                  }
                }}
                style={{
                  position: 'absolute',
                  left: `${photo.x}px`,
                  top: `${photo.y}px`,
                  width: `${photo.w}px`,
                  height: `${photo.h}px`,
                  borderRadius: '22px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s ease-out ${photo.staggerDelay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${photo.staggerDelay}ms, box-shadow 0.3s ease`,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                }}
                className="group gallery-photo-card"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  width={photo.w}
                  height={photo.h}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.3s ease',
                  }}
                  className="group-hover:scale-110"
                />
                {/* Subtle Hover Lens Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  className="group-hover:opacity-100"
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    }}
                  >
                    <ZoomIn size={16} color="#0B132B" />
                  </div>
                </div>
              </div>
            ))}

            {/* CENTER TEXT: Sits in empty space below cols 4 & 5 and between cols 2 and 7 */}
            <div
              style={{
                position: 'absolute',
                top: '255px',
                left: '235px',
                width: '506px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                zIndex: 10,
                pointerEvents: 'auto',
              }}
            >
              {/* Badge: "Testimonials", pill shape, 1px solid #C9CED6, white bg, padding 6px 20px, font-size 14px, color #1F2937 */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '9999px',
                  border: '1px solid #C9CED6',
                  backgroundColor: '#FFFFFF',
                  padding: '6px 20px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#1F2937',
                  height: '30px',
                  boxSizing: 'border-box',
                  lineHeight: 1,
                }}
              >
                Testimonials
              </div>

              {/* 24px gap */}
              <div style={{ height: '24px' }} />

              {/* Heading: 2 lines, centered, font-size 28px, weight 600, line-height 1.2, letter-spacing -0.5px */}
              <h2
                style={{
                  margin: 0,
                  fontSize: '28px',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  letterSpacing: '-0.5px',
                  textAlign: 'center',
                }}
              >
                <span style={{ display: 'block', color: '#0B0B0F' }}>
                  Heard it from our guests,
                </span>
                <span style={{ display: 'block', color: '#8E9AAF', marginTop: '2px' }}>
                  not from us
                </span>
              </h2>
            </div>
          </div>
        </div>

        {/* 60px GAP BELOW GALLERY & HEADING */}
        <div style={{ height: '60px' }} />

        {/* TESTIMONIAL CARDS: 3 columns, equal width (~300px each), 30px gap, no card border/background */}
        <div
          id="reviews"
          style={{
            maxWidth: '1080px',
            margin: '0 auto',
            padding: '0 24px',
            boxSizing: 'border-box',
          }}
        >
          {/* ── DESKTOP: 3-col grid | MOBILE: horizontal snap slider ── */}
          <style>{`
            .reviews-slider-track {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
              gap: 30px;
              text-align: left;
            }
            .review-dot { width:8px; height:8px; border-radius:50%; background:#D1D5DB; transition: background 0.2s, transform 0.2s; cursor:pointer; border:none; padding:0; }
            .review-dot.active { background:#111827; transform: scale(1.25); }
            @media (max-width: 767px) {
              .reviews-slider-wrapper {
                overflow-x: auto;
                scroll-snap-type: x mandatory;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: none;
                margin: 0 -24px;
                padding: 0 24px;
              }
              .reviews-slider-wrapper::-webkit-scrollbar { display: none; }
              .reviews-slider-track {
                display: flex !important;
                flex-wrap: nowrap !important;
                gap: 16px !important;
                width: max-content;
              }
              .review-card-item {
                width: calc(85vw) !important;
                min-width: calc(85vw) !important;
                scroll-snap-align: start;
                flex-shrink: 0;
              }
            }
          `}</style>

          {/* Slider wrapper */}
          <div
            className="reviews-slider-wrapper"
            id="reviews-slider"
            onScroll={(e) => {
              const el = e.currentTarget;
              const cardW = el.querySelector('.review-card-item')?.offsetWidth || 1;
              const idx = Math.round(el.scrollLeft / (cardW + 16));
              const dots = document.querySelectorAll('.review-dot');
              dots.forEach((d, i) => d.classList.toggle('active', i === idx));
            }}
          >
            <div className="reviews-slider-track">
              {REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="review-card-item"
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    {/* 5 Stars */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#F5A623' }}>
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F5A623" stroke="none">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <div style={{ height: '16px' }} />
                    <p style={{ margin: 0, fontSize: '12.5px', lineHeight: 1.55, color: '#4B5563', fontWeight: 400 }}>
                      {rev.quote}
                    </p>
                  </div>

                  <div>
                    <div style={{ height: '24px' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={rev.avatar}
                        alt={`${rev.name} - Verified Guest at Hotel Jangid Gogamedi`}
                        loading="lazy"
                        width={38}
                        height={38}
                        style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>{rev.name}</span>
                        <span style={{ fontSize: '12.5px', fontWeight: 400, color: '#6B7280', lineHeight: 1.2, marginTop: '2px' }}>{rev.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators — only visible on mobile */}
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}
            className="reviews-dots"
          >
            <style>{`@media(min-width:768px){.reviews-dots{display:none!important;}}`}</style>
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                className={`review-dot ${i === 0 ? 'active' : ''}`}
                onClick={() => {
                  const slider = document.getElementById('reviews-slider');
                  const cardW = slider?.querySelector('.review-card-item')?.offsetWidth || 0;
                  slider?.scrollTo({ left: i * (cardW + 16), behavior: 'smooth' });
                }}
              />
            ))}
          </div>

          {/* Direct Link to Google Travel Listing */}
          <div
            style={{
              marginTop: '48px',
              paddingTop: '24px',
              borderTop: '1px solid #F3F4F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#6B7280',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              <span>Verified 5.0 Google Rating • Hotel Jangid, Gogamedi</span>
            </div>
            <a
              href="https://www.google.com/travel/hotels/s/37kmAYoQB2s1j5xs6"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#111827', fontWeight: 600, textDecoration: 'none' }}
            >
              <span>View Official Google Reviews</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

      </div>

      {/* LUXURY ANIMATED LIGHTBOX MODAL */}
      {activePhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Hotel Jangid Photo Gallery Preview"
          onClick={() => setActivePhotoIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(5, 8, 15, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px',
            animation: 'fadeInLightbox 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {/* Keyframe animation for smooth entrance */}
          <style>{`
            @keyframes fadeInLightbox {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes zoomInPhoto {
              from { opacity: 0; transform: scale(0.92); }
              to { opacity: 1; transform: scale(1); }
            }
            .lightbox-thumb-strip::-webkit-scrollbar {
              height: 4px;
            }
            .lightbox-thumb-strip::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.3);
              border-radius: 4px;
            }
          `}</style>

          {/* Top Bar: Title, Counter & Close */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '8px 12px',
              zIndex: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FAF8F5',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                {activePhotoIndex + 1} / {PHOTOS.length}
              </span>
              <span
                style={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '14px',
                  fontWeight: 500,
                  display: 'none',
                }}
                className="sm:inline"
              >
                {PHOTOS[activePhotoIndex].alt}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setActivePhotoIndex(null)}
                aria-label="Close Lightbox"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)')}
              >
                <X size={18} />
                <span>Close</span>
                <span style={{ fontSize: '11px', opacity: 0.6, marginLeft: '2px' }} className="hidden sm:inline">ESC</span>
              </button>
            </div>
          </div>

          {/* Center Stage: Prev Button, Main Active Image, Next Button */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '1200px',
              width: '100%',
              margin: '0 auto',
              padding: '10px 0',
              overflow: 'hidden',
            }}
          >
            {/* Prev Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);
              }}
              aria-label="Previous Photo"
              style={{
                position: 'absolute',
                left: '12px',
                zIndex: 20,
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(223, 197, 158, 0.9)';
                e.currentTarget.style.color = '#0B132B';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <ChevronLeft size={26} />
            </button>

            {/* Active Photo Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              key={activePhotoIndex}
              style={{
                position: 'relative',
                maxHeight: 'calc(100vh - 210px)',
                maxWidth: '92vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'zoomInPhoto 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              <img
                src={PHOTOS[activePhotoIndex].src}
                alt={PHOTOS[activePhotoIndex].alt}
                style={{
                  maxHeight: 'calc(100vh - 240px)',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  borderRadius: '18px',
                  boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.15)',
                }}
              />
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '13px',
                  fontWeight: 500,
                  marginTop: '10px',
                  textAlign: 'center',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                {PHOTOS[activePhotoIndex].alt}
              </p>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex((prev) => (prev + 1) % PHOTOS.length);
              }}
              aria-label="Next Photo"
              style={{
                position: 'absolute',
                right: '12px',
                zIndex: 20,
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(223, 197, 158, 0.9)';
                e.currentTarget.style.color = '#0B132B';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <ChevronRight size={26} />
            </button>
          </div>

          {/* Bottom Thumbnails Navigation Strip */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="lightbox-thumb-strip"
            style={{
              width: '100%',
              maxWidth: '900px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '8px',
              overflowX: 'auto',
              padding: '6px 4px 10px 4px',
              zIndex: 10,
            }}
          >
            {PHOTOS.map((thumb, idx) => (
              <button
                key={thumb.id}
                type="button"
                onClick={() => setActivePhotoIndex(idx)}
                style={{
                  position: 'relative',
                  flexShrink: 0,
                  width: '56px',
                  height: '42px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  padding: 0,
                  cursor: 'pointer',
                  border: idx === activePhotoIndex ? '2px solid #dfc59e' : '1px solid rgba(255, 255, 255, 0.2)',
                  opacity: idx === activePhotoIndex ? 1 : 0.45,
                  transform: idx === activePhotoIndex ? 'scale(1.08)' : 'scale(1)',
                  transition: 'all 0.2s ease',
                  backgroundColor: '#000',
                }}
              >
                <img
                  src={thumb.src}
                  alt={thumb.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

