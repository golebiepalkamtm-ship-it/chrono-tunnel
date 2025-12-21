import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import TimelineCard from "./TimelineCard";
import ProgressBar from "./ProgressBar";

const timelineEvents = [
  {
    year: 2001,
    title: "Sezon 2001",
    description: "Oddział Lubań – A Mistrz (235,77 pkt) • Oddział Lubań – B I Wicemistrz (503,62 pkt) • Oddział Lubań – GMO Mistrz • Okręg Jelenia Góra – A I Wicemistrz (235,77 pkt) • Okręg Jelenia Góra – B IX Przodownik (503,62 pkt) • Okręg Jelenia Góra – GMO I Wicemistrz",
    highlight: "6 osiągnięć",
  },
  {
    year: 2002,
    title: "Sezon 2002",
    description: "Oddział Lubań – A Mistrz (501,52 pkt) • Oddział Lubań – GMO II Wicemistrz (40 pkt) • Okręg Jelenia Góra – A Mistrz (501,52 pkt) • Okręg Jelenia Góra – GMO Mistrz (40 pkt) • Region V – A 50 Przodownik (501,52 pkt) • Region V – B II Przodownik (168,11 pkt)",
    highlight: "6 osiągnięć",
  },
  {
    year: 2003,
    title: "Sezon 2003",
    description: "Oddział Lubań – A/B/C/GMO Mistrz • Okręg Jelenia Góra – A/C Mistrz, B I Wicemistrz, GMO VI Przodownik • Region V – A 10, B 49, C 2 Miejsce (971,99 pkt), D II, GMP 11 Przodownik • MP – C 13, GMP 28 Przodownik (1066,26 pkt)",
    highlight: "15 osiągnięć",
  },
  {
    year: 2004,
    title: "Sezon 2004",
    description: "Oddział Lubań – A/B Mistrz, GMO I Wicemistrz • Okręg Jelenia Góra – A Mistrz, B I Przodownik, GMO I Przodownik • Region V – A 18, D 35 Przodownik (839,32 pkt) • MP – A 32 Przodownik (180,91 pkt)",
    highlight: "9 osiągnięć",
  },
  {
    year: 2005,
    title: "Sezon 2005",
    description: "Oddział Lubań – A/B Mistrz, GMO I Wicemistrz • Okręg Jelenia Góra – A/B Mistrz, GMO I Przodownik • Region V – A II Wicemistrz (90,65 pkt) • MP – A I, B V Przodownik",
    highlight: "9 osiągnięć",
  },
  {
    year: 2006,
    title: "Sezon 2006",
    description: "Oddział Lubań – A/B/GMO Mistrz (240,15/183,25/82,77 pkt) • Okręg Jelenia Góra – A Mistrz (199,28 pkt), B II Przodownik, GMO I Wicemistrz • Region V – A 18, B 24, GMO 3 Przodownik • MP – GMO VI Przodownik",
    highlight: "10 osiągnięć",
  },
  {
    year: 2007,
    title: "Sezon 2007",
    description: "Oddział Lubań – A Mistrz (78,06 pkt), GMO II Wicemistrz • Okręg Jelenia Góra – A Mistrz • Region V – A II Przodownik • MP – A I Przodownik (78,06 pkt)",
    highlight: "5 osiągnięć",
  },
  {
    year: 2008,
    title: "Sezon 2008",
    description: "Oddział Lubań – A/B Mistrz • Okręg Jelenia Góra – A Mistrz, B II Wicemistrz • Region V – A Mistrz (49,88 pkt), B XX Przodownik, GMP I Wicemistrz, GMP 20 Przodownik • MP – A 3 Przodownik",
    highlight: "9 osiągnięć",
  },
  {
    year: 2009,
    title: "Sezon 2009",
    description: "Ogólnopolski – GMP 148 Przodownik (1401,99 pkt)",
    highlight: "1 osiągnięcie",
  },
  {
    year: 2011,
    title: "Sezon 2011",
    description: "Oddział – Total dorosłych/A/B/C/M/D/H/Roczne Mistrz • Okręg – A/B/C/D/M Mistrz • Region V – B/D Mistrz",
    highlight: "15 osiągnięć",
  },
  {
    year: 2012,
    title: "Sezon 2012",
    description: "MP – Maraton 8, Olimpijskie 68 Przodownik • Oddział – A/B/M Maraton/D/GMO/H/Roczne/Olimpijskie/Total dorośli I Mistrz, C II Wicemistrz, Total młodzi II Wicemistrz",
    highlight: "13 osiągnięć",
  },
  {
    year: 2013,
    title: "Sezon 2013",
    description: "MP – B 13, Roczne 9 Przodownik, A II Wicemistrz (66,43 pkt) • Region V – GMP 68 Przodownik, A I Wicemistrz, B/Roczne/D Przodownik • Oddział – A/B/D/H Mistrz, 5 najlepszych młodzi Mistrz • Okręg – A/B/H Mistrz",
    highlight: "21 osiągnięć",
  },
  {
    year: 2014,
    title: "Sezon 2014",
    description: "MP – B Mistrz (661,38 pkt), A Mistrz (116,13 pkt), Klasa Sport A 22 Miejsce • Oddział – A/B/D/H/Roczne I Mistrz, C 5, Lotniki 2 Przodownik",
    highlight: "10 osiągnięć",
  },
  {
    year: 2015,
    title: "Sezon 2015",
    description: "MP – A Mistrz (86,77 pkt), B 1 Przodownik (71,68 pkt) • Oddział – A/B/C/D I Mistrz",
    highlight: "6 osiągnięć",
  },
  {
    year: 2017,
    title: "Sezon 2017",
    description: "MP – GMP 54 Przodownik (148,16 pkt) • Oddział – A/B 1 Przodownik",
    highlight: "3 osiągnięcia",
  },
  {
    year: 2018,
    title: "Sezon 2018",
    description: "MP – A I Wicemistrz (25,94 pkt) • Oddział – Total 16 Przodownik (XIII) (942,69 pkt), A/B I Mistrz",
    highlight: "4 osiągnięcia",
  },
  {
    year: 2019,
    title: "Sezon 2019",
    description: "Oddział – A I Mistrz (82,76 pkt), B I Mistrz (130,64 pkt)",
    highlight: "2 osiągnięcia",
  },
  {
    year: 2021,
    title: "Sezon 2021",
    description: "MP – A 61 Przodownik (249,85 pkt)",
    highlight: "1 osiągnięcie",
  },
  {
    year: 2024,
    title: "Sezon 2024",
    description: "MP – A 13 Przodownik (85,05 pkt)",
    highlight: "1 osiągnięcie",
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
            HISTORIA OSIĄGNIĘĆ
          </motion.h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Przewijaj czas i odkryj historię sukcesów od 2001 roku
          </p>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="mt-12 flex flex-col items-center gap-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm text-muted-foreground">Przewijaj aby odkryć</span>
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
            Historia trwa...
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
