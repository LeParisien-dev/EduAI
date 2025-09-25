import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api/index.ts";
import { useAuth } from "../context/AuthContext.tsx";

interface Course {
    id: string;
    title: string;
    description: string;
    status: string;
}

export default function Courses() {
    const { token, logout } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function fetchCourses() {
        try {
            const data = await api("/courses", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCourses(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCourses();
    }, [token]);

    async function handleCreateCourse(e: React.FormEvent) {
        e.preventDefault();
        try {
            await api("/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description }),
            });
            setTitle("");
            setDescription("");
            fetchCourses();
        } catch (err: any) {
            alert("Erreur : " + err.message);
        }
    }

    async function handlePublishCourse(id: string) {
        try {
            await api(`/courses/${id}/publish`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCourses();
        } catch (err: any) {
            alert("Erreur publication : " + err.message);
        }
    }

    if (loading) return <p className="text-gray-400 text-center mt-10">Chargement…</p>;
    if (error) return <p className="text-red-500 text-center mt-10">Erreur : {error}</p>;

    return (
        <div className="max-w-5xl mx-auto p-8 space-y-10">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Mes cours
                </h1>
                <button
                    onClick={logout}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                    Déconnexion
                </button>
            </div>

            {/* Formulaire création */}
            <motion.form
                onSubmit={handleCreateCourse}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md space-y-4"
            >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Créer un nouveau cours
                </h2>
                <input
                    type="text"
                    placeholder="Titre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 dark:border-gray-700 p-3 w-full rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 dark:border-gray-700 p-3 w-full rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
                    required
                />
                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-light transition"
                >
                    Ajouter
                </button>
            </motion.form>

            {/* Liste des cours */}
            {courses.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                    Aucun cours créé.
                </p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {courses.map((course, i) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition"
                        >
                            <h3 className="text-xl font-semibold text-primary">{course.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">{course.description}</p>
                            <p className="text-sm text-cyan-500 mb-3">Statut : {course.status}</p>

                            {course.status === "draft" && (
                                <button
                                    onClick={() => handlePublishCourse(course.id)}
                                    className="px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-500 transition"
                                >
                                    Publier
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
