import { HeroSection, Lightning } from "@/components/ui/hero-odyssey";
import { FeaturesSection } from "@/components/ui/features-section";
import { ZoomParallaxSection } from "@/components/ui/zoom-parallax-section";
import { TechShowcase } from "@/components/ui/tech-showcase";
import { CTASection } from "@/components/ui/cta-section";
import { Footer } from "@/components/ui/footer";
import CosmicGlobeFeature from "@/components/globe-feature-section";
import { Timeline } from "@/components/ui/timeline";
import { useEffect } from "react";
import { initSmoothScroll } from "@/lib/smoothScroll";
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Users, Zap, Award, ArrowDown, Sparkles } from 'lucide-react';
import Skiper19 from "@/components/ui/skiper19-section";
import HeroScrollDemo from "@/components/ui/container-scroll-animation-demo";
import Skiper31 from "@/components/ui/skiper31-section";
import CircularGallery from "@/components/CircularGallery";



gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Initialize Lenis smooth scrolling with enhanced settings for parallax
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Initialize GSAP smooth scrolling
    const smoother = initSmoothScroll();

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      if (smoother) {
        smoother.kill();
      }
    };
  }, []);

  // Cosmic-themed images for simple zoom parallax
  const parallaxImages = [
    {
      src: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Red cosmic nebula',
    },
    {
      src: 'https://images.unsplash.com/photo-1614850523060-8da1d0b302f7?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Purple galaxy formation',
    },
    {
      src: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Mars red planet surface',
    },
    {
      src: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Starfield constellation',
    },
    {
      src: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Pink space aurora',
    },
    {
      src: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Cosmic explosion',
    },
    {
      src: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Deep space galaxy',
    },
  ];

  return (
    <div id="smooth-wrapper" className="relative min-h-screen bg-black text-white overflow-hidden" style={{ position: 'relative' }}>
      <div id="smooth-content" style={{ position: 'relative' }}>
        {/* Clean background for other sections - no lightning */}
        <div className="fixed inset-0 z-0 bg-black">
        </div>

        {/* Content sections - all flowing together with seamless transitions */}
        <div className="relative z-10">
          <div className="hero-section">
            <HeroSection />
          </div>
          <div className="features-section -mt-16">
            <FeaturesSection />
          </div>
          {/* about section  */}
          <div className="globe-feature-section -mt-0">
            <div className="max-w-7xl mx-auto px-4 mt- mb-0">
              <CosmicGlobeFeature />
            </div>
          </div>
          {/* Add the Skiper19 section here
          <div className="skiper19-section -mt-20">
            <Skiper19 />
          </div> */}
          <div className="HeroScrollDemo ">
            <HeroScrollDemo />
          </div>
          {/* <div className="skiper31-section ">
            <Skiper31 />
          </div> */}
          <div>
            
          </div>
          <div className="circularGallery-section -mt-20 mb-20 flex flex-col overflow-hidden w-ful">
            <h1 className="text-4xl font-semibold text-white text-center">
              Explore Through the <br />
              <span className="block text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Cosmic Gallery
              </span>
            </h1>
            <div className="h-[100vh]"> {/* Reduced height from 70vh to 50vh */}
              <CircularGallery />
            </div>
          </div>
          <div className="cta-section mt-0">
            <CTASection />
          </div>
          <div className="footer-section mt-">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;