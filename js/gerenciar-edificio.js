// Mock data para condomínios
const mockCondominios = [
  {
    id: 1,
    nome: "Condomínio Residencial Vida Nova",
    endereco: "Av. Paulista, 1000",
    cep: "01311-100",
    cidade: "São Paulo",
    estado: "SP",
    telefone: "(11) 3000-0000",
    email: "contato@vidanova.com",
    cnpj: "12.345.678/0001-90",
    totalVagas: 100,
    vagasOcupadas: 55,
    precoVaga: 500,
    nomeSindico: "João Silva",
    emailSindico: "joao.silva@vidanova.com",
    telefoneSindico: "(11) 98765-4321",
    cpfSindico: "123.456.789-00",
  },
];

let condominioAtual = null;

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  carregarDadosCondominio();
});

function carregarDadosCondominio() {
  const condominioId = localStorage.getItem("condominioEditarId") || 1;
  condominioAtual = mockCondominios.find((c) => c.id == condominioId);

  if (condominioAtual) {
    document.getElementById("nomeCondominio").value = condominioAtual.nome;
    document.getElementById("enderecoCondominio").value =
      condominioAtual.endereco;
    document.getElementById("cepCondominio").value = condominioAtual.cep;
    document.getElementById("cidadeCondominio").value = condominioAtual.cidade;
    document.getElementById("estadoCondominio").value = condominioAtual.estado;
    document.getElementById("telefoneCondominio").value =
      condominioAtual.telefone;
    document.getElementById("emailCondominio").value = condominioAtual.email;
    document.getElementById("cnpjCondominio").value = condominioAtual.cnpj;

    document.getElementById("totalVagas").value = condominioAtual.totalVagas;
    document.getElementById("vagasOcupadas").value =
      condominioAtual.vagasOcupadas;
    document.getElementById("vagasDisponiveis").value =
      condominioAtual.totalVagas - condominioAtual.vagasOcupadas;
    document.getElementById("precoVaga").value = condominioAtual.precoVaga;

    document.getElementById("nomeSindico").value = condominioAtual.nomeSindico;
    document.getElementById("emailSindico").value =
      condominioAtual.emailSindico;
    document.getElementById("telefoneSindico").value =
      condominioAtual.telefoneSindico;
    document.getElementById("cpfSindico").value = condominioAtual.cpfSindico;
  }
}

function salvarCondominio() {
  if (!validarFormulario()) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  // Atualizar dados
  condominioAtual.nome = document.getElementById("nomeCondominio").value;
  condominioAtual.endereco =
    document.getElementById("enderecoCondominio").value;
  condominioAtual.cep = document.getElementById("cepCondominio").value;
  condominioAtual.cidade = document.getElementById("cidadeCondominio").value;
  condominioAtual.estado = document.getElementById("estadoCondominio").value;
  condominioAtual.telefone =
    document.getElementById("telefoneCondominio").value;
  condominioAtual.email = document.getElementById("emailCondominio").value;
  condominioAtual.cnpj = document.getElementById("cnpjCondominio").value;

  condominioAtual.totalVagas = Number.parseInt(
    document.getElementById("totalVagas").value
  );
  condominioAtual.precoVaga = Number.parseFloat(
    document.getElementById("precoVaga").value
  );

  condominioAtual.nomeSindico = document.getElementById("nomeSindico").value;
  condominioAtual.emailSindico = document.getElementById("emailSindico").value;
  condominioAtual.telefoneSindico =
    document.getElementById("telefoneSindico").value;
  condominioAtual.cpfSindico = document.getElementById("cpfSindico").value;

  // Salvar no localStorage para simular persistência
  localStorage.setItem("condominios", JSON.stringify(mockCondominios));

  alert("✅ Condomínio atualizado com sucesso!");
  window.location.href = "gerenciar-edifcio.html";
}

function validarFormulario() {
  const campos = [
    "nomeCondominio",
    "enderecoCondominio",
    "cepCondominio",
    "cidadeCondominio",
    "estadoCondominio",
    "telefoneCondominio",
    "emailCondominio",
    "cnpjCondominio",
    "totalVagas",
    "precoVaga",
    "nomeSindico",
    "emailSindico",
    "telefoneSindico",
    "cpfSindico",
  ];

  return campos.every((campo) => {
    const valor = document.getElementById(campo).value.trim();
    return valor !== "";
  });
}

function abrirModalConfirmacaoDeletar() {
  document.getElementById("modalConfirmacaoDeletar").classList.add("active");
}

function confirmarDelecao() {
  const index = mockCondominios.findIndex((c) => c.id === condominioAtual.id);
  if (index > -1) {
    mockCondominios.splice(index, 1);
    localStorage.setItem("condominios", JSON.stringify(mockCondominios));
    alert("✅ Condomínio deletado com sucesso!");
    window.location.href = "gerenciar-edifcio.html";
  }
}

// Fechar modal
function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

// Tema
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
