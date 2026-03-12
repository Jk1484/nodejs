# Todo REST API — Node.js + TypeScript

A RESTful Todo API built with Node.js, TypeScript, Express, and PostgreSQL. Part of a series of REST API implementations in different languages.

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express
- **Database:** PostgreSQL
- **Containerization:** Docker + Docker Compose

## Architecture

Follows a layered architecture pattern:

```
src/
  routes/       # HTTP layer — parse request, call service, write response
  services/     # Business logic and validation
  repositories/ # Data access — SQL queries only
  types.ts      # Shared TypeScript interfaces
  db.ts         # Database connection pool
```

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- [Node.js](https://nodejs.org/) v18+ (only needed for local development)
- [Make](https://www.gnu.org/software/make/)

## Running with Docker (recommended)

This runs both the app and the database in containers.

```bash
# 1. Clone the repo
git clone <repo-url>
cd nodejs

# 2. Set up environment and install dependencies
make init

# 3. Start everything
make run
```

The API will be available at `http://localhost:3000`.

To stop:

```bash
make down
```

## Running Locally (app only, DB in Docker)

Use this for development — the app runs directly with `ts-node` so you can edit and restart quickly.

```bash
# 1. Clone the repo
git clone <repo-url>
cd nodejs

# 2. Set up environment and install dependencies
make init

# 3. Start the DB in Docker and run the app locally
make dev
```

> `make dev` starts only the PostgreSQL container, then runs the app with `ts-node`.

## Environment Variables

`make init` copies `.env.example` to `.env` automatically. Edit `.env` to change any values before running.

| Variable      | Default     | Description           |
|---------------|-------------|-----------------------|
| `DB_HOST`     | `localhost` | PostgreSQL host       |
| `DB_PORT`     | `5432`      | PostgreSQL port       |
| `DB_USER`     | `postgres`  | PostgreSQL user       |
| `DB_PASSWORD` | `postgres`  | PostgreSQL password   |
| `DB_NAME`     | `todos`     | PostgreSQL database   |

## API Endpoints

| Method | Endpoint      | Description     |
|--------|---------------|-----------------|
| GET    | /todos        | List all todos  |
| GET    | /todos/:id    | Get one todo    |
| POST   | /todos        | Create a todo   |
| PUT    | /todos/:id    | Update a todo   |
| DELETE | /todos/:id    | Delete a todo   |

### Examples

```bash
# List all
curl http://localhost:3000/todos

# Get one
curl http://localhost:3000/todos/1

# Create
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy milk"}'

# Update
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"done": true}'

# Delete
curl -X DELETE http://localhost:3000/todos/1
```

## All Make Commands

```bash
make help     # Show all available commands
make init     # Copy .env.example to .env and install dependencies
make run      # Build and start all containers (app + DB)
make dev      # Start DB in Docker, run app locally with ts-node
make down     # Stop and remove containers
make logs     # Tail app container logs
make build    # Compile TypeScript to dist/
make lint     # Run ESLint
make format   # Run Prettier
```
