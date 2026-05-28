import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function TopServicesChart({
  data
}) {

  return (
    <div className="dashboard-card h-full">

      <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
        Top Services
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="service_name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="count" />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default TopServicesChart;