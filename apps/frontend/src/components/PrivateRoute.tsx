import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import { ReactNode } from "react";

export default function PrivateRoute({ children }: { children: ReactNode }) {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
