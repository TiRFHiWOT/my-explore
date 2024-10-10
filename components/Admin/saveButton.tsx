import React from "react";
import { FaSave } from "react-icons/fa";

interface SaveButtonProps {
  handleSaveChanges: () => void;
  loading: boolean;
  label: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  handleSaveChanges,
  loading,
  label,
}) => (
  <div className="flex justify-end space-x-4">
    <button
      onClick={handleSaveChanges}
      className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transform transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            className="opacity-25"
          />
          <path
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l6 6-6 6v-4a4 4 0 00-4-4z"
          />
        </svg>
      ) : (
        <FaSave className="mr-2 mb-0.5" />
      )}
      {label}
    </button>
  </div>
);

export default SaveButton;
