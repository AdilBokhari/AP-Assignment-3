import { createContext, useState } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    login: async (email, password) => { },
    signup: async (email, password) => { },
    logout: async () => { },
});

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    async function login(email, password) {
        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                throw new Error(data.error || 'Failed to login.');
            }

            setIsAuthenticated(true);
            setUser(data.user);
            return { success: true };
        } catch (error) {
            console.error(error.message);
            return { success: false, message: error.message };
        }
    }

    async function signup(email, password) {
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed.');
            }

            return { success: true };
        } catch (error) {
            console.error(error.message);
            return { success: false, message: error.message };
        }
    }

    async function logout() {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Logout failed.');
            }

            setIsAuthenticated(false);
            setUser(null);
            return { success: true };
        } catch (error) {
            console.error(error.message);
            return { success: false, message: error.message };
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                login,
                signup,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
