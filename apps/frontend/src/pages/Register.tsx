import { useState } from "react";
import { api } from "../api/index.ts";
import { useAuth } from "../context/AuthContext.tsx";

export default function Register() {
    const { login } = useAuth();
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
            await api("/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username, password }),
            });

            // Après register, login direct
            const res = await api("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            login(res.access_token);
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue");
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
                    Créer un compte
                </h2>

                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nom d’utilisateur
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>

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
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-2
