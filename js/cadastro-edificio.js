
//Moisés
const mockEdificios = [
  {
    id: 1,
    nome: "Condomínio Residencial Vida Nova" ,
    cep: "01311-100",
    endereco: "Av. Paulista, 1000" ,
    cidade:"São Paulo", 
    estado: "SP",
    telefone: "(11) 3000-0000",
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


let cadastroAtual = null;
function carregarCadastros() {
  const cadastroId = localStorage.getItem("condominioEditarId") || 1;
  cadastroAtual = mockEdificios.find((c) => c.id == cadastroId);
}
function validarFormulario() {
  const campos = [
    "nomeEdificio",
    "cepEdificio",
    "enderecoEdificio",
    "cidadeEdificio",
    "estadoEdificio",
    "telefoneEdificio",
    "cnpjEdificio",
    "totalVagas",
    "vagasDisponiveis",
    "vagasOcupadas",
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
function salvarCadastro() {
  if (!validarFormulario()) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  // Atualizar dados
  // Atualizar dados do edifício
  cadastroAtual.nome = document.getElementById("nomeEdificio").value;
  cadastroAtual.cep = document.getElementById("cepEdificio").value;
  cadastroAtual.endereco = document.getElementById("enderecoEdificio").value;
  cadastroAtual.cidade = document.getElementById("cidadeEdificio").value;
  cadastroAtual.estado = document.getElementById("estadoEdificio").value;
  cadastroAtual.telefone = document.getElementById("telefoneEdificio").value;
  cadastroAtual.cnpj = document.getElementById("cnpjEdificio").value;

  //Vagas
  cadastroAtual.totalVagas = Number.parseInt(document.getElementById("totalVagas").value);
  cadastroAtual.totalVagas = Number.parseInt(document.getElementById("vagasDisponiveis").value);
  cadastroAtual.totalVagas = Number.parseInt(document.getElementById("vagasOcupadas").value);
  cadastroAtual.precoVaga = Number.parseFloat(document.getElementById("precoVaga").value);
  //sindico
  cadastroAtual.nomeSindico = document.getElementById("nomeSindico").value;
  cadastroAtual.emailSindico = document.getElementById("emailSindico").value;
  cadastroAtual.telefoneSindico = document.getElementById("telefoneSindico").value;
  cadastroAtual.cpfSindico = document.getElementById("cpfSindico").value;
  

  // Salvar no localStorage para simular persistência
  localStorage.setItem("cadastrousuarios", JSON.stringify(mockEdificios));

  alert("✅ Cadastro atualizado com sucesso!");
  window.location.href = "index.html";
}


document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  carregarCadastros();
  setupEventListeners()
});


function setupEventListeners() {
  const menuToggle = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");
  menuToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("active");
  });
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






