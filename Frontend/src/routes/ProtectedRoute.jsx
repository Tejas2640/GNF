import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // NOT LOGGED IN → redirect to login
  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}