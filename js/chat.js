// Dados de exemplo para contatos
const contacts = [
  {
    id: 1,
    name: "Carlos Silva",
    avatar: "./public/professional-man-glasses.png",
    type: "Condomínio",
    lastMessage: "Olá, tudo bem?",
    unread: 2,
  },
  {
    id: 2,
    name: "Maria Santos",
    avatar: "./public/professional-business-woman.png",
    type: "Usuário Externo",
    lastMessage: "Obrigado!",
    unread: 0,
  },
  {
    id: 3,
    name: "João Oliveira",
    avatar: "./public/young-man-casual.jpg",
    type: "Condomínio",
    lastMessage: "Até logo",
    unread: 0,
  },
  {
    id: 4,
    name: "Ana Costa",
    avatar: "./public/professional-woman.png",
    type: "Usuário Externo",
    lastMessage: "Perfeito!",
    unread: 1,
  },
  {
    id: 5,
    name: "Pedro Almeida",
    avatar: "./public/man-business-suit.jpg",
    type: "Condomínio",
    lastMessage: "Combinado então",
    unread: 0,
  },
  {
    id: 6,
    name: "Juliana Ferreira",
    avatar: "./public/professional-woman-smiling.png",
    type: "Usuário Externo",
    lastMessage: "Muito obrigada!",
    unread: 3,
  },
  {
    id: 7,
    name: "Roberto Lima",
    avatar: "./public/mature-man-professional.jpg",
    type: "Condomínio",
    lastMessage: "Vou verificar",
    unread: 0,
  },
  {
    id: 8,
    name: "Fernanda Souza",
    avatar: "./public/young-woman-casual.jpg",
    type: "Usuário Externo",
    lastMessage: "Quando podemos conversar?",
    unread: 0,
  },
  {
    id: 9,
    name: "Lucas Martins",
    avatar: "./public/man-casual-style.jpg",
    type: "Condomínio",
    lastMessage: "Tudo certo!",
    unread: 0,
  },
  {
    id: 10,
    name: "Beatriz Rocha",
    avatar: "./public/woman-elegant-professional.jpg",
    type: "Usuário Externo",
    lastMessage: "Aguardo retorno",
    unread: 2,
  },
  {
    id: 11,
    name: "Ricardo Mendes",
    avatar: "./public/man-glasses-professional.jpg",
    type: "Condomínio",
    lastMessage: "Sem problemas",
    unread: 0,
  },
  {
    id: 12,
    name: "Camila Dias",
    avatar: "./public/woman-business-attire.jpg",
    type: "Usuário Externo",
    lastMessage: "Ótimo!",
    unread: 0,
  },
  {
    id: 13,
    name: "Thiago Barbosa",
    avatar: "./public/young-man-professional.jpg",
    type: "Condomínio",
    lastMessage: "Pode deixar",
    unread: 1,
  },
  {
    id: 14,
    name: "Patricia Gomes",
    avatar: "./public/woman-mature-professional.jpg",
    type: "Usuário Externo",
    lastMessage: "Entendi",
    unread: 0,
  },
  {
    id: 15,
    name: "Marcos Vieira",
    avatar: "./public/man-casual-friendly.jpg",
    type: "Condomínio",
    lastMessage: "Até mais!",
    unread: 0,
  },
];

// Mensagens de exemplo
const messagesData = {
  1: [
    {
      id: 1,
      sender: "sent",
      text: "Olá, meu nome é Otávio Silva E gostaria de alugar a sua vaga dos dias 03/02/2025 á 21/02/2025 as 07:00 á 19:00.",
      time: "10:30",
    },
    {
      id: 2,
      sender: "received",
      text: "Olá, meu nome é José. Tudo bem?",
      time: "10:32",
    },
    {
      id: 3,
      sender: "sent",
      text: "Tudo ótimo! Gostaria de confirmar a disponibilidade da vaga.",
      time: "10:35",
    },
    {
      id: 4,
      sender: "received",
      text: "Sim, a vaga está disponível nesse período.",
      time: "10:40",
    },
    {
      id: 5,
      sender: "sent",
      text: "Perfeito! Qual o valor?",
      time: "10:45",
    },
    {
      id: 6,
      sender: "received",
      text: "R$ 15,00 por dia. Total de R$ 285,00 para o período.",
      time: "10:50",
    },
    {
      id: 7,
      sender: "sent",
      text: "Ótimo! Aceito. Como fazemos o pagamento?",
      time: "10:55",
    },
    {
      id: 8,
      sender: "received",
      text: "Após ambos aprovarem a reserva, você receberá os dados para pagamento.",
      time: "11:00",
    },
    {
      id: 9,
      sender: "sent",
      text: "Entendido. Vou aprovar agora então.",
      time: "11:05",
    },
    {
      id: 10,
      sender: "received",
      text: "Perfeito! Aguardo sua aprovação.",
      time: "11:10",
    },
  ],
  2: [
    {
      id: 1,
      sender: "received",
      text: "Oi! Obrigado pela reserva!",
      time: "09:15",
    },
    {
      id: 2,
      sender: "sent",
      text: "De nada! Foi um prazer.",
      time: "09:20",
    },
  ],
  3: [],
  4: [
    {
      id: 1,
      sender: "sent",
      text: "Bom dia! A vaga ainda está disponível?",
      time: "08:00",
    },
  ],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
  10: [],
  11: [],
  12: [],
  13: [],
  14: [],
  15: [],
};

// Estado da aplicação
let currentContactId = null;
let currentUserApproved = false;
let otherUserApproved = false;

// Elementos do DOM
const contactsList = document.getElementById("contactsList");
const chatMessages = document.getElementById("chatMessages");
const chatAvatar = document.getElementById("chatAvatar");
const chatUserName = document.getElementById("chatUserName");
const chatUserType = document.getElementById("chatUserType");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const approveButton = document.getElementById("approveButton");
const reportButton = document.getElementById("reportButton");
const blockButton = document.getElementById("blockButton");
const approvalModal = document.getElementById("approvalModal");
const cancelApproval = document.getElementById("cancelApproval");
const confirmApproval = document.getElementById("confirmApproval");
const backButton = document.getElementById("backButton");
const chatSidebar = document.getElementById("chatSidebar");
const chatMain = document.getElementById("chatMain");
const searchContacts = document.getElementById("searchContacts");
const reportModal = document.getElementById("reportModal");
const closeReportModal = document.getElementById("closeReportModal");
const cancelReport = document.getElementById("cancelReport");
const confirmReport = document.getElementById("confirmReport");
const blockModal = document.getElementById("blockModal");
const blockUserName = document.getElementById("blockUserName");
const cancelBlock = document.getElementById("cancelBlock");
const confirmBlock = document.getElementById("confirmBlock");

// Carregar contatos
function loadContacts() {
  contactsList.innerHTML = "";
  contacts.forEach((contact) => {
    const contactItem = document.createElement("div");
    contactItem.className = "contact-item";
    contactItem.dataset.contactId = contact.id;

    contactItem.innerHTML = `
      <img src="${contact.avatar}" alt="${contact.name}" class="contact-avatar">
      <div class="contact-info">
        <div class="contact-name">${contact.name}</div>
        <div class="contact-preview">${contact.lastMessage}</div>
      </div>
      ${
        contact.unread > 0
          ? `<span class="contact-badge">${contact.unread}</span>`
          : ""
      }
    `;

    contactItem.addEventListener("click", () => selectContact(contact.id));
    contactsList.appendChild(contactItem);
  });
}

searchContacts.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  document.querySelectorAll(".contact-item").forEach((item) => {
    const name = item.querySelector(".contact-name").textContent.toLowerCase();
    item.style.display = name.includes(searchTerm) ? "flex" : "none";
  });
});

// Selecionar contato
function selectContact(contactId) {
  currentContactId = contactId;
  const contact = contacts.find((c) => c.id === contactId);

  // Atualizar UI do header
  chatAvatar.src = contact.avatar;
  chatUserName.textContent = contact.name;
  chatUserType.textContent = contact.type;

  // Atualizar contato ativo
  document.querySelectorAll(".contact-item").forEach((item) => {
    item.classList.remove("active");
  });
  document
    .querySelector(`[data-contact-id="${contactId}"]`)
    .classList.add("active");

  // Habilitar input e botões
  messageInput.disabled = false;
  sendButton.disabled = false;
  approveButton.style.display = "block";

  if (window.innerWidth <= 768) {
    chatSidebar.classList.add("hidden");
    chatMain.classList.add("active");
  }

  // Carregar mensagens
  loadMessages(contactId);
}

backButton.addEventListener("click", () => {
  chatSidebar.classList.remove("hidden");
  chatMain.classList.remove("active");
});

// Carregar mensagens
function loadMessages(contactId) {
  const messages = messagesData[contactId] || [];
  chatMessages.innerHTML = "";

  if (messages.length === 0) {
    chatMessages.innerHTML =
      '<div class="empty-chat"><p>Nenhuma mensagem ainda</p></div>';
    return;
  }

  messages.forEach((message) => {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${message.sender}${
      message.isSystem ? " system" : ""
    }`;

    const contact = contacts.find((c) => c.id === contactId);
    const avatar =
      message.sender === "sent"
        ? "./public/diverse-user-avatars.png"
        : contact.avatar;

    messageDiv.innerHTML = `
      ${
        !message.isSystem
          ? `<img src="${avatar}" alt="Avatar" class="message-avatar">`
          : ""
      }
      <div class="message-content">
        <div class="message-bubble">${message.text}</div>
        <div class="message-time">${message.time}</div>
      </div>
    `;

    chatMessages.appendChild(messageDiv);
  });

  // Scroll para o final
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Enviar mensagem
function sendMessage() {
  const text = messageInput.value.trim();
  if (!text || !currentContactId) return;

  const newMessage = {
    id: Date.now(),
    sender: "sent",
    text: text,
    time: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  messagesData[currentContactId].push(newMessage);
  loadMessages(currentContactId);
  messageInput.value = "";
}

// Event listeners
sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Aprovar vaga
approveButton.addEventListener("click", () => {
  approvalModal.classList.add("active");
});

cancelApproval.addEventListener("click", () => {
  approvalModal.classList.remove("active");
});

confirmApproval.addEventListener("click", () => {
  currentUserApproved = true;
  approveButton.disabled = true;
  approveButton.textContent = "✓ Você Aprovou";
  approvalModal.classList.remove("active");

  // Simular aprovação do outro usuário (para demonstração)
  setTimeout(() => {
    otherUserApproved = true;
    if (currentUserApproved && otherUserApproved) {
      alert(
        "Ambas as partes aprovaram! Redirecionando para a tela de síndico..."
      );
      window.location.href = "sindico.html";
    }
  }, 2000);
});

reportButton.addEventListener("click", () => {
  reportModal.classList.add("active");
});

closeReportModal.addEventListener("click", () => {
  reportModal.classList.remove("active");
});

cancelReport.addEventListener("click", () => {
  reportModal.classList.remove("active");
});

confirmReport.addEventListener("click", () => {
  const selectedReason = document.querySelector(
    'input[name="reportReason"]:checked'
  );
  const details = document.getElementById("reportDetails").value;

  if (!selectedReason) {
    alert("Por favor, selecione um motivo para a denúncia.");
    return;
  }

  const contact = contacts.find((c) => c.id === currentContactId);
  alert(
    `Denúncia enviada com sucesso!\n\nUsuário: ${contact.name}\nMotivo: ${
      selectedReason.value
    }\nDetalhes: ${details || "Nenhum"}`
  );
  reportModal.classList.remove("active");

  // Resetar formulário
  document.querySelectorAll('input[name="reportReason"]').forEach((input) => {
    input.checked = false;
  });
  document.getElementById("reportDetails").value = "";
});

blockButton.addEventListener("click", () => {
  const contact = contacts.find((c) => c.id === currentContactId);
  blockUserName.textContent = contact.name;
  blockModal.classList.add("active");
});

cancelBlock.addEventListener("click", () => {
  blockModal.classList.remove("active");
});

confirmBlock.addEventListener("click", () => {
  const contact = contacts.find((c) => c.id === currentContactId);
  alert(`Usuário ${contact.name} foi bloqueado com sucesso!`);
  blockModal.classList.remove("active");

  // Voltar para lista de contatos em mobile
  if (window.innerWidth <= 768) {
    backButton.click();
  }
});

// Fechar modais ao clicar fora
window.addEventListener("click", (e) => {
  if (e.target === reportModal) reportModal.classList.remove("active");
  if (e.target === blockModal) blockModal.classList.remove("active");
  if (e.target === approvalModal) approvalModal.classList.remove("active");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    chatSidebar.classList.remove("hidden");
    chatMain.classList.remove("active");
  } else {
    // Em mobile, manter o estado atual
    if (!currentContactId) {
      chatSidebar.classList.remove("hidden");
      chatMain.classList.remove("active");
    }
  }
});

function openChatWithMessage(contactId, message) {
  // Adicionar a mensagem automaticamente
  const newMessage = {
    id: Date.now(),
    sender: "sent",
    text: message,
    time: new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  if (!messagesData[contactId]) messagesData[contactId] = [];
  messagesData[contactId].push(newMessage);

  // Atualizar preview do contato
  const contact = contacts.find((c) => c.id === contactId);
  if (contact) {
    contact.lastMessage = message.substring(0, 30) + "...";
  }

  // Recarregar contatos e selecionar automaticamente
  loadContacts();
  selectContact(contactId);
}

// Carregar dados da URL (mensagem automática)
function loadFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("userName");
  const condominiumName = urlParams.get("condominiumName");
  const startDate = urlParams.get("startDate");
  const endDate = urlParams.get("endDate");
  const startTime = urlParams.get("startTime");
  const endTime = urlParams.get("endTime");

  if (userName && condominiumName && startDate && endDate) {
    const autoMessage = {
      id: Date.now(),
      sender: "sent",
      text: `Olá, meu nome é ${userName} E gostaria de alugar a sua vaga dos dias ${startDate} á ${endDate} as ${startTime} á ${endTime}.`,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      //isSystem: true,
    };

    // Encontrar ou criar contato para o condomínio
    let contactId = contacts.find((c) => c.name === condominiumName)?.id;

    if (!contactId) {
      // Se não encontrar, usar o primeiro contato como padrão
      contactId = 1;
      // Atualizar nome do primeiro contato
      contacts[0].name = condominiumName;
      contacts[0].type = "Condomínio";
    }

    // Adicionar mensagem ao contato
    if (!messagesData[contactId]) messagesData[contactId] = [];

    // Verificar se já não existe uma mensagem automática (evitar duplicatas)
    const hasAutoMessage = messagesData[contactId].some((msg) => msg.isSystem);
    if (!hasAutoMessage) {
      messagesData[contactId].push(autoMessage);
    }

    // Atualizar preview do contato
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      contact.lastMessage = "Mensagem automática enviada";
    }

    // Recarregar contatos e selecionar automaticamente
    loadContacts();
    selectContact(contactId);
  }
}
// Tema
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const theme = savedTheme || (systemPrefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const dropdownMenu = document.getElementById("dropdownMenu");

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

if (menuToggle) {
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });

  document.addEventListener("click", () => {
    dropdownMenu.classList.remove("active");
  });
}

// Inicializar
initTheme();
loadContacts();
loadFromURL();
