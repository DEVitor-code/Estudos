# Studio Pilates Equilíbrio e Saúde — site institucional

Site de uma página para a clínica **Studio Pilates Equilíbrio e Saúde**
(fisioterapia, pilates, RPG e estética) na Av. Otávio Santos, 715 — Recreio,
Vitória da Conquista/BA.

HTML, CSS e JavaScript puros. Sem build, sem framework, sem dependência.
Basta abrir o `index.html` ou jogar a pasta em qualquer hospedagem estática
(GitHub Pages, Netlify, Vercel, Hostinger).

```
index.html                 página inteira
assets/css/styles.css      design system + layout (mobile first)
assets/js/main.js          comportamento — configuração no topo do arquivo
assets/img/favicon.svg     ícone
```

---

## De onde veio cada informação

Nada aqui foi inventado. Tudo foi conferido em fonte pública antes de entrar
no site:

| Informação | Fonte |
|---|---|
| Endereço, telefone, nota 4,7 e 66 avaliações | Perfil da clínica no Google Maps |
| WhatsApp `55 77 3425-2109` | [linktr.ee/spilatesconquista](https://linktr.ee/spilatesconquista) — botão "Fale conosco" |
| Horário (seg–qui 7–19h, sex 7–18h, sáb 8–12h) | Linktree da própria clínica |
| Lista de serviços | Posts "Nossos Serviços" no Instagram |
| Lista de convênios | Post "Aceitamos planos de saúde" no Instagram |
| "19 anos de experiência" | Bio do Instagram |
| Depoimentos | Transcritos das avaliações públicas do Google |
| Coordenadas / plus code | Google Maps (`-14.8546689, -40.8342204` · `45W8+48`) |

### Sobre os depoimentos

Os sete depoimentos são **avaliações reais**, copiadas do perfil público da
clínica no Google, com o nome de quem escreveu e quando. Só corrigi acentuação
e pontuação — nenhuma palavra foi trocada.

> Se preferir não expor nomes de pacientes, é só trocar o nome pelas iniciais
> em `index.html` (seção `#avaliacoes`). Vale lembrar que as avaliações já são
> públicas no Google com nome completo.

---

## Ajustes que você provavelmente vai querer fazer

### 1. Trocar o WhatsApp

Só existe um lugar. `assets/js/main.js`, primeiras linhas:

```js
var CONFIG = {
  whatsapp: '557734252109',   // 55 + DDD + número, só dígitos
  ...
};
```

Todos os botões da página se atualizam de uma vez.

O número atual é o mesmo que aparece no Linktree da clínica. Se o atendimento
acontecer por um celular diferente, troque aqui.

> Os links também têm um `href` de emergência direto no HTML, para funcionarem
> mesmo se o JavaScript não carregar. Se trocar o número, rode um
> localizar-e-substituir de `557734252109` no `index.html` também.

### 2. Mudar as mensagens prontas do WhatsApp

Logo abaixo, em `msgPorContexto`. Cada botão manda uma mensagem diferente
conforme de onde a pessoa clicou (menu, convênios, CTA final...), e cada
serviço manda o nome do serviço junto. Isso ajuda a recepção a saber na hora
do que se trata.

### 3. Horário de funcionamento

Em dois lugares, e os dois precisam bater:

- `assets/js/main.js` → `CONFIG.horario` (alimenta o selo "Aberto agora")
- `index.html` → tabela da seção `#local`

### 4. Fotos

O site foi desenhado para ficar bom **sem foto nenhuma** — é tipografia,
cor e espaço. Não usei banco de imagem justamente para não dar aquela cara
de template genérico.

Quando tiver fotos boas da clínica (recepção, sala de pilates, equipe
atendendo), elas valem muito: mande que eu encaixo.

### 5. Domínio

O `<link rel="canonical">` e as tags Open Graph apontam para
`https://studiopilatesconquista.com.br/`. Troque pelo domínio real antes
de publicar.

---

## O que confirmar com a clínica

- [ ] **Horário** — o Google diz seg–sex 7h–19h; o Linktree diz sexta até 18h. Usei o Linktree.
- [ ] **Convênios** — dois logos do post do Instagram estavam ilegíveis e ficaram de fora. A lista tem 11.
- [ ] **"19 anos"** — veio da bio do Instagram. Vira 20 em algum momento de 2026.
- [ ] **Estacionamento e ponto de ônibus** — escrevi na seção de localização, confirmar.
- [ ] **Serviços** — conferir se todos os 20 continuam ativos.

---

## Detalhes de implementação

- **Selo "Aberto agora"** calcula o horário no fuso `America/Bahia` e se
  atualiza a cada minuto. Fora do expediente mostra quando abre de novo.
  A linha de hoje na tabela de horários é destacada sozinha.
- **CTA contextual** — cada botão de WhatsApp manda uma mensagem diferente.
- **Barra fixa** aparece depois da primeira tela e some sozinha quando o CTA
  final está visível, para não ficar botão repetido.
- **Mapa carrega sob demanda** (500px antes de entrar na tela). A página não
  paga o custo do Google Maps em quem nunca rola até lá.
- **Acessibilidade** — todo texto passa em contraste WCAG AA, alvos de toque
  com 44px, navegação por teclado no menu e nos acordeões, `prefers-reduced-motion`
  e `prefers-contrast` respeitados, hierarquia de títulos sem saltos.
- **SEO** — dados estruturados `MedicalClinic` com endereço, horário,
  especialidades e `aggregateRating` (4,7 / 66), Open Graph e meta description.
- **Sem JavaScript** a página continua legível e os botões de WhatsApp
  continuam funcionando.

Testado no Chromium em 390px, 834px e 1440px: sem erro de console, sem
rolagem horizontal, sem declaração CSS inválida.

---

## Publicar no GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → escolher a branch →
pasta `/ (root)`.
