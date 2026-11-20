
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import "../styles/Tasks.css";

function Tasks({ user }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("media");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setError("No se pudieron cargar las tareas: " + error.message);
    } else {
      setTasks(data || []);
      setError("");
    }

    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, [user.id]);

  const addTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    setSaving(true);
    setError("");

    const { data, error } = await supabase
      .from("tasks")
      .insert({
        user_id: user.id,
        title: title.trim(),
        description: description.trim(),
        due_date: dueDate || null,
        priority,
        completed: false,
      })
      .select()
      .single();

    if (error) {
      setError("No se pudo guardar la tarea: " + error.message);
    } else {
      setTasks((current) => [data, ...current]);
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("media");
    }

    setSaving(false);
  };

  const toggleTask = async (task) => {
    const newStatus = !task.completed;

    const { error } = await supabase
      .from("tasks")
      .update({ completed: newStatus })
      .eq("id", task.id)
      .eq("user_id", user.id);

    if (error) {
      setError("No se pudo actualizar la tarea: " + error.message);
      return;
    }

    setTasks((current) =>
      current.map((item) =>
        item.id === task.id
          ? { ...item, completed: newStatus }
          : item
      )
    );
  };

  const updatePriority = async (taskId, newPriority) => {
    const { error } = await supabase
      .from("tasks")
      .update({ priority: newPriority })
      .eq("id", taskId)
      .eq("user_id", user.id);

    if (error) {
      setError("No se pudo actualizar la prioridad: " + error.message);
      return;
    }

    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? { ...task, priority: newPriority }
          : task
      )
    );
  };

  const deleteTask = async (taskId) => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId)
      .eq("user_id", user.id);

    if (error) {
      setError("No se pudo eliminar la tarea: " + error.message);
      return;
    }

    setTasks((current) =>
      current.filter((task) => task.id !== taskId)
    );
  };

  const priorityOrder = {
    alta: 1,
    media: 2,
    baja: 3,
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return Number(a.completed) - Number(b.completed);
    }

    const priorityDifference =
      (priorityOrder[a.priority || "media"] || 2) -
      (priorityOrder[b.priority || "media"] || 2);

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    if (a.due_date && b.due_date) {
      return a.due_date.localeCompare(b.due_date);
    }

    if (a.due_date) return -1;
    if (b.due_date) return 1;

    return 0;
  });

  return (
    <section className="tasks-section">
      <div className="tasks-heading">
        <h2>Mis tareas</h2>
        <p>Organiza tus pendientes y avanza a tu ritmo.</p>
      </div>

      <form className="task-form" onSubmit={addTask}>
        <label htmlFor="task-title">Nombre de la tarea</label>

        <input
          id="task-title"
          type="text"
          placeholder="Ej. Estudiar matemáticas"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          required
        />

        <label htmlFor="task-description">Descripción</label>

        <textarea
          id="task-description"
          placeholder="Detalles de la tarea..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <label htmlFor="task-date">Fecha límite</label>

        <input
          id="task-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <label htmlFor="task-priority">Prioridad</label>

        <select
          id="task-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>

        <button type="submit" disabled={saving}>
          {saving ? "Guardando..." : "Agregar tarea"}
        </button>
      </form>

      {error && <p className="task-error">{error}</p>}

      <div className="task-list">
        <h3>Lista de tareas</h3>

        {loading ? (
          <p>Cargando tareas...</p>
        ) : tasks.length === 0 ? (
          <p className="empty-tasks">
            Todavía no tienes tareas. ¡Agrega la primera!
          </p>
        ) : (
          sortedTasks.map((task) => (
            <article className="task-item" key={task.id}>
              <div className="task-information">
                <label className="task-check">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task)}
                  />

                  <span className={task.completed ? "completed" : ""}>
                    {task.title}
                  </span>
                </label>

                {task.description && <p>{task.description}</p>}

                {task.due_date && (
                  <small>
                    Fecha límite:{" "}
                    {new Date(
                      `${task.due_date}T00:00:00`
                    ).toLocaleDateString("es-CO")}
                  </small>
                )}

                <div className="task-priority-control">
                  <span className={`priority-badge priority-${task.priority || "media"}`}>
                    Prioridad: {task.priority || "media"}
                  </span>

                  <select
                    aria-label={`Cambiar prioridad de ${task.title}`}
                    value={task.priority || "media"}
                    onChange={(e) =>
                      updatePriority(task.id, e.target.value)
                    }
                  >
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                className="delete-task"
                onClick={() => deleteTask(task.id)}
              >
                Eliminar
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default Tasks;

