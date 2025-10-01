import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightning } from './hero-odyssey';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  {
    name: 'React',
    description: 'Component-based architecture',
    color: 'from-red-400 to-pink-600',
    features: ['Virtual DOM', 'Hooks', 'State Management', 'Component Lifecycle'],
  },
  {
    name: 'Framer Motion',
    description: 'Production-ready animations',
    color: 'from-pink-400 to-red-600',
    features: ['Gesture Animations', 'Layout Animations', 'Drag & Drop', 'SVG Animations'],
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first styling',
    color: 'from-red-500 to-pink-500',
    features: ['Responsive Design', 'Dark Mode', 'Custom Components', 'JIT Compilation'],
  },
  {
    name: 'WebGL Shaders',
    description: 'GPU-accelerated graphics',
    color: 'from-pink-500 to-red-500',
    features: ['Fragment Shaders', 'Vertex Processing', 'Real-time Rendering', 'Math Functions'],
  },
];

export const TechShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const lightningRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lightningRef.current) return;

    // GSAP ScrollTrigger for lightning entrance
    gsap.fromTo(lightningRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    // Tech stack cards animation
    gsap.fromTo(".tech-card",
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      }
    );

    // Feature details animation
    gsap.fromTo(".feature-detail",
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      }
    );

  }, []);

  return (
    <section ref={sectionRef} className="relative bg-transparent text-white py-24">
      {/* Completely remove lightning background for full transparency */}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-light mb-4">
            Technology
            <span className="bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent"> Stack</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Built with modern web technologies for maximum performance and developer experience
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Tech Stack Cards */}
          <div className="space-y-4">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                onClick={() => setActiveIndex(index)}
                className={`tech-card p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-white/10 border-2 border-red-500/30'
                    : 'bg-white/5 border border-white/10 hover:bg-white/8'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${tech.color}`}></div>
                  <div>
                    <h3 className="text-xl font-semibold">{tech.name}</h3>
                    <p className="text-gray-400 text-sm">{tech.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Details */}
          <div className="feature-detail bg-white/5 rounded-2xl p-8 border border-red-500/20">
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${techStack[activeIndex].color} text-white mb-6`}>
              {techStack[activeIndex].name}
            </div>
            
            <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
            
            <div className="space-y-3">
              {techStack[activeIndex].features.map((feature, idx) => (
                <motion.div
                  key={feature}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${techStack[activeIndex].color}`}></div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};