// store/authStore.ts
import { User } from "firebase/auth";
import { create } from "zustand";

interface AuthState {
    user: User | null;
    initializing: boolean;
    setUser: (user: User | null) => void;
    setInitializing: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    initializing: true,
    setUser: (user) => set({ user }),
    setInitializing: (value) => set({ initializing: value }),
}));