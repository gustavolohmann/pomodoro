  # SEO — Aplicativo Completo (Hub de Métodos de Estudo)

  Análise e recomendações de SEO para **todo o aplicativo**: home, páginas de produto, institucionais, editor de mapa mental, documentação e estratégia de tráfego orgânico.  
  **Restrição:** nenhuma alteração na lógica do sistema, estados, funcionalidades ou fluxos de navegação do usuário.

  ---

  ## Visão geral do app

  | Área | Páginas | Função |
  |------|---------|--------|
  | **Landing / Home** | `pages/index.html` | Hub com cards dos métodos |
  | **Produto / Ferramentas** | pomodoro, flashcards, active-recall, spaced-repetition, blurt, ivy-lee, metacognicao, mapa-mental | Ferramentas de estudo |
  | **Institucional** | sobre.html | Conteúdo sobre Pomodoro |
  | **Produto (progresso)** | dashboard.html | Estatísticas e progresso |

  **Estado atual:** Todas as páginas têm `<title>` único, meta description, canonical, OG e Twitter; breadcrumbs em páginas de método; h1 na home e nas páginas de método; mapa-mental não tem h1 visível; sitemap e robots.txt existem; WebSite JSON-LD só na home.

  ---

  # 1. SEO técnico (app inteiro)

  ## 1.1 Estrutura global de `<head>`

  ### Área: Todas as páginas

  **O que melhorar:** Padronizar ordem e presença de meta tags em todas as rotas: charset → viewport → title → description → robots (opcional) → canonical → OG → Twitter → styles → scripts. Garantir que nenhuma página pública deixe de ter description ou canonical.

  **Por que ajuda:** Consistência facilita auditoria e evita páginas “esquecidas” sem description; canonical evita duplicação.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  **Exemplo (ordem sugerida, sem alterar valores existentes):**
  ```html
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>...</title>
  <meta name="description" content="...">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="...">
  <!-- OG / Twitter -->
  ```

  ---

  ### Área: Página raiz (`index.html` na raiz)

  **O que melhorar:** A raiz já redireciona para `pages/index.html` com meta refresh e canonical. Garantir que o canonical aponte para a URL definitiva (ex.: `https://www.godtimestudy.com.br/pages/index.html`) e que o sitemap use a mesma URL para a home.

  **Por que ajuda:** Evita conteúdo duplicado entre raiz e `/pages/index.html`.

  **Risco:** Nenhum (já implementado)  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  ## 1.2 Titles únicos por rota

  **O que melhorar:** Já existem titles únicos. Opcionalmente enriquecer com termos de busca onde fizer sentido (ex.: “Pomodoro Timer Online Grátis — Hub de Estudo”), sem alterar o padrão “Método - Hub de Estudo”.

  **Por que ajuda:** Melhora CTR e sinalização de tema em resultados de busca.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum (apenas texto da aba).

  ---

  ## 1.3 Meta description estratégica por página

  **O que melhorar:** Todas as páginas já têm description. Revisar comprimento (~150–160 caracteres), incluir benefício e termos naturais (grátis, sem cadastro, estudo, etc.) onde ainda não estiver. Manter uma description por página, única.

  **Por que ajuda:** Snippet mais atraente e alinhado à intenção de busca.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  ## 1.4 Meta robots e index/noindex por rota

  **O que melhorar:** Adicionar `<meta name="robots" content="index, follow">` nas páginas públicas (home, métodos, sobre, dashboard). Não usar noindex em páginas que você queira ranquear.

  **Por que ajuda:** Deixa explícito que as páginas podem ser indexadas e rastreadas.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  ## 1.5 Canonical correto

  **O que melhorar:** Todas as páginas já têm canonical. Garantir que: (1) a URL canônica use o domínio final (www.godtimestudy.com.br); (2) não haja parâmetros desnecessários na canonical; (3) páginas com conteúdo duplicado (se no futuro houver) apontem para uma única URL canônica.

  **Por que ajuda:** Concentra sinais na URL definitiva e evita duplicação.

  **Risco:** Nenhum (já implementado)  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  ## 1.6 SPA / indexação em aplicação client-side

  **O que melhorar:** O app é multi-página (HTML estático por rota), não SPA única. Garantir que cada página tenha **conteúdo estático indexável no HTML** (títulos, descrições, breadcrumb, labels, eventual seção de texto). Não depender de dados carregados só por JS para o tema da página.

  **Por que ajuda:** Crawlers indexam o HTML; conteúdo estático garante relevância mesmo com JS desabilitado ou lento.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum (apenas garantir presença de texto no HTML).

  ---

  ## 1.7 Sitemap.xml e robots.txt

  **O que melhorar:**  
  - **sitemap.xml:** Já inclui todas as páginas. Opcional: adicionar `<lastmod>` com data da última alteração relevante (manual ou build).  
  - **robots.txt:** Já existe com `Allow: /` e `Sitemap:`. Garantir que a URL do Sitemap use HTTPS e o domínio correto (ex.: `https://www.godtimestudy.com.br/sitemap.xml`).

  **Por que ajuda:** Facilita descoberta e priorização de páginas pelos crawlers.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  **Exemplo (lastmod opcional no sitemap):**
  ```xml
  <url>
    <loc>https://www.godtimestudy.com.br/pages/index.html</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ```

  ---

  ## 1.8 Core Web Vitals (conceitual)

  **O que melhorar:** Manter preconnect para fonts; scripts no final do `<body>`; evitar CSS/JS bloqueantes no topo. Opcional: `loading="lazy"` em imagens abaixo da dobra; dimensões explícitas em imagens para evitar CLS. Não refatorar a engine do app.

  **Por que ajuda:** LCP, FID/INP e CLS melhoram com menos bloqueio e layout estável.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum (boas práticas já alinhadas).

  ---

  ## 1.9 URLs amigáveis e consistentes

  **O que melhorar:** Padrão atual (`/pages/nome-da-pagina.html`) já é legível. Manter consistência: minúsculas, hífens, sem parâmetros desnecessários. Se criar novas páginas (landing, ajuda, blog), usar o mesmo padrão (ex.: `mapa-mental-ajuda.html`, `blog/artigo.html`).

  **Por que ajuda:** URLs descritivas ajudam usuário e buscador a entender o conteúdo.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  # 2. Arquitetura de informação

  ## 2.1 Organização: marketing vs produto vs funcional

  **O que melhorar:** Deixar explícita a hierarquia no código e na navegação:

  - **Marketing / Home:** `pages/index.html` — entrada principal.
  - **Produto / Ferramentas:** pomodoro, flashcards, active-recall, spaced-repetition, blurt, ivy-lee, metacognicao, mapa-mental — cada um com breadcrumb “Hub › Método”.
  - **Produto (progresso):** dashboard — “Hub › Dashboard”.
  - **Institucional:** sobre — “Hub › Sobre” (ou link a partir do Pomodoro).

  Sugestão: em todas as páginas de método, manter breadcrumb consistente (Hub › [Método]) e link “Voltar ao Hub”. Não alterar fluxos; apenas documentar e garantir que a estrutura atual seja clara (já está).

  **Por que ajuda:** Hierarquia clara melhora UX e sinalização para buscadores (temas e profundidade).

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  ## 2.2 Breadcrumbs

  **O que melhorar:** Breadcrumbs já existem nas páginas de método (nav com aria-label="Breadcrumb"). Garantir: (1) uso de `<nav aria-label="Breadcrumb">` em todas as páginas que tenham breadcrumb; (2) link para a home em “Hub”; (3) página atual como texto (não link). Opcional: adicionar JSON-LD BreadcrumbList (ver seção 5).

  **Por que ajuda:** Navegação e contexto para usuário e crawlers; possível rich result em resultados de busca.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  ## 2.3 Hierarquia de navegação

  **O que melhorar:** Na home, os cards já levam a cada método. Opcional: na home, adicionar um bloco de links “Conheça também” ou “Todos os métodos” com links internos para cada ferramenta e para Sobre, reforçando a estrutura. Não mudar a ordem ou o comportamento dos cards existentes.

  **Por que ajuda:** Aumenta interlinking interno e distribuição de autoridade.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  # 3. SEO on-page (todas as páginas)

  ## 3.1 Headings semânticos por página

  **O que melhorar:**

  - **Home:** Já tem h1 (“Hub de Métodos de Estudo”) e h2 nas seções (Backup, Apoie o projeto). Manter um único h1.
  - **Páginas de método (pomodoro, flashcards, etc.):** Já têm h1 (nome do método) e, onde existir, h2 para seções. Manter.
  - **Mapa mental:** Não há h1 visível; o conteúdo principal é o editor. Adicionar um h1 para a ferramenta (ex.: “Editor de Mapa Mental”) na sidebar ou em elemento com classe que o oculte visualmente (ex.: `.visually-hidden`) para leitores de tela e crawlers.
  - **Dashboard:** Já tem h1 e h2 nas seções.
  - **Sobre:** Já tem h1, h2, h3 bem distribuídos.

  Garantir em todas: um único h1 por página; h2 para seções principais; h3 para subseções; ordem lógica (h1 → h2 → h3, sem pular níveis).

  **Por que ajuda:** Estrutura clara de tema e hierarquia para indexação e acessibilidade.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum (apenas adição de h1 no mapa mental).

  **Exemplo (mapa mental — h1 na sidebar, opcionalmente oculto visualmente):**
  ```html
  <aside class="mindmap-sidebar" aria-label="Ferramentas do mapa mental">
      ...
      <h1 class="mindmap-page-title visually-hidden">Editor de Mapa Mental Online</h1>
      ...
  </aside>
  ```
  CSS (apenas exemplo, não alterar arquivos existentes):
  ```css
  .visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  ```

  ---

  ## 3.2 Conteúdo textual estratégico

  **O que melhorar:** Em cada tipo de página, garantir ou ampliar texto que responda:

  - **O que é:** nome e uma linha do que a ferramenta faz (já existe em descrições e labels).
  - **Para quem é:** estudantes, concurseiros, etc. — pode ser uma frase na home ou em seções “Para quem é” em páginas de método.
  - **Problemas que resolve:** foco, memorização, organização, etc.

  Sugestão: na home, além dos cards, um parágrafo introdutório (ex.: “Hub gratuito de métodos de estudo para foco, memorização e planejamento. Use no navegador, sem cadastro.”). Em páginas de ferramenta, manter ou adicionar um parágrafo curto abaixo do h1 (como já existe em flashcards, etc.). Não remover nada; apenas adicionar ou ajustar texto.

  **Por que ajuda:** Relevância para buscas informacionais e comerciais; reforça o tema da página.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  ## 3.3 Copy e intenção de busca

  **O que melhorar:** Alinhar títulos e descrições às intenções:

  - **Navegacional:** “Hub de Métodos de Estudo”, “Pomodoro Timer - Hub de Estudo” — já atendem.
  - **Informacional:** “O que é Pomodoro”, “Como criar mapa mental” — reforçar em meta description e em seções de texto (Sobre, eventual landing).
  - **Comercial/transacional:** “timer pomodoro grátis”, “flashcards online sem cadastro” — já presentes; manter sem keyword stuffing.

  **Por que ajuda:** Melhor correspondência entre query e página e maior chance de CTR.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  # 4. Conteúdo para tráfego orgânico

  ## 4.1 Páginas e seções sugeridas

  **O que melhorar:** Criar ou ampliar páginas/seções apenas com **conteúdo novo** (não substituir o que existe):

  | Sugestão | Área do app | Objetivo |
  |----------|-------------|----------|
  | “O que é o Hub de Métodos de Estudo” | Home ou página “Sobre o Hub” | Intenção informacional; link para ferramentas |
  | “Como criar mapas mentais online” | Nova página ou seção em mapa-mental | Long-tail; link para o editor |
  | “Exemplos de mapas mentais” | Nova página | Long-tail; imagens + link para editor |
  | “Ferramenta gratuita de mapa mental” | Meta + texto na página do mapa mental | Reforçar oferta grátis |
  | “O que é Pomodoro” / “Técnica Pomodoro” | Já existe em sobre.html | Manter e linkar da home e do timer |
  | “Flashcards para estudo” / “Revisão espaçada” | Páginas de flashcards e spaced-repetition | Parágrafo introdutório ou seção curta |

  Todas as novas páginas devem linkar para as ferramentas existentes sem alterar fluxos atuais.

  **Por que ajuda:** Captura mais buscas de cauda longa e informacionais; aumenta superfície indexável.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum (conteúdo e páginas aditivos).

  ---

  ## 4.2 Conteúdo evergreen

  **O que melhorar:** Manter e ampliar conteúdo que não fica obsoleto rápido: “O que é Pomodoro”, “O que é mapa mental”, “Benefícios de revisão espaçada”, “Como usar o Blurt Method”. Atualizar apenas quando houver mudança real no produto ou na técnica. Evitar datas fixas no texto quando não forem necessárias.

  **Por que ajuda:** Páginas evergreen tendem a acumular autoridade ao longo do tempo.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  ## 4.3 Blog / documentação

  **O que melhorar:** Se no futuro houver blog ou docs (ex.: `/blog/` ou `/docs/`), usar estrutura de URLs amigáveis, um h1 por artigo, meta description por artigo, links internos para as ferramentas e para a home. Não é obrigatório para o estado atual do app; é sugestão de evolução.

  **Por que ajuda:** Aumenta conteúdo indexável e oportunidades de long-tail.

  **Risco:** Nenhum (futuro)  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  # 5. Dados estruturados (Schema.org)

  ## 5.1 WebSite (global)

  **O que melhorar:** A home já tem JSON-LD `WebSite` com name, url, description. Opcional: adicionar `potentialAction` com `SearchAction` se no futuro houver busca; ou manter como está.

  **Por que ajuda:** Rich results e entendimento do site como um todo.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  ## 5.2 SoftwareApplication / WebApplication por ferramenta

  **O que melhorar:** Em cada página de ferramenta (pomodoro, flashcards, mapa-mental, etc.), adicionar um bloco JSON-LD com tipo `WebApplication` ou `SoftwareApplication`: name, description, url (da página), applicationCategory (ex.: "EducationalApplication"). Dados **estáticos** da página; não usar estado do app (ex.: número de cards, tempo do timer).

  **Por que ajuda:** Sinaliza que são aplicações web educativas; possibilidade de rich results.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  **Exemplo (pomodoro — apenas exemplo, não alterar arquivos existentes):**
  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pomodoro Timer - Hub de Estudo",
    "description": "Timer Pomodoro online grátis. Foco em blocos de 25 min, pausas curtas e longas. Sem cadastro.",
    "url": "https://www.godtimestudy.com.br/pages/pomodoro.html",
    "applicationCategory": "EducationalApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" }
  }
  </script>
  ```

  ---

  ## 5.3 Organization (opcional)

  **O que melhorar:** Se quiser representar o “projeto” ou “produto” como organização, adicionar JSON-LD `Organization` na home com name, url (do site), opcionalmente logo. Não obrigatório.

  **Por que ajuda:** Reforça identidade do site para buscadores.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  ## 5.4 FAQPage (quando aplicável)

  **O que melhorar:** Se existir ou for criada uma seção de FAQ em alguma página (ex.: “O mapa mental é salvo?”, “Preciso de cadastro?”), adicionar JSON-LD `FAQPage` com as mesmas perguntas e respostas do HTML.

  **Por que ajuda:** Possibilidade de exibição em rich results de FAQ.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum (aplicar só onde já houver FAQ em HTML).

  ---

  ## 5.5 BreadcrumbList

  **O que melhorar:** Nas páginas que têm breadcrumb (Hub › Método), adicionar JSON-LD `BreadcrumbList` com itemListElement: { position: 1, name: "Hub", item: url da home }, { position: 2, name: "Método", item: url da página atual }.

  **Por que ajuda:** Rich result de breadcrumb nos resultados de busca.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  **Exemplo (estrutura apenas):**
  ```json
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Hub", "item": "https://www.godtimestudy.com.br/pages/index.html" },
      { "@type": "ListItem", "position": 2, "name": "Pomodoro", "item": "https://www.godtimestudy.com.br/pages/pomodoro.html" }
    ]
  }
  ```

  ---

  # 6. Acessibilidade (impacto em SEO)

  ## 6.1 ARIA, roles e labels

  **O que melhorar:** Revisar em todo o app:

  - Botões e links com apenas ícone: garantir `aria-label` ou `title` (já existe em vários).
  - Formulários: `label` associado a `input`/select ou `aria-label` em controles.
  - Regiões: `main`, `nav`, `aside` já usados; onde fizer sentido, `aria-label` em seções (ex.: `section aria-label="Métricas"` na dashboard — já existe).
  - Editor de mapa mental: container do canvas com `role="application"` e `aria-label` descritivo.

  Não alterar comportamento de foco nem ordem de tabulação; apenas enriquecer árvore de acessibilidade.

  **Por que ajuda:** Acessibilidade e SEO se beneficiam de estrutura e descrições claras.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  ## 6.2 Navegação por teclado

  **O que melhorar:** Não alterar o comportamento atual do teclado nas ferramentas. Garantir que todos os links e botões sejam focáveis e ativáveis por Enter/Space (padrão de `<a>` e `<button>`). Se houver modais ou painéis, garantir que o foco não “escape” da área ativa e que Esc feche quando apropriado (já implementado onde existe).

  **Por que ajuda:** Boas práticas de acessibilidade; indiretamente qualidade da página para SEO.

  **Risco:** Nenhum (sem mudança de lógica)  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  ## 6.3 Textos alternativos e semântica

  **O que melhorar:** Imagens estáticas (ex.: og:image, ilustrações futuras) devem ter contexto descritivo onde fizer sentido (alt em `<img>`; og:image não usa alt, mas a página deve ter texto que descreva o contexto). Ícones decorativos com `aria-hidden="true"`. Não alterar ícones que já tenham função apenas visual.

  **Por que ajuda:** Leitores de tela e compreensão do conteúdo pelos crawlers.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  # 7. SEO para assets e mídia

  ## 7.1 Nomeação de imagens

  **O que melhorar:** Se no futuro houver imagens próprias (ex.: screenshots, ilustrações), usar nomes descritivos e estáveis (ex.: `mapa-mental-exemplo.png`, `pomodoro-timer-interface.png`). Evitar nomes genéricos como `img1.jpg`.

  **Por que ajuda:** Nomes descritivos ajudam em busca por imagem e contexto da página.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum (aplicar em assets futuros).

  ---

  ## 7.2 Alt text e lazy loading

  **O que melhorar:** Para toda `<img>` adicionada no HTML: preencher `alt` com descrição breve. Para imagens abaixo da dobra, considerar `loading="lazy"` para melhorar LCP percebido.

  **Por que ajuda:** Acessibilidade e performance; imagens com alt contribuem para o tema da página.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  ## 7.3 Exportações (PNG/SVG) com nomes descritivos

  **O que melhorar:** Hoje o mapa mental exporta como `mapa-mental.svg` e `mapa-mental.png`. Manter como padrão para não quebrar expectativa do usuário. Opcional no futuro: oferecer nome com data (ex.: `mapa-mental-2025-01-15.svg`) como opção ou segundo botão, sem alterar o comportamento atual do único botão de exportar.

  **Por que ajuda:** Arquivos com nome descritivo ajudam o usuário a organizar; impacto em SEO é indireto (downloads não são indexados como página).

  **Risco:** Médio se mudar o nome padrão; baixo se for opção adicional  
  **Impacto no funcionamento atual:** Nenhum se mantido como está ou opção extra.

  ---

  # 8. Estratégia de crescimento orgânico

  ## 8.1 Palavras-chave alvo (head, mid, long tail)

  **O que melhorar:** Organizar por intenção e prioridade (sem alterar o app):

  | Tipo | Exemplos | Onde reforçar |
  |------|----------|----------------|
  | **Head** | “métodos de estudo”, “pomodoro”, “flashcards” | Home, títulos e descriptions das páginas principais |
  | **Mid** | “timer pomodoro online grátis”, “flashcards para estudo”, “mapa mental online” | Meta description e primeiro parágrafo de cada ferramenta |
  | **Long tail** | “como criar mapa mental para estudo”, “técnica pomodoro como funciona”, “revisão espaçada flashcards” | Seções de texto, Sobre, eventual blog/docs |

  Usar de forma natural; evitar keyword stuffing.

  **Por que ajuda:** Alinhamento entre buscas reais e conteúdo; maior chance de ranqueamento e CTR.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum (apenas copy e conteúdo).

  ---

  ## 8.2 Clusters de conteúdo

  **O que melhorar:** Agrupar temas e linkar internamente:

  - **Cluster “Estudo e foco”:** Home → Pomodoro, Ivy Lee, Metacognição, Sobre.
  - **Cluster “Memorização”:** Home → Flashcards, Active Recall, Spaced Repetition.
  - **Cluster “Organização visual”:** Home → Mapa Mental; eventual página “O que é mapa mental” → Mapa Mental.
  - **Cluster “Progresso”:** Home → Dashboard; Pomodoro/Flashcards → Dashboard.

  Cada página de ferramenta pode ter 1–2 links contextuais para outras ferramentas ou para a home (ex.: “Veja também: Pomodoro” na página de Flashcards). Não alterar a navegação principal (breadcrumb, “Voltar ao Hub”).

  **Por que ajuda:** Distribui autoridade e melhora descoberta de páginas relacionadas.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum (links aditivos).

  ---

  ## 8.3 Interlinking interno

  **O que melhorar:** Garantir que: (1) a home linke para todas as ferramentas e Sobre (já faz); (2) cada ferramenta tenha link “Voltar ao Hub” e breadcrumb (já tem); (3) opcionalmente, em páginas de método, um bloco “Outros métodos” com links para 2–3 ferramentas relacionadas. Usar âncora descritiva (ex.: “Timer Pomodoro” em vez de “Clique aqui”).

  **Por que ajuda:** Facilita rastreamento e distribuição de valor entre páginas.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  ## 8.4 Páginas pilares vs satélite

  **O que melhorar:** Definir conceitualmente:

  - **Pilar:** Home (`index.html`) — página principal que linka para tudo; tópico amplo “métodos de estudo”.
  - **Pilares secundários:** Sobre (Pomodoro), eventual “O que é o Hub” — conteúdo mais longo que linka para ferramentas.
  - **Satélites:** Cada ferramenta (pomodoro, flashcards, mapa-mental, etc.) — tópico específico; linkam de volta para a home e entre si quando fizer sentido.

  Não mudar URLs nem estrutura de navegação; apenas planejar conteúdo novo (landings, seções) para reforçar esse modelo.

  **Por que ajuda:** Estrutura clara de temas e autoridade; melhora ranqueamento para termos amplos e específicos.

  **Risco:** Baixo  
  **Impacto no funcionamento atual:** Nenhum.

  ---

  # 9. Checklist por área do app

  | Área | Ação sugerida | Impacto no app |
  |------|----------------|----------------|
  | **Head (todas)** | Padronizar ordem; opcional robots index,follow | Nenhum |
  | **Home** | Parágrafo introdutório; WebSite JSON-LD já existe | Nenhum |
  | **Pomodoro** | WebApplication JSON-LD; manter h1 e breadcrumb | Nenhum |
  | **Flashcards / Active Recall / Spaced** | WebApplication JSON-LD; h1 e breadcrumb já ok | Nenhum |
  | **Blurt / Ivy Lee / Metacognição** | WebApplication JSON-LD; h1 e breadcrumb já ok | Nenhum |
  | **Mapa mental** | h1 (visível ou sr-only); WebApplication JSON-LD; opcional seção “O que é” | Nenhum |
  | **Dashboard** | WebApplication ou não (página de progresso); manter h1/h2 | Nenhum |
  | **Sobre** | Manter estrutura; opcional FAQPage se houver FAQ | Nenhum |
  | **Breadcrumbs** | Opcional BreadcrumbList JSON-LD em todas com breadcrumb | Nenhum |
  | **Novas páginas** | Landing mapa mental, ajuda, exemplos — só conteúdo + links | Nenhum |
  | **Assets** | Alt em imagens; lazy loading abaixo da dobra; nomes descritivos | Nenhum |
  | **Acessibilidade** | aria-label onde falta; role no canvas do mapa mental | Nenhum |

  ---

  # 10. Resumo de prioridades

  1. **Alto impacto, baixo risco:** Meta robots index,follow; h1 na página do mapa mental; JSON-LD WebApplication nas ferramentas; BreadcrumbList onde há breadcrumb; parágrafo introdutório na home.
  2. **Médio impacto, baixo risco:** Seções “O que é / Para quem” em páginas de ferramenta; interlinking interno (“Outros métodos”); páginas satélite (landing mapa mental, ajuda).
  3. **Refinamento:** Titles/descriptions mais orientados a busca; lastmod no sitemap; Organization JSON-LD; FAQPage onde houver FAQ.

  Nenhuma dessas ações deve alterar lógica, estados, funcionalidades ou fluxos de navegação do usuário. O objetivo é tornar o aplicativo mais indexável, ranqueável e claro para usuários e buscadores, mantendo a experiência atual do produto.
