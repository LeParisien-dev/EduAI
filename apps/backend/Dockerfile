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

# Installer uniquement les dépendances de prod du backend
RUN pnpm install --filter backend --prod --frozen-lockfile

# Copier les artefacts du build backend depuis le builder
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

# Lancer l'application
CMD ["node", "apps/backend/dist/main"]
