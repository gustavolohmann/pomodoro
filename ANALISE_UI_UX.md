# Análise UI/UX — Hub de Métodos de Estudo

**Tipo:** Análise não destrutiva (avaliação, problemas e sugestões; sem alterar código ou comportamento).  
**Escopo:** Sistema web completo (home, métodos, guias, dashboard, fluxos).

---

## 1. Primeira impressão (First Impression)

### 📍 Observação
A home apresenta título claro (“Hub de Métodos de Estudo”), subtítulo (“Escolha seu método e comece a estudar com foco”) e um parágrafo introdutório SEO que explica: foco, memorização, planejamento, uso no navegador e sem cadastro. A barra de estatísticas (streak, hoje, cards) e o grid de métodos com ícones emoji e status (“Pronto para usar”, “0 para revisar”) dão hierarquia e sensação de produto funcional.

### ⚠️ Problemas identificados
- **Proposta de valor diluída:** O texto introdutório é longo e mistura benefícios com SEO; um usuário em 5 segundos pode não fixar “o que eu faço aqui agora”.
- **Stats zeradas para novo usuário:** Streak 0, Hoje 0 min, Cards 0 pode parecer “vazio” em vez de “comece aqui”; não há microcopy que oriente o primeiro passo.
- **Grid sem agrupamento conceitual:** Pomodoro, Active Recall, Flashcards, Blurt, Ivy Lee, Metacognição, Spaced Repetition, Mapa Mental e Dashboard aparecem na mesma altura; não fica óbvio o que é “timer”, “memorização” ou “planejamento”.

### 💡 Sugestões de melhoria
- Reduzir ou destacar uma única frase de valor acima da dobra (“Timer + flashcards + planejamento. Tudo no navegador, sem cadastro.”) e manter o restante em texto secundário.
- Para stats zeradas: texto do tipo “Estude hoje para ver seu progresso aqui” ou “Complete um Pomodoro para começar”.
- Agrupar métodos por categoria (ex.: “Foco”, “Memorização”, “Planejamento”) ou destacar 1–2 entradas principais (ex. Pomodoro + Flashcards) e o restante em “Outros métodos”.

### 🎯 Impacto esperado
- **UX:** Menos dúvida na primeira tela; primeiro uso mais guiado.  
- **Conversão:** Mais cliques no método certo para o intent do usuário.

---

## 2. Navegação e arquitetura da informação

### 📍 Observação
Há top-bar com breadcrumb (Hub › [página atual]) e seletor de idioma em todas as páginas de método. Na home, breadcrumb é só “Hub” com ícone de casa. Voltar ao Hub existe como: link “← Voltar ao Hub” (flashcards, ivy-lee, blurt, etc.), botão seta no header (pomodoro), “← Voltar ao Hub” na sidebar (mapa mental) ou “Voltar ao Hub” como botão no rodapé (dashboard). Rotas são consistentes (`/pages/*.html`).

### ⚠️ Problemas identificados
- **Dois padrões de “voltar”:** Algumas telas usam link texto “← Voltar ao Hub” acima do card; Pomodoro usa ícone no header; Mapa Mental usa link na sidebar; Dashboard usa botão no rodapé. Quem troca de método pode estranhar a mudança de padrão.
- **Dashboard aparece duas vezes no grid:** Uma como “Dashboard” (ícone 📊) e outra como destino do ícone no header; não fica claro que são o mesmo lugar.
- **Guias separados do grid:** “Guias e conteúdos” (O que é Mapa Mental, Pomodoro online grátis, Como estudar com Flashcards) ficam abaixo do grid, sem relação visual forte com os métodos (ex.: link “Saber mais” nos cards).
- **Sem menu global:** Não existe menu hamburger ou lista de todas as páginas; quem não veio pela home pode não descobrir Ivy Lee, Metacognição, etc.

### 💡 Sugestões de melhoria
- Unificar “Voltar ao Hub”: sempre top-bar (breadcrumb + seta) ou sempre link acima do conteúdo, com mesmo label e estilo.
- No grid, manter um único card “Dashboard” e no header manter apenas o ícone que leva ao dashboard (sem duplicar no grid se for redundante) ou deixar explícito “Ver progresso” no ícone.
- Nos cards de Pomodoro, Flashcards e Mapa Mental, adicionar link “Guia” ou “Saber mais” que leve ao guia correspondente.
- Considerar um footer ou top-bar com links para “Todos os métodos” / “Hub” / “Dashboard” para quem entra direto em uma URL.

### 🎯 Impacto esperado
- **Usabilidade:** Usuário sempre sabe onde está e como voltar; menos “onde está o Dashboard?”.  
- **Descoberta:** Mais acesso aos guias e aos métodos menos óbvios.

---

## 3. Fluxos principais do usuário

### 📍 Observação
- **Criar conteúdo:** Flashcards (pergunta + resposta + Salvar card); Ivy Lee (nome + descrição + Adicionar tarefa); Blurt (tema + conteúdo + base + Salvar Blurt).  
- **Onboarding:** Não há tour nem tela “Primeira vez”; o usuário cai na home e escolhe um método.  
- **Uso recorrente:** Home mostra status (0 para revisar, 0/6 completas); quick action “Iniciar” leva ao Pomodoro; dashboard concentra métricas.

### ⚠️ Problemas identificados
- **Onboarding inexistente:** Quem nunca usou não sabe se deve criar flashcards primeiro, usar Pomodoro ou Ivy Lee; a relação “flashcards ↔ Active Recall ↔ Spaced Repetition” não é explicada na interface.
- **Exclusão sem confirmação em alguns fluxos:** Ex.: excluir card em flashcards (botão “Excluir” no card); excluir tarefa Ivy Lee. Risco de clique acidental sem volta.
- **Salvamento pouco explícito:** Em Blurt/Ivy Lee/Flashcards o dado vai para localStorage; não há toast “Salvo!” ou indicador “Alterações salvas”, gerando dúvida se persistiu.
- **Mapa mental sem salvamento automático:** Banner avisa “não é salvo automaticamente” e “Baixe antes de sair”; usuário pode perder trabalho se fechar a aba sem exportar.
- **Muitos cliques para “revisar um card”:** Ir à home → Flashcards ou Active Recall → Sortear/Revisar; não há atalho “Revisar agora” na home para quem tem cards pendentes.

### 💡 Sugestões de melhoria
- Onboarding mínimo: na primeira visita (ex.: localStorage flag), mostrar um tooltip ou uma linha na home: “Comece por um Pomodoro ou crie seus primeiros flashcards”.
- Confirmação antes de excluir: modal “Remover este card? Não é possível desfazer.” com Cancelar / Remover.
- Feedback de salvamento: após Salvar card / Adicionar tarefa / Salvar Blurt, exibir toast “Salvo!” (ou equivalente i18n) por 2–3 segundos.
- No mapa mental: além do banner, considerar “Exportar antes de sair?” no `beforeunload` se houver nós.
- Na home, se houver cards para revisar: além do número, botão ou link “Revisar agora” que vá direto para Active Recall ou Spaced Repetition.

### 🎯 Impacto esperado
- **Retenção:** Menos abandono por “não sei por onde começar”.  
- **Confiança:** Menos medo de perder dados e menos exclusões acidentais.  
- **Engajamento:** Revisão com menos fricção.

---

## 4. Interface visual (UI)

### 📍 Observação
Tema escuro consistente (variáveis `--bg-start`, `--card-bg`, `--text-primary`, `--text-secondary`), glass cards, botões `.btn-primary` (verde) e `.btn-secondary`, ícones SVG e emojis nos cards. Tipografia Inter, tamanhos e pesos definidos. Estados hover em botões e `:disabled` com opacidade reduzida.

### ⚠️ Problemas identificados
- **Estado de loading pouco definido:** Não há spinner ou estado “Carregando…” em ações como “Sortear card”, “Salvar card” ou ao abrir dashboard; em conexões lentas o usuário pode clicar de novo.
- **Estado de erro visual genérico:** Modal de erro existe (modal.js) mas toasts são usados de forma limitada; mensagens de erro (ex.: import JSON inválido) podem aparecer só no modal, sem padrão único.
- **Botões de ação secundária em excesso:** Ex.: Pomodoro tem Iniciar, Pausar, Resetar, Pular; todos no mesmo nível visual; “Resetar” é destrutivo e poderia ser menos proeminente.
- **Formulários longos sem seções:** Em Blurt e às vezes em Ivy Lee, muitos campos seguidos sem agrupamento visual (ex.: “Dados do blurt” vs “Conteúdo base”).
- **Quick action sempre “Iniciar” (Pomodoro):** Quem usa mais flashcards ou Ivy Lee não tem atalho equivalente; o FAB é fixo para um único fluxo.

### 💡 Sugestões de melhoria
- Loading: em botões que disparam ação assíncrona, mostrar estado “loading” (spinner ou texto “Salvando…”) e desabilitar o botão até concluir.
- Padronizar feedback de erro: sempre que possível toast para erros leves + modal para ações irreversíveis ou erros graves.
- Hierarquia de botões: manter “Iniciar” como primário; “Pausar” como secundário; “Resetar”/“Pular” como terciários (outline ou só ícone) para reduzir peso visual.
- Agrupar campos em formulários com `<fieldset>` ou títulos de seção (ex.: “O que você lembra” / “Conteúdo para comparar” no Blurt).
- Quick action: considerar abrir um mini-menu (Pomodoro / Revisar cards) ou tornar o destino configurável conforme o método mais usado.

### 🎯 Impacto esperado
- **Clareza:** Menos dúvida sobre “deu certo?” e menos duplo clique.  
- **Consistência:** Erros e ações destrutivas seguem o mesmo padrão.  
- **Percepção de valor:** Interface mais “acabada” e profissional.

---

## 5. Feedback e comunicação com o usuário

### 📍 Observação
Há modal reutilizável (sucesso/erro/aviso) e toast na home e no Pomodoro. Export/Import/Reset na home usam modal para confirmação e sucesso. Mensagens vêm de i18n em várias telas; em outras (Blurt, Active Recall em parte) ainda há texto fixo em português.

### ⚠️ Problemas identificados
- **Toast não padronizado:** Na home existe `showToast` no script inline; no Pomodoro há elemento toast; em outras páginas (flashcards, ivy-lee, blurt) não há toast para “Salvo!” — cada fluxo se comporta diferente.
- **Mensagens de erro técnicas:** Ex.: “Erro ao importar. Verifique se o arquivo é um JSON válido” pode ser difícil para usuário leigo; falta sugestão de ação (“Use o arquivo exportado por este Hub”).
- **Reset do sistema:** Modal de confirmação existe; porém “Resetar sistema” na mesma área que Exportar/Importar pode ser confundido com “limpar dados do método atual” em vez de “apagar tudo”.
- **Tom inconsistente:** Alguns textos são informativos (“Não armazenamos seus dados…”), outros diretos (“Salvar card”); falta uma linha clara (ex.: sempre “você” e verbos no imperativo).

### 💡 Sugestões de melhoria
- Padronizar toast: um único componente/método (ex.: `showToast(msg)` ou `Toast.show(msg)`) em todas as páginas que precisem de feedback rápido (salvou, copiou, etc.).
- Mensagens de erro: frase curta + ação (“Arquivo inválido. Use um JSON exportado por este Hub.”).
- No botão de reset: label “Resetar todo o Hub” e no modal deixar explícito “Todos os dados (flashcards, tarefas, etc.) serão apagados.”
- Definir tom de voz em 1–2 frases (ex.: “Objetivo, amigável, você no centro”) e revisar microcopy (botões, erros, confirmações) para alinhar.

### 🎯 Impacto esperado
- **Confiança:** Usuário entende o que aconteceu e o que fazer em caso de erro.  
- **Consistência:** Mesma sensação em todas as telas.

---

## 6. Acessibilidade (nível prático)

### 📍 Observação
Há uso de `aria-label`, `aria-hidden`, `role="dialog"`, `role="alert"`, `role="img"` em vários pontos; breadcrumb com `aria-label="Breadcrumb"`; mapa mental com H1 oculto visualmente e `aria-label` no canvas; cores com contraste razoável (fundo escuro, texto claro).

### ⚠️ Problemas identificados
- **Focus outline removido:** Vários `:focus { outline: none; }` (inputs, botões do RTE, lang-select); quem navega por teclado perde indicação visual de foco.
- **Áreas clicáveis pequenas:** Alguns `icon-btn` 40x40px; ciclo dots do Pomodoro 12px; em mobile pode ficar abaixo do mínimo recomendado (~44px).
- **Contraste de texto secundário:** `--text-secondary: #94a3b8` em fundo `#0f172a` pode estar próximo do limite para texto longo; verificar WCAG AA para corpo de texto.
- **Modal e teclado:** Fechar com Esc e foco preso no modal existem no modal.js; garantir que todo modal (incl. configurações do Pomodoro) use o mesmo padrão.
- **Ordenação do grid:** A ordem dos métodos no grid é fixa no HTML; leitores de tela ouvem na ordem do DOM — pode fazer sentido uma ordem lógica (ex.: Pomodoro primeiro, depois memorização, depois planejamento).

### 💡 Sugestões de melhoria
- Manter outline acessível: usar `outline: none` só quando houver alternativa clara (ex.: `box-shadow` em foco visível, espessura ≥2px).
- Aumentar área de toque: mínimo 44x44px para botões e links principais em mobile (padding ou min-height/width).
- Validar contraste (ex.: Ferramenta Contrast Checker) em `--text-secondary` e, se necessário, clarear um pouco para AA.
- Garantir que todos os modais capturem foco e fechem com Esc; primeiro foco no título ou no primeiro botão.

### 🎯 Impacto esperado
- **Inclusão:** Uso confortável por teclado e leitores de tela.  
- **Mobile:** Menos erros de toque e mais usabilidade em telas pequenas.

---

## 7. Consistência entre telas

### 📍 Observação
Top-bar (breadcrumb + idioma) e glass-card são recorrentes. Botões primário/secundário seguem as mesmas classes. Há variação: Pomodoro tem header com ícones; outras telas têm só “← Voltar ao Hub” e título; dashboard tem layout próprio com métricas e gráfico; mapa mental tem sidebar + canvas.

### ⚠️ Problemas identificados
- **Voltar ao Hub:** Já citado: link texto vs ícone vs botão no rodapé; classe às vezes `back-link`, às vezes `mindmap-back`, comportamento equivalente mas nome/estilo diferentes.
- **Título da página:** Umas têm H1 com emoji + nome (ex.: “🍅 Pomodoro”); Blurt tem “✍️ Blurt Method” sem i18n no título visível; padrão de “emoji + nome” não está em todas.
- **SEO / “Outros métodos”:** O bloco “Outros métodos de estudo” / “Saiba mais: …” aparece em todas as páginas de método mas com redação ligeiramente diferente (com ou sem “Saiba mais”); alguns links com `data-i18n`, outros sem.
- **Formulários:** Label + input em `setting-group` é padrão; em Blurt/Active Recall alguns labels estão sem `data-i18n` (ex.: “Tema”, “Registros anteriores”, “Pergunta”, “Sua resposta (opcional)”).
- **Modal de configurações (Pomodoro):** Título “Configurações” e botões “Salvar”/“Cancelar” sem `data-i18n`; resto do app usa i18n.

### 💡 Sugestões de melhoria
- Unificar componente “Voltar ao Hub” (mesma classe, mesmo texto/ícone, mesma posição relativa ao conteúdo).
- Padronizar H1: sempre “emoji + nome do método” e nome com i18n onde existir chave.
- Unificar bloco de links relacionados: mesma estrutura (ex.: “Saiba mais: [guia]. Outros métodos: [links].”) e tudo com i18n.
- Incluir todas as labels de formulário e títulos de modal nas chaves i18n (Blurt, Active Recall, modal Configurações do Pomodoro).

### 🎯 Impacto esperado
- **Profissionalismo:** Aparência de produto único, não de telas soltas.  
- **Manutenção:** Menos exceções e menos bugs de texto fixo.

---

## 8. UX emocional e percepção de valor

### 📍 Observação
O produto transmite “ferramenta de estudo séria”: escuro, sem enfeites, foco em conteúdo. Grátis e sem cadastro são destacados. Stats e dashboard sugerem progresso; guias e “Saiba mais” sugerem curadoria.

### ⚠️ Problemas identificados
- **Complexidade aparente:** Muitos métodos no mesmo nível pode parecer “muito para escolher”; quem não conhece Ivy Lee ou Blurt pode achar o produto complexo.
- **Pouca sensação de progresso na home:** Streak/dias/cards aparecem, mas sem comparação (“você estudou X dias este mês”) ou próximo objetivo (“mais 1 Pomodoro para bater seu recorde”).
- **Mapa mental “experimental”:** Aviso de não salvamento automático e necessidade de exportar reforça sensação de ferramenta em beta; usuário pode evitar usar por medo de perder.
- **Apoio ao projeto:** Seção de PIX/PayPal é clara e segura (“Só doe por este endereço”); porém fica muito abaixo na home e pode ser pouco vista por quem scrolla pouco.

### 💡 Sugestões de melhoria
- Reduzir sensação de complexidade: na home, destacar 2–3 métodos “principais” e agrupar o restante em “Mais métodos” ou “Planejamento e reflexão”.
- Reforçar progresso: na home ou no dashboard, uma linha tipo “Você está há X dias seguidos” ou “Próximo objetivo: Y minutos hoje”; celebrar marcos (ex.: “7 dias de streak!”).
- No mapa mental: além do banner, opção “Lembrar de exportar” (ex.: ao criar segundo nó) ou auto-download rascunho ao sair; comunicar que é “versão 1.0” e que exportar é a forma de guardar.
- Manter seção de apoio mas garantir que seja encontrada (scroll) ou adicionar link discreto no header/rodapé (“Apoiar o projeto”).

### 🎯 Impacto esperado
- **Engajamento:** Usuário sente que está evoluindo e que o produto é confiável.  
- **Conversão (doação):** Quem quer apoiar encontra a opção sem procurar demais.

---

## 9. Classificação de impacto e tipo de melhoria

### Alto impacto (fricção forte ou risco)
| # | Tema | Problema | Tipo |
|---|------|----------|------|
| 1 | Fluxo | Exclusão de card/tarefa sem confirmação | Estrutural |
| 2 | Feedback | Falta de “Salvo!” após criar/editar conteúdo | Quick win |
| 3 | Onboarding | Nenhuma orientação no primeiro uso | Estrutural |
| 4 | Navegação | Dois padrões de “Voltar ao Hub” | Quick win |
| 5 | Acessibilidade | `outline: none` sem alternativa de foco visível | Quick win |

### Médio impacto (melhoria clara de UX/clareza)
| # | Tema | Problema | Tipo |
|---|------|----------|------|
| 6 | First impression | Proposta de valor e stats zeradas sem microcopy | Quick win |
| 7 | Consistência | Labels/modal Pomodoro e Blurt/Active Recall sem i18n | Quick win |
| 8 | Loading | Ausência de estado de loading em ações async | Quick win |
| 9 | Erro | Mensagens de erro pouco acionáveis | Quick win |
| 10 | Mapa mental | Sensação de “não salva” e risco de perda | Estrutural |

### Baixo impacto (refino e polish)
| # | Tema | Problema | Tipo |
|---|------|----------|------|
| 11 | Grid | Sem agrupamento (Foco / Memorização / Planejamento) | Estrutural |
| 12 | Quick action | Sempre Pomodoro; sem atalho para revisão | Estrutural |
| 13 | Contraste | Revisar --text-secondary para WCAG AA | Quick win |
| 14 | Área de toque | Botões/links &lt; 44px em mobile | Quick win |
| 15 | Tom de voz | Documentar e alinhar microcopy | Estrutural |

---

## 10. Quick wins vs melhorias estruturais

### Quick wins (pouco esforço, ganho visível)
- Unificar “Voltar ao Hub” (escolher um padrão e aplicar em todas as telas).
- Adicionar toast “Salvo!” (ou equivalente) após Salvar card, Adicionar tarefa, Salvar Blurt; padronizar componente toast.
- Colocar confirmação antes de excluir card (e, se aplicável, tarefa Ivy Lee).
- Traduzir labels e modal de configurações do Pomodoro (i18n); idem Blurt e Active Recall onde faltar.
- Restaurar ou substituir outline de foco por `box-shadow` visível em controles interativos.
- Microcopy para stats zeradas (“Estude hoje para ver seu progresso”) e mensagens de erro mais acionáveis.

### Melhorias estruturais (mais tempo, maior impacto)
- Onboarding mínimo (primeira visita: uma linha ou tooltip “Comece por…”).
- Reorganizar home: proposta de valor em uma frase; agrupamento ou destaque de métodos; “Revisar agora” quando houver cards pendentes.
- Estado de loading em botões (Salvar, Sortear, etc.) e padrão único de feedback de erro (toast + modal quando necessário).
- Mapa mental: `beforeunload` quando houver conteúdo não exportado e/ou fluxo “quer exportar antes de sair?”.
- Documentar tom de voz e revisar microcopy (botões, confirmações, erros) em todo o app.
- Opcional: quick action configurável ou mini-menu (Pomodoro / Revisar).

---

## 11. O que já funciona bem

- **Identidade visual:** Tema escuro e glass cards coerentes em todo o sistema.
- **Breadcrumb e top-bar:** Presença em todas as páginas; usuário sabe em qual método está.
- **i18n:** Muitas telas e guias já usam `data-i18n`; troca de idioma sem recarregar.
- **Modal de confirmação:** Export/Import/Reset usam modal com mensagens claras.
- **Dashboard:** Métricas e gráfico de atividade dão sensação de progresso.
- **Guias de conteúdo:** Guias (Mapa Mental, Pomodoro, Flashcards) bem integrados com links “Saiba mais” e CTAs.
- **Acessibilidade em foco:** Uso de `aria-label`, `role`, H1 semântico no mapa mental; base boa para evoluir foco e contraste.
- **Quick action na home:** FAB “Iniciar” para Pomodoro atende bem quem quer começar rápido.

---

**Fim da análise.** Nenhuma alteração foi feita no código; este documento serve como base para priorização no roadmap de design e usabilidade.
