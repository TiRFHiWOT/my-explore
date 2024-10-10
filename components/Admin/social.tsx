import React from "react";

interface SocialLinks {
  linkedin: string;
  twitter: string;
  github: string;
}

interface SocialLinksInputProps {
  links: SocialLinks;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showLinks: boolean;
  toggleLinks: () => void;
}

const SocialLinksInput: React.FC<SocialLinksInputProps> = ({
  links,
  handleInputChange,
  showLinks,
  toggleLinks,
}) => {
  return (
    <div
      className="relative bg-gradient-to-tr from-slate-100 via-slate-200 to-slate-300 dark:from-gray-600 dark:to-gray-700 rounded-lg p-6 shadow-sm
     border border-gray-300 dark:border-gray-600 transition-transform duration-300 hover:scale-[101%] hover:shadow-lg"
    >
      <button
        onClick={toggleLinks}
        className="w-full text-left text-2xl font-semibold text-gray-600 dark:text-blue-300 flex items-center justify-between"
      >
        <span>Social Links</span>
        <svg
          className={`w-8 h-8 transition-transform duration-300 ${
            showLinks ? "rotate-180" : "rotate-0"
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
      {showLinks && (
        <div className="mt-6 space-y-4">
          <input
            type="text"
            name="linkedin"
            value={links.linkedin}
            onChange={handleInputChange}
            placeholder="LinkedIn URL"
            className="border border-gray-300 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg focus:ring-indigo-500 focus:border-indigo-500 w-full transition duration-300 ease-in-out transform"
          />
          <input
            type="text"
            name="twitter"
            value={links.twitter}
            onChange={handleInputChange}
            placeholder="Twitter URL"
            className="border border-gray-300 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg focus:ring-indigo-500 focus:border-indigo-500 w-full transition duration-300 ease-in-out transform"
          />
          <input
            type="text"
            name="github"
            value={links.github}
            onChange={handleInputChange}
            placeholder="GitHub URL"
            className="border border-gray-300 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg focus:ring-indigo-500 focus:border-indigo-500 w-full transition duration-300 ease-in-out transform"
          />
        </div>
      )}
    </div>
  );
};

export default SocialLinksInput;
