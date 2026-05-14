/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import RegisterPage from "./pages/ReisterPage";
import LoginPage from "./pages/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { logout, setCredentials } from "./features/auth/authSlice";
import { useEffect, useState } from "react";
import { getHealthStatus } from "./services/healthService";
import { getCurrentUser } from "./features/auth/serApi";
import type { CurrentUser } from "./constants/types";
import { handleApiError } from "./utils/common";
import type { RootState } from "./store/store";
import TodoPage from "./pages/TodoPage";

function HomePage() {
  const [health, setHealth] = useState<string>("");

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await getHealthStatus();
        setHealth(response?.message);
      } catch (err) {
        handleApiError({
          err,
          action: "Health",
        });
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
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const { token, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) return toast.error("Invalid Token");
      try {
        const response = await getCurrentUser();
        dispatch(
          setCredentials({
            user: response?.user,
            token,
          }),
        );
        setCurrentUser(response);
      } catch (err) {
        handleApiError({
          err,
          action: "Current User",
        });
      }
    };
    fetchCurrentUser();
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Toaster position="top-right" />
      {isAuthenticated && (
        <nav className="flex gap-4 p-4 bg-gray-200">
          <span>
            Welcome {<b className="capitalize">{currentUser?.name}</b>}
          </span>
          <Link to="/">Home</Link>
          <Link to="/todos">Todo</Link>
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
        <Route
          path="/todos"
          element={
            <ProtectedRoutes>
              <TodoPage />
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
