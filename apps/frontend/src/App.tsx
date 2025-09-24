// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Courses from "./pages/Courses";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
          {/* Navbar */}
          <nav className="bg-gray-800 p-4 flex justify-between">
            <h1 className="text-xl font-bold text-cyan-400">EduAI Frontend</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">
                Accueil
              </Link>
              <Link to="/courses" className="hover:underline">
                Mes cours
              </Link>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </div>
          </nav>

          {/* Routes */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/courses"
                element={
                  <PrivateRoute>
                    <Courses />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
