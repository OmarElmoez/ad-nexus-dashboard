
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

interface PrivateRouteProps {
  requiredRole?: "user" | "admin";
}

const PrivateRoute = ({ requiredRole }: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  
  // Not authenticated at all
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Role check if required
  if (requiredRole && user?.role !== requiredRole && (requiredRole === "admin" && user?.role !== "admin")) {
    return <Navigate to="/dashboard" />; // Redirect to standard dashboard if user doesn't have required role
  }
  
  // If authenticated and has proper role, render the child routes
  return <Outlet />;
};

export default PrivateRoute;
