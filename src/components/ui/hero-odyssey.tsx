import React, { useState,useRef,useEffect } from 'react';
import { motion,AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import createGlobe from 'cobe';
import { cn } from '@/lib/utils';
import SpaceLogo from '@/assets/SpaceLogo';

gsap.registerPlugin(ScrollTrigger);








interface FeatureItemProps {
  name: string;
  value: string;
  position: string;
}

interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
}

export const  Lightning: React.FC<LightningProps> = ({
  hue = 230,
  xOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: false
    });
    if (!gl) {
      console.error("WebGL not supported or failed to initialize");
      // Fallback: show a simple gradient background
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, `hsl(${hue}, 70%, 50%)`);
        gradient.addColorStop(1, `hsl(${hue + 60}, 70%, 30%)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      
      #define OCTAVE_COUNT 10

      // Convert HSV to RGB.
      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
          p = fract(p * .1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));
          
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          // Normalized pixel coordinates.
          vec2 uv = fragCoord / iResolution.xy;
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          // Apply horizontal offset.
          uv.x += uXOffset;
          
          // Adjust uv based on size and animate with speed.
          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
          
          float dist = abs(uv.x);
          // Compute base color using hue.
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
          // Compute color with intensity and speed affecting time.
          vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
          col = pow(col, vec3(1.0));
          fragColor = vec4(col, 1.0);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (
      source: string,
      type: number
    ): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) {
        console.error("Failed to create shader");
        return null;
      }
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        console.error("Shader compile error:", error);
        console.error("Shader source:", source);
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(
      fragmentShaderSource,
      gl.FRAGMENT_SHADER
    );
    if (!vertexShader || !fragmentShader) {
      console.error("Failed to compile shaders");
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      console.error("Failed to create program");
      return;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const error = gl.getProgramInfoLog(program);
      console.error("Program linking error:", error);
      gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    if (aPosition >= 0) {
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    }

    // Get uniform locations and validate they exist
    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const uHueLocation = gl.getUniformLocation(program, "uHue");
    const uXOffsetLocation = gl.getUniformLocation(program, "uXOffset");
    const uSpeedLocation = gl.getUniformLocation(program, "uSpeed");
    const uIntensityLocation = gl.getUniformLocation(program, "uIntensity");
    const uSizeLocation = gl.getUniformLocation(program, "uSize");

    // Validate that the program is properly linked and uniforms exist
    if (!iResolutionLocation || !iTimeLocation || !uHueLocation || 
        !uXOffsetLocation || !uSpeedLocation || !uIntensityLocation || !uSizeLocation) {
      console.warn('Some uniform locations not found. Shader might have compilation issues.');
    }

    const startTime = performance.now();
    let animationId: number;
    
    const render = () => {
      // Ensure canvas and WebGL context are still valid
      if (!canvas || !gl) return;
      
      try {
        resizeCanvas();
        gl.viewport(0, 0, canvas.width, canvas.height);
        
        // Use the current program before setting uniforms
        gl.useProgram(program);
        
        // Clear the canvas
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        // Check if uniform locations are valid before setting them
        if (iResolutionLocation !== null && iResolutionLocation !== -1) {
          gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
        }
        
        const currentTime = performance.now();
        if (iTimeLocation !== null && iTimeLocation !== -1) {
          gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);
        }
        
        if (uHueLocation !== null && uHueLocation !== -1) {
          gl.uniform1f(uHueLocation, hue);
        }
        
        if (uXOffsetLocation !== null && uXOffsetLocation !== -1) {
          gl.uniform1f(uXOffsetLocation, xOffset);
        }
        
        if (uSpeedLocation !== null && uSpeedLocation !== -1) {
          gl.uniform1f(uSpeedLocation, speed);
        }
        
        if (uIntensityLocation !== null && uIntensityLocation !== -1) {
          gl.uniform1f(uIntensityLocation, intensity);
        }
        
        if (uSizeLocation !== null && uSizeLocation !== -1) {
          gl.uniform1f(uSizeLocation, size);
        }
        
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        animationId = requestAnimationFrame(render);
      } catch (error) {
        console.error('WebGL render error:', error);
        // Stop the animation loop if there's an error
        return;
      }
    };
    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      // Clean up WebGL resources
      if (gl && program) {
        gl.deleteProgram(program);
      }
      if (gl && vertexBuffer) {
        gl.deleteBuffer(vertexBuffer);
      }
      if (gl && vertexShader) {
        gl.deleteShader(vertexShader);
      }
      if (gl && fragmentShader) {
        gl.deleteShader(fragmentShader);
      }
    };
  }, [hue, xOffset, speed, intensity, size]);

  return <canvas ref={canvasRef} className="w-full h-full relative" />;
};


interface EarthProps {
  className?: string;
  theta?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
}

const Earth: React.FC<EarthProps> = ({
  className,
  theta = 0.25,
  dark = 1,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 40000,
  mapBrightness = 6,
  baseColor = [0.4, 0.6509, 1],
  markerColor = [1, 0, 0],
  glowColor = [0.2745, 0.5765, 0.898],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let width = 0;
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
    onResize();

    let phi = 0;
    onResize();
    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: theta,
      dark: dark,
      scale: scale,
      diffuse: diffuse,
      mapSamples: mapSamples,
      mapBrightness: mapBrightness,
      baseColor: baseColor,
      markerColor: markerColor,
      glowColor: glowColor,
      opacity: 1,
      offset: [0, 0],
      markers: [
        // longitude latitude
      ],
      onRender: (state: Record<string, any>) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, [theta, dark, scale, diffuse, mapSamples, mapBrightness, baseColor, markerColor, glowColor]);

  return (
    <div
      className={cn(
        'flex items-center justify-center z-[10] w-full max-w-[800px] mx-auto',
        className
      )}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          aspectRatio: '1',
        }}
      />
    </div>
  );
};

const FeatureItem: React.FC<FeatureItemProps> = ({ name, value, position }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

    // GSAP enhanced feature item animations with error handling
    try {
      gsap.fromTo(itemRef.current,
        { 
          opacity: 0, 
          scale: 0.8,
          y: 30
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          delay: Math.random() * 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Add floating animation
      gsap.to(itemRef.current, {
        y: "-=10",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: Math.random() * 2
      });
    } catch (error) {
      console.warn('GSAP animation failed for FeatureItem:', error);
    }

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === itemRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={itemRef} className={`absolute ${position} z-10 group transition-all duration-300 hover:scale-110`}>
      <div className="flex items-center gap-3 relative">
        {/* Enhanced dot with better glow */}
        <div className="relative">
          <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full group-hover:animate-pulse shadow-lg shadow-red-500/50"></div>
          <div className="absolute -inset-2 bg-red-400/30 rounded-full blur-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        </div>
        <div className="text-white relative">
          <div className="font-semibold text-base group-hover:text-white transition-colors duration-300 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">{name}</div>
          <div className="text-white/80 text-sm group-hover:text-white/90 transition-colors duration-300">{value}</div>
          {/* Enhanced background glow with cosmic theme */}
          <div className="absolute -inset-3 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl blur-lg opacity-60 group-hover:opacity-90 transition-opacity duration-300 -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export const HeroSection: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current || !logoRef.current || !menuItemsRef.current) return;

    try {
      // GSAP enhanced navigation animations
      const tl = gsap.timeline();
      
      tl.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5"
      )
      .fromTo(menuItemsRef.current.children,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      );

      // Add floating animation to logo
      gsap.to(logoRef.current, {
        y: "-=5",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    } catch (error) {
      console.warn('GSAP navigation animation failed:', error);
    }

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

    return () => {
      // Clean up all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full bg-transparent text-white overflow-visible">
      {/* Main container with space for content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen flex flex-col">
        {/* Enhanced Navigation with GSAP animations */}
        <motion.div
          ref={navRef}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="px-6 bg-gradient-to-r from-black/60 via-black/70 to-black/60 backdrop-blur-xl border border-white/10 rounded-2xl py-4 flex justify-between items-center mb-12 shadow-2xl shadow-red-500/10"
        >
          <div className="flex items-center">
            <div ref={logoRef} className="text-2xl font-bold cursor-pointer">
              <SpaceLogo className="drop-shadow-lg" size={40} />
            </div>
            <div ref={menuItemsRef} className="hidden md:flex items-center space-x-6 ml-8">
              <button className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 border border-red-500/30 rounded-full text-sm transition-all duration-300 hover:scale-105 backdrop-blur-sm">Start</button>
              <Link to="/" className="px-4 py-2 text-sm hover:text-red-300 transition-all duration-300 hover:scale-105 relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/scroll-demo" className="px-4 py-2 text-sm hover:text-red-300 transition-all duration-300 hover:scale-105 relative group">
                Visual Inspace
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/simple-zoom" className="px-4 py-2 text-sm hover:text-red-300 transition-all duration-300 hover:scale-105 relative group">
                Explore
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/space-demo" className="px-4 py-2 text-sm hover:text-red-300 transition-all duration-300 hover:scale-105 relative group">
                Space Demo
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <button className="px-4 py-2 text-sm hover:text-red-300 transition-all duration-300 hover:scale-105 relative group">
                Contacts
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button className="px-4 py-2 text-sm hover:text-red-300 transition-all duration-300 hover:scale-105 relative group">
                Help
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button className="px-4 py-2 text-sm hover:text-red-300 transition-all duration-300 hover:scale-105 relative group">
                Docs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hidden md:block px-4 py-2 text-sm hover:text-red-300 transition-all duration-300 hover:scale-105 relative group">
              Register
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/25 hover:shadow-red-500/40">
              Application
            </button>
            {/* Enhanced Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md focus:outline-none hover:bg-white/10 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </motion.div>

        {/* Enhanced Mobile menu with GSAP */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-50 bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl">
            <div className="flex flex-col items-center justify-center h-full space-y-8 text-lg relative">
              {/* Enhanced close button */}
              <button
                className="absolute top-8 right-8 p-3 bg-red-500/20 hover:bg-red-500/30 rounded-full transition-all duration-300 hover:scale-110 border border-red-500/30"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Enhanced menu items */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-full backdrop-blur-sm hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300"
              >
                Start
              </motion.button>
              
              <Link to="/" className="px-8 py-4 hover:text-red-300 transition-all duration-300 hover:scale-105 relative group" onClick={() => setMobileMenuOpen(false)}>
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              <Link to="/scroll-demo" className="px-8 py-4 hover:text-red-300 transition-all duration-300 hover:scale-105 relative group" onClick={() => setMobileMenuOpen(false)}>
                Scroll Demo
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              <Link to="/simple-zoom" className="px-8 py-4 hover:text-red-300 transition-all duration-300 hover:scale-105 relative group" onClick={() => setMobileMenuOpen(false)}>
                Simple Zoom
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              <Link to="/space-demo" className="px-8 py-4 hover:text-red-300 transition-all duration-300 hover:scale-105 relative group" onClick={() => setMobileMenuOpen(false)}>
                Space Demo
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 hover:text-red-300 transition-all duration-300 relative group"
              >
                Contacts
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 hover:text-red-300 transition-all duration-300 relative group"
              >
                Help
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 hover:text-red-300 transition-all duration-300 relative group"
              >
                Docs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 hover:text-red-300 transition-all duration-300 relative group"
              >
                Register
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-full font-medium shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300"
              >
                Application
              </motion.button>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, staggerChildren: 0.3 }}
          className="w-full z-200 absolute top-[70%] left-0 right-0"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <FeatureItem name="React" value="for base" position="left-[5%] top-8" />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <FeatureItem name="Tailwind" value="for styles" position="left-[20%] -top-12" />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <FeatureItem name="Framer-motion" value="for animations" position="right-[16%] -top-12" />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <FeatureItem name="Shaders" value="for lightning" position="right-[5%] top-8" />
          </motion.div>
        </motion.div>

        {/* Enhanced Main hero content with improved typography */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-30 flex flex-col items-center text-center max-w-5xl mx-auto mt-0"
        >
          <motion.h1
            initial={{ y: 50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl tracking-tight"
          >
            Hero Odyssey
          </motion.h1>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 1, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl pb-8 font-semibold bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6 tracking-wide"
          >
            Features That <span className="bg-gradient-to-r from-pink-400 via-red-500 to-purple-600 bg-clip-text text-transparent">Illuminate</span>
          </motion.h2>
        </motion.div>
      </div>

      {/* Flowing background elements - darker lightning for hero + globe */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 overflow-visible"
      >
        {/* Hero section specific darker lightning */}
        <div className="absolute top-0 w-full left-1/2 transform -translate-x-1/2 h-full">
          <Lightning
            hue={340}
            xOffset={0}
            speed={1.6}
            intensity={0.6}
            size={2}
          />
        </div>

        {/* Earth Globe - positioned to flow into next sections */}
        <div className="z-10 absolute bottom-20 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[1000px] h-[1000px]">
          <Earth
            baseColor={[1, 0, 0.3]}
            markerColor={[1, 0, 0.33]}
            glowColor={[1, 0, 0.3]}
            className="w-full h-full"
          />
        </div>
      </motion.div>
    </div>
  );
};