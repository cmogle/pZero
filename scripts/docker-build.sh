#!/usr/bin/env bash
# Build Phoenix OS Docker image. ADR-008 Phase 5.
# Usage: ./scripts/docker-build.sh [tag]
set -e
cd "$(dirname "$0")/.."
tag="${1:-phoenix-os:latest}"
docker build -t "$tag" .
echo "Built $tag"
