import React, { useEffect } from "react";
import { useUser } from "@/components/Dashboard/userContext";
import { FaUser, FaCog, FaSave, FaExclamationTriangle } from "react-icons/fa";
import AdminSettings from "./adminSettings";
import UserProfileCard from "./userProfileCard";

interface UserProfileSettingsPageProps {
  section: "profile" | "settings";
}

const UserProfileSettingsPage: React.FC<UserProfileSettingsPageProps> = ({
  section,
}) => {
  const { user, fetchUserProfile, isLoading, error } = useUser();

  useEffect(() => {
    if (!user) {
      fetchUserProfile();
    }
  }, [user, fetchUserProfile]);

  console.log("User Data in Component:", user);

  if (isLoading) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <FaExclamationTriangle className="text-red-500 dark:text-red-400 text-4xl mb-2" />
        <p className="text-center text-red-500 dark:text-red-400">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex mt-2 items-center p-5 rounded-lg justify-center border border-gray-300 dark:border-gray-800 backdrop-blur bg-black bg-opacity-40 ${
        section === "profile" ? "mr-12" : ""
      }`}
    >
      {section === "profile" && user && <UserProfileCard user={user} />}
    </div>
  );
};

export default UserProfileSettingsPage;
