import { motion } from "framer-motion";
import Link from "next/link";

const Button = () => {
  return (
    <section>
      <motion.div
        className="px-8 py-3 md:py-4 tracking bg-indigo-600 text-white font-semibold rounded-full w-fit hover:bg-indigo-700 transition duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="#features">Get Started</Link>
      </motion.div>
    </section>
  );
};

export default Button;
