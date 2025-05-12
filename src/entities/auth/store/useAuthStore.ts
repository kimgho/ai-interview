import { create } from 'zustand';

interface User {
    email: string;
    password: string;
}

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    token: string | null;
}

interface AuthActions {
    login: (userData: User, token: string) => void;
    logout: () => void;
}

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: false,
    user: null,
    token: null,
    login: (userData, token) => set(() => ({
        isLoggedIn: true,
        user: userData,
        token: token,
    })),
    logout: () => set(() => ({
        isLoggedIn: false,
        user: null,
        token: null,
    })),
}))

export default useAuthStore;