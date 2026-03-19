# Phoenix OS — production container (runtime + CLI).
# ADR-008: Phase 5 deployment. Use for self-hosted runtime or CI parity.
# Primary hosting remains Vercel; this supports Docker-based deploy and local dev.

FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.14.2 --activate
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/kernel/package.json packages/kernel/
COPY packages/runtime/package.json packages/runtime/
COPY packages/app/package.json packages/app/
COPY packages/cli/package.json packages/cli/
COPY packages/sdk/package.json packages/sdk/
RUN pnpm install --frozen-lockfile

# Build all packages
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY packages ./packages
COPY tsconfig.base.json ./
RUN pnpm build

# Minimal runtime image
FROM base AS runner
ENV NODE_ENV=production
ENV PHOENIX_PROFILE="${PHOENIX_PROFILE:-production}"
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY scripts ./scripts
COPY tsconfig.base.json ./

# Default: run health server on 8080 (override with CMD)
EXPOSE 8080
CMD ["node", "scripts/health-server.mjs"]
