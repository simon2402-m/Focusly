
import { useState } from "react";
import { supabase } from "../services/supabase";
import "../styles/Register.css";

function Register({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const terms = e.target.terms.checked;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (!terms) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert("Error al registrarse: " + error.message);
      return;
    }

    alert("¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.");
  };

  return (
    <main className="register-page">
      <div className="register-particles" aria-hidden="true">
  <span style={{ "--x": "10%", "--duration": "12s", "--delay": "0s" }} />
  <span style={{ "--x": "25%", "--duration": "16s", "--delay": "3s" }} />
  <span style={{ "--x": "45%", "--duration": "13s", "--delay": "1s" }} />
  <span style={{ "--x": "65%", "--duration": "17s", "--delay": "5s" }} />
  <span style={{ "--x": "82%", "--duration": "14s", "--delay": "2s" }} />
  <span style={{ "--x": "95%", "--duration": "18s", "--delay": "6s" }} />
</div>

<div className="register-decoration decoration-one" />
<div className="register-decoration decoration-two" />
      <section className="register-card">

        <div className="brand">
          <span className="brand-icon">✦</span>
          <h1>Focusly</h1>
        </div>

        <h2>¡Comienza a organizar tu tiempo!</h2>

        <p className="subtitle">
          Crea tu cuenta y empieza a aprovechar cada minuto.
        </p>

        <form onSubmit={handleRegister}>
          <label>Nombre completo</label>
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            autoComplete="name"
            required
          />

          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            placeholder="ejemplo@correo.com"
            autoComplete="email"
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Crea una contraseña"
            autoComplete="new-password"
            minLength="8"
            required
          />

          <label>Confirmar contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Repite tu contraseña"
            autoComplete="new-password"
            required
          />

          <label className="terms">
            <input type="checkbox" name="terms" required />
            Acepto los términos y condiciones.
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear mi cuenta"}
          </button>
        </form>

        <p className="login-text">
          ¿Ya tienes una cuenta?
          <button type="button" onClick={onLogin}>
            Inicia sesión
          </button>
        </p>

      </section>
    </main>
  );
}

export default Register;
