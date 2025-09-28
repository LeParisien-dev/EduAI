import { useState } from "react";
import { api } from "../api/index.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
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

            // Store both token and user email
            login(res.access_token, { email });

            // Redirect to courses page
            navigate("/courses");
        } catch (err: any) {
            setError(err.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 w-96 space-y-5"
            >
                <h2 className="text-2xl font-bold text-center text-blue-600">
                    Login
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm text-center">
                        {error}
                    </div>
                )}

                {/* Inputs */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full rounded mb-3"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full rounded mb-3"
                    required
                    minLength={6}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-md text-white font-medium ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {loading ? "Logging in…" : "Log in"}
                </button>
            </form>
        </div>
    );
}
