// Dados do usuário externo (simulado - viriam do backend)
const usuarioData = {
  nome: "Otávio Silva",
  cpf: "123.456.789-00",
  rg: "12.345.678-9",
  dataNascimento: "15/03/1990",
  email: "otavio.silva@email.com",
  telefone: "(11) 99999-8888",
  veiculo: {
    modelo: "Porsche 911",
    marca: "Porsche",
    placa: "ABC-1234",
    cor: "Preto",
    ano: "2022",
  },
  vaga: {
    codigo: "VAGA-001",
    condominio: "Edifício Solar das Flores",
    endereco: "Rua das Flores, 123 - São Miguel - SP",
    condominoNome: "Carlos Silva",
    sindicoNome: "José Silva",
    localizacao: "10, Pátio 3",
    horario: "08:00 - 18:00",
    diasReservados: "22/10/2025 à 31/12/2025",
    imagemEdificio:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
};

let vagaCancelada = false;

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  loadUserInfo();
  loadVeiculoInfo();
  loadVagaInfo();
  createActionButtons();
  setupThemeToggle();
});

// Carregar informações do usuário
function loadUserInfo() {
  const infoGrid = document.getElementById("infoGrid");
  infoGrid.innerHTML = `
        <div class="info-item">
            <span class="info-label">Nome</span>
            <span class="info-value">${usuarioData.nome}</span>
        </div>
        <div class="info-item">
            <span class="info-label">RG</span>
            <span class="info-value">${usuarioData.rg}</span>
        </div>
        <div class="info-item">
            <span class="info-label">CPF</span>
            <span class="info-value">${usuarioData.cpf}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Data de Nascimento</span>
            <span class="info-value">${usuarioData.dataNascimento}</span>
        </div>
        <div class="info-item">
            <span class="info-label">E-mail</span>
            <span class="info-value">${usuarioData.email}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Telefone</span>
            <span class="info-value">${usuarioData.telefone}</span>
        </div>
    `;
}

// Carregar informações do veículo
function loadVeiculoInfo() {
  const veiculoGrid = document.getElementById("veiculoGrid");
  veiculoGrid.innerHTML = `
        <div class="info-item">
            <span class="info-label">Modelo do Veículo</span>
            <span class="info-value">${usuarioData.veiculo.modelo}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Marca</span>
            <span class="info-value">${usuarioData.veiculo.marca}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Placa</span>
            <span class="info-value">${usuarioData.veiculo.placa}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Cor</span>
            <span class="info-value">${usuarioData.veiculo.cor}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Ano</span>
            <span class="info-value">${usuarioData.veiculo.ano}</span>
        </div>
    `;
}

// Carregar informações da vaga
function loadVagaInfo() {
  const vagaGrid = document.getElementById("vagaGrid");
  vagaGrid.innerHTML = `
        <div class="info-item">
            <span class="info-label">Código da Vaga</span>
            <span class="info-value">${usuarioData.vaga.codigo}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Condomínio</span>
            <span class="info-value">${usuarioData.vaga.condominio}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Localização</span>
            <span class="info-value">${usuarioData.vaga.localizacao}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Horário</span>
            <span class="info-value">${usuarioData.vaga.horario}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Dias Reservados</span>
            <span class="info-value">${usuarioData.vaga.diasReservados}</span>
        </div>
    `;
}

// Criar botões de ação
function createActionButtons() {
  const actionsSection = document.getElementById("actionsSection");
  actionsSection.innerHTML = `
        <button class="action-btn primary" onclick="editarUsuario()">
            <span>✏️</span> Editar Usuário
        </button>
        <button class="action-btn primary" onclick="editarVeiculo()">
            <span>🚗</span> Editar Veículo
        </button>
        <button class="action-btn danger" onclick="excluirConta()">
            <span>🗑️</span> Excluir Conta
        </button>
        <button class="action-btn success" onclick="consultarVaga()" ${
          vagaCancelada
            ? 'disabled style="opacity: 0.5; cursor: not-allowed;"'
            : ""
        }>
            <span>🅿️</span> Consultar Vaga
        </button>
        <button class="action-btn secondary" onclick="consultarQRCode()" ${
          vagaCancelada
            ? 'disabled style="opacity: 0.5; cursor: not-allowed;"'
            : ""
        }>
            <span>📱</span> Consultar QR-CODE
        </button>
    `;
}

// Editar usuário
function editarUsuario() {
  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
        <form id="editUserForm">
            <div class="form-group">
                <label class="form-label">Nome</label>
                <input type="text" class="form-input" value="${usuarioData.nome}" id="editNome">
            </div>
            <div class="form-group">
                <label class="form-label">RG</label>
                <input type="text" class="form-input" value="${usuarioData.rg}" id="editRG">
            </div>
            <div class="form-group">
                <label class="form-label">CPF</label>
                <input type="text" class="form-input" value="${usuarioData.cpf}" id="editCPF">
            </div>
            <div class="form-group">
                <label class="form-label">Data de Nascimento</label>
                <input type="text" class="form-input" value="${usuarioData.dataNascimento}" id="editDataNascimento">
            </div>
            <div class="form-group">
                <label class="form-label">E-mail</label>
                <input type="email" class="form-input" value="${usuarioData.email}" id="editEmail">
            </div>
            <div class="form-group">
                <label class="form-label">Telefone</label>
                <input type="tel" class="form-input" value="${usuarioData.telefone}" id="editTelefone">
            </div>
            <div class="modal-actions">
                <button type="button" class="modal-btn confirm" onclick="confirmarEdicaoUsuario()">
                    ✅ Confirmar
                </button>
                <button type="button" class="modal-btn cancel" onclick="closeModal()">
                    ❌ Cancelar
                </button>
            </div>
        </form>
    `;
  document.getElementById("modalTitle").textContent =
    "Editar Informações do Usuário";
  openModal();
}

// Confirmar edição do usuário
function confirmarEdicaoUsuario() {
  usuarioData.nome = document.getElementById("editNome").value;
  usuarioData.rg = document.getElementById("editRG").value;
  usuarioData.cpf = document.getElementById("editCPF").value;
  usuarioData.dataNascimento =
    document.getElementById("editDataNascimento").value;
  usuarioData.email = document.getElementById("editEmail").value;
  usuarioData.telefone = document.getElementById("editTelefone").value;

  loadUserInfo();
  closeModal();
  alert("✅ Informações do usuário atualizadas com sucesso!");
}

// Editar veículo
function editarVeiculo() {
  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
        <form id="editVeiculoForm">
            <div class="form-group">
                <label class="form-label">Modelo do Veículo</label>
                <input type="text" class="form-input" value="${usuarioData.veiculo.modelo}" id="editModelo">
            </div>
            <div class="form-group">
                <label class="form-label">Marca</label>
                <input type="text" class="form-input" value="${usuarioData.veiculo.marca}" id="editMarca">
            </div>
            <div class="form-group">
                <label class="form-label">Placa</label>
                <input type="text" class="form-input" value="${usuarioData.veiculo.placa}" id="editPlaca">
            </div>
            <div class="form-group">
                <label class="form-label">Cor</label>
                <input type="text" class="form-input" value="${usuarioData.veiculo.cor}" id="editCor">
            </div>
            <div class="form-group">
                <label class="form-label">Ano</label>
                <input type="text" class="form-input" value="${usuarioData.veiculo.ano}" id="editAno">
            </div>
            <div class="modal-actions">
                <button type="button" class="modal-btn confirm" onclick="confirmarEdicaoVeiculo()">
                    ✅ Confirmar
                </button>
                <button type="button" class="modal-btn cancel" onclick="closeModal()">
                    ❌ Cancelar
                </button>
            </div>
        </form>
    `;
  document.getElementById("modalTitle").textContent =
    "Editar Informações do Veículo";
  openModal();
}

// Confirmar edição do veículo
function confirmarEdicaoVeiculo() {
  usuarioData.veiculo.modelo = document.getElementById("editModelo").value;
  usuarioData.veiculo.marca = document.getElementById("editMarca").value;
  usuarioData.veiculo.placa = document.getElementById("editPlaca").value;
  usuarioData.veiculo.cor = document.getElementById("editCor").value;
  usuarioData.veiculo.ano = document.getElementById("editAno").value;

  loadVeiculoInfo();
  closeModal();
  alert("✅ Informações do veículo atualizadas com sucesso!");
}

// Excluir conta
function excluirConta() {
  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
        <div style="text-align: center; padding: 2rem 0;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">⚠️</div>
            <h3 style="margin-bottom: 1rem; color: var(--danger-color);">Excluir Conta Permanentemente</h3>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                Tem certeza que deseja excluir sua conta? Esta ação é irreversível e todos os seus dados serão perdidos permanentemente.
            </p>
            <div class="modal-actions">
                <button class="modal-btn confirm" style="background-color: var(--danger-color);" onclick="confirmarExclusao()">
                    🗑️ Sim, Excluir Conta
                </button>
                <button class="modal-btn cancel" onclick="closeModal()">
                    ❌ Cancelar
                </button>
            </div>
        </div>
    `;
  document.getElementById("modalTitle").textContent = "Confirmação de Exclusão";
  openModal();
}

// Confirmar exclusão
function confirmarExclusao() {
  closeModal();
  alert(
    "🗑️ Conta excluída com sucesso. Você será redirecionado para a página inicial."
  );
  // Aqui você faria o redirect para a página inicial
  window.location.href = "index.html";
}

// Consultar vaga
function consultarVaga() {
  if (vagaCancelada) {
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
            <div class="vaga-canceled-alert">
                ❌ Vaga Cancelada
                <p style="font-size: 0.9rem; margin-top: 0.5rem; font-weight: normal;">
                    Você não possui nenhuma vaga ativa no momento.
                </p>
            </div>
            <div class="modal-actions">
                <button class="modal-btn cancel" onclick="closeModal()">Fechar</button>
            </div>
        `;
    document.getElementById("modalTitle").textContent = "Consultar Vaga";
    openModal();
    return;
  }

  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
        <div class="vaga-details-wrapper">
            <!-- Seção de Imagem -->
            <div class="vaga-image-section">
                <img src="${usuarioData.vaga.imagemEdificio}" 
                     alt="Imagem do ${usuarioData.vaga.condominio}" 
                     class="vaga-image"
                     onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'vaga-image-placeholder\\'>🏢</div>'">
            </div>
            
            <!-- Seção de Informações -->
            <div class="vaga-info-section">
                <div class="vaga-info-item">
                    <span class="vaga-info-label">Nome do Edifício</span>
                    <span class="vaga-info-value">${usuarioData.vaga.condominio}</span>
                </div>
                <div class="vaga-info-item">
                    <span class="vaga-info-label">Local do Edifício</span>
                    <span class="vaga-info-value">${usuarioData.vaga.endereco}</span>
                </div>
                <div class="vaga-info-item">
                    <span class="vaga-info-label">Nome do Condômino</span>
                    <span class="vaga-info-value">${usuarioData.vaga.condominoNome}</span>
                </div>
                <div class="vaga-info-item">
                    <span class="vaga-info-label">Nome do Síndico</span>
                    <span class="vaga-info-value">${usuarioData.vaga.sindicoNome}</span>
                </div>
                <div class="vaga-info-item">
                    <span class="vaga-info-label">Hora da Vaga</span>
                    <span class="vaga-info-value">${usuarioData.vaga.horario}</span>
                </div>
                <div class="vaga-info-item">
                    <span class="vaga-info-label">Dias da Vaga</span>
                    <span class="vaga-info-value">${usuarioData.vaga.diasReservados}</span>
                </div>
                <div class="vaga-info-item">
                    <span class="vaga-info-label">Local da Vaga</span>
                    <span class="vaga-info-value">${usuarioData.vaga.localizacao}</span>
                </div>
            </div>
        </div>
        
        <!-- Botões de Ação -->
        <div class="vaga-actions">
            <button class="vaga-btn cancel" onclick="confirmarCancelarVaga()">
                ❌ Cancelar Vaga
            </button>
            <button class="vaga-btn request" onclick="pedirAlteracao()">
                💬 Pedir Alteração
            </button>
        </div>
    `;
  document.getElementById("modalTitle").textContent = "Consultar Vaga";

  const modalContent = document.querySelector(".modal-content");
  modalContent.classList.add("vaga-modal");

  openModal();
}

function confirmarCancelarVaga() {
  if (
    confirm(
      "⚠️ Tem certeza que deseja cancelar esta vaga? Esta ação não pode ser desfeita."
    )
  ) {
    vagaCancelada = true;
    closeModal();

    // Ocultar seção de vaga alugada
    const vagaSection = document.querySelector(".info-section:has(#vagaGrid)");
    if (vagaSection) {
      vagaSection.style.display = "none";
    }

    // Recarregar botões (desabilitar Consultar Vaga e QR Code)
    createActionButtons();

    alert("✅ Vaga cancelada com sucesso!");
  }
}

function pedirAlteracao() {
  // Construir URL com parâmetros para o chat
  const params = new URLSearchParams({
    condominoNome: usuarioData.vaga.condominoNome,
    condominio: usuarioData.vaga.condominio,
    vaga: usuarioData.vaga.localizacao,
    horario: usuarioData.vaga.horario,
    periodo: usuarioData.vaga.diasReservados,
  });

  if (
    confirm(
      "💬 Você será redirecionado para o chat com o condômino. Deseja continuar?"
    )
  ) {
    window.location.href = `chat.html?${params.toString()}`;
  }
}

function consultarQRCode() {
  if (vagaCancelada) {
    alert("❌ Você não possui uma vaga ativa. O QR Code está bloqueado.");
    return;
  }

  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
        <div class="qr-code-container">
            <div class="qr-code">
                 <img src="./public/codigo.png" 
                     alt="Imagem do QR-Code" >
            </div>
            <h4 style="color: var(--text-primary);">QR Code de Acesso</h4>
            <p class="qr-info">
                Apresente este QR Code na portaria do condomínio para liberar o acesso à sua vaga.
            </p>
            <p class="qr-info" style="font-weight: 600;">
                Código: ${usuarioData.vaga.codigo}
            </p>
            <div class="modal-actions" style="width: 100%; margin-top: 1rem;">
                <button class="modal-btn confirm" onclick="baixarQRCode()">
                    📥 Baixar QR Code
                </button>
                <button class="modal-btn cancel" onclick="closeModal()">
                    Fechar
                </button>
            </div>
        </div>
    `;
  document.getElementById("modalTitle").textContent = "QR Code de Acesso";
  openModal();
}

// Baixar QR Code (simulado)
function baixarQRCode() {
  alert("📥 QR Code baixado com sucesso!");
}

// Abrir modal
function openModal() {
  document.getElementById("modal").classList.add("active");
}

// Fechar modal
function closeModal() {
  const modal = document.getElementById("modal");
  const modalContent = modal.querySelector(".modal-content");
  modalContent.classList.remove("vaga-modal");
  modal.classList.remove("active");
}

// Setup tema
function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  const savedTheme = localStorage.getItem("theme") || "dark";
  html.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });

  menuToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (menuToggle && !menuToggle.contains(e.target)) {
      dropdownMenu?.classList.remove("active");
    }
  });
}

// Atualizar ícone do tema
function updateThemeIcon(theme) {
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.querySelector(".theme-icon").textContent =
    theme === "dark" ? "🌙" : "☀️";
}

// Fechar modal ao clicar fora
window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    closeModal();
  }
});
