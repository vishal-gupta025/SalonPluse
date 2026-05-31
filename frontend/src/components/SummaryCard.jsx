function SummaryCard({
  title,
  value
}) {

  return (
    <div className="dashboard-card h-full overflow-hidden bg-gradient-to-br from-white via-teal-50/70 to-slate-50/80">

      <div className="h-1 w-full rounded-full bg-gradient-to-r from-teal-500 via-cyan-400 to-slate-400" />

      <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
        {title}
      </h2>

      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {value}
      </p>

      <div className="mt-5 h-1.5 w-20 rounded-full bg-gradient-to-r from-teal-600 via-cyan-500 to-slate-400" />

    </div>
  );
}

export default SummaryCard;