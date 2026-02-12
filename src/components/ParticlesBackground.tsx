/**
 * ParticlesBackground — Luxury Aurora Edition
 * 
 * Multi-layered particle system with:
 * - Floating gold dust particles
 * - Aurora borealis gradient orbs
 * - Subtle star field
 */

import { motion } from "framer-motion";
import { useMemo } from "react";

const ParticlesBackground = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 0.5,
      duration: Math.random() * 25 + 15,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      twinkle: Math.random() * 4 + 2,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {/* Star field */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-foreground/60"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: star.twinkle,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gold dust particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, hsl(var(--primary) / 0.8), hsl(var(--primary) / 0.2))`,
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0, p.opacity, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Aurora orbs — large ethereal gradients */}
      <motion.div
        className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--aurora-1) / 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--aurora-3) / 0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[50%] left-[50%] w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--aurora-2) / 0.06) 0%, transparent 70%)',
          filter: 'blur(90px)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </div>
  );
};

export default ParticlesBackground;