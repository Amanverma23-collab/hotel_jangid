import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  PhoneCall,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Star,
  X,
  ArrowUp,
  ChevronRight,
  Clock,
  Lock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface AnimatedContainerProps extends React.ComponentProps<typeof motion.div> {
  children?: React.ReactNode;
  delay?: number;
}

function AnimatedContainer({
  delay = 0.1,
  children,
  ...props
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div {...props}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: 10, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default function Footer() {
  const [modalContent, setModalContent] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer
        id="contact"
        className="relative w-full bg-[#080C15] text-slate-100 overflow-hidden font-sans border-t border-amber-500/20"
      >
        {/* Ambient Warm Golden Glow Effects */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-32 left-1/4 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(223,197,158,0.12)_0,rgba(201,159,91,0.03)_50%,transparent_75%)] blur-3xl" />
          <div className="absolute -bottom-20 right-10 w-[500px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(201,159,91,0.09)_0,transparent_70%)] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-12">
          
          {/* TOP CALLOUT BAR: Warm Welcome & Direct Quick Actions */}
          <AnimatedContainer delay={0.05} className="mb-14">
            <div className="rounded-3xl bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-white/[0.06] border border-amber-400/25 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-44 h-44 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold tracking-wide uppercase">
                    <Sparkles className="size-3.5 text-amber-400" />
                    <span>Shri Goga Ji Dham • Gogamedi, Rajasthan</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
                    Planning your stay at Gogamedi?
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Surjeet & Vijay Jangid welcome you to a peaceful, honest, and spotless family-run hotel located just 400m from the sacred temple.
                  </p>
                </div>

                {/* Quick CTA Actions */}
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <a
                    href="https://wa.me/919414487691?text=Hello%20Vijay%20ji,%20I%20want%20to%20inquire%20about%20room%20availability%20at%20Hotel%20Jangid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-sm shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    <MessageCircle className="size-4" />
                    <span>WhatsApp Booking</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-200 animate-pulse ml-1" />
                  </a>

                  <a
                    href="tel:+919414487691"
                    className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30 font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    <PhoneCall className="size-4 text-amber-400" />
                    <span>Call +91 94144 87691</span>
                  </a>

                  <a
                    href={HOTEL_INFO.mapUrl || 'https://maps.google.com/?q=Hotel+Jangid+Gogamedi'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                    title="Get Directions on Google Maps"
                  >
                    <MapPin className="size-4" />
                    <span className="sr-only">Directions</span>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedContainer>

          {/* MAIN 4-COLUMN LUXURY ARCHITECTURE */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
            
            {/* COLUMN 1: Brand & Heritage (Col 1-5) */}
            <AnimatedContainer delay={0.1} className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-serif font-black text-2xl shadow-xl shadow-amber-500/20 border border-amber-300/40">
                    J
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                </div>
                <div>
                  <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-wide leading-tight">
                    {HOTEL_INFO.name}
                  </h2>
                  <p className="text-xs text-amber-300/90 font-medium tracking-wider uppercase mt-0.5">
                    होटल जांगिड़ • गोगामेड़ी, राजस्थान
                  </p>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed max-w-md">
                Experience authentic Rajasthani hospitality in a clean, quiet sanctuary. Thoughtfully managed by <span className="text-amber-200 font-medium">Surjeet & Vijay Jangid</span> to ensure pilgrims and travelers enjoy complete comfort and peace of mind.
              </p>

              {/* Distance Highlights */}
              <div className="grid grid-cols-2 gap-3 max-w-md pt-1">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-3 flex items-center gap-2.5">
                  <span className="text-lg">🛕</span>
                  <div>
                    <div className="text-xs font-bold text-white">400 Meters</div>
                    <div className="text-[11px] text-slate-400">Shri Goga Ji Mandir</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-3 flex items-center gap-2.5">
                  <span className="text-lg">🚂</span>
                  <div>
                    <div className="text-xs font-bold text-white">900 Meters</div>
                    <div className="text-[11px] text-slate-400">Gogamedi Station</div>
                  </div>
                </div>
              </div>

              {/* Trust & Verification Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 px-3 py-1.5 text-xs text-amber-200 font-medium">
                  <ShieldCheck className="size-4 text-amber-400" />
                  <span>Rajasthan Govt Registered</span>
                </div>

                <a
                  href="https://www.google.com/travel/hotels/s/37kmAYoQB2s1j5xs6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 px-3 py-1.5 text-xs text-slate-200 font-medium transition-colors"
                >
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-white">5.0</span>
                  <span className="text-slate-400">Google Reviews</span>
                </a>
              </div>
            </AnimatedContainer>

            {/* COLUMN 2: Explore Hotel (Col 6-7) */}
            <AnimatedContainer delay={0.2} className="lg:col-span-2 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-amber-300/90 flex items-center gap-2">
                <span>Explore Hotel</span>
                <span className="w-6 h-[1px] bg-amber-400/30" />
              </h3>

              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <a href="#rooms" className="group flex items-center gap-1.5 hover:text-amber-200 transition-colors">
                    <ChevronRight className="size-3.5 text-amber-400/50 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all" />
                    <span>AC Deluxe (₹1,200)</span>
                  </a>
                </li>
                <li>
                  <a href="#rooms" className="group flex items-center gap-1.5 hover:text-amber-200 transition-colors">
                    <ChevronRight className="size-3.5 text-amber-400/50 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all" />
                    <span>Air-Cooled (₹1,000)</span>
                  </a>
                </li>
                <li>
                  <a href="#amenities" className="group flex items-center gap-1.5 hover:text-amber-200 transition-colors">
                    <ChevronRight className="size-3.5 text-amber-400/50 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all" />
                    <span>Hotel Amenities</span>
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="group flex items-center gap-1.5 hover:text-amber-200 transition-colors">
                    <ChevronRight className="size-3.5 text-amber-400/50 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all" />
                    <span>Guest Reviews & Gallery</span>
                  </a>
                </li>
                <li>
                  <a href="#location" className="group flex items-center gap-1.5 hover:text-amber-200 transition-colors">
                    <ChevronRight className="size-3.5 text-amber-400/50 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all" />
                    <span>Temple Map & Route</span>
                  </a>
                </li>
              </ul>
            </AnimatedContainer>

            {/* COLUMN 3: Policies & Security (Col 8-9) */}
            <AnimatedContainer delay={0.3} className="lg:col-span-2 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-amber-300/90 flex items-center gap-2">
                <span>Policies & Trust</span>
                <span className="w-6 h-[1px] bg-amber-400/30" />
              </h3>

              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400/90 font-medium">
                <Lock className="size-3" />
                <span>Razorpay 256-bit Encrypted</span>
              </div>

              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <button
                    type="button"
                    onClick={() => setModalContent('privacy')}
                    className="group flex items-center gap-1.5 hover:text-amber-200 text-left cursor-pointer transition-colors"
                  >
                    <ChevronRight className="size-3.5 text-amber-400/50 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all" />
                    <span>Privacy Policy</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setModalContent('terms')}
                    className="group flex items-center gap-1.5 hover:text-amber-200 text-left cursor-pointer transition-colors"
                  >
                    <ChevronRight className="size-3.5 text-amber-400/50 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all" />
                    <span>Terms & Conditions</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setModalContent('refund')}
                    className="group flex items-center gap-1.5 hover:text-amber-200 text-left cursor-pointer transition-colors"
                  >
                    <ChevronRight className="size-3.5 text-amber-400/50 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all" />
                    <span>Cancellation & Refund</span>
                  </button>
                </li>
                <li className="pt-1 text-xs text-slate-400 leading-relaxed">
                  ✓ Govt Photo ID (Aadhaar / Voter ID) required at check-in.
                </li>
              </ul>
            </AnimatedContainer>

            {/* COLUMN 4: Direct Host Helpdesk Card (Col 10-12) */}
            <AnimatedContainer delay={0.4} className="lg:col-span-3 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-amber-300/90 flex items-center gap-2">
                <span>Direct Host Desk</span>
                <span className="w-6 h-[1px] bg-amber-400/30" />
              </h3>

              <div className="rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-amber-400/20 p-4 space-y-3 shadow-lg">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div>
                    <h4 className="font-semibold text-white text-sm">Vijay Jangid</h4>
                    <p className="text-xs text-amber-300">Host & Operations</p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <Clock className="size-3" />
                    <span>Available 24/7</span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 space-y-1">
                  <div className="text-slate-400">Founder: <span className="text-slate-200">Surjeet Jangid</span></div>
                  <div className="text-slate-400">Location: <span className="text-slate-200">Gogamedi, Hanumangarh, RJ</span></div>
                </div>

                <a
                  href="tel:+919414487691"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/10"
                >
                  <PhoneCall className="size-3.5" />
                  <span>+91 94144 87691</span>
                </a>
              </div>
            </AnimatedContainer>

          </div>

          {/* BOTTOM COPYRIGHT & COMPLIANCE BAR */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-center md:text-left">
              <p>© {new Date().getFullYear()} {HOTEL_INFO.name}, Gogamedi. All rights reserved.</p>
              <span className="hidden md:inline text-white/20">•</span>
              <p className="text-slate-400">Government Registered Tourism Property</p>
            </div>

            {/* Payment & Back to top */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-white/[0.03] border border-white/10 px-3 py-1 rounded-xl">
                <span>Secure UPI</span>
                <span className="text-white/20">|</span>
                <span>Cards</span>
                <span className="text-white/20">|</span>
                <span>NetBanking</span>
              </div>

              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="p-2 rounded-xl bg-white/5 hover:bg-amber-400 hover:text-slate-950 border border-white/10 transition-all duration-300 group cursor-pointer"
                title="Back to Top"
              >
                <ArrowUp className="size-4 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>

          {/* Designer Credit */}
          <div className="pt-4 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
            <span>Designed & crafted for Shri Goga Ji Pilgrims by</span>
            <span className="text-slate-300 font-semibold tracking-wide">Nikxlab Studio</span>
          </div>

        </div>
      </footer>

      {/* RAZORPAY COMPLIANCE MODAL */}
      {modalContent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
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
    </>
  );
}
