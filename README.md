# API Sanduíche Queen

Um backend Node.js + Express + Prisma para gerenciar o inventário de uma lanchonete.
Este projeto fornece endpoints CRUD para as entidades **User**, **Queijo**, **Bifana** e **Hambúrguer**, com relacionamentos 1:N (User → Hambúrguer) e suporte completo a middlewares.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Começando](#começando)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Endpoints da API](#endpoints-da-api)
  - [User](#user-1)
  - [Queijo](#queijo)
  - [Bifana](#bifana)
  - [Hambúrguer](#hambúrguer)
- [Middlewares](#middlewares-1)
- [Coleção Postman](#coleção-postman)
- [Git & Deploy](#git--deploy)

## Pré-requisitos

- Node.js (>=14)
- npm ou yarn
- SQLite (vem incluso com o Prisma)

## Começando

1. **Instalar dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

2. **Gerar cliente Prisma**

   ```bash
   npx prisma generate
   ```

3. **Rodar migrações (primeira vez)**

   ```bash
   npx prisma migrate dev --name init
   ```

4. **Iniciar o servidor**

   ```bash
   npm run dev
   # ou
   node src/server.js
   ```

O servidor ficará disponível em `http://localhost:3000` por padrão.

## Variáveis de Ambiente

Caso não tenha um arquivo `.env.example`, defina a seguinte variável:

```
DATABASE_URL="file:./prisma/dev.db"
```

Ajuste o caminho para o arquivo SQLite, se necessário.

## Endpoints da API

Todos os endpoints estão implicitamente prefixados com `/api/` através dos arquivos de rota.

### User

| Método | Endpoint          | Descrição                |
|--------|-------------------|--------------------------|
| `GET`  | `/users`          | Listar todos os users    |
| `POST` | `/users`          | Criar um novo user       |
| `GET`  | `/users/:id`      | Obter um user por ID     |
| `PUT`  | `/users/:id`      | Atualizar um user por ID |
| `DELETE` | `/users/:id`    | Deletar um user por ID   |

**Corpo da criação (POST):**
```json
{"nome":"João Silva","email":"joao@example.com"}
```

### Queijo

| Método | Endpoint          | Descrição        |
|--------|-------------------|------------------|
| `GET`  | `/cheeses`        | Listar todos os queijos |
| `POST` | `/cheeses`        | Criar um queijo |
| `GET`  | `/cheeses/:id`    | Obter queijo por ID |
| `PUT`  | `/cheeses/:id`    | Atualizar queijo |
| `DELETE` | `/cheeses/:id`  | Deletar queijo |

**Corpo da criação (POST):**
```json
{"nome":"Muçarela"}
```

### Carne

| Método | Endpoint          | Descrição        |
|--------|-------------------|------------------|
| `GET`  | `/patties`        | Listar todas as carnes |
| `POST` | `/patties`        | Criar uma carne |
| `GET`  | `/patties/:id`    | Obter carne por ID |
| `PUT`  | `/patties/:id`    | Atualizar carne |
| `DELETE` | `/patties/:id`  | Deletar carne |

**Corpo da criação (POST):**
```json
{"nome":"Res"}
```

### Hambúrguer

| Método | Endpoint                         | Descrição                        |
|--------|----------------------------------|----------------------------------|
| `GET`  | `/burgers`                       | Listar todos os hambúrgueres (inclui queijo & carne) |
| `POST` | `/burgers`                       | Criar um novo hambúrguer         |
| `GET`  | `/burgers/:id`                   | Obter hambúrguer por ID (com relações) |
| `PUT`  | `/burgers/:id`                   | Atualizar hambúrguer             |
| `DELETE` | `/burgers/:id`                 | Deletar hambúrguer               |

**Corpo da criação (POST):**
```json
{"nome":"Cheeseburger","preco":12.50,"desc":"Delicioso cheeseburger","cheeseId":1,"pattyId":1}
```

**Observação:** `userId` pode ser enviado para associar o hambúrguer a um user (relação 1:N).

## Middlewares

| Middleware          | Finalidade                              |
|----------------------|-----------------------------------------|
| `verificadorId`      | Valida que o parâmetro `:id` seja um número válido |
| `logger`             | Registra cada requisição no terminal com carimbo de data/hora, método e caminho |

O middleware `logger` exemplifica no terminal:

```
[2026-11-22T14:23:45.123Z] GET /users
```

## Coleção Postman

Uma collection Postman exportada está incluída no projeto: `postman_collection.json`.
Importar este arquivo no Postman para testar todos os endpoints com cenários de sucesso e erro.

## Git & Deploy

- O repositório possui um `.gitignore` que exclui `node_modules`, `dist` e outros artefatos de build.
- Um `README.md` com a documentação do projeto está disponível.
- Para enviar as alterações ao repositório remoto:

  ```bash
  git add .
  git commit -m "Implement CRUD e middlewares"
  git push origin main
  ```

---

Desenvolvido com **Express**, **Prisma ORM** e **SQLite**.