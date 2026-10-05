import React from 'react';
import { motion } from 'framer-motion';
import { Flame, CheckCircle2 } from 'lucide-react';

export default function TempleSection() {
  return (
    <section id="about-temple" className="py-20 md:py-32 bg-sand-50 text-ink-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Respectful Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-5"
          >
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-saffron-600 bg-saffron-50 px-3.5 py-1 rounded-full border border-saffron-200">
              <Flame className="w-3.5 h-3.5 text-saffron-500 fill-current" />
              <span>Sacred Gogamedi Dham</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-950 tracking-tight leading-tight">
              The Holy Samadhi of Shri Goga Ji Maharaj
            </h2>

            <p className="text-sm sm:text-base text-ink-700 leading-relaxed">
              Gogamedi is an ancient pilgrimage town in Rajasthan's Hanumangarh district. Folk deity Shri Goga Ji Maharaj (Jahir Veer Gogaji) is deeply revered across Northern India—drawing devotees from Rajasthan, Haryana, Punjab, Uttar Pradesh, Delhi, and Gujarat.
            </p>

            <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
              During the annual Bhadrapada fair (Goga Navami), the town fills with sacred flags (Nishan) and songs of devotion. Having a quiet, clean, and respectful place to stay just minutes from the temple lets families rest peacefully after long darshan lines.
            </p>

            {/* Quick Pilgrim Checklist */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-medium text-ink-800">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-sand-100/70 border border-sand-200">
                <CheckCircle2 className="w-4 h-4 text-terracotta-600 shrink-0" />
                <span>5-minute walk back after Darshan</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-sand-100/70 border border-sand-200">
                <CheckCircle2 className="w-4 h-4 text-terracotta-600 shrink-0" />
                <span>Hot water for morning bath</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-sand-100/70 border border-sand-200">
                <CheckCircle2 className="w-4 h-4 text-terracotta-600 shrink-0" />
                <span>Safe environment for families</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-sand-100/70 border border-sand-200">
                <CheckCircle2 className="w-4 h-4 text-terracotta-600 shrink-0" />
                <span>Private on-site car parking</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Real Temple Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-warm-lg border border-sand-300 group">
              <img
                src="/images/gogamedi-temple.jpg"
                alt="Shri Gogaji Maharaj Mandir, Gogamedi Temple"
                loading="lazy"
                decoding="async"
                className="w-full h-[380px] sm:h-[450px] object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent pointer-events-none" />
              
              {/* Badge overlay on image */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] uppercase font-semibold tracking-wider text-saffron-300">
                  Temple Darshan Schedule
                </span>
                <p className="font-serif text-base sm:text-lg font-bold text-sand-50">
                  Mangla Aarti: 4:30 AM • Shayan Aarti: 10:00 PM
                </p>
                <p className="text-xs text-sand-200/90 mt-0.5">
                  Located 400 m straight walk from Jangid Hotel
                </p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
