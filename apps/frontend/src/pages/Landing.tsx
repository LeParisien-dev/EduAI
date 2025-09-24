import { useEffect, useState } from "react";
import { api } from "../api";

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
        return <p className="text-gray-400 text-center mt-10">Chargement…</p>;
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
            <h2 className="text-3xl font-bold mb-2 text-center">
                Cours disponibles
            </h2>
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
                <a href="/register" className="text-cyan-400 hover:underline">
                    Créez un compte
                </a>{" "}
                ou{" "}
                <a href="/login" className="text-cyan-400 hover:underline">
                    connectez-vous
                </a>{" "}
                pour ajouter vos propres cours.
            </p>
        </main>
    );
}
