
function Landing({ onLogin, onRegister }) {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <a href="#inicio" className="landing-logo">
          <span className="logo-icon">✦</span>
          <span>Focusly</span>
        </a>

        <nav className="landing-nav">
          <a href="#inicio">Inicio</a>
          <a href="#funciones">Funciones</a>
          <a href="#acerca">Acerca de</a>
        </nav>

        <div className="landing-header-actions">
          <button className="login-nav-button" onClick={onLogin}>
            Iniciar sesión
          </button>
          <button className="register-nav-button" onClick={onRegister}>
            Crear cuenta
          </button>
        </div>
      </header>

      <main>
        <section className="landing-hero" id="inicio">
          <div className="hero-content">
            <span className="hero-tag">
              TU ESPACIO DE PRODUCTIVIDAD
            </span>

            <h1>
              Organiza tu tiempo.
              <span> Alcanza tus metas.</span>
            </h1>

            <p>
              Planifica tus tareas, organiza tus horarios y mejora
              tu productividad con ayuda de inteligencia artificial.
              Todo lo que necesitas para aprovechar mejor cada día.
            </p>

            <div className="hero-buttons">
              <button onClick={onRegister} className="hero-primary-button">
                Comenzar gratis <span>→</span>
              </button>

              <button onClick={onLogin} className="hero-secondary-button">
                Ya tengo una cuenta
              </button>
            </div>

            <div className="hero-note">
              <span>✓</span> Organiza. Aprende. Progresa.
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow"></div>

            <div className="preview-card">
              <div className="preview-top">
                <div>
                  <span className="preview-label">TU RESUMEN</span>
                  <h3>¡Vamos con todo!</h3>
                </div>
                <span className="preview-star">✦</span>
              </div>

              <div className="preview-progress">
                <div className="progress-info">
                  <span>Progreso semanal</span>
                  <strong>75%</strong>
                </div>
                <div className="progress-track">
                  <div className="progress-fill"></div>
                </div>
              </div>

              <div className="preview-stats">
                <div className="preview-stat">
                  <span className="stat-icon">✓</span>
                  <div>
                    <strong>8</strong>
                    <small>Tareas listas</small>
                  </div>
                </div>

                <div className="preview-stat">
                  <span className="stat-icon">◷</span>
                  <div>
                    <strong>4</strong>
                    <small>Actividades hoy</small>
                  </div>
                </div>
              </div>

              <div className="preview-task">
                <div>
                  <span className="task-check">✓</span>
                  <span>Estudiar para el examen</span>
                </div>
                <span className="task-status">Completada</span>
              </div>

              <div className="preview-task">
                <div>
                  <span className="task-pending"></span>
                  <span>Organizar mi semana</span>
                </div>
                <span className="task-status pending">Pendiente</span>
              </div>

              <div className="preview-ai">
                <span>✦</span>
                <p>
                  <strong>Focusly IA</strong>
                  <br />
                  ¡Vas por buen camino! Sigue así.
                </p>
              </div>
            </div>

            <div className="floating-bubble bubble-one">
              <span>✦</span> Más organización
            </div>

            <div className="floating-bubble bubble-two">
              <span>✓</span> Metas cumplidas
            </div>
          </div>
        </section>

        <section className="landing-features" id="funciones">
          <div className="section-heading">
            <span>TODO EN UN SOLO LUGAR</span>
            <h2>Tu día, mejor organizado.</h2>
            <p>
              Herramientas sencillas para ayudarte a trabajar
              de forma más organizada.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon">▦</div>
              <h3>Organiza tus tareas</h3>
              <p>
                Crea tareas, establece prioridades y lleva
                el control de tus actividades.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">◷</div>
              <h3>Planifica tus horarios</h3>
              <p>
                Distribuye tu tiempo y visualiza tus actividades
                durante la semana.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">↗</div>
              <h3>Visualiza tu progreso</h3>
              <p>
                Consulta tus avances y descubre cuánto has
                logrado con tus objetivos.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">✦</div>
              <h3>Asistente con IA</h3>
              <p>
                Recibe recomendaciones para organizar mejor
                tus actividades y administrar tu tiempo.
              </p>
            </article>
          </div>
        </section>

        <section className="landing-about" id="acerca">
          <div className="about-decoration">✦</div>
          <span>¿QUÉ ES FOCUSLY?</span>
          <h2>Pequeños pasos. Grandes resultados.</h2>
          <p>
            Focusly es una plataforma diseñada para ayudarte a
            organizar tus actividades, administrar tu tiempo y
            mantenerte enfocado en tus objetivos. Queremos que
            estudiar y planificar tu día sea una experiencia más
            sencilla y agradable.
          </p>
          <button onClick={onRegister}>
            Empieza a organizarte →
          </button>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#inicio" className="landing-logo footer-logo">
              <span className="logo-icon">✦</span>
              <span>Focusly</span>
            </a>
            <p>
              Organiza tu tiempo, enfócate en tus metas
              y construye mejores hábitos.
            </p>
          </div>

          <div className="footer-links">
            <h4>Navegación</h4>
            <a href="#inicio">Inicio</a>
            <a href="#funciones">Funciones</a>
            <a href="#acerca">Acerca de</a>
          </div>

          <div className="footer-links">
            <h4>Tu cuenta</h4>
            <button onClick={onLogin}>Iniciar sesión</button>
            <button onClick={onRegister}>Crear cuenta</button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Focusly. Todos los derechos reservados.</span>
          <span>Organiza mejor cada día. ✦</span>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
