#!/usr/bin/env bash

set -e

echo "🧹 Cleaning workspace (frontend + backend + root)..."

# Navigate to project root
ROOT_DIR="$(dirname "$0")/.."
cd "$ROOT_DIR"

# Stop and remove docker containers, if running
if [ -f "docker-compose.yml" ]; then
  echo "🛑 Stopping Docker containers..."
  docker compose down -v --remove-orphans || true
fi

# Remove node_modules, lockfiles, and dist/.next builds
echo "🧽 Removing node_modules, dist, and build outputs..."
find . -type d -name "node_modules" -prune -exec rm -rf '{}' +
find . -type d -name "dist" -prune -exec rm -rf '{}' +
find . -type d -name ".next" -prune -exec rm -rf '{}' +
rm -f pnpm-lock.yaml
rm -f package-lock.json

# Clean Docker cache (optional)
echo "🐳 Cleaning Docker images (optional)..."
docker system prune -af || true

echo "✨ Cleanup complete! Ready for a fresh build."
