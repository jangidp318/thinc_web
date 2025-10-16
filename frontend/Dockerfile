# ---------- BASE STAGE ----------
FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

# ---------- DEPENDENCIES ----------
FROM base AS deps
COPY ./frontend/package.json ./frontend/pnpm-lock.yaml* ./
RUN cd frontend && pnpm install --frozen-lockfile

# ---------- BUILD ----------
FROM base AS build
COPY --from=deps /app/frontend/node_modules ./node_modules
COPY ./frontend ./
RUN pnpm run build

# ---------- PRODUCTION ----------
FROM base AS prod
WORKDIR /app
COPY --from=build /app/frontend/.next ./.next
COPY ./frontend/public ./public
COPY ./frontend/package.json ./frontend/pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile --ignore-scripts
EXPOSE 3000
CMD ["pnpm", "start"]
