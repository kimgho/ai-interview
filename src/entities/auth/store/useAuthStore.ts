import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
interface User {
    email: string;
}

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
}

interface AuthActions {
    login: (payload: { userData: User; accessToken: string; refreshToken: string }) => void;
    logout: () => void;
}

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            accessToken: null,
            refreshToken: null,

            login: (payload) => set({
                isLoggedIn: true,
                user: payload.userData,
                accessToken: payload.accessToken,
                refreshToken: payload.refreshToken,
            }),
            logout: () => set({
                isLoggedIn: false,
                user: null,
                accessToken: null,
                refreshToken: null,
            }),
        }),
        {
            name: 'TOKEN_STORAGE',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAuthStore;