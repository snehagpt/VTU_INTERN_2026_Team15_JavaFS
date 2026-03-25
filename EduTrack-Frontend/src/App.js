import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import Dashboard from "./Dashboard";
import { ThemeProvider } from "./ThemeContext";

/*
 EduTrack – Frontend Router
 SDD Roles: student | teacher
 Wrapped in ThemeProvider for day/night theme support
*/

export default function App() {
  const [page, setPage] = useState("login");
  const [role, setRole] = useState("student");
  const [user, setUser] = useState(null);

  const handleLogin = (r, data) => { setRole(r); setUser(data); setPage("dashboard"); };
  const handleSignup = (r, data) => { setRole(r); setUser(data); setPage("dashboard"); };
  const handleLogout = () => { setRole("student"); setUser(null); setPage("login"); };

  return (
    <ThemeProvider>
      {(() => {
        switch (page) {
          case "login":
            return <Login onLogin={handleLogin} onGoSignup={() => setPage("signup")} onGoForgotPassword={() => setPage("forgot-password")} />;
          case "signup":
            return <Signup onSignup={handleSignup} onGoLogin={() => setPage("login")} />;
          case "forgot-password":
            return <ForgotPassword onGoBack={() => setPage("login")} />;
          case "dashboard":
            return <Dashboard role={role} user={user} onLogout={handleLogout} />;
          default:
            return <Login onLogin={handleLogin} onGoSignup={() => setPage("signup")} onGoForgotPassword={() => setPage("forgot-password")} />;
        }
      })()}
    </ThemeProvider>
  );
}
