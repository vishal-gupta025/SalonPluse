function SummaryCard({
  title,
  value
}) {

  return (
    <div className="dashboard-card h-full">

      <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
        {title}
      </h2>

      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>

      <div className="mt-5 h-1.5 w-16 rounded-full bg-gradient-to-r from-sky-600 to-cyan-400" />

    </div>
  );
}

export default SummaryCard;