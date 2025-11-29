// Dados mockados
const condominoData = {
  nome: "Carlos Silva",
  cpf: "123.456.789-00",
  rg: "12.345.678-9",
  telefone: "(11) 99999-8888",
  email: "carlos.silva@email.com",
  dataNascimento: "15/03/1990",
};

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupEventListeners();
  carregarDadosCondomino();
  carregarInformacoesVaga();
});

// Theme
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  setupThemeToggle();
}

function setupThemeToggle() {
  document
    .getElementById("themeToggle")
    ?.addEventListener("click", toggleTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

// Event listeners
function setupEventListeners() {
  const menuToggle = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const btnEditarUsuario = document.getElementById("btnEditarUsuario");
  const btnEditarVaga = document.getElementById("btnEditarVaga");
  const btnExcluirVaga = document.getElementById("btnExcluirVaga");
  const btnExcluirConta = document.getElementById("btnExcluirConta");
  const btnAlterarDados = document.getElementById("btnAlterarDados");

  menuToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!menuToggle?.contains(e.target)) {
      dropdownMenu?.classList.remove("active");
    }
  });

  btnEditarUsuario?.addEventListener("click", abrirModalEditarUsuario);
  btnEditarVaga?.addEventListener("click", abrirModalEditarVaga);
  btnExcluirVaga?.addEventListener("click", abrirModalExcluirVaga);
  btnExcluirConta?.addEventListener("click", abrirModalExcluirConta);
  btnAlterarDados?.addEventListener("click", abrirModalAlteracao);
}

function carregarDadosCondomino() {
  // Preencher dados na tela
  document.getElementById("nomeCondomino").textContent = condominoData.nome;
  document.getElementById("cpfCondomino").textContent = condominoData.cpf;
  document.getElementById("rgCondomino").textContent = condominoData.rg;
  document.getElementById("telefoneCondomino").textContent =
    condominoData.telefone;
  document.getElementById("emailCondomino").textContent = condominoData.email;
  document.getElementById("dataNascCondomino").textContent =
    condominoData.dataNascimento;
}

function carregarInformacoesVaga() {
  const vagaContainer = document.getElementById("vagaContainer");
  const btnExcluirVaga = document.getElementById("btnExcluirVaga");
  const btnEditarVaga = document.getElementById("btnEditarVaga");

  // Carregar vaga do localStorage
  const vagaSalva = localStorage.getItem("registrovagas");
  let vagaData = null;

  if (vagaSalva) {
    try {
      const vagas = JSON.parse(vagaSalva);
      vagaData = vagas[0]; // Pegar primeira vaga
    } catch (e) {
      console.error("[v0] Erro ao carregar vaga:", e);
    }
  }

  if (vagaData) {
    vagaContainer.innerHTML = `
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">Número da Vaga</span>
                    <span class="info-value">${vagaData.vaga}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Local</span>
                    <span class="info-value">${vagaData.localvaga}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Ponto de Referência</span>
                    <span class="info-value">${vagaData.pontoReferencia}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Horário</span>
                    <span class="info-value">${vagaData.horainicio} - ${vagaData.horafim}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Período</span>
                    <span class="info-value">${vagaData.datainicio} até ${vagaData.datafim}</span>
                </div>
            </div>
        `;
    btnExcluirVaga.style.display = "flex";
    btnEditarVaga.style.display = "flex";
  } else {
    vagaContainer.innerHTML = `
            <div class="no-vaga">
                <div class="no-vaga-icon">🅿️</div>
                <h3>Nenhuma Vaga Cadastrada</h3>
                <p>Você ainda não possui uma vaga cadastrada para alugar. Cadastre agora e comece a ganhar renda extra!</p>
                <button class="btn-cadastrar-vaga" onclick="window.location.href='registrar-vaga.html'">
                    ➕ Cadastrar Vaga
                </button>
            </div>
        `;
    btnExcluirVaga.style.display = "none";
    btnEditarVaga.style.display = "none";
  }
}

function abrirModalAlteracao() {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.textContent = "Solicitar Alteração de Dados";
  modalBody.innerHTML = `
        <form id="formAlteracao">
            <div class="form-group">
                <label for="tipoAlteracao">Qual dado deseja alterar?</label>
                <select id="tipoAlteracao" required>
                    <option value="">Selecione...</option>
                    <option value="pessoais">Informações Pessoais</option>
                    <option value="condominio">Informações do Condomínio</option>
                    <option value="vaga">Informações da Vaga</option>
                </select>
            </div>
            <div class="form-group">
                <label for="mensagemAlteracao">Descreva a alteração que deseja fazer:</label>
                <textarea id="mensagemAlteracao" placeholder="Ex: Gostaria de alterar meu telefone de contato para (11) 98888-7777" required></textarea>
            </div>
            <div class="alert-warning">
                <strong>⚠️ Atenção:</strong> Sua solicitação será enviada para o síndico para análise e aprovação.
            </div>
            <div class="modal-actions">
                <button type="button" class="btn-cancelar" onclick="fecharModal()">Cancelar</button>
                <button type="submit" class="btn-confirmar">Enviar Solicitação</button>
            </div>
        </form>
    `;

  modal.classList.add("active");

  document.getElementById("formAlteracao").addEventListener("submit", (e) => {
    e.preventDefault();
    const tipo = document.getElementById("tipoAlteracao").value;
    const mensagem = document.getElementById("mensagemAlteracao").value;

    console.log("[v0] Solicitação de alteração:", { tipo, mensagem });
    alert(
      "✅ Solicitação enviada com sucesso! O síndico analisará seu pedido."
    );
    fecharModal();
  });
}

function abrirModalExcluirVaga() {
  const vagaSalva = localStorage.getItem("registrovagas");
  if (!vagaSalva) {
    alert("❌ Nenhuma vaga encontrada.");
    return;
  }

  const vagas = JSON.parse(vagaSalva);

  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.textContent = "Excluir Vaga";
  modalBody.innerHTML = `
        <form id="formExcluirVaga">
            <div class="alert-danger">
                <strong>⚠️ ATENÇÃO!</strong>
                <p style="margin: 0.5rem 0 0 0;">Ao excluir sua vaga, ela será removida permanentemente e não estará mais disponível para aluguel.</p>
            </div>
            <div class="form-group">
                <label for="confirmacaoExclusaoVaga">Digite "EXCLUIR" para confirmar:</label>
                <input type="text" id="confirmacaoExclusaoVaga" placeholder="EXCLUIR" required>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn-cancelar" onclick="fecharModal()">Cancelar</button>
                <button type="submit" class="btn-confirmar" style="background: #ef4444;">Excluir Vaga</button>
            </div>
        </form>
    `;

  modal.classList.add("active");

  document.getElementById("formExcluirVaga").addEventListener("submit", (e) => {
    e.preventDefault();
    const confirmacao = document.getElementById(
      "confirmacaoExclusaoVaga"
    ).value;

    if (confirmacao !== "EXCLUIR") {
      alert('❌ Digite "EXCLUIR" para confirmar a exclusão da vaga.');
      return;
    }

    const submitBtn = e.target.querySelector('button[type="submit"]');

    alert(
      "ℹ️ COMO FUNCIONA A EXCLUSÃO:\n\n" +
        "1. Confirme digitando 'EXCLUIR'\n" +
        "2. A vaga será removida permanentemente do sistema\n" +
        "3. Aguarde 2 segundos enquanto processamos a exclusão\n" +
        "4. Após a exclusão, você poderá cadastrar uma nova vaga"
    );

    submitBtn.disabled = true;
    submitBtn.textContent = "Excluindo...";

    setTimeout(() => {
      localStorage.removeItem("registrovagas");
      console.log("[v0] Vaga excluída com sucesso do sistema");
      fecharModal();
      alert(
        "✅ Vaga excluída com sucesso! Agora você pode cadastrar uma nova vaga."
      );
      carregarInformacoesVaga();
    }, 2000);
  });
}

function abrirModalExcluirConta() {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.textContent = "Excluir Conta";
  modalBody.innerHTML = `
        <form id="formExcluirConta">
            <div class="alert-danger">
                <strong>⚠️ ATENÇÃO: ESTA AÇÃO É IRREVERSÍVEL!</strong>
                <p style="margin: 0.5rem 0 0 0;">Ao excluir sua conta, todos os seus dados serão permanentemente removidos do sistema.</p>
            </div>
            <div class="form-group">
                <label for="motivoExclusaoConta">Por que deseja excluir sua conta?</label>
                <textarea id="motivoExclusaoConta" placeholder="Este feedback nos ajuda a melhorar o serviço..." required></textarea>
            </div>
            <div class="form-group">
                <label for="confirmacaoExclusao">Digite "EXCLUIR" para confirmar:</label>
                <input type="text" id="confirmacaoExclusao" placeholder="EXCLUIR" required>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn-cancelar" onclick="fecharModal()">Cancelar</button>
                <button type="submit" class="btn-confirmar" style="background: #ef4444;">Excluir Conta</button>
            </div>
        </form>
    `;

  modal.classList.add("active");

  document
    .getElementById("formExcluirConta")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const confirmacao = document.getElementById("confirmacaoExclusao").value;

      if (confirmacao !== "EXCLUIR") {
        alert('❌ Digite "EXCLUIR" para confirmar a exclusão da conta.');
        return;
      }

      const motivo = document.getElementById("motivoExclusaoConta").value;
      console.log("[v0] Exclusão de conta solicitada:", motivo);

      if (
        confirm(
          "Tem certeza absoluta que deseja excluir sua conta? Esta ação não pode ser desfeita."
        )
      ) {
        alert("✅ Conta excluída com sucesso. Você será redirecionado.");
        window.location.href = "index.html";
      }
    });
}

function abrirModalEditarUsuario() {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.textContent = "Editar Informações do Usuário";
  modalBody.innerHTML = `
        <form id="formEditarUsuario">
            <div class="form-group">
                <label for="editNome">Nome Completo</label>
                <input type="text" id="editNome" value="${condominoData.nome}" required>
            </div>
            <div class="form-group">
                <label for="editCpf">CPF</label>
                <input type="text" id="editCpf" value="${condominoData.cpf}" required>
            </div>
            <div class="form-group">
                <label for="editRg">RG</label>
                <input type="text" id="editRg" value="${condominoData.rg}" required>
            </div>
            <div class="form-group">
                <label for="editTelefone">Telefone</label>
                <input type="text" id="editTelefone" value="${condominoData.telefone}" required>
            </div>
            <div class="form-group">
                <label for="editEmail">E-mail</label>
                <input type="email" id="editEmail" value="${condominoData.email}" required>
            </div>
            <div class="form-group">
                <label for="editDataNasc">Data de Nascimento</label>
                <input type="text" id="editDataNasc" value="${condominoData.dataNascimento}" required>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn-cancelar" onclick="fecharModal()">Cancelar</button>
                <button type="submit" class="btn-confirmar">Salvar Alterações</button>
            </div>
        </form>
    `;

  modal.classList.add("active");

  document
    .getElementById("formEditarUsuario")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      condominoData.nome = document.getElementById("editNome").value;
      condominoData.cpf = document.getElementById("editCpf").value;
      condominoData.rg = document.getElementById("editRg").value;
      condominoData.telefone = document.getElementById("editTelefone").value;
      condominoData.email = document.getElementById("editEmail").value;
      condominoData.dataNascimento =
        document.getElementById("editDataNasc").value;

      carregarDadosCondomino();

      alert("✅ Informações atualizadas com sucesso!");
      fecharModal();
    });
}

function abrirModalEditarVaga() {
  const vagaSalva = localStorage.getItem("registrovagas");
  if (!vagaSalva) {
    alert("❌ Nenhuma vaga encontrada.");
    return;
  }

  const vagas = JSON.parse(vagaSalva);
  const vagaData = vagas[0];

  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.textContent = "Editar Vaga";
  modalBody.innerHTML = `
        <form id="formEditarVaga">
            <div class="form-group">
                <label for="editLocalVaga">Local da Vaga</label>
                <input type="text" id="editLocalVaga" value="${vagaData.localvaga}" required>
            </div>
            <div class="form-group">
                <label for="editPontoReferencia">Ponto de Referência</label>
                <input type="text" id="editPontoReferencia" value="${vagaData.pontoReferencia}" required>
            </div>
            <div class="form-group">
                <label for="editNumeroVaga">Número da Vaga</label>
                <input type="text" id="editNumeroVaga" value="${vagaData.vaga}" required>
            </div>
            <div class="form-group">
                <label>Horário de Disponibilidade</label>
                <div style="display: flex; gap: 1rem;">
                    <input type="text" id="editHoraInicio" value="${vagaData.horainicio}" placeholder="00:00" required style="flex: 1;">
                    <span style="align-self: center;">—</span>
                    <input type="text" id="editHoraFim" value="${vagaData.horafim}" placeholder="00:00" required style="flex: 1;">
                </div>
            </div>
            <div class="form-group">
                <label>Período de Disponibilidade</label>
                <div style="display: flex; gap: 1rem;">
                    <input type="text" id="editDataInicio" value="${vagaData.datainicio}" required style="flex: 1;">
                    <span style="align-self: center;">—</span>
                    <input type="text" id="editDataFim" value="${vagaData.datafim}" required style="flex: 1;">
                </div>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn-cancelar" onclick="fecharModal()">Cancelar</button>
                <button type="submit" class="btn-confirmar">Salvar Alterações</button>
            </div>
        </form>
    `;

  modal.classList.add("active");

  document.getElementById("formEditarVaga").addEventListener("submit", (e) => {
    e.preventDefault();

    vagaData.localvaga = document.getElementById("editLocalVaga").value;
    vagaData.pontoReferencia = document.getElementById(
      "editPontoReferencia"
    ).value;
    vagaData.vaga = document.getElementById("editNumeroVaga").value;
    vagaData.horainicio = document.getElementById("editHoraInicio").value;
    vagaData.horafim = document.getElementById("editHoraFim").value;
    vagaData.datainicio = document.getElementById("editDataInicio").value;
    vagaData.datafim = document.getElementById("editDataFim").value;

    localStorage.setItem("registrovagas", JSON.stringify(vagas));

    carregarInformacoesVaga();

    alert("✅ Vaga atualizada com sucesso!");
    fecharModal();
  });
}

// Fechar modal
function fecharModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("active");
}
