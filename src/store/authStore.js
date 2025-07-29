import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  clearAuth: () => set({ user: null, loading: false, error: null }),
}));

export default useAuthStore;