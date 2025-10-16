# ---------- BASE STAGE ----------
FROM node:20-alpine AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ---------- DEPENDENCIES STAGE ----------
FROM base AS deps
COPY frontend/package.json frontend/pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# ---------- BUILD STAGE ----------
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY frontend/ ./
RUN pnpm run build

# ---------- PRODUCTION STAGE ----------
FROM base AS prod
ENV NODE_ENV=production
COPY --from=build /app/.next ./.next
COPY frontend/package.json frontend/pnpm-lock.yaml* ./
COPY frontend/public ./public
RUN pnpm install --prod --frozen-lockfile --ignore-scripts
EXPOSE 3000
CMD ["pnpm", "start"]
