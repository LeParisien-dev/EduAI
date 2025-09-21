# Étape 1 : Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.base.json ./
COPY apps/backend ./apps/backend

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

RUN pnpm --filter backend build
RUN pnpm prune --prod

# Étape 2 : Runner
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json ./package.json

EXPOSE 3000
CMD ["node", "dist/main.js"]
