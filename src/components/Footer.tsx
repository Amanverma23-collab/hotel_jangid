import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  PhoneCall,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Star,
  X,
  Compass,
  FileText,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import { Button } from './ui/button';
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
      initial={{ filter: 'blur(4px)', translateY: -6, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default function Footer() {
  const [modalContent, setModalContent] = useState<string | null>(null);

  const socialLinks = [
    {
      title: 'Call Host',
      href: 'tel:+919414487691',
      icon: PhoneCall,
    },
    {
      title: 'WhatsApp',
      href: 'https://wa.me/919414487691?text=Hello%20Vijay%20ji,%20I%20want%20to%20inquire%20about%20room%20availability%20at%20Hotel%20Jangid',
      icon: MessageCircle,
    },
    {
      title: 'Location',
      href: HOTEL_INFO.mapUrl || 'https://maps.google.com/?q=Hotel+Jangid+Gogamedi',
      icon: MapPin,
    },
  ];

  return (
    <>
      {/* 
        Sticky Footer with Curtain Reveal Effect 
        Outer container sets the document height and clipPath boundary.
        Inner container is fixed bottom-0, smoothly uncurtained as preceding sections scroll up.
      */}
      <footer
        id="contact"
        className="relative w-full h-[520px] md:h-[420px]"
        style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
      >
        <div className="fixed bottom-0 left-0 w-full h-[520px] md:h-[420px] bg-[#080d17] text-gray-200">
          
          {/* Ambient Radial Glowing Gradients */}
          <div aria-hidden className="absolute inset-0 isolate z-0 contain-strict pointer-events-none overflow-hidden">
            <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(223,197,158,0.1)_0,rgba(201,159,91,0.03)_50%,transparent_80%)] absolute top-0 left-0 h-[380px] w-[460px] -translate-y-16 rounded-full blur-2xl" />
            <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(201,159,91,0.08)_0,transparent_100%)] absolute bottom-0 right-0 h-[320px] w-[420px] rounded-full blur-2xl" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto h-full px-5 sm:px-8 lg:px-12 py-8 md:py-10 flex flex-col justify-between border-t border-white/10">
            
            {/* Main Content Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pt-2">
              
              {/* Left Column: Brand & Identity (5 cols) */}
              <AnimatedContainer className="md:col-span-5 space-y-3.5">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#dfc59e] to-[#c99f5b] text-[#080d17] flex items-center justify-center font-serif font-black text-xl shadow-md">
                    J
                  </span>
                  <div>
                    <h2 className="font-serif font-bold text-2xl text-white tracking-wide leading-tight">
                      {HOTEL_INFO.name}
                    </h2>
                    <span className="text-xs text-[#dfc59e] font-sans font-medium tracking-wider uppercase">
                      होटल जांगिड़ • Gogamedi, Rajasthan
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                  Situated <strong className="text-white font-medium">400 m from Shri Goga Ji Temple</strong> and <strong className="text-white font-medium">900 m from the railway station</strong>. A quiet, honest family-run hotel managed with care by Surjeet & Vijay Jangid.
                </p>

                {/* Social & Contact Icon Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  {socialLinks.map((link) => (
                    <a
                      key={link.title}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      title={link.title}
                    >
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-8 rounded-lg border-white/15 bg-white/5 hover:bg-[#c99f5b] hover:text-[#080d17] hover:border-[#c99f5b] transition-all duration-300"
                      >
                        <link.icon className="size-4" />
                        <span className="sr-only">{link.title}</span>
                      </Button>
                    </a>
                  ))}
                  <a
                    href="tel:+919414487691"
                    className="ml-2 text-xs font-semibold text-[#dfc59e] hover:text-white transition-colors"
                  >
                    +91 94144 87691
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <div className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] border border-white/10 px-2.5 py-1 text-[11px] text-[#dfc59e]">
                    <ShieldCheck className="size-3.5 text-[#dfc59e]" />
                    <span>Government Registered</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] border border-white/10 px-2.5 py-1 text-[11px] text-amber-300">
                    <Star className="size-3 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-white">5.0</span>
                    <span className="text-gray-400">Google Rating</span>
                  </div>
                </div>
              </AnimatedContainer>

              {/* Col 1: Quick Links (2.5 cols) */}
              <AnimatedContainer delay={0.2} className="md:col-span-2 lg:col-span-2 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Quick Links
                </h3>
                <ul className="text-gray-400 space-y-2 text-xs sm:text-sm">
                  <li>
                    <a href="#rooms" className="hover:text-white transition-colors">
                      Rooms & Rates (₹1,000 / ₹1,200)
                    </a>
                  </li>
                  <li>
                    <a href="#amenities" className="hover:text-white transition-colors">
                      World-Class Amenities
                    </a>
                  </li>
                  <li>
                    <a href="#testimonials" className="hover:text-white transition-colors">
                      Gallery & Google Reviews
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/919414487691?text=Hello%20Vijay%20ji,%20I%20want%20to%20inquire%20about%20room%20availability%20at%20Hotel%20Jangid"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#dfc59e] transition-colors text-[#dfc59e] font-medium"
                    >
                      Direct WhatsApp Booking
                    </a>
                  </li>
                </ul>
              </AnimatedContainer>

              {/* Col 2: Policies & Compliance (2.5 cols) */}
              <AnimatedContainer delay={0.3} className="md:col-span-3 lg:col-span-3 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Policies & Terms
                </h3>
                <p className="text-[11px] text-gray-500">
                  Razorpay 256-bit Secure Gateway Guidelines:
                </p>
                <ul className="text-gray-400 space-y-2 text-xs sm:text-sm">
                  <li>
                    <button
                      type="button"
                      onClick={() => setModalContent('privacy')}
                      className="hover:text-[#dfc59e] text-left underline underline-offset-4 cursor-pointer transition-colors"
                    >
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setModalContent('terms')}
                      className="hover:text-[#dfc59e] text-left underline underline-offset-4 cursor-pointer transition-colors"
                    >
                      Terms & Conditions
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setModalContent('refund')}
                      className="hover:text-[#dfc59e] text-left underline underline-offset-4 cursor-pointer transition-colors"
                    >
                      Cancellation & Refund Policy
                    </button>
                  </li>
                </ul>
              </AnimatedContainer>

              {/* Col 3: Direct Host Contact (2 cols) */}
              <AnimatedContainer delay={0.4} className="md:col-span-2 lg:col-span-2 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Host Contact
                </h3>
                <ul className="text-gray-400 space-y-2 text-xs sm:text-sm">
                  <li className="text-white font-medium">
                    Vijay Jangid (Host)
                  </li>
                  <li>
                    <a href="tel:+919414487691" className="hover:text-[#dfc59e] transition-colors">
                      +91 94144 87691
                    </a>
                  </li>
                  <li className="text-gray-500 text-xs">
                    Surjeet Jangid (Founder)
                  </li>
                  <li className="text-gray-500 text-xs">
                    Gogamedi, Hanumangarh, RJ
                  </li>
                </ul>
              </AnimatedContainer>

            </div>

            {/* Bottom Copyright & Credits Line */}
            <div className="border-t border-white/10 pt-4 flex flex-col items-center justify-between gap-2 text-xs text-gray-400 md:flex-row">
              <p>© {new Date().getFullYear()} {HOTEL_INFO.name}, Gogamedi. All rights reserved.</p>
              <div className="flex items-center gap-1.5 text-gray-400">
                <span>Crafted by</span>
                <strong className="text-gray-300 font-semibold tracking-wide">Nikxlab Studio</strong>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* Razorpay Compliance Modal */}
      {modalContent && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalContent(null)}
        >
          <div
            className="bg-[#FAF8F5] text-ink-950 max-w-xl w-full max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-[#dfc59e]/30 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {modalContent === 'privacy' && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-2xl text-ink-950">Privacy Policy</h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Jangid Hotel values your privacy. Personal information collected during online booking (Name, Mobile Number, City) is strictly used for room reservations, check-in registration, and direct host-to-guest communication.
                </p>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  We never sell or share guest contact details with third parties. All online payments are handled directly by Razorpay with 256-bit SSL encryption. No banking credentials or card details are stored on our servers.
                </p>
              </div>
            )}

            {modalContent === 'terms' && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-2xl text-ink-950">Terms & Conditions</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700 list-disc pl-5">
                  <li>Standard check-in time is 12:00 PM and check-out is 11:00 AM.</li>
                  <li>Every adult guest must produce a valid government photo ID (Aadhaar Card, Voter ID, or Driving License) upon arrival.</li>
                  <li>Jangid Hotel is strictly a rooms-only property. Cooking inside rooms and illegal activities are prohibited.</li>
                  <li>Guests are kindly requested to preserve room cleanliness and hotel property.</li>
                </ul>
              </div>
            )}

            {modalContent === 'refund' && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-2xl text-ink-950">Cancellation & Refund Policy</h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  We recognize that pilgrimage and travel schedules can change:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700 list-disc pl-5">
                  <li>Cancellations requested 24 hours prior to check-in are eligible for a 90% refund processed back to the original payment source within 5–7 business days.</li>
                  <li>For cancellations made within 24 hours of check-in, dates can be rescheduled without additional fees by contacting Vijay Jangid.</li>
                  <li>For immediate support or questions regarding refunds, call +91 94144 87691.</li>
                </ul>
              </div>
            )}

            <div className="pt-5 border-t border-gray-200 mt-5 text-right">
              <Button
                onClick={() => setModalContent(null)}
                className="bg-ink-950 text-white hover:bg-ink-800 rounded-xl px-5"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
