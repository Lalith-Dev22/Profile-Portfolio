'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ZoomParallax } from './simple-zoom-parallax';

gsap.registerPlugin(ScrollTrigger);

export const ZoomParallaxSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // GSAP smooth entrance animation with ScrollTrigger
    gsap.fromTo(sectionRef.current, 
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Cosmic-themed images that match your project
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1614850523060-8da1d0b302f7?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Red cosmic nebula with stellar formation',
    },
    {
      src: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Crimson galaxy spiral arms',
    },
    {
      src: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Mars red planet surface',
    },
    {
      src: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Red cosmic energy center',
    },
    {
      src: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Red starfield constellation',
    },
    {
      src: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Crimson space aurora',
    },
    {
      src: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Red cosmic explosion',
    },
  ];

  return (
    <section ref={sectionRef} className="relative bg-transparent text-white">
      {/* Introduction section with smooth GSAP animations */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-light mb-6"
          >
            Cosmic
            <span className="bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent"> Journey</span>
          </motion.h2>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg max-w-3xl mx-auto mb-8"
          >
            Dive into an immersive parallax scrolling experience that transforms your perspective as you explore the depths of space
          </motion.p>
        </div>
      </div>

      {/* Zoom Parallax Effect with GSAP enhanced smooth scrolling */}
      <div className="relative z-20">
        <ZoomParallax images={images} />
      </div>
    </section>
  );
};