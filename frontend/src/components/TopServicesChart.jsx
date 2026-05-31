import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";

function TopServicesChart({
  data
}) {

  const palette = ["#0f766e", "#f97316", "#8b5cf6", "#06b6d4", "#22c55e"];

  return (
    <div className="dashboard-card h-full overflow-hidden bg-gradient-to-br from-white via-teal-50/50 to-slate-50/40">

      <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
        Top Services
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Services with the strongest demand are highlighted here.
      </p>

      <div className="mx-auto mt-2 max-w-2xl">

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" stroke="#ccfbf1" vertical={false} />

          <XAxis dataKey="service_name" tick={{ fill: "#64748b", fontSize: 12 }} stroke="#99f6e4" />

          <YAxis tick={{ fill: "#64748b", fontSize: 12 }} stroke="#99f6e4" />

          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: "1px solid #ccfbf1",
              background: "rgba(255, 255, 255, 0.94)",
              boxShadow: "0 20px 45px rgba(148, 163, 184, 0.18)"
            }}
            labelStyle={{ color: "#0f172a", fontWeight: 600 }}
          />

          <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={42}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={palette[index % palette.length]}
              />
            ))}
          </Bar>

        </BarChart>

      </ResponsiveContainer>

      </div>

    </div>
  );
}

export default TopServicesChart;