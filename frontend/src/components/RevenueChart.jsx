import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function RevenueChart({
  data,
  month,
  year,
  months,
  years,
  onMonthChange,
  onYearChange
}) {

  const activeMonth = `${year}-${String(month).padStart(2, "0")}`;

  const formatMonthLabel = (monthValue) => {
    const parsed = new Date(`${monthValue}-01T00:00:00`);

    return parsed.toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric"
    });
  };

  const monthData = data.filter((item) => item.month === activeMonth);
  const daysInMonth = new Date(year, month, 0).getDate();

  const chartData = Array.from({ length: daysInMonth }, (_, index) => ({
    day: index + 1,
    revenue: 0
  }));

  monthData.forEach((item) => {
    const row = chartData[item.day - 1];

    if (row) {
      row.revenue = item.revenue;
    }
  });

  const chartTooltipStyle = {
    borderRadius: 16,
    border: "1px solid #ccfbf1",
    background: "rgba(255, 255, 255, 0.94)",
    boxShadow: "0 20px 45px rgba(148, 163, 184, 0.18)"
  };

  return (
    <div className="dashboard-card h-full overflow-hidden bg-gradient-to-br from-white via-teal-50/60 to-cyan-50/40">

      <h2 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
        Daily Revenue Trend
      </h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">

        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Month</span>
          <select className="dashboard-input" value={month} onChange={onMonthChange}>
            {months.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Year</span>
          <select className="dashboard-input" value={year} onChange={onYearChange}>
            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

      </div>

      <p className="mt-3 text-sm text-slate-500">
        Daily revenue for {activeMonth ? formatMonthLabel(activeMonth) : "the selected month"}.
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" stroke="#ccfbf1" vertical={false} />

          <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 12 }} stroke="#99f6e4" />

          <YAxis tick={{ fill: "#64748b", fontSize: 12 }} stroke="#99f6e4" />

          <Tooltip
            contentStyle={chartTooltipStyle}
            labelFormatter={(label) => `Day ${label}`}
            formatter={(value) => [value, formatMonthLabel(activeMonth)]}
            labelStyle={{ color: "#0f172a", fontWeight: 600 }}
            itemStyle={{ color: "#0f766e" }}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#0f766e"
            strokeWidth={3}
            dot={{ r: 3, strokeWidth: 2, stroke: "#ffffff" }}
            activeDot={{ r: 6 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default RevenueChart;