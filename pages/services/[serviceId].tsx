import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const servicesData = {
  "1": {
    title: "Service 1",
    description: "Detailed description for service 1.",
  },
  "2": {
    title: "Service 2",
    description: "Detailed description for service 2.",
  },
  "3": {
    title: "Service 3",
    description: "Detailed description for service 3.",
  },
};

const ServiceDetailPage = () => {
  const router = useRouter();
  const { serviceId } = router.query;
  const [serviceData, setServiceData] = useState<{
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    if (serviceId && typeof serviceId === "string") {
      setServiceData(servicesData[serviceId]);
    }
  }, [serviceId]);

  if (!serviceData)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-dark rounded-lg p-6">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {serviceData.title}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {serviceData.description}
          </p>
          <button
            onClick={() => router.push("/services")}
            className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            Back to Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
