import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useParallax = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Parallax for background elements
    gsap.utils.toArray<HTMLElement>('.parallax-slow').forEach((element) => {
      gsap.to(element, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    gsap.utils.toArray<HTMLElement>('.parallax-fast').forEach((element) => {
      gsap.to(element, {
        y: -200,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    });

    // Parallax for timeline cards
    gsap.utils.toArray<HTMLElement>('.timeline-parallax').forEach((card, i) => {
      const direction = i % 2 === 0 ? 1 : -1;
      
      gsap.fromTo(card, 
        {
          x: direction * 100,
          opacity: 0,
          rotateY: direction * 15,
        },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );
    });

    // Floating elements parallax
    gsap.utils.toArray<HTMLElement>('.float-parallax').forEach((element, i) => {
      gsap.to(element, {
        y: `${(i % 3 + 1) * -50}`,
        x: `${((i % 2) * 2 - 1) * 30}`,
        rotation: (i % 2) * 10 - 5,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
};

export default useParallax;
