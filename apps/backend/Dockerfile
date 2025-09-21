# Étape 1 : Build
FROM node:20-alpine AS builder
WORKDIR /app

# [AJOUT] pnpm-workspace.yaml pour une install correcte en monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.base.json ./
COPY apps/backend ./apps/backend
COPY libs ./libs

# Installer les dépendances
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# [MODIF] Build : on compile le backend (et résout les imports depuis libs via tsconfig.base)
RUN pnpm --filter backend build

# [AJOUT] Réduction du poids : ne garder que les deps prod
RUN pnpm prune --prod

# Étape 2 : Runner
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# [MODIF] Copier node_modules prunés + dist + package.json backend
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package.json ./package.json

# Exposer le port (utile en local et pour Render)
EXPOSE 3000

# [MODIF] Lancer l’application (fichier émis par Nest après build)
CMD ["node", "dist/main.js"]
