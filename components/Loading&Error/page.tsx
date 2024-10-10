import { ColorRing } from "react-loader-spinner";

const LoadingOrError = ({ loading, error }: any) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh] bg-gray-100 dark:bg-gray-950">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[100vh] bg-gray-100 dark:bg-gray-950 px-4">
        <div className="max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-l-4 border-red-600">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">
            Oops! Something went wrong.
          </h2>
          <p className="text-gray-800 dark:text-gray-200">{error}</p>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Please try refreshing the page or check back later.
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingOrError;
