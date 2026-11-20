
function Footer() {
  return (
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
          <h4>Funcionalidades</h4>
          <span>Gestión de tareas</span>
          <span>Organización de horarios</span>
          <span>Seguimiento del progreso</span>
          <span>Asistente con IA</span>
        </div>

        <div className="footer-links footer-contact">
          <h4>Contactos</h4>

          <a href="tel:+573004994591">
            <span>☎</span> 300 4994591
          </a>

          <a href="mailto:simonmucar10@gmail.com">
            <span>✉</span> simonmucar10@gmail.com
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Focusly. Todos los derechos reservados.
        </span>
        <span>Organiza mejor cada día. ✦</span>
      </div>
    </footer>
  );
}

export default Footer;
