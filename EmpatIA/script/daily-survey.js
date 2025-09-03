// ======================================================
// 🎯 Elements
// - References to survey status display and complete button
// ======================================================
const statusEl = document.getElementById("survey-status");
const completeBtn = document.getElementById("complete-survey");

// ======================================================
// 🎯 Event: Complete Survey
// - Updates status text and styling
// - Saves completion date in localStorage
// ======================================================
completeBtn.addEventListener("click", () => {
  statusEl.textContent = "Completed";
  statusEl.classList.remove("pending");
  statusEl.classList.add("completed");

  // Save today's date in localStorage
  const today = new Date().toLocaleDateString();
  localStorage.setItem("surveyCompletedDate", today);
});

// ======================================================
// 🎯 Function: Check Survey Status
// - Compares today's date with stored completion date
// - Updates status text and CSS class accordingly
// ======================================================
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

// ======================================================
// 🎯 Initialize
// - Check survey status on page load
// ======================================================
checkSurveyStatus();
// ======================================================