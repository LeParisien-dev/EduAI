import { ReactNode } from "react";
import Sidebar from "./Sidebar.tsx";
import Navbar from "./Navbar.tsx";

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-neutral-bg dark:bg-neutral-darkbg transition">
            {/* Top navbar */}
            <Navbar />

            <div className="flex flex-1">
                {/* Sidebar on the left */}
                <Sidebar />

                {/* Main content */}
                <main className="flex-1 p-8 overflow-y-auto ml-24 mt-16">
                    {children}
                </main>
            </div>
        </div>
    );
}
