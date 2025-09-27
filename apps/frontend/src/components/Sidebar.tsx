import { useState } from "react";
import { Home, Upload, FileText, Settings, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
    { label: "Projects", icon: Home, path: "/projects" },
    { label: "Distribution", icon: FileText, path: "/distribution" },
    { label: "Workspace", icon: Upload, path: "/workspace" },
    { label: "Settings", icon: Settings, path: "/settings" },
    { label: "Profile", icon: User, path: "/profiles" },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="fixed top-16 left-0 h-[calc(100vh-4rem)] z-10 group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <aside
                className={`h-full transition-all duration-300 flex flex-col border-r border-gray-200 dark:border-gray-700 shadow-sm
        ${isOpen ? "w-48" : "w-14"}
        bg-white dark:bg-gray-800`}
            >
                {/* Navigation */}
                <nav className="flex flex-col gap-4 mt-6 px-2">
                    {navItems.map(({ label, icon: Icon, path }) => (
                        <NavLink
                            key={label}
                            to={path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                ${isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`
                            }
                        >
                            <Icon size={20} />
                            {isOpen && (
                                <span className="text-sm font-medium truncate">{label}</span>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </div>
    );
}
