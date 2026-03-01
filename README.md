# Bite - Minimal Video Sharing MVP

Bite is a simple full-stack video sharing app inspired by YouTube.

## Tech stack
- **Frontend:** React + hooks (Vite)
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Authentication:** Google OAuth 2.0 (Google Identity Services + backend token verification)
- **Storage:** Local filesystem (video + thumbnail uploads)

## Project structure

```text
.
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   │   ├── thumbnails
│   │   └── videos
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend
    ├── src
    │   ├── api
    │   ├── components
    │   ├── pages
    │   ├── App.jsx
    │   └── styles.css
    ├── .env.example
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Features implemented
1. Google login only.
2. Authenticated users can upload:
   - video file
   - thumbnail image
   - title
   - description
3. Homepage shows a responsive video grid (thumbnail, title, channel name).
4. Watch page has:
   - HTML5 video player
   - title and description
   - comment section with comment creation
5. Profile page lists the logged-in user and their uploaded videos.

## Setup instructions

### 1) Backend
```bash
cd backend
npm install
cp .env.example .env
```

Fill `.env` values:
- `MONGO_URI`
- `JWT_SECRET`
- `GOOGLE_CLIENT_ID`
- `CLIENT_URL` (default `http://localhost:5173`)

Run backend:
```bash
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
cp .env.example .env
```

Fill `.env` values:
- `VITE_API_URL` (default `http://localhost:5000`)
- `VITE_GOOGLE_CLIENT_ID` (same Google client ID)

Run frontend:
```bash
npm run dev
```

## Notes
- Basic validations are included for required fields, file type, and lengths.
- Uploaded files are stored under `backend/uploads`.
- Keep this as MVP: no likes/dislikes, subscriptions, recommendations, or admin modules.
