import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout/page";
import DashboardTitle from "./title";
import DataVisualization from "./dataVisualization";
import { motion } from "framer-motion";
import Widgets from "./widgets";
import UserProfileIcon from "./userIcon";
import UserProfileCard from "./userProfileCard";
import { useUser } from "./userContext";

const Dashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, updateProfilePicture } = useUser();

  const handleUserClick = async () => {
    if (!showProfile) {
      setLoading(true);
      setShowProfile((prev) => !prev);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowProfile(true);
      setLoading(false);
    } else {
      setShowProfile(false);
    }
  };

  return (
    <DashboardLayout>
      <section
        id="dashboard"
        className="relative max-w-5xl py-20 backdrop-blur border border-gray-300 dark:border-gray-800 rounded-2xl px-6 lg:px-8 text-center shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(0,0,0,0.5)]"
      >
        <div>
          <div className="relative mb-16 ">
            <UserProfileIcon onUserClick={handleUserClick} loading={loading} />
            {showProfile && user && (
              <UserProfileCard
                user={user}
                onUpdateProfile={updateProfilePicture}
              />
            )}
            <DashboardTitle />
          </div>

          <Widgets />
          <DataVisualization />
        </div>
        <motion.div
          className="absolute inset-0 pointer-events-none -z-50 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "radial-gradient(circle, #9ca3af  10%, transparent 10%)",
            backgroundSize: "10px 10px",
            opacity: 0.3,
          }}
        />
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
