// ==========================
// Toggle Dark Mode - JS
// ==========================

const darkToggle = document.getElementById("darkModeToggle");

// Function to enable/disable dark mode
function setDarkMode(enabled) {
    if (enabled) {
        document.body.classList.add("dark-mode"); // Add class
        localStorage.setItem("theme", "dark");   // Save preference
        darkToggle.textContent = "☀️";          // Change icon
        darkToggle.setAttribute("aria-pressed", "true"); // Accessibility
    } else {
        document.body.classList.remove("dark-mode"); // Remove class
        localStorage.setItem("theme", "light");     // Save preference
        darkToggle.textContent = "🌙";             // cambia icono
        darkToggle.setAttribute("aria-pressed", "false"); // Accessibility
    }
}

// Check saved preference when loading the page
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    setDarkMode(true);
} else {
    setDarkMode(false);
}

// Event to toggle dark mode when clicked
darkToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");
    setDarkMode(!isDark);
});
