"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../Layout/page";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAboutPageData } from "@/store/slices/aboutSlice";
import LoadingOrError from "../Loading&Error/page";

const About = () => {
  const dispatch = useAppDispatch();
  const { title, description, more, vision, images, loading, error } =
    useAppSelector((state) => state.about);
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    dispatch(getAboutPageData());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await controls.start({ opacity: 0, transition: { duration: 2 } });
      setCurrentIndex((prevIndex) =>
        images.length > 0 ? (prevIndex + 1) % images.length : 0
      );
      await controls.start({ opacity: 1, transition: { duration: 2 } });
    }, 5000);

    return () => clearInterval(interval);
  }, [controls, images]);

  if (loading || error) {
    return <LoadingOrError loading={loading} error={error} />;
  }

  return (
    <Layout>
      <section
        id="about"
        className="py-20 backdrop-blur border border-gray-300 dark:border-gray-800 relative overflow-hidden rounded-3xl"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center z-10 relative">
          <motion.h2
            className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 tracking-wide"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-12 leading-relaxed mx-auto max-w-3xl dark:text-gray-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {description}
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="relative overflow-hidden rounded-xl transform transition-transform duration-300 hover:scale-105"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                key={images[currentIndex]}
                animate={controls}
                transition={{ duration: 2 }}
                className="relative "
              >
                <Image
                  src={images[currentIndex]}
                  alt="About Us"
                  width={500}
                  height={500}
                  objectFit="cover"
                  quality={100}
                  className="w-full max-h-[18rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-50"></div>
              </motion.div>
            </motion.div>
            <div className="flex flex-col justify-center bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-300 dark:border-gray-600">
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                {more}
              </p>
              <div className="flex justify-center">
                <Link
                  href="#learn-more"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <section
            id="learn-more"
            className="py-20 mt-12 bg-gray-50 dark:bg-gray-900"
          >
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h3 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-gray-100">
                Our Vision and Values
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                {vision}
              </p>
              <div className="flex justify-center">
                <a
                  href="#contact"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default About;
