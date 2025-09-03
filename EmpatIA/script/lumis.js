// ================== Toggle Recommendations ==================
document.getElementById("show-recommendations").addEventListener("click", () => {
  const rec = document.getElementById("recommendations");
  rec.classList.toggle("show");
});

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
