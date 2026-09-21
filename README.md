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
5. **Depoimentos** — nota do Google + cartões de depoimento (ver abaixo).
6. Extras: convênios aceitos, horário de atendimento, SEO básico e dados
   estruturados `MedicalClinic` para o Google.

## Ajustes necessários antes de publicar

### 1. Número do WhatsApp (obrigatório)

`assets/js/main.js`, no topo do arquivo:

```js
var CONFIG = {
  whatsapp: "557734252109",  // <- trocar pelo WhatsApp comercial
  mensagemPadrao: "Olá! Vim pelo site do Studio Pilates..."
};
```

O valor atual é o **telefone fixo** divulgado no perfil do Instagram
(77 3425-2109). Se o atendimento acontece em outro número de celular, troque
aqui — todos os botões da página são atualizados de uma vez.

Formato: `55` + DDD + número, só dígitos.

### 2. Depoimentos reais

Os três cartões da seção de depoimentos são **modelos**, marcados com um selo
na própria página. Não foi possível localizar avaliações públicas com texto
aberto para transcrever.

Para publicar os verdadeiros, edite `assets/js/depoimentos.js`, cole o texto
real (print do Instagram, WhatsApp ou avaliação do Google), preencha o nome e
troque `modelo: true` por `modelo: false`. O selo e o aviso amarelo somem
sozinhos.

> Peça autorização do paciente antes de publicar nome e depoimento.

### 3. Conferir antes de ir ao ar

- **Horário** — "segunda a sexta, 07h às 18h" veio do cadastro CNES. Confirmar.
- **Nota 4,7 com 66 avaliações** — veio da ficha do Google. Confirmar no perfil
  do Google Meu Negócio e atualizar em `index.html` (hero e seção de
  depoimentos) se estiver diferente.
- **Convênios** — a lista saiu do post do Instagram; dois logos não estavam
  legíveis e ficaram como "e outros".
- **E-mail** `spilates@spilates.com.br` — veio da página do Facebook. Confirmar.

### 4. Logo e fotos

Ver `assets/img/LEIA-ME.txt`.

## Publicar no GitHub Pages

Settings → Pages → Source: `Deploy from a branch` → branch desta entrega →
pasta `/ (root)`.
