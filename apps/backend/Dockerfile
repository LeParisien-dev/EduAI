# Étape 1 : Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Installer pnpm
RUN npm install -g pnpm

# Copier tous les fichiers du monorepo
COPY . .

# Installer toutes les dépendances (dev + prod)
RUN pnpm install --frozen-lockfile

# Compiler uniquement le backend
RUN pnpm --filter backend build

# Étape 2 : Runner
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Installer pnpm
RUN npm install -g pnpm

# Copier les manifests nécessaires (workspace + backend)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/

# Installer toutes les dépendances de prod du monorepo
RUN pnpm install --prod --frozen-lockfile

# Copier uniquement les artefacts du backend depuis le builder
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

# Lancer le backend
CMD ["node", "apps/backend/dist/main"]
