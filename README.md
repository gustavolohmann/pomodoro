# 🧠 Hub de Métodos de Estudo

Sistema web que funciona como um **hub central de métodos de estudo**: reúne técnicas de aprendizagem (Pomodoro, Ivy Lee, Flashcards, Spaced Repetition, Active Recall, Blurt Method, Metacognição) em uma única aplicação, guiada, simples e **100% local**. Todos os dados ficam no navegador do usuário.

---

## O que é este projeto?

É uma aplicação de **estudo e produtividade** que combina:

- **Timer Pomodoro** — foco em blocos de tempo com pausas.
- **Checklist Diário (Ivy Lee)** — até 6 tarefas prioritárias por dia, com nome e descrição.
- **Flashcards** — cartões pergunta/resposta para memorização.
- **Spaced Repetition** — revisão espaçada dos flashcards.
- **Active Recall** — sorteio de um card para responder sem consulta e marcar acerto/erro.
- **Blurt Method** — escrever o que lembra de um tema e comparar com o material.
- **Metacognição** — reflexão diária (o que aprendi, o que foi difícil, o que revisar).
- **Dashboard** — visão do progresso: tempo estudado, dias ativos, cards revisados, taxa de acerto, streak e conquistas.

Tudo roda no navegador, sem servidor: **HTML, CSS e JavaScript puro**, com dados salvos em **localStorage**. Há suporte a **vários idiomas** (pt-BR, en, es) e opção de **exportar/importar/resetar** os dados do Hub em JSON.

---

## Para quem é?

- Estudantes que querem organizar tempo (Pomodoro) e conteúdo (flashcards, revisão).
- Quem busca um único lugar para aplicar várias técnicas de estudo sem instalar apps.
- Quem prefere dados locais, sem cadastro e sem envio para servidor.

---

## Objetivos do Hub

1. **Centralizar** métodos de estudo em um só lugar.
2. **Guiar** o usuário passo a passo em cada técnica.
3. **Criar constância** com registro de dias ativos e streak.
4. **Mostrar progresso real** no dashboard (tempo, revisões, conquistas).

---

## Funcionalidades principais

### ⏱️ Pomodoro
- Timer regressivo (Pomodoro, pausa curta, pausa longa).
- Tempos configuráveis e salvos automaticamente.
- Ciclos automáticos (ex.: a cada 4 pomodoros, pausa longa).
- Notificações (som, toast, notificação do navegador).
- Estatísticas (diário e total).
- Atalhos: Espaço (iniciar/pausar), Ctrl+R (resetar), Ctrl+S (pular).

### ✅ Checklist Diário (Ivy Lee)
- Até 6 tarefas por dia, com **nome** e **descrição (opcional)**.
- Marcar como concluída e remover.
- Ordem por prioridade (a lista é a ordem).
- Tarefas não concluídas não são migradas automaticamente para o dia seguinte.

### 🃏 Flashcards
- Criar cartões com pergunta e resposta.
- Listar e excluir cards.
- Dados usados pelo Spaced Repetition e pelo Active Recall.

### 🔁 Spaced Repetition
- Lista os cards com revisão vencida (por data).
- Ao revisar, marca acerto ou erro e agenda a próxima revisão (intervalos configuráveis).

### 🧠 Active Recall
- Sorteia um flashcard.
- Usuário tenta responder, revela a resposta e marca “Acertei” ou “Errei”.
- Resultado integrado ao sistema de revisão espaçada.

### ✍️ Blurt Method
- Campo de tema e texto “tudo que lembra” sem consulta.
- Opcional: colar conteúdo base para comparar.
- Histórico de blurts e link para criar flashcards a partir do tema.

### 🪞 Metacognição
- Reflexão diária: o que aprendi, o que foi difícil, o que revisar, o que funcionou.
- Histórico das reflexões por data.

### 📊 Dashboard
- Tempo total (Pomodoro).
- Dias ativos.
- Cards revisados e taxa de acerto.
- Streak (dias consecutivos).
- Conquistas (ex.: 7 dias seguidos, 50 cards, 10 sessões Pomodoro).

### 💾 Backup e idiomas
- **Exportar** todos os dados do Hub em JSON.
- **Importar** backup (JSON).
- **Resetar** dados do Hub (Pomodoro pode ser mantido separado, conforme implementação).
- **Idiomas**: Português (Brasil), English, Español — seletor no topo das páginas.

---

## Tecnologias

- **HTML5** — estrutura e acessibilidade.
- **CSS3** — estilo Aero (glassmorphism), gradientes, animações, layout responsivo.
- **JavaScript (Vanilla)** — lógica sem frameworks; ES6+.
- **LocalStorage** — persistência de configurações e dados do Hub.
- **Web Audio API** — som de notificação do Pomodoro.

Sem dependências externas de bibliotecas; apenas fontes (ex.: Google Fonts) e scripts opcionais (ex.: Google AdSense) quando configurados.

---

## Estrutura do projeto

```
pomodoro/
├── index.html                    # Redireciona para pages/index.html (Hub)
├── pages/
│   ├── index.html                # Hub central – escolha do método
│   ├── pomodoro.html             # Timer Pomodoro
│   ├── ivy-lee.html              # Checklist Diário (Ivy Lee)
│   ├── flashcards.html           # Flashcards
│   ├── spaced-repetition.html    # Spaced Repetition
│   ├── active-recall.html        # Active Recall
│   ├── blurt.html                # Blurt Method
│   ├── metacognicao.html         # Metacognição
│   ├── dashboard.html            # Dashboard
│   └── sobre.html                # Texto sobre a Técnica Pomodoro
├── css/
│   └── style.css                 # Estilos globais (Aero, layout, componentes)
├── js/
│   ├── script.js                 # Lógica do timer Pomodoro
│   ├── common.js                 # i18n (traduções) e seletor de idioma
│   └── hub-data.js               # Leitura/gravação do Hub no localStorage
├── lang/
│   ├── pt-BR.js                  # Português (Brasil) – padrão
│   ├── en.js                     # English
│   └── es.js                     # Español
├── CNAME                         # Domínio personalizado (ex.: GitHub Pages)
├── .nojekyll                     # Para GitHub Pages (sem Jekyll)
├── googlef445473405584b96.html   # Verificação do site (ex.: Google)
├── VISAO_HUB.md                  # Especificação e visão do Hub
└── README.md                     # Este arquivo
```

- A **raiz** do site redireciona para `pages/index.html` (Hub).
- As páginas em `pages/` usam caminhos relativos `../css`, `../js`, `../lang`.
- Dados do Hub (Ivy Lee, flashcards, metacognição, blurt, activity log) são gerenciados por `hub-data.js`; o Pomodoro pode usar chaves próprias no `localStorage`.

---

## Como usar

1. Abra o **index.html** na raiz no navegador (ou a URL do site, ex.: GitHub Pages). Você será redirecionado para o Hub.
2. No **Hub** (`pages/index.html`), clique no método desejado (Pomodoro, Ivy Lee, Flashcards, etc.).
3. Use cada método conforme a interface:
   - **Pomodoro**: configurar tempos (ícone engrenagem), iniciar/pausar/resetar/pular.
   - **Ivy Lee**: preencher nome e descrição (opcional) da tarefa e clicar em “Adicionar tarefa”; marcar concluída ou remover.
   - **Flashcards**: criar e gerenciar cartões; usar Spaced Repetition e Active Recall para revisar.
   - **Dashboard**: acompanhar tempo, dias ativos, revisões, streak e conquistas.
4. No Hub, use **Exportar/Importar/Resetar** para backup ou limpeza dos dados do Hub.

Funciona em desktop e mobile; recomenda-se um navegador atual (Chrome, Firefox, Safari, Edge).

---

## Design

- Estilo **Aero (glassmorphism)**: fundo em gradiente animado, cards com blur e bordas translúcidas.
- Navegação: **breadcrumb** (ex.: Hub > Pomodoro) e **seletor de idioma** no topo das páginas de método.
- Fonte: Inter (Google Fonts). Layout responsivo e acessível.

---

## Dados e privacidade

- Tudo é salvo no **localStorage** do navegador.
- Nenhum dado é enviado a servidor por esta aplicação.
- Backup e restauração são feitos por arquivo JSON no próprio dispositivo.

---

## Deploy (opcional)

O projeto pode ser publicado como site estático, por exemplo:

- **GitHub Pages**: colocar o repositório em uma branch (ex.: `main`) e ativar Pages na raiz. O `index.html` da raiz redireciona para `pages/index.html`.
- **Domínio próprio**: configurar o `CNAME` e o DNS conforme a documentação do provedor (ex.: GitHub Pages).
- O arquivo `.nojekyll` evita que o GitHub Pages trate o projeto como Jekyll.

---

## Sobre a Técnica Pomodoro

A Técnica Pomodoro foi desenvolvida por Francesco Cirillo: trabalho em intervalos focados (ex.: 25 minutos) com pausas curtas e, a cada vários ciclos, uma pausa longa. Na aplicação, a página **Sobre** (acessível a partir do Pomodoro) traz mais detalhes e a descrição dos módulos do timer.

---

## Visão e especificação

Para a visão geral do Hub, objetivos por método e fluxo do usuário, consulte **[VISAO_HUB.md](VISAO_HUB.md)**.

---

## Licença

Projeto de código aberto, disponível para uso livre.

---

**Resumo:** este repositório é um **Hub de Métodos de Estudo** que reúne Pomodoro, Ivy Lee, Flashcards, Spaced Repetition, Active Recall, Blurt Method e Metacognição em uma única aplicação web, 100% local, com dashboard de progresso e suporte a múltiplos idiomas e backup em JSON.
