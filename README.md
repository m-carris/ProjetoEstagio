# 📄 Projeto de Estágio — Sistema de Notificações do Coordenador

## Sobre o Projeto

Sistema de notificações em tempo real para uma empresa de transportes.
O coordenador de tráfego envia mensagens/avisos (ex: "Acidente na Av. de Roma, desviar linha 735") e os operadores recebem essas mensagens no browser.

## 📂 Estrutura do Repositório

```
ProjetoEstagio/
├── ProjetoCompleto/     ← O projeto funcional (servidor + portal + extensão)
│   └── README.md        ← Instruções detalhadas de como correr o projeto
├── estagio.md           ← Briefing do estágio (requisitos do projeto)
├── GUIAO.md             ← Guião de aprendizagem completo
├── GUIAO (1).md         ← Versão alternativa do guião
├── COMODARCOMMIT.md     ← Guia de como fazer commits com Git
└── README.md            ← Este ficheiro
```

## 🚀 Como Começar

Vai à pasta **[ProjetoCompleto/](./ProjetoCompleto/)** e segue as instruções do README que lá está.

Resumo rápido:
```bash
cd ProjetoCompleto
node servidor.js
```
Depois abre `http://localhost:3000` no browser.

## 📋 O que foi feito

- ✅ **Servidor** (Backend) — Node.js puro, sem frameworks
- ✅ **Portal do Coordenador** — HTML, CSS e JavaScript puro
- ✅ **Extensão Chrome** — Para os operadores receberem notificações
- ✅ **Autenticação** — Registo e login com token
- ✅ **Mensagens** — Criar, listar, pesquisar, filtrar por prioridade
- ✅ **Templates** — Mensagens rápidas pré-definidas
- ✅ **Notificações** — Push notifications no browser via extensão
- ✅ **Dados** — Guardados em ficheiros JSON (sem necessidade de base de dados)

## 🛠️ Tecnologias

| Tecnologia | Para quê |
|------------|----------|
| Node.js | Correr o servidor |
| JavaScript | Linguagem de programação (todo o projeto) |
| HTML + CSS | Interface do portal e extensão |
| JSON | Armazenamento de dados |
| Chrome APIs | Extensão de browser |

> **Nota:** O código usa apenas conceitos básicos de JavaScript — variáveis, condições, ciclos, arrays, objetos e funções. Não usa TypeScript, frameworks, ou base de dados externa.