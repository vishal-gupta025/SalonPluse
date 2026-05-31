import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";

function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async (
    e
  ) => {

    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    if (!phone.trim()) {
      toast.error("Phone number is required");
      return;
    }

    if (!phone.match(/^\d{10}$/)) {

        toast.error(
          "Phone number must be 10 digits long"
        );

        return;
      }

      setLoading(true);

    try {

      await api.post(
        "/auth/register",
        {
          name,
          phone,
          email,
          password
        }
      );

      toast.success("Registration Successful");

      navigate("/");

    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.10),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(15,118,110,0.08),_transparent_26%),linear-gradient(180deg,_#f8fcfc_0%,_#eef6f6_100%)] px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-[2rem] border border-teal-100 bg-white shadow-2xl shadow-teal-100/40 lg:grid-cols-2">

          <div className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-teal-900 to-cyan-800 p-10 text-white lg:flex lg:flex-col lg:justify-between">

            <div className="absolute -right-16 top-8 h-44 w-44 rounded-full bg-teal-400/20 blur-3xl" />
            <div className="absolute -bottom-20 left-0 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-teal-100/70">Bizora</p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight">Build a smarter workspace.</h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-200">
                Create your account, simplify operations, and keep your business organized from any device.
              </p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm text-teal-50">Responsive, polished, and built for daily use.</p>
            </div>

          </div>

          <form
            onSubmit={handleRegister}
            className="bg-gradient-to-b from-slate-50 to-teal-50/40 p-6 sm:p-8 lg:p-10"
          >

            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Create account</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                Register
              </h1>
              <p className="mt-2 text-sm text-slate-500">Set up your admin account in under a minute.</p>
            </div>

        <input
          type="text"
          placeholder="Name"
          className="dashboard-input mb-4"
          value={name}
          required
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
            type="text"
            placeholder="Phone Number"
          className="dashboard-input mb-4"
            value={phone}
          required
            onChange={(e) =>
                setPhone(e.target.value)
            }
        />

        <input
          type="email"
          placeholder="Email"
          className="dashboard-input mb-4"
          value={email}
          required
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="dashboard-input mb-4"
          value={password}
          required
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="dashboard-button-primary w-full"
        >
          {loading
            ? "Creating Account..."
            : "Register"
            }
        </button>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?
          <Link
            to="/"
            className="ml-1 font-semibold text-teal-800 underline decoration-teal-300 underline-offset-4"
          >
            Login
          </Link>
        </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Register;