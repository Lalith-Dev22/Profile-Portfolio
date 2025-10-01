'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Rocket, Zap, Globe, Code, Palette, ChevronDown } from 'lucide-react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

gsap.registerPlugin(ScrollTrigger);

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContent;
}

const cosmicMediaContent: MediaContentCollection = {
  video: {
    src: 'https://videos.pexels.com/video-files/5752729/5752729-uhd_2560_1440_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',  
    background: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1920&h=1080&fit=crop&crop=entropy&auto=format&q=80',
    title: 'Cosmic Lumina Experience',
    date: 'Journey Beyond',
    scrollToExpand: 'Scroll to Expand Universe',
    about: {
      overview:
        'Experience the vastness of space through this immersive video journey. As you scroll, watch the cosmic realm expand before your eyes, revealing the infinite beauty of nebulae, stars, and distant galaxies that inspire our Cosmic Lumina experience.',
      conclusion:
        'The ScrollExpandMedia component transforms how we experience cosmic content, creating an interactive journey that mirrors the expansive nature of the universe itself. Perfect for showcasing the infinite possibilities of space exploration.',
    },
  },
};

// Feature Card Component with enhanced design
const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-gray-900/70 to-black/70 p-8 rounded-3xl border border-pink-500/30 backdrop-blur-lg hover:border-pink-500/60 transition-all duration-500 overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-lg"></div>
      
      <div className="relative z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-pink-500/20">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-300 transition-colors duration-300">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

// Stats Card Component with enhanced design
const StatsCard = ({ value, label }: { value: string, label: string }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="relative bg-gradient-to-br from-gray-900/70 to-black/70 p-8 rounded-3xl border border-purple-500/30 backdrop-blur-lg hover:border-purple-500/60 transition-all duration-500 overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-0 hover:opacity-20 transition-opacity duration-500 blur-lg"></div>
      
      <div className="relative z-10 text-center">
        <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-3">
          {value}
        </div>
        <div className="text-gray-300 text-lg">{label}</div>
      </div>
    </motion.div>
  );
};

// Animated Background Stars with enhanced design
const AnimatedStars = () => {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starsRef.current) return;

    const stars = starsRef.current.querySelectorAll('.star');
    stars.forEach((star) => {
      gsap.to(star, {
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    });
  }, []);

  return (
    <div ref={starsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="star absolute bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            opacity: Math.random() * 0.8 + 0.2
          }}
        />
      ))}
    </div>
  );
};

const MediaContent = ({ mediaType }: { mediaType: 'video' | 'image' }) => {
  const currentMedia = cosmicMediaContent[mediaType];
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // GSAP animations for content sections
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(contentRef.current.querySelector('.content-heading'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(contentRef.current.querySelectorAll('.content-paragraph'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(contentRef.current.querySelectorAll('.feature-card'),
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)" },
      "-=0.3"
    );
  }, []);

  return (
    <div ref={contentRef} className='max-w-7xl mx-auto px-6 py-20'>
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="inline-block mb-6"
        >
          <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 px-6 py-2 rounded-full border border-pink-500/30 backdrop-blur-sm">
            <span className="text-pink-300 font-medium">Cosmic Experience</span>
          </div>
        </motion.div>
        
        <h2 className='content-heading text-5xl md:text-6xl font-bold mb-6 text-white'>
          About This <span className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">Cosmic Journey</span>
        </h2>
        
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full mb-8"></div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/50 to-black/50 p-8 rounded-3xl border border-pink-500/20 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Overview</h3>
          <p className='content-paragraph text-lg text-gray-300 leading-relaxed'>
            {currentMedia.about.overview}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/50 to-black/50 p-8 rounded-3xl border border-purple-500/20 backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Conclusion</h3>
          <p className='content-paragraph text-lg text-gray-300 leading-relaxed'>
            {currentMedia.about.conclusion}
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <StatsCard value="99.9%" label="Smooth Performance" />
        <StatsCard value="4K" label="Ultra HD Quality" />
        <StatsCard value="∞" label="Endless Exploration" />
      </div>

      <div className="mb-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-white mb-4">Key Features</h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Discover what makes our cosmic experience truly extraordinary
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Zap} 
            title="Lightning Fast" 
            description="Optimized for performance with smooth 60fps animations" 
          />
          <FeatureCard 
            icon={Globe} 
            title="Universal Access" 
            description="Works seamlessly across all devices and browsers" 
          />
          <FeatureCard 
            icon={Code} 
            title="Developer Friendly" 
            description="Clean, well-documented code that's easy to customize" 
          />
          <FeatureCard 
            icon={Palette} 
            title="Fully Customizable" 
            description="Adjust colors, timing, and effects to match your brand" 
          />
          <FeatureCard 
            icon={Star} 
            title="Stellar Design" 
            description="Beautiful UI components with cosmic-themed aesthetics" 
          />
          <FeatureCard 
            icon={Rocket} 
            title="Launch Ready" 
            description="Production-ready with no additional setup required" 
          />
        </div>
      </div>

      <motion.div 
        className="bg-gradient-to-br from-gray-900/70 to-black/70 p-12 rounded-3xl border border-pink-500/30 backdrop-blur-lg text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl opacity-10 blur-lg"></div>
        
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-white mb-6">Ready to Launch Your Cosmic Experience?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of developers who have transformed their websites with our ScrollExpandMedia component.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-xl font-bold text-white hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40"
          >
            Get Started Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export const VideoExpansionTextBlend = () => {
  const mediaType = 'video';
  const currentMedia = cosmicMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen bg-black relative'>
      <AnimatedStars />
      <ScrollExpandMedia
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansionTextBlend = () => {
  const mediaType = 'image';
  const currentMedia = cosmicMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen bg-black relative'>
      <AnimatedStars />
      <ScrollExpandMedia
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const VideoExpansion = () => {
  const mediaType = 'video';
  const currentMedia = cosmicMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen bg-black relative'>
      <AnimatedStars />
      <ScrollExpandMedia
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansion = () => {
  const mediaType = 'image';
  const currentMedia = cosmicMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen bg-black relative'>
      <AnimatedStars />
      <ScrollExpandMedia
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

const CosmicScrollDemo = () => {
  const [mediaType, setMediaType] = useState('video');
  const currentMedia = cosmicMediaContent[mediaType];
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, [mediaType]);

  const handleMediaTypeChange = (type: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setMediaType(type);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className='min-h-screen bg-black relative overflow-hidden'>
      <AnimatedStars />
      
      <div className='fixed top-6 right-6 z-50 flex gap-3'>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleMediaTypeChange('video')}
          className={`px-5 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${
            mediaType === 'video'
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25'
              : 'bg-black/50 text-white border border-red-500/30 hover:border-red-500/50'
          }`}
        >
          <Rocket className="w-4 h-4" />
          Cosmic Video
        </motion.button>
      </div>

      <motion.div
        key={mediaType}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ScrollExpandMedia
          mediaSrc={currentMedia.src}
          posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
          bgImageSrc={currentMedia.background}
          title={currentMedia.title}
          date={currentMedia.date}
          scrollToExpand={currentMedia.scrollToExpand}
        >
          <MediaContent mediaType={mediaType as 'video' | 'image'} />
        </ScrollExpandMedia>
      </motion.div>
    </div>
  );
};

export default CosmicScrollDemo;