.PHONY: init run dev down logs migrate lint format build help

help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "  init      Copy .env.example to .env and install dependencies"
	@echo "  run       Build and start all containers (app + db)"
	@echo "  dev       Start DB in Docker, run app locally with ts-node"
	@echo "  down      Stop and remove containers"
	@echo "  logs      Tail app container logs"
	@echo "  migrate   Run database migrations"
	@echo "  build     Compile TypeScript"
	@echo "  lint      Run ESLint"
	@echo "  format    Run Prettier"

init:
	@if [ ! -f .env ]; then cp .env.example .env && echo "Created .env from .env.example"; else echo ".env already exists, skipping"; fi
	npm install

run:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f app

dev:
	docker compose up db -d
	npm run migrate
	npm run dev

migrate:
	npm run migrate

lint:
	npm run lint

format:
	npm run format

build:
	npm run build
