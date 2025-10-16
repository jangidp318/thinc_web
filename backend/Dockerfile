# ---------- BASE STAGE ----------
FROM node:20-alpine AS base
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# ---------- DEPENDENCIES STAGE ----------
FROM base AS deps
WORKDIR /app
# Copy only dependency files for faster caching
COPY backend/package.json backend/pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prod=false

# ---------- BUILD STAGE ----------
FROM base AS build
WORKDIR /app

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy backend sources and TypeScript configs
COPY backend/tsconfig.json ./tsconfig.json
COPY tsconfig.base.json ./tsconfig.base.json
COPY backend/src ./src

# Build TypeScript
RUN pnpm exec tsc -p tsconfig.json

# ---------- PRODUCTION STAGE ----------
FROM base AS prod
WORKDIR /app
ENV NODE_ENV=production

# Copy build output and package files
COPY --from=build /app/dist ./dist
COPY backend/package.json backend/pnpm-lock.yaml* ./

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

EXPOSE 5000
CMD ["node", "dist/server.js"]

# ---------- DEV STAGE ----------
FROM build AS dev
ENV NODE_ENV=development
RUN pnpm install --frozen-lockfile
CMD ["pnpm", "run", "dev"]
