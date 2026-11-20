# Seguridad de Focusly

Focusly utiliza diferentes mecanismos para proteger la información de sus usuarios.

## 1. Autenticación

Supabase Auth gestiona el registro y el inicio de sesión de los usuarios.

## 2. Protección de datos

La base de datos utiliza Row Level Security (RLS) para limitar el acceso a los registros de cada usuario.

## 3. Variables de entorno

Las credenciales de conexión se almacenan en archivos locales de configuración que no deben publicarse en GitHub.

## 4. Inteligencia artificial

La clave de Gemini se almacena como secreto en Supabase y se utiliza desde una Edge Function.

## 5. Buenas prácticas

- No compartir claves privadas.
- No subir archivos `.env.local` al repositorio.
- Validar la información antes de guardarla.
- Mantener las políticas RLS activas.

## Objetivo

Proteger la información personal y garantizar que cada usuario gestione únicamente sus propios datos.
