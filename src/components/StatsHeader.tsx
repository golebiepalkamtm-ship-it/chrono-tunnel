import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";

interface StatsHeaderProps {
  mistrz: number;
  wicemistrz: number;
  przodownik: number;
}

const StatsHeader = ({ mistrz, wicemistrz, przodownik }: StatsHeaderProps) => {
  const stats = [
    { 
      label: "Mistrz", 
      value: mistrz, 
      icon: Trophy, 
      color: "text-yellow-400",
      bgColor: "from-yellow-400/20 to-yellow-600/5",
      borderColor: "border-yellow-400/30",
      glowColor: "shadow-yellow-400/20"
    },
    { 
      label: "Wicemistrz", 
      value: wicemistrz, 
      icon: Medal, 
      color: "text-gray-300",
      bgColor: "from-gray-300/20 to-gray-500/5",
      borderColor: "border-gray-300/30",
      glowColor: "shadow-gray-300/20"
    },
    { 
      label: "Przodownik", 
      value: przodownik, 
      icon: Award, 
      color: "text-amber-600",
      bgColor: "from-amber-600/20 to-amber-800/5",
      borderColor: "border-amber-600/30",
      glowColor: "shadow-amber-600/20"
    },
  ];

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className={`relative flex items-center gap-3 px-5 py-3 md:px-6 md:py-4 rounded-2xl border ${stat.borderColor} 
            bg-gradient-to-br ${stat.bgColor} backdrop-blur-md shadow-lg ${stat.glowColor}`}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 + index * 0.15 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: `0 0 30px hsl(var(--primary) / 0.3)` 
          }}
        >
          {/* Icon with glow */}
          <motion.div
            className="relative"
            animate={{ 
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
          >
            <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} />
            <motion.div
              className={`absolute inset-0 ${stat.color} blur-md opacity-50`}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Counter */}
          <div className="flex flex-col">
            <motion.span 
              className="text-2xl md:text-3xl font-bold text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 + index * 0.2 }}
            >
              <Counter value={stat.value} delay={1 + index * 0.2} />
            </motion.span>
            <span className="text-xs md:text-sm text-muted-foreground font-medium">
              {stat.label}
            </span>
          </div>

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5, repeatDelay: 2 }}
          >
            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Animated counter component
const Counter = ({ value, delay }: { value: number; delay: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay }}
      >
        {value}
      </motion.span>
    </motion.span>
  );
};

export default StatsHeader;
