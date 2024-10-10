import React, { useEffect } from "react";
import Layout from "../Layout/page";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContactInfo,
  fetchLocationInfo,
} from "@/store/slices/contactAdminSlice";
import { RootState } from "@/store/store";
import VisitUs from "../Admin/visitUs";
import LoadingOrError from "../Loading&Error/page";

const Contact = () => {
  const dispatch = useDispatch();

  // Access Redux state
  const { contactInfo, locationInfo, loading, error } = useSelector(
    (state: RootState) => state.contactAdmin
  );

  useEffect(() => {
    dispatch(fetchContactInfo());
    dispatch(fetchLocationInfo());
  }, [dispatch]);

  if (loading || error) {
    return <LoadingOrError loading={loading} error={error} />;
  }

  const socialLinks = [
    {
      name: "Email",
      href: `mailto:${contactInfo?.email}`,
      text: contactInfo?.email,
    },
    {
      name: "Phone",
      href: `tel:${contactInfo?.phone}`,
      text: contactInfo?.phone,
    },
    { name: "Twitter", href: contactInfo?.twitter, text: "Twitter" },
    { name: "Facebook", href: contactInfo?.facebook, text: "Facebook" },
    { name: "Instagram", href: contactInfo?.instagram, text: "Instagram" },
  ];

  return (
    <Layout>
      <section id="contact" className="relative text-white py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative container mx-auto px-6 lg:px-12 text-center"
        >
          <h2 className="text-5xl py-3 font-extrabold mb-8 leading-tight backdrop-blur border border-gray-300 dark:border-gray-800 rounded-3xl">
            <span className="block text-teal-400">
              We'd Love to Hear From You!
            </span>
            <span className="block text-teal-400">Get in touch with us.</span>
          </h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto leading-relaxed text-gray-700 dark:text-gray-400">
            Whether you have questions, feedback, or just want to say hello,
            feel free to reach out. We are always here to help!
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-10 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform backdrop-blur border border-gray-300 dark:border-gray-800"
            >
              <h3 className="text-4xl font-bold mb-6 text-gray-700 dark:text-gray-200">
                Send Us a Message
              </h3>
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  aria-label="Your Name"
                  className="w-full px-5 py-4 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  aria-label="Your Email"
                  className="w-full px-5 py-4 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
                <textarea
                  placeholder="Your Message"
                  aria-label="Your Message"
                  rows={6}
                  className="w-full px-5 py-4 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-teal-600 dark:bg-teal-500 text-white font-bold rounded-lg shadow-md hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
            {/* Contact Info & Visit Us */}
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="backdrop-blur border border-gray-300 dark:border-gray-800 p-10 rounded-2xl shadow-2xl"
              >
                <h3 className="text-4xl font-bold mb-6 text-gray-700 dark:text-gray-200">
                  Other Ways to Reach Us
                </h3>
                <p className="mb-4 text-gray-700 text-lg dark:text-gray-300">
                  You can also contact us through our social media channels:
                </p>
                <ul className="space-y-4 text-lg">
                  {socialLinks.map((link) =>
                    link.href ? (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-teal-600 dark:text-teal-500 hover:underline"
                        >
                          {link.text}
                        </a>
                      </li>
                    ) : null
                  )}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="backdrop-blur border border-gray-300 dark:border-gray-800 p-10 rounded-2xl shadow-2xl"
              >
                <h4 className="text-3xl font-bold mb-4 text-gray-700 dark:text-gray-200">
                  Visit Us
                </h4>
                <p className="mb-4 text-gray-700 text-lg dark:text-gray-300">
                  {locationInfo?.address}, {locationInfo?.city},{" "}
                  {locationInfo?.country}
                </p>
                <div className="aspect-w-16 aspect-h-9">
                  <VisitUs location={locationInfo!} />
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${locationInfo?.address}, ${locationInfo?.city}, ${locationInfo?.country}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-teal-600 dark:text-teal-500 hover:underline"
                >
                  Open in Google Maps
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Contact;
