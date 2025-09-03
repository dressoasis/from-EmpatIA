// ======================================================
// 🎯 Event: Daily Survey Form Submission
// - Prevents default form submission
// - Builds survey data object from form inputs
// - Sends data to backend for storage and analysis
// ======================================================
document.getElementById("dailySurveyForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const form = event.target;

  // ================== 1. Build Survey Data ==================
  const surveyData = {
    responses: [
      { id: 1, question: "I've felt nervous, tense, or restless today.", response: form.q1.value },
      { id: 2, question: "I've had a hard time concentrating on my activities.", response: form.q2.value },
      { id: 3, question: "I've felt overwhelmed or had too many responsibilities.", response: form.q3.value },
      { id: 4, question: "I've had trouble sleeping or resting well.", response: form.q4.value },
      { id: 5, question: "Today I felt sad, empty or unmotivated.", response: form.q5.value },
      { id: 6, question: "I've lost interest in things I normally enjoy.", response: form.q6.value },
      { id: 7, question: "I've felt tired or lacking energy during the day.", response: form.q7.value },
      { id: 8, question: "I've had negative thoughts about myself or about the future.", response: form.q8.value }
    ]
  };

  // ================== 2. Get User Info from localStorage ==================
  const logerUser = JSON.parse(localStorage.getItem("logerUser"));
  const userDocs = logerUser.user_profile;

  console.log("📝 Survey data:", surveyData);
  console.log("👤 User docs:", userDocs);

  try {
    // Show loader before sending request
    document.getElementById("loader").classList.remove("d-none");

    // ================== 3. Send Survey Data to Backend ==================
    const response = await fetch(`http://127.0.0.1:8000/google-docs/docs/read-daily/${userDocs}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(surveyData) // Send survey JSON
    });

    if (!response.ok) {
      throw new Error(`❌ Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log("📂 Docs updated:", data);

    // Notify user and hide loader
    alert("✅ Survey completed and impression saved to Docs");
    document.getElementById("loader").classList.add("d-none");

    // ================== 4. Redirect ==================
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error("🚨 Error fetching docs:", error);
    alert("⚠️ Failed to save survey. Check console.");
    document.getElementById("loader").classList.add("d-none");
  }
});
