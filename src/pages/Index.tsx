
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

const Index = () => {
  const { isAuthenticated } = useAuthStore();
  
  // Redirect to dashboard if authenticated, otherwise to landing page
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />;
};

export default Index;
