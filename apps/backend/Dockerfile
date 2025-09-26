# Étape 1 : Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Installer pnpm
RUN npm install -g pnpm

# Copier les fichiers de config
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.base.json ./
COPY apps/backend/package.json ./apps/backend/package.json

# Installer les dépendances backend
RUN pnpm install --frozen-lockfile --filter backend...

# Copier le code source complet du backend
COPY apps/backend ./apps/backend

# Compiler le backend
RUN pnpm --filter backend build

# Étape 2 : Runner
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Installer pnpm
RUN npm install -g pnpm

# Copier fichiers nécessaires
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.base.json ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/backend ./apps/backend

# Installer uniquement les dépendances de prod du backend
RUN pnpm install --prod --filter backend...

# Copier les artefacts du build
COPY --from=builder /app/apps/backend/dist ./dist

# Exposer le port (EduAI backend = 4000)
EXPOSE 4000

# Lancer l’app
CMD ["node", "dist/main"]
