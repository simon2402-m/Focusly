
import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";

import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import "./styles/Landing.css";

function App() {
  const [page, setPage] = useState("home");
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (checkingSession) {
    return (
      <div className="app-loading">
        <div className="loading-logo">✦</div>
        <h2>Focusly</h2>
        <p>Preparando tu espacio de productividad...</p>
      </div>
    );
  }

  if (session) {
    return <Dashboard user={session.user} />;
  }

  if (page === "register") {
    return <Register onLogin={() => setPage("login")} />;
  }

  if (page === "login") {
    return <Login onRegister={() => setPage("register")} />;
  }

  return (
    <Landing
      onLogin={() => setPage("login")}
      onRegister={() => setPage("register")}
    />
  );
}

export default App;
