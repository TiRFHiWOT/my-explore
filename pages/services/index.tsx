import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Header/navbar";
import Footer from "@/components/Footer/page";

const services = [
  {
    id: "1",
    title: "Service 1",
    description: "Brief description of service 1.",
  },
  {
    id: "2",
    title: "Service 2",
    description: "Brief description of service 2.",
  },
  {
    id: "3",
    title: "Service 3",
    description: "Brief description of service 3.",
  },
];

const ServicesPage = () => {
  const router = useRouter();
  const serviceRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeService, setActiveService] = useState<string | null>(null);

  useEffect(() => {
    if (router.query.serviceId) {
      const serviceId = router.query.serviceId as string;
      const targetRef = serviceRefs.current[serviceId];
      if (targetRef) {
        targetRef.scrollIntoView({ behavior: "smooth" });
        setActiveService(serviceId);
      }
    }
  }, [router.query.serviceId]);

  const activeServiceData = services.find(
    (service) => service.id === activeService
  );

  return (
    <div className="container mx-auto p-8 bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <header className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Our Services
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Explore the range of services we offer to help you achieve your
            goals.
          </p>
        </div>
      </header>

      {/* Services Grid/List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {services.map((service) => (
          <motion.div
            key={service.id}
            ref={(el) => (serviceRefs.current[service.id] = el)}
            id={`service${service.id}`}
            className="p-6 bg-white dark:bg-gray-800 shadow-lg dark:shadow-dark rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setActiveService(service.id)}
          >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              {service.title}
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {service.description}
            </p>
            <Link
              href={`/services/${service.id}`}
              className="text-blue-500 dark:text-blue-400 hover:underline mt-4 block"
            >
              Learn More
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Detailed Service Information */}
      {activeService && (
        <div className="mt-8 p-6 bg-white dark:bg-gray-800 shadow-lg dark:shadow-dark rounded-lg border border-gray-200 dark:border-gray-700">
          {activeServiceData && (
            <>
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                {activeServiceData.title}
              </h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                {activeServiceData.description}
              </p>
              <button
                onClick={() => setActiveService(null)}
                className="mt-4 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700"
              >
                Close
              </button>
            </>
          )}
        </div>
      )}

      {/* Call to Action */}
      <section className="bg-blue-500 dark:bg-blue-600 text-white p-8 text-center mt-8">
        <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
        <p className="mt-2">
          Contact us today to discuss how we can assist with your needs.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block px-6 py-3 bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Contact Us
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ServicesPage;
