// ==========================
// Toggle Dark Mode - JS
// ==========================

// Seleccionamos el botón por su ID
const darkToggle = document.getElementById("darkModeToggle");

// Función para activar/desactivar modo oscuro
function setDarkMode(enabled) {
    if (enabled) {
        document.body.classList.add("dark-mode"); // agrega clase
        localStorage.setItem("theme", "dark");   // guarda preferencia
        darkToggle.textContent = "☀️";          // cambia icono
        darkToggle.setAttribute("aria-pressed", "true"); // accesibilidad
    } else {
        document.body.classList.remove("dark-mode"); // quita clase
        localStorage.setItem("theme", "light");     // guarda preferencia
        darkToggle.textContent = "🌙";             // cambia icono
        darkToggle.setAttribute("aria-pressed", "false"); // accesibilidad
    }
}

// Revisar preferencia guardada al cargar la página
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    setDarkMode(true);
} else {
    setDarkMode(false);
}

// Evento para alternar modo oscuro al hacer click
darkToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");
    setDarkMode(!isDark);
});
