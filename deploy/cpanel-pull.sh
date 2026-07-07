#!/bin/bash
# Publishes the latest prod build to public_html on the cPanel box.
#
# Constraints this works around:
#   - cPanel firewall blocks inbound FTP/SSH from datacenter IPs (GitHub, VPS).
#   - The account's LVE process cage (shared with the live zunkiree-cms Next app)
#     can't spare the concurrent forks that `git clone` needs.
# So GitHub Actions pushes the built site to the private `prod-dist` branch, and
# this script (cron, on-box, outbound-only) pulls it as a SINGLE tarball via curl
# — one process at a time (curl, tar, rsync) — then syncs into public_html.
set -euo pipefail

REPO="Zunkireelabs/prime-web-dev"
BRANCH="prod-dist"
DOCROOT="$HOME/public_html"
TOKEN="$(cat "$HOME/.gh_deploy_token")"
STATE="$HOME/.prime_deployed_sha"
WORK="$HOME/.prime_deploy_tmp"
LOCK="$HOME/.prime_deploy.lock"

exec 9>"$LOCK"
flock -n 9 || { echo "$(date -u +%FT%TZ) another run in progress, skip"; exit 0; }

# Cheap change check: the commit SHA of prod-dist as plain text (tiny response).
NEW="$(curl -fsSL -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github.sha" \
  "https://api.github.com/repos/$REPO/commits/$BRANCH")"
[ -n "$NEW" ] || { echo "$(date -u +%FT%TZ) could not read $BRANCH sha"; exit 1; }

CUR="$(cat "$STATE" 2>/dev/null || echo none)"
if [ "$NEW" = "$CUR" ]; then
  exit 0
fi

echo "$(date -u +%FT%TZ) deploying ${NEW:0:7}"
rm -rf "$WORK"; mkdir -p "$WORK"

# One curl, one tarball (private repo → needs auth).
curl -fsSL -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/$REPO/tarball/$BRANCH" -o "$WORK/site.tgz"

tar -xzf "$WORK/site.tgz" -C "$WORK"
SRC="$WORK/$(tar -tzf "$WORK/site.tgz" | head -1 | cut -d/ -f1)"
[ -d "$SRC" ] || { echo "$(date -u +%FT%TZ) extract failed"; exit 1; }

rsync -a --delete \
  --exclude='.htaccess' --exclude='.well-known/' --exclude='cgi-bin/' --exclude='.nojekyll' \
  "$SRC/" "$DOCROOT/"

echo "$NEW" > "$STATE"
rm -rf "$WORK"
echo "$(date -u +%FT%TZ) done"
