/* =========================================================
   Studio Pilates — comportamento da página
   ========================================================= */

(function () {
  "use strict";

  /* =======================================================
     1. CONFIGURAÇÃO — edite apenas este bloco
     ======================================================= */
  var CONFIG = {
    // Número do WhatsApp em formato internacional, somente dígitos:
    // 55 (Brasil) + 77 (DDD) + número.
    // ATENÇÃO: hoje está o telefone fixo divulgado no perfil.
    // Troque pelo número do WhatsApp comercial do Studio.
    whatsapp: "557734252109",

    // Mensagem que já vem escrita quando a pessoa abre a conversa.
    mensagemPadrao: "Olá! Vim pelo site do Studio Pilates e gostaria de agendar uma avaliação.",

    // Horário de funcionamento, usado no selo "Aberto agora / Fechado".
    // Índice = dia da semana (0 = domingo). null = fechado o dia todo.
    // Se mudar aqui, atualize também o texto do horário no index.html.
    horarios: [
      null,                 // domingo
      ["07:00", "19:00"],   // segunda
      ["07:00", "19:00"],   // terça
      ["07:00", "19:00"],   // quarta
      ["07:00", "19:00"],   // quinta
      ["07:00", "18:00"],   // sexta
      ["08:00", "12:00"]    // sábado
    ]
  };

  /* =======================================================
     2. Links de WhatsApp
     Todo elemento com [data-whatsapp] vira um link wa.me.
     Use [data-mensagem] para personalizar a mensagem.
     ======================================================= */
  function montarLinksWhatsapp() {
    var alvos = document.querySelectorAll("[data-whatsapp]");
    Array.prototype.forEach.call(alvos, function (alvo) {
      var mensagem = alvo.getAttribute("data-mensagem") || CONFIG.mensagemPadrao;
      alvo.setAttribute(
        "href",
        "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(mensagem)
      );
      alvo.setAttribute("target", "_blank");
      alvo.setAttribute("rel", "noopener");
    });
  }

  /* =======================================================
     3. Menu mobile
     ======================================================= */
  function ativarMenu() {
    var cabecalho = document.getElementById("cabecalho");
    var botao = document.getElementById("hamburguer");
    var navegacao = document.getElementById("navegacao");
    if (!cabecalho || !botao || !navegacao) return;

    function definir(aberto) {
      cabecalho.setAttribute("data-menu", aberto ? "aberto" : "fechado");
      botao.setAttribute("aria-expanded", String(aberto));
      botao.querySelector(".sr").textContent = aberto ? "Fechar menu" : "Abrir menu";
    }

    botao.addEventListener("click", function () {
      definir(cabecalho.getAttribute("data-menu") !== "aberto");
    });

    // Fecha ao clicar em um link do menu
    navegacao.addEventListener("click", function (evento) {
      if (evento.target.closest("a")) definir(false);
    });

    // Fecha com ESC
    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape") definir(false);
    });

    // Fecha ao voltar para o desktop
    var largo = window.matchMedia("(min-width: 901px)");
    var aoMudar = function (evento) { if (evento.matches) definir(false); };
    if (largo.addEventListener) largo.addEventListener("change", aoMudar);
    else if (largo.addListener) largo.addListener(aoMudar);
  }

  /* =======================================================
     4. Sombra do cabeçalho + botão flutuante
     ======================================================= */
  function ativarScroll() {
    var cabecalho = document.getElementById("cabecalho");
    var flutuante = document.querySelector(".zap-flutuante");
    var pendente = false;

    function atualizar() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (cabecalho) cabecalho.setAttribute("data-rolado", y > 8 ? "sim" : "nao");
      if (flutuante) flutuante.setAttribute("data-visivel", y > 600 ? "sim" : "nao");
      pendente = false;
    }

    window.addEventListener("scroll", function () {
      if (pendente) return;
      pendente = true;
      window.requestAnimationFrame(atualizar);
    }, { passive: true });

    atualizar();
  }

  /* =======================================================
     5. Depoimentos
     ======================================================= */
  function montarDepoimentos() {
    var grade = document.getElementById("grade-depoimentos");
    var lista = window.DEPOIMENTOS;
    if (!grade || !lista || !lista.length) return;

    var temModelo = false;

    lista.forEach(function (item) {
      var artigo = document.createElement("article");
      artigo.className = "depoimento" + (item.modelo ? " depoimento--modelo" : "");
      artigo.setAttribute("data-revelar", "");

      var partes = [];

      if (item.modelo) {
        temModelo = true;
        partes.push('<span class="marca-modelo">Modelo — substituir</span>');
      }

      partes.push('<p class="depoimento__aspas" aria-hidden="true">&ldquo;</p>');
      partes.push('<p class="depoimento__texto">' + escapar(item.texto) + "</p>");
      partes.push(
        '<div class="depoimento__autor">' +
          '<span class="depoimento__inicial" aria-hidden="true">' +
            escapar((item.nome || "?").trim().charAt(0).toUpperCase()) +
          "</span>" +
          "<span>" +
            '<span class="depoimento__nome">' + escapar(item.nome) + "</span>" +
            '<span class="depoimento__servico">' + escapar(item.servico) + "</span>" +
          "</span>" +
        "</div>"
      );

      artigo.innerHTML = partes.join("");
      grade.appendChild(artigo);
    });

    if (temModelo) {
      var aviso = document.createElement("p");
      aviso.className = "aviso-depoimentos";
      aviso.setAttribute("data-revelar", "");
      aviso.textContent =
        "Estes cartões ainda são modelos. Os depoimentos reais devem ser inseridos em assets/js/depoimentos.js, com autorização dos pacientes.";
      grade.parentNode.insertBefore(aviso, grade.nextSibling);
    }
  }

  function escapar(valor) {
    var div = document.createElement("div");
    div.textContent = valor == null ? "" : String(valor);
    return div.innerHTML;
  }

  /* =======================================================
     6. Revelar elementos ao rolar
     ======================================================= */
  function ativarRevelacao() {
    var alvos = document.querySelectorAll("[data-revelar]");
    var semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (semMovimento || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(alvos, function (alvo) {
        alvo.setAttribute("data-visivel", "sim");
      });
      return;
    }

    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.setAttribute("data-visivel", "sim");
        observador.unobserve(entrada.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    Array.prototype.forEach.call(alvos, function (alvo, indice) {
      alvo.style.transitionDelay = Math.min(indice % 4, 3) * 70 + "ms";
      observador.observe(alvo);
    });
  }

  /* =======================================================
     7. Status de funcionamento (aberto / fechado)
     Calculado no fuso de Vitória da Conquista (UTC-3, a Bahia
     não tem horário de verão), não no relógio do visitante.
     Feriados não são considerados.
     ======================================================= */
  var DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
  var AVISO_FECHANDO = 30; // minutos antes de fechar

  function paraMinutos(hora) {
    var partes = hora.split(":");
    return Number(partes[0]) * 60 + Number(partes[1]);
  }

  function formatarHora(hora) {
    var partes = hora.split(":");
    return partes[1] === "00" ? partes[0] + "h" : partes[0] + "h" + partes[1];
  }

  function calcularStatus() {
    var agora = new Date(Date.now() - 3 * 60 * 60 * 1000);
    var dia = agora.getUTCDay();
    var minutos = agora.getUTCHours() * 60 + agora.getUTCMinutes();
    var hoje = CONFIG.horarios[dia];

    if (hoje && minutos >= paraMinutos(hoje[0]) && minutos < paraMinutos(hoje[1])) {
      var restante = paraMinutos(hoje[1]) - minutos;
      return restante <= AVISO_FECHANDO
        ? { estado: "fechando", texto: "Fecha em breve · às " + formatarHora(hoje[1]) }
        : { estado: "aberto", texto: "Aberto agora · até " + formatarHora(hoje[1]) };
    }

    // Fechado: procura a próxima abertura (hoje mais tarde ou nos próximos dias)
    for (var i = 0; i < 7; i++) {
      var d = (dia + i) % 7;
      var turno = CONFIG.horarios[d];
      if (!turno || (i === 0 && minutos >= paraMinutos(turno[0]))) continue;
      var quando = i === 0 ? "hoje" : i === 1 ? "amanhã" : DIAS[d];
      return { estado: "fechado", texto: "Fechado · abre " + quando + " às " + formatarHora(turno[0]) };
    }
    return { estado: "fechado", texto: "Fechado" };
  }

  function ativarStatusHorario() {
    var selos = document.querySelectorAll("[data-status-horario]");
    if (!selos.length || !CONFIG.horarios) return;

    function atualizar() {
      var status = calcularStatus();
      Array.prototype.forEach.call(selos, function (selo) {
        selo.setAttribute("data-estado", status.estado);
        selo.textContent = status.texto;
        selo.hidden = false;
      });
    }

    atualizar();
    window.setInterval(atualizar, 60 * 1000);
  }

  /* =======================================================
     8. Ano no rodapé
     ======================================================= */
  function preencherAno() {
    var campo = document.getElementById("ano");
    if (campo) campo.textContent = String(new Date().getFullYear());
  }

  /* ======================================================= */
  function iniciar() {
    montarLinksWhatsapp();
    ativarMenu();
    ativarScroll();
    montarDepoimentos();
    ativarRevelacao();
    ativarStatusHorario();
    preencherAno();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
