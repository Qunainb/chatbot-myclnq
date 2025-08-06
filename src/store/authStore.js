import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('authToken') || null,
  loading: false,
  error: null,
  
  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
    set({ token });
  },
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  clearAuth: () => {
    localStorage.removeItem('authToken');
    set({ user: null, token: null, loading: false, error: null });
  },
  
  // Initialize auth state from localStorage on store creation
  initialize: () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      set({ token });
      // Optionally: Validate token and fetch user data here
    }
  }
}));

// Initialize the auth store when the module loads
useAuthStore.getState().initialize();

export default useAuthStore;