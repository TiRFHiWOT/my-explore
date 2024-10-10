import { FaMountain } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", uv: 400 },
  { name: "Feb", uv: 300 },
  { name: "Mar", uv: 500 },
  { name: "Apr", uv: 200 },
  { name: "May", uv: 350 },
  { name: "Jun", uv: 420 },
];

const DataVisualization = () => (
  <div className="my-20">
    <div
      className="backdrop-blur-lg bg-gray-400 bg-opacity-20 dark:bg-gray-800/70 shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(0,0,0,0.5)]
       p-8 rounded-2xl transition-all border-2 border-gray-300 dark:border-gray-700"
    >
      <div className="flex flex-row gap-1 justify-center items-center mb-5">
        <div className="text-gray-800 dark:text-gray-300">
          <FaMountain size={32} />
        </div>
        <h3 className="text-3xl tracking-wider font-bold text-green-700 dark:text-green-500 p-2 w-fit">
          Monthly Performance
        </h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default DataVisualization;
