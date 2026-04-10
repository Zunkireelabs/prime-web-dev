#!/bin/bash
set -e

# Usage: ./deploy.sh
COMPOSE_FILE="docker-compose.dev.yml"
CONTAINER_NAME="prime-web-dev"
URL="dev-primetiles.zunkireelabs.com"
echo "🚧 DEVELOPMENT DEPLOYMENT to $URL"

echo "1. Building Next.js App..."
npm install

# Load env vars for Sanity data generation
if [ -f .env.local ]; then
    export $(grep -v '^#' .env.local | xargs)
fi

echo "1b. Fetching catalog data from Sanity..."
npx tsx scripts/generate-catalog-data.ts

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
