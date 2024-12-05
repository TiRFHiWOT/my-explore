import Image from "next/image";
import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import LogoutButton from "../Button/page";

interface UserProfileCardProps {
  user: {
    username: string;
    email: string;
    profilePicture?: string;
  };
  onUpdateProfile: (newProfilePicture: string) => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  user,
  onUpdateProfile,
}) => {
  const [newProfilePicture, setNewProfilePicture] = useState(
    user.profilePicture || ""
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProfilePicture(reader.result as string);
        onUpdateProfile(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <section className="absolute top-12 right-2 p-5 bg-black bg-opacity-20 backdrop-blur border border-cyan-400 dark:border-cyan-700 shadow-2xl rounded-lg z-50">
      {" "}
      <div className="text-center p-6 bg-gray-300 dark:bg-gray-800 backdrop-blur rounded-lg w-56 border-4 border-dashed border-gray-400 dark:border-gray-700 z-50">
        <div className="relative mb-4 flex justify-center items-center w-full">
          <Image
            src={newProfilePicture || "/swirl.png"}
            width={100}
            height={100}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-cyan-400 dark:border-cyan-600"
          />
          <label
            htmlFor="profilePicture"
            className="absolute bottom-1 right-[20%] p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors cursor-pointer"
          >
            <FaCamera />
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex flex-row space-x-2 items-center justify-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {user.username}
          </h2>
        </div>
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
        </div>

        <LogoutButton />
      </div>
    </section>
  );
};

export default UserProfileCard;
