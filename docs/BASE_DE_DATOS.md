# Base de datos de Focusly

Focusly utiliza Supabase para almacenar la información de los usuarios y permitir que cada estudiante gestione sus actividades.

## Tabla tasks

Almacena las tareas creadas por los usuarios.

| Campo | Descripción |
|---|---|
| id | Identificador único de la tarea |
| user_id | Usuario propietario de la tarea |
| title | Nombre de la tarea |
| description | Descripción |
| due_date | Fecha límite |
| completed | Estado de finalización |
| priority | Nivel de prioridad |
| created_at | Fecha de creación |

Los niveles de prioridad son alta, media y baja.

## Tabla schedules

Almacena las actividades del horario semanal.

| Campo | Descripción |
|---|---|
| id | Identificador único |
| user_id | Usuario propietario |
| title | Nombre de la actividad |
| day_of_week | Día de la semana |
| start_time | Hora de inicio |
| end_time | Hora de finalización |
| created_at | Fecha de creación |

## Seguridad

Las tablas utilizan políticas de seguridad a nivel de fila (RLS) para que cada usuario pueda consultar y modificar únicamente sus propios registros.

## Servicio utilizado

Supabase proporciona la base de datos y los servicios de autenticación de Focusly.