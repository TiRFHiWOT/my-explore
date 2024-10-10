import React from "react";

interface TextAreaProps {
  name: string;
  value: string;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  label: string;
  showText: boolean;
  toggleText: () => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  value,
  handleInputChange,
  label,
  showText,
  toggleText,
}) => {
  return (
    <div
      className="relative bg-gradient-to-tr from-slate-100 via-slate-200 to-slate-300 dark:from-gray-600 dark:to-gray-700 rounded-lg p-6 shadow-sm border border-gray-300 dark:border-gray-600 
      transition-transform duration-300 hover:scale-[101%] hover:shadow-lg"
    >
      <button
        onClick={toggleText}
        className="w-full text-left text-2xl font-semibold text-gray-600 dark:text-blue-300 flex items-center justify-between"
      >
        <span>{label}</span>
        <svg
          className={`w-8 h-8 transition-transform duration-300 ${
            showText ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {showText && (
        <div className="mt-6">
          <textarea
            name={name}
            value={value}
            rows={4}
            onChange={handleInputChange}
            className="border border-gray-300 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg focus:ring-indigo-500 focus:border-indigo-500 w-full transition duration-300 ease-in-out transform"
          />
        </div>
      )}
    </div>
  );
};

export default TextArea;
