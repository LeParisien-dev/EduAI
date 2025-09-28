// Comment: Use client-side navigation after login and for register link
import { useState } from "react";
import { api } from "../api/index.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate, Link } from "react-router-dom"; // <-- add Link + useNavigate

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate(); // <-- client-side navigation
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await api("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.access_token) {
                throw new Error("Invalid server response");
            }

            login(res.access_token, { email });

            // Comment: client-side redirect (no full reload)
            navigate("/courses");
        } catch (err: any) {
            setError(err.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 w-96 space-y-5">
                <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm text-center">
                        {error}
                    </div>
                )}

                {/* inputs ... (inchangés) */}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-md text-white font-medium ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                    {loading ? "Logging in…" : "Log in"}
                </button>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    No account yet?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400">
                        Create one
                    </Link>
                </p>
            </form>
        </div>
    );
}
