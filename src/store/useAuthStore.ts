
import { create } from 'zustand';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
  checkAuth: () => void;  // Added the missing checkAuth function
}

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=admin'
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?u=user'
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login logic
      const user = mockUsers.find(u => u.email === email);
      
      if (user && password === 'password') { // In a real app, use proper password checking
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        set({ error: 'Invalid email or password', isLoading: false });
      }
    } catch (error) {
      set({ error: 'Login failed. Please try again.', isLoading: false });
    }
  },
  
  register: async (email, password, name) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock register logic
      if (mockUsers.some(u => u.email === email)) {
        set({ error: 'Email already exists', isLoading: false });
        return;
      }
      
      const newUser: User = {
        id: String(mockUsers.length + 1),
        name,
        email,
        role: 'user'
      };
      
      // In a real app, this would be an API call to create the user
      mockUsers.push(newUser);
      
      set({ user: newUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: 'Registration failed. Please try again.', isLoading: false });
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  clearError: () => {
    set({ error: null });
  },
  
  // Add checkAuth function to check if user is authenticated
  checkAuth: () => {
    // Check if there's a stored token or session
    // For this mock implementation, we'll just check local storage
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      console.error("Error checking authentication status:", error);
      // If there's an error, ensure the user is logged out
      set({ user: null, isAuthenticated: false });
    }
  }
}));
