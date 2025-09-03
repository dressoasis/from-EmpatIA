const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-msg");
const backBtn = document.getElementById("back-dashboard");

// Send message
sendBtn.addEventListener("click", () => {
    const msg = chatInput.value.trim();
    if (!msg) return;

    // User message
    const userMsg = document.createElement("div");
    userMsg.classList.add("message", "user");
    userMsg.textContent = msg;
    chatMessages.appendChild(userMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.value = "";

    // Simulate Lumis response
    setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.classList.add("message", "bot");
    botMsg.textContent = "Lumis says: Thank you for your message. 😄";
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 700);
});

// Send with Enter
chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
});

// Return to dashboard
backBtn.addEventListener("click", () => {
    window.location.href = "./dashboard.html";
});