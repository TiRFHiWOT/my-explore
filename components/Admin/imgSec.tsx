import React from "react";
import ImageUpload from "./image";
import ImageGallery from "./gallery";
import { useImageUpload } from "./useImageUpload";

interface ImageSectionProps {
  name: string;
  label: string;
  images: string[];
  handleRemoveImage: (index: number) => void;
  showImages: boolean;
  toggleImages: () => void;
  updateField: (field: string, value: string[]) => void;
}

const ImageSection: React.FC<ImageSectionProps> = ({
  name,
  label,
  images,
  handleRemoveImage,
  showImages,
  toggleImages,
  updateField,
}) => {
  const { handleImageUpload, uploadingIndexes } = useImageUpload({
    field: "images",
    updateField: (field, value) => updateField(field, value),
  });

  return (
    <div
      className="relative bg-gradient-to-tr from-slate-100 via-slate-200 to-slate-300 dark:from-gray-600 dark:to-gray-700 rounded-lg p-6 shadow-sm 
    border border-gray-300 dark:border-gray-600 transition-transform duration-300 hover:scale-[101%] hover:shadow-lg"
    >
      <button
        onClick={toggleImages}
        className="w-full text-left text-2xl font-semibold text-gray-600 dark:text-blue-300 flex items-center justify-between"
      >
        <span>{label}</span>
        <svg
          className={`w-8 h-8 transition-transform duration-300 ${
            showImages ? "rotate-180" : "rotate-0"
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
      {showImages && (
        <div className="mt-4">
          <ImageUpload handleImageUpload={handleImageUpload} name={name} />
          <ImageGallery
            images={images}
            handleRemoveImage={handleRemoveImage}
            loadingIndexes={uploadingIndexes}
          />
        </div>
      )}
    </div>
  );
};

export default ImageSection;
