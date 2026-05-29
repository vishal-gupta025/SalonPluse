import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin =
    async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

        const response =
            await api.post(
            "/auth/login",
            {
                email,
                password
            }
            );

        localStorage.setItem(
            "token",
            response.data.access_token
        );

        toast.success(
            "Login Successful"
        );

        navigate("/dashboard");

        } catch (error) {

        toast.error(
            error.response?.data?.detail
            ||
            "Login Failed"
        );

        } finally {

        setLoading(false);
        }
    };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.08),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 lg:grid-cols-2">

          <div className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-sky-900 to-cyan-800 p-10 text-white lg:flex lg:flex-col lg:justify-between">

            <div className="absolute -right-16 top-8 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute -bottom-20 left-0 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />

            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/70">Bizora</p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight">Run operations with clarity.</h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-200">
                Keep customers, services, visits, expenses, and analytics flowing from one responsive command center.
              </p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm text-cyan-50">Fast login. Clear insights. Smooth on every device.</p>
            </div>

          </div>

          <form className="bg-slate-50 p-6 sm:p-8 lg:p-10" onSubmit={handleLogin}>

            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Welcome back</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                Bizora Login
              </h2>
              <p className="mt-2 text-sm text-slate-500">Sign in to pick up right where your business left off.</p>
            </div>

        <input
          className="dashboard-input mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="dashboard-input mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="dashboard-button-primary w-full"
        >
          {loading
            ? "Logging in..."
            : "Login"
            }
        </button>

        <p className="mt-5 text-center text-sm text-slate-500">

            Don't have an account?

            <span
              className="ml-1 cursor-pointer font-semibold text-sky-800 underline decoration-sky-300 underline-offset-4"
                onClick={() =>
                navigate("/register")
                }
            >
                Register
            </span>

        </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;