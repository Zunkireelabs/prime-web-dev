#!/bin/bash
# Upload all tile images to Sanity CDN
# Usage: bash upload-all.sh [catalog]
# If no catalog specified, uploads all catalogs in sequence

BASE="/Users/haddiphuel/Desktop/zunkiree labs/Prime Tiles/tiles category and product"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Use run.js from prime-sanity-upload if it exists, otherwise from scripts/
if [ -f "$HOME/prime-sanity-upload/run.js" ]; then
  RUN="$HOME/prime-sanity-upload/run.js"
  cd "$HOME/prime-sanity-upload"
else
  RUN="$SCRIPT_DIR/run.js"
  cd "$SCRIPT_DIR"
fi

upload_catalog() {
  local folder="$1"
  local catalog_id="$2"
  local dir="$BASE/$folder"

  if [ ! -d "$dir" ]; then
    echo "⚠️  Skipping $catalog_id — folder not found: $dir"
    return 1
  fi

  echo ""
  echo "════════════════════════════════════════"
  echo "  Uploading: $catalog_id"
  echo "  From: $dir"
  echo "════════════════════════════════════════"
  node "$RUN" --dir "$dir" --catalog "$catalog_id"
}

TARGET="${1:-all}"

case "$TARGET" in
  wall-300x600)
    upload_catalog "300X600 MM" "wall-300x600"
    ;;
  vitrified-400x400)
    upload_catalog "400X400 MM" "vitrified-400x400"
    ;;
  vitrified-600x600)
    upload_catalog "600X600 MM" "vitrified-600x600"
    ;;
  eleganz-600x1200)
    upload_catalog "600X1200 MM" "eleganz-600x1200"
    ;;
  spirit-of-nepal)
    upload_catalog "Spirit of Nepal" "spirit-of-nepal"
    ;;
  all)
    echo "🚀 Uploading ALL catalogs to Sanity CDN..."
    upload_catalog "300X600 MM" "wall-300x600"
    upload_catalog "400X400 MM" "vitrified-400x400"
    upload_catalog "600X600 MM" "vitrified-600x600"
    upload_catalog "600X1200 MM" "eleganz-600x1200"
    upload_catalog "Spirit of Nepal" "spirit-of-nepal"
    echo ""
    echo "✅ All catalogs processed!"
    ;;
  *)
    echo "Usage: bash upload-all.sh [wall-300x600|vitrified-400x400|vitrified-600x600|eleganz-600x1200|spirit-of-nepal|all]"
    exit 1
    ;;
esac
