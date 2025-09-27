import { NavLink } from "react-router-dom";

export default function Navbar() {
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
        </nav>
    );
}
