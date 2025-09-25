export default function Navbar() {
    return (
        <nav className="w-full flex justify-between items-center bg-white dark:bg-gray-900 px-12 py-4 shadow-sm">
            <div className="text-2xl font-bold text-primary tracking-wide">EduAI</div>
            <div className="flex gap-10 text-gray-700 dark:text-gray-200 font-medium">
                <a href="/" className="hover:text-primary transition">Home</a>
                <a href="/courses" className="hover:text-primary transition">Courses</a>
                <a href="/generate" className="hover:text-primary transition">Generate</a>
                <a href="/export" className="hover:text-primary transition">Export</a>
            </div>
        </nav>
    );
}
