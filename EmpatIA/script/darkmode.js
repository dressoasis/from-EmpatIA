// Seleccionamos el botón
const darkToggle = document.getElementById("darkModeToggle");

// Función para activar/desactivar dark mode
function setDarkMode(enabled) {
    if (enabled) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
        darkToggle.textContent = "☀️";
        darkToggle.setAttribute("aria-pressed", "true");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
        darkToggle.textContent = "🌙";
        darkToggle.setAttribute("aria-pressed", "false");
    }
}

// Revisar preferencia guardada al cargar la página
if (localStorage.getItem("theme") === "dark") {
    setDarkMode(true);
} else {
    setDarkMode(false);
}

// Evento al hacer click en el botón
darkToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");
    setDarkMode(!isDark);
});
