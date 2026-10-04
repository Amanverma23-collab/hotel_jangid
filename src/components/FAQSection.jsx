import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-sand-100 text-ink-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-terracotta-600 bg-terracotta-50 px-3.5 py-1 rounded-full border border-terracotta-200/60 mb-3">
            Clear Policies & Contact
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-950 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-600 leading-relaxed">
            Essential guidelines and straightforward answers before your pilgrimage to Gogamedi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* FAQ Accordion (Left Column) with HTML5 Microdata */}
          <div className="lg:col-span-7 space-y-3.5" itemScope itemType="https://schema.org/FAQPage">
            {HOTEL_INFO.faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-sand-300 overflow-hidden shadow-sm transition-all duration-200"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-ink-950 hover:text-terracotta-600 transition-colors cursor-pointer"
                  >
                    <span itemProp="name">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-ink-500 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-terracotta-600' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                      >
                        <div
                          itemProp="text"
                          className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-ink-600 leading-relaxed border-t border-sand-100"
                        >
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Contact Card (Right Column) */}
          <div className="lg:col-span-5 bg-sand-50 rounded-3xl p-6 sm:p-7 border border-sand-300 shadow-warm-md space-y-5">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-terracotta-600 block mb-1">
                Direct Helpdesk
              </span>
              <h3 className="font-serif text-2xl font-bold text-ink-950">
                Contact Jangid Hotel
              </h3>
              <p className="text-xs text-ink-600 mt-1">
                Reach out for road directions, early check-in, or group room bookings.
              </p>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-ink-800">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-sand-200">
                <MapPin className="w-4 h-4 text-terracotta-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-ink-950 font-semibold">Address:</strong>
                  <span className="text-xs text-ink-600 leading-relaxed block mt-0.5">
                    {HOTEL_INFO.address}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-sand-200">
                <Phone className="w-4 h-4 text-terracotta-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-ink-950 font-semibold">Front Desk Phone:</strong>
                  <a
                    href={`tel:${HOTEL_INFO.phone}`}
                    className="text-xs font-mono font-bold text-terracotta-600 hover:underline block mt-0.5"
                  >
                    {HOTEL_INFO.phone} (Vijay Jangid)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-sand-200">
                <Clock className="w-4 h-4 text-terracotta-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-ink-950 font-semibold">Reception Hours:</strong>
                  <span className="text-xs text-ink-600 block mt-0.5">
                    24x7 guest check-in & assistance
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="pt-1 flex flex-col gap-2.5">
              <a
                href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Vijay ji, I am planning a visit to Gogamedi and have a question regarding rooms.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={HOTEL_INFO.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sand-200 hover:bg-sand-300 text-ink-900 font-semibold text-xs sm:text-sm transition-colors active:scale-98"
              >
                <MapPin className="w-4 h-4 text-terracotta-600" />
                <span>Open in Google Maps (GPS)</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
