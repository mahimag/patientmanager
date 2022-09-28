import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isUserLoggedIn } from "../utils/localStorage";

const ProtectedRoute = () => {
  return isUserLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
