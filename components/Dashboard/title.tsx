import { motion } from "framer-motion";

const DashboardTitle = () => (
  <motion.h2
    className="text-5xl font-extrabold text-transparent bg-clip-text bg-yellow-500 dark:bg-blue-600 tracking-wide"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    Dashboard Overview
  </motion.h2>
);

export default DashboardTitle;
