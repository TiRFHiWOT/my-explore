import { motion } from "framer-motion";

const Para = () => {
  return (
    <motion.p
      className="md:text-lg max-w-xl leading-relaxed text-center md:text-start tracking-wider text-[#E0E0E0]"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      Explore the limitless possibilities with our state-of-the-art solutions.
      Join us in revolutionizing the world with innovation and technology.
    </motion.p>
  );
};

export default Para;
