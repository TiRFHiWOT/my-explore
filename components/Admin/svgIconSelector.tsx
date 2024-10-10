import React, { useState } from "react";

interface SvgIconSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showSvg: boolean;
  toggleSvg: () => void;
}

const icons = {
  AiFillHome: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h18M9 3v18m6-18v18M3 9h18m-9 0V3m0 6v18"
      />
    </svg>
  ),
  AiFillStar: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  AiFillApple: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h18M3 9h18m-9 6v6m0 0H9m3 0h3"
      />
    </svg>
  ),
};

const SvgIconSelector: React.FC<SvgIconSelectorProps> = ({
  label,
  value,
  onChange,
  showSvg,
  toggleSvg,
}) => {
  return (
    <div
      className="relative bg-gradient-to-tr from-slate-100 via-slate-200 to-slate-300 dark:from-gray-600 dark:to-gray-700 rounded-lg p-6 shadow-sm border border-gray-300 dark:border-gray-600 
    transition-transform duration-300 hover:scale-[101%] hover:shadow-lg"
    >
      <button
        onClick={toggleSvg}
        className="w-full text-left text-2xl font-semibold text-gray-600 dark:text-blue-300 flex items-center justify-between"
      >
        <span>{label}</span>
        <svg
          className={`w-8 h-8 transition-transform duration-300 ${
            showSvg ? "rotate-180" : "rotate-0"
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
      {showSvg && (
        <div className="mt-6">
          <div className="space-y-4">
            <div className="relative">
              <select
                className="border border-gray-300 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg focus:ring-indigo-500 focus:border-indigo-500 w-full transition duration-300 ease-in-out transform"
                value={value}
                onChange={(e) => onChange(e.target.value)}
              >
                {Object.keys(icons).map((iconKey) => (
                  <option key={iconKey} value={iconKey}>
                    {iconKey}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-5 text-2xl pointer-events-none">
                {icons[value as keyof typeof icons]}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SvgIconSelector;
