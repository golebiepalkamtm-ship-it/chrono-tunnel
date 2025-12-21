import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import TimelineCard from "./TimelineCard";
import ProgressBar from "./ProgressBar";

const timelineEvents = [
  {
    year: 2013,
    title: "The Genesis",
    description: "Our journey began in a small garage with nothing but a dream and relentless determination. Three founders, one vision: to revolutionize how people interact with technology.",
    highlight: "Founded",
  },
  {
    year: 2015,
    title: "First Major Breakthrough",
    description: "After countless iterations, we launched our first product. The response exceeded all expectations, validating our approach and fueling our ambition for bigger things.",
    highlight: "Launch",
  },
  {
    year: 2017,
    title: "Global Expansion",
    description: "Opening offices in London, Tokyo, and São Paulo marked our transformation from startup to global force. Our team grew from 15 to 200 passionate innovators.",
    highlight: "Growth",
  },
  {
    year: 2019,
    title: "Industry Recognition",
    description: "Named 'Most Innovative Company' by leading tech publications. Our platform now serves millions of users across 50 countries, pushing the boundaries of what's possible.",
    highlight: "Award",
  },
  {
    year: 2021,
    title: "The Next Frontier",
    description: "Embracing AI and machine learning, we unveiled our next-generation platform. A quantum leap in capability that redefined industry standards.",
    highlight: "AI Era",
  },
  {
    year: 2023,
    title: "Shaping Tomorrow",
    description: "Today, we stand at the forefront of innovation, continuously evolving and adapting. Our mission remains unchanged: empowering people through technology.",
    highlight: "Present",
  },
];

const TimeTunnel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Perspective transforms for tunnel effect
  const perspectiveZ = useTransform(smoothProgress, [0, 1], [0, -500]);
  const tunnelOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // Update active index based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const newIndex = Math.min(
        Math.floor(value * timelineEvents.length),
        timelineEvents.length - 1
      );
      setActiveIndex(newIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const years = timelineEvents.map((e) => e.year);

  return (
    <div ref={containerRef} className="relative min-h-[400vh]">
      {/* Fixed Background */}
      <div className="fixed inset-0 bg-tunnel grid-overlay -z-10" />
      
      {/* Radial Glow Effect */}
      <motion.div 
        className="fixed inset-0 -z-5 pointer-events-none"
        style={{ opacity: tunnelOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" 
          style={{ 
            background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, transparent 60%)' 
          }} 
        />
      </motion.div>

      {/* Progress Bar */}
      <ProgressBar 
        years={years} 
        activeIndex={activeIndex}
      />

      {/* Tunnel Container */}
      <div className="sticky top-0 h-screen overflow-hidden tunnel-perspective">
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ z: perspectiveZ }}
        >
          {/* Tunnel Rings */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-primary/10 rounded-full"
              style={{
                width: `${(i + 1) * 30}%`,
                height: `${(i + 1) * 30}%`,
                transform: `translateZ(${i * -100}px)`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Timeline Content */}
      <div className="relative z-10 pt-[50vh] pb-[50vh] px-4 md:px-16 lg:px-24 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-32"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1 
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 glow-text"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            OUR JOURNEY
          </motion.h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Scroll through time and discover the milestones that shaped our story
          </p>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="mt-12 flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm text-muted-foreground">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
              <motion.div 
                className="w-1.5 h-3 bg-primary rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Timeline Cards */}
        {timelineEvents.map((event, index) => (
          <TimelineCard
            key={event.year}
            event={event}
            index={index}
            isActive={index === activeIndex}
          />
        ))}

        {/* Footer */}
        <motion.div 
          className="text-center pt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="font-display text-2xl text-muted-foreground">
            The journey continues...
          </p>
        </motion.div>
      </div>

      {/* Mobile Progress Indicator */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden z-50">
        <div className="glass-card px-4 py-2 flex items-center gap-3">
          <span className="font-display text-lg text-primary glow-text">
            {years[activeIndex]}
          </span>
          <div className="w-24 h-1 rounded-full bg-muted overflow-hidden">
            <motion.div 
              className="h-full progress-glow"
              style={{ width: `${((activeIndex + 1) / years.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTunnel;
