"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightning } from "@/components/ui/hero-odyssey";

gsap.registerPlugin(ScrollTrigger);

export default function CosmicGlobeFeature() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !globeRef.current) return;

    // GSAP animations for cosmic globe section
    gsap.fromTo(textRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(globeRef.current,
      { x: 100, opacity: 0, scale: 0.8 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full mx-auto overflow-hidden rounded-3xl bg-black/40 backdrop-blur-sm border-2 border-red-500/40 shadow-[0_0_60px_rgba(239,68,68,0.3)] px-6 py-16 md:px-16 md:py-24" 
      style={{ position: 'relative' }}
    >
      {/* Lightning background to match hero section */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <Lightning
          hue={340}
          xOffset={0}
          speed={1.6}
          intensity={0.6}
          size={2}
        />
      </div>
      
      {/* Enhanced cosmic glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/8 via-pink-500/5 to-purple-500/8 rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent rounded-3xl"></div>
      
      <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row relative z-10">
        <div ref={textRef} className="z-10 max-w-xl text-left">
          <h1 className="text-3xl font-normal text-white">
            Explore the <span className="bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold">Cosmic Web</span>{" "}
            <span className="text-gray-200">Journey through space and discover the infinite possibilities of our universe. Experience the beauty of celestial mechanics in motion.</span>
          </h1>
          <Button className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(239,68,68,0.6)]">
            Begin Journey <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div ref={globeRef} className="relative h-[180px] w-full max-w-xl">
          <CosmicRedGlobe className="absolute -bottom-20 -right-40 scale-150" />
        </div>
      </div>
    </section>
  );
}

const COSMIC_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0.9,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 2.0,
  baseColor: [1, 0, 0.3], // Match hero globe - bright red base
  markerColor: [1, 0, 0.33], // Match hero globe - red markers
  glowColor: [1, 0, 0.3], // Match hero globe - red glow
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export function CosmicRedGlobe({
  className,
  config = COSMIC_GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const [r, setR] = useState(0)

  const updatePointerInteraction = (value: any) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: any) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      setR(delta / 200)
    }
  }

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005
      state.phi = phi + r
      state.width = width * 2
      state.height = width * 2
    },
    [r],
  )

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth
    }
  }

  useEffect(() => {
    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    })

    setTimeout(() => (canvasRef.current!.style.opacity = "1"))
    return () => globe.destroy()
  }, [])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
