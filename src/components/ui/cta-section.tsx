import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Github, ExternalLink, Download, Star, Award, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Enhanced GSAP animations for CTA section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 30%",
      }
    });

    // Buttons animation with enhanced effects
    if (buttonsRef.current) {
      gsap.fromTo(buttonsRef.current.children,
        { y: 80, opacity: 0, scale: 0.8, rotateX: 45 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: "top 85%",
          }
        }
      );
    }

    // Stats animation with bounce effect
    if (statsRef.current) {
      gsap.fromTo(".stat-item",
        { scale: 0, opacity: 0, rotateY: 180 },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          }
        }
      );
    }

    // Floating particles animation
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      gsap.to(particles, {
        y: "-=20",
        x: "+=10",
        rotation: 360,
        duration: 4,
        ease: "none",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.5,
          from: "random"
        }
      });
    }

    // Continuous glow animation - only if elements exist
    const glowElements = document.querySelectorAll(".cta-glow");
    if (glowElements.length > 0) {
      gsap.to(glowElements, {
        scale: 1.1,
        opacity: 0.8,
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
    }

  }, []);

  return (
    <section ref={sectionRef} className="relative bg-transparent text-white py-32 overflow-hidden" style={{ position: 'relative' }}>
      {/* Subtle premium background */}
      <div className="absolute inset-0">
        {/* Elegant gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 via-black to-purple-900/5"></div>
        
        {/* Minimal decorative elements */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Sophisticated border lines */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium header section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Star className="w-8 h-8 text-red-400" />
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg"></div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-light mb-8 leading-tight">
            Ready to Build
            <span className="block bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent font-medium mt-2">
              Something Extraordinary?
            </span>
          </h2>
          
          <div className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
            Join the elite community of developers creating next-generation web experiences
          </div>
          
          <div className="text-lg text-gray-400 max-w-2xl mx-auto">
            Professional-grade animations with enterprise-level performance
          </div>
        </motion.div>

        {/* Premium buttons with sophisticated design */}
        <div ref={buttonsRef} className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-20">
          <motion.button
            whileHover={{ 
              scale: 1.02, 
              boxShadow: "0 10px 30px rgba(239, 68, 68, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-12 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-medium text-lg overflow-hidden transition-all duration-300"
          >
            <div className="relative flex items-center space-x-3">
              <Star className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Start Building</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              borderColor: "rgba(239, 68, 68, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-12 py-4 bg-white/5 backdrop-blur-sm rounded-lg border border-red-500/20 font-medium text-lg transition-all duration-300"
          >
            <div className="relative flex items-center space-x-3">
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>View Source</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </motion.button>

          <motion.button
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "rgba(100, 100, 100, 0.1)",
              borderColor: "rgba(156, 163, 175, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-12 py-4 bg-gray-500/5 backdrop-blur-sm rounded-lg border border-gray-500/20 font-medium text-lg transition-all duration-300"
          >
            <div className="relative flex items-center space-x-3">
              <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
              <span>Documentation</span>
            </div>
          </motion.button>
        </div>

        {/* Premium Stats with refined design */}
        <div ref={statsRef} className="grid grid-cols-3 gap-8 pt-20 mt-20">
          {[
            { icon: TrendingUp, number: '99.9%', label: 'Performance Score', color: 'from-red-400 to-red-600' },
            { icon: Star, number: '60fps', label: 'Smooth Animations', color: 'from-red-400 to-red-600' },
            { icon: Award, number: '∞', label: 'Creative Possibilities', color: 'from-red-400 to-red-600' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item group relative"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="relative p-8 bg-white/3 rounded-2xl border border-red-500/15 backdrop-blur-sm hover:bg-white/5 transition-all duration-500">
                {/* Subtle glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                
                <div className="relative text-center">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-red-400" />
                  </div>
                  
                  {/* Number */}
                  <div className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-3">
                    {stat.number}
                  </div>
                  
                  {/* Label */}
                  <div className="text-gray-300 font-medium text-sm">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Refined trust indicators */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-red-500/10"
        >
          <p className="text-gray-400 mb-8 text-base">Trusted by development teams worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {['Enterprise Ready', 'Production Tested', '24/7 Support', 'Open Source'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-red-500/5 rounded-lg border border-red-500/10 text-red-300/80 font-medium text-sm"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};