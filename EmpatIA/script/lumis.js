// ======================================================
// 🎯 Event: Toggle Recommendations Visibility
// ======================================================

document.getElementById("show-recommendations").addEventListener("click", () => {
  const rec = document.getElementById("recommendations");
  rec.classList.toggle("show");
});


function logoutSeccion(){
    localStorage.removeItem("logerUser")
    window.location.href="login.html"
}

// ======================================================
// 🎯 Event: DOMContentLoaded
// - Loads user info from localStorage
// - Requests analysis data from backend
// - Updates UI with recommendations, tips, and insights
// ======================================================
document.addEventListener("DOMContentLoaded", async () => {
  
  // ================== User Info ==================
  // Get logged user data from localStorage and show greeting
  const logerUser = JSON.parse(localStorage.getItem("logerUser"));
  document.getElementById("nameUser").textContent = `Hello, ${logerUser.full_name}!`;

  // Show loader before fetching data
  document.getElementById("loader").classList.remove("d-none");

  // Extract user profile ID (docId) for backend request
  const docId = logerUser.user_profile;
  console.log("👤 User doc ID:", docId);

  try {
    // ================== API Request ==================
    // Send POST request to backend for daily analysis
    const response = await fetch(`http://127.0.0.1:8000/google-docs/docs/analyze-daily/${docId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}) // Add user_json here if needed
    });

    if (!response.ok) throw new Error("Error fetching Lumis data");

    // Hide loader after successful response
    document.getElementById("loader").classList.add("d-none");

    // Parse backend response
    const data = await response.json();
    console.log("📄 Data received from Lumis:", data);

    // Extract impression JSON (already parsed in backend)
    let impresionJson = data.impresion_json;

    // ================== Recommendations ==================
    const recList = document.getElementById("recommendations");
    impresionJson.recommendations.forEach(rec => {
      const li = document.createElement("li");
      li.textContent = rec;
      recList.appendChild(li);
    });
    recList.classList.remove("hidden");

    // ================== Tip of the Day ==================
    document.getElementById("tip-text").textContent = impresionJson.tip_of_the_day;

    // ================== Insights ==================
    const insightsContainer = document.getElementById("insights-container");
    insightsContainer.innerHTML = ""; // Clear container before adding new insights

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
    // ================== Error Handling ==================
    console.error("⚠️ Error loading data:", error);
  }
const lumisChat = document.getElementById("lumis-chat");
const chatToggleBtn = document.getElementById("lumis-chat-toggle");
const openChatBtn = document.getElementById("open-chat"); // botón dentro de la card
const minimizeChatBtn = document.getElementById("minimize-chat");
const closeChatBtn = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-msg");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");

// ---------- Función para abrir chat ----------
function openChat() {
  lumisChat.classList.add("opened");
  lumisChat.classList.remove("minimized");
  chatToggleBtn.style.display = "none";
  chatInput.focus();
}

// ---------- Abrir chat desde ícono flotante ----------
chatToggleBtn.addEventListener("click", openChat);

// ---------- Abrir chat desde botón dentro de la card ----------
openChatBtn.addEventListener("click", openChat);

// ---------- Minimizar chat ----------
minimizeChatBtn.addEventListener("click", () => {
  lumisChat.classList.remove("opened");
  lumisChat.classList.add("minimized");
  chatToggleBtn.style.display = "flex";
});

// ---------- Cerrar chat ----------
closeChatBtn.addEventListener("click", () => {
  lumisChat.classList.remove("opened");
  lumisChat.classList.add("minimized");
  chatToggleBtn.style.display = "flex";
  chatMessages.innerHTML = "";
  chatInput.value = "";
});

// ---------- Enviar mensaje ----------
function sendMessage() {
  const msg = chatInput.value.trim();
  if (!msg) return;

  const userMsg = document.createElement("div");
  userMsg.classList.add("message", "user");
  userMsg.textContent = msg;
  chatMessages.appendChild(userMsg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  chatInput.value = "";

  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.classList.add("message", "bot");
    botMsg.textContent = "Lumis says: Thank you for your message. 😄";
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 700);
}

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

});