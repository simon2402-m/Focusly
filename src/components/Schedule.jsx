
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import "../styles/Schedule.css";

const days = [
  { id: 1, name: "Lunes" },
  { id: 2, name: "Martes" },
  { id: 3, name: "Miércoles" },
  { id: 4, name: "Jueves" },
  { id: 5, name: "Viernes" },
  { id: 6, name: "Sábado" },
  { id: 0, name: "Domingo" },
];

function Schedule({ user }) {
  const [activities, setActivities] = useState([]);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("1");
  const [startTime, setStartTime] = useState("07:00");
  const [endTime, setEndTime] = useState("08:00");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadActivities = async () => {
    const { data, error } = await supabase
      .from("schedules")
      .select("*")
      .eq("user_id", user.id)
      .order("start_time");

    if (error) {
      setError("Error al cargar el horario: " + error.message);
    } else {
      setActivities(data);
      setError("");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadActivities();
  }, [user.id]);

  const addActivity = async (e) => {
    e.preventDefault();

    if (endTime <= startTime) {
      setError("La hora de finalización debe ser posterior a la inicial.");
      return;
    }

    setSaving(true);
    setError("");

    const { data, error } = await supabase
      .from("schedules")
      .insert({
        user_id: user.id,
        title: title.trim(),
        day_of_week: Number(day),
        start_time: startTime,
        end_time: endTime,
      })
      .select()
      .single();

    if (error) {
      setError("No se pudo guardar: " + error.message);
    } else {
      setActivities((current) => [...current, data]);
      setTitle("");
    }

    setSaving(false);
  };

  const deleteActivity = async (id) => {
    const { error } = await supabase
      .from("schedules")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      setError("No se pudo eliminar: " + error.message);
      return;
    }

    setActivities((current) =>
      current.filter((activity) => activity.id !== id)
    );
  };

  return (
    <section className="schedule-section">
      <div className="schedule-heading">
        <h2>Mi horario semanal</h2>
        <p>Organiza tus actividades durante la semana.</p>
      </div>

      <form className="schedule-form" onSubmit={addActivity}>
        <label>Nombre de la actividad</label>
        <input
          type="text"
          placeholder="Ej. Matemáticas"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          required
        />

        <label>Día</label>
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          {days.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <div className="schedule-time-fields">
          <div>
            <label>Hora de inicio</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Hora de finalización</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" disabled={saving}>
          {saving ? "Guardando..." : "Agregar al horario"}
        </button>
      </form>

      {error && <p className="schedule-error">{error}</p>}

      <div className="weekly-schedule">
        {loading ? (
          <p>Cargando horario...</p>
        ) : (
          days.map((item) => {
            const dayActivities = activities
              .filter((activity) => activity.day_of_week === item.id)
              .sort((a, b) =>
                a.start_time.localeCompare(b.start_time)
              );

            return (
              <div className="schedule-day" key={item.id}>
                <h3>{item.name}</h3>

                {dayActivities.length === 0 ? (
                  <p className="no-activities">
                    Sin actividades programadas.
                  </p>
                ) : (
                  dayActivities.map((activity) => (
                    <article
                      className="schedule-activity"
                      key={activity.id}
                    >
                      <div>
                        <strong>{activity.title}</strong>
                        <p>
                          {activity.start_time.slice(0, 5)}
                          {" - "}
                          {activity.end_time.slice(0, 5)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteActivity(activity.id)}
                      >
                        Eliminar
                      </button>
                    </article>
                  ))
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default Schedule;
