# Análise completa de SEO — Hub de Métodos de Estudo

**Domínio:** www.godtimestudy.com.br  
**Data da análise:** Janeiro 2025

---

## 1. Resumo executivo

| Aspecto | Status | Prioridade |
|--------|--------|------------|
| Meta description | ❌ Ausente em todas as páginas | Alta |
| Open Graph / redes sociais | ❌ Ausente | Alta |
| robots.txt | ❌ Não existe | Média |
| sitemap.xml | ❌ Não existe | Média |
| Canonical URLs | ⚠️ Parcial (só na raiz) | Média |
| Títulos (title) | ✅ Únicos por página | OK |
| HTML semântico (h1, nav, main) | ✅ Presente | OK |
| viewport / mobile | ✅ OK | OK |
| lang / idioma | ✅ pt-BR no html | OK |
| hreflang (pt/en/es) | ❌ Ausente | Baixa |
| Dados estruturados (JSON-LD) | ❌ Ausente | Média |
| Performance (preconnect, etc.) | ✅ Preconnect fonts | OK |

---

## 2. O que está bom

### 2.1 Títulos únicos por página
- **Hub:** "Hub de Métodos de Estudo"
- **Pomodoro:** "Pomodoro Timer - Hub de Estudo"
- **Dashboard:** "Dashboard - Hub de Estudo"
- **Flashcards:** "Flashcards - Hub de Estudo"
- **Active Recall:** "Active Recall - Hub de Estudo"
- **Blurt:** "Blurt Method - Hub de Estudo"
- **Ivy Lee:** "Checklist Diário (Ivy Lee) - Hub de Estudo"
- **Metacognição:** "Metacognição - Hub de Estudo"
- **Spaced Repetition:** "Spaced Repetition - Hub de Estudo"
- **Sobre:** "Sobre o Pomodoro - Técnica e Módulos"

Cada página tem um `<title>` distinto, o que é ótimo para SEO e abas do navegador.

### 2.2 Estrutura técnica
- `charset="UTF-8"` em todas as páginas.
- `viewport` configurado para responsividade.
- `lang="pt-BR"` no `<html>`.
- Uso de `<header>`, `<nav>`, `<main>`, `<section>` onde faz sentido.
- Breadcrumbs com `aria-label="Breadcrumb"`.
- Preconnect para Google Fonts (reduz latência).

### 2.3 Conteúdo indexável
- Texto visível (títulos, descrições, labels).
- Página "Sobre" com conteúdo longo e relevante para Pomodoro e métodos de estudo.
- Links internos entre Hub, Dashboard e métodos.

### 2.4 Redirecionamento da raiz
- `index.html` na raiz redireciona para `pages/index.html` com `meta refresh` e `link rel="canonical"`, evitando conteúdo duplicado na raiz.

---

## 3. Problemas e recomendações

### 3.1 Meta description — CRÍTICO
**Problema:** Nenhuma página tem `<meta name="description" content="...">`.  
O Google usa a description nos resultados de busca; sem ela, ele “inventa” um trecho do corpo da página.

**Recomendação:** Adicionar uma description única por página (c. 150–160 caracteres), com foco em benefício e palavras-chave.

Exemplos:
- **Hub:** "Hub gratuito de métodos de estudo: Pomodoro, flashcards, Active Recall, Ivy Lee, Blurt, metacognição. Sem login, tudo no navegador."
- **Pomodoro:** "Timer Pomodoro online grátis. Foco em blocos de 25 min, pausas curtas e longas. Sem cadastro, funciona no navegador."
- **Dashboard:** "Veja seu progresso: tempo de estudo, dias ativos, cards revisados, streak e gráfico de atividade. Hub de Estudos."

---

### 3.2 Open Graph e Twitter Cards — ALTA
**Problema:** Não há `og:title`, `og:description`, `og:url`, `og:image`, `og:type`, nem tags Twitter.  
Ao compartilhar o link no WhatsApp, Facebook, Twitter/X ou LinkedIn, a prévia fica genérica ou quebrada.

**Recomendação:** Incluir em cada página (ou ao menos na home e nas mais importantes):

```html
<meta property="og:type" content="website">
<meta property="og:title" content="Hub de Métodos de Estudo">
<meta property="og:description" content="...">
<meta property="og:url" content="https://www.godtimestudy.com.br/">
<meta property="og:image" content="https://www.godtimestudy.com.br/img/og-image.png">
<meta property="og:locale" content="pt_BR">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
```

Requer uma imagem de compartilhamento (ex.: 1200x630 px) em `/img/og-image.png` (ou caminho que você definir).

---

### 3.3 robots.txt — MÉDIA
**Problema:** Não existe `robots.txt`.  
O robô usa regras padrão e pode perder orientações úteis (ex.: não indexar algo sensível, apontar para o sitemap).

**Recomendação:** Criar `/robots.txt` na raiz:

```
User-agent: *
Allow: /

Sitemap: https://www.godtimestudy.com.br/sitemap.xml
```

Ajuste o domínio se usar outro (ex.: sem www).

---

### 3.4 sitemap.xml — MÉDIA
**Problema:** Não existe sitemap.  
Facilita a descoberta de todas as URLs pelo Google e outros buscadores.

**Recomendação:** Criar `sitemap.xml` na raiz listando todas as URLs públicas (Hub, Pomodoro, Dashboard, Flashcards, Active Recall, Blurt, Ivy Lee, Metacognição, Spaced Repetition, Sobre), com `lastmod` e `changefreq` opcionais.  
Manter o sitemap referenciado no `robots.txt`.

---

### 3.5 URLs canônicas — MÉDIA
**Problema:**
- Na raiz, o canonical aponta para `pages/index.html` (relativo). Em produção, o ideal é URL absoluta: `https://www.godtimestudy.com.br/pages/index.html` (ou a URL final que você usar).
- As páginas dentro de `pages/` não têm `<link rel="canonical">`. Se alguém linkar com `?utm_` ou com trailing slash, o Google pode ver como URL diferente.

**Recomendação:**
- Usar canonical **absoluto** em todas as páginas, com o domínio real (www.godtimestudy.com.br).
- Ex.: na home:  
  `<link rel="canonical" href="https://www.godtimestudy.com.br/pages/index.html">`  
  (ou a URL “limpa” que for a oficial).

---

### 3.6 hreflang (pt-BR / en / es) — BAIXA
**Problema:** O site tem conteúdo em três idiomas (pt-BR, en, es), mas não há `hreflang`. O Google pode não associar bem as versões e mostrar o idioma errado para o usuário.

**Recomendação:** Quando houver URLs diferentes por idioma (ex.: `/pt/`, `/en/`, `/es/` ou `?lang=en`), adicionar:

```html
<link rel="alternate" hreflang="pt-BR" href="https://www.godtimestudy.com.br/pages/index.html" />
<link rel="alternate" hreflang="en" href="https://www.godtimestudy.com.br/en/index.html" />
<link rel="alternate" hreflang="es" href="https://www.godtimestudy.com.br/es/index.html" />
```

Se hoje o idioma muda só via JS na mesma URL, o ganho de hreflang é menor; ainda assim, documentar a decisão e, se no futuro houver URLs por idioma, implementar.

---

### 3.7 Dados estruturados (JSON-LD) — MÉDIA
**Problema:** Não há `WebSite`, `Organization` ou `SoftwareApplication`.  
Isso limita rich results (ex.: site links, conhecimento do que é o produto).

**Recomendação:** Na home (e opcionalmente na página Sobre), incluir um script JSON-LD, por exemplo:

- **WebSite:** nome, url, description, potentialAction (SearchAction se tiver busca).
- **Organization:** nome, url, logo (se tiver).

Exemplo mínimo:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Hub de Métodos de Estudo",
  "url": "https://www.godtimestudy.com.br",
  "description": "Hub gratuito de métodos de estudo: Pomodoro, flashcards, Active Recall e mais. Sem login."
}
```

---

### 3.8 Imagens
**Problema:** Não há imagens de conteúdo nas páginas analisadas (apenas ícones SVG inline). Se no futuro houver imagens (ex.: og:image, ilustrações), é importante usar `alt` descritivo.

**Recomendação:** Para qualquer `<img>` ou imagem com papel de conteúdo, sempre preencher `alt` com texto que descreva o conteúdo ou a função da imagem.

---

### 3.9 Performance e Core Web Vitals
- **Preconnect** para fonts já está em uso.
- Scripts (AdSense, etc.) em `async` onde aplicável é positivo.
- Não foi feita medição de LCP, FID, CLS; vale rodar o site no PageSpeed Insights (mobile e desktop) depois das mudanças de meta e imagens.

---

## 4. Palavras-chave sugeridas (para meta e conteúdo)

- **Genéricas:** métodos de estudo, técnicas de estudo, estudo organizado, produtividade estudo.
- **Ferramentas:** pomodoro online, timer pomodoro grátis, flashcards online, revisão espaçada, active recall, blurt method, ivy lee, metacognição.
- **Benefício:** estudo sem cadastro, estudo no navegador, dados locais, hub de estudos gratuito.

Use essas expressões de forma natural nas meta descriptions e nos títulos/parágrafos das páginas.

---

## 5. Checklist de implementação sugerida

1. [ ] **Meta description** em todas as páginas (150–160 caracteres).
2. [ ] **Open Graph e Twitter** nas páginas principais (ao menos Hub, Pomodoro, Sobre).
3. [ ] **Imagem de compartilhamento** (1200x630) e tag `og:image`.
4. [ ] **robots.txt** na raiz com Allow e Sitemap.
5. [ ] **sitemap.xml** na raiz com todas as URLs públicas.
6. [ ] **Canonical absoluto** em todas as páginas (domínio real).
7. [ ] **JSON-LD WebSite** (e opcionalmente Organization) na home.
8. [ ] (Opcional) **hreflang** quando houver URLs por idioma.
9. [ ] **Alt em imagens** assim que houver imagens de conteúdo.
10. [ ] Testar no **Google Search Console** (enviar sitemap, ver cobertura e internacionalização).

---

## 6. Conclusão

O projeto já tem boa base: títulos únicos, HTML semântico, viewport e idioma. Os maiores ganhos vêm de:

- **Meta description** e **Open Graph** (melhor CTR e preview em redes).
- **robots.txt** e **sitemap.xml** (melhor rastreamento e descoberta).
- **Canonical absoluto** (evitar diluição por URLs alternativas).
- **JSON-LD** (melhor entendimento do site pelo Google).

Priorize meta description e OG nas páginas principais; em seguida, robots, sitemap e canonical; por último, JSON-LD e hreflang conforme a estratégia de idiomas.
