import {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    // Restore user from localStorage on refresh
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (t: string, u?: User) => {
        setToken(t);
        localStorage.setItem("token", t);

        if (u) {
            setUser(u);
            localStorage.setItem("user", JSON.stringify(u));
        }

        console.log("User logged in:", u);
        // Redirect after login (handled by React Router, no 404)
        navigate("/courses");
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        console.log("User logged out");
        navigate("/login");
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
