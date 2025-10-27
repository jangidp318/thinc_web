# frontend/Dockerfile
FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

# deps (install workspace - includes next in dev deps)
FROM base AS deps
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY frontend/package.json ./frontend/package.json
RUN pnpm install --frozen-lockfile --prod=false

# build stage
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/ ./frontend
WORKDIR /app
# use workspace filter so next (workspace devDep) is resolved
RUN pnpm --filter ./frontend exec next build --workspace-root

# prod image (runtime only)
FROM node:20-alpine AS prod
WORKDIR /app
RUN corepack enable
COPY --from=build /app/frontend/.next ./.next
COPY --from=build /app/frontend/public ./public
COPY frontend/package.json ./package.json
RUN pnpm install --frozen-lockfile --prod --filter ./frontend...
EXPOSE 3000
CMD ["pnpm", "exec", "next", "start", "-p", "3000"]
