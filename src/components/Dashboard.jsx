
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../services/supabase";
import Assistant from "./Assistant";
import Footer from "./Footer";
import Tasks from "./Tasks";
import Schedule from "./Schedule";
import "../styles/Dashboard.css";

const sections = [
  { id: "inicio", label: "Inicio", icon: "⌂" },
  { id: "tareas", label: "Tareas", icon: "✓" },
  { id: "horario", label: "Horario", icon: "▦" },
  { id: "progreso", label: "Progreso", icon: "↗" },
  { id: "ia", label: "IA", icon: "✦" },
];

const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

function getLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getWeekStart(date) {
  const start = new Date(date);
  const day = start.getDay();
  start.setDate(start.getDate() - (day === 0 ? 6 : day - 1));
  start.setHours(0, 0, 0, 0);
  return start;
}

function getNextOccurrence(activity, now) {
  const [hours, minutes] = activity.start_time.split(":").map(Number);
  const nextDate = new Date(now);
  const difference = (activity.day_of_week - now.getDay() + 7) % 7;

  nextDate.setDate(now.getDate() + difference);
  nextDate.setHours(hours, minutes, 0, 0);

  if (nextDate <= now) {
    nextDate.setDate(nextDate.getDate() + 7);
  }

  return nextDate;
}

function formatTime(time) {
  return time?.slice(0, 5) || "";
}

function Dashboard({ user }) {
  const [activeSection, setActiveSection] = useState("inicio");
  const [tasks, setTasks] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const today = new Date();
  const todayString = getLocalDateString(today);
  const weekStart = getWeekStart(today);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);

  useEffect(() => {
    if (user?.id) {
      loadDashboardData();
    }
  }, [user?.id]);

  const loadDashboardData = async () => {
    setLoadingData(true);

    const [tasksResult, schedulesResult] = await Promise.all([
      supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id),

      supabase
        .from("schedules")
        .select("*")
        .eq("user_id", user.id),
    ]);

    if (tasksResult.error) {
      console.error("Error cargando tareas:", tasksResult.error);
    } else {
      setTasks(tasksResult.data || []);
    }

    if (schedulesResult.error) {
      console.error("Error cargando horarios:", schedulesResult.error);
    } else {
      setSchedules(schedulesResult.data || []);
    }

    setLoadingData(false);
  };

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const todayActivities = schedules
    .filter((activity) => activity.day_of_week === today.getDay())
    .sort((a, b) => a.start_time.localeCompare(b.start_time));

  const upcomingActivities = useMemo(() => {
    return schedules
      .map((activity) => ({
        ...activity,
        nextDate: getNextOccurrence(activity, new Date()),
      }))
      .sort((a, b) => a.nextDate - b.nextDate)
      .slice(0, 3);
  }, [schedules]);

  const weeklyTasks = tasks.filter((task) => {
    if (!task.due_date) return false;

    const dueDate = new Date(`${task.due_date}T00:00:00`);
    return dueDate >= weekStart && dueDate < weekEnd;
  });

  const weeklyCompleted = weeklyTasks.filter((task) => task.completed).length;

  const weeklyProgress =
    weeklyTasks.length > 0
      ? Math.round((weeklyCompleted / weeklyTasks.length) * 100)
      : 0;

  const priorityTasks = [...pendingTasks]
    .filter((task) => task.due_date)
    .sort((a, b) => a.due_date.localeCompare(b.due_date))
    .slice(0, 3);

  const userName =
    user?.user_metadata?.full_name?.split(" ")[0] || "estudiante";

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Error al cerrar sesión: " + error.message);
    }
  };

  const tips = [
    "Divide las tareas grandes en actividades pequeñas. Empezar será mucho más fácil.",
    "Estudia en bloques de tiempo y toma descansos breves para mantener la concentración.",
    "Organiza primero tus tareas más importantes y deja las menos urgentes para después.",
    "Evita las distracciones durante tus sesiones de estudio. Tu concentración te lo agradecerá.",
  ];

  const dailyTip = tips[today.getDate() % tips.length];

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-brand">
  <img src="public/96d58eac-078a-4bdc-a2b0-a0580acc6c31.png" alt="Logo Focusly" />
  <h1>Focusly</h1>

</div>

        <nav className="dashboard-nav">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`nav-link ${
                activeSection === section.id ? "active" : ""
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              <span>{section.icon}</span>
              {section.label}
            </button>
          ))}
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <section className="dashboard-content">
        {activeSection === "inicio" && (
          <div className="home-section">
            <div className="home-welcome">
              <div>
                <span className="welcome-tag">TU ESPACIO DE PRODUCTIVIDAD</span>
                <h2>¡Hola, {userName}! 👋</h2>
                <p>
                  Organiza tu tiempo, cumple tus objetivos y aprovecha mejor
                  cada día. Este es el resumen de tu actividad.
                </p>
              </div>

              <div className="welcome-date">
                <span>HOY</span>
                <strong>
                  {today.toLocaleDateString("es-CO", {
                    day: "numeric",
                    month: "long",
                  })}
                </strong>
                <small>{days[today.getDay()]}</small>
              </div>
            </div>

            <div className="home-stats">
              <article className="home-stat-card">
                <span className="stat-icon">◷</span>
                <p>Tareas pendientes</p>
                <strong>{loadingData ? "..." : pendingTasks.length}</strong>
                <small>Por completar</small>
              </article>

              <article className="home-stat-card">
                <span className="stat-icon">▦</span>
                <p>Actividades de hoy</p>
                <strong>{loadingData ? "..." : todayActivities.length}</strong>
                <small>En tu horario</small>
              </article>

              <article className="home-stat-card">
                <span className="stat-icon">✓</span>
                <p>Tareas completadas</p>
                <strong>{loadingData ? "..." : completedTasks.length}</strong>
                <small>¡Buen trabajo!</small>
              </article>
            </div>

            <div className="home-grid">
              <article className="home-panel progress-panel">
                <div className="panel-heading">
                  <div>
                    <span className="panel-eyebrow">TU RENDIMIENTO</span>
                    <h3>Progreso semanal</h3>
                  </div>
                  <span className="panel-icon">↗</span>
                </div>

                <div className="progress-number">
                  {loadingData ? "..." : `${weeklyProgress}%`}
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${weeklyProgress}%` }}
                  />
                </div>

                <p>
                  {weeklyTasks.length === 0
                    ? "Todavía no tienes tareas con fecha de entrega esta semana."
                    : `${weeklyCompleted} de ${weeklyTasks.length} tareas de esta semana completadas.`}
                </p>
              </article>

              <article className="home-panel">
                <div className="panel-heading">
                  <div>
                    <span className="panel-eyebrow">ORGANIZA TU DÍA</span>
                    <h3>Próximas actividades</h3>
                  </div>
                  <span className="panel-icon">▦</span>
                </div>

                {loadingData ? (
                  <p className="empty-message">Cargando actividades...</p>
                ) : upcomingActivities.length === 0 ? (
                  <p className="empty-message">
                    Aún no tienes actividades registradas en tu horario.
                  </p>
                ) : (
                  <div className="home-list">
                    {upcomingActivities.map((activity) => (
                      <div className="home-list-item" key={activity.id}>
                        <span className="list-dot" />
                        <div>
                          <strong>{activity.title}</strong>
                          <small>
                            {days[activity.day_of_week]} ·{" "}
                            {formatTime(activity.start_time)}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>

              <article className="home-panel">
                <div className="panel-heading">
                  <div>
                    <span className="panel-eyebrow">NO PIERDAS EL RITMO</span>
                    <h3>Tareas prioritarias</h3>
                  </div>
                  <span className="panel-icon">✦</span>
                </div>

                {loadingData ? (
                  <p className="empty-message">Cargando tareas...</p>
                ) : priorityTasks.length === 0 ? (
                  <p className="empty-message">
                    No tienes tareas pendientes con fecha de entrega.
                  </p>
                ) : (
                  <div className="home-list">
                    {priorityTasks.map((task) => (
                      <div className="home-list-item" key={task.id}>
                        <span className="list-dot priority-dot" />
                        <div>
                          <strong>{task.title}</strong>
                          <small>
                            Entrega:{" "}
                            {new Date(
                              `${task.due_date}T00:00:00`
                            ).toLocaleDateString("es-CO")}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>

              <article className="home-panel tip-panel">
                <div className="panel-heading">
                  <div>
                    <span className="panel-eyebrow">UN CONSEJO PARA TI</span>
                    <h3>Consejo del día</h3>
                  </div>
                  <span className="panel-icon">☀</span>
                </div>
                <p>{dailyTip}</p>
              </article>
            </div>
          </div>
        )}

        {activeSection === "tareas" && <Tasks user={user} />}

        {activeSection === "horario" && <Schedule user={user} />}

        
{activeSection === "progreso" && (
  <section className="progress-section">
    <div className="progress-header">
      <span className="welcome-tag">ANÁLISIS DE PRODUCTIVIDAD</span>
      <h2>Tu progreso</h2>
      <p>Revisa cómo avanzas con tus objetivos y mantén el ritmo.</p>
    </div>

    <div className="progress-stats">
      <article className="progress-stat-card">
        <span>📋</span>
        <p>Total de tareas</p>
        <strong>{loadingData ? "..." : tasks.length}</strong>
      </article>

      <article className="progress-stat-card">
        <span>✅</span>
        <p>Completadas</p>
        <strong>{loadingData ? "..." : completedTasks.length}</strong>
      </article>

      <article className="progress-stat-card">
        <span>⏳</span>
        <p>Pendientes</p>
        <strong>{loadingData ? "..." : pendingTasks.length}</strong>
      </article>
    </div>

    <article className="progress-main-card">
      <div className="progress-card-heading">
        <div>
          <span className="panel-eyebrow">RESUMEN GENERAL</span>
          <h3>Progreso de tus tareas</h3>
        </div>

        <strong>
          {loadingData
            ? "..."
            : tasks.length > 0
              ? `${Math.round((completedTasks.length / tasks.length) * 100)}%`
              : "0%"}
        </strong>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${
              tasks.length > 0
                ? (completedTasks.length / tasks.length) * 100
                : 0
            }%`,
          }}
        />
      </div>

      <p>
        {tasks.length === 0
          ? "Agrega tareas para comenzar a medir tu progreso."
          : `Has completado ${completedTasks.length} de ${tasks.length} tareas.`}
      </p>
    </article>

    <article className="progress-main-card">
      <div className="panel-heading">
        <div>
          <span className="panel-eyebrow">ACTIVIDAD</span>
          <h3>Estado de tus tareas</h3>
        </div>
      </div>

      {loadingData ? (
        <p className="empty-message">Cargando tareas...</p>
      ) : tasks.length === 0 ? (
        <p className="empty-message">
          Todavía no tienes tareas registradas.
        </p>
      ) : (
        <div className="progress-task-list">
          {[...tasks]
            .sort(
              (a, b) =>
                new Date(b.created_at) - new Date(a.created_at)
            )
            .slice(0, 5)
            .map((task) => (
              <div className="progress-task-item" key={task.id}>
                <div>
                  <strong>{task.title}</strong>
                  <small>
                    {task.due_date
                      ? `Fecha de entrega: ${new Date(
                          `${task.due_date}T00:00:00`
                        ).toLocaleDateString("es-CO")}`
                      : "Sin fecha de entrega"}
                  </small>
                </div>

                <span
                  className={
                    task.completed
                      ? "task-status completed"
                      : "task-status pending"
                  }
                >
                  {task.completed ? "Completada" : "Pendiente"}
                </span>
              </div>
            ))}
        </div>
      )}
    </article>

    <article className="progress-main-card">
      <span className="panel-eyebrow">OBJETIVO SEMANAL</span>
      <h3>Tu rendimiento esta semana</h3>

      <div className="progress-week-number">
        {loadingData ? "..." : `${weeklyProgress}%`}
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${weeklyProgress}%` }}
        />
      </div>

      <p>
        {weeklyTasks.length === 0
          ? "No tienes tareas con fecha de entrega esta semana."
          : `${weeklyCompleted} de ${weeklyTasks.length} tareas de esta semana completadas.`}
      </p>
    </article>
  </section>
)}

{activeSection === "ia" && (
  <Assistant
    user={user}
    tasks={tasks}
    schedules={schedules}
    onTaskCreated={loadDashboardData}
  />
)}

      </section>
      <Footer />
    </main>

  );
}

export default Dashboard;
