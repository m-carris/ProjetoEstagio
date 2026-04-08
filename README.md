# Backend — Sistema de Notificações do Coordenador

## Ideia do Projeto

Sistema de notificações em tempo real para uma empresa de transportes. Um coordenador de tráfego envia mensagens/avisos (ex: "Acidente na Av. de Roma, desviar linha 735") e todos os operadores de tráfego recebem essas mensagens no browser.

O projeto completo tem 3 repositórios:
- **Backend** (este) — NestJS + TypeORM + PostgreSQL + Docker — API REST que recebe, guarda e distribui mensagens
- **PortalCoordenador** — Vue.js — onde o coordenador envia mensagens e vê o histórico
- **ExtensaoChrome** — extensão de browser para os operadores receberem notificações

## Como correr

1. Ter Node.js 20+ e Docker instalados
2. `docker compose up -d` — arranca o PostgreSQL na porta 5432
3. `npm install` — instala dependências
4. `npm run start:dev` — servidor em http://localhost:3000

## Endpoints

GET / — mensagem de boas-vindas
GET /api/mensagens — lista todas as mensagens
GET /api/mensagens/:id — uma mensagem pelo id
POST /api/mensagens — cria mensagem (body: `{"texto": "...", "prioridade": "normal" ou "alta"}`)

## Estrutura

```
src/
  main.ts               — arranca o servidor na porta 3000
  app.module.ts          — módulo principal, liga a BD e importa módulos
  app.controller.ts      — GET / (boas-vindas)
  app.service.ts         — lógica do controller raiz
  mensagens/
    mensagens.module.ts       — módulo de mensagens
    mensagens.controller.ts   — recebe GET e POST de mensagens
    mensagens.service.ts      — lógica (criar, listar, buscar por id)
    mensagens.controller.spec.ts
    mensagens.service.spec.ts
    entities/
      mensagem.entity.ts      — tabela "mensagem" na BD
    dto/
      create-mensagem.dto.ts  — formato dos dados para criar mensagem
test/
  app.e2e-spec.ts        — teste end-to-end do endpoint raiz
```

## Tabela mensagem

- id — number, gerado automaticamente
- texto — string, conteúdo da mensagem
- prioridade — string, 'normal' (padrão) ou 'alta'
- dataCriacao — timestamp, preenchido automaticamente

## O que está feito

- PostgreSQL a correr em Docker (porta 5432, BD notificacoes_db)
- NestJS ligado ao PostgreSQL via TypeORM (synchronize: true, cria tabelas sozinho)
- CRUD de mensagens: criar, listar todas, buscar por id
- Prioridade normal/alta, data de criação automática
- 3 testes unitários a passar
- ESLint + Prettier configurados

## O que falta fazer

Prioridade alta:
- Autenticação com JWT (registo, login, proteger endpoints)
- Autorização por tipo (coordenador cria, operador só lê)
- WebSocket com Socket.io (mensagens em tempo real)
- CORS para o frontend e extensão comunicarem com o backend
- Validação dos DTOs com class-validator

Prioridade média:
- Relação mensagem ↔ utilizador (quem enviou cada mensagem)
- Pesquisa de mensagens por texto e filtro por datas
- Envio para grupos/zonas geográficas
- Templates de mensagens rápidas
- Push notifications no browser

Prioridade baixa:
- Confirmação de leitura
- Dashboard do coordenador
- Variáveis de ambiente (.env)
- Mais testes unitários

## Como testar

Os GET abrem direto no browser. Para POST usar curl, Postman ou Thunder Client (extensão do VS Code).

Criar mensagem:
curl -X POST http://localhost:3000/api/mensagens -H "Content-Type: application/json" -d '{"texto": "Acidente na Av. de Roma", "prioridade": "alta"}'

Ver todas as mensagens:
curl http://localhost:3000/api/mensagens

Ver mensagem por id:
curl http://localhost:3000/api/mensagens/1

Correr testes:
npm test