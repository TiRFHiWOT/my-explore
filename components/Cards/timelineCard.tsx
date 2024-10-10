import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Action from "./action";

interface TimelineItem {
  id: string;
  year: string;
  description: string;
}

interface TimelineCardProps {
  item: TimelineItem;
  handleEditItem: (item: TimelineItem) => void;
  handleRemoveItem: (itemId: string) => void;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  item,
  handleEditItem,
  handleRemoveItem,
}) => {
  const [isHovered, setIsHovered] = useState(false);

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
            <div className="p-4">
              <p className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                {item.year}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>

            <Action
              card={item}
              handleEdit={handleEditItem}
              handleRemove={handleRemoveItem}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineCard;
