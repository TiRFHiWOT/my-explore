import React from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

interface ImageGalleryProps {
  images: string[];
  loadingIndexes: number[];
  handleRemoveImage: (index: number) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images = [],
  loadingIndexes = [],
  handleRemoveImage,
}) => (
  <div className="flex flex-row gap-3 mt-4 rounded-lg w-fit flex-wrap">
    {images.map((image, index) => (
      <div
        key={index}
        className="relative rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 bg-gray-400 dark:bg-gray-900 p-2"
      >
        <Image
          src={image}
          height={150}
          width={150}
          alt={`Uploaded ${index}`}
          className={`w-48 h-48 object-cover bg-gray-200 dark:bg-gray-800 ${
            loadingIndexes.includes(index) ? "opacity-50" : ""
          }`}
        />
        {loadingIndexes.includes(index) && (
          <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
            <svg
              className="animate-spin h-8 w-8 text-gray-300"
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
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => handleRemoveImage(index)}
            className="text-white p-2 rounded-full bg-red-600 hover:bg-red-700"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    ))}
    {loadingIndexes.length > 0 && images.length === 0 && (
      <div className="p-2 rounded-lg bg-gray-400 dark:bg-gray-900">
        <div className="h-48 w-48 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
          <svg
            className="animate-spin h-8 w-8 text-gray-300"
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
        </div>
      </div>
    )}
  </div>
);

export default ImageGallery;
