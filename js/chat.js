const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatMessages = document.getElementById("chatMessages");
const typingIndicator = document.getElementById("typingIndicator");

// Get current time
function getCurrentTime() {
  const now = new Date();
  return (
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0")
  );
}

// Send message function
function sendMessage() {
  const messageText = messageInput.value.trim();

  if (messageText === "") return;

  // Create message element
  const messageDiv = document.createElement("div");
  messageDiv.className = "message sent";
  messageDiv.innerHTML = `
                <div class="message-avatar">V</div>
                <div class="message-content">
                    <div class="message-bubble">
                        ${messageText}
                    </div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            `;

  // Insert before typing indicator parent
  const typingParent = typingIndicator.closest(".message");
  chatMessages.insertBefore(messageDiv, typingParent);

  // Clear input
  messageInput.value = "";

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Show typing indicator
  typingIndicator.classList.add("active");

  // Simulate response after 2 seconds
  setTimeout(() => {
    typingIndicator.classList.remove("active");
    simulateResponse();
  }, 2000);
}

// Simulate response
function simulateResponse() {
  const responses = [
    "Sim, isso seria possível! Vou verificar a disponibilidade.",
    "Deixe-me confirmar com o síndico e retorno em breve.",
    "Perfeito! Vou processar sua solicitação.",
    "Obrigado pela mensagem. Estou analisando sua solicitação.",
  ];

  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];

  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.innerHTML = `
                <div class="message-avatar">C</div>
                <div class="message-content">
                    <div class="message-bubble">
                        ${randomResponse}
                    </div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            `;

  const typingParent = typingIndicator.closest(".message");
  chatMessages.insertBefore(messageDiv, typingParent);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listeners
sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Auto-scroll to bottom on load
window.addEventListener("load", () => {
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
