# AgriPrice

> Crop Forecasting and Market Decision Support System for Rizal Province.

---

## Tech Stack

| Layer      | Technology               |
|------------|--------------------------|
| Frontend   | React 18 + Vite          |
| Routing    | React Router v6          |
| HTTP Client| Axios                    |
| Backend    | Node.js + Express.js     |
| Database   | MySQL                    |
| Dev Tools  | Nodemon, Morgan, dotenv  |

---

## Project Structure

```
AgriPrice/
├── frontend/          # React (Vite) app
├── backend/           # Node.js + Express API
├── database/          # SQL migration & seed scripts
├── docs/              # Project documentation
├── .gitignore
└── README.md
```

---

## Quick Start

### Prerequisites
- Node.js ≥ 18.x
- npm ≥ 9.x
- MySQL ≥ 8.x

---

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/AgriPrice.git
cd AgriPrice
```

---

### 2. Backend Setup
```bash
cd backend
cp .env.example .env        # Fill in your DB credentials
npm install
npm run dev                 # Starts on http://localhost:5000
```

**Verify**: `GET http://localhost:5000/api/health` → `{ "status": "ok" }`

---

### 3. Frontend Setup
```bash
cd frontend
cp .env.example .env        # Set VITE_API_BASE_URL if needed
npm install
npm run dev                 # Starts on http://localhost:5173
```

---

### 4. Database Setup
```bash
# Connect to MySQL and run migrations in order
mysql -u root -p < database/migrations/001_init.sql
mysql -u root -p < database/seeds/001_seed.sql
```

---

## Environment Variables

### Backend (`backend/.env`)
```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=agriprice
NODE_ENV=development
```

### Frontend (`frontend/.env`)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Team Conventions

- Branch naming: `feature/<name>`, `fix/<name>`, `chore/<name>`
- Commit style: [Conventional Commits](https://www.conventionalcommits.org/)
- PRs require at least 1 reviewer before merge

---

## License

For academic/educational use only.
