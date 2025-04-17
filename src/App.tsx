import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CampaignsPage from "./pages/dashboard/CampaignsPage";
import PrivateRoute from "./components/auth/PrivateRoute";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import UserManagementPage from "./pages/admin/UserManagementPage";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated } = useAuthStore();

  // This effect would be replaced with an actual auth check in a real app
  useEffect(() => {
    // Just to make the store reactive
    console.log("Auth status:", isAuthenticated ? "Logged in" : "Logged out");
  }, [isAuthenticated]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard/campaigns" element={<CampaignsPage />} />
                {/* Add more dashboard routes here */}
              </Route>
            </Route>

            {/* Admin routes */}
            <Route element={<PrivateRoute requiredRole="admin" />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard/users" element={<UserManagementPage />} />
                <Route path="/dashboard/admin" element={<UserManagementPage />} />
              </Route>
            </Route>

            {/* Fallback routes */}
            <Route path="/dashboard/*" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
