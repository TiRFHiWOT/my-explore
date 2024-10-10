import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Action from "./action";

interface Feature {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
  handleEditFeature: (feature: Feature) => void;
  handleRemoveFeature: (featureId: string) => void;
}

const icons = {
  AiFillHome: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-20 w-20"
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
      className="h-20 w-20"
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
      className="h-20 w-20"
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

const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  handleEditFeature,
  handleRemoveFeature,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = icons[feature.icon as keyof typeof icons];

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Circle */}
      <div
        className={`w-5 h-5 rounded-full transition-colors duration-300 ${
          isHovered ? "bg-indigo-800" : "bg-indigo-600"
        }`}
      ></div>

      {/* Card */}
      {isHovered && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 mb-2 opacity-100 scale-100 transition-all duration-300 ease-in-out z-20">
          <div className="relative backdrop-blur w-[300px] text-center dark:bg-gray-900 rounded-2xl shadow-light dark:shadow-dark overflow-hidden">
            {/* Pointer */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-10px] w-0 h-0 border-x-[10px] border-x-transparent border-t-[10px] border-t-gray-100 dark:border-t-gray-900"></div>
            <div className="flex items-center justify-center border-b border-gray-700 pt-2">
              <div>
                {IconComponent ? (
                  <div className="h-24 w-full text-indigo-600">
                    {IconComponent}
                  </div>
                ) : (
                  <p className="text-red-500">Icon not found</p>
                )}
              </div>
            </div>
            <div className="p-4">
              <div className="mb-6">
                <p className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  {feature.name}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
            <Action
              card={feature}
              handleEdit={handleEditFeature}
              handleRemove={handleRemoveFeature}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
