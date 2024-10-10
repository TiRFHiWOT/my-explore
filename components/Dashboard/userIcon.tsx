import { motion } from "framer-motion";
import { FaSpinner, FaUser } from "react-icons/fa";

const UserProfileIcon: React.FC<{
  onUserClick: () => void;
  loading: boolean;
}> = ({ onUserClick, loading }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className=" absolute right-2 bottom-1 flex justify-end space-x-4 w-fit"
    >
      <button
        onClick={onUserClick}
        className="p-2 bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition"
      >
        {loading ? (
          <FaSpinner className="animate-spin text-gray-800 dark:text-white" />
        ) : (
          <FaUser className="text-gray-800 dark:text-white" />
        )}
      </button>
    </motion.div>
  );
};

export default UserProfileIcon;
