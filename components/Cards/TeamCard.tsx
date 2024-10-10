import React, { useState } from "react";
import Image from "next/image";
import {
  FaEdit,
  FaGithub,
  FaLinkedin,
  FaTrash,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";
import Action from "./action";

interface HoverCardProps {
  member: {
    id: string;
    title: string;
    links: { github: string; twitter: string; linkedin: string };
    images: string[];
    description: string;
  };
  handleEditMember: (member: {
    id: string;
    title: string;
    description: string;
    links: { github: string; twitter: string; linkedin: string };
    images: string[];
  }) => void;
  handleRemoveMember: (memberId: string) => void;
}

const HoverCard: React.FC<HoverCardProps> = ({
  member,
  handleEditMember,
  handleRemoveMember,
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
            <div className="flex items-center justify-center mb-3">
              <Image
                src={member.images[0]}
                alt={`Image of ${member.title}`}
                width={200}
                height={200}
                className="h-24 w-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="mb-6">
                <p className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                  {member.title}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {member.description}
                </p>
              </div>
              <div className="flex justify-around items-center space-x-4 ">
                <Link
                  href={member.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black bg-white hover:scale-105 p-0 rounded-full"
                  aria-label={`Visit ${member.title}'s GitHub`}
                >
                  <FaGithub size={28} />
                </Link>
                <Link
                  href={member.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 bg-white hover:scale-105 rounded-sm border-x"
                  aria-label={`Visit ${member.title}'s LinkedIn`}
                >
                  <FaLinkedin size={28} />
                </Link>
                <Link
                  href={member.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                  aria-label={`Visit ${member.title}'s Twitter`}
                >
                  <FaTwitter size={28} />
                </Link>
              </div>
            </div>

            <Action
              card={member}
              handleEdit={handleEditMember}
              handleRemove={handleRemoveMember}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HoverCard;
