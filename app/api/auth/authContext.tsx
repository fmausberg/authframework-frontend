'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppUser {
    id: number;
    mail: string;
    publicname: string;
}

interface AuthContextType {
    appUser: AppUser | null;
    jwttoken: string | null;
    login: (appUser: AppUser, jwttoken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [appUser, setUser] = useState<AppUser | null>(null);
    const [jwttoken, setToken] = useState<string | null>(null);

    // Load token and user from localStorage on app start
    useEffect(() => {
    const storedToken = localStorage.getItem("jwttoken");
    const storedUser = localStorage.getItem("appUser");
    
    if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
    }
    }, []);

    // Login function (store user and token in localStorage)
    const login = (appUser: AppUser, jwttoken: string) => {
        setUser(appUser);
        setToken(jwttoken);
        localStorage.setItem("appUser", JSON.stringify(appUser));
        localStorage.setItem("jwttoken", jwttoken);
    };

    // Logout function (clear localStorage and state)
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("appUser");
        localStorage.removeItem("jwttoken");
    };

    return (
    <AuthContext.Provider value={{ appUser, jwttoken, login, logout }}>
        {children}
    </AuthContext.Provider>
    );
}

// Custom hook to use AuthContext
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}