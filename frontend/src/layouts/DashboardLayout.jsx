import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {

  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  function isTokenExpired(token) {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return true;
      // Fix base64url padding before decoding
      let b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const pad = b64.length % 4;
      if (pad) b64 += "=".repeat(4 - pad);
      const payload = JSON.parse(atob(b64));
      if (!payload.exp) return false;
      const now = Math.floor(Date.now() / 1000);
      return payload.exp <= now;
    } catch (err) {
      return true;
    }
  }

  useEffect(() => {
    const checkInterval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (!token) return;
      if (isTokenExpired(token)) {
        try {
          localStorage.removeItem("token");
        } catch (_) {}
        toast.error("Session expired. Please login again.");
        navigate("/");
      }
    }, 10000); // check every 10s

    return () => clearInterval(checkInterval);
  }, [navigate]);

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

      <div className="min-h-screen min-w-0 bg-transparent">

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