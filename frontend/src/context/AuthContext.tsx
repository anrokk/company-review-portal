'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/api';

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string, user: User) => void;
    register: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (userData && token) {
            setUser(JSON.parse(userData));
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token: string, user: User) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setIsAuthenticated(true);
    };

    const register = (token: string, user: User) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setIsAuthenticated(true);
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
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
}