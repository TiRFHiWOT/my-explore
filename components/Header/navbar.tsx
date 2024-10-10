"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/Toggle/themeToggle";

const menuItems = [
  { href: "#features", label: "Features" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact Us" },
];

const serviceItems = [
  { href: "/services/1", label: "Service 1" },
  { href: "/services/2", label: "Service 2" },
  { href: "/services/3", label: "Service 3" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900 shadow-lg" : "bg-transparent"
      }`}
      style={{ height: scrolled ? "60px" : "70px" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" aria-label="Home">
          <div className="text-3xl font-extrabold flex items-center space-x-2 cursor-pointer">
            <span className="text-indigo-500">Brand</span>
            <span className="text-white">Name</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center text-white text-sm tracking-wider">
          {menuItems.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>
                <div
                  className={`py-3 transition cursor-pointer ${
                    pathname === href
                      ? "text-indigo-500"
                      : "hover:text-indigo-500"
                  }`}
                >
                  {label}
                </div>
              </Link>
            </li>
          ))}
          <li className="relative group">
            <button
              onClick={toggleDropdown}
              className={`flex items-center py-3 transition ${
                dropdownOpen ? "text-indigo-500" : "hover:text-indigo-500"
              }`}
              aria-expanded={dropdownOpen}
              aria-controls="services-menu"
              aria-haspopup="true"
            >
              Services
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <AnimatePresence>
              {(dropdownOpen || scrolled) && (
                <motion.div
                  id="services-menu"
                  className="absolute top-full w-48 bg-white text-gray-700 rounded-lg shadow-lg group-hover:block hidden overflow-hidden"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {serviceItems.map(({ href, label }) => (
                    <Link key={href} href={href}>
                      <div className="block px-4 py-2 hover:bg-gray-300 cursor-pointer">
                        {label}
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <ThemeToggle />
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-5">
          <ThemeToggle />
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu with Dark Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              className="absolute top-5 right-4 text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Close mobile menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-col items-center justify-center space-y-4 py-8 h-full">
              {menuItems.map(({ href, label }) => (
                <Link key={href} href={href}>
                  <motion.div
                    className={`text-2xl font-semibold transition cursor-pointer ${
                      pathname === href
                        ? "text-indigo-500"
                        : "hover:text-indigo-400"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleMenu}
                  >
                    {label}
                  </motion.div>
                </Link>
              ))}
              <Link href="#services">
                <motion.div
                  className={`text-2xl font-semibold transition cursor-pointer ${
                    pathname === "#services"
                      ? "text-indigo-500"
                      : "hover:text-indigo-400"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMenu}
                >
                  Services
                </motion.div>
              </Link>
              <Link href="#contact">
                <motion.div
                  className={`text-2xl font-semibold transition cursor-pointer ${
                    pathname === "#contact"
                      ? "text-indigo-500"
                      : "hover:text-indigo-400"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMenu}
                >
                  Contact Us
                </motion.div>
              </Link>
              <Link href="#get-started">
                <motion.div
                  className="px-8 py-3 bg-indigo-600 rounded-full hover:bg-indigo-700 transition text-lg font-semibold"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMenu}
                >
                  Get Started
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
