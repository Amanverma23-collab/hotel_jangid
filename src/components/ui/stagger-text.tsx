'use client';
import React from "react";
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

const container = (stagger: number, delay: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const item = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.6, ease: EASE },
  },
};

export const TextAnimation = ({
  children,
  delay = 0,
  divideBy = "word",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  divideBy?: "word" | "letter";
  className?: string;
}) => {
  if (typeof children !== "string") {
    if (typeof children === "number" || typeof children === "boolean") {
      children = String(children);
    } else {
      console.warn("TextAnimation only supports plain text/string children.");
      return <>{children}</>;
    }
  }

  const text = (children as string).trim();
  const parts =
    divideBy === "letter" ? text.split("") : text.split(/\s+/);
  const stagger = divideBy === "letter" ? 0.02 : 0.04;

  return (
    <motion.span
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      style={{ display: "inline" }}
      className={className}
    >
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          <span
            className="inline-block overflow-hidden relative"
            style={{ verticalAlign: "top" }}
          >
            <motion.span
              variants={item}
              className="inline-block will-change-transform"
            >
              {divideBy === "letter"
                ? part === " "
                  ? "\u00A0"
                  : part
                : part}
            </motion.span>
          </span>
          {divideBy === "word" && i < parts.length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.span>
  );
};

export default TextAnimation;
