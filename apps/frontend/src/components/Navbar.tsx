import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="w-full flex justify-between items-center bg-white dark:bg-gray-900 px-6 sm:px-12 py-4 shadow-sm border-b border-gray-200 dark:border-gray-700">
            {/* Logo / Brand */}
            <div className="text-2xl font-bold text-blue-600 tracking-wide">
                EduAI
            </div>

            {/* Navigation links */}
            <div className="hidden md:flex gap-8 text-gray-700 dark:text-gray-200 font-medium">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `hover:text-blue-600 transition ${isActive ? "text-blue-600 font-semibold" : ""
                        }`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/courses"
                    className={({ isActive }) =>
                        `hover:text-blue-600 transition ${isActive ? "text-blue-600 font-semibold" : ""
                        }`
                    }
                >
                    Courses
                </NavLink>
                <NavLink
                    to="/generate"
                    className={({ isActive }) =>
                        `hover:text-blue-600 transition ${isActive ? "text-blue-600 font-semibold" : ""
                        }`
                    }
                >
                    Generate
                </NavLink>
                <NavLink
                    to="/export"
                    className={({ isActive }) =>
                        `hover:text-blue-600 transition ${isActive ? "text-blue-600 font-semibold" : ""
                        }`
                    }
                >
                    Export
                </NavLink>
            </div>

            {/* Auth actions */}
            <div className="flex gap-4">
                {!user ? (
                    <>
                        <NavLink
                            to="/login"
                            className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            Se connecter
                        </NavLink>
                        <NavLink
                            to="/register"
                            className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            S’inscrire
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/profiles"
                            className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                            Mon profil
                        </NavLink>
                        <button
                            onClick={logout}
                            className="px-4 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
                        >
                            Déconnexion
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
