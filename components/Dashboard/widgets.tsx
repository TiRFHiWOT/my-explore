import { motion } from "framer-motion";
import { FaChartBar, FaTasks, FaEnvelope } from "react-icons/fa";

const widgets = [
  {
    id: 1,
    title: "Analytics",
    icon: <FaChartBar size={64} />,
    content: "Monitor your performance with real-time analytics and insights.",
  },
  {
    id: 2,
    title: "Tasks",
    icon: <FaTasks size={64} />,
    content:
      "Manage your tasks and deadlines efficiently with our integrated tool.",
  },
  {
    id: 3,
    title: "Messages",
    icon: <FaEnvelope size={64} />,
    content: "Stay connected with team members through instant messaging.",
  },
];

const Widgets = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
    {widgets.map((widget, index) => (
      <motion.div
        key={widget.id}
        className="relative py-8 px-5 rounded-2xl backdrop-blur-2xl bg-gray-400 bg-opacity-20 dark:bg-gray-800/70 border-2 border-gray-300 dark:border-gray-700 transform transition-all
         duration-300 ease-in-out hover:scale-105 group z-40 shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:dark:shadow-[0_0_15px_rgba(0,0,0,0.7)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <div className="flex items-center justify-center mb-6 text-blue-600 dark:text-amber-400 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700">
          {widget.icon}
        </div>
        <h3 className="text-2xl font-bold tracking-wider mb-4 text-gray-800 dark:text-gray-100  transition-colors duration-300">
          {widget.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {widget.content}
        </p>
      </motion.div>
    ))}
  </div>
);

export default Widgets;
