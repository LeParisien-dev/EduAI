import { useState } from "react";
import { api } from "../api/index.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Step 1: Register user
            const registerRes = await api("/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username, password }),
            });
            console.log("Register response:", registerRes);

            // Step 2: Auto-login
            const res = await api("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            console.log("Login response:", res);

            if (!res.access_token) {
                throw new Error("Invalid server response (no access_token)");
            }

            // Store both token and user info
            login(res.access_token, { email, username });

            // Redirect to courses page
            navigate("/courses");
        } catch (err: any) {
            console.error("Auth error:", err);
            setError(err.message || "An error occurred");
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
                    Create an account
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm text-center">
                        {error}
                    </div>
                )}

                {/* Inputs */}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 w-full rounded mb-3"
                    required
                />
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
                    {loading ? "Creating account…" : "Sign up"}
                </button>
            </form>
        </div>
    );
}
