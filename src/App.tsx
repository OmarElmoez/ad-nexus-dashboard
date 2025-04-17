
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Index from "./pages/Index";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CampaignsPage from "./pages/dashboard/CampaignsPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/auth/PrivateRoute";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import TestimonialsPage from "./pages/TestimonialsPage";

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/index" element={<Index />} />
        
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="campaigns" element={<CampaignsPage />} />
            <Route path="users" element={<UserManagementPage />} />
          </Route>
        </Route>
        
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
