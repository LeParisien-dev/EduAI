import { useState } from "react";
import { api } from "../api/index.ts";
import { useAuth } from "../context/AuthContext.tsx";

export default function Login() {
    const { login } = useAuth();
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

            // Store both token and user email
            login(res.access_token, { email });
        } catch (err: any) {
            setError(err.message || "Invalid credentials");
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
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-md text-white font-medium transition ${loading
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {loading ? "Logging in…" : "Log in"}
                </button>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    No account yet?{" "}
                    <a
                        href="/register"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                        Create one
                    </a>
                </p>
            </form>
        </div>
    );
}
