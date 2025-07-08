'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/api';
import { api, setAccessToken, logoutUser } from '@/services/apiService';
import { log } from 'console';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    login: (userData: User, token: string) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const { data } = await api.post('api/auth/refresh');
                login(data.user, data.accessToken);
            } catch (error) {
                setUser(null);
                setAccessToken('');
            } finally {
                setIsLoading(false);
            }
        };
        checkUserStatus();
    }, []);

    const login = (userData: User, token: string) => {
        setUser(userData);
        setAccessToken(token);
    };

    const logout = async () => {
        try {
            await logoutUser();
        } finally {
            setUser(null);
            setAccessToken('');
        }
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};