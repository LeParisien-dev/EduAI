import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Landing from "./pages/Landing.tsx";
import Courses from "./pages/Courses.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import MainLayout from "./components/MainLayout.tsx";
import GenerateCourse from "./pages/GenerateCourse.tsx";
import Export from "./pages/Export.tsx";
import Projects from "./pages/Projects.tsx";
import Distribution from "./pages/Distribution.tsx";
import Workspace from "./pages/Workspace.tsx";
import Settings from "./pages/Settings.tsx";
import Profiles from "./pages/Profiles.tsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Layout-protected pages */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Landing />
              </MainLayout>
            }
          />

          <Route
            path="/courses"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Courses />
                </MainLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/generate"
            element={
              <PrivateRoute>
                <MainLayout>
                  <GenerateCourse />
                </MainLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/export"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Export />
                </MainLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Projects />
                </MainLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/distribution"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Distribution />
                </MainLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/workspace"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Workspace />
                </MainLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Settings />
                </MainLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/profiles"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Profiles />
                </MainLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
