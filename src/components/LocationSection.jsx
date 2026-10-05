import React from 'react';
import { motion } from 'framer-motion';
import { Train, Hotel, Landmark, MapPin, ExternalLink, Navigation } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export default function LocationSection() {
  return (
    <section id="location" className="py-20 md:py-32 bg-sand-100 text-ink-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-terracotta-600 bg-terracotta-50 px-3.5 py-1 rounded-full border border-terracotta-200/60 mb-3">
            Location Advantage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-950 tracking-tight leading-tight">
            How Far is Hotel Jangid? 400m to Temple, 900m to Station
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-600 leading-relaxed">
            The hotel's location is its greatest advantage. An easy 5-minute walk along a direct road gets you to the temple gates, making it effortless for elderly relatives and young children.
          </p>
        </div>

        {/* Route Line Graphic */}
        <div className="bg-sand-50 rounded-3xl p-6 sm:p-9 shadow-warm-md border border-sand-300/80 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative items-center">
            
            {/* Step 1: Railway Station */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-sand-200 shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-sand-200 text-ink-800 flex items-center justify-center mb-3">
                <Train className="w-6 h-6 text-ink-700" />
              </div>
              <h3 className="font-serif font-bold text-lg text-ink-950">Gogamedi Railway Station</h3>
              <p className="text-xs text-ink-500 mt-1">Arrival point for express & local trains</p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-100 text-xs font-semibold text-ink-700">
                <span>E-Rickshaw: ~3 mins</span>
              </div>
            </motion.div>

            {/* Middle Step: Hotel Jangid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-terracotta-50/70 border-2 border-terracotta-500/40 relative shadow-warm-sm"
            >
              <span className="absolute -top-3 px-3 py-0.5 rounded-full bg-terracotta-500 text-white text-[10px] font-bold tracking-wider uppercase">
                Your Stay
              </span>
              <div className="w-14 h-14 rounded-2xl bg-terracotta-500 text-white flex items-center justify-center mb-3 shadow-md">
                <Hotel className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-xl text-ink-950">Hotel Jangid</h3>
              <p className="text-xs text-ink-600 mt-1">Jamal - Gogamedi Rd, near Mandir turn</p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-terracotta-500 text-white text-xs font-bold shadow-sm">
                <span>23 Rooms • Open Car Parking</span>
              </div>
            </motion.div>

            {/* Step 3: Shri Goga Ji Mandir */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-sand-200 shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-saffron-50 border border-saffron-200 text-saffron-600 flex items-center justify-center mb-3">
                <Landmark className="w-6 h-6 text-saffron-600" />
              </div>
              <h3 className="font-serif font-bold text-lg text-ink-950">Shri Goga Ji Temple</h3>
              <p className="text-xs text-ink-500 mt-1">Sacred Samadhi shrine & Darshan chowk</p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-100 text-xs font-semibold text-saffron-800">
                <span>Walk: Just 5 minutes</span>
              </div>
            </motion.div>

          </div>

          {/* Distances Ribbon */}
          <div className="mt-7 pt-5 border-t border-sand-200/90 flex flex-wrap items-center justify-around gap-4 text-center">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-medium text-ink-500">Station to Hotel:</span>
              <span className="font-serif text-lg font-bold text-ink-900">900 meters</span>
            </div>
            <div className="hidden sm:block text-sand-400">───</div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-medium text-terracotta-600">Hotel to Temple:</span>
              <span className="font-serif text-2xl font-bold text-terracotta-600">400 meters</span>
            </div>
          </div>
        </div>

        {/* Real 3D Aerial Route Map Photo Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-sand-300 shadow-warm-sm">
          <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-sand-200 group relative">
            <img
              src="/images/route-map-400m.jpg"
              alt="Hotel Jangid to Shri Goga Ji Temple 400m Route Map"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute bottom-3 left-3 bg-ink-950/80 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-medium">
              Authentic 3D Aerial Route Map (400 m)
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-terracotta-600">
              <MapPin className="w-3.5 h-3.5" />
              <span>Straightforward Access</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950 leading-snug">
              Direct Route to the Temple Gates
            </h3>
            <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
              Hotel Jangid sits directly on the Jamal-Gogamedi Road. The temple turn point is a quick 350-meter stroll, opening right into the main temple entrance courtyard.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-ink-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 mt-2 shrink-0" />
                <span><strong>Morning Aarti:</strong> Walk to the 4:30 AM Mangla Aarti in under 5 minutes without needing a vehicle.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 mt-2 shrink-0" />
                <span><strong>Wide road access:</strong> Easy approach for private cars and taxis right up to our parking gate.</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={HOTEL_INFO.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-ink-900 hover:bg-ink-800 text-white text-xs sm:text-sm font-semibold transition-colors duration-150 active:scale-95 shadow-sm"
              >
                <Navigation className="w-4 h-4 text-saffron-400" />
                <span>Get Google Maps Directions (GPS)</span>
                <ExternalLink className="w-3.5 h-3.5 text-sand-300 ml-1" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
