import { createContext, useState, useContext, ReactNode } from "react";

interface User {
    email: string;
    username?: string;
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (t: string, u?: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );
    const [user, setUser] = useState<User | null>(null);

    const login = (t: string, u?: User) => {
        setToken(t);
        localStorage.setItem("token", t);
        if (u) setUser(u);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
