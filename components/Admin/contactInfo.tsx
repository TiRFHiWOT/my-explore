import React from "react";

interface ContactInfo {
  email: string;
  phone: string;
  twitter: string;
  facebook: string;
  instagram: string;
}

interface ContactInfoInputProps {
  info: ContactInfo;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showContactInfo: boolean;
  toggleContactInfo: () => void;
}

const ContactInfoInput: React.FC<ContactInfoInputProps> = ({
  info,
  handleInputChange,
  showContactInfo,
  toggleContactInfo,
}) => {
  return (
    <div className="relative bg-gradient-to-tr from-slate-100 via-slate-200 to-slate-300 dark:from-gray-600 dark:to-gray-700 rounded-lg p-6 shadow-sm border border-gray-300 dark:border-gray-600 transition-transform duration-300 hover:scale-[101%] hover:shadow-lg">
      <button
        onClick={toggleContactInfo}
        className="w-full text-left text-2xl font-semibold text-gray-600 dark:text-blue-300 flex items-center justify-between"
      >
        <span>Contact Information</span>
        <svg
          className={`w-8 h-8 transition-transform duration-300 ${
            showContactInfo ? "rotate-180" : "rotate-0"
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
      {showContactInfo && (
        <div className="mt-6 space-y-4">
          <input
            type="email"
            name="email"
            value={info.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="border border-gray-300 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg focus:ring-indigo-500 focus:border-indigo-500 w-full transition duration-300 ease-in-out transform"
          />
          <input
            type="tel"
            name="phone"
            value={info.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="border border-gray-300 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg focus:ring-indigo-500 focus:border-indigo-500 w-full transition duration-300 ease-in-out transform"
          />
          <input
            type="text"
            name="twitter"
            value={info.twitter}
            onChange={handleInputChange}
            placeholder="Twitter URL"
            className="border border-gray-300 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg focus:ring-indigo-500 focus:border-indigo-500 w-full transition duration-300 ease-in-out transform"
          />
          <input
            type="text"
            name="facebook"
            value={info.facebook}
            onChange={handleInputChange}
            placeholder="Facebook URL"
            className="border border-gray-300 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg focus:ring-indigo-500 focus:border-indigo-500 w-full transition duration-300 ease-in-out transform"
          />
          <input
            type="text"
            name="instagram"
            value={info.instagram}
            onChange={handleInputChange}
            placeholder="Instagram URL"
            className="border border-gray-300 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg focus:ring-indigo-500 focus:border-indigo-500 w-full transition duration-300 ease-in-out transform"
          />
        </div>
      )}
    </div>
  );
};

export default ContactInfoInput;
