# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
## Arquitectura del proyecto

Focusly está organizado en tres partes principales:

### Frontend
Desarrollado con React y CSS. Permite navegar por las secciones, gestionar tareas y horarios e interactuar con el asistente de IA.

### Backend y autenticación
Supabase gestiona el registro, inicio de sesión y las operaciones con la base de datos.

### Inteligencia artificial
Gemini permite analizar la información de tareas y horarios, ofrecer recomendaciones y proponer nuevas tareas.

## Organización de carpetas

- `src/components/`: componentes principales de la aplicación.
- `src/services/`: conexión con servicios externos.
- `src/styles/`: hojas de estilo.
- `public/`: recursos estáticos, como el logo.