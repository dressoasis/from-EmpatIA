// Elements
const statusEl = document.getElementById("survey-status");
const completeBtn = document.getElementById("complete-survey");

// Function: complete survey
completeBtn.addEventListener("click", () => {
  statusEl.textContent = "Completed";
  statusEl.classList.remove("pending");
  statusEl.classList.add("completed");

  // Save the date in localStorage
  const today = new Date().toLocaleDateString();
  localStorage.setItem("surveyCompletedDate", today);
});

// Function: check status every day
function checkSurveyStatus() {
  const today = new Date().toLocaleDateString();
  const completedDate = localStorage.getItem("surveyCompletedDate");

  if (completedDate === today) {
    statusEl.textContent = "Completed";
    statusEl.classList.remove("pending");
    statusEl.classList.add("completed");
  } else {
    statusEl.textContent = "Pending";
    statusEl.classList.remove("completed");
    statusEl.classList.add("pending");
  }
}

// Run on load
checkSurveyStatus();


