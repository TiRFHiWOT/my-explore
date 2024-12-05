import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchTimelineItems } from "@/store/slices/timelineAdminSlice";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import Layout from "@/components/Layout/page";
import LoadingOrError from "../Loading&Error/page";

const TimelinePage = () => {
  const dispatch = useDispatch();
  const { timelineItems, loading, error } = useSelector(
    (state: RootState) => state.timelineAdmin
  );

  useEffect(() => {
    dispatch(fetchTimelineItems() as any);
  }, [dispatch]);

  if (loading || error) {
    return <LoadingOrError loading={loading} error={error} />;
  }

  return (
    <Layout>
      <section className="py-20 mt-14 backdrop-blur border border-gray-300 dark:border-gray-800 z-10 rounded-3xl">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.h3
            className="text-5xl font-extrabold text-center mb-10 text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Journey
          </motion.h3>
          <div className="relative overflow-y-clip">
            <motion.div
              initial={{ y: "-50%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.85, delay: 2 }}
              viewport={{ once: true }}
              className="absolute border-l-4 border-gray-300 dark:border-gray-600 left-1/2 transform -translate-x-1/2 h-full top-0"
            ></motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {timelineItems.length > 0 ? (
                timelineItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="relative bg-gray-200 group dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-300 dark:border-gray-600 hover:shadow-xl transition-transform transform hover:scale-105"
                    initial={{
                      x: index % 2 ? "-53%" : "53%",
                      y: `${-123 * Math.floor(index / 2)}%`,
                    }}
                    animate={{
                      x: 0,
                      y: 0,
                    }}
                    transition={{
                      x: { duration: 0.8, delay: 0.5 },
                      y: {
                        duration: 1,
                        delay: 1.5 * Math.floor(index / 2),
                      },
                    }}
                  >
                    <div className="absolute top-1/2 left-[-22px] group-hover:scale-110 transform transition-all duration-700 -translate-y-1/2 flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full shadow">
                      <FaCalendarAlt size={24} />
                    </div>
                    <div className=" relative ml-10 pl-6 group transition-all duration-1000">
                      <div className="absolute top-0 left-0 border-l-8 h-full border-yellow-400 group-hover:border-yellow-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-1000 origin-top"></div>
                      <h4 className="text-2xl text-gray-800 dark:text-gray-100 font-semibold mb-2">
                        {item.year}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  No timeline items available.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TimelinePage;
