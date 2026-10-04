'use client'

import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { motion } from "framer-motion"
import { HOTEL_INFO } from '@/data/hotelData'
import { Phone, MessageCircle } from 'lucide-react'

export const BlurredStagger = ({
  text = "Hotel Jangid Gogamedi",
}: {
  text: string;
}) => {
  const headingText = text;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.008,
      },
    },
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  return (
    <div className="w-full">
      <motion.p
        variants={container}
        initial="hidden"
        animate="show"
        className="text-sm sm:text-base leading-relaxed break-words whitespace-normal text-[#555555]"
      >
        {headingText.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            transition={{ duration: 0.25 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};

export default function FAQs() {
  const faqItems = HOTEL_INFO.faqs.map((faq, idx) => ({
    id: `item-${idx + 1}`,
    question: faq.q,
    answer: faq.a,
  }));

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#FAF8F5] text-[#111111] border-t border-[#EAE5DE]/80">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 md:grid-cols-5 md:gap-12 items-start">
          
          {/* Left Column: Heading & Contact info */}
          <div className="md:col-span-2">
            <span className="inline-block text-xs uppercase tracking-widest font-semibold text-[#B85D19] bg-[#B85D19]/10 px-3 py-1 rounded-full mb-3">
              Help & Information
            </span>
            <h2 className="text-[#111111] text-3xl sm:text-4xl font-semibold tracking-tight font-serif">
              FAQs
            </h2>
            <p className="text-[#666666] mt-3 text-balance text-base sm:text-lg leading-relaxed">
              Everything you need to know about Hotel Jangid Gogamedi
            </p>
            
            <div className="text-[#666666] mt-6 hidden md:block text-sm space-y-3">
              <p>
                Can’t find what you’re looking for? Reach out to our manager{' '}
                <a
                  href={`tel:${HOTEL_INFO.phone}`}
                  className="text-[#B85D19] font-medium hover:underline inline-flex items-center gap-1 font-mono"
                >
                  Vijay Jangid
                </a>{' '}
                for direct assistance.
              </p>
              
              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href={`tel:${HOTEL_INFO.phone}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#111111] text-white hover:bg-[#333333] transition-colors shadow-sm"
                >
                  <Phone className="w-3 h-3 text-[#E6C687]" />
                  <span>Call {HOTEL_INFO.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Vijay ji, I am visiting Gogamedi and have a question regarding rooms.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-colors shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Text-reveal accordion with Schema.org Microdata */}
          <div className="md:col-span-3">
            <Accordion
              type="single"
              collapsible
              defaultValue="item-1"
              itemScope
              itemType="https://schema.org/FAQPage"
            >
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-[#E6E1DA]"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <AccordionTrigger className="cursor-pointer text-base font-medium hover:no-underline">
                    <span itemProp="name">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      <BlurredStagger text={item.answer} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Mobile Bottom Contact */}
          <div className="text-[#666666] mt-4 md:hidden text-sm space-y-3">
            <p>
              Can't find what you're looking for? Contact manager{' '}
              <a
                href={`tel:${HOTEL_INFO.phone}`}
                className="text-[#B85D19] font-medium hover:underline"
              >
                Vijay Jangid ({HOTEL_INFO.phone})
              </a>
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${HOTEL_INFO.phone}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#111111] text-white"
              >
                <Phone className="w-3 h-3 text-[#E6C687]" />
                <span>Call Now</span>
              </a>
              <a
                href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Vijay ji, I have a question about Hotel Jangid.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#25D366] text-white"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
