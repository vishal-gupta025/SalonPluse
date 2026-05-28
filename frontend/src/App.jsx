import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import Customers from "./pages/Customers";

import Services from "./pages/Services";

import Visits from "./pages/Visits";

import Expenses from "./pages/Expenses";

import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import CustomerProfile from "./pages/CustomerProfile";

function App() {
  return (
    <Routes>

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers/:id"
          element={
            <ProtectedRoute>
              <CustomerProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />

        <Route
          path="/visits"
          element={
            <ProtectedRoute>
              <Visits />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<NotFound />}
        />

    </Routes>
  );
}

export default App;