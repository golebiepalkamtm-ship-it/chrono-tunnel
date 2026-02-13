/**
 * ParticlesBackground — Lightweight CSS-only Edition
 * 
 * Pure CSS animations for maximum performance:
 * - CSS keyframe stars (no JS animation loop)
 * - Subtle aurora gradients via CSS
 * - Zero Framer Motion overhead
 */

const ParticlesBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {/* Aurora gradients — pure CSS, GPU-composited */}
      <div className="aurora-orb aurora-orb-1" />
      <div className="aurora-orb aurora-orb-2" />

      {/* Static star dots — no animation, just opacity via CSS */}
      {Array.from({ length: 25 }, (_, i) => (
        <div
          key={i}
          className="star-dot"
          style={{
            left: `${(i * 37 + 13) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            animationDelay: `${(i * 0.4) % 4}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;
