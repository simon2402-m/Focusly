# Instalación y ejecución de Focusly

## Requisitos previos

- Node.js instalado.
- npm disponible.
- Acceso al repositorio de Focusly.
- Un proyecto configurado en Supabase.

## 1. Obtener el proyecto

Clonar el repositorio desde GitHub:

```bash
git clone URL_DEL_REPOSITORIO
```

Entrar en la carpeta:

```bash
cd nombre-del-proyecto
```

## 2. Instalar dependencias

Ejecutar:

```bash
npm install
```

## 3. Configurar variables de entorno

Crear un archivo `.env.local` en la carpeta principal y agregar:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_publica
```

También se debe configurar la clave de Gemini como secreto de la función correspondiente en Supabase.

## 4. Iniciar la aplicación

Ejecutar:

```bash
npm run dev
```

Abrir en el navegador la dirección local que muestra Vite.

## 5. Compilar para producción

Ejecutar:

```bash
npm run build
```

La versión compilada se genera en la carpeta `dist`.