import { useState } from "react";

import { useNavigate } from "react-router-dom";
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

    if (
        !phone.match(/^\d{10}$/)
      ) {

        toast.error(
          "Phone number must be 10 digits"
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
    <div className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl shadow-slate-950/20 lg:grid-cols-2">

          <div className="hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">

            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">SalonPulse</p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight">Build your salon workspace.</h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                Create your account, manage appointments, and keep your business organized from any device.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-sm text-slate-300">Responsive, polished, and ready for production.</p>
            </div>

          </div>

          <form
            onSubmit={handleRegister}
            className="p-6 sm:p-8 lg:p-10"
          >

            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Create account</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                Register
              </h1>
              <p className="mt-2 text-sm text-slate-500">Set up your salon admin account in a minute.</p>
            </div>

        <input
          type="text"
          placeholder="Name"
          className="dashboard-input mb-4"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
            type="text"
            placeholder="Phone Number"
          className="dashboard-input mb-4"
            value={phone}
            onChange={(e) =>
                setPhone(e.target.value)
            }
        />

        <input
          type="email"
          placeholder="Email"
          className="dashboard-input mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="dashboard-input mb-4"
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
            ? "Creating Account..."
            : "Register"
            }
        </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Register;