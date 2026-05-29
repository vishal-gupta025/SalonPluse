import { Link } from "react-router-dom";

export function PageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="dashboard-card">
        <div className="h-4 w-28 rounded-full bg-slate-200" />
        <div className="mt-3 h-8 w-72 rounded-full bg-slate-200" />
        <div className="mt-3 h-4 w-96 max-w-full rounded-full bg-slate-200" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="dashboard-card h-32">
            <div className="h-3 w-24 rounded-full bg-slate-200" />
            <div className="mt-4 h-8 w-20 rounded-full bg-slate-200" />
            <div className="mt-6 h-1.5 w-16 rounded-full bg-slate-200" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="dashboard-card h-[380px]">
            <div className="h-5 w-40 rounded-full bg-slate-200" />
            <div className="mt-6 h-[300px] rounded-3xl bg-slate-100" />
          </div>
        ))}
      </div>

      <div className="dashboard-card h-[360px]">
        <div className="h-5 w-36 rounded-full bg-slate-200" />
        <div className="mt-6 h-[280px] rounded-3xl bg-slate-100" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <div className="dashboard-table-shell animate-pulse">
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="h-5 w-40 rounded-full bg-slate-200" />
      </div>
      <div className="overflow-x-auto px-6 py-4">
        <div className="min-w-[640px] space-y-4">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
            {Array.from({ length: columns }).map((_, index) => (
              <div key={index} className="h-3 rounded-full bg-slate-200" />
            ))}
          </div>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-4 rounded-2xl border border-slate-100 px-0 py-4"
              style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: columns }).map((_, columnIndex) => (
                <div key={columnIndex} className="h-4 rounded-full bg-slate-200" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function InlineErrorState({ title, message, onRetry }) {
  return (
    <div className="dashboard-card border border-rose-200 bg-rose-50">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-rose-900">{title}</h3>
          <p className="mt-2 text-sm text-rose-700">{message}</p>
        </div>

        {onRetry && (
          <button type="button" onClick={onRetry} className="dashboard-button-primary">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export function FullPageError({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.10),_transparent_28%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl items-center justify-center">
        <div className="dashboard-card w-full border border-slate-200 bg-white p-8 text-center shadow-2xl shadow-slate-200/50 sm:p-10">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Bizora</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">{message}</p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {onRetry ? (
              <button type="button" onClick={onRetry} className="dashboard-button-primary w-full sm:w-auto">
                Retry
              </button>
            ) : (
              <Link to="/dashboard" className="dashboard-button-primary w-full sm:w-auto">
                Go to Dashboard
              </Link>
            )}
            <Link to="/" className="dashboard-button-secondary w-full sm:w-auto">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
