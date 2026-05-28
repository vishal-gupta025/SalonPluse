import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function PaymentChart({
  data
}) {

  const chartData = Object.keys(data).map(
    (key) => ({
      name: key,
      value: data[key]
    })
  );

  return (
    <div className="dashboard-card h-full">

      <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
        Payment Breakdown
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
          />

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default PaymentChart;