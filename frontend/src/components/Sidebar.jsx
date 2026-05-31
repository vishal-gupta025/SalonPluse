import {
  NavLink
} from "react-router-dom";

function Sidebar({
  mobileOpen,
  onClose
}) {

  const navItems = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/customers", label: "Customers" },
    { to: "/services", label: "Services" },
    { to: "/visits", label: "Visits" },
    { to: "/expenses", label: "Expenses" }
  ];

  const linkClass =
    ({ isActive }) =>

      `flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition duration-200 ${
        isActive
          ? "border border-teal-100 bg-teal-50 text-teal-700 shadow-sm"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
      }`;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-teal-100 bg-gradient-to-b from-teal-50 via-white to-slate-50 text-slate-900 shadow-xl shadow-teal-100/40 transition-transform duration-300 lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >

      <div className="flex h-full flex-col">

        <div className="flex items-center justify-between border-b border-teal-100 px-6 py-5">

          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Bizora
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              Dashboard
            </h1>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-teal-100 p-2 text-slate-500 transition hover:bg-teal-100 hover:text-slate-900 lg:hidden"
            aria-label="Close navigation"
          >
            ×
          </button>

        </div>

        <nav className="flex-1 space-y-2 px-4 py-6">

          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={linkClass}
              onClick={onClose}
            >
              {item.label}
            </NavLink>
          ))}

        </nav>

      </div>

    </aside>

  );
}

export default Sidebar;