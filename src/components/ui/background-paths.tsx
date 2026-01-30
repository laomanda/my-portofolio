"use client";

import React from "react";
import { motion } from "framer-motion";

function FloatingPath({
    duration,
    delay,
    d,
    width = 1,
    opacity = 1
}: {
    duration: number;
    delay: number;
    d: string;
    width?: number;
    opacity?: number;
}) {
    return (
        <motion.path
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth={width}
            strokeOpacity={opacity}
            initial={{ pathLength: 0, opacity: opacity }}
            animate={{ pathLength: 1, opacity: opacity }}
            transition={{
                duration: duration,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                delay: delay,
            }}
        />
    );
}

export default function BackgroundPaths({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-transparent flex flex-col items-center justify-center">
            <div className="absolute inset-0 pointer-events-none">
                {/* SVG Container for Abstract Shapes */}
                <svg
                    className="absolute w-full h-full text-slate-950 dark:text-white scale-125"
                    viewBox="0 0 1440 900"
                    preserveAspectRatio="xMidYMid slice"
                >
                    {/* Topographic/Organic flowing lines for a 'Luxury' feel */}
                    <FloatingPath
                        duration={20}
                        delay={0}
                        d="M-200,450 C300,300 600,600 1600,450"
                        width={2}
                        opacity={0.8}
                    />
                    <FloatingPath
                        duration={25}
                        delay={2}
                        d="M-200,600 C400,450 800,800 1600,200"
                        width={1}
                        opacity={0.4}
                    />
                    <FloatingPath
                        duration={30}
                        delay={1}
                        d="M-200,250 C500,550 900,100 1600,600"
                        width={2}
                        opacity={0.3}
                    />
                    <FloatingPath
                        duration={35}
                        delay={0.5}
                        d="M-200,800 C600,600 1000,900 1600,300"
                        width={0.8}
                        opacity={0.2}
                    />
                </svg>

                {/* Subtle Gradient Glows for depth */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-light-accent/5 dark:bg-dark-accent/5 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-light-accent/5 dark:bg-dark-accent/5 blur-[120px]" />
            </div>

            <div className="relative z-10 w-full">{children}</div>
        </div>
    );
}
