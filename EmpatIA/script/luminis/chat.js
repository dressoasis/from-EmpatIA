const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-msg");
const backBtn = document.getElementById("back-dashboard");

// Enviar mensaje
sendBtn.addEventListener("click", () => {
    const msg = chatInput.value.trim();
    if (!msg) return;

    // Mensaje usuario
    const userMsg = document.createElement("div");
    userMsg.classList.add("message", "user");
    userMsg.textContent = msg;
    chatMessages.appendChild(userMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.value = "";

    // Simular respuesta de Lumis
    setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.classList.add("message", "bot");
    botMsg.textContent = "Lumis dice: Gracias por tu mensaje 😄";
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 700);
});

// Enviar con Enter
chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
});

// Volver al dashboard
backBtn.addEventListener("click", () => {
    window.location.href = "dashboard.html";
});