'use client'

import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { motion } from "framer-motion"
import { HOTEL_INFO } from '@/data/hotelData'

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

  // Split into 2 columns so 2 FAQs appear per row on desktop
  const col1 = faqItems.filter((_, idx) => idx % 2 === 0);
  const col2 = faqItems.filter((_, idx) => idx % 2 === 1);

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#FAF8F5] text-[#111111] border-t border-[#EAE5DE]/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Top Header: Just "FAQs" */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-[#111111] text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight font-serif">
            FAQs
          </h2>
        </div>

        {/* 2 FAQs Per Row (2 Columns) */}
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-0 items-start"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          {/* Column 1 (Left FAQ in each row) */}
          <div className="space-y-0">
            {col1.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-[#E6E1DA]"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <AccordionTrigger className="cursor-pointer text-base sm:text-lg font-medium hover:no-underline py-4 sm:py-5">
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
          </div>

          {/* Column 2 (Right FAQ in each row) */}
          <div className="space-y-0">
            {col2.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-[#E6E1DA]"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <AccordionTrigger className="cursor-pointer text-base sm:text-lg font-medium hover:no-underline py-4 sm:py-5">
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
          </div>
        </Accordion>

      </div>
    </section>
  );
}
