
import { useState } from "react";
import { supabase } from "../services/supabase";
import "../styles/Assistant.css";

function Assistant({
  user,
  tasks = [],
  schedules = [],
  onTaskCreated,
}) {
  const [message, setMessage] = useState("");
  const [proposedTask, setProposedTask] = useState(null);
  const [savingTask, setSavingTask] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `¡Hola, ${
        user?.user_metadata?.full_name?.split(" ")[0] || "estudiante"
      }! Soy el asistente de Focusly. Puedo ayudarte a organizar tus tareas y mejorar tu planificación. ¿Qué necesitas?`,
    },
  ]);

  const [loading, setLoading] = useState(false);

  const suggestions = [
    "Ayúdame a organizar mis tareas",
    "¿Qué tareas tengo pendientes?",
    "Dame consejos para estudiar mejor",
  ];

  const handleSend = async (text = message) => {
    const question = text.trim();

    if (!question || loading || savingTask) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", content: question },
    ]);

    setMessage("");
    setProposedTask(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "focusly-assistant",
        {
          body: {
            message: question,
            tasks,
            schedules,
          },
        }
      );

      if (error) throw error;

      if (!data?.answer) {
        throw new Error("La IA no devolvió una respuesta.");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);

      if (data.proposedTask) {
        setProposedTask(data.proposedTask);
      }
    } catch (error) {
      console.error("Error al conectar con Focusly AI:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "No pude conectarme con la IA. Comprueba la conexión e inténtalo nuevamente.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmTask = async () => {
    if (!proposedTask || !user?.id || savingTask) return;

    setSavingTask(true);

    try {
      const { error } = await supabase.from("tasks").insert({
        user_id: user.id,
        title: proposedTask.title,
        description: proposedTask.description || "",
        due_date: proposedTask.due_date || null,
        completed: false,
      });

      if (error) throw error;

      setProposedTask(null);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "¡Tarea creada correctamente! Ya está guardada en tu lista de Focusly. ✦",
        },
      ]);

      if (onTaskCreated) {
        await onTaskCreated();
      }
    } catch (error) {
      console.error("Error al crear la tarea:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "No pude guardar la tarea. Comprueba tu conexión e inténtalo nuevamente.",
        },
      ]);
    } finally {
      setSavingTask(false);
    }
  };

  const handleCancelTask = () => {
    setProposedTask(null);

    setMessages((previous) => [
      ...previous,
      {
        role: "assistant",
        content: "He cancelado la creación de la tarea.",
      },
    ]);
  };

  return (
    <section className="assistant-section">
      <div className="assistant-heading">
        <span className="welcome-tag">INTELIGENCIA ARTIFICIAL</span>
        <h2>Asistente Focusly ✦</h2>
        <p>
          Tu compañero para organizar el tiempo y mejorar tu productividad.
        </p>
      </div>

      <div className="assistant-chat">
        <div className="chat-header">
          <div className="assistant-avatar">✦</div>

          <div>
            <strong>Focusly AI</strong>
            <small>Asistente de productividad</small>
          </div>

          <span className="online-indicator">● En línea</span>
        </div>

        <div className="chat-messages">
          {messages.map((item, index) => (
            <div
              key={index}
              className={`chat-message ${
                item.role === "user" ? "user-message" : "ai-message"
              }`}
            >
              {item.content}
            </div>
          ))}

          {loading && (
            <div className="chat-message ai-message">
              Focusly está pensando...
            </div>
          )}

          {proposedTask && (
            <div className="task-proposal">
              <h3>✦ Nueva tarea propuesta</h3>

              <div className="proposal-field">
                <strong>Nombre</strong>
                <p>{proposedTask.title}</p>
              </div>

              <div className="proposal-field">
                <strong>Descripción</strong>
                <p>
                  {proposedTask.description || "Sin descripción"}
                </p>
              </div>

              <div className="proposal-field">
                <strong>Fecha de entrega</strong>
                <p>
                  {proposedTask.due_date
                    ? new Date(
                        `${proposedTask.due_date}T00:00:00`
                      ).toLocaleDateString("es-CO")
                    : "Sin fecha"}
                </p>
              </div>

              <div className="proposal-actions">
                <button
                  type="button"
                  onClick={handleConfirmTask}
                  disabled={savingTask || loading}
                >
                  {savingTask ? "Guardando..." : "Confirmar creación"}
                </button>

                <button
                  type="button"
                  onClick={handleCancelTask}
                  disabled={savingTask}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="chat-suggestions">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSend(suggestion)}
              disabled={loading || savingTask}
            >
              {suggestion}
            </button>
          ))}
        </div>

        <form
          className="chat-input-area"
          onSubmit={(event) => {
            event.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Escribe tu mensaje..."
            disabled={loading || savingTask}
          />

          <button
            type="submit"
            disabled={loading || savingTask || !message.trim()}
          >
            Enviar ↑
          </button>
        </form>
      </div>
    </section>
  );
}

export default Assistant;
