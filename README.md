# Backend — Sistema de Notificações do Coordenador

## Ideia do Projeto

Sistema de notificações em tempo real para uma empresa de transportes. Um **coordenador de tráfego** envia mensagens/avisos (ex: "Acidente na Av. de Roma, desviar linha 735") e todos os **operadores de tráfego** recebem essas mensagens instantaneamente no browser.

O projeto completo tem 3 repositórios separados:

| Repositório | Tecnologia | Função |
|---|---|---|
| **Backend** (este) | NestJS, TypeScript, TypeORM, PostgreSQL, Docker | API REST + WebSocket Server — recebe, guarda e distribui mensagens |
| **PortalCoordenador** | Vue.js | Backoffice web onde o coordenador envia mensagens e vê o histórico |
| **ExtensaoChrome** | JavaScript/TypeScript | Extensão de browser para operadores receberem notificações em tempo real |

## Como correr o projeto

### 1. Ter tudo instalado

- **Node.js 20** (ou superior)
- **Docker** (para a base de dados PostgreSQL)

### 2. Arrancar a base de dados

```bash
docker compose up -d
```

Isto cria um container Docker com PostgreSQL na porta 5432, com a base de dados `notificacoes_db`.

### 3. Instalar as dependências

```bash
npm install
```

### 4. Arrancar o servidor

```bash
npm run start:dev
```

O servidor fica disponível em **http://localhost:3000**

## Endpoints disponíveis

### Mensagens

| Método | URL                | O que faz                    | Corpo do pedido (JSON)                                  |
|--------|--------------------|------------------------------|---------------------------------------------------------|
| GET    | /api/mensagens     | Devolve todas as mensagens   | —                                                       |
| GET    | /api/mensagens/:id | Devolve uma mensagem pelo id | —                                                       |
| POST   | /api/mensagens     | Cria uma nova mensagem       | `{ "texto": "...", "prioridade": "normal" ou "alta" }` |

### Autenticação

| Método | URL                | O que faz                        | Corpo do pedido (JSON)                                                                     |
|--------|--------------------|----------------------------------|--------------------------------------------------------------------------------------------|
| POST   | /api/auth/registar | Regista um novo utilizador       | `{ "nome": "...", "email": "...", "password": "...", "tipo": "coordenador" ou "operador" }` |
| POST   | /api/auth/login    | Faz login e devolve um token JWT | `{ "email": "...", "password": "..." }`                                                    |

## Estrutura do projeto

```
src/
  main.ts                          ← Ponto de entrada (arranca o servidor na porta 3000)
  app.module.ts                    ← Módulo principal (liga a BD e importa todos os módulos)
  app.controller.ts                ← Controller da raiz (GET / → mensagem de boas-vindas)
  app.service.ts                   ← Serviço da raiz (devolve texto de boas-vindas)
  mensagens/
    mensagens.module.ts            ← Módulo de mensagens (agrupa controller + service + entity)
    mensagens.controller.ts        ← Recebe pedidos HTTP de mensagens (GET e POST)
    mensagens.service.ts           ← Lógica de mensagens (criar, listar, buscar por id)
    mensagens.controller.spec.ts   ← Teste unitário do controller de mensagens
    mensagens.service.spec.ts      ← Teste unitário do service de mensagens
    entities/
      mensagem.entity.ts           ← Tabela "mensagem" na BD (id, texto, prioridade, dataCriacao)
    dto/
      create-mensagem.dto.ts       ← Formato dos dados para criar mensagem (texto + prioridade)
  auth/
    auth.module.ts                 ← Módulo de autenticação (configura JWT com expiração 24h)
    auth.controller.ts             ← Recebe pedidos de login e registo
    auth.service.ts                ← Lógica de registo (bcrypt) e login (gera token JWT)
    entities/
      utilizador.entity.ts         ← Tabela "utilizador" na BD (id, nome, email, password, tipo)
    dto/
      registar.dto.ts              ← Formato dos dados para registo (nome, email, password, tipo)
      login.dto.ts                 ← Formato dos dados para login (email, password)
test/
  app.e2e-spec.ts                  ← Teste end-to-end do endpoint raiz
```

## Tabelas na base de dados

### mensagem

| Coluna      | Tipo      | Descrição                           |
|-------------|-----------|-------------------------------------|
| id          | number    | Gerado automaticamente (1, 2, 3…)  |
| texto       | string    | Conteúdo da mensagem                |
| prioridade  | string    | 'normal' ou 'alta' (padrão: normal) |
| dataCriacao | timestamp | Preenchido automaticamente          |

### utilizador

| Coluna   | Tipo   | Descrição                              |
|----------|--------|----------------------------------------|
| id       | number | Gerado automaticamente                 |
| nome     | string | Nome do utilizador                     |
| email    | string | Email (único, usado para login)        |
| password | string | Password encriptada com bcrypt         |
| tipo     | string | 'coordenador' ou 'operador' (padrão: operador) |

## O que já está feito

### Base de dados e infraestrutura
- PostgreSQL a correr em Docker (`docker-compose.yml`) na porta 5432
- Base de dados `notificacoes_db` criada automaticamente
- Ligação NestJS ↔ PostgreSQL via TypeORM com `synchronize: true` (cria tabelas automaticamente)

### Autenticação (`src/auth/`)
- **Registo** (`POST /api/auth/registar`) — cria utilizador com password encriptada (bcrypt, 10 rondas)
- **Login** (`POST /api/auth/login`) — verifica credenciais e devolve token JWT (expira em 24h)
- Dois tipos de utilizador: `coordenador` e `operador`
- Verificação de email duplicado no registo (devolve erro 409)
- Mensagem de erro genérica no login para não revelar se o email existe (segurança)
- Password nunca devolvida nas respostas da API

### Mensagens (`src/mensagens/`)
- **Listar todas** (`GET /api/mensagens`) — ordenadas da mais recente para a mais antiga
- **Ver por id** (`GET /api/mensagens/:id`) — devolve uma mensagem específica
- **Criar** (`POST /api/mensagens`) — guarda nova mensagem com texto e prioridade
- Prioridade com dois valores: `normal` (padrão) e `alta`
- Data de criação preenchida automaticamente pelo TypeORM

### Testes
- 3 testes unitários a passar (AppController, MensagensController, MensagensService)
- 1 teste end-to-end configurado (endpoint raiz)

### Configuração geral
- Servidor NestJS a correr na porta 3000
- ESLint + Prettier configurados
- TypeScript compilando sem erros

## O que falta fazer

### Prioridade Alta (essencial para o sistema funcionar)
- [ ] **WebSocket Gateway com Socket.io** — Quando o coordenador cria uma mensagem, emitir para todos os operadores conectados em tempo real
- [ ] **Guard de autenticação JWT** — Proteger os endpoints de mensagens (atualmente qualquer pessoa pode aceder sem estar autenticada)
- [ ] **Guard de autorização por tipo** — Só coordenadores podem criar mensagens; operadores só podem ler
- [ ] **CORS** — Ativar na `main.ts` para o Portal Vue.js e a Extensão Chrome conseguirem comunicar com o backend
- [ ] **Validação dos DTOs** — Instalar `class-validator` e `class-transformer` para validar campos obrigatórios e formatos

### Prioridade Média (funcionalidades obrigatórias do projeto)
- [ ] **Relação mensagem ↔ utilizador** — Guardar quem enviou cada mensagem (coluna remetente na tabela mensagem)
- [ ] **Histórico com pesquisa** — Endpoint para pesquisar mensagens por texto e filtrar por intervalo de datas
- [ ] **Envio para grupos/zonas** — Conceito de zona geográfica para enviar mensagens só para operadores de certas zonas
- [ ] **Templates de mensagens rápidas** — Entidade/endpoint para templates pré-definidos (Acidente, Trânsito intenso, Avaria, Desvio)
- [ ] **Push notifications** — Integração com Web Push API para notificações no browser dos operadores

### Prioridade Baixa (extensões futuras)
- [ ] Confirmação de leitura das mensagens
- [ ] Dashboard de atividade do coordenador
- [ ] Envio para grupos dinâmicos
- [ ] Variáveis de ambiente (`.env`) para chave JWT e credenciais da BD
- [ ] Testes unitários mais completos (testar a lógica de cada função, não só se existe)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
