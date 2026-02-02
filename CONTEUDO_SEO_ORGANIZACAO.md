# Conteúdo SEO – Organização e Estratégia

Este documento descreve a organização das páginas de conteúdo (guias) no Hub de Métodos de Estudo, a estratégia de interlinking e as recomendações de SEO técnico e semântico.

---

## 1. Onde as páginas entram na arquitetura

- **Localização:** Todas as páginas de guia ficam em `/pages/`, junto às ferramentas.
- **URLs amigáveis:**
  - `pages/o-que-e-mapa-mental.html` — O que é Mapa Mental?
  - `pages/pomodoro-online-gratis.html` — Pomodoro Online Grátis
  - `pages/como-estudar-com-flashcards.html` — Como estudar com Flashcards

Não foi criada pasta separada (`/conteudos/`, `/aprenda/`, `/guia/`) para evitar mudanças em links externos e manter a estrutura atual. As URLs são semânticas e adequadas para SEO.

---

## 2. Conexão com menu, footer e home

| Onde | O que foi feito |
|------|------------------|
| **Home (`index.html`)** | Seção **“Guias e conteúdos”** após o grid de métodos, com links para os 3 guias. |
| **Ferramentas** | Em **Pomodoro**, **Flashcards** e **Mapa Mental**: link “Saiba mais: [guia correspondente]” no bloco `seo-outros-links`, além dos links para outras ferramentas. |
| **Menu / top-bar** | Sem alteração: breadcrumb e seletor de idioma; não há menu global que liste os guias. |
| **Footer** | Não existe footer global; o interlinking é feito pela home e pelas próprias ferramentas. |

---

## 3. Estratégia de interlinking interno

### Conteúdo → Ferramenta
- Cada página de guia tem um **CTA principal** que leva à ferramenta correspondente:
  - **O que é Mapa Mental** → “Criar mapa mental agora” → `mapa-mental.html`
  - **Pomodoro online grátis** → “Usar Pomodoro online grátis” → `pomodoro.html`
  - **Como estudar com Flashcards** → “Criar flashcards” → `flashcards.html`

### Ferramenta → Conteúdos relacionados
- **Pomodoro** (`pomodoro.html`): link para “Pomodoro online grátis (guia)” → `pomodoro-online-gratis.html`
- **Flashcards** (`flashcards.html`): link para “Como estudar com Flashcards (guia)” → `como-estudar-com-flashcards.html`
- **Mapa Mental** (`mapa-mental.html`): link para “O que é Mapa Mental (guia)” → `o-que-e-mapa-mental.html`

### Conteúdo → Conteúdo
- Em cada guia, o bloco “Também no Hub” linka os outros dois guias e a home, para distribuir autoridade e facilitar descoberta.

---

## 4. SEO técnico e semântico por página

### 4.1 O que é Mapa Mental?
- **Title:** O que é Mapa Mental? Como Usar para Estudar | Hub de Estudo (~55 caracteres)
- **Meta description:** Mapa mental é um diagrama para organizar ideias em torno de um conceito central. Aprenda o que é, benefícios e como usar para estudar. Crie o seu online, grátis.
- **URL:** `pages/o-que-e-mapa-mental.html`
- **Palavras-chave primárias:** mapa mental, o que é mapa mental, mapa mental para estudar
- **Secundárias:** como fazer mapa mental, benefícios mapa mental, mapa mental online grátis

### 4.2 Pomodoro Online Grátis
- **Title:** Pomodoro Online Grátis | Timer para Foco e Estudo (~45 caracteres)
- **Meta description:** Use o Pomodoro online grátis: blocos de 25 min de foco, pausas curtas e longas. Aumente produtividade nos estudos sem cadastro. Timer no navegador.
- **URL:** `pages/pomodoro-online-gratis.html`
- **Palavras-chave primárias:** pomodoro online grátis, timer pomodoro
- **Secundárias:** técnica pomodoro, pomodoro para estudar, pomodoro sem cadastro

### 4.3 Como estudar com Flashcards
- **Title:** Como Estudar com Flashcards | Guia Prático (~42 caracteres)
- **Meta description:** Aprenda como estudar com flashcards: criar cartões, revisar com active recall e repetição espaçada. Guia prático para memorização. Crie seus cards online grátis.
- **URL:** `pages/como-estudar-com-flashcards.html`
- **Palavras-chave primárias:** como estudar com flashcards, flashcards para estudar
- **Secundárias:** criar flashcards, active recall, repetição espaçada, flashcards online grátis

---

## 5. Estrutura de conteúdo das páginas

Todas as guias seguem o mesmo padrão:

- **H1** único e focado no tema
- **H2** para blocos principais (para que serve, como usar, benefícios)
- **H3** para passos ou subtópicos
- Linguagem simples, escaneável (listas, parágrafos curtos)
- Bloco de destaque (“Em resumo”)
- **CTA** em caixa destacada (`guia-cta-box`) + link “Também no Hub” para outros guias e home
- Schema Article + BreadcrumbList em JSON-LD

---

## 6. Sitemap

As três URLs de guia estão incluídas em `sitemap.xml` com:

- `lastmod`: 2025-02-01
- `changefreq`: monthly
- `priority`: 0.8

---

## 7. Restrições respeitadas

- Nenhuma funcionalidade das ferramentas (mapa mental, pomodoro, flashcards) foi alterada.
- Nenhum estado da aplicação foi modificado.
- Apenas adição de páginas de conteúdo, seção na home, links nas ferramentas, CSS para guias e atualização do sitemap.
- SEO global existente (meta robots, canonical, OG, etc.) mantido; nenhuma alteração em páginas que não fossem as novas guias e os pontos de integração descritos acima.
