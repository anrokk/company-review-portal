'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/api';
import { setAccessToken, loginUser as apiLogin, registerUser as apiRegister, logoutUser as apiLogout, api } from '@/services/apiService';
import Cookies from 'js-cookie';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    register: (userData: any) => Promise<{ user: User, accessToken: string }>;
    login: (credentials: any) => Promise<{ user: User, accessToken: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const { data } = await api.post('api/auth/refresh');
                Cookies.set('token', data.accessToken, { expires: 1 / 96 });
                setUser(data.user);
                setAccessToken(data.accessToken);
            } catch (error) {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        checkUserStatus();
    }, []);

    const login = async (credentials: any) => {
        const { user, accessToken } = await apiLogin(credentials);
        Cookies.set('token', accessToken, { expires: 1 / 96 });
        setUser(user);
        setAccessToken(accessToken);
        return { user, accessToken };
    };

    const register = async (userData: any) => {
        const { user, accessToken } = await apiRegister(userData);
        Cookies.set('token', accessToken, { expires: 1 / 96 });
        setUser(user);
        setAccessToken(accessToken);
        return { user, accessToken };
    };

    const logout = async () => {
        try {
            await apiLogout();
        } finally {
            Cookies.remove('token');
            setUser(null);
            setAccessToken('');
        }
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, register, login, logout }}>
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