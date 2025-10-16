# ---------- BASE ----------
FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

# ---------- DEPS ----------
FROM base AS deps
COPY ./backend/package.json ./backend/pnpm-lock.yaml* ./
RUN cd backend && pnpm install --frozen-lockfile

# ---------- BUILD ----------
FROM base AS build
WORKDIR /app
COPY ./tsconfig.base.json ./
COPY --from=deps /app/backend/node_modules ./node_modules
COPY ./backend/tsconfig.json ./tsconfig.json
COPY ./backend/src ./src
RUN pnpm exec tsc -p tsconfig.json

# ---------- PROD ----------
FROM base AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY ./backend/package.json ./backend/pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile --ignore-scripts
EXPOSE 5000
CMD ["node", "dist/server.js"]
