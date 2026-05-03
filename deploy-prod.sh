#!/bin/bash
set -e

COMPOSE_FILE="docker-compose.prod.yml"
CONTAINER_NAME="prime-web-prod"
URL="primeceramics.com.np"
echo "🚀 PRODUCTION DEPLOYMENT to $URL"
echo "Commit: $(git rev-parse --short HEAD) — $(git log -1 --pretty=%s)"

echo "1. Building Next.js App..."
npm install

# Load env vars for Sanity data generation (production dataset lives in this dir's .env.local)
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

echo "✅ Production Deployment Success!"
echo "👉 https://$URL"
