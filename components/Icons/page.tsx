import React from "react";

export const icons = {
  AiFillHome: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-16 text-indigo-600"
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
      className="h-16 w-16 text-indigo-600"
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
      className="h-16 w-16 text-indigo-600"
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

  AiFillGithub: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-16 text-indigo-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.15 6.84 9.5.5.09.68-.22.68-.5v-1.8c-2.82.62-3.42-1.36-3.42-1.36-.46-1.2-1.12-1.52-1.12-1.52-.9-.62.07-.61.07-.61 1 0 1.8 1.03 1.8 1.03.89 1.53 2.34 1.09 2.91.84.09-.64.34-1.09.62-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.26-.45-1.3.1-2.72 0 0 .84-.27 2.75 1.03a9.41 9.41 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.42.2 2.46.1 2.72.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.58 4.94.35.3.66.9.66 1.8v2.67c0 .28.18.6.69.5A9.962 9.962 0 0 0 22 12c0-5.52-4.48-10-10-10z"
      />
    </svg>
  ),
  AiFillTwitter: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-16 text-indigo-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v6h3v-6H5zm8 0v6h3V3h-3zM5 9h3v12H5V9zm8 0v12h3V9h-3zM3 5h2v14H3V5zm16 0h2v14h-2V5z"
      />
    </svg>
  ),
};

type IconKey = keyof typeof icons;

interface IconProps {
  name: IconKey;
}

const Icon: React.FC<IconProps> = ({ name }) => {
  return <>{icons[name] || <p className="text-red-500">Icon not found</p>}</>;
};

export default Icon;
