
import { create } from 'zustand';
import { User } from './useAuthStore';

// Only admin can see and manage users
interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  
  // User management actions
  fetchUsers: () => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  
  // Error handling
  clearError: () => void;
}

// Mock users data (would come from an API in a real application)
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
  },
  {
    id: '3',
    name: 'Marketing Manager',
    email: 'manager@example.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?u=manager'
  },
  {
    id: '4',
    name: 'Campaign Specialist',
    email: 'specialist@example.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?u=specialist'
  }
];

export const useUserStore = create<UserState>((set) => ({
  users: [],
  isLoading: false,
  error: null,
  
  fetchUsers: () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      setTimeout(() => {
        set({ users: mockUsers, isLoading: false });
      }, 1000);
    } catch (error) {
      set({ error: 'Failed to fetch users', isLoading: false });
    }
  },
  
  updateUser: (id, updates) => {
    set(state => ({
      users: state.users.map(user => 
        user.id === id ? { ...user, ...updates } : user
      )
    }));
  },
  
  deleteUser: (id) => {
    set(state => ({
      users: state.users.filter(user => user.id !== id)
    }));
  },
  
  clearError: () => {
    set({ error: null });
  }
}));
