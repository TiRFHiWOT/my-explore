import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Social = () => {
  return (
    <section>
      <motion.div
        className="flex w-fit space-x-4 md:mt-6 p-3 rounded-full backdrop-blur bg-[#00000044]"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <motion.a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-white hover:text-indigo-600 transition duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <FaFacebookF />
        </motion.a>
        <motion.a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-white hover:text-indigo-600 transition duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <FaTwitter />
        </motion.a>
        <motion.a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-white hover:text-indigo-600 transition duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <FaLinkedinIn />
        </motion.a>
        <motion.a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-white hover:text-indigo-600 transition duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <FaInstagram />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Social;
