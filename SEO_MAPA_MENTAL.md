# SEO — Editor de Mapa Mental

Recomendações para aumentar tráfego orgânico, indexação e visibilidade **sem alterar** o comportamento funcional do editor, estados ou experiência do usuário.

---

## 1. SEO técnico

### 1.1 Título dinâmico e descritivo

**O que melhorar:** O `<title>` atual é estático: "Mapa Mental - Hub de Estudo". Tornar opcionalmente mais específico para busca (ex.: incluir "online grátis", "criar mapa mental").

**Por que ajuda:** Títulos únicos e com termos de busca aumentam CTR e sinalizam o tema da página.

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum (apenas texto da aba do navegador).

**Exemplo (opcional):**
```html
<title>Mapa Mental Online Grátis — Criar e Organizar Ideias | Hub de Estudo</title>
```

---

### 1.2 Meta description

**O que melhorar:** A description atual já existe e é boa. Pode ser levemente ampliada (até ~155 caracteres) com termos como "ferramenta", "estudo", "organizar ideias", mantendo foco em benefício.

**Por que ajuda:** Melhora o snippet nos resultados e a relevância percebida.

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum.

**Exemplo (opcional):**
```html
<meta name="description" content="Crie mapas mentais online grátis: nós, ligações e formas. Organize ideias para estudo e planejamento. Sem cadastro, no navegador. Exporte PNG e SVG.">
```

---

### 1.3 Meta robots

**O que melhorar:** Adicionar `<meta name="robots" content="index, follow">` no `<head>` (ou omitir, que equivale ao mesmo). Só usar `noindex` se a página for temporária ou privada.

**Por que ajuda:** Deixa explícito que a página pode ser indexada e seguida; evita dúvidas em crawlers.

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum.

**Exemplo (opcional):**
```html
<meta name="robots" content="index, follow">
```

---

### 1.4 Canonical

**O que melhorar:** O canonical já está correto. Garantir que, se existir mais de uma URL para a mesma página (query params, trailing slash), o canonical aponte sempre para a URL definitiva (ex.: `https://www.godtimestudy.com.br/pages/mapa-mental.html`).

**Por que ajuda:** Evita conteúdo duplicado e concentra sinais na URL canônica.

**Risco:** Nenhum (já implementado)  
**Impacto no comportamento:** Nenhum.

---

### 1.5 Estrutura de headings (h1, h2) em aplicação interativa

**O que melhorar:** A página não tem `<h1>` visível; o conteúdo principal é o editor (canvas). Adicionar um **h1** para a ferramenta (ex.: "Editor de Mapa Mental") e, se houver seção de texto explicativo, usar **h2** para subseções. O h1 pode ficar em uma área já existente (ex.: sidebar ou topo) ou em elemento com classe que o oculte visualmente mas mantenha no DOM para leitores de tela e crawlers (ex.: `sr-only` / `visually-hidden`).

**Por que ajuda:** Headings dão hierarquia e tema da página; o Google usa para entender estrutura e destacar trechos.

**Risco:** Baixo (se o h1 for apenas adicionado, sem mudar layout)  
**Impacto no comportamento:** Nenhum, desde que não altere ordem/estrutura da UI.

**Exemplo (opcional) — h1 na sidebar, antes do banner de “não salvo”:**
```html
<aside class="mindmap-sidebar" aria-label="Ferramentas do mapa mental">
    <div class="mindmap-sidebar-header">
        <a href="index.html" class="mindmap-back" data-i18n="backToHub">← Voltar ao Hub</a>
    </div>
    <h1 class="mindmap-page-title visually-hidden" data-i18n="mindmapPageTitle">Editor de Mapa Mental Online</h1>
    <div class="mindmap-not-saved-banner" role="alert">
        ...
    </div>
```
Ou, se preferir só para crawlers/leitores de tela, usar classe que oculte visualmente (ex.: `.visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }`).

---

### 1.6 Atributo lang no `<html>`

**O que melhorar:** Já está correto: `<html lang="pt-BR">`. Se no futuro houver versões em outros idiomas, usar `hreflang` nas alternativas.

**Por que ajuda:** Ajuda o mecanismo de busca a associar a página ao idioma correto.

**Risco:** Nenhum (já implementado)  
**Impacto no comportamento:** Nenhum.

---

### 1.7 Performance percebida (Core Web Vitals)

**O que melhorar:** Manter preconnect para fonts (já existe). Evitar bloquear render com scripts pesados no topo; os scripts do editor já estão no final do `<body>`. Opcional: adicionar `loading="lazy"` em imagens se no futuro houver imagens abaixo da dobra.

**Por que ajuda:** LCP e FID/INP melhoram com menos bloqueio e recursos prioritários bem configurados.

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum (apenas boas práticas já alinhadas ao projeto).

---

### 1.8 Indexação em página interativa (SPA-like)

**O que melhorar:** O editor é interativo e o conteúdo do mapa é gerado no cliente. Garantir que exista **conteúdo estático indexável** no HTML (título, descrição, breadcrumb, textos da sidebar, e eventual seção explicativa em HTML). Não depender do conteúdo do canvas para indexação.

**Por que ajuda:** Crawlers indexam o HTML estático; assim a página continua relevante mesmo sem executar o JS do editor.

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum (apenas garantir que há texto no HTML; eventual seção explicativa é aditiva).

---

## 2. SEO on-page e conteúdo

### 2.1 Textos estratégicos não intrusivos

**O que melhorar:** Incluir uma **seção de conteúdo informativo** fora do canvas (ex.: abaixo do layout do editor ou em área colapsável na sidebar), com textos curtos sobre:
- O que é o editor de mapa mental
- Para quem é (estudantes, planejamento, brainstorm)
- Principais benefícios (organizar ideias, exportar PNG/SVG, sem cadastro)

**Por que ajuda:** Aumenta palavras-chave naturais, melhora relevância para long-tail e dúvidas como "o que é mapa mental" ou "mapa mental grátis online".

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum (conteúdo adicional; pode ser colapsável ou “abaixo da dobra” para não atrapalhar quem só quer usar o editor).

**Exemplo de bloco (opcional) — colapsável ou abaixo do editor:**
```html
<section class="mindmap-seo-content" aria-labelledby="mindmap-what-is-heading">
    <h2 id="mindmap-what-is-heading">O que é este editor de mapa mental?</h2>
    <p>Um mapa mental é um diagrama para organizar ideias em torno de um conceito central. Esta ferramenta permite criar mapas mentais online: adicione nós, ligue conceitos e exporte em PNG ou SVG, sem cadastro.</p>
    <h2>Para quem é?</h2>
    <p>Estudantes, professores e qualquer pessoa que queira organizar ideias, fazer brainstorm ou planejar estudos de forma visual.</p>
    <h2>Principais benefícios</h2>
    <ul>
        <li>Uso gratuito no navegador, sem instalação</li>
        <li>Exportação em PNG e SVG para usar em outros materiais</li>
        <li>Nós em diferentes formas (retângulo, elipse, losango) e ligações entre conceitos</li>
    </ul>
</section>
```
Estilo: pode ser `.mindmap-seo-content { margin-top: 2rem; max-width: 40rem; }` e, se quiser, um botão “Ler mais” que expande/colapsa sem alterar o fluxo do editor.

---

### 2.2 Palavras-chave sem keyword stuffing

**O que melhorar:** Nos textos acima (e na meta description), usar de forma natural termos como: mapa mental, mapa mental online, criar mapa mental, organizar ideias, estudo, exportar mapa mental, grátis, sem cadastro. Evitar repetir a mesma frase ou bloco várias vezes.

**Por que ajuda:** Relevância para buscas reais sem penalização por excesso de palavras-chave.

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum.

---

## 3. Conteúdo indexável sem afetar o app

### 3.1 Blocos informativos fora do canvas

**O que melhorar:** Manter todo o conteúdo “para SEO” em elementos HTML fora do `<div class="mindmap-canvas-wrap">` e do SVG (por exemplo, na sidebar ou numa `<section>` abaixo do layout principal).

**Por que ajuda:** O crawler recebe texto estático; o editor continua sendo apenas a área interativa.

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum.

---

### 3.2 Seções colapsáveis

**O que melhorar:** Se a seção explicativa for longa, colocá-la em um `<details>` / `<summary>` ou em um bloco que expande/colapsa por JS (estado controlado por classe, ex.: `.is-expanded`). O conteúdo continua no DOM e indexável.

**Por que ajuda:** Mantém a página limpa para quem só quer usar o editor e ainda oferece conteúdo indexável.

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum (apenas UX da seção de texto).

**Exemplo (opcional):**
```html
<details class="mindmap-seo-details">
    <summary>O que é mapa mental e como usar esta ferramenta</summary>
    <p>...</p>
</details>
```

---

### 3.3 Conteúdo textual complementar

**O que melhorar:** Garantir que labels da sidebar (Forma do nó, Ações, Baixar mapa, dica de uso) permaneçam em HTML legível e, se possível, que a dica (“Novo nó: clique no canvas…”) esteja em um `<p>` sem ser substituída apenas por ícones. Já está em boa parte assim; manter e complementar com a seção informativa acima.

**Por que ajuda:** Mais texto relevante para indexação sem mudar a função dos controles.

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum.

---

## 4. Dados estruturados (Schema.org)

### 4.1 SoftwareApplication / WebApplication (JSON-LD)

**O que melhorar:** Adicionar um bloco `<script type="application/ld+json">` no `<head>` ou antes do `</body>` com tipo `SoftwareApplication` (ou `WebApplication`), contendo nome, descrição, URL, opcionalmente applicationCategory (ex.: "EducationalApplication"), e que **não** dependa do estado do editor (nós, arestas, etc.).

**Por que ajuda:** Rich results e melhor entendimento do tipo de página (ferramenta web educativa).

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum (dados estáticos).

**Exemplo (opcional):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Editor de Mapa Mental - Hub de Estudo",
  "description": "Crie mapas mentais online: nós, ligações e formas. Organize ideias visualmente no navegador, sem cadastro. Exporte em PNG e SVG.",
  "url": "https://www.godtimestudy.com.br/pages/mapa-mental.html",
  "applicationCategory": "EducationalApplication",
  "browserRequirements": "Requer JavaScript habilitado.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" }
}
</script>
```

---

### 4.2 FAQ (se aplicável)

**O que melhorar:** Se for criada uma seção de perguntas frequentes (ex.: “O mapa é salvo?”, “Como exportar?”, “Precisa de cadastro?”), adicionar JSON-LD do tipo `FAQPage` com as mesmas perguntas e respostas.

**Por que ajuda:** Possibilidade de exibição em rich results de FAQ no Google.

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum (só aplicar onde já houver FAQ em HTML).

---

### 4.3 Independência do estado do editor

**O que melhorar:** Garantir que nenhum dado estruturado use informações dinâmicas do mapa (número de nós, texto dos nós, etc.). Apenas dados fixos da página (nome, descrição, URL, categoria).

**Por que ajuda:** Evita inconsistência e conteúdo duplicado em rich results.

**Risco:** Nenhum se seguir essa regra  
**Impacto no comportamento:** Nenhum.

---

## 5. Acessibilidade (impacto indireto em SEO)

### 5.1 aria-label e role

**O que melhorar:** A página já tem `aria-label` no breadcrumb, na sidebar e em botões de forma. Revisar os botões de modo (Selecionar, Novo nó, Nova ligação, Apagar) e os de download: garantir que tenham `aria-label` ou texto visível. O canvas pode ter `role="img"` e `aria-label="Área do editor de mapa mental"` (ou equivalente) para leitores de tela.

**Por que ajuda:** Acessibilidade e SEO se beneficiam de estrutura semântica e descrições claras.

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum (apenas atributos ARIA e rótulos).

**Exemplo (opcional) — canvas:**
```html
<div class="mindmap-canvas-wrap" id="mindmapCanvasWrap" role="application" aria-label="Editor de mapa mental: arraste nós, crie ligações e edite texto.">
```

---

### 5.2 Navegação por teclado

**O que melhorar:** Não alterar o comportamento atual do teclado (Esc, Delete, etc.). Apenas documentar que o editor já suporta teclado e garantir que botões da sidebar sejam focáveis e ativáveis por Enter/Space (já esperado em `<button>`).

**Por que ajuda:** Boas práticas de acessibilidade reforçam qualidade da página para usuários e indiretamente para SEO.

**Risco:** Nenhum (sem mudança de lógica)  
**Impacto no comportamento:** Nenhum.

---

### 5.3 Garantir que melhorias de acessibilidade não alterem interações

**O que melhorar:** Ao adicionar `aria-label`, `role` ou `title`, não alterar `tabindex` nem ordem de foco nem handlers de eventos do editor. Apenas enriquecer a árvore de acessibilidade.

**Por que ajuda:** Mantém a experiência atual e melhora acessibilidade.

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum, se restrito a atributos e rótulos.

---

## 6. SEO para imagens e exportações

### 6.1 Nomeação de arquivos exportados (PNG / SVG)

**O que melhorar:** Hoje o download usa nome fixo (`mapa-mental.svg`, `mapa-mental.png`). Opcionalmente usar um nome mais descritivo e único, por exemplo incluindo data: `mapa-mental-YYYY-MM-DD-HHmm.svg` (ou só data). Isso pode ser configurável (ex.: parâmetro ou preferência) para não surpreender usuários que esperam sempre o mesmo nome.

**Por que ajuda:** Arquivos com nomes descritivos são melhores para o usuário salvar e, se forem indexados em algum contexto, ajudam na relevância.

**Risco:** Médio (mudança de nome do arquivo pode afetar expectativa do usuário ou scripts que baixam “mapa-mental.png”)  
**Impacto no comportamento:** Possível mudança de nome do arquivo baixado.

**Sugestão conservadora:** Manter `mapa-mental.svg` e `mapa-mental.png`; apenas documentar que, no futuro, um nome com data pode ser oferecido como opção (ex.: segundo botão ou configuração), sem alterar o padrão atual.

---

### 6.2 Uso de alt quando aplicável

**O que melhorar:** Se no futuro houver imagens na página (ex.: ilustração ou screenshot do editor), usar `alt` descritivo (ex.: "Exemplo de mapa mental com nós e ligações"). O SVG do editor é gerado dinamicamente e não precisa de `alt` no sentido clássico; a região do canvas pode ser descrita com `aria-label` no container (ver 5.1).

**Por que ajuda:** Imagens com alt adequado melhoram acessibilidade e contexto para busca.

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum (aplicar só em imagens estáticas adicionadas no HTML).

---

## 7. Estratégia de tráfego orgânico e páginas auxiliares

### 7.1 Landing page explicativa

**O que melhorar:** Criar uma página dedicada (ex.: `mapa-mental-o-que-e.html` ou seção no Hub) que explique o que é mapa mental, benefícios e link “Criar mapa mental” apontando para `mapa-mental.html`. Essa página seria principalmente conteúdo textual e links; o editor permanece em `mapa-mental.html`.

**Por que ajuda:** Captura buscas informacionais (“o que é mapa mental”, “como fazer mapa mental”) e direciona para a ferramenta.

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum (nova página; editor inalterado).

---

### 7.2 Página de documentação

**O que melhorar:** Uma página (ex.: `mapa-mental-ajuda.html`) com atalhos, como criar nós e ligações, como exportar, dicas de uso. Links “Voltar ao editor” e “Criar mapa mental” para `mapa-mental.html`.

**Por que ajuda:** Long-tail (“como usar mapa mental online”, “exportar mapa mental”) e redução de taxa de rejeição ao dar suporte claro.

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum (conteúdo separado do editor).

---

### 7.3 Página de exemplos

**O que melhorar:** Página com exemplos de uso (ex.: “Mapa mental para estudo”, “Mapa mental para planejamento”) em texto e, se desejável, imagens estáticas ou links para templates. Links para o editor.

**Por que ajuda:** Palavras-chave como “exemplo de mapa mental”, “modelo de mapa mental”.

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum.

---

### 7.4 Estrutura de URLs amigáveis

**O que melhorar:** Manter URLs curtas e legíveis. Atual `.../pages/mapa-mental.html` já é boa. Se criar novas páginas, usar padrão consistente, por exemplo:
- `.../pages/mapa-mental.html` — editor
- `.../pages/mapa-mental-ajuda.html` — ajuda
- `.../pages/mapa-mental-o-que-e.html` — landing explicativa

**Por que ajuda:** URLs descritivas melhoram clareza para usuário e crawlers.

**Risco:** Baixo  
**Impacto no comportamento:** Nenhum (apenas convenção de nomes para novas páginas).

---

## 8. Checklist rápido (mapa mental)

| Item | Ação | Impacto no app |
|------|------|-----------------|
| Title | Opcional: incluir "online grátis" / "criar" | Nenhum |
| Meta description | Opcional: ampliar até ~155 caracteres | Nenhum |
| Meta robots | Opcional: `index, follow` | Nenhum |
| Canonical | Já OK | Nenhum |
| h1 | Adicionar h1 (visível ou sr-only) | Nenhum |
| lang | Já OK | Nenhum |
| Conteúdo estático | Seção “O que é / para quem / benefícios” | Nenhum |
| JSON-LD WebApplication | Adicionar no head/body | Nenhum |
| aria-label no canvas | Opcional no container do editor | Nenhum |
| Nome dos exports | Manter atual; opcional nome com data no futuro | Nenhum se mantido |
| Novas páginas (landing, ajuda, exemplos) | Criar separadamente | Nenhum |

---

**Objetivo final:** Melhorar indexação, ranqueamento orgânico e descoberta da ferramenta, mantendo o editor 100% funcional e a experiência do usuário inalterada.
