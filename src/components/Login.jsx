
import { useState } from "react";
import { supabase } from "../services/supabase";
import "../styles/Login.css";

function Login({ onRegister }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert("No se pudo iniciar sesión: " + error.message);
      return;
    }
    
  };

  return (
    <main className="login-page">
      <div className="login-decoration login-decoration-one" />
<div className="login-decoration login-decoration-two" />
      <section className="login-card">

        <div className="login-brand">
          <span>✦</span>
          <h1>Focusly</h1>
        </div>

        <h2>¡Qué bueno tenerte de vuelta!</h2>

        <p className="login-subtitle">
          Organiza tu tiempo y alcanza tus objetivos.
        </p>

        <form onSubmit={handleLogin}>
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            placeholder="Tu correo electrónico"
            autoComplete="email"
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Tu contraseña"
            autoComplete="current-password"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="register-link">
          ¿Todavía no tienes cuenta?
          <button type="button" onClick={onRegister}>
            Crear una cuenta
          </button>
        </p>

      </section>
    </main>
  );
}

export default Login;

