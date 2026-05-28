import {
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";

import {
  getProfile
} from "../api/authApi";

function Navbar({ onMenuClick }) {

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile =
    async () => {

      try {

        const data =
          await getProfile();

        setUser(data);

      } catch (error) {

        toast.error("Unable to load profile");
        console.log(error);
      }
    };

    const initials = user?.name
      ? user.name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "SP";

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur">

      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        <div className="flex items-center gap-3 min-w-0">

          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 lg:hidden"
            aria-label="Open navigation menu"
          >
            ☰
          </button>

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Bizora
            </p>
            <h1 className="truncate text-lg font-semibold text-slate-900 sm:text-xl">
              Dashboard
            </h1>
          </div>

        </div>

        <div className="flex items-center gap-3 sm:gap-4">

          {user && (

            <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 sm:flex">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                {initials}
              </div>

              <div className="text-right leading-tight">

                <p className="font-semibold text-slate-900">
                  {user.name}
                </p>

                <p className="text-xs text-slate-500">
                  {user.phone || "No Phone"}
                </p>

              </div>

            </div>
          )}

          <button
            onClick={logout}
            className="dashboard-button-primary whitespace-nowrap"
          >
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}

export default Navbar;