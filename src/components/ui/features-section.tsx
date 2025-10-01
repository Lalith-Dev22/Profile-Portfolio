import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Zap, Globe } from 'lucide-react';
import { createFadeInAnimation, createStaggerAnimation } from '@/lib/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Code,
    title: 'Pure Code Animation',
    description: 'Lightning effects generated entirely with WebGL shaders and mathematical functions. No external assets needed.',
  },
  {
    icon: Palette,
    title: 'Customizable Design',
    description: 'Adjust hue, intensity, speed, and size in real-time. Create your perfect lightning aesthetic.',
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: 'GPU-accelerated rendering ensures smooth 60fps animations even on complex patterns.',
  },
  {
    icon: Globe,
    title: 'Modern Tech Stack',
    description: 'Built with React, Framer Motion, and Tailwind CSS for a cutting-edge development experience.',
  },
];

export const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Enhanced entrance animations for section heading
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { 
          opacity: 0, 
          y: 30,
          filter: "blur(5px)"
        },
        { 
          opacity: 1, 
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Subtitle animation
    if (subtitleRef.current) {
      gsap.fromTo(subtitleRef.current,
        { 
          opacity: 0, 
          y: 20
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Enhanced GSAP animations for the features section
    const featureCards = gsap.utils.toArray('.feature-card') as HTMLElement[];
    
    // Stagger animation for feature cards with enhanced effects
    featureCards.forEach((card, index) => {
      if (card) {
        // Initial state
        gsap.set(card, { 
          opacity: 0, 
          y: 40,
          scale: 0.9
        });

        // Entrance animation
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });

    // Add hover animations for feature cards
    featureCards.forEach((card) => {
      if (card) {
        const icon = card.querySelector('.feature-icon');
        const title = card.querySelector('.feature-title');
        const description = card.querySelector('.feature-description');
        
        const tl = gsap.timeline({ paused: true });
        
        tl.to(icon, { 
          scale: 1.15, 
          duration: 0.4, 
          ease: "back.out(1.7)" 
        })
        .to(title, { 
          color: "#ffffff", 
          duration: 0.3 
        }, 0)
        .to(description, { 
          color: "#d1d5db", 
          duration: 0.3 
        }, 0)
        .to(card, {
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out"
        }, 0);
        
        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());
      }
    });

    // Handle window focus/blur events to refresh ScrollTrigger
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    };

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      featureCards.forEach((card) => {
        if (card) {
          card.removeEventListener('mouseenter', () => {});
          card.removeEventListener('mouseleave', () => {});
        }
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-transparent text-white py-24">
      {/* Completely remove lightning background for full transparency */}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-6">
          <h2 className="text-4xl md:text-6xl font-light mb-0">
            Features That
            <span className="bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent"> Illuminate</span>
          </h2>
        </div>
        <motion.p
          ref={subtitleRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-400 text-lg max-w-3xl mx-auto mb-16"
        >
          Discover the cutting-edge technologies powering our lightning animation system
        </motion.p>

        <div 
          ref={featureCardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card group relative"
            >
              <div className="relative p-8 bg-white/5 rounded-2xl border border-red-500/20 hover:bg-white/10 transition-all duration-300">
                {/* Glow effect - removed blur */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="feature-icon w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="feature-title text-xl font-semibold mb-4 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="feature-description text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};