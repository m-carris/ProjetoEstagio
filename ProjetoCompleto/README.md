# 🔔 Sistema de Notificações do Coordenador

## O que é este projeto?

Este é um sistema que permite ao **coordenador** enviar mensagens/notificações em tempo real para os **operadores de tráfego**.

O sistema tem **3 partes**:

| Parte | O que faz |
|-------|-----------|
| **Servidor** (Backend) | Recebe, guarda e envia as mensagens |
| **Portal** (Website) | Onde o coordenador envia mensagens e vê o histórico |
| **Extensão Chrome** | Onde os operadores recebem as notificações |

---

## Como está organizado?

```
ProjetoCompleto/
├── servidor.js              ← O servidor (o "cérebro" do projeto)
├── dados/                   ← Onde ficam os dados guardados
│   ├── utilizadores.json    ← Contas dos utilizadores
│   └── mensagens.json       ← Mensagens enviadas
├── portal/                  ← O website do coordenador
│   ├── index.html           ← Página de login
│   ├── painel.html          ← Painel principal (enviar mensagens)
│   └── estilo.css           ← Estilos visuais (cores, tamanhos, etc.)
├── extensao/                ← Extensão do Google Chrome
│   ├── manifest.json        ← Configuração da extensão
│   ├── popup.html           ← Janela popup da extensão
│   ├── popup.js             ← Código da popup
│   ├── background.js        ← Serviço que verifica novas mensagens
│   └── icons/               ← Ícones da extensão
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
└── README.md                ← Este ficheiro
```

---

## O que precisas ter instalado?

Só precisas de **duas coisas**:

1. **Node.js** — Faz download em: https://nodejs.org/ (versão LTS)
2. **Google Chrome** — Para usar a extensão

Para verificar se tens o Node.js instalado, abre o terminal e escreve:
```bash
node --version
```
Deve aparecer algo como `v20.x.x` ou superior.

---

## Como correr o projeto?

### Passo 1: Iniciar o servidor

Abre o terminal, navega até à pasta `ProjetoCompleto` e escreve:

```bash
node servidor.js
```

Deves ver isto no terminal:
```
=========================================
 Servidor a funcionar!
 Abre o browser em: http://localhost:3000
=========================================

 Conta padrao:
   Email: coord@teste.com
   Password: 123456
```

> ⚠️ **Nota:** O servidor tem de ficar a correr! Não feches o terminal.

### Passo 2: Abrir o portal do coordenador

Abre o **Google Chrome** e vai a:
```
http://localhost:3000
```

Faz login com a conta padrão:
- **Email:** `coord@teste.com`
- **Password:** `123456`

Depois do login, vais para o **Painel do Coordenador** onde podes enviar mensagens.

### Passo 3: Instalar a extensão Chrome (para os operadores)

1. Abre o Chrome e vai a: `chrome://extensions/`
2. Ativa o **"Modo de programador"** (botão no canto superior direito)
3. Clica em **"Carregar sem compactação"** (ou "Load unpacked")
4. Seleciona a pasta `ProjetoCompleto/extensao/`
5. A extensão vai aparecer na barra do Chrome! 🎉

> 💡 **Dica:** Clica no ícone da extensão para ver as mensagens recebidas.

---

## O que podes fazer?

### No Portal do Coordenador:
- ✅ **Fazer login** com email e password
- ✅ **Registar** novos utilizadores
- ✅ **Enviar mensagens** para os operadores
- ✅ **Usar templates** (mensagens rápidas pré-definidas: Acidente, Trânsito, Avaria, Desvio, Informação)
- ✅ **Definir prioridade** (Normal ou Alta/Urgente)
- ✅ **Ver histórico** de todas as mensagens enviadas
- ✅ **Pesquisar** mensagens por texto
- ✅ **Filtrar** por prioridade
- ✅ **Logout** (terminar sessão)

### Na Extensão Chrome (Operadores):
- ✅ **Receber notificações** do browser quando há novas mensagens
- ✅ **Ver mensagens recentes** ao clicar na extensão
- ✅ **Destaque visual** para mensagens urgentes (🔴)
- ✅ **Notificações persistentes** para mensagens de alta prioridade

---

## API do Servidor

O servidor responde a estes pedidos:

| Método | URL | O que faz | Precisa de login? |
|--------|-----|-----------|-------------------|
| POST | `/api/registar` | Criar novo utilizador | Não |
| POST | `/api/login` | Fazer login (recebe token) | Não |
| GET | `/api/mensagens` | Ver todas as mensagens | Não |
| POST | `/api/mensagens` | Enviar nova mensagem | **Sim** |
| GET | `/api/templates` | Ver templates de mensagens rápidas | Não |
| GET | `/api/mensagens/pesquisa?texto=X` | Pesquisar mensagens | Não |

---

## Notas técnicas

- O servidor corre na porta **3000**
- Os dados são guardados em **ficheiros JSON** (não precisa de base de dados externa)
- **Não precisa** de Docker, PostgreSQL, ou instalar pacotes npm
- O código usa apenas **JavaScript básico**: variáveis, condições, ciclos, arrays, objetos e funções
- A extensão verifica novas mensagens a cada **30 segundos**
- O portal verifica novas mensagens a cada **5 segundos**
- Quando o servidor arranca pela primeira vez, cria automaticamente a conta padrão

---

## Conta padrão

Quando corres o servidor pela primeira vez, é criada esta conta automaticamente:

| Campo | Valor |
|-------|-------|
| Nome | Coordenador |
| Email | coord@teste.com |
| Password | 123456 |
| Tipo | coordenador |

Podes criar mais contas usando o formulário de registo na página de login.

---

## Tecnologias usadas

| Tecnologia | Onde é usada | Para quê |
|------------|-------------|----------|
| **Node.js** | Servidor | Correr JavaScript no computador |
| **JavaScript** | Todo o projeto | Linguagem de programação |
| **HTML** | Portal e Extensão | Estrutura das páginas |
| **CSS** | Portal e Extensão | Estilos visuais |
| **JSON** | Dados | Guardar utilizadores e mensagens |
| **Chrome APIs** | Extensão | Notificações e armazenamento |
