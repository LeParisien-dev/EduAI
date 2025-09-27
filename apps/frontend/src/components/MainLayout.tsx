import { ReactNode } from "react";
import Sidebar from "./Sidebar.tsx";
import Navbar from "./Navbar.tsx";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
            {/* Top navbar */}
            <header className="fixed top-0 left-0 right-0 z-20">
                <Navbar />
            </header>

            <div className="flex flex-1 pt-16">
                {/* Sidebar */}
                <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
                    <Sidebar />
                </aside>

                {/* Main content */}
                <main className="flex-1 ml-64 p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">{children}</div>
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                © {new Date().getFullYear()} EduAI. All rights reserved.
            </footer>
        </div>
    );
}
