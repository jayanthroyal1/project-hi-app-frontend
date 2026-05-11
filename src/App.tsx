import { Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import RegisterPage from "./pages/ReisterPage";
import LoginPage from "./pages/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { logout } from "./features/auth/authSlice";
import { useEffect, useState } from "react";
import { getHealthStatus } from "./services/healthService";

function HomePage() {
  const [health, setHealth] = useState<string>("");
  useEffect(() => {
    const fetchHealth = async () => {
      try {
        console.log("get Data");
        const response = await getHealthStatus();
        setHealth(response?.message);
        console.log("Date from health", response);
      } catch (err) {
        console.error("Health API Error", err);
      }
    };
    fetchHealth();
  }, []);
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{health}</h1>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Toaster position="top-right" />
      {isAuthenticated && (
        <nav className="flex gap-4 p-4 bg-gray-200">
          <Link to="/">Home</Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </nav>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
