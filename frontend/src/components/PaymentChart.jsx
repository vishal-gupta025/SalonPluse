import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from "recharts";

function PaymentChart({
  data
}) {

  const palette = ["#0f766e", "#f97316", "#06b6d4", "#8b5cf6", "#22c55e"];

  const chartData = Object.keys(data).map(
    (key) => ({
      name: key,
      value: data[key]
    })
  );

  return (
    <div className="dashboard-card h-full overflow-hidden bg-gradient-to-br from-white via-teal-50/60 to-slate-50/40">

      <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
        Payment Breakdown
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        A gentle breakdown of how customers pay.
      </p>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={102}
            innerRadius={60}
            paddingAngle={3}
            stroke="#ffffff"
            strokeWidth={3}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`slice-${entry.name}`}
                fill={palette[index % palette.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: "1px solid #ccfbf1",
              background: "rgba(255, 255, 255, 0.94)",
              boxShadow: "0 20px 45px rgba(148, 163, 184, 0.18)"
            }}
            labelStyle={{ color: "#0f172a", fontWeight: 600 }}
          />

          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span style={{ color: palette[chartData.findIndex((item) => item.name === value) % palette.length] || "#334155", fontSize: 13, fontWeight: 600 }}>
                {value}
              </span>
            )}
          />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default PaymentChart;