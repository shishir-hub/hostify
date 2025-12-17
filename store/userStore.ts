import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  is_super_host: boolean;
  image?: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  isAuthenticated: () => boolean;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  
  setUser: (user) => set({ user }),
  
  clearUser: () => set({ user: null }),
  
  isAuthenticated: () => get().user !== null,
}));