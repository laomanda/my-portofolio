"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FancyTextProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  fillClassName?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
}

const FancyText = React.forwardRef<HTMLSpanElement, FancyTextProps>(
  (
    {
      text,
      children,
      className = "text-5xl font-black leading-none text-black/10 dark:text-white/10",
      fillClassName = "text-black dark:text-white",
      stagger = 0.08,
      duration = 1.4,
      delay = 0,
    },
    ref
  ) => {
    const spanRef = useRef<HTMLSpanElement>(null);
    const finalRef = (ref ?? spanRef) as React.RefObject<HTMLSpanElement>;

    const extractText = (node: React.ReactNode): string => {
      if (node === null || node === undefined || typeof node === "boolean") return "";
      if (typeof node === "string" || typeof node === "number") return String(node);
      if (Array.isArray(node)) return node.map(extractText).join("");
      if (React.isValidElement(node)) return extractText(node.props.children);
      return "";
    };

    const resolvedText = typeof text === "string" ? text : extractText(children);
    const chars = resolvedText.split("");
    const [hideBase, setHideBase] = useState(false);
    const [isSmall, setIsSmall] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useLayoutEffect(() => {
      if (!finalRef.current) return;
      const size = parseFloat(getComputedStyle(finalRef.current).fontSize);
      setIsSmall(size < 28);
    }, [finalRef]);

    useEffect(() => {
      if (typeof window === "undefined") return;
      // @ts-ignore
      if (window.preloaderDone) {
        setIsReady(true);
        return;
      }

      const handleReady = () => setIsReady(true);
      window.addEventListener("preloader:done", handleReady);
      return () => window.removeEventListener("preloader:done", handleReady);
    }, []);

    return (
      <span ref={finalRef} className="relative inline-block">
        <span
          className={cn(className)}
          style={{ opacity: hideBase && isSmall ? 0 : 1 }}
        >
          {resolvedText}
        </span>

        <span className="absolute inset-0 flex overflow-hidden">
          {chars.map((char, i) => (
            <motion.span
              key={i}
              className={cn(className, fillClassName)}
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={
                isReady
                  ? { clipPath: "inset(0% 0% 0% 0%)" }
                  : { clipPath: "inset(100% 0% 0% 0%)" }
              }
              transition={{
                duration,
                delay: isReady ? delay + i * stagger : 0,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onAnimationComplete={() => {
                if (isReady && i === chars.length - 1 && isSmall) setHideBase(true);
              }}
              style={{
                display: "inline-block",
                whiteSpace: char === " " ? "pre" : "normal",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </span>
      </span>
    );
  }
);

FancyText.displayName = "FancyText";
export { FancyText };
