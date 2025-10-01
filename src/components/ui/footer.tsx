import { motion } from 'framer-motion';
import { Github, Twitter, Globe, Mail, MapPin, Phone, ArrowUp, Heart, Zap, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpaceLogo from '@/assets/SpaceLogo';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    // GSAP animations for footer elements
    gsap.fromTo(".footer-section",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        }
      }
    );

    // Logo rotation animation
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1
      });
    }

    // Social icons hover animation
    gsap.to(".social-icon", {
      scale: 1.1,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.3
    });

  }, []);
  return (
    <footer ref={footerRef} className="relative bg-transparent text-white overflow-hidden" style={{ position: 'relative' }}>
      {/* Enhanced background with cosmic effects */}
      <div className="absolute inset-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-purple-900/10 to-transparent"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer content */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Enhanced Logo & Description */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="footer-section md:col-span-2"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div ref={logoRef} className="relative">
                <SpaceLogo size={48} className="drop-shadow-lg" />
                <div className="absolute -inset-2 bg-red-500/20 rounded-2xl blur-xl opacity-50"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent">Cosmic Lumina</h3>
                <div className="text-gray-400 text-sm">Lightning Web Animations</div>
              </div>
            </div>
            
            <div className="text-gray-300 mb-8 max-w-md leading-relaxed">
              Illuminating the future with cutting-edge web animations. 
              Built with modern technologies for developers who appreciate 
              <span className="text-red-400 font-semibold"> cosmic craftsmanship</span>.
            </div>
            
            {/* Enhanced social links */}
            <div className="flex space-x-4 mb-6">
              {[
                { icon: Github, label: 'GitHub', color: 'from-gray-400 to-gray-600' },
                { icon: Twitter, label: 'Twitter', color: 'from-blue-400 to-blue-600' },
                { icon: Globe, label: 'Website', color: 'from-green-400 to-green-600' },
                { icon: Mail, label: 'Email', color: 'from-red-400 to-pink-600' },
              ].map((social) => (
                <motion.button
                  key={social.label}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`social-icon group relative w-12 h-12 bg-white/5 backdrop-blur-md rounded-xl border border-red-500/20 flex items-center justify-center hover:border-red-400/50 transition-all duration-300`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.color} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  <social.icon className="w-5 h-5 relative z-10 group-hover:text-red-300 transition-colors duration-300" />
                </motion.button>
              ))}
            </div>
            
            {/* Newsletter signup */}
            <div className="space-y-3">
              <div className="text-sm text-gray-400">Stay updated with cosmic news</div>
              <div className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-white/5 border border-red-500/20 rounded-lg focus:border-red-400/50 focus:outline-none text-white placeholder-gray-400 transition-colors duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Navigation Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="footer-section"
          >
            <h4 className="font-semibold mb-6 text-lg flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-red-400" />
              <span>Quick Links</span>
            </h4>
            <div className="space-y-4">
              {[
                { name: 'Home', desc: 'Back to start' },
                { name: 'Features', desc: 'Explore capabilities' },
                { name: 'Documentation', desc: 'Learn & build' },
                { name: 'Examples', desc: 'See it in action' }
              ].map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ x: 5 }}
                  className="group block text-left transition-all duration-300"
                >
                  <div className="text-gray-300 group-hover:text-red-400 font-medium transition-colors duration-300">{item.name}</div>
                  <div className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors duration-300">{item.desc}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Resources */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="footer-section"
          >
            <h4 className="font-semibold mb-6 text-lg flex items-center space-x-2">
              <Heart className="w-5 h-5 text-pink-400" />
              <span>Resources</span>
            </h4>
            <div className="space-y-4">
              {[
                { name: 'GitHub Repository', desc: 'Open source code' },
                { name: 'API Reference', desc: 'Technical docs' },
                { name: 'Tutorials', desc: 'Step by step' },
                { name: 'Community', desc: 'Join discussions' }
              ].map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ x: 5 }}
                  className="group block text-left transition-all duration-300"
                >
                  <div className="text-gray-300 group-hover:text-pink-400 font-medium transition-colors duration-300">{item.name}</div>
                  <div className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors duration-300">{item.desc}</div>
                </motion.button>
              ))}
            </div>
            
            {/* Contact info */}
            <div className="mt-8 pt-6 border-t border-red-500/20">
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Phone className="w-4 h-4 text-red-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Mail className="w-4 h-4 text-red-400" />
                  <span>hello@cosmic-lumina.dev</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Bottom Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="footer-section relative"
        >
          {/* Decorative border */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/40 via-pink-500/40 to-transparent mb-8"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-center pt-8 space-y-6 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="text-gray-400 text-sm flex items-center space-x-2">
                <span>© 2024 Cosmic Lumina. Crafted with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-red-400 fill-current" />
                </motion.div>
                <span>and lightning</span>
                <Zap className="w-4 h-4 text-yellow-400" />
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-300 relative group"
                >
                  Privacy Policy
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-red-400 group-hover:w-full transition-all duration-300"></div>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-300 relative group"
                >
                  Terms of Service
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-red-400 group-hover:w-full transition-all duration-300"></div>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-300 relative group"
                >
                  Cookies
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-red-400 group-hover:w-full transition-all duration-300"></div>
                </motion.button>
              </div>
            </div>
            
            {/* Back to top button */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center space-x-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full hover:bg-red-500/20 transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4 text-red-400 group-hover:-translate-y-1 transition-transform duration-300" />
              <span className="text-red-400 text-sm font-medium">Back to Top</span>
            </motion.button>
          </div>
          
          {/* Additional branding */}
          <div className="text-center mt-8 pt-6 border-t border-red-500/10">
            <div className="text-gray-500 text-xs">
              Powered by cosmic energy and modern web technologies • Built for the future of web animation
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};