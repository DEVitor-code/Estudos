/* ═══════════════════════════════════════════════════════════
   Studio Pilates Equilíbrio e Saúde — comportamento da página
   Sem dependências. Tudo degrada bem se o JS não carregar.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─────────── CONFIGURAÇÃO ───────────
     Único lugar que precisa mexer para trocar o WhatsApp.
     Formato: 55 + DDD + número, só dígitos.                    */
  var CONFIG = {
    whatsapp: '557734252109',

    msgPadrao: 'Olá! Vim pelo site do Studio Pilates e gostaria de marcar uma avaliação.',

    /* mensagem por origem do clique — ajuda a recepção a saber de onde veio */
    msgPorContexto: {
      menu:     'Olá! Vim pelo site do Studio Pilates e gostaria de marcar uma avaliação.',
      hero:     'Olá! Vim pelo site do Studio Pilates e gostaria de marcar uma avaliação.',
      convenio: 'Olá! Vim pelo site do Studio Pilates. Queria saber se vocês atendem pelo meu convênio.',
      local:    'Olá! Vim pelo site do Studio Pilates e gostaria de falar com a recepção.',
      final:    'Olá! Vim pelo site do Studio Pilates. Queria contar o que estou sentindo e marcar uma avaliação.',
      dock:     'Olá! Vim pelo site do Studio Pilates e gostaria de marcar uma avaliação.',
      rodape:   'Olá! Vim pelo site do Studio Pilates e gostaria de mais informações.'
    },

    /* horário real da clínica — 0 = domingo */
    horario: {
      0: null,
      1: [7, 19], 2: [7, 19], 3: [7, 19], 4: [7, 19],
      5: [7, 18],
      6: [8, 12]
    },

    fuso: 'America/Bahia'
  };

  var $  = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };

  var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ═══════════ 1. Links de WhatsApp ═══════════ */
  function montaLink(texto) {
    return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(texto);
  }

  function ligaWhatsapp() {
    $$('[data-zap]').forEach(function (el) {
      var servico = el.getAttribute('data-zap-svc');
      var ctx     = el.getAttribute('data-zap-ctx');
      var texto;

      if (servico) {
        texto = 'Olá! Vim pelo site do Studio Pilates e queria saber mais sobre ' + servico + '.';
      } else {
        texto = CONFIG.msgPorContexto[ctx] || CONFIG.msgPadrao;
      }

      el.setAttribute('href', montaLink(texto));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
  }


  /* ═══════════ 2. Menu mobile ═══════════ */
  function ligaMenu() {
    var head   = $('#head');
    var burger = $('#burger');
    var nav    = $('#nav');
    if (!head || !burger || !nav) return;

    function fecha() {
      head.removeAttribute('data-menu');
      burger.setAttribute('aria-expanded', 'false');
      $('.sr', burger).textContent = 'Abrir menu';
      document.body.removeAttribute('data-lock');
    }

    function abre() {
      head.setAttribute('data-menu', 'aberto');
      burger.setAttribute('aria-expanded', 'true');
      $('.sr', burger).textContent = 'Fechar menu';
      document.body.setAttribute('data-lock', 'true');
    }

    burger.addEventListener('click', function () {
      head.getAttribute('data-menu') === 'aberto' ? fecha() : abre();
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) fecha();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') fecha();
    });

    /* fecha sozinho ao voltar para o desktop */
    window.matchMedia('(min-width: 64rem)').addEventListener('change', function (m) {
      if (m.matches) fecha();
    });
  }


  /* ═══════════ 3. Cabeçalho grudado ═══════════ */
  function ligaHeader() {
    var head = $('#head');
    if (!head) return;

    var alvo = document.createElement('div');
    alvo.setAttribute('aria-hidden', 'true');
    alvo.style.cssText = 'position:absolute;top:1px;height:1px;width:1px;';
    document.body.prepend(alvo);

    new IntersectionObserver(function (entries) {
      head.setAttribute('data-stuck', String(!entries[0].isIntersecting));
    }).observe(alvo);
  }


  /* ═══════════ 4. Aberto agora / fechado ═══════════ */
  function agoraNaClinica() {
    var partes = new Intl.DateTimeFormat('pt-BR', {
      timeZone: CONFIG.fuso,
      weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(new Date());

    var mapa = {};
    partes.forEach(function (p) { mapa[p.type] = p.value; });

    var dias = { 'dom': 0, 'seg': 1, 'ter': 2, 'qua': 3, 'qui': 4, 'sex': 5, 'sáb': 6, 'sab': 6 };
    var chave = String(mapa.weekday || '').toLowerCase().replace('.', '').slice(0, 3);

    return {
      dia: dias[chave],
      minutos: parseInt(mapa.hour, 10) * 60 + parseInt(mapa.minute, 10)
    };
  }

  function proximaAbertura(diaAtual) {
    var nomes = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    for (var i = 1; i <= 7; i++) {
      var d = (diaAtual + i) % 7;
      var h = CONFIG.horario[d];
      if (h) {
        return (i === 1 ? 'amanhã' : nomes[d]) + ' às ' + h[0] + 'h';
      }
    }
    return '';
  }

  function ligaStatus() {
    var caixa = $('#live');
    var texto = $('#live-txt');
    if (!caixa || !texto) return;

    function atualiza() {
      var t = agoraNaClinica();
      if (typeof t.dia !== 'number' || isNaN(t.minutos)) {
        caixa.setAttribute('data-state', 'fechado');
        texto.textContent = 'Seg a sex, 7h às 19h';
        return;
      }

      var faixa = CONFIG.horario[t.dia];
      var aberto = !!faixa && t.minutos >= faixa[0] * 60 && t.minutos < faixa[1] * 60;

      if (aberto) {
        caixa.setAttribute('data-state', 'aberto');
        texto.textContent = 'Aberto agora — até ' + faixa[1] + 'h';
      } else {
        caixa.setAttribute('data-state', 'fechado');
        if (faixa && t.minutos < faixa[0] * 60) {
          texto.textContent = 'Fechado — abre hoje às ' + faixa[0] + 'h';
        } else {
          texto.textContent = 'Fechado — abre ' + proximaAbertura(t.dia);
        }
      }

      /* destaca a linha de hoje na tabela de horários */
      $$('.horas tr').forEach(function (tr) {
        var ehHoje = Number(tr.getAttribute('data-dia')) === t.dia;
        ehHoje ? tr.setAttribute('data-hoje', 'true') : tr.removeAttribute('data-hoje');
      });
    }

    atualiza();
    setInterval(atualiza, 60000);
  }


  /* ═══════════ 5. Acordeão de serviços ═══════════ */
  function ligaServicos() {
    $$('.svc__item').forEach(function (item) {
      var btn = $('.svc__btn', item);
      if (!btn) return;

      btn.addEventListener('click', function () {
        var abrindo = btn.getAttribute('aria-expanded') !== 'true';

        /* dentro do mesmo grupo, um de cada vez */
        var grupo = item.closest('.svc__group');
        if (grupo && abrindo) {
          $$('.svc__item', grupo).forEach(function (outro) {
            if (outro !== item) {
              outro.removeAttribute('data-open');
              $('.svc__btn', outro).setAttribute('aria-expanded', 'false');
            }
          });
        }

        btn.setAttribute('aria-expanded', String(abrindo));
        abrindo ? item.setAttribute('data-open', 'true') : item.removeAttribute('data-open');
      });
    });
  }


  /* ═══════════ 6. Carrossel de avaliações ═══════════ */
  function ligaRail() {
    var rail = $('#rail');
    if (!rail) return;

    $$('[data-rail]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = $('.card', rail);
        var passo = card ? card.getBoundingClientRect().width + 18 : rail.clientWidth * 0.8;
        rail.scrollBy({
          left: passo * Number(btn.getAttribute('data-rail')),
          behavior: semMovimento ? 'auto' : 'smooth'
        });
      });
    });
  }


  /* ═══════════ 7. Mapa preguiçoso ═══════════ */
  function ligaMapa() {
    var box = $('#mapbox');
    if (!box) return;

    var carrega = function () {
      if (box.getAttribute('data-loaded')) return;
      var iframe = document.createElement('iframe');
      iframe.src = box.getAttribute('data-src');
      iframe.loading = 'lazy';
      iframe.title = 'Mapa: Av. Otávio Santos, 715 — Recreio, Vitória da Conquista - BA';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.setAttribute('allowfullscreen', '');
      box.appendChild(iframe);
      box.setAttribute('data-loaded', 'true');
    };

    if (!('IntersectionObserver' in window)) { carrega(); return; }

    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { carrega(); io.disconnect(); }
    }, { rootMargin: '500px' });

    io.observe(box);
  }


  /* ═══════════ 8. Barra fixa de WhatsApp ═══════════ */
  function ligaDock() {
    var dock = $('#dock');
    var cta  = $('#agendar');
    if (!dock) return;

    dock.hidden = false;

    var passouDoTopo = false;
    var noCtaFinal   = false;

    function sincroniza() {
      dock.setAttribute('data-show', String(passouDoTopo && !noCtaFinal));
    }

    /* aparece depois de rolar uma tela */
    var marca = document.createElement('div');
    marca.setAttribute('aria-hidden', 'true');
    marca.style.cssText = 'position:absolute;top:88vh;height:1px;width:1px;';
    document.body.prepend(marca);

    new IntersectionObserver(function (e) {
      passouDoTopo = !e[0].isIntersecting;
      sincroniza();
    }).observe(marca);

    /* some quando o CTA final já está na tela — evita botão duplicado */
    if (cta) {
      new IntersectionObserver(function (e) {
        noCtaFinal = e[0].isIntersecting;
        sincroniza();
      }, { threshold: 0.25 }).observe(cta);
    }
  }


  /* ═══════════ 9. Seção ativa no menu ═══════════ */
  function ligaScrollspy() {
    var links = $$('.nav__list a');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var secoes = links
      .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
      .filter(Boolean);

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          var ativo = a.getAttribute('href') === '#' + entry.target.id;
          ativo ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    secoes.forEach(function (s) { io.observe(s); });
  }


  /* ═══════════ 10. Revelação no scroll ═══════════ */
  function ligaReveal() {
    if (semMovimento || !('IntersectionObserver' in window)) return;

    var alvos = $$([
      '.hero__copy', '.ficha',
      '.sec__head', '.clinica__text', '.pilares li',
      '.svc__group', '.planos', '.convenios__cta',
      '.depo__nota', '.rail', '.rail__nav',
      '.local__map', '.bloco',
      '.cta__in'
    ].join(','));

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty('--d', (i * 70) + 'ms');
        entry.target.setAttribute('data-in', 'true');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    alvos.forEach(function (el) {
      el.classList.add('rv');
      io.observe(el);
    });

    /* rede de segurança: se por qualquer motivo o observer não disparar,
       nada fica invisível — depois de 3s tudo aparece. */
    setTimeout(function () {
      alvos.forEach(function (el) { el.setAttribute('data-in', 'true'); });
    }, 3000);
  }


  /* ═══════════ 11. Ano do rodapé ═══════════ */
  function ligaAno() {
    var el = $('#ano');
    if (el) el.textContent = new Date().getFullYear();
  }


  /* ═══════════ Início ═══════════ */
  ligaWhatsapp();
  ligaMenu();
  ligaHeader();
  ligaStatus();
  ligaServicos();
  ligaRail();
  ligaMapa();
  ligaDock();
  ligaScrollspy();
  ligaReveal();
  ligaAno();
})();
