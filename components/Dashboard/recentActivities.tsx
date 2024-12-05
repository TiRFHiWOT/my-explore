const RecentActivities = () => (
  <div className="mt-12 bg-white/70 dark:bg-gray-800/70 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
      Recent Activities
    </h3>
    <ul className="space-y-4 text-left">
      <li className="text-gray-600 dark:text-gray-300">
        <strong>John Doe</strong> added a new task {`"Design Landing Page"`}.
      </li>
      <li className="text-gray-600 dark:text-gray-300">
        <strong>Jane Smith</strong> completed the{" "}
        {`"Marketing Analysis" report`}.
      </li>
      <li className="text-gray-600 dark:text-gray-300">
        <strong>David Wilson</strong> sent you a message.
      </li>
    </ul>
  </div>
);

export default RecentActivities;
