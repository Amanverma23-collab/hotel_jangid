import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * About / Owners Bento Section
 * 
 * Layout:
 * - Container: max-width 1240px, centered, gap 20px
 * - Row 1 (height 412px desktop, 360px tablet):
 *     CARD A: Owners photo (left, 818px / ~67% width, full-cover photo)
 *     CARD B: Both owners text card (right, 398px / ~33% width, #EFE6D8 beige)
 * - Row 2 (height 412px desktop, 360px tablet) - Mirror of Row 1:
 *     CARD C: About Gogamedi (left, 398px / ~33% width, #BFAA90 tan text card)
 *     CARD D: Goga Ji Temple (right, 818px / ~67% width, FULL-COVER photo with bottom gradient overlay + expand button)
 * - Lightbox modal on expand button click
 */

export default function OwnersSection() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  // Card stagger animation: A -> B -> C -> D
  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.09,
        duration: 0.55,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden font-sans"
      style={{
        backgroundColor: '#FDF6EA',
        padding: '90px 0',
      }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ==================== TOP BADGE & HEADING ==================== */}
        <div className="flex flex-col items-center text-center">
          
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{
              border: '1px solid #D9CDBA',
              backgroundColor: 'transparent',
              borderRadius: '999px',
              padding: '6px 20px',
              fontSize: '14px',
              color: '#2B2B2B',
              lineHeight: 1.4,
              marginBottom: '20px',
            }}
          >
            About Us
          </motion.div>

          {/* 2-Line H2 Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-center font-semibold"
            style={{
              fontSize: '36px',
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: '-0.5px',
              marginBottom: '56px',
            }}
          >
            <span style={{ color: '#1A1A1A', display: 'block' }}>
              A family-run hotel,
            </span>
            <span style={{ color: '#8E9AAF', display: 'block' }}>
              just steps from Goga Ji Dham
            </span>
          </motion.h2>

        </div>

        {/* ==================== BENTO GRID (2 ROWS, 4 CARDS) ==================== */}
        <div className="flex flex-col gap-5">
          
          {/* -------------------- ROW 1: [CARD A: 818px (~67%)] [CARD B: 398px (~33%)] -------------------- */}
          <div className="grid grid-cols-1 md:grid-cols-[818fr_398fr] gap-5 h-auto md:h-[360px] lg:h-[412px]">
            
            {/* CARD A: OWNERS PHOTO (FULL COVER) */}
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative w-full h-[320px] sm:h-[380px] md:h-full overflow-hidden group select-none rounded-[24px] lg:rounded-[28px]"
              style={{
                border: 'none',
                boxShadow: 'none',
              }}
            >
              {/* Owners Photo */}
              <motion.img
                src="/images/owners-surjeet-vijay-jangid.webp"
                alt="Mr. Surjeet Jangid and Mr. Vijay Jangid, owners of Hotel Jangid, Gogamedi"
                loading="lazy"
                width={818}
                height={412}
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-full h-full object-cover object-[center_top] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />

              {/* Bottom Dark Gradient Overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 40%, transparent 70%)',
                }}
              />

              {/* Bottom-Left Text */}
              <div
                className="absolute text-white pointer-events-none z-10 p-6 sm:p-7 lg:p-8"
                style={{
                  left: 0,
                  bottom: 0,
                  right: 0,
                }}
              >
                <h3
                  className="font-semibold text-white tracking-normal"
                  style={{
                    fontSize: '26px',
                    fontWeight: 600,
                    lineHeight: 1.2,
                    marginBottom: '8px',
                  }}
                >
                  Two Generations, One Promise
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.8)',
                    maxWidth: '420px',
                  }}
                >
                  Father and son, Mr. Surjeet Jangid and Mr. Vijay Jangid, personally look after every guest who stays with us.
                </p>
              </div>
            </motion.div>

            {/* CARD B: BOTH OWNERS IN ONE CARD */}
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative w-full h-auto md:h-full overflow-hidden flex flex-col justify-between rounded-[24px] lg:rounded-[28px] p-6 sm:p-8 lg:p-9"
              style={{
                backgroundColor: '#EFE6D8',
                border: 'none',
                boxShadow: 'none',
              }}
            >
              {/* TOP: Small Label */}
              <div>
                <span
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1.2px',
                    color: '#8A7B66',
                  }}
                >
                  THE OWNERS
                </span>
              </div>

              {/* MIDDLE / BOTTOM: Two Blocks Stacked with 1px Divider */}
              <div className="flex flex-col justify-end mt-4 md:mt-0">
                
                {/* BLOCK 1: FOUNDER */}
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: '#8A7B66',
                      marginBottom: '3px',
                    }}
                  >
                    FOUNDER
                  </span>
                  <h3
                    style={{
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#111111',
                      lineHeight: 1.2,
                      marginBottom: '5px',
                    }}
                  >
                    Mr. Surjeet Jangid
                  </h3>
                </div>

                {/* 1px Divider Line */}
                <div
                  style={{
                    height: '1px',
                    backgroundColor: '#D9CDBA',
                    margin: '18px 0',
                    width: '100%',
                  }}
                />

                {/* BLOCK 2: CO-OWNER */}
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: '#8A7B66',
                      marginBottom: '3px',
                    }}
                  >
                    CO-OWNER
                  </span>
                  <h3
                    style={{
                      fontSize: '24px',
                      fontWeight: 600,
                      color: '#111111',
                      lineHeight: 1.2,
                      marginBottom: '5px',
                    }}
                  >
                    Mr. Vijay Jangid
                  </h3>
                  <p
                    style={{
                      fontSize: '13.5px',
                      lineHeight: 1.65,
                      color: '#6B6B6B',
                    }}
                  >
                    On-site daily to manage guest reservations, ensure meticulous room hygiene, and assist yatris with temple timings and travel guidance.
                  </p>
                </div>

              </div>
            </motion.div>

          </div>

          {/* -------------------- ROW 2: [CARD C: 398px (~33%)] [CARD D: 818px (~67%)] -------------------- */}
          <div className="grid grid-cols-1 md:grid-cols-[398fr_818fr] gap-5 h-auto md:h-[360px] lg:h-[412px]">
            
            {/* CARD C (Row 2, SMALL Left): ABOUT GOGAMEDI & TEMPLE LOCATION */}
            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative w-full h-auto md:h-full overflow-hidden flex flex-col justify-between rounded-[24px] lg:rounded-[28px] p-6 sm:p-7 lg:p-8"
              style={{
                backgroundColor: '#BFAA90',
                border: 'none',
                boxShadow: 'none',
                color: '#FFFFFF',
              }}
            >
              {/* TOP: Category Label */}
              <div>
                <span
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1.2px',
                    color: 'rgba(255, 255, 255, 0.75)',
                  }}
                >
                  SACRED DHAM & PROXIMITY
                </span>
              </div>

              {/* MIDDLE / BOTTOM: Two Clean Sections Stacked with 1px Divider */}
              <div className="flex flex-col justify-end mt-4 md:mt-0">
                
                {/* SECTION 1: GOGAMEDI */}
                <div>
                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      lineHeight: 1.25,
                      marginBottom: '6px',
                    }}
                  >
                    The Sacred Home of Goga Ji
                  </h3>
                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    Gogamedi, in Hanumangarh district of Rajasthan, is revered by devotees from Rajasthan, Punjab and Haryana. The Goga Navami fair draws the largest crowds every year.
                  </p>
                </div>

                {/* 1px Elegant Semi-Transparent Divider Line */}
                <div
                  style={{
                    height: '1px',
                    backgroundColor: 'rgba(255, 255, 255, 0.28)',
                    margin: '16px 0',
                    width: '100%',
                  }}
                />

                {/* SECTION 2: TEMPLE DISTANCE */}
                <div>
                  <h4
                    style={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      lineHeight: 1.25,
                      marginBottom: '6px',
                    }}
                  >
                    Just 400 m from Goga Ji Temple
                  </h4>
                  <p
                    style={{
                      fontSize: '13px',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    Walk to Goga Ji Dham for darshan in minutes. The railway station is only 900 m away, so reaching us is easy.
                  </p>
                </div>

              </div>
            </motion.div>

            {/* CARD D (Row 2, BIG Right): GOGA JI TEMPLE - FULL CLEAN PHOTO */}
            <motion.div
              custom={3}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              onClick={() => setIsLightboxOpen(true)}
              className="relative w-full h-[320px] sm:h-[380px] md:h-full overflow-hidden group select-none rounded-[24px] lg:rounded-[28px] cursor-pointer"
              style={{
                border: 'none',
                boxShadow: 'none',
              }}
              title="Click to view fullscreen"
            >
              {/* Full-Cover Temple Photo - Repositioned to show full mandir structure */}
              <motion.img
                src="/images/gogaji-temple-main.webp"
                alt="Shri Goga Ji Maharaj Temple, Gogamedi, 400 m from Hotel Jangid"
                loading="lazy"
                width={818}
                height={412}
                initial={{ scale: 1.04 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-full h-full object-cover object-[center_92%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </motion.div>

          </div>

        </div>

      </div>

      {/* ==================== FULLSCREEN LIGHTBOX MODAL ==================== */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close Lightbox"
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/images/gogaji-temple-main.webp"
              alt="Shri Goga Ji Maharaj Temple, Gogamedi, 400 m from Hotel Jangid"
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
            <div className="mt-4 text-center text-white">
              <h4 className="text-lg font-semibold tracking-wide">
                Shri Goga Ji Maharaj Temple, Gogamedi
              </h4>
              <p className="text-xs text-gray-300 mt-1">
                Located just 400 meters (5 minutes walk) from Hotel Jangid
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
