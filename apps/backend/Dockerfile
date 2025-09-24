# Étape 1 : Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copier les fichiers nécessaires
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.base.json ./
COPY apps/backend ./apps/backend
COPY libs ./libs   # <-- AJOUT si tu utilises des libs partagées

# Installer pnpm + dépendances
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Compiler le backend
RUN pnpm --filter backend build

# Réduire les dépendances à la prod uniquement
RUN pnpm prune --prod

# Étape 2 : Runner
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copier node_modules depuis le builder
COPY --from=builder /app/node_modules ./node_modules

# Copier uniquement les artefacts nécessaires
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json ./package.json

# Exposer le port
EXPOSE 3000

# Lancer l’application
CMD ["node", "dist/main"]
