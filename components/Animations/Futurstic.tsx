import { motion } from "framer-motion";

const FuturisticAnimation = () => {
  return (
    <div className="relative w-80 h-80 flex justify-center items-center overflow-hidden">
      {/* Background with Gradient */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-[#00000075] backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Animated Stars in the Background */}
      <motion.div
        className="absolute w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5 }}
      >
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`, // Slightly larger stars
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              opacity: [0.2, 0.8, 0.2], // Stronger opacity variations for visibility
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Main Animation */}
      <motion.div
        className="relative w-80 h-80 flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="circleGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#00c6ff" />
              <stop offset="100%" stopColor="#0072ff" />
            </linearGradient>
            <linearGradient
              id="rectGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ff7e5f" />
              <stop offset="100%" stopColor="#feb47b" />
            </linearGradient>
            <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>

          {/* Pulsating Central Circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            fill="url(#pulseGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Continuous Rotating Circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="30"
            stroke="url(#circleGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              pathLength: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror",
              },
              rotate: {
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />

          {/* Rotating and Shrinking Rectangle */}
          <motion.rect
            x="15"
            y="15"
            width="70"
            height="70"
            stroke="url(#rectGradient)"
            strokeWidth="1.5"
            fill="none"
            initial={{ rotate: 0, scale: 1 }}
            animate={{ rotate: [0, 360], scale: [1, 0.9, 1] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Moving Lines */}
          <motion.line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="url(#circleGradient)"
            strokeWidth="0.8"
            initial={{ x1: 0, x2: 100 }}
            animate={{ x1: [0, 100, 0], x2: [100, 0, 100] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          <motion.line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            stroke="url(#rectGradient)"
            strokeWidth="0.8"
            initial={{ y1: 0, y2: 100 }}
            animate={{ y1: [0, 100, 0], y2: [100, 0, 100] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />

          {/* Dynamic Smaller Circles */}
          <motion.circle
            cx="30"
            cy="70"
            r="5"
            fill="url(#rectGradient)"
            initial={{ scale: 0.5 }}
            animate={{
              scale: [0.8, 1, 0.8],
              x: [0, 20, -20, 0],
              y: [0, -20, 20, 0],
              zIndex: [1, 0, 1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="70"
            cy="30"
            r="5"
            fill="url(#circleGradient)"
            initial={{ scale: 0.5 }}
            animate={{
              scale: [0.8, 1, 0.8],
              x: [0, -20, 20, 0],
              y: [0, 20, -20, 0],
              zIndex: [0, 1, 0, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default FuturisticAnimation;
