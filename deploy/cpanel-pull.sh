#!/bin/bash
# Publishes the latest prod build to public_html on the cPanel box.
# cPanel firewall blocks inbound FTP/SSH and its LVE cap OOM-kills a CI runner,
# so GitHub Actions pushes the built site to the `prod-dist` branch and this
# script (run by cron on-box, outbound-only) pulls it via a read-only deploy key.
set -euo pipefail

REPO_SSH="git@github-prime:Zunkireelabs/prime-web-dev.git"
BRANCH="prod-dist"
DIR="$HOME/.prime_dist"
DOCROOT="$HOME/public_html"
LOCK="$HOME/.prime_deploy.lock"

exec 9>"$LOCK"
flock -n 9 || { echo "$(date -u +%FT%TZ) another run in progress, skip"; exit 0; }

export GIT_SSH_COMMAND="ssh -i $HOME/.ssh/prime_web_deploy -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"

if [ ! -d "$DIR/.git" ]; then
  rm -rf "$DIR"
  git clone --depth=1 -b "$BRANCH" "$REPO_SSH" "$DIR"
else
  git -C "$DIR" fetch --depth=1 --force origin "$BRANCH"
fi

NEW="$(git -C "$DIR" rev-parse FETCH_HEAD 2>/dev/null || git -C "$DIR" rev-parse HEAD)"
CUR="$(cat "$DIR/../.prime_deployed_sha" 2>/dev/null || echo none)"
if [ "$NEW" = "$CUR" ]; then
  exit 0
fi

echo "$(date -u +%FT%TZ) deploying $NEW"
git -C "$DIR" reset --hard "$NEW"

rsync -a --delete \
  --exclude='.git/' --exclude='.htaccess' --exclude='.well-known/' --exclude='cgi-bin/' \
  "$DIR/" "$DOCROOT/"

echo "$NEW" > "$HOME/.prime_deployed_sha"
echo "$(date -u +%FT%TZ) done"
