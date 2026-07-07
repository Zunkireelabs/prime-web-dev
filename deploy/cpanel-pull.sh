#!/bin/bash
# Pulls latest prod-latest release asset from GitHub and publishes to public_html.
# Runs ON the cPanel box (outbound-only; cPanel firewall blocks inbound FTP/SSH).
# Invoked by cron every few minutes. See .github/workflows/deploy-prod.yml.
set -euo pipefail

REPO="Zunkireelabs/prime-web-dev"
TAG="prod-latest"
DOCROOT="$HOME/public_html"
TOKEN="$(cat "$HOME/.gh_deploy_token")"
STATE="$HOME/.prime_last_asset"
WORK="$HOME/.prime_deploy_tmp"
LOCK="$HOME/.prime_deploy.lock"

exec 9>"$LOCK"
flock -n 9 || { echo "$(date -u +%FT%TZ) another run in progress, skip"; exit 0; }

api() { curl -fsSL -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" "$@"; }

REL="$(api "https://api.github.com/repos/$REPO/releases/tags/$TAG")"
ASSET_URL="$(printf '%s' "$REL" | grep -o '"url": *"https://api.github.com/repos/[^"]*/releases/assets/[0-9]*"' | head -1 | grep -o 'https://[^"]*')"
ASSET_ID="$(printf '%s' "$ASSET_URL" | grep -o '[0-9]*$')"

[ -n "$ASSET_ID" ] || { echo "$(date -u +%FT%TZ) no asset found"; exit 1; }
if [ -f "$STATE" ] && [ "$(cat "$STATE")" = "$ASSET_ID" ]; then
  exit 0
fi

echo "$(date -u +%FT%TZ) deploying asset $ASSET_ID"
rm -rf "$WORK"; mkdir -p "$WORK"
curl -fsSL -H "Authorization: Bearer $TOKEN" -H "Accept: application/octet-stream" "$ASSET_URL" -o "$WORK/site.zip"
unzip -q "$WORK/site.zip" -d "$WORK/site"

if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete --exclude='.htaccess' --exclude='.well-known/' --exclude='cgi-bin/' "$WORK/site/" "$DOCROOT/"
else
  cp -rf "$WORK/site/." "$DOCROOT/"
fi

echo "$ASSET_ID" > "$STATE"
rm -rf "$WORK"
echo "$(date -u +%FT%TZ) done"
