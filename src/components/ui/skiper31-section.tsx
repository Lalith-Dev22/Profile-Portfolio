"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";

  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );

  // Add unique animation for each character
  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [Math.abs(distanceFromCenter) * 20, 0],
  );

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.2, 0.7, 1]);

  return (
    <motion.span
      className={cn("inline-block text-pink-500", isSpace && "w-8")}
      style={{
        x,
        rotateX,
        y,
        scale,
        opacity,
        textShadow: "0 0 10px rgba(236, 72, 153, 0.7), 0 0 20px rgba(192, 132, 252, 0.5)",
      }}
    >
      {char}
    </motion.span>
  );
};

const Skiper31 = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const text = "EXPLORE COSMIC";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  return (
    <ReactLenis root>
      <main className="w-full bg-black mt-[-200px]">
        <div
          ref={targetRef}
          className="relative box-border flex h-[150vh] items-center justify-center gap-[2vw] overflow-hidden bg-black p-[2vw]"
        >
          <div
            className="font-jakarta-sans w-full max-w-7xl text-center text-9xl font-black uppercase tracking-tighter"
            style={{
              perspective: "1000px",
            }}
          >
            {characters.map((char, index) => (
              <CharacterV1
                key={index}
                char={char}
                index={index}
                centerIndex={centerIndex}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
        
        {/* Add decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-pink-500 rounded-full animate-ping"></div>
      </main>
    </ReactLenis>
  );
};

export { CharacterV1, Skiper31 };

/**
 * Skiper 31 ScrollAnimation_002 — React + framer motion + lenis
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */

export default Skiper31;