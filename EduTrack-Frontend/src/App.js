import { useState } from "react";
import Login     from "./Login";
import Signup    from "./Signup";
import Dashboard from "./Dashboard";

// Simple in-app router — no react-router needed
// pages: "login" | "signup" | "dashboard"

export default function App() {
  const [page, setPage]   = useState("login");   // starting screen
  const [role, setRole]   = useState("student");

  const handleLogin  = (selectedRole) => { setRole(selectedRole); setPage("dashboard"); };
  const handleSignup = (selectedRole) => { setRole(selectedRole); setPage("dashboard"); };
  const handleLogout = ()             => { setRole("student");    setPage("login");     };

  if (page === "login")     return <Login    onLogin={handleLogin}   onGoSignup={() => setPage("signup")} />;
  if (page === "signup")    return <Signup   onSignup={handleSignup} onGoLogin={() => setPage("login")}  />;
  if (page === "dashboard") return <Dashboard onLogout={handleLogout} role={role} />;

  return null;
}