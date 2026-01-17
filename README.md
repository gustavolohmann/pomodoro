# 🍅 Pomodoro Timer

Aplicação web completa de Timer Pomodoro desenvolvida com HTML, CSS e JavaScript puro, apresentando um design moderno com estilo **Aero (glassmorphism)**.

## ✨ Características

- ⏱️ **Timer Regressivo Preciso**: Contagem em tempo real (MM:SS)
- 🎯 **3 Modos de Trabalho**:
  - Pomodoro (25 min - configurável)
  - Pausa Curta (5 min - configurável)
  - Pausa Longa (15 min - configurável)
- 🔄 **Controle Automático de Ciclos**: A cada 4 pomodoros, ativa automaticamente a pausa longa
- ⚙️ **Configurações Personalizáveis**: Ajuste todos os tempos conforme sua necessidade
- 📊 **Estatísticas**: Acompanhe seus pomodoros diários e total acumulado
- 🔔 **Notificações**: Alertas sonoros e visuais ao finalizar cada etapa
- 💾 **Persistência**: Todas as configurações e estatísticas são salvas automaticamente
- 🎨 **Design Aero Moderno**: Interface com glassmorphism, blur e transparências
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- ⌨️ **Atalhos de Teclado**: 
  - `Espaço` = Iniciar/Pausar
  - `Ctrl+R` = Resetar
  - `Ctrl+S` = Pular etapa

## 🚀 Como Usar

1. Abra o arquivo `index.html` no seu navegador
2. Clique em "Iniciar" para começar o timer
3. Use o ícone de engrenagem ⚙️ para ajustar os tempos nas configurações
4. Acompanhe seu progresso através das estatísticas

## 📁 Estrutura do Projeto

```
pomodoro/
├── index.html      # Página principal do timer
├── sobre.html      # Página explicativa sobre a técnica Pomodoro
├── style.css       # Estilos com efeito Aero (glassmorphism)
├── script.js       # Lógica completa do timer e funcionalidades
└── README.md       # Este arquivo
```

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Estilo Aero com glassmorphism, animações e gradientes
- **JavaScript (Vanilla)**: Lógica completa sem dependências
- **Web Audio API**: Notificações sonoras
- **LocalStorage**: Persistência de dados

## 📋 Funcionalidades Detalhadas

### Timer Principal
- Contador regressivo preciso em minutos e segundos
- Indicador visual do modo ativo
- Efeito de pulso durante o timer em execução

### Controle de Ciclos
- Sistema automático que gerencia a progressão entre pomodoros e pausas
- Indicador visual com 4 bolinhas mostrando o progresso
- Contador total de ciclos realizados

### Configurações
- Personalize todos os tempos (Pomodoro, Pausa Curta, Pausa Longa)
- Defina quantos ciclos para ativar a pausa longa
- Todas as configurações são salvas automaticamente

### Notificações
- Som de notificação ao finalizar cada etapa
- Toast visual na tela
- Notificação do navegador (requer permissão)

### Estatísticas
- Contador diário de pomodoros
- Contador total acumulado
- Reset automático do contador diário à meia-noite

## 🎨 Design

O projeto utiliza o estilo **Aero (glassmorphism)**, caracterizado por:
- Fundo com gradiente animado
- Componentes com `backdrop-filter: blur()`
- Bordas translúcidas e sombras suaves
- Animações fluidas e transições suaves
- Tipografia moderna (Inter)

## 📖 Sobre a Técnica Pomodoro

A Técnica Pomodoro é um método de gerenciamento de tempo desenvolvido por Francesco Cirillo. Consiste em dividir o trabalho em intervalos focados de 25 minutos (pomodoros), separados por pausas curtas. A cada 4 pomodoros, é recomendada uma pausa mais longa.

Para mais informações sobre a técnica, acesse a página `sobre.html` na aplicação.

## 📝 Licença

Este projeto é de código aberto e está disponível para uso livre.

## 👨‍💻 Desenvolvido com

- HTML5
- CSS3
- JavaScript (ES6+)
- Web Audio API
- LocalStorage API

---

**Desfrute de uma experiência produtiva com o Pomodoro Timer! 🍅⏱️**
