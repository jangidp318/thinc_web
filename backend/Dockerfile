# backend/Dockerfile
FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

# deps stage: install workspace deps (dev deps included for build tools)
FROM base AS deps
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY backend/package.json ./backend/package.json
RUN pnpm install --frozen-lockfile --prod=false

# build stage: compile backend using workspace filter so tsc is found
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY backend/ ./backend
# compile from repo root using pnpm filter so tsc (in root devDeps) is resolved
WORKDIR /app
RUN pnpm --filter ./backend exec tsc -p backend/tsconfig.json

# production stage: only runtime deps + compiled output
FROM node:20-alpine AS prod
WORKDIR /app
RUN corepack enable
COPY --from=build /app/backend/dist ./dist
COPY backend/package.json ./package.json
RUN pnpm install --frozen-lockfile --prod --filter ./backend...
EXPOSE 5000
CMD ["node", "dist/server.js"]
