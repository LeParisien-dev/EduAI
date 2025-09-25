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
            className="fixed top-16 left-0 h-[calc(100vh-64px)] group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <aside
                className={`bg-gray-50 shadow-md h-full transition-all duration-300 flex flex-col ${isOpen ? "w-48" : "w-12"
                    }`}
            >
                {/* Navigation */}
                <nav className="flex flex-col gap-6 mt-8 px-2">
                    {navItems.map(({ label, icon: Icon, path }) => (
                        <NavLink
                            key={label}
                            to={path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                ${isActive
                                    ? "bg-primary text-white"
                                    : "text-gray-500 hover:bg-gray-200"
                                }`
                            }
                        >
                            <Icon size={20} />
                            {isOpen && <span className="text-sm font-medium">{label}</span>}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </div>
    );
}
