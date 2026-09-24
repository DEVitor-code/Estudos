# Studio Pilates — Equilíbrio e Saúde

Site institucional de página única do **Studio Pilates Equilíbrio e Saúde**,
clínica de fisioterapia, pilates, RPG e estética em Vitória da Conquista (BA).

HTML, CSS e JavaScript puros — sem build, sem dependências. É só abrir o
`index.html` no navegador ou publicar a pasta em qualquer hospedagem estática
(GitHub Pages, Netlify, Vercel, Hostinger...).

## Estrutura

```
.
├── index.html                  Página completa
└── assets/
    ├── css/styles.css          Estilos (mobile first)
    ├── js/main.js              Menu, WhatsApp, animações
    ├── js/depoimentos.js       Conteúdo dos depoimentos
    └── img/                    Favicon e espaço para o logo/fotos
```

## O que já está na página

1. **Nome e identidade** — Studio Pilates Equilíbrio e Saúde, desde 2007.
2. **Localização** — endereço completo + mapa do Google incorporado + botão "traçar rota".
3. **Serviços** — organizados em Fisioterapia & Reabilitação, Pilates & Terapias
   Manuais e Estética & Bem-estar.
4. **CTA de WhatsApp** — botão no menu, no topo, no meio, no final e um botão
   flutuante que aparece após a rolagem. Cada um abre a conversa com uma
   mensagem já escrita.
5. **Depoimentos** — nota do Google + avaliações reais do Google (ver abaixo).
6. Extras: convênios aceitos, horário de atendimento, SEO básico e dados
   estruturados `MedicalClinic` para o Google.

## Ajustes necessários antes de publicar

### 1. Número do WhatsApp — confirmado

`assets/js/main.js`, no topo do arquivo:

```js
var CONFIG = {
  whatsapp: "557734252109",
  mensagemPadrao: "Olá! Vim pelo site do Studio Pilates..."
};
```

É o mesmo número do botão de WhatsApp do Linktree oficial
(linktr.ee/spilatesconquista). Se mudar, troque aqui: todos os botões da página
são atualizados de uma vez. Formato: `55` + DDD + número, só dígitos.

### 2. Depoimentos

Os seis cartões da seção de depoimentos foram transcritos das avaliações
públicas do Studio no Google (todas 5 estrelas). Para trocar ou adicionar,
edite `assets/js/depoimentos.js`. As datas ("há um ano") são relativas a
setembro de 2026 — revise-as quando atualizar a lista.

> Apresente os depoimentos ao cliente antes de publicar: alguns citam nomes da
> equipe (Jéssica, Hadija, Lara, Delmira, Bárbara, Jefferson).

### 3. Conferir com o cliente antes de ir ao ar

- **Horário** — atualizado conforme o Linktree (abril/2026): seg a qui 07h–19h,
  sex 07h–18h, sáb 08h–12h. Está no hero, em "Onde estamos" e no JSON-LD.
  O selo "Aberto agora / Fechado" usa a lista `horarios` do `CONFIG` em
  `assets/js/main.js` — se o horário mudar, atualize os quatro lugares.
  O selo não considera feriados.
- **Nota 4,7 com 66 avaliações** — veio da ficha do Google. Confirmar e
  atualizar em `index.html` (hero e seção de depoimentos) se estiver diferente.
- **Convênios** — lista do post do Instagram. Dois logos não estavam legíveis
  (um parece ser "Pró-Social") e ficaram como "e outros".
- **Serviços** — "Massagem Modeladora" e "Cuidados pós-operatórios" não
  aparecem no post "Nossos Serviços". Confirmar se ainda são oferecidos.
- **Textos do "Sobre"** — turmas reduzidas, aparelhos (Reformer, Cadillac,
  Chair, Barrel) e eletroterapia/ultrassom precisam de confirmação.
- **Redes sociais** — o Linktree tem TikTok, que ainda não está no rodapé.
  Confirmar o endereço do perfil e se o Facebook ainda é usado.
- **E-mail** `spilates@spilates.com.br` — veio da página do Facebook. Confirmar.

### 4. Logo e fotos

Ver `assets/img/LEIA-ME.txt`.

## Publicar no GitHub Pages

Settings → Pages → Source: `Deploy from a branch` → branch desta entrega →
pasta `/ (root)`.

## Identidade visual

Alinhada ao Instagram da marca:

- **Tipografia** — Montserrat nos títulos (Light nos títulos grandes, Bold no
  destaque), como nos posts; Inter no texto corrido.
- **Cores** — azul do círculo do logo (`#16698F`) como cor principal e
  verde-água dos destaques do Instagram (`#5CBDB3`) como acento. Tokens em
  `:root` no `styles.css`.
- **Logo** — o símbolo do cabeçalho e o favicon ainda são provisórios. Trocar
  pelo logo oficial assim que o arquivo chegar.
