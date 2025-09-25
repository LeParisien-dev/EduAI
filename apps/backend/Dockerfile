# Étape 1 : Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copier les fichiers nécessaires
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.base.json ./
COPY apps/backend ./apps/backend
COPY libs ./libs

# Installer pnpm + dépendances
RUN npm install -g pnpm
RUN pnpm install --no-frozen-lockfile

# Compiler le backend uniquement
RUN pnpm --filter backend build

# Nettoyer pour ne garder que les deps prod
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

# Exposer le port (EduAI backend = 4000)
EXPOSE 4000

# Lancer l’application
CMD ["node", "dist/main"]
