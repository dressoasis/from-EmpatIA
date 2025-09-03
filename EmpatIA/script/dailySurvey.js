document.getElementById("dailySurveyForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;

    // Build surveyData object using input names
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


    // --- Get user_docs from localStorage ---
    const logerUser = JSON.parse(localStorage.getItem("logerUser"));
    const userDocs = logerUser.user_profile;
    console.log("📝 Survey data:", surveyData);
    console .log("👤 User docs:", userDocs);
    try {
        document.getElementById("loader").classList.remove("d-none");

        // --- Call the backend endpoint ---
        const response = await fetch(`http://127.0.0.1:8000/google-docs/docs/read-daily/${userDocs}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(surveyData) // 👈 ahora sí mandamos el JSON
        });

        if (!response.ok) {
            throw new Error(`❌ Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log("📂 Docs updated:", data);

        alert("✅ Survey completed and impression saved to Docs");
        document.getElementById("loader").classList.add("d-none");

        // --- Redirect to dashboard ---
        window.location.href = "dashboard.html";

    } catch (error) {
        console.error("🚨 Error fetching docs:", error);
        alert("⚠️ Failed to save survey. Check console.");
    }
});

