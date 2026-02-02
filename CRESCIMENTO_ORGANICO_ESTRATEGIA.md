# Estratégia de Crescimento Orgânico — Hub de Métodos de Estudo

Documento estratégico para aumentar acesso orgânico (Google e outras fontes) sem tráfego pago. Focado em execução por uma pessoa ou time pequeno.

---

# 1. Diagnóstico rápido de maturidade orgânica

| Dimensão | Nível | Justificativa |
|----------|--------|----------------|
| **SEO técnico** | **Intermediário** | Meta tags, canonical, robots, sitemap, headings, JSON-LD (WebSite, WebApplication, BreadcrumbList), acessibilidade básica e interlinking interno já implementados. Falta: hreflang (pt/en/es), lastmod dinâmico, possível otimização de Core Web Vitals. |
| **Conteúdo** | **Básico** | Home com parágrafo introdutório; cada ferramenta tem h1 + descrição curta; Sobre (Pomodoro) é a única página longa. Poucas páginas pensadas para intenção informacional (o que é, como usar). Quase nenhum cluster nem pilar. |
| **Autoridade / backlinks** | **Inexistente a Básico** | Domínio provavelmente com poucos backlinks externos. Não há estratégia explícita de link building; crescimento depende de descoberta orgânica e compartilhamento. |
| **Distribuição orgânica** | **Básico** | Presença em busca depende de indexação (ok) e ranqueamento (limitado por conteúdo e autoridade). Sem presença estruturada em comunidades, GitHub “discoverable” ou conteúdo viral. |
| **Produto como canal** | **Básico** | Export (PNG/SVG, JSON) existe mas não está “marcado” para divulgação (ex.: watermark leve, link no export). Produto é útil, mas não está desenhado como vetor de aquisição (ex.: “feito com Hub de Estudo”). |

**Resumo:** SEO técnico está em bom nível para um indie; o maior gap é **conteúdo orientado a busca** e **visibilidade em comunidades**. Autoridade e produto como canal ainda no início.

---

# 2. Próximos passos priorizados (roadmap)

## Curto prazo (0–30 dias)

| # | Ação | Impacto | Esforço | Observação |
|---|------|---------|---------|------------|
| 1 | **Landing “O que é mapa mental”** | Alto | Baixo | Uma página estática: definição, benefícios, 2–3 parágrafos + CTA “Criar mapa mental” → mapa-mental.html. Captura buscas informacionais. |
| 2 | **Landing “Timer Pomodoro online grátis”** | Alto | Baixo | Página curta: o que é, por que usar, “Experimente” → pomodoro.html. Reforça termos que já podem trazer tráfego. |
| 3 | **Ajuste de copy nas descriptions** | Médio | Baixo | Incluir explicitamente “grátis”, “sem cadastro”, “no navegador” onde faltar. Revisar titles para termos de cauda média (ex.: “Pomodoro online grátis”). |
| 4 | **Interlinking tático** | Médio | Baixo | Na página Sobre (Pomodoro), adicionar link para “Timer Pomodoro” (pomodoro.html) e “Voltar ao Hub”. Nas novas landings, linkar sempre para a ferramenta e para o Hub. |
| 5 | **Uma página “Como estudar com flashcards”** | Alto | Médio | Conteúdo ~800–1200 palavras: como criar, quando revisar, link para flashcards + active-recall + spaced-repetition. Vira pilar do cluster “memorização”. |

**Foco:** Aumentar superfície indexável com páginas simples e copy mais alinhada à busca, sem mudar o app.

---

## Médio prazo (30–90 dias)

| # | Ação | Impacto | Esforço | Observação |
|---|------|---------|---------|------------|
| 6 | **Cluster “Foco e produtividade”** | Alto | Médio | Pilar: “Métodos de estudo para foco” (home ou nova página). Satélites: Pomodoro, Ivy Lee, Blurt, Mapa Mental. Internal links entre eles e para o Hub. |
| 7 | **Cluster “Memorização”** | Alto | Médio | Pilar: “Como estudar com flashcards” (já no curto prazo). Satélites: Flashcards, Active Recall, Spaced Repetition. Uma página “Revisão espaçada: o que é” linkando para spaced-repetition. |
| 8 | **Conteúdo evergreen por ferramenta** | Alto | Médio | Uma seção ou página por método: “O que é [método]”, “Para que serve”, “Passo a passo rápido”. Ex.: “O que é Blurt Method”, “Ivy Lee: como usar”. Link claro para a ferramenta. |
| 9 | **Página “Ferramentas de estudo grátis”** | Médio | Baixo | Lista curta: Pomodoro, Flashcards, Mapa Mental, etc., com 1 frase cada + link. Captura “ferramentas de estudo gratuitas”, “app estudo grátis”. |
| 10 | **SEO orientado a features** | Médio | Baixo | Garantir que cada feature “vendável” apareça em texto indexável: “exportar mapa mental PNG/SVG”, “flashcards com revisão espaçada”, “timer pomodoro 25 min”. |

**Foco:** Estruturar conteúdo em pilares e clusters e tornar cada ferramenta encontrada por nome + benefício.

---

## Longo prazo (90+ dias)

| # | Ação | Impacto | Esforço | Observação |
|---|------|---------|---------|------------|
| 11 | **Backlinks naturais** | Alto | Médio–Alto | Conteúdo útil que outros queiram linkar: guia “Como usar Pomodoro para concursos”, “Mapa mental para Enem”. Divulgar em comunidades sem spam. |
| 12 | **Presença em comunidades** | Alto | Contínuo | Responder dúvidas em Reddit (r/estudos, r/concursos), fóruns, grupos de estudo; quando fizer sentido, mencionar o Hub com valor (ex.: “tem um timer grátis que uso”). |
| 13 | **GitHub como canal** | Médio | Baixo | Repo público (se aplicável) com README claro: o que é, link do site, “gratuito e sem login”. Pode gerar estrelas e links de projetos de estudo. |
| 14 | **Produto como referência** | Médio | Baixo | Opcional: em export (PNG/SVG) ou no rodapé, “Feito com Hub de Métodos de Estudo” + link. Quem compartilha o export pode gerar cliques. |
| 15 | **Autoridade de nicho** | Alto | Alto | Conteúdo aprofundado (guias longos, comparações, “Pomodoro vs outras técnicas”) que posicionem o Hub como referência em métodos de estudo em pt-BR. |

**Foco:** Autoridade de domínio e descoberta via comunidades e backlinks naturais.

---

# 3. Estratégia de aquisição orgânica por canal

## 🔎 Google Search (SEO)

- **Por que faz sentido:** O Hub é uma ferramenta que resolve problemas buscados (“timer pomodoro grátis”, “flashcards online”, “mapa mental online”). SEO bem feito coloca o produto na frente de quem já está procurando.
- **Como executar:**  
  - Manter e evoluir o que já existe (meta, schema, sitemap).  
  - Aumentar páginas com intenção informacional (o que é X, como usar Y).  
  - Usar palavras que o usuário digita: “grátis”, “sem cadastro”, “online”, “para estudar”, “para prova/concurso”.  
  - Internal linking: toda página de conteúdo deve linkar para a ferramenta correspondente e para o Hub.
- **Riscos:** Baixo. Evitar keyword stuffing e páginas duplicadas. Não criar conteúdo genérico só para “ter mais texto”.

---

## 🧠 Conteúdo educacional (guias, exemplos, tutoriais)

- **Por que faz sentido:** Estudantes buscam “como estudar”, “como fazer mapa mental”, “pomodoro funciona”. Conteúdo que ensina atrai tráfego e gera confiança; o link para a ferramenta converte visita em uso.
- **Como executar:**  
  - Guias curtos (1–2 páginas) por método: o que é, para que serve, passo a passo em 3–5 itens.  
  - Exemplos: “Exemplo de mapa mental para estudo”, “Exemplo de uso do Pomodoro”.  
  - Tutoriais: “Como criar seu primeiro flashcard”, “Como usar revisão espaçada”.  
  - Tudo em HTML estático, com links claros para as ferramentas.
- **Riscos:** Médio se o conteúdo for raso ou copiado. Priorizar qualidade e utilidade real.

---

## 🔗 Backlinks naturais

- **Por que faz sentido:** Backlinks de qualidade aumentam autoridade e ajudam a ranquear para termos competitivos. Para um produto indie, poucos backlinks bons valem mais que muitos ruins.
- **Como executar:**  
  - Criar conteúdo “linkável”: guias úteis, comparações objetivas, dados ou exemplos que outros sites queiram citar.  
  - Não comprar links nem usar redes de links.  
  - Em comunidades e fóruns, quando a resposta for genuína, incluir o link como recurso (ex.: “uso esse timer aqui: …”).  
  - Parcerias com blogs/canais de estudo (guest post ou menção em lista de ferramentas).
- **Riscos:** Alto se for forçado (spam). Foco em valor e relevância.

---

## 🧑‍🎓 Comunidades (Reddit, Discord, fóruns, GitHub)

- **Por que faz sentido:** O público (estudantes, concurseiros, autodidatas) está em fóruns, subreddits e grupos. Uma menção útil pode gerar muitos acessos e uso real.
- **Como executar:**  
  - Participar de r/estudos, r/concursos, r/ENEM, fóruns de concursos, grupos de estudo no Discord/Facebook.  
  - Responder dúvidas de forma genuína; quando o Hub for realmente uma boa resposta (“preciso de um timer pomodoro grátis”), mencionar com 1 frase + link.  
  - GitHub: README com descrição, link do site, “gratuito, sem login”.  
  - Evitar: criar conta só para postar link, copiar/colar a mesma mensagem, insistir quando não couber.
- **Riscos:** Alto se virar spam (ban, má reputação). Regra: só mencionar quando agregar.

---

## 🧩 Produto como marketing (exports, links, branding leve)

- **Por que faz sentido:** Quem usa e gosta pode compartilhar export (mapa mental PNG/SVG) ou falar do produto. O próprio uso vira canal se o produto estiver “assinado”.
- **Como executar:**  
  - Opcional: no rodapé do site ou na página de export, “Feito com Hub de Métodos de Estudo” + link.  
  - Nome do arquivo de export já é “mapa-mental.png” etc.; pode documentar que o usuário pode compartilhar (sem forçar).  
  - Não alterar fluxo de uso: só adicionar um elemento leve de atribuição, não pop-up nem obrigação.
- **Riscos:** Baixo se for discreto. Evitar ser invasivo.

---

# 4. Ideias de páginas que geram tráfego

Cada ideia: intenção de busca, onde encaixa no app, como linka para ferramenta(s).

| Página sugerida | Intenção de busca | Onde encaixa | Como linka |
|-----------------|-------------------|--------------|------------|
| **Como usar mapa mental para estudar para prova** | Informacional + comercial (quer usar na prática) | Nova página ou seção em “Mapa mental”. | Explicar o método; CTA “Criar seu mapa mental” → mapa-mental.html. Link “Hub” no topo/rodapé. |
| **Exemplo de mapa mental pronto** | Informacional (“exemplo”, “modelo”) | Nova página com 1–2 exemplos em texto ou imagem + explicação curta. | “Faça o seu” → mapa-mental.html. |
| **Pomodoro funciona?** | Informacional (dúvida sobre eficácia) | Expandir Sobre ou nova página “Pomodoro funciona?”. | Resposta objetiva + “Experimente o timer” → pomodoro.html. |
| **Flashcards vs resumo** | Comparação / decisão | Nova página “Flashcards ou resumo: quando usar”. | Explicar cenários; “Criar flashcards” → flashcards.html, “Outros métodos” → Hub. |
| **Timer Pomodoro online grátis** | Transacional / navegacional | Landing dedicada ou variante da home. | “Usar agora” → pomodoro.html. |
| **O que é revisão espaçada** | Informacional | Nova página “O que é revisão espaçada”. | Explicar conceito; “Revisar meus cards” → spaced-repetition.html, “Criar flashcards” → flashcards.html. |
| **Como estudar para concurso com Pomodoro** | Informacional + intenção de uso | Guia curto (1 página). | Passo a passo; “Abrir timer Pomodoro” → pomodoro.html. |
| **Blurt Method: o que é e como usar** | Informacional | Nova página ou seção. | Explicar técnica; “Fazer Blurt” → blurt.html. |
| **Checklist Ivy Lee para estudos** | Informacional / como usar | Nova página ou expansão. | “Usar checklist” → ivy-lee.html. |

**Prioridade sugerida (solo dev):**  
1) “O que é mapa mental” + “Criar mapa mental”.  
2) “Timer Pomodoro online grátis” + link para pomodoro.  
3) “Como estudar com flashcards” (pilar) + links para flashcards, active-recall, spaced-repetition.  
4) “Pomodoro funciona?” (reaproveita interesse em Pomodoro).  
5) “Flashcards vs resumo” e “O que é revisão espaçada” quando houver fôlego.

---

# 5. Estratégia de diferenciação orgânica

## Por que alguém escolheria esse app e não outro?

- **Grátis e sem cadastro:** Tudo no navegador, sem e-mail, sem app para baixar. Ideal para quem quer testar rápido ou não quer criar conta.
- **Tudo junto:** Pomodoro, flashcards, revisão espaçada, mapa mental, Ivy Lee, Blurt, metacognição e dashboard em um só lugar. Quem já estuda com vários métodos evita abrir 5 sites.
- **Privacidade e simplicidade:** Dados no dispositivo; backup em JSON. Sem tracking invasivo nem “gamificação” forçada.
- **Foco em estudo:** Não é um Pomodoro genérico nem um “produtividade corporativa”; é pensado para quem estuda (prova, concurso, faculdade).

## Qual o gancho orgânico do produto?

- **“Hub de métodos de estudo, grátis, no navegador”** — uma frase que resume oferta e diferencial.
- **“Sem cadastro”** — reduz fricção e atende buscas explícitas por isso.
- **“Pomodoro + flashcards + mapa mental + mais”** — quem busca uma coisa descobre as outras.

## Como comunicar isso melhor para buscadores e usuários?

- **Para buscadores:**  
  - Usar em titles e descriptions: “grátis”, “sem cadastro”, “métodos de estudo”, “no navegador”.  
  - Em páginas de conteúdo: repetir o gancho de forma natural (ex.: “O Hub reúne Pomodoro, flashcards e outros métodos em um só lugar, grátis e sem cadastro.”).
- **Para usuários:**  
  - Na home: manter o parágrafo que já existe e, se quiser, acrescentar uma linha do tipo “Tudo no navegador. Sem login.”  
  - Nas landings: primeiro parágrafo já responder “o que é” e “por que usar aqui” (grátis, integrado, sem cadastro).  
  - Em comunidades: quando mencionar o Hub, usar a mesma mensagem curta (grátis, sem cadastro, várias ferramentas).

---

# 6. Métricas e sinais de sucesso

Objetivo: acompanhar crescimento orgânico **sem depender de ferramentas pagas**.

| Indicador | Como medir | Fonte |
|-----------|------------|--------|
| **Impressões orgânicas** | Quantas vezes o site aparece nos resultados de busca. | Google Search Console (gratuito). |
| **Cliques orgânicos** | Quantos cliques vêm dos resultados de busca. | Google Search Console. |
| **CTR orgânico** | Cliques / impressões por página ou query. | Google Search Console (calcular ou usar a coluna CTR). |
| **Páginas que mais atraem tráfego** | Ordenar por cliques ou impressões. | Google Search Console → Performance → Páginas. |
| **Queries que trazem tráfego** | Palavras que levam a cliques. | Google Search Console → Performance → Consultas. |
| **Tempo na página / rejeição** | Se o usuário fica ou sai rápido. | Google Analytics 4 (gratuito) ou similar. |
| **Ferramentas mais usadas via SEO** | Cruzar: páginas de destino (ex.: pomodoro.html) com origem “organic”. | Google Analytics 4: aquisição orgânica → páginas de destino. |
| **Crescimento de sessões orgânicas** | Sessões com source/medium “google / organic” (e outros orgânicos). | Google Analytics 4. |

**Sinais práticos de sucesso (solo dev):**

- Aumento de impressões no Search Console em 30–90 dias.
- Aumento de cliques orgânicos, especialmente para páginas novas (landings, guias).
- Aparecimento de queries long-tail nas consultas (ex.: “mapa mental online grátis”, “timer pomodoro sem cadastro”).
- Aumento de tempo na página nas landings e nas ferramentas acessadas a partir delas.
- Menção espontânea em redes ou fóruns (qualitativo).

**O que não usar como única métrica:** apenas “ranking” para uma palavra genérica (ex.: “métodos de estudo”). Melhor: conjunto de queries relevantes + cliques + comportamento (tempo, páginas vistas).

---

# Resumo executivo

- **Onde o Hub está hoje:** SEO técnico intermediário; conteúdo e autoridade básicos; produto pouco usado como canal de aquisição.
- **Onde atacar primeiro (0–30 dias):** 2–3 landings (mapa mental, Pomodoro, opcional “como estudar com flashcards”), ajuste de copy, interlinking. Tudo aditivo, sem mudar o app.
- **Próximo (30–90 dias):** Clusters (foco + memorização), conteúdo evergreen por método, página “ferramentas grátis”.
- **Depois (90+ dias):** Conteúdo linkável, comunidades, GitHub, produto como referência (branding leve).
- **Diferenciação:** “Hub de métodos de estudo, grátis e sem cadastro, no navegador” — repetir em conteúdo e em comunidades.
- **Métricas:** Search Console (impressões, cliques, queries, páginas) + Analytics (sessões orgânicas, tempo, páginas de destino). Sem custo de ferramenta.

Tudo pensado para ser executável por uma pessoa, sem quebrar funcionalidades nem depender de tráfego pago.
