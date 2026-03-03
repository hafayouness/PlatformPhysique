# 📘 Physique Bac Platform

> Plateforme d'apprentissage dédiée aux élèves du baccalauréat pour étudier la physique.

---

## ✨ Fonctionnalités

- 📄 **Cours en PDF** — Téléchargez les cours complets par chapitre
- 🎥 **Vidéos explicatives** — Regardez des explications claires et détaillées
- 📝 **Exercices** — Pratiquez avec des exercices adaptés à votre niveau
- ✅ **Solutions détaillées** — Corrigés disponibles en PDF et en vidéo
- 📌 **Résumés de cours** — Des fiches synthèse pour réviser efficacement

---

## 🚀 Technologies utilisées

### 🖥 Backend

| Technologie | Rôle                      |
| ----------- | ------------------------- |
| Node.js     | Environnement d'exécution |
| Express.js  | Framework web             |
| Sequelize   | ORM                       |
| MySQL       | Base de données           |
| JWT         | Authentification          |
| Multer      | Upload de fichiers        |

### 💻 Frontend

| Technologie  | Rôle                  |
| ------------ | --------------------- |
| React.js     | Interface utilisateur |
| React Router | Navigation            |
| Tailwind CSS | Styles                |
| Axios        | Requêtes HTTP         |

---

## 📂 Structure du projet

```
physique-bac/
│
├── backend/
│   ├── models/           # Modèles Sequelize
│   ├── controllers/      # Logique métier
│   ├── routes/           # Définition des routes API
│   ├── middlewares/      # Auth, validation, etc.
│   ├── uploads/          # Fichiers uploadés
│   └── server.js         # Point d'entrée
│
└── frontend/
    ├── src/
    │   ├── pages/         # Pages de l'application
    │   ├── components/    # Composants réutilisables
    │   ├── services/      # Appels API (Axios)
    │   └── App.jsx        # Composant racine
```

---

## 🗄 Base de données

### User

| Champ    | Type   | Description          |
| -------- | ------ | -------------------- |
| id       | INT    | Identifiant unique   |
| name     | STRING | Nom complet          |
| email    | STRING | Adresse email        |
| password | STRING | Mot de passe hashé   |
| role     | ENUM   | `admin` ou `student` |

### Course

| Champ       | Type   | Description              |
| ----------- | ------ | ------------------------ |
| id          | INT    | Identifiant unique       |
| title       | STRING | Titre du cours           |
| description | TEXT   | Description              |
| level       | ENUM   | `1bac` ou `2bac`         |
| chapter     | STRING | Numéro / nom du chapitre |

### Resource

| Champ    | Type   | Description                                      |
| -------- | ------ | ------------------------------------------------ |
| id       | INT    | Identifiant unique                               |
| title    | STRING | Titre de la ressource                            |
| type     | ENUM   | `pdf`, `video`, `exercise`, `solution`, `resume` |
| fileUrl  | STRING | URL du fichier                                   |
| courseId | INT    | Référence au cours (FK)                          |

### Relations

- **Course** → plusieurs **Resources** (1:N)
- **Admin** → peut gérer les **Courses** (via rôle)

---

## 🔐 Authentification

- ✅ Inscription (`POST /api/auth/register`)
- ✅ Connexion (`POST /api/auth/login`)
- 🔑 JWT Token — stocké côté client
- 🛡 Middleware de protection des routes privées
- 👥 Gestion des rôles : `admin` / `student`

---

## ⚙️ Installation

### Prérequis

- Node.js >= 16
- MySQL

### Backend

```bash
cd backend
npm install
```

Créez un fichier `.env` :

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=physique_bac
JWT_SECRET=your_jwt_secret
PORT=5000
```

Démarrez le serveur :

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints (aperçu)

| Méthode | Route                      | Description                   |
| ------- | -------------------------- | ----------------------------- |
| POST    | `/api/auth/register`       | Inscription                   |
| POST    | `/api/auth/login`          | Connexion                     |
| GET     | `/api/courses`             | Liste des cours               |
| GET     | `/api/courses/:id`         | Détail d'un cours             |
| POST    | `/api/courses`             | Créer un cours (admin)        |
| GET     | `/api/resources/:courseId` | Ressources d'un cours         |
| POST    | `/api/resources`           | Ajouter une ressource (admin) |
