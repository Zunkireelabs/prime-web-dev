#!/bin/bash
set -e

# Usage: ./deploy.sh [dev|prod]
ENV=${1:-dev}

if [ "$ENV" == "prod" ]; then
    COMPOSE_FILE="docker-compose.yml"
    CONTAINER_NAME="prime-web-prod"
    URL="prime-tiles.zunkireelabs.com"
    echo "⚠️  PRODUCTION DEPLOYMENT to $URL"
    read -p "Are you sure? (y/n): " confirm
    if [ "$confirm" != "y" ]; then exit 1; fi
else
    COMPOSE_FILE="docker-compose.dev.yml"
    CONTAINER_NAME="prime-web-dev"
    URL="dev-primetiles.zunkireelabs.com"
    echo "🚧 DEVELOPMENT DEPLOYMENT to $URL"
fi

echo "1. Building Next.js App..."
npm install
rm -rf .next out
npm run build

if [ ! -d "out" ]; then
    echo "❌ Build failed. 'out' directory not found."
    exit 1
fi

echo "2. Building Docker Image..."
docker compose -f $COMPOSE_FILE build --no-cache

echo "3. Restarting Container..."
docker compose -f $COMPOSE_FILE down 2>/dev/null || true
docker compose -f $COMPOSE_FILE up -d

echo "✅ Deployment Success!"
echo "👉 https://$URL"
