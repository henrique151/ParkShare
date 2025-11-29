let campoAtual = null;
let horaSelecionada = null;
let minutoSelecionado = null;

function abrirSeletorHora(idCampo) {
  campoAtual = document.getElementById(idCampo);

  // RESET para evitar erros
  horaSelecionada = null;
  minutoSelecionado = null;

  const popup = document.getElementById("timePopup");
  popup.innerHTML = gerarTimePickerHTML();
  popup.classList.add("active");

  const rect = campoAtual.getBoundingClientRect();
  popup.style.top = rect.bottom + window.scrollY + "px";
  popup.style.left = rect.left + window.scrollX + "px";

  adicionarEventosOpcoes();
}

function gerarTimePickerHTML() {
  let horas = "";
  for (let h = 0; h < 24; h++) {
    let val = String(h).padStart(2, "0");
    horas += `<li class="time-option hora-op" data-value="${val}">${val}</li>`;
  }

  let minutos = "";
  for (let m = 0; m < 60; m += 5) {
    let val = String(m).padStart(2, "0");
    minutos += `<li class="time-option min-op" data-value="${val}">${val}</li>`;
  }

  return `
        <div class="time-box">
            <h3>Selecione o horário</h3>

            <div class="time-lists">
                <ul id="listaHoras">${horas}</ul>
                <ul id="listaMinutos">${minutos}</ul>
            </div>

            <button class="time-confirm-btn" onclick="confirmarHora()">Definir Horário</button>
        </div>
    `;
}

function adicionarEventosOpcoes() {
  // selecionar HORA
  document.querySelectorAll(".hora-op").forEach((el) => {
    el.onclick = () => {
      document
        .querySelectorAll(".hora-op")
        .forEach((o) => o.classList.remove("selected"));
      el.classList.add("selected");
      horaSelecionada = el.dataset.value;
    };
  });

  // selecionar MINUTO
  document.querySelectorAll(".min-op").forEach((el) => {
    el.onclick = () => {
      document
        .querySelectorAll(".min-op")
        .forEach((o) => o.classList.remove("selected"));
      el.classList.add("selected");
      minutoSelecionado = el.dataset.value;
    };
  });
}

function confirmarHora() {
  if (!horaSelecionada || !minutoSelecionado) {
    alert("Selecione a hora e os minutos!");
    return;
  }

  campoAtual.value = `${horaSelecionada}:${minutoSelecionado}`;
  fecharSeletor();
}

function fecharSeletor() {
  document.getElementById("timePopup").classList.remove("active");
}

/* fechar ao clicar fora */
document.addEventListener("click", function (e) {
  const popup = document.getElementById("timePopup");

  if (!popup.contains(e.target) && e.target !== campoAtual) {
    fecharSeletor();
  }
});
