import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const initSmoothScroll = () => {
  // Enhanced GSAP ScrollTrigger animations for sections
  ScrollTrigger.batch(".hero-section, .features-section, .zoom-parallax-section, .tech-section, .cta-section", {
    onEnter: (elements) => {
      gsap.fromTo(elements, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
      );
    },
    onLeave: (elements) => {
      gsap.to(elements, {
        opacity: 0.9,
        duration: 0.5,
        ease: "power2.out"
      });
    },
    onEnterBack: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    },
    start: "top bottom-=100",
    end: "bottom top+=100",
  });

  return { kill: () => ScrollTrigger.getAll().forEach(trigger => trigger.kill()) };
};

export const createScrollAnimation = (
  element: HTMLElement | null,
  animation: gsap.TweenVars,
  trigger?: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
  }
) => {
  if (!element) return null;

  return gsap.to(element, {
    ...animation,
    scrollTrigger: {
      trigger: element,
      start: trigger?.start || "top bottom",
      end: trigger?.end || "bottom top",
      scrub: trigger?.scrub !== undefined ? trigger.scrub : true,
      pin: trigger?.pin || false,
    },
  });
};

export const createStaggerAnimation = (
  elements: (HTMLElement | null)[],
  animation: gsap.TweenVars,
  stagger: number = 0.2
) => {
  const validElements = elements.filter(Boolean) as HTMLElement[];
  
  return gsap.fromTo(validElements, 
    {
      y: 50,
      opacity: 0,
      scale: 0.9,
      ...animation.from
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger,
      ...animation
    }
  );
};

export const createParallaxEffect = (
  element: HTMLElement | null,
  speed: number = 0.5,
  triggerElement?: HTMLElement | null
) => {
  if (!element) return null;

  return gsap.to(element, {
    yPercent: -100 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: triggerElement || element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

export const createFadeInAnimation = (
  element: HTMLElement | null,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 50
) => {
  if (!element) return null;

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return { y: distance };
    }
  };

  return gsap.fromTo(element,
    {
      opacity: 0,
      ...getInitialPosition()
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );
};