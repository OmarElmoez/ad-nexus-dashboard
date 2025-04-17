import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Index from "./pages/Index";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import CampaignsPage from "./pages/CampaignsPage";
import UserManagementPage from "./pages/UserManagementPage";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import TestimonialsPage from "./pages/TestimonialsPage";

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

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
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardLayout />}>
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
