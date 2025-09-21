# Étape 1 : Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copier uniquement les fichiers nécessaires
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.base.json ./
COPY apps/backend ./apps/backend
COPY libs ./libs

# Installer les dépendances
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Compiler le backend
RUN pnpm --filter backend build

# Étape 2 : Runner
FROM node:20-alpine
WORKDIR /app

# Copier node_modules + dist du backend
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./dist

# Exposer le port (utile en local et pour Render)
EXPOSE 3000

# Lancer l’application
CMD ["node", "dist/main"]
