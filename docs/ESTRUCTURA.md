# Estructura del proyecto Focusly

El proyecto está organizado en carpetas para facilitar el mantenimiento y desarrollo de la aplicación.

## Carpeta src

Contiene el código principal de la aplicación.

### components
Almacena los componentes de React, como:

- Landing.jsx
- Register.jsx
- Login.jsx
- Dashboard.jsx
- Tasks.jsx
- Schedule.jsx
- Assistant.jsx
- Footer.jsx

### services
Contiene los servicios de conexión con plataformas externas, como Supabase.

### styles
Contiene los archivos CSS responsables del diseño de cada sección.

## Carpeta public

Almacena recursos estáticos utilizados por la aplicación, como el logo.

## Archivos principales

- App.jsx: estructura principal y navegación.
- main.jsx: punto de entrada de React.
- index.css: estilos generales.
- package.json: dependencias y scripts del proyecto.
- .env.example: plantilla de variables de entorno.

## Objetivo de la organización

Mantener el código ordenado, facilitar futuras modificaciones y permitir que cada componente tenga una responsabilidad específica.