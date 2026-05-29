import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="dashboard-shell lg:pl-72">

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-slate-900/15 backdrop-blur-[1px] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="min-h-screen min-w-0">

        <Navbar
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">

          {children}

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;