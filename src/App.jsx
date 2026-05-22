import { Routes, Route, Navigate } from "react-router-dom";
import Login           from "./components/Login";
import Signup          from "./components/Signup";
import ForgotPassword  from "./components/ForgotPassword";
import AppShell        from "./components/Sidebar";
import Pricing         from "./components/Pricing";
import Profile         from "./components/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/"               element={<Navigate to="/login" replace />} />
      <Route path="/login"          element={<Login />} />
      <Route path="/signup"         element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* <Route path="/pricing" element={<Pricing/>} />
      <Route path="/profile" element={<Profile />} /> */}

      {/* All app pages live inside AppShell (sidebar + header) */}
      <Route path="/app/*" element={<AppShell />} />
      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}