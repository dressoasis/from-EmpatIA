document.getElementById("show-recommendations").addEventListener("click", () => {
    const rec = document.getElementById("recommendations");
    rec.classList.toggle("show");
});


document.addEventListener("DOMContentLoaded", async () => {
    const logerUser = JSON.parse(localStorage.getItem("logerUser"));
  const docId = logerUser.user_profile; // <-- cámbialo dinámicamente según tu app

  console.log("👤 User doc ID:", docId);
  try {
    const response = await fetch(`http://127.0.0.1:8000/google-docs/docs/analyze-daily/${docId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}) // si necesitas pasar usuario_json ponlo aquí
    });

    if (!response.ok) throw new Error("Error al obtener datos de Lumis");

    const data = await response.json();
    console.log("📄 Datos recibidos de Lumis:", data);
    // El backend devuelve el JSON como string -> parsearlo
let impresionJson = data.impresion_json; // ya viene como objeto

// ================== Recommendations ==================
const recList = document.getElementById("recommendations");
impresionJson.recommendations.forEach(rec => {
  const li = document.createElement("li");
  li.textContent = rec;
  recList.appendChild(li);
});
document.getElementById("recommendations").classList.remove("hidden");

// ================== Tip of the Day ==================
document.getElementById("tip-text").textContent = impresionJson.tip_of_the_day;

// ================== Insights ==================
const insightsContainer = document.getElementById("insights-container");
insightsContainer.innerHTML = ""; // limpiar
impresionJson.insights.forEach(insight => {
  const card = document.createElement("article");
  card.className = "insight";
  card.innerHTML = `
    <h4>${insight.title}</h4>
    <p>${insight.description}</p>
  `;
  insightsContainer.appendChild(card);
});

  } catch (error) {
    console.error("⚠️ Error cargando datos:", error);
  }
});
