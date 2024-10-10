import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaBars,
  FaInfoCircle,
  FaChartBar,
  FaClock,
  FaUsers,
  FaQuoteLeft,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa";
import ThemeToggle from "@/components/Toggle/themeToggle";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed z-20 inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 bg-opacity-80 border-r border-gray-300 dark:border-gray-800 dark:bg-opacity-30 backdrop-blur-lg text-gray-800 dark:text-gray-100 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 bg-white dark:bg-gray-900 bg-opacity-40 dark:bg-opacity-50 backdrop-blur-lg flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <ThemeToggle />
          <button
            className="md:hidden text-gray-800 dark:text-gray-100 focus:outline-none"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
        </div>
        <nav className="mt-6 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {[
              { href: "/admin/about", label: "About", icon: FaInfoCircle },
              { href: "/admin/features", label: "Features", icon: FaChartBar },
              { href: "/admin/timeline", label: "Timeline", icon: FaClock },
              { href: "/admin/team", label: "Team", icon: FaUsers },
              {
                href: "/admin/testimonials",
                label: "Testimonials",
                icon: FaQuoteLeft,
              },
              { href: "/admin/contact", label: "Contact", icon: FaEnvelope },
            ].map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link href={href}>
                  <div
                    className={`flex items-center px-6 py-3 transition-colors duration-300 transform ${
                      router.pathname === href
                        ? "bg-indigo-600 text-white"
                        : "text-black dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-900"
                    }`}
                  >
                    <Icon className="w-6 h-6 mr-3" />
                    <span className="font-medium">{label}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 w-full p-6 bg-white dark:bg-gray-900 bg-opacity-40 dark:bg-opacity-50 backdrop-blur-lg text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; 2024 Your Company
          </p>
        </div>
      </div>

      {/* Toggle Button for Small Screens */}
      {!sidebarOpen && (
        <div className="md:hidden fixed top-4 left-4 z-30">
          <button
            className="text-white bg-indigo-700 dark:bg-indigo-600 p-2 rounded-md shadow-md focus:outline-none"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="relative flex-1 md:ml-64 p-8 bg-gray-100 dark:bg-gray-900 min-h-[100vh]">
        <div
          className="absolute inset-0 bg-cover bg-fixed"
          style={{
            backgroundImage: "url('/pngegg (10).png')",
            opacity: 0.5,
          }}
        ></div>
        <div className="relative z-10 max-w-5xl mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
