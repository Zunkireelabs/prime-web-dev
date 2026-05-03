#!/bin/bash
set -e

COMPOSE_FILE="docker-compose.prod.yml"
CONTAINER_NAME="prime-web-prod"
URL="primeceramics.com.np"

ts() { date +"%H:%M:%S"; }
step() { echo "[$(ts)] $1"; }

step "🚀 PRODUCTION DEPLOYMENT to $URL"
step "    Commit: $(git rev-parse --short HEAD) — $(git log -1 --pretty=%s)"

step "0. Reclaiming disk: pruning dangling images + old build cache..."
docker image prune -f >/dev/null 2>&1 || true
docker builder prune -f --filter "until=72h" >/dev/null 2>&1 || true
step "    Disk free: $(df -h / | awk 'NR==2 {print $4 " available (" $5 " used)"}')"

step "1. npm install..."
npm install --no-audit --no-fund

# Load env vars for Sanity data generation (production dataset lives in this dir's .env.local)
if [ -f .env.local ]; then
    export $(grep -v '^#' .env.local | xargs)
fi

step "1b. Fetching catalog data from Sanity..."
npx tsx scripts/generate-catalog-data.ts

step "1c. Cleaning previous build artifacts..."
rm -rf .next out

step "1d. Running Next.js build..."
npm run build

if [ ! -d "out" ]; then
    echo "❌ Build failed. 'out' directory not found."
    exit 1
fi

step "2. Building Docker image..."
docker compose -f $COMPOSE_FILE build --no-cache

step "3. Restarting container..."
docker compose -f $COMPOSE_FILE down 2>/dev/null || true
docker compose -f $COMPOSE_FILE up -d

step "✅ Production Deployment Success!"
echo "👉 https://$URL"
