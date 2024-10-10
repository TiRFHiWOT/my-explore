const QuickActions = () => (
  <div className="flex justify-center space-x-4 mb-12">
    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      Add New Task
    </button>
    <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      View Reports
    </button>
  </div>
);

export default QuickActions;
