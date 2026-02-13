/**
 * Professional Parallax System — Locomotive Scroll Edition
 * 
 * Combines GSAP ScrollTrigger with Locomotive-style techniques:
 * - data-scroll-speed: Variable parallax rates per element
 * - Velocity-based skew/stretch distortion on cards
 * - Clip-path reveal on viewport entry
 * - Mouse parallax with lerp smoothing
 * - Scroll-linked CSS variable animations
 * 
 * Every easing choice is intentional:
 * - expo.out: dramatic entrance weight
 * - sine.inOut: organic breathing
 * - power3.out: confident deceleration
 */

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useParallax = () => {
  const initialized = useRef(false);
  const rafId = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    mousePos.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    gsap.config({ force3D: true, nullTargetWarn: false });

    // ==========================================
    // DATA-SCROLL-SPEED — Locomotive's Signature
    // Each element moves at its own rate based on data attribute
    // speed=1 is normal, speed=2 is 2x, speed=-1 is inverse
    // ==========================================
    gsap.utils.toArray<HTMLElement>('[data-scroll-speed]').forEach((el) => {
      const speed = parseFloat(el.dataset.scrollSpeed || '1');
      const delay = parseFloat(el.dataset.scrollDelay || '0');

      gsap.to(el, {
        y: () => (speed - 1) * ScrollTrigger.maxScroll(window) * -0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5 + delay,
          invalidateOnRefresh: true,
        },
      });
    });

    // ==========================================
    // CLIP-PATH REVEALS — Cinematic Unmasking
    // Locomotive's viewport entry with IntersectionObserver
    // ==========================================
    const clipElements = document.querySelectorAll('.clip-reveal, .clip-reveal-left, .clip-reveal-right');
    
    const clipObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger delay from data attribute
            const delay = parseFloat((entry.target as HTMLElement).dataset.clipDelay || '0');
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, delay * 1000);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    clipElements.forEach((el) => clipObserver.observe(el));

    // ==========================================
    // DEEP PARALLAX LAYERS (Background Orbs)
    // scrub: 3 = heavy, lagging behind scroll
    // ==========================================
    gsap.utils.toArray<HTMLElement>('.parallax-slow').forEach((element, i) => {
      const baseSpeed = -150;
      const variation = i * 20;

      gsap.to(element, {
        y: baseSpeed - variation,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 3 + i * 0.5,
        },
      });

      gsap.to(element, {
        scale: 1.1,
        opacity: 0.25,
        duration: 4 + i,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.7,
      });
    });

    // ==========================================
    // MID-LAYER PARALLAX (Faster = closer)
    // ==========================================
    gsap.utils.toArray<HTMLElement>('.parallax-fast').forEach((element, i) => {
      gsap.to(element, {
        y: -280 - i * 30,
        x: (i % 2 ? 1 : -1) * 40,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });

      gsap.to(element, {
        scale: 1.15,
        duration: 3 + i * 0.3,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.4,
      });
    });

    // ==========================================
    // TIMELINE CARDS — Locomotive-Enhanced Entrance
    // Combines GSAP scrub with velocity CSS vars
    // ==========================================
    gsap.utils.toArray<HTMLElement>('.timeline-parallax').forEach((card, i) => {
      const direction = i % 2 === 0 ? 1 : -1;

      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          end: 'top 35%',
          scrub: 1.5,
        },
      });

      // Phase 1: Locomotive-style entrance with clip + transform
      cardTl.fromTo(
        card,
        {
          x: direction * 180,
          opacity: 0,
          rotateY: direction * 25,
          scale: 0.85,
          filter: 'blur(12px)',
        },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          scale: 1,
          filter: 'blur(0px)',
          ease: 'expo.out',
        }
      );

      // Glow intensity via CSS variable
      gsap.to(card, {
        '--glow-intensity': 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: card,
          start: 'top 70%',
          end: 'top 40%',
          scrub: 1,
        },
      });

      // Exit fade
      gsap.to(card, {
        '--glow-intensity': 0,
        opacity: 0.3,
        scale: 0.95,
        filter: 'blur(4px)',
        ease: 'power2.in',
        scrollTrigger: {
          trigger: card,
          start: 'bottom 40%',
          end: 'bottom 10%',
          scrub: 1,
        },
      });
    });

    // ==========================================
    // FLOATING DECORATIVE ELEMENTS
    // ==========================================
    gsap.utils.toArray<HTMLElement>('.float-parallax').forEach((element, i) => {
      gsap.to(element, {
        y: `${(i % 3 + 1) * -80}`,
        x: `${((i % 2) * 2 - 1) * 50}`,
        rotation: (i % 2) * 15 - 7.5,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2 + i * 0.5,
        },
      });

      const floatTl = gsap.timeline({ repeat: -1 });
      
      floatTl.to(element, {
        y: `+=${25 + i * 10}`,
        x: `+=${(i % 2 ? 1 : -1) * 15}`,
        rotation: `+=${(i % 2 ? 1 : -1) * 5}`,
        duration: 3 + i * 0.5,
        ease: 'sine.inOut',
      });

      floatTl.to(element, {
        y: `-=${25 + i * 10}`,
        x: `-=${(i % 2 ? 1 : -1) * 15}`,
        rotation: `-=${(i % 2 ? 1 : -1) * 5}`,
        duration: 3 + i * 0.5,
        ease: 'sine.inOut',
      });

      floatTl.progress(i * 0.15);
    });

    // ==========================================
    // TUNNEL RINGS — Depth Markers
    // ==========================================
    gsap.utils.toArray<HTMLElement>('.tunnel-ring').forEach((ring, i) => {
      gsap.to(ring, {
        scale: 1.08,
        opacity: 0.35,
        duration: 4 + i * 0.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.4,
      });

      gsap.to(ring, {
        rotation: i % 2 === 0 ? 360 : -360,
        duration: 80 + i * 15,
        ease: 'none',
        repeat: -1,
      });

      gsap.to(ring, {
        scale: 1 + i * 0.05,
        opacity: 0.15 - i * 0.02,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      });
    });

    // ==========================================
    // MOUSE PARALLAX — Interactive Layer
    // ==========================================
    const mouseParallaxElements = gsap.utils.toArray<HTMLElement>('.mouse-parallax');

    const updateMouseParallax = () => {
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.06;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.06;

      mouseParallaxElements.forEach((el) => {
        const depth = parseFloat(el.dataset.depth || '0.5');
        const invertX = el.dataset.invert === 'true' ? -1 : 1;

        gsap.set(el, {
          x: mousePos.current.x * 40 * depth * invertX,
          y: mousePos.current.y * 25 * depth,
          rotation: mousePos.current.x * 3 * depth,
        });
      });

      rafId.current = requestAnimationFrame(updateMouseParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId.current = requestAnimationFrame(updateMouseParallax);

    // ==========================================
    // WORD REVEAL — Locomotive text animation
    // Triggers .is-visible class on viewport entry
    // ==========================================
    const wordRevealElements = document.querySelectorAll('.word-reveal');
    const wordObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    wordRevealElements.forEach((el) => wordObserver.observe(el));

    // ==========================================
    // PARTICLES
    // ==========================================
    gsap.utils.toArray<HTMLElement>('.particle').forEach((particle, i) => {
      const randomX = gsap.utils.random(-80, 80);
      const randomY = gsap.utils.random(-120, -40);
      const duration = gsap.utils.random(4, 8);

      gsap.to(particle, {
        x: `+=${randomX}`,
        y: `+=${randomY}`,
        opacity: gsap.utils.random(0.2, 0.7),
        scale: gsap.utils.random(0.6, 1.4),
        duration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.3,
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      clipObserver.disconnect();
      wordObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove]);
};

export default useParallax;
