import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ClientesPage from "../pages/ClientesPage";

export function Router() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <DashboardPage /> : <Navigate to="/" />}
      />
      <Route
        path="/clientes"
        element={isAuthenticated ? <ClientesPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
}