function CriarCalendario(inputId) {
    const input = document.getElementById(inputId);

    // Buscar ou criar o host
    let popup = document.getElementById("calendarPopup");
    if (!popup) {
        popup = document.createElement("div");
        popup.id = "calendarPopup";
        document.body.appendChild(popup);
    }

    // Criar Shadow DOM apenas uma vez
    if (!popup.shadowRoot) {
        popup.attachShadow({ mode: "open" });
    }

    const shadow = popup.shadowRoot;
    shadow.innerHTML = "";

    // ===========================
    // PRECARREGAR O CSS (IMPORTANTE)
    // ===========================

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./css/cadastro-calendario.css";

    shadow.appendChild(link);

    // Aguarda o CSS ser carregado antes de montar o calendário
    link.onload = () => {
        MontarCalendario(shadow, input);
    };
}


function MontarCalendario(shadow, input) {

    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
        <div class="calendar-popup active">
            <div class="calendar-box">
                <div class="cal-header">
                    <button class="prevMonth">◀</button>

                    <select class="monthSelect">
                        <option value="0">Janeiro</option>
                        <option value="1">Fevereiro</option>
                        <option value="2">Março</option>
                        <option value="3">Abril</option>
                        <option value="4">Maio</option>
                        <option value="5">Junho</option>
                        <option value="6">Julho</option>
                        <option value="7">Agosto</option>
                        <option value="8">Setembro</option>
                        <option value="9">Outubro</option>
                        <option value="10">Novembro</option>
                        <option value="11">Dezembro</option>
                    </select>

                    <div class="year-wrapper">
                        <input type="number" class="yearInput" min="1900" max="2099">
                        <div class="year-arrows">
                            <button type="button" class="yearUp">▲</button>
                            <button type="button" class="yearDown">▼</button>
                        </div>
                    </div>

                    <button class="nextMonth">▶</button>
                </div>

                <div class="cal-grid"></div>

                <button class="confirmDate confirm-btn">Confirmar</button>
            </div>
        </div>
    `;

    shadow.appendChild(wrapper);

    const popupRoot = shadow.querySelector(".calendar-popup");

    // Elementos
    const grid = shadow.querySelector(".cal-grid");
    const monthSelect = shadow.querySelector(".monthSelect");
    const yearInput = shadow.querySelector(".yearInput");

    const prevBtn = shadow.querySelector(".prevMonth");
    const nextBtn = shadow.querySelector(".nextMonth");
    const upBtn = shadow.querySelector(".yearUp");
    const downBtn = shadow.querySelector(".yearDown");
    const confirmBtn = shadow.querySelector(".confirmDate");

    // ==============================
    // LÓGICA DO CALENDÁRIO
    // ==============================

    let hoje = new Date();
    let ano = hoje.getFullYear();
    let mes = hoje.getMonth();
    let diaSelecionado = null;

    monthSelect.value = mes;
    yearInput.value = ano;

    function render() {
        grid.innerHTML = "";
        let primeiroDia = new Date(ano, mes, 1).getDay();
        let qtdDias = new Date(ano, mes + 1, 0).getDate();

        for (let i = 0; i < primeiroDia; i++) {
            grid.innerHTML += `<div class="vazio"></div>`;
        }

        for (let d = 1; d <= qtdDias; d++) {
            let div = document.createElement("div");
            div.textContent = d;

            div.addEventListener("click", () => {
                shadow.querySelectorAll(".cal-grid div").forEach(x => x.classList.remove("selected"));
                div.classList.add("selected");
                diaSelecionado = d;
            });

            grid.appendChild(div);
        }
    }

    render();

    // ==============================
    // NAVEGAÇÃO
    // ==============================

    prevBtn.addEventListener("click", () => {
        mes--;
        if (mes < 0) {
            mes = 11;
            ano--;
        }
        monthSelect.value = mes;
        yearInput.value = ano;
        render();
    });

    nextBtn.addEventListener("click", () => {
        mes++;
        if (mes > 11) {
            mes = 0;
            ano++;
        }
        monthSelect.value = mes;
        yearInput.value = ano;
        render();
    });

    monthSelect.addEventListener("change", () => {
        mes = parseInt(monthSelect.value);
        render();
    });

    yearInput.addEventListener("change", () => {
        ano = parseInt(yearInput.value);
        render();
    });

    upBtn.addEventListener("click", () => {
        ano++;
        yearInput.value = ano;
        render();
    });

    downBtn.addEventListener("click", () => {
        ano--;
        yearInput.value = ano;
        render();
    });

    // ==============================
    // CONFIRMAR
    // ==============================

    confirmBtn.addEventListener("click", () => {
        if (!diaSelecionado) return;

        let mes2 = (mes + 1).toString().padStart(2, "0");
        let dia2 = diaSelecionado.toString().padStart(2, "0");

        input.value = `${ano}-${mes2}-${dia2}`;
        popupRoot.remove();
    });

    // Fechar ao clicar fora
    popupRoot.addEventListener("click", e => {
        if (e.target === popupRoot) popupRoot.remove();
    });
}
