# EmpatIA

EmpatIA es una aplicación web para el apoyo emocional y la gestión del bienestar mental. Permite a los usuarios registrarse, completar encuestas diarias y temáticas (ansiedad, depresión, estrés), y recibir recomendaciones personalizadas a través de Lumis, un asistente de IA.

## Estructura del proyecto

- **assets/**: Archivos CSS para los estilos de la app.
- **data/**: Datos de ejemplo y configuración.
- **img/**: Imágenes y logotipos.
- **script/**: Archivos JavaScript para la lógica de la app (registro, login, encuestas, dashboard, Lumis chat, modo oscuro).
- **views/**: Vistas HTML para las páginas principales y formularios de encuestas.

## Instalación y uso

1. Clona el repositorio.
2. Abre el archivo `views/login.html` en tu navegador para iniciar sesión.
3. El backend debe estar corriendo en `http://127.0.0.1:8000` para el registro, login y análisis de encuestas.

## Funcionalidades principales

- Registro y login de usuarios.
- Encuesta de ingreso y encuestas diarias/emocionales.
- Dashboard con recomendaciones, tips y chat con Lumis AI.
- Modo oscuro.
- Almacenamiento de sesión y datos en `localStorage`.

## Requisitos

- Backend compatible (API REST en FastAPI u otro).
- Navegador moderno.

## Créditos

Desarrollado por el equipo EmpatIA.