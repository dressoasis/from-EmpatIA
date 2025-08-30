// Elementos
const statusEl = document.getElementById("survey-status");
const completeBtn = document.getElementById("complete-survey");

// Función: completar encuesta
completeBtn.addEventListener("click", () => {
  statusEl.textContent = "Completado";
  statusEl.classList.remove("pending");
  statusEl.classList.add("completed");

  // Guardar en localStorage la fecha
  const today = new Date().toLocaleDateString();
  localStorage.setItem("surveyCompletedDate", today);
});

// Función: verificar estado cada día
function checkSurveyStatus() {
  const today = new Date().toLocaleDateString();
  const completedDate = localStorage.getItem("surveyCompletedDate");

  if (completedDate === today) {
    statusEl.textContent = "Completado";
    statusEl.classList.remove("pending");
    statusEl.classList.add("completed");
  } else {
    statusEl.textContent = "Pendiente";
    statusEl.classList.remove("completed");
    statusEl.classList.add("pending");
  }
}

// Ejecutar al cargar
checkSurveyStatus();


