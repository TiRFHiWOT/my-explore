import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Layout from "../Layout/page";
import { fetchTestimonials } from "@/store/slices/testimonialsAdminSlice";
import LoadingOrError from "../Loading&Error/page";
import { motion } from "framer-motion";
import { Fa500Px } from "react-icons/fa";

const Testimonials = () => {
  const dispatch = useDispatch();
  const { testimonials, loading, error } = useSelector(
    (state: any) => state.testimonialAdmin
  );

  useEffect(() => {
    dispatch(fetchTestimonials() as any);
  }, [dispatch]);

  if (loading || error) {
    return <LoadingOrError loading={loading} error={error} />;
  }

  return (
    <Layout>
      <section className="py-20 backdrop-blur border border-gray-300 dark:border-gray-800 z-10 rounded-3xl">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-10"
          >
            What Our Clients Say
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {testimonials?.map((testimonial: any, index: number) => (
              <motion.div
                key={testimonial?.id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg transition-transform transform hover:scale-105 border-2 border-cyan-500 dark:border-cyan-600"
              >
                {testimonial && (
                  <>
                    <div className="flex justify-center mb-6">
                      <div className="border-4 rounded-full border-cyan-500 dark:border-cyan-600 ">
                        {testimonial.images?.[0] ? (
                          <Image
                            src={testimonial.images[0]}
                            alt={testimonial.name}
                            width={200}
                            height={200}
                            className="rounded-full w-40 h-40 object-cover shadow-lg hover:scale-110 transition-all duration-500"
                          />
                        ) : (
                          <div className="w-40 h-40 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-500 dark:text-gray-400">
                              No Image
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="italic text-gray-600 dark:text-gray-300 mb-4 tracking-wide">
                      {`"${testimonial.comment}"`}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 tracking-wide">
                      - {testimonial.name}
                    </p>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
