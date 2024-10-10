import React, { useEffect, useState } from "react";
import Layout from "../Layout/page";
import { motion } from "framer-motion";
import { fetchFeaturesFromFirebase } from "@/components/Firebase/features";
import Icon from "../Icons/page";
import LoadingOrError from "../Loading&Error/page";
interface Feature {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof Icon;
}

const Features: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const featuresData = await fetchFeaturesFromFirebase();
        setFeatures(featuresData as any);
      } catch (err) {
        setError("Failed to fetch features.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  if (loading || error) {
    return <LoadingOrError loading={loading} error={error} />;
  }

  return (
    <Layout>
      <section
        className="py-20 backdrop-blur border border-gray-300 dark:border-gray-800 relative overflow-hidden rounded-3xl"
        id="features"
      >
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.h2
            className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-10 tracking-wide"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Our Key Features
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-indigo-900 p-8 rounded-2xl shadow-light dark:shadow-dark transform transition-transform duration-300 ease-in-out hover:scale-105"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center mb-4">
                  <Icon name={feature.icon} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                  {feature.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-6">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 w-64 h-64 rounded-full opacity-30"
            animate={{ rotate: 360 }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 transform translate-x-1/2 translate-y-1/2 bg-indigo-500 w-48 h-48 rounded-full opacity-30"
            animate={{ rotate: -360 }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Features;
