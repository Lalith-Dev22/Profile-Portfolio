import React, { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Preload the video
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Set initial clip path
    gsap.set(containerRef.current, {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    // Animate clip path on scroll
    gsap.from(containerRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });

    // Text contrast and animation on scroll
    if (textContentRef.current && headingRef.current) {
      // Initial state - text more visible
      gsap.set([textContentRef.current, headingRef.current], {
        color: "#ffffff",
        textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
      });

      // Animate text contrast on scroll
      gsap.to([textContentRef.current, headingRef.current], {
        color: "#000000",
        textShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
    }
  });

  // Using a placeholder video URL - replace with your actual video
  const videoSource = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <section id="video-section" className="relative w-screen h-dvh overflow-x-hidden">
      <div
        ref={containerRef}
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src={videoSource}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center opacity-80"
          />
        </div>
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
        
        <div className="absolute left-0 top-0 z-40 size-full flex flex-col justify-center items-start px-5 sm:px-10 md:px-20">
          <h1 
            ref={headingRef}
            className="special-font hero-heading text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white mb-4 tracking-tight"
          >
            cosmic <b className="text-pink-500">v</b>ision
          </h1>
          <div ref={textContentRef} className="max-w-2xl">
            <p className="mb-8 font-sans text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-bold w-fit flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg shadow-pink-500/30"
            >
              <ArrowRight className="text-xl" />
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>
      
      {/* Duplicate heading for contrast at the bottom */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black opacity-20 text-4xl md:text-5xl">
        C<b className="text-pink-500/30">O</b>SMIC
      </h1>
    </section>
  );
};

export default VideoSection;