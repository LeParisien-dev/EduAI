# EduAI – Full-Stack AI-Ready LMS

## 🇬🇧 English Version

EduAI is an **AI-ready Learning Management System (LMS)**, designed as a showcase project to demonstrate **full-stack** and **AI engineering** skills.  
The goal: to build a **complete ecosystem** (frontend + backend + database + AI orchestration) ready to integrate real artificial intelligence modules.  

---

### Live Demo

- Frontend (Vercel): [Insert Vercel link here]  
- Backend API (Render): [Insert Render link here]  
- Healthcheck: `/api/health` → should return `pong`  

---

### Architecture

EduAI/  
 ├─ apps/  
 │   ├─ frontend   → React + Vite + Tailwind (LMS Dashboard)  
 │   └─ backend    → NestJS + TypeORM + PostgreSQL  
 ├─ infra/         → Docker Compose (DB, network, volumes)  
 ├─ ai/            → Mock AI services (ETA, fuel, vision…)  
 ├─ services/      → DB seeding scripts, network utilities  
 └─ docs/          → Screenshots, diagrams, README assets  

- The backend runs on port 4000.  
- The frontend runs on port 5173 locally.  

---

### Tech Stack

#### Frontend
- React 18 + Vite  
- Tailwind CSS v4 (new syntax `@import "tailwindcss/preflight"`)  
- AuthContext + JWT token  
- Cockpit-style dashboard (Weather, Route, Ports, Simulator, AI modules)  

#### Backend
- NestJS (modular REST API)  
- PostgreSQL + TypeORM (migrations, entities)  
- Authentication (JWT, bcrypt, DTOs, guards)  
- LMS modules: Users, Courses, AI orchestration  

#### DevOps
- Docker Compose (Postgres, dedicated network)  
- Deployment: Render (backend) + Vercel (frontend)  
- Monitoring with UptimeRobot  

---

### Main Features

- User management (register/login with JWT)  
- Courses (creation, publishing, User ↔ Course relation)  
- Cockpit dashboard with widgets (weather, route, port congestion, vision mock)  
- Mock AI endpoints (ETA, fuel, congestion) ready to be connected to real ML models  
- Free cloud deployment (Render + Vercel stack)  

---

### Dashboard Preview

![Dashboard Screenshot](./docs/dashboard.png)  

(Add a screenshot of the EduAI cockpit in docs/dashboard.png)  

---

### Local Setup

1. Clone the repo  
git clone https://github.com/LeParisien-dev/eduAI.git  
cd eduAI  

2. Install dependencies  
pnpm install  

3. Start the infrastructure (DB + network)  
cd infra  
docker-compose up -d  

4. Start the backend (NestJS)  
cd apps/backend  
pnpm start:dev  
Backend available at: http://localhost:4000  

5. Start the frontend (React/Vite)  
cd apps/frontend  
pnpm dev  
Frontend available at: http://localhost:5173  

---

### Environment Variables

Create a `.env` file inside `apps/backend/` with the following content:  

DATABASE_URL=postgresql://postgres:password@localhost:5432/eduai  
DATABASE_SSL=false  
JWT_SECRET=super_secret_dev  
PORT=4000  

---

### API Endpoints (samples)

#### Auth
- POST /auth/register → create a user  
- POST /auth/login → login with JWT  

#### Courses
- POST /courses → create a course (auth required)  
- GET /courses/published → list published courses  
- PATCH /courses/:id/publish → publish a course  

#### AI (mock)
- POST /ai/eta → ETA estimation  
- POST /ai/fuel → fuel estimation  
- POST /ai/congestion → port congestion prediction  

---

### Roadmap

- Add a real LLM module (educational chatbot using an open-source model)  
- CI/CD with GitHub Actions (tests + auto deployment)  
- Roles & permissions (admin, student, teacher)  
- End-to-end tests with Jest + Supertest  

---

Project created by **LeParisien-dev**  
👉 GitHub: [https://github.com/LeParisien-dev](https://github.com/LeParisien-dev)  

---

## 🇫🇷 Version Française

EduAI est une plateforme LMS (**Learning Management System**) **AI-ready**, pensée comme un projet vitrine pour démontrer des compétences **full-stack** et **AI engineering**.  
L’objectif : montrer comment bâtir un **écosystème complet** (frontend + backend + base de données + orchestration AI) prêt à accueillir des modules d’intelligence artificielle.  

---

### Démo en ligne

- Frontend (Vercel) : [Lien Vercel ici]  
- Backend API (Render) : [Lien Render ici]  
- Healthcheck : `/api/health` → doit retourner `pong`  

---

### Architecture

EduAI/  
 ├─ apps/  
 │   ├─ frontend   → React + Vite + Tailwind (Dashboard LMS)  
 │   └─ backend    → NestJS + TypeORM + PostgreSQL  
 ├─ infra/         → Docker Compose (DB, réseau, volumes)  
 ├─ ai/            → Services AI mock (ETA, fuel, vision…)  
 ├─ services/      → Scripts DB seeding, outils réseau  
 └─ docs/          → Screenshots, diagrammes, README assets  

- Le backend écoute sur le port 4000.  
- Le frontend tourne sur le port 5173 en local.  

---

### Stack technique

#### Frontend
- React 18 + Vite  
- Tailwind CSS v4 (nouvelle syntaxe `@import "tailwindcss/preflight"`)  
- AuthContext + JWT token  
- Dashboard cockpit (Weather, Route, Ports, Simulator, AI modules)  

#### Backend
- NestJS (API REST modulaire)  
- PostgreSQL + TypeORM (migrations, entités)  
- Auth (JWT, bcrypt, DTOs, guards)  
- Modules LMS : Users, Courses, AI orchestration  

#### DevOps
- Docker Compose (Postgres, réseau dédié)  
- Déploiement Render (backend) + Vercel (frontend)  
- Monitoring avec UptimeRobot  

---

### Fonctionnalités principales

- Gestion utilisateurs (register/login JWT)  
- Cours (création, publication, relation User ↔ Course)  
- Dashboard cockpit avec widgets (weather, route, port congestion, vision mock)  
- Endpoints AI mockés (ETA, fuel, congestion) prêts à être branchés sur de vrais modèles ML  
- Déploiement cloud gratuit (stack Render + Vercel)  

---

### Aperçu du Dashboard

![Dashboard Screenshot](./docs/dashboard.png)  

(Ajouter un screenshot du cockpit EduAI dans docs/dashboard.png)  

---

### Installation locale

1. Cloner le repo  
git clone https://github.com/LeParisien-dev/eduAI.git  
cd eduAI  

2. Installer les dépendances  
pnpm install  

3. Lancer l’infra (DB + réseau)  
cd infra  
docker-compose up -d  

4. Lancer le backend (NestJS)  
cd apps/backend  
pnpm start:dev  
Backend dispo sur : http://localhost:4000  

5. Lancer le frontend (React/Vite)  
cd apps/frontend  
pnpm dev  
Frontend dispo sur : http://localhost:5173  

---

### Variables d’environnement

Créer un fichier `.env` dans `apps/backend/` avec le contenu suivant :  

DATABASE_URL=postgresql://postgres:password@localhost:5432/eduai  
DATABASE_SSL=false  
JWT_SECRET=super_secret_dev  
PORT=4000  

---

### Endpoints API (extraits)

#### Auth
- POST /auth/register → créer un utilisateur  
- POST /auth/login → login avec JWT  

#### Courses
- POST /courses → créer un cours (auth requis)  
- GET /courses/published → lister les cours publiés  
- PATCH /courses/:id/publish → publier un cours  

#### AI (mock)
- POST /ai/eta → estimation ETA  
- POST /ai/fuel → estimation fuel  
- POST /ai/congestion → prédiction congestion portuaire  

---

### Roadmap

- Ajouter un vrai module LLM (chat pédagogique avec un modèle open-source)  
- CI/CD avec GitHub Actions (tests + déploiement auto)  
- Rôles & permissions (admin, student, teacher)  
- Tests e2e avec Jest + Supertest  

---

Projet créé par **LeParisien-dev**  
👉 GitHub : [https://github.com/LeParisien-dev](https://github.com/LeParisien-dev)  
