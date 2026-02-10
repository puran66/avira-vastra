/**
 * Auth Store - Zustand
 * Global state management for authentication
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            // State
            user: null,
            token: null,
            isAuthenticated: false,

            // Actions
            login: (userData, token) => {
                set({
                    user: userData,
                    token,
                    isAuthenticated: true,
                });
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                });
                localStorage.removeItem('token');
            },

            updateUser: (userData) => {
                set({ user: userData });
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);

export default useAuthStore;
