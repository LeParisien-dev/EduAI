import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

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
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
            fetchCourses(); // recharge la liste
        } catch (err: any) {
            alert("Erreur : " + err.message);
        }
    }

    async function handlePublishCourse(id: string) {
        try {
            await api(`/courses/${id}/publish`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchCourses(); // recharger après publication
        } catch (err: any) {
            alert("Erreur publication : " + err.message);
        }
    }

    if (loading) return <p className="text-gray-400 text-center mt-10">Chargement…</p>;
    if (error) return <p className="text-red-500 text-center mt-10">Erreur : {error}</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Mes cours</h2>
                <button
                    onClick={logout}
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                    Déconnexion
                </button>
            </div>

            {/* Formulaire création */}
            <form
                onSubmit={handleCreateCourse}
                className="bg-gray-800 p-4 rounded space-y-4"
            >
                <h3 className="text-xl font-semibold">Créer un nouveau cours</h3>
                <input
                    type="text"
                    placeholder="Titre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 w-full rounded bg-gray-900 text-white"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full rounded bg-gray-900 text-white"
                    required
                />
                <button
                    type="submit"
                    className="bg-cyan-600 px-4 py-2 rounded hover:bg-cyan-500"
                >
                    Ajouter
                </button>
            </form>

            {/* Liste des cours */}
            {courses.length === 0 ? (
                <p className="text-gray-400">Aucun cours créé.</p>
            ) : (
                <ul className="space-y-4">
                    {courses.map((course) => (
                        <li
                            key={course.id}
                            className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition"
                        >
                            <h3 className="text-xl font-semibold">{course.title}</h3>
                            <p className="text-gray-400">{course.description}</p>
                            <p className="text-sm text-cyan-400 mb-2">
                                Statut : {course.status}
                            </p>

                            {course.status === "draft" && (
                                <button
                                    onClick={() => handlePublishCourse(course.id)}
                                    className="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
                                >
                                    Publier
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
