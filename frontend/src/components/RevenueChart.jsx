import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function RevenueChart({ data }) {

  return (
    <div className="dashboard-card h-full">

      <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
        Revenue Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default RevenueChart;