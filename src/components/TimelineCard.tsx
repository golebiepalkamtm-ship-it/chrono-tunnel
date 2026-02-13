/**
 * TimelineCard — Clean Scroll Edition
 * 
 * Uses only Framer Motion whileInView for reveals.
 * No useScroll/useTransform springs (these conflicted with GSAP).
 */

import { motion } from "framer-motion";
import MedalBadge from "./MedalBadge";

interface TimelineEvent {
  year: number;
  title: string;
  achievements: string[];
  highlight?: string;
}

interface TimelineCardProps {
  event: TimelineEvent;
  index: number;
  isActive: boolean;
}

const TimelineCard = ({ event, index, isActive }: TimelineCardProps) => {
  const isEven = index % 2 === 0;

  const getRank = (text: string): "gold" | "silver" | "bronze" | null => {
    const lower = text.toLowerCase();
    if (lower.includes("mistrz") && !lower.includes("wicemistrz") && !lower.includes("v-ce")) return "gold";
    if (lower.includes("wicemistrz") || lower.includes("v-ce mistrz")) return "silver";
    if (lower.includes("przodownik") || lower.includes("miejsce")) return "bronze";
    return null;
  };

  return (
    <motion.div
      className="tunnel-card relative mb-16 md:mb-24"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className={`flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        
        {/* Year Ghost */}
        <div
          className={`hidden md:block absolute inset-0 -z-10 overflow-hidden pointer-events-none
            ${isActive ? 'opacity-60' : 'opacity-15'} transition-opacity duration-700`}
        >
          <span
            className={`year-ghost absolute text-[12rem] lg:text-[18rem] font-display font-black leading-none
              ${isEven ? '-left-8' : '-right-8'} top-1/2 -translate-y-1/2`}
          >
            {event.year}
          </span>
        </div>

        {/* Content Card */}
        <div
          className={`glass-card p-8 md:p-10 w-full md:w-[60%] lg:w-[55%] relative z-10
            ${isEven ? 'md:ml-auto' : 'md:mr-auto'}
            hover:scale-[1.01] transition-transform duration-500`}
        >
          {/* Holographic shimmer overlay */}
          <div className="holographic-shimmer" />

          {/* Mobile Year */}
          <div className="md:hidden mb-5">
            <span className="font-display text-5xl font-bold text-primary/25">
              {event.year}
            </span>
          </div>

          {/* Year badge — desktop */}
          <motion.div
            className="hidden md:inline-flex luxury-badge mb-5"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Sezon {event.year}
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-foreground mb-1 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {event.title}
          </motion.h3>

          {/* Highlight */}
          {event.highlight && (
            <motion.p
              className="text-xs text-muted-foreground tracking-widest uppercase mb-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {event.highlight}
            </motion.p>
          )}

          {/* Divider */}
          <motion.div
            className="luxury-divider mb-5"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ transformOrigin: isEven ? "left" : "right" }}
          />

          {/* Achievements */}
          <ul className="space-y-2 text-sm">
            {event.achievements.map((achievement, i) => {
              const rank = getRank(achievement);
              return (
                <motion.li
                  key={i}
                  className="achievement-item flex items-start gap-2.5 group"
                  initial={{ opacity: 0, x: isEven ? -15 : 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.025,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  viewport={{ once: true, margin: "-20px" }}
                >
                  <MedalBadge rank={rank} index={i} />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {achievement}
                  </span>
                </motion.li>
              );
            })}
          </ul>

          {/* Bottom draw line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[1px]"
            style={{
              background: `linear-gradient(90deg, hsl(var(--glow-primary)), hsl(var(--glow-secondary)), transparent)`,
            }}
            initial={{ width: "0%", opacity: 0 }}
            whileInView={{ width: "100%", opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          />
        </div>

        {/* Connection line (desktop) */}
        <div
          className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-20 h-[1px]
            ${isEven ? 'right-[60%] lg:right-[55%]' : 'left-[60%] lg:left-[55%]'}`}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(${isEven ? '270deg' : '90deg'}, hsl(var(--glow-primary) / 0.6), transparent)`,
              transformOrigin: isEven ? "right" : "left",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineCard;
