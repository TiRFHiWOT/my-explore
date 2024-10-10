import React, { useState } from "react";
import Image from "next/image";
import Action from "./action";

interface TestimonialCardProps {
  testimonial: {
    id: string;
    name: string;
    comment: string;
    images: string[];
  };
  handleEditTestimonial: (testimonial: {
    id: string;
    name: string;
    comment: string;
    images: string[];
  }) => void;
  handleRemoveTestimonial: (testimonialId: string) => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  handleEditTestimonial,
  handleRemoveTestimonial,
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
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 mb-2 opacity-100 scale-100 transition-all duration-300 ease-in-out z-50">
          <div className="relative backdrop-blur w-[300px] text-center dark:bg-gray-900 rounded-2xl shadow-light dark:shadow-dark overflow-hidden">
            <div className="flex items-center justify-center">
              <Image
                src={testimonial.images[0]}
                alt={`Image of ${testimonial.name}`}
                width={200}
                height={200}
                className="h-28 w-full object-cover"
              />
            </div>
            <div className="p-2">
              <div className="mb-4">
                <p className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
                  {testimonial.name}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {testimonial.comment}
                </p>
              </div>
            </div>
            <Action
              card={testimonial}
              handleEdit={handleEditTestimonial}
              handleRemove={handleRemoveTestimonial}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;
