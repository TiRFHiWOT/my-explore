import { motion } from "framer-motion";

const Heading = () => {
  return (
    <motion.h1
      className="text-5xl md:text-7xl font-black tracking-wide leading-tight"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Welcome to the Future
    </motion.h1>
  );
};

export default Heading;
