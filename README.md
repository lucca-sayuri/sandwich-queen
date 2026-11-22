# Sandwich Queen API

A Node.js + Express + Prisma backend for managing a sandwich shop inventory.
This project provides CRUD endpoints for **User**, **Cheese**, **Patty**, and **Burger** entities,
with 1:N relationships (User → Burger) and full middleware support.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
  - [User](#user)
  - [Cheese](#cheese)
  - [Patty](#patty)
  - [Burger](#burger)
- [Middlewares](#middlewares)
- [Postman Collection](#postman-collection)
- [Git & Deployment](#git--deployment)

## Prerequisites

- Node.js (>=14)
- npm or yarn
- SQLite (comes bundled with Prisma)

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

3. **Run migrations (first time)**

   ```bash
   npx prisma migrate dev --name init
   ```

4. **Start the server**

   ```bash
   npm run dev
   # or
   node src/server.js
   ```

The server will listen on `http://localhost:3000` by default.

## Environment Variables

Copy `.env.example` if available, otherwise set the following:

```
DATABASE_URL="file:./prisma/dev.db"
```

Adjust the path to your SQLite database file.

## API Endpoints

All endpoints are prefixed with `/api/` implicitly via the route files.

### User

| Method | Endpoint          | Description               |
|--------|-------------------|---------------------------|
| `GET`  | `/users`          | List all users            |
| `POST` | `/users`          | Create a new user         |
| `GET`  | `/users/:id`      | Get a user by ID          |
| `PUT`  | `/users/:id`      | Update a user by ID       |
| `DELETE` | `/users/:id`    | Delete a user by ID       |

**Create user body:**
```json
{"nome":"John Doe","email":"john@example.com"}
```

### Cheese

| Method | Endpoint          | Description        |
|--------|-------------------|--------------------|
| `GET`  | `/cheeses`        | List all cheeses   |
| `POST` | `/cheeses`        | Create a cheese    |
| `GET`  | `/cheeses/:id`    | Get cheese by ID   |
| `PUT`  | `/cheeses/:id`    | Update cheese      |
| `DELETE` | `/cheeses/:id`  | Delete cheese      |

**Create cheese body:**
```json
{"nome":"Cheddar"}
```

### Patty

| Method | Endpoint          | Description        |
|--------|-------------------|--------------------|
| `GET`  | `/patties`        | List all patties   |
| `POST` | `/patties`        | Create a patty     |
| `GET`  | `/patties/:id`    | Get patty by ID    |
| `PUT`  | `/patties/:id`    | Update patty       |
| `DELETE` | `/patties/:id`  | Delete patty       |

**Create patty body:**
```json
{"nome":"Beef"}
```

### Burger

| Method | Endpoint                         | Description                        |
|--------|----------------------------------|------------------------------------|
| `GET`  | `/burgers`                       | List all burgers (includes cheese & patty) |
| `POST` | `/burgers`                       | Create a new burger                |
| `GET`  | `/burgers/:id`                   | Get burger by ID (with relations) |
| `PUT`  | `/burgers/:id`                   | Update burger                      |
| `DELETE` | `/burgers/:id`                 | Delete burger                      |

**Create burger body:**
```json
{"nome":"Cheeseburger","preco":12.50,"desc":"Delicious cheeseburger","cheeseId":1,"pattyId":1}
```

**Note:** `userId` can be sent to associate the burger with a user (1:N relationship).

## Middlewares

| Middleware          | Purpose                              |
|----------------------|--------------------------------------|
| `verificadorId`      | Validates that `:id` params are numeric and exist |
| `logger`             | Logs each request with timestamp, method, and path to the terminal |

The `logger` middleware outputs to the console, e.g.:

```
[2026-11-22T14:23:45.123Z] GET /users
```

## Postman Collection

An exported Postman collection is included in the project: `postman_collection.json`.
Import this file into Postman to test all endpoints with success and error scenarios.

## Git & Deployment

- The repository uses a `.gitignore` that excludes `node_modules`, `dist`, and other build artifacts.
- A `README.md` is provided with project documentation.
- To push to the remote repository:

  ```bash
  git add .
  git commit -m "Implement CRUD and middlewares"
  git push origin main
  ```

---

Built with **Express**, **Prisma ORM**, and **SQLite**.