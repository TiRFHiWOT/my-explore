import { motion } from "framer-motion";

const Button = () => {
  return (
    <section>
      <motion.button
        className="px-8 py-3 md:py-4 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(0,0,0,0.3)" }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started
      </motion.button>
    </section>
  );
};

export default Button;
