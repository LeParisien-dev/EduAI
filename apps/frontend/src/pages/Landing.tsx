import { useEffect, useState } from "react";
import { api } from "../api/index.ts";
import { Link } from "react-router-dom"; // ✅ Import Link

interface Course {
    id: string;
    title: string;
    description: string;
}

export default function Landing() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const data = await api("/courses/published");
                setCourses(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-500">Chargement des cours…</p>
            </div>
        );
    }

    if (error) {
        return (
            <p className="text-red-500 text-center mt-10">
                Erreur lors du chargement : {error}
            </p>
        );
    }

    return (
        <main className="max-w-3xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-2 text-center">Cours disponibles</h2>
            <p className="text-gray-400 text-center mb-6">
                {courses.length} cours publiés
            </p>

            {courses.length === 0 ? (
                <p className="text-gray-400 text-center">Aucun cours publié.</p>
            ) : (
                <section>
                    <ul className="space-y-4">
                        {courses.map((course) => (
                            <li
                                key={course.id}
                                className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition"
                            >
                                <h3 className="text-xl font-semibold">{course.title}</h3>
                                <p className="text-gray-400">{course.description}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* CTA enseignant */}
            <p className="text-center mt-10">
                <span className="text-gray-400">Vous êtes enseignant ?</span>{" "}
                <Link to="/register" className="text-cyan-400 hover:underline">
                    Créez un compte
                </Link>{" "}
                ou{" "}
                <Link to="/login" className="text-cyan-400 hover:underline">
                    connectez-vous
                </Link>{" "}
                pour ajouter vos propres cours.
            </p>
        </main>
    );
}
