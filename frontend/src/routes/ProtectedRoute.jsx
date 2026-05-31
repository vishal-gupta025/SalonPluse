import { Navigate } from "react-router-dom";

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

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (isTokenExpired(token)) {
    try {
      localStorage.removeItem("token");
    } catch (_) {}
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;