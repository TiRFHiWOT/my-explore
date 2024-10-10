import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ActionProps {
  card: any;
  handleEdit: (card: any) => void;
  handleRemove: (Id: string) => void;
}

const Action: React.FC<ActionProps> = ({ card, handleEdit, handleRemove }) => {
  return (
    <>
      {/* Pointer */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-10px] w-0 h-0 border-x-[10px] border-x-transparent border-t-[10px] border-t-gray-100 dark:border-t-gray-900"></div>
      <div className="grid grid-cols-2 border-t border-gray-400 dark:border-gray-700">
        <button
          onClick={() => handleEdit(card)}
          className="text-blue-500 text-2xl flex justify-center items-center dark:border-gray-700 px-5 py-4 hover:bg-blue-500 hover:text-gray-100"
          aria-label={`Edit ${card.name}`}
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleRemove(card.id)}
          className="text-red-500 text-2xl flex justify-center items-center dark:border-gray-700 px-5 py-4 hover:bg-red-500 hover:text-gray-100"
          aria-label={`Remove ${card.name}`}
        >
          <FaTrash />
        </button>
      </div>
    </>
  );
};

export default Action;
