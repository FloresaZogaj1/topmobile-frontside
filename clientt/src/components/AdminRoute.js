import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function AdminRoute({ children }) {
  const { loggedIn, user } = useAuth();
  const location = useLocation();

  if (!loggedIn) {
    // pa login → te /login dhe ruaj destinacionin
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (user?.role !== "admin") {
    // i kyçur por jo admin → ballinë
    return <Navigate to="/" replace />;
  }
  return children;
}
