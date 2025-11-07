// ========================================
// TEMA (DARK/LIGHT MODE)
// ========================================

/**
 * Inicializa tema baseado em preferência salva ou sistema
 */
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else if (systemPrefersDark) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

/**
 * Alterna entre tema claro e escuro
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

// ========================================
// CARREGAMENTO DE DETALHES
// ========================================

/**
 * Carrega dados do condomínio/vaga do JSON baseado no ID da URL
 */
async function loadPropertyDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = parseInt(urlParams.get("id"));

  try {
    const response = await fetch("cardInfo.json");
    const data = await response.json();

    // Busca a vaga em todas as regiões
    let property = null;
    for (const region in data) {
      property = data[region].find((p) => p.id === propertyId);
      if (property) break;
    }

    if (property) {
      const elements = {
        propertyImage: document.getElementById("propertyImage"),
        propertyAddress: document.getElementById("propertyAddress"),
        propertyLocation: document.getElementById("propertyLocation"),
        propertyVagas: document.getElementById("propertyVagas"),
        propertyVagasTotal: document.getElementById("propertyVagasTotal"),
        propertyHorario: document.getElementById("propertyHorario"),
        propertyCep: document.getElementById("propertyCep"),
        propertyDescription: document.getElementById("propertyDescription"),
        taxaInfo: document.getElementById("taxaInfo"),
        taxaHora: document.getElementById("taxaHora"),
        vagasInfo: document.getElementById("vagasInfo"),
      };

      // Verifica se todos os elementos existem antes de atualizar
      if (elements.propertyImage) elements.propertyImage.src = property.image;
      if (elements.propertyAddress)
        elements.propertyAddress.textContent = property.address;
      if (elements.propertyLocation)
        elements.propertyLocation.innerHTML = `📍 ${property.city} - ${property.cep}`;
      if (elements.propertyVagas)
        elements.propertyVagas.textContent = property.vagas_disponiveis;
      if (elements.propertyVagasTotal)
        elements.propertyVagasTotal.textContent = property.vagas_totais;
      if (elements.propertyHorario)
        elements.propertyHorario.textContent = property.horario_funcionamento;
      if (elements.propertyCep) elements.propertyCep.textContent = property.cep;
      if (elements.propertyDescription)
        elements.propertyDescription.textContent = property.descricao;
      if (elements.vagasInfo)
        elements.vagasInfo.textContent = `${property.vagas_disponiveis} de ${property.vagas_totais} vagas`;

      document.title = property.address + " - Park-Share";
    } else {
      const wrapper = document.querySelector(".details-wrapper");
      if (wrapper) wrapper.innerHTML = "<h1>Vaga não encontrada</h1>";
    }
  } catch (error) {
    console.error("[v0] Erro ao carregar detalhes:", error);
    const wrapper = document.querySelector(".details-wrapper");
    if (wrapper) wrapper.innerHTML = "<h1>Erro ao carregar detalhes</h1>";
  }
}

// ========================================
// EVENT LISTENERS
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  // Menu dropdown
  const menuToggle = document.getElementById("menuToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");

  if (menuToggle) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("active");
    });
  }

  document.addEventListener("click", (e) => {
    if (menuToggle && !menuToggle.contains(e.target)) {
      dropdownMenu?.classList.remove("active");
    }
  });

  // Tema
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  const mapBtn = document.getElementById("mapBtn");

  if (mapBtn) {
    mapBtn.addEventListener("click", () => {
      window.location.href = "mapa.html";
    });
  }
});

// ========================================
// INICIALIZAÇÃO
// ========================================

initTheme();
document.addEventListener("DOMContentLoaded", loadPropertyDetails);
